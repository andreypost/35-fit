import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { RESERVE_ROUTE } from 'utils/routes.constants'
import { useAppSelector, useAppDispatch } from 'utils/hooks'
import { BaseDiv } from './MenuModal'
import {
  // messageErrorModal,
  selectLoginModalActive,
  unsetLoginModal,
} from 'slices/modal.slice'
import { IFirebaseProps, IGetImageById, IGetImages } from 'types/interface'
import { CrossRedSVG } from 'img/icons'
import axios from 'axios'
import { useMutation, useQuery } from '@apollo/client'
import { GET_IMAGES, GET_IMAGE_BY_ID, LOGIN_USER } from 'queries'

const Div = styled(BaseDiv)`
  display: block;
  nav {
    text-align: center;
    .use_google,
    a {
      font-size: 14px;
    }
    a,
    .checkmark {
      height: 42px;
    }
    #loginForm {
      max-width: 330px;
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
      .check_box {
        margin-bottom: unset;
        margin-left: unset;
        padding-left: unset;
        user-select: none;
        input {
          width: 100%;
          opacity: 0;
          @media (hover: hover) {
            cursor: pointer;
          }
        }
        .checkmark {
          box-sizing: border-box;
          width: 42px;
          margin-right: 15px;
          border: 2px solid #b2b2b2;
          border-radius: 50%;
          transition: background-color 0.2s;
        }
        &:hover input ~ .checkmark {
          background-color: #b2b2b2;
        }
        input:checked ~ .checkmark {
          background-color: white;
          &::after {
            content: '';
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background-color: #004;
          }
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
      .use_google {
        transition: color 0.2s;
        &:hover {
          color: #ff6376;
        }
        @media (hover: hover) {
          cursor: pointer;
        }
      }
    }
    .login_book {
      display: flex;
      justify-content: center;
      article {
        width: 100%;
        max-width: 330px;
        a {
          width: 100%;
          margin-top: 30px;
          border-radius: 26px;
          background: #000044;
          transition: color 0.2s;
          &:hover {
            color: #59b894;
          }
        }
      }
    }
    @media (max-width: 1023px) {
      flex-flow: column;
      #loginForm {
        padding: 40px 20px;
        h1,
        .check_box {
          margin-bottom: 30px;
        }
        h1 {
          font-size: 28px;
        }
      }
      .login_book {
        height: 476px;
        article {
          padding: 60px 20px;
          h2 {
            font-size: 20px;
          }
        }
      }
    }
    @media (min-width: 1024px) {
      max-width: 980px;
      display: grid;
      grid-template-columns: 1fr 1fr;
      #loginForm {
        width: 100%;
        order: 2;
        padding-top: 60px;
        padding-bottom: 60px;
        h1,
        .check_box {
          margin-bottom: 40px;
        }
        h1 {
          font-size: 36px;
        }
      }
      .login_book {
        order: 1;
        article {
          margin-top: auto;
          padding-bottom: 70px;
        }
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

export const LoginModal = ({ user, login }: IFirebaseProps) => {
  const dispatch = useAppDispatch(),
    modalState = useAppSelector(selectLoginModalActive),
    { t } = useTranslation(),
    [email, setEmail] = useState(''),
    [password, setPassword] = useState(''),
    // [errorMessage, setErrorMessage] = useState(''),
    [checkState, setCheckState] = useState(false),
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
    }),
    [loginUser] = useMutation(LOGIN_USER, {
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
      const logUserRes = await axios.post(
        `${process.env.API_URL}/auth/login`,
        {
          email: 'test_08@email.com',
          password: '9999',
        },
        { withCredentials: true }
      )
      console.log('/auth/login:', logUserRes)
      // const getAuthAllUsers = await axios.get(
      //   `${process.env.API_URL}/auth/users`,
      //   { withCredentials: true }
      // )
      // console.log(index, '/auth/users - get all users: ', getAuthAllUsers.data)
      // const createUserRes = await axios.post(
      //   `${process.env.API_URL}/auth/create-new-user`,
      //   {
      //     name: 'Andrii',
      //     age: '20 + index',
      //     email: 'test_08@email.com',
      //     password: '9999',
      //   },
      // )
      // console.log('/auth/create-new-user:', createUserRes)
      // console.log('/auth/create-new-user:', createUserRes.data)
    } catch (err: any) {
      console.error(err?.response?.data?.message || err?.message)
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
      console.error(err?.response?.data?.message || err?.message)
    }
  }

  useEffect(() => {
    console.log('LoginModal: ', process.env.API_URL)
    user && dispatch(unsetLoginModal())
    setIndex(Math.floor(Math.random() * countries.length))
  }, [user])

  const handleLogin = async <T extends React.FormEvent<HTMLFormElement>>(
    e: T
  ): Promise<void> => {
    e.preventDefault()
    // const response = await loginUser({
    //   variables: {
    //     email: 'test_08@email.com',
    //     password: '9999',
    //   },
    // })
    // console.log('/graphql loginUser:', response)
    // const formData = new FormData(e.currentTarget)
    // const userEmail = formData.get('login')
    // const userPass = formData.get('password')

    // dispatch(unsetLoginModal())
    // await new Promise((resolve) => {
    //   setTimeout(() => {
    //     resolve(dispatch(messageErrorModal()))
    //   }, 1500)
    // })

    authUsersRoutes()

    // authDetailRoutes()

    setIndex(Math.floor(Math.random() * countries.length))
  }
  return (
    <Div
      className={modalState}
      onClick={(e) =>
        e.target === e.currentTarget && dispatch(unsetLoginModal())
      }
    >
      <nav className="shadow_radius">
        <CrossRedSVG
          className="cross_icon absolute"
          onClick={() => dispatch(unsetLoginModal())}
        />
        <form id="loginForm" className="flex_str_col" onSubmit={handleLogin}>
          <ImagesList categoryImages="Coffee" />
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
          )}
          <h1 className="b900 blue">
            {t('welcome_to')}
            <br />
            35 FIT
          </h1>
          <label htmlFor="login" className="grey_label">
            {t('email_address')}
          </label>
          <input
            type="email"
            name="login"
            value={email}
            className="grey_button blue"
            placeholder={t('enter_email_address')}
            onChange={(e) => setEmail(e.target.value)}
            // required
          />
          <label htmlFor="password" className="grey_label">
            {t('password')}
          </label>
          <input
            type="password"
            name="password"
            value={password}
            className="grey_button part_radius blue"
            placeholder={t('enter_password')}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
          <label htmlFor="radio" className="flex_center grey_label check_box">
            <input
              type="radio"
              name="radio"
              className="grey_button absolute"
              checked={checkState}
              readOnly
              onClick={() => setCheckState(!checkState)}
            />
            <span className="checkmark flex_center_center" />
            {t('keep_me_logged_in')}
          </label>
          <button type="submit" className="grey_button grey">
            {t('nav.login')}
          </button>
          <p className="use_google b700 green" onClick={() => login()}>
            {t('use_google_account_sign_in')}
          </p>
        </form>
        <div className="login_book">
          <article>
            <h2 className="b900 white">{t('not_member_yet')}</h2>
            <Link className="flex_center_center b700 white" to={RESERVE_ROUTE}>
              {t('book_your_training')}
            </Link>
          </article>
        </div>
      </nav>
    </Div>
  )
}
