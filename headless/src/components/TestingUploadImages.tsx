import { CrossRedSVG } from 'img/icons'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { spinnerIsVisibile } from 'slices/action.slice'
import { IUploadImages } from 'types/interface'
import { apiEndpointCall } from 'utils/endpointApiCall'
import { useAppDispatch } from 'utils/hooks'

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
  const [uploadInput, setUploadInput] = useState<string>('')
  const [images, setImages] = useState<IUploadImages[]>([])
  const dispatch = useAppDispatch()

  const getAllImages = async () => {
    dispatch(spinnerIsVisibile(true))
    const response = await apiEndpointCall('get', 'file/image/all', {}, true)
    if (response?.data) {
      setImages(response.data)
    }
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

    console.log('e.target.files: ', files)

    const formData = new FormData()

    files.forEach((file) => formData.append('images', file))

    const meta = files.map((_, displayOrder) => ({ displayOrder }))

    formData.append('meta', JSON.stringify(meta))

    const response = await apiEndpointCall(
      'post',
      'file/image/upload',
      formData
    )
      .finally(() => {
        setUploadInput('')
        getAllImages()
      })
    console.log('handleUploadImages: response: ', response)
  }

  const handleDeleteImage = async (id: string) => {
    dispatch(spinnerIsVisibile(true))
    const response = await apiEndpointCall('delete', `file/image/${id}`)
      .finally(() => getAllImages())
    console.log('handleDeleteImage response: ', response)
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
          {images?.length > 0 &&
            images.map(({ displayOrder, imageUrl, id }) => (
              <div className="upload_images_box relative" key={id}>
                <img src={imageUrl} alt="nature image" />
                <CrossRedSVG
                  className="upload_images_cross absolute"
                  onClick={() => handleDeleteImage(id)}
                />
                <p>{displayOrder}</p>
              </div>
            ))}
        </div>
      </div>
    </Div>
  )
}
