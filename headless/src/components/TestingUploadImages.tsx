import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IUploadImages } from 'types/interface'
import { apiEndpointCall } from 'utils/endpointApiCall'

const Div = styled.div`
  .upload_images {
    p {
      margin-bottom: 20px;
    }
    input {
      width: 93%;
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
`
export const TestingUploadImages = () => {
  const [images, setImages] = useState<IUploadImages[]>([])

  useEffect(() => {
    const getAllImages = async () => {
      const response = await apiEndpointCall('get', 'file/image/all')
      if (response?.data) {
        console.log('getAllImages: ', response.data)
        setImages(response.data)
      }
    }
    getAllImages()
  }, [])

  const handleUploadImages: React.ChangeEventHandler<HTMLInputElement> = async (
    e
  ) => {
    if (!e.target.files) return
    const files: File[] = Array.from(e.target.files)

    console.log('e.target.files: ', files)

    // const imageObjects: IUploadImages[] = files.map((file) => ({
    //   file,
    //   name: file.name,
    //   size: file.size,
    //   type: file.type,
    //   previewUrl: URL.createObjectURL(file),
    // }))

    // console.log('imageObjects: ', imageObjects)

    const formData = new FormData()

    files.forEach((file) => formData.append('images', file))

    const meta = files.map((_, displayOrder) => ({ displayOrder }))

    formData.append('meta', JSON.stringify(meta))

    const response = await apiEndpointCall(
      'post',
      'file/image/upload',
      formData
    )
    console.log('formData: ', formData.get('images'))
    console.log('formData: ', formData.get('meta'))
    console.log('handleUploadImages: response: ', response)
  }
  return (
    <Div>
      <div className="upload_images margin_b_120_80">
        {images?.length > 0 &&
          images.map(({ imageUrl, id }) => (
            <img src={imageUrl} alt="" key={id} />
          ))}
        <p>Upload Images</p>
        <input
          type="file"
          multiple
          accept="image/jpeg, image/png, image/webp"
          onChange={handleUploadImages}
          placeholder="Upload Images"
        />
      </div>
    </Div>
  )
}
