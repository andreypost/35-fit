import React, { useState, Fragment, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { HeaderBanner } from 'HeaderBanner'
import axios from 'axios'
import { IAuth, IUser } from 'types/interface'
import { PercentReserveSVG } from 'img/icons'
import { TestingModule } from 'components/TestingModule'
import { useAppDispatch } from 'utils/hooks'
import { validateAuthToken } from 'slices/databaseUser.slice'
import { messageModal } from 'slices/modal.slice'
import { errorModalMessage } from 'utils/errorModalMessage'
import { dev } from 'config'
import { apiEndpointCall } from 'utils/endpointApiCall'

const Main = styled.main`
  .reserver {
    .reserve_article {
      header {
        margin-bottom: 80px;
        h4 {
          font-size: 36px;
          margin-bottom: 20px;
        }
        p {
          font-size: 16px;
          line-height: 28px;
          color: #b2b2b2;
        }
      }
      #authForm,
      #deleteForm,
      #allUsersForm {
        .form_subtitle {
          font-size: 24px;
          margin-bottom: 40px;
        }
        .form_box {
          display: flex;
          flex-flow: column;
          gap: 20px;
        }
        fieldset {
          box-sizing: border-box;
          width: 100%;
          max-width: 420px;
          padding: 5px 0 11px 27px;
          border: 2px solid #b2b2b2;
          border-radius: 26px;
          legend {
            font-size: 14px;
            font-weight: 700;
            padding-right: 5px;
            padding-left: 5px;
            color: #6e7071;
          }
          select,
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
          input:-webkit-autofill,
          select:-webkit-autofill {
            -webkit-box-shadow: 0 0 0 1000px white inset !important;
            box-shadow: 0 0 0 1000px white inset !important;
            -webkit-text-fill-color: #004 !important;
            background-color: transparent !important;
          }
          select {
            &:hover {
              cursor: pointer;
            }
            &:focus {
              outline: none;
              border-color: transparent;
            }
          }
          input[type='number']::-webkit-outer-spin-button,
          input[type='number']::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
          }
          input[type='number'] {
            appearance: none;
            -moz-appearance: textfield;
          }
        }
        .reserve_submit,
        .additional_submit {
          box-sizing: border-box;
          height: 42px;
          margin-top: 40px;
          padding: 0px 40px;
          font-size: 16px;
          border-radius: 32px;
          background-color: #59b894;
          transition: background-color 0.4s, border-color 0.4s;
          &:hover {
            border-color: white;
            background-color: #004;
          }
        }
      }
      .additional_forms {
        width: 100%;
        justify-content: space-between;
        align-items: flex-end;
        flex-wrap: wrap;
        gap: 40px;
        button,
        input {
          width: 100%;
          max-width: 360px;
        }
      }
    }
  }
  @media (max-width: 768px) {
    .reserver {
      .reserve_aside {
        display: none;
      }
    }
  }
  @media (min-width: 769px) {
    .reserver {
      display: grid;
      grid-template-columns: 1fr 2fr;
      column-gap: 40px;
      .reserve_aside,
      .reserve_article {
        display: inherit;
        .reserve_descript p {
          max-width: 240px;
          font-size: 16px;
          line-height: 28px;
          color: #737373;
        }
      }
    }
  }
  @media (max-width: 1023px) {
    .reserver {
      .reserve_article {
        #authForm {
          .form_box {
            .form_fields {
              row-gap: 20px;
              flex-flow: column;
            }
          }
        }
      }
    }
  }
  @media (min-width: 1024px) {
    .reserver {
      .reserve_article {
        #authForm {
          .form_fields {
            column-gap: 60px;
          }
        }
      }
    }
  }
`

const Reserve = ({ user }: IUser) => {
  const { t } = useTranslation(),
    [authData, setAuthData] = useState<IAuth>({}),
    [users, setAllUsers] = useState<IAuth[]>([]),
    dispatch = useAppDispatch()

  const genderOptions = [
    { value: '', label: 'Select Gender' },
    { value: 'nonBinary', label: 'Non-binary' },
    { value: 'male', label: 'Male' },
    { value: 'femail', label: 'Femail' },
  ]

  const countryOptions = [
    { value: '', label: 'Select Country' },
    { value: 'Ukraine', label: 'Ukraine' },
    { value: 'Poland', label: 'Poland' },
    { value: 'USA', label: 'USA' },
  ]

  const cityOptions = [
    { value: '', label: 'Select City' },
    { value: 'Kyiv', label: 'Kyiv' },
    { value: 'Warsaw', label: 'Warsaw' },
    { value: 'Seattle', label: 'Seattle' },
  ]

  useEffect(() => {
    dev &&
      setAuthData({
        name: 'Andrii Postoliuk',
        surname: 'Postoliuk',
        gender: 'male',
        age: 25,
        country: 'Ukraine',
        city: 'Kyiv',
        email: '',
        password: '9999',
        phone: '0673788612',
        emergencyName: '',
        emergencyPhone: '',
      })
  }, [dev])

  const handleChangeAuthData = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setAuthData({
      ...authData,
      [name]: value,
    })
  }

  const handleAuthSubmit = async <T extends React.FormEvent<HTMLFormElement>>(
    e: T
  ): Promise<void> => {
    e.preventDefault()
    if (!dev) {
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve(
            dispatch(messageModal(t('messages.sorry_but_it_is_not_possible')))
          )
        }, 1500)
      })
    } else {
      try {
        const createNewUser = await axios.post(
          `${process.env.API_URL}/auth/create-new-user`,
          authData,
          { withCredentials: true }
        )
        console.log('createNewUser: ', createNewUser)
        dispatch(messageModal(t('messages.your_account_was_created')))
        dispatch(validateAuthToken({ firstLoad: true }))
      } catch (error: any) {
        errorModalMessage(error)
      }
    }
  }

  const handleGetAllUsers = async <T extends React.FormEvent<HTMLFormElement>>(
    e: T
  ): Promise<void> => {
    e.preventDefault()
    const response = await apiEndpointCall('get', 'auth/users')
    if (response?.data) {
      setAllUsers(response?.data)
    }
  }

  const setFieldColor = <T extends string | undefined>(field: T): string => {
    return !field ? '#7fcbae' : '#004'
  }

  return (
    <Main data-aos="fade" className="page_view">
      <HeaderBanner className="reserve" title="nav.reservation" />
      {/* <div className="reserve_banner"></div> */}
      <section className="section reserver">
        <aside className="reserve_aside">
          <PercentReserveSVG />
          <article className="reserve_descript grey">
            <p>{t('reserve.we_know_so_little')}</p>
            <p>{t('reserve.you_are_almost_there')}</p>
          </article>
          <article className="reserve_descript">
            <p>{t('reserve.we_know_so_little')}</p>
            <p>{t('reserve.you_are_almost_there')}</p>
          </article>
        </aside>

        <article className="reserve_article">
          {dev && <TestingModule user={user} />}
          <header className="grey">
            <h4 className="b900">
              {t('reserve.new_to_fit')}
              <br />
              {t('reserve.start_training_quicker')}
            </h4>
            <p>{t('reserve.as_one_of_our_main_focus')}</p>
          </header>
          <form id="authForm" onSubmit={handleAuthSubmit}>
            <header>
              <h5 className="b900 form_subtitle blue">
                {t('reserve.personal_information')}
              </h5>

              <div className="form_box">
                <div className="form_fields flex">
                  <fieldset>
                    <legend>First name:</legend>
                    <input
                      type="text"
                      name="name"
                      placeholder="First name"
                      onChange={handleChangeAuthData}
                      required={dev ? false : true}
                    />
                  </fieldset>
                  <fieldset>
                    <legend>Surname:</legend>
                    <input
                      type="text"
                      name="surname"
                      placeholder="Surname"
                      onChange={handleChangeAuthData}
                      required={dev ? false : true}
                    />
                  </fieldset>
                </div>
                <div className="form_fields flex">
                  <fieldset>
                    <legend>Gender:</legend>
                    <select
                      name="gender"
                      onChange={handleChangeAuthData}
                      required={dev ? false : true}
                      style={{
                        color: setFieldColor(authData.gender),
                      }}
                    >
                      {genderOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                  <fieldset>
                    <legend>Age:</legend>
                    <input
                      type="number"
                      name="age"
                      placeholder="Age"
                      min={1}
                      max={111}
                      onChange={handleChangeAuthData}
                      required={dev ? false : true}
                    />
                  </fieldset>
                </div>
              </div>
            </header>

            <header>
              <h5 className="b900 form_subtitle blue">
                {t('reserve.contact_information')}
              </h5>

              <div className="form_box">
                <div className="form_fields flex">
                  <fieldset>
                    <legend>Country:</legend>
                    <select
                      name="country"
                      onChange={handleChangeAuthData}
                      required={dev ? false : true}
                      style={{
                        color: setFieldColor(authData.country),
                      }}
                    >
                      {countryOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </fieldset>

                  <fieldset>
                    <legend>City:</legend>

                    <select
                      name="city"
                      onChange={handleChangeAuthData}
                      required={dev ? false : true}
                      style={{
                        color: setFieldColor(authData.city),
                      }}
                    >
                      {cityOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </fieldset>
                </div>
                <div className="form_fields flex">
                  <fieldset>
                    <legend>E-mail:</legend>
                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail address"
                      onChange={handleChangeAuthData}
                      required
                    />
                  </fieldset>
                  <fieldset>
                    <legend>Password:</legend>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChangeAuthData}
                      required={dev ? false : true}
                    />
                  </fieldset>
                </div>
              </div>
            </header>

            <fieldset>
              <legend>Phone number:</legend>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                onChange={handleChangeAuthData}
                required={dev ? false : true}
              />
            </fieldset>

            <button
              className="flex_center_center reserve_submit margin_b_60_30 b900 white"
              type="submit"
            >
              {t('reserve.continue')}
            </button>
          </form>
          {dev && (
            <>
              <h3 className="b900 blue">Additional Forms</h3>
              <div className="additional_forms margin_b_120_80">
                <form id="allUsersForm" onSubmit={handleGetAllUsers}>
                  <button
                    type="submit"
                    className="flex_center_center additional_submit b900 white"
                  >
                    Get All Users
                  </button>
                </form>
              </div>
              {users?.length > 0 &&
                users.map(({ name, email }: IAuth, index: any) => (
                  <Fragment key={index}>
                    <p>{name}</p>
                    <p>{email}</p>
                    <hr />
                  </Fragment>
                ))}
            </>
          )}
        </article>
      </section>
    </Main>
  )
}
export default Reserve
