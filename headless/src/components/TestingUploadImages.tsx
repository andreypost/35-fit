import { CrossRedSVG } from 'img/icons'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { spinnerIsVisibile } from 'slices/action.slice'
import { IUploadImages } from 'types/interface'
import { apiEndpointCall } from 'utils/endpointApiCall'
import { useAppDispatch } from 'utils/hooks'
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  arrayMove,
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

const Div = styled.div`
  .upload_images {
    .upload_images_input {
      margin-bottom: 20px;
      p {
        margin-bottom: 20px;
      }
      input {
        font-size: 14px;
        font-weight: 700;
        border: none;
        background-color: transparent;
        color: #004;
      }
      input::placeholder {
        color: #7fcbae;
      }
      input:-webkit-autofill {
        -webkit-box-shadow: 0 0 0 1000px white inset !important;
        box-shadow: 0 0 0 1000px white inset !important;
        -webkit-text-fill-color: #004 !important;
        background-color: transparent !important;
      }
    }
    .upload_images_container {
      gap: 20px;
      .upload_images_box {
        img {
          max-height: 120px;
          width: auto;
        }
        .upload_images_cross {
          right: 6px;
          top: 6px;
          width: 14px;
          height: 14px;
          z-index: 999;
          cursor: pointer;
        }
      }
    }
  }
`
export const TestingUploadImages = () => {
  const [images, setImages] = useState<IUploadImages[]>([])
  const [uploadInput, setUploadInput] = useState<string>('')
  const dispatch = useAppDispatch()
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const getAllImages = async () => {
    dispatch(spinnerIsVisibile(true))
    const res = await apiEndpointCall('get', 'file/image/all', {}, true)
    if (res?.data) setImages(res.data)
    setTimeout(() => dispatch(spinnerIsVisibile(false)), 1000)
  }
  useEffect(() => {
    getAllImages()
  }, [])

  const handleUploadImages: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    if (!e.target.files) return
    dispatch(spinnerIsVisibile(true))

    const files: File[] = Array.from(e.target.files)
    const formData = new FormData()
    files.forEach((file) => formData.append('images', file))

    const res = await apiEndpointCall(
      'post',
      'file/image/upload',
      formData
    ).finally(() => {
      setUploadInput('')
      getAllImages()
    })
    console.log('handleUploadImages: res: ', res)
  }

  const handleDeleteImage = async (id: string) => {
    dispatch(spinnerIsVisibile(true))
    const res = await apiEndpointCall('delete', `file/image/${id}`).finally(
      () => getAllImages()
    )
    console.log('handleDeleteImage res: ', res)
  }

  const onReorder = async (idsInNewOrder: string[]) => {
    // [
    //   'e7805058-b751-4397-b9c4-38dacff6a407',
    //   '79c60086-3116-4d79-a75c-5fc3cd565c93',
    //   'a31dc7a1-15a0-4c8b-9abe-a862776d9854',
    // ]
    await apiEndpointCall('put', 'file/image/order', idsInNewOrder, true)
  }

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  )

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = images.findIndex((i) => i.id === String(active.id))
    const newIndex = images.findIndex((i) => i.id === String(over.id))
    if (oldIndex === -1 || newIndex === -1) return

    const next = arrayMove(images, oldIndex, newIndex).map((it, idx) => ({
      ...it,
      displayOrder: idx,
    }))

    const prev = images
    setImages(next)
    setSaving(true)
    setError(null)

    try {
      await onReorder(next.map((i) => i.id))
    } catch (e: any) {
      setImages(prev)
      setError(e?.message ?? 'Failed to save order')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Div>
      <div className="upload_images margin_b_120_80">
        <div className="upload_images_input">
          <p>Upload Images</p>
          <input
            type="file"
            multiple
            accept="image/jpeg, image/png, image/webp"
            value={uploadInput}
            onChange={handleUploadImages}
            placeholder="Upload Images"
          />
        </div>
        <div className="upload_images_container flex wrap">
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={images.map((i) => i.id)}
              strategy={rectSortingStrategy}
            >
              {images?.length > 0 &&
                images.map(({ displayOrder, imageUrl, id }) => (
                  <SortableImageCard
                    key={id}
                    id={id}
                    imageUrl={imageUrl}
                    displayOrder={displayOrder}
                    handleDeleteImage={handleDeleteImage}
                  />
                ))}
            </SortableContext>
          </DndContext>
        </div>
        <div className="mt-2 text-sm">
          {saving && <span>Saving order…</span>}
          {error && <span className="text-red-600">{error}</span>}
        </div>
      </div>
    </Div>
  )
}

const SortableImageCard = ({
  id,
  imageUrl,
  displayOrder,
  handleDeleteImage,
}: {
  id: string
  imageUrl: string
  displayOrder: number
  handleDeleteImage: (id: string) => void
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id })
  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
    cursor: 'grab',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative rounded-xl shadow overflow-hidden upload_images_box"
      {...attributes}
      {...listeners}
    >
      <img
        src={imageUrl}
        alt="image"
        className="block w-full h-40 object-cover"
      />
      <CrossRedSVG
        className="upload_images_cross absolute"
        onClick={() => handleDeleteImage(id)}
      />
      <p>{displayOrder}</p>
    </div>
  )
}
