import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { IGetImageById, IGetImages, IUser } from 'types/interface'
import { useQuery } from '@apollo/client'
import { GET_IMAGES, GET_IMAGE_BY_ID } from 'queries'
import { useAppDispatch, useAppSelector } from 'utils/hooks'
import { UserData, fetchFileData, setSortedList } from 'slices/fileData.slice'
import { apiEndpointCall } from 'utils/endpointApiCall'
import { AppContext } from '../AppRouter'

const Div = styled.div`
  #testingForm {
    margin-left: auto;
    margin-right: auto;
    input[type='email'],
    input[type='password'] {
      margin-bottom: 20px;
      &::placeholder {
        font-weight: 400;
        color: #6e7071;
      }
    }
    .form_button_box {
      row-gap: 30px;
    }
    button {
      min-width: 220px;
      background-color: #b2b2b2;
      transition: color 0.4s, background-color 0.4s;
      color: #004;
      &:hover {
        color: white;
        background-color: #004;
      }
    }
    hr {
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
      border: none;
      border-top: 3px double #004;
      color: #004;
      text-align: center;
      &::after {
        content: '§';
        position: relative;
        top: -12px;
        padding: 0 4px;
        background-color: #fff;
      }
    }
  }
`

const ImagesList = ({ categoryImages }: any) => {
  const { loading, error, data } = useQuery<IGetImages>(GET_IMAGES, {
    variables: { categoryImages },
    context: { credentials: 'include' },
  })
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error?.message}</p>
  return (
    <>
      {data?.imagesByCategory.map(({ id, title, category, owner, url }) => (
        <div key={id}>
          <h3>{title}</h3>
          <p>Category: {category}</p>
          <p>Owner: {owner}</p>
          <img src={url} alt={title} />
        </div>
      ))}
    </>
  )
}

export const TestingModule = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [index, setIndex] = useState(0)
  const [selectedImageId, setSelectedImageId] = useState<number>(0)
  const {
    loading: imageLoading,
    error: imageError,
    data: imageData,
  } = useQuery<IGetImageById>(GET_IMAGE_BY_ID, {
    variables: { imageId: selectedImageId },
    skip: !selectedImageId,
    context: { credentials: 'include' },
  })
  const dispatch = useAppDispatch()
  const { fileSortedList, fileListLoading, fileListError } =
    useAppSelector(setSortedList)
  const { currentUser } = useContext(AppContext)

  const countries = [
    'Chile',
    'Netherlands',
    'France',
    'United Kingdom',
    'Ukraine',
    'United Kingdom',
    'Mexico',
    'Spain',
    'Sweden',
    'South Korea',
  ]

  // const largeData = 'A'.repeat(1000000)

  // useEffect(() => {
  //   user && dispatch(fetchFileData())
  // }, [user])

  useEffect(() => {
    console.log('TestingModule: ', process.env.API_URL)
    setIndex(Math.floor(Math.random() * countries.length))
  }, [])

  /*
  const [fileList, setFileList] = useState<UserData[]>([])
  const [filteredList, setFilteredList] = useState<UserData[]>([])
  const [sotredList, setSortedList] = useState<UserData[]>([])
  const cach = useRef(null)

  useEffect(() => {
    if (!cach.current) {
      const f = async () => {
        try {
          const getFileContent = await axios.get(
            `${process.env.API_URL}/file/read`,
            {
              withCredentials: true,
            }
          )
          const { data } = getFileContent
          cach.current = data
          setFileList(data)
        } catch (error: any) {
          console.error('Error to read file data: ', error.responce?.data)
        }
      }
      f()
    } else {
      setFileList(cach.current)
    }
  }, [])

  useEffect(() => {
    if (fileList?.length) {
      setFilteredList(
        fileList.filter(
          (item: { country: string }) => item?.country !== 'Russian Federation'
        )
      )
    }
  }, [fileList])

  useEffect(() => {
    if (filteredList?.length) {
      setSortedList(
        filteredList.sort(
          (item1: { earnings: string }, item2: { earnings: string }) =>
            +item1?.earnings.replace('$', '') -
            +item2?.earnings.replace('$', '')
        )
      )
    }
  }, [filteredList]) */

  const handleTesting = async <T extends React.FormEvent<HTMLFormElement>>(
    e: T
  ): Promise<void> => {
    e.preventDefault()

    const addFileData: any = await apiEndpointCall('post', 'file/write', {
      id: Math.floor(200 + Math.random() * (1000 - 100 + 1)),
      earnings: `$${
        Math.floor(50 + Math.random() * (100 - 50 + 1)) * (index + 1)
      }`,
      country: countries[index],
      name: 'Andrii Postoliuk',
    })

    await apiEndpointCall('get', 'file/read')

    await apiEndpointCall('get', 'file/count-by-country')

    await apiEndpointCall('get', 'file/average-earnings-by-country')

    await apiEndpointCall('get', `file/users/${addFileData?.data?.id}`)

    setIndex(Math.floor(Math.random() * countries.length))
  }

  return (
    <Div>
      {fileListError && <p>{fileListError?.message}</p>}
      {currentUser && fileSortedList?.length > 0 && (
        <ol>
          <p>Users: {fileSortedList.length}</p>
          {fileSortedList.map(
            ({ name, country, earnings }: UserData, index: any) => (
              <Fragment key={index}>
                <li>
                  Name: {name}, &nbsp; Earnings: {earnings}, &nbsp; Country:
                  {country}
                </li>
                <hr />
              </Fragment>
            )
          )}
        </ol>
      )}
      <form id="testingForm" className="flex_str_col" onSubmit={handleTesting}>
        <div className="flex_center_around form_button_box wrap">
          <div className="flex_str_col form_button_box">
            <button
              type="button"
              className="grey_button grey"
              onClick={() =>
                apiEndpointCall('post', 'price/create', {
                  name: 'Scooter Autumn Sale 2025',
                  amount: 799,
                  discount: 15,
                  taxRate: 5,
                  currency: 'USD',
                  productType: 'scooter',
                })
              }
            >
              SCOOTER PRICE
            </button>
            <button
              type="button"
              className="grey_button grey"
              onClick={() =>
                apiEndpointCall('post', 'scooter/create', {
                  model: 'Model X2',
                  priceId: 'd0e157f6-a347-4a64-b25e-f7e725e19ce9',
                  // saleType: 'rental',
                })
              }
            >
              CREATE SCOOTER
            </button>
          </div>
          <div className="flex_str_col form_button_box">
            <button
              type="button"
              className="grey_button grey"
              onClick={() =>
                apiEndpointCall('post', 'price/create', {
                  name: 'Autumn Offer 2025',
                  amount: 99,
                  discount: 15,
                  taxRate: 5,
                  currency: 'USD',
                  productType: 'accessory',
                })
              }
            >
              ACCESSORY PRICE
            </button>
            <button
              type="button"
              className="grey_button grey"
              onClick={() =>
                apiEndpointCall('post', 'accessory/create', {
                  name: 'Halmet White',
                  priceId: 'a9dbaa00-3191-44a0-a402-d3fd9a478458',
                })
              }
            >
              CREATE ACCESSORY
            </button>
          </div>
        </div>
        <hr />
        <div className="flex_center_around form_button_box wrap">
          <div className="flex_str_col">
            <button
              type="button"
              className="grey_button grey"
              onClick={() =>
                apiEndpointCall('post', 'order/create', {
                  status: 'pending',
                  items: [
                    {
                      productType: 'scooter',
                      productId: 'f3f3cebc-57a9-4dfa-9e72-a80609bc8e41',
                      quantity: 1,
                    },
                    {
                      productType: 'scooter',
                      productId: '63f86df8-ed2e-4361-b297-6863837e7347',
                      quantity: 2,
                    },
                    {
                      productType: 'accessory',
                      productId: '0920fe0b-b55c-49e5-ab87-64a107e350af',
                      quantity: 4,
                    },
                    {
                      productType: 'accessory',
                      productId: 'bb5ef4fd-ade4-4f46-ba86-011b7840f67f',
                      quantity: 6,
                    },
                  ],
                })
              }
            >
              MAKE ORDER
            </button>
          </div>
          <div className="flex_str_col">
            <button
              type="button"
              className="grey_button grey"
              onClick={() => apiEndpointCall('get', 'order/orders/scooter')}
            >
              Get Orders
            </button>
          </div>
        </div>
        <hr />
        <button type="submit" className="grey_button grey">
          Stream File Data
        </button>
        {/* <ImagesList categoryImages="Coffee" />
        <p
          className="grey_button grey"
          onClick={() => setSelectedImageId(Number(!selectedImageId))}
        >
          Show the image with GraphQl query
        </p> */}
        {selectedImageId > 0 && (
          <>
            {imageLoading && <p>Loading image details...</p>}
            {imageError && (
              <p>Error fetching image details: {imageError.message}</p>
            )}
            {imageData && imageData?.imageById && (
              <div>
                <h3>{imageData?.imageById?.title}</h3>
                <p>Category: {imageData?.imageById?.category}</p>
                <p>Owner: {imageData?.imageById?.owner}</p>
                <img
                  src={imageData?.imageById?.url}
                  alt={imageData?.imageById?.title}
                />
              </div>
            )}
          </>
        )}
      </form>
    </Div>
  )
}
