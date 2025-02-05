import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { IGetImageById, IGetImages, IPrice } from 'types/interface'
import { useQuery } from '@apollo/client'
import { GET_IMAGES, GET_IMAGE_BY_ID } from 'queries'
import { useAppDispatch, useAppSelector } from 'utils/hooks'
// import { UserData, fetchFileData, setSortedList } from 'slices/fileData.slice'
import { apiEndpointCall } from 'utils/endpointApiCall'
// import axios from 'axios'
import { AppContext } from '../AppRouter'

const Div = styled.div`
  #orderBox,
  #streamFileDataForm {
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
    .grey_button {
      min-width: 220px;
      background-color: #b2b2b2;
      transition: color 0.4s, background-color 0.4s, opacity 0.4s;
      color: #004;
      &:hover {
        color: white;
        background-color: #004 !important;
      }
      &.green {
        background-color: #59b894;
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
  // const dispatch = useAppDispatch()
  // const { slFileSortedList, slFileListLoading, slFileListError } =
  //   useAppSelector(setSortedList)
  // const { currentUser } = useContext(AppContext)
  const abortController = new AbortController()
  const { signal } = abortController
  const [scooterPriceId, setScooterPriceId] = useState('')
  const [accessoryPriceId, setAccessoryPriceId] = useState('')
  const [scooterConflictPriceId, setScooterConflictPriceId] = useState(false)
  const [accessoryConflictPriceId, setAccessoryConflictPriceId] =
    useState(false)
  const [scooterConflictProductId, setScooterConflictProductId] =
    useState(false)
  const [accessoryConflictProductId, setAccessoryConflictProductId] =
    useState(false)

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

  const scooterPrice = {
    name: 'Scooter Autunm Sale 2023',
    amount: 799,
    discount: 15,
    taxRate: 5,
    currency: 'USD',
    productType: 'scooter',
  }

  const accessoryPrice = {
    name: 'Winter Offer 2021',
    amount: 99,
    discount: 15,
    taxRate: 5,
    currency: 'USD',
    productType: 'accessory',
  }

  const scooterProduct = {
    model: 'Model X2',
    priceId: scooterPriceId,
    // saleType: 'rental',
  }

  const accessoryProduct = {
    name: 'Halmet Black',
    priceId: accessoryPriceId,
  }

  // const largeData = 'A'.repeat(1000000)

  useEffect(() => {
    // console.log('TestingModule: ', process.env.API_URL)
    setIndex(Math.floor(Math.random() * countries.length))

    const checkSetPriceByName = async (): Promise<void> => {
      apiEndpointCall(
        'get',
        `price/check-set?priceName=${scooterPrice.name}`,
        {},
        true,
        signal
      ).then((res) => {
        if (res.data) {
          setScooterPriceId(res.data)
          setScooterConflictPriceId(true)
        }
      })
      apiEndpointCall(
        'get',
        `price/check-set?priceName=${accessoryPrice.name}`,
        {},
        true,
        signal
      ).then((res) => {
        if (res.data) {
          setAccessoryPriceId(res.data)
          setAccessoryConflictPriceId(true)
        }
      })
    }
    checkSetPriceByName()

    const getProductPriceByType = async (): Promise<void> => {
      const [scooterResponse, accessoryResponse] = await Promise.all([
        apiEndpointCall(
          'get',
          'price/price-by-type?productType=scooter',
          {},
          true,
          signal
        ),
        apiEndpointCall(
          'get',
          'price/price-by-type?productType=accessory',
          {},
          true,
          signal
        ),
      ])
      setScooterPriceId(scooterResponse?.data)
      setAccessoryPriceId(accessoryResponse?.data)
    }
    // getProductPriceByType()

    return () => abortController.abort()
  }, [])

  useEffect(() => {
    if (scooterPriceId) {
      console.log('scooterPriceId: ', scooterProduct)
      apiEndpointCall(
        'post',
        'scooter/check',
        scooterProduct,
        true,
        signal
      ).catch((error) => {
        // if (error?.statusCode === 409) {
        console.log('setScooterConflictProductId :', error)
        setScooterConflictProductId(true)
        // }
      })
    }
  }, [scooterPriceId, accessoryPriceId])

  const handleCreatePrice = async (
    price: IPrice,
    firstLoad?: boolean,
    signal?: any
  ): Promise<string | void> => {
    try {
      const responseProductPrice = await apiEndpointCall(
        'post',
        'price/create',
        price,
        firstLoad,
        signal
      )
      if (price.productType === 'scooter') {
        setScooterPriceId(responseProductPrice?.data?.id)
        setScooterConflictPriceId(true)
      } else {
        setAccessoryPriceId(responseProductPrice?.data?.id)
        setAccessoryConflictPriceId(true)
      }
    } catch {}
  }

  // useEffect(() => {
  //   currentUser && dispatch(fetchFileData())
  // }, [currentUser])

  /*   const [fileList, setFileList] = useState<UserData[]>([])
  const [filteredList, setFilteredList] = useState<UserData[]>([])
  const [sortedList, setSortedList] = useState<UserData[]>([])
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

  const handleStreamFileData = async <
    T extends React.FormEvent<HTMLFormElement>
  >(
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
      {/* {slFileListError && <p>{slFileListError?.message}</p>}
      {currentUser && slFileSortedList?.length > 0 && (
        <ol>
          <p>Users: {slFileSortedList.length}</p>
          {slFileSortedList.map(
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
      )} */}
      <section id="orderBox" className="flex_str_col">
        <div className="flex_center_around form_button_box wrap">
          <div className="flex_str_col form_button_box">
            <button
              type="button"
              className="grey_button"
              style={{
                opacity: scooterConflictPriceId ? 0.2 : 1,
                backgroundColor: scooterConflictPriceId ? '#ff6376' : '#59b894',
              }}
              onClick={() => handleCreatePrice(scooterPrice)}
            >
              SCOOTER PRICE
            </button>
            <button
              type="button"
              className="grey_button green"
              style={{
                opacity: scooterPriceId && !scooterConflictProductId ? 1 : 0.2,
                backgroundColor:
                  scooterPriceId && !scooterConflictProductId
                    ? '#59b894'
                    : '#ff6376',
              }}
              onClick={() =>
                apiEndpointCall('post', 'scooter/create', scooterProduct)
              }
            >
              CREATE SCOOTER
            </button>
          </div>
          <div className="flex_str_col form_button_box">
            <button
              type="button"
              className="grey_button"
              style={{
                opacity: accessoryConflictPriceId ? 0.2 : 1,
                backgroundColor: accessoryConflictPriceId
                  ? '#ff6376'
                  : '#59b894',
              }}
              onClick={() => handleCreatePrice(accessoryPrice)}
            >
              ACCESSORY PRICE
            </button>
            <button
              type="button"
              className="grey_button green"
              style={{
                opacity: accessoryPriceId ? 1 : 0.2,
                backgroundColor: accessoryPriceId ? '#59b894' : '#ff6376',
              }}
              onClick={() =>
                apiEndpointCall('post', 'accessory/create', accessoryProduct)
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
              className="grey_button"
              onClick={() =>
                apiEndpointCall('post', 'order/create', {
                  status: 'pending',
                  items: [
                    {
                      productType: 'scooter',
                      productId: '366988d3-76fa-4c86-ba37-c27b7387950e',
                      quantity: 1,
                    },
                    {
                      productType: 'scooter',
                      productId: 'fceba7b6-e1de-4a10-a1a6-3b07000d0cd9',
                      quantity: 1,
                    },
                    {
                      productType: 'accessory',
                      productId: 'a535a52c-83f1-4821-9e2c-cfa7beedda3d',
                      quantity: 4,
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
              className="grey_button"
              onClick={() => apiEndpointCall('get', 'order/orders/accessory')}
            >
              Get Orders
            </button>
          </div>
        </div>
        <hr />
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
      </section>
      <form
        id="streamFileDataForm"
        className="flex_str_col margin_b_60_30"
        onSubmit={handleStreamFileData}
      >
        <button type="submit" className="grey_button">
          Stream File Data
        </button>
      </form>
    </Div>
  )
}
