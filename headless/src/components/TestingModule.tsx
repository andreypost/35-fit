import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IGetImageById, IGetImages } from 'types/interface'
import axios from 'axios'
import { useQuery } from '@apollo/client'
import { GET_IMAGES, GET_IMAGE_BY_ID } from 'queries'

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
    button {
      margin-bottom: 30px;
      background: #b2b2b2;
      transition: color 0.2s;
      &:hover {
        color: white;
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
  if (error) return <p>Error: {error.message}</p>
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
  const [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    [index, setIndex] = useState(0),
    [selectedImageId, setSelectedImageId] = useState<number>(0),
    {
      loading: imageLoading,
      error: imageError,
      data: imageData,
    } = useQuery<IGetImageById>(GET_IMAGE_BY_ID, {
      variables: { imageId: selectedImageId },
      skip: !selectedImageId,
      context: { credentials: 'include' },
    })

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

  const largeData = 'A'.repeat(1000000)

  const authUsersRoutes = async () => {
    try {
      // const getAuthAllUsers = await axios.get(
      //   `${process.env.API_URL}/auth/users`,
      //   { withCredentials: true }
      // )
      // console.log(index, '/auth/users - get all users: ', getAuthAllUsers.data)
      const addFileData = await axios.post(
        `${process.env.API_URL}/file/write`,
        {
          data: {
            id: Math.floor(100 + Math.random() * (200 - 100 + 1)),
            earnings: `$${
              Math.floor(50 + Math.random() * (100 - 50 + 1)) * (index + 1)
            }`,
            country: countries[index],
            name: 'Andrii Postoliuk',
          },
        },
        {
          withCredentials: true,
        }
      )
      console.log('/file/write - write file data: ', addFileData.data)

      const getFileData = await axios.get(`${process.env.API_URL}/file/read`, {
        withCredentials: true,
      })
      console.log('/file/read - read file data: ', getFileData.data.length)
    } catch (err: any) {
      console.error(
        err?.response?.data?.message || err?.message,
        err?.response?.data?.success,
        err
      )
    }
  }

  const authDetailRoutes = async () => {
    try {
      // const getAuthUserDetails = await axios.get(
      //   `${process.env.API_URL}/auth/details`
      // )
      // console.log('/auth/details: ', ...getAuthUserDetails.data)
      // const addNewUserDetails = await axios.post(
      //   `${process.env.API_URL}/auth/add-new-user-details`,
      //   {
      //     earnings: `$${
      //       Math.floor(50 + Math.random() * (100 - 50 + 1)) * (index + 1)
      //     }`,
      //     country: countries[index],
      //     name: 'Andrii Postoliuk',
      //   }
      // )
      // console.log(index, '/auth/add-new-user-details:', addNewUserDetails.data)
      const authDetailByEarnings = await axios.get(
        `${process.env.API_URL}/auth/average-earnings-by-country`
      )
      console.log(
        '/auth/average-earnings-by-country: ',
        authDetailByEarnings.data
      )

      // const getUserCountByCounrtyDetails = await axios.get(
      //   `${process.env.API_URL}/auth/count-by-country-details`
      // )
      // console.log(
      //   '/auth/count-by-country-details:',
      //   getUserCountByCounrtyDetails.data
      // )
      // nest-api/data/user-collection.json
      // const detailUsers = await axios.get(`${process.env.API_URL}/detail/users`)
      // console.log('/detail/users: ', detailUsers.data)
      // const detailNewUser = await axios.post(
      //   `${process.env.API_URL}/detail/add-new-user`,
      //   {
      //     earnings: `$${
      //       Math.floor(50 + Math.random() * (100 - 50 + 1)) * (index + 1)
      //     }`,
      //     country: countries[index],
      //     name: 'Andrii Postoliuk',
      //   }
      // )
      // console.log('/detail/add-new-user: ', detailNewUser)
      // const detailByCountry = await axios.get(
      //   `${process.env.API_URL}/detail/count-by-country`
      // )
      // console.log('/detail/count-by-country: ', detailByCountry.data)
      const detailByEarnings = await axios.get(
        `${process.env.API_URL}/detail/average-earnings-by-country`
      )
      console.log(
        '/detail/average-earnings-by-country: ',
        detailByEarnings.data
      )
      // const detailById = await axios.get(
      //   `${process.env.API_URL}/detail/users/${detailNewUser.data.id}`
      // )
      // console.log('/detail/users/id: ', detailById.data)
    } catch (err: any) {
      // console.error(err?.response?.data?.message || err?.message)
      console.error(
        err?.response?.data?.message || err?.message,
        err?.response?.data?.success
      )
    }
  }

  useEffect(() => {
    console.log('TestingModule: ', process.env.API_URL)
    setIndex(Math.floor(Math.random() * countries.length))
  }, [])

  const handleTesting = async <T extends React.FormEvent<HTMLFormElement>>(
    e: T
  ): Promise<void> => {
    e.preventDefault()
    try {
    } catch (err: any) {
      console.error(
        err?.response?.data?.message || err?.message,
        err?.response?.data?.success
      )
    }

    authUsersRoutes()

    // authDetailRoutes()

    setIndex(Math.floor(Math.random() * countries.length))
  }
  return (
    <Div>
      <form id="testingForm" className="flex_str_col" onSubmit={handleTesting}>
        <input
          type="email"
          name="login"
          value={email}
          className="grey_button blue"
          placeholder="enter data"
          onChange={(e) => setEmail(e.target.value)}
          // required
        />

        <input
          type="password"
          name="password"
          value={password}
          className="grey_button part_radius blue"
          placeholder="enter data"
          onChange={(e) => setPassword(e.target.value)}
          // required
        />

        <button type="submit" className="grey_button grey">
          GO
        </button>
        {/* <ImagesList categoryImages="Coffee" />
        <p
          className="grey_button grey"
          onClick={() => setSelectedImageId(Number(!selectedImageId))}
        >
          show image
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
        )} */}
      </form>
    </Div>
  )
}
