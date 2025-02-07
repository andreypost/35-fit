import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { IGetImageById, IGetImages, IPrice } from 'types/interface'
import { useQuery } from '@apollo/client'
import { GET_IMAGES, GET_IMAGE_BY_ID } from 'queries'
import { useAppDispatch, useAppSelector } from 'utils/hooks'
import { UserData, fetchFileData, setSlSortedList } from 'slices/fileData.slice'
import { apiEndpointCall } from 'utils/endpointApiCall'
import axios from 'axios'
import { AppContext } from '../AppRouter'
import { TestingOrder } from './TestingOrder'

const Div = styled.div`
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

/* const ImagesList = ({ categoryImages }: any) => {
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
} */

export const TestingModule = () => {
  const [index, setIndex] = useState(0)
  // const [selectedImageId, setSelectedImageId] = useState<number>(0)
  // const {
  //   loading: imageLoading,
  //   error: imageError,
  //   data: imageData,
  // } = useQuery<IGetImageById>(GET_IMAGE_BY_ID, {
  //   variables: { imageId: selectedImageId },
  //   skip: !selectedImageId,
  //   context: { credentials: 'include' },
  // })
  // const dispatch = useAppDispatch()
  // const { slFileSortedList, slFileListLoading, slFileListError } =
  //   useAppSelector(setSlSortedList)
  // const { currentUser } = useContext(AppContext)

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

  useEffect(() => {
    // console.log('TestingModule: ', process.env.API_URL)
    setIndex(Math.floor(Math.random() * countries.length))
  }, [])

  // useEffect(() => {
  //   currentUser && dispatch(fetchFileData())
  // }, [currentUser])

  /* const [fileList, setFileList] = useState<UserData[]>([])
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
      <TestingOrder />
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
      {/* {currentUser && sortedList?.length > 0 && (
        <ol>
          <p>Users: {sortedList.length}</p>
          {sortedList.map(
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
      {/* <section id="orderBox" className="flex_str_col">
        <hr />
        <ImagesList categoryImages="Coffee" />
        <p
          className="grey_button grey"
          onClick={() => setSelectedImageId(Number(!selectedImageId))}
        >
          Show the image with GraphQl query
        </p>
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
      </section> */}
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
