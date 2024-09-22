import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
// import './Training.scss'
// import { Link } from 'react-router-dom'
import { HeaderBanner } from 'HeaderBanner'
import axios from 'axios'
import { IAuth } from 'types/interface'
import { PercentReserveSVG } from 'img/icons'

const Main = styled.main`
  /* .reserve_banner { */
  /* padding-top: 40px;
    padding-bottom: 40px;
    background: url(${require('../img/patterns/pattern_bg_footer_banner.png')})
      center 30% / contain no-repeat; */
  /* } */
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
      #authForm {
        fieldset {
          box-sizing: border-box;
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
          input:-webkit-autofill,
          select:-webkit-autofill {
            background-color: transparent !important;
            -webkit-box-shadow: 0 0 0px 1000px white inset;
            color: #004 !important;
          }
          select {
            option:first-of-type {
              color: #6e7071 !important;
            }
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
        .reserve_submit {
          box-sizing: border-box;
          height: 42px;
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
      }
    }
  }
  @media (max-width: 1023px) {
  }
  @media (min-width: 1024px) {
  }
`

const Reserve = () => {
  const { t } = useTranslation(),
    [authData, setAuthData] = useState<IAuth>({
      name: '',
      surname: '',
      gender: '',
      age: 0,
      country: '',
      city: '',
      email: '',
      password: '',
      phone: '',
      emergencyName: '',
      emergencyPhone: '',
    }),
    [country, setCountry] = useState('')

  const genderOptions = [
    { value: '', label: 'Select Gender' },
    { value: 'nonBinary', label: 'Non-binary' },
    { value: 'male', label: 'Male' },
    { value: 'femail', label: 'Femail' },
  ]

  const countryOptions = [
    { value: '', label: 'Select Country' },
    { value: 'ukraine', label: 'Ukraine' },
    { value: 'poland', label: 'Poland' },
    { value: 'usa', label: 'USA' },
  ]

  const cityOptions = [
    { value: '', label: 'Select City' },
    { value: 'kyiv', label: 'Kyiv' },
    { value: 'warsaw', label: 'Warsaw' },
    { value: 'seattle', label: 'Seattle' },
  ]
  // useEffect(() => {
  // }, [])

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
    console.log('authData: ', authData)
    try {
      const createNewUser = await axios.post(
        `${process.env.API_URL}/auth/create-new-user`,
        authData,
        { withCredentials: true }
      )
      console.log('createNewUser: ', createNewUser)
    } catch (err: any) {
      console.error(
        err?.response?.data?.message || err?.message,
        err?.response?.data?.success
      )
    }
  }

  return (
    <Main data-aos="fade" className="page_view">
      <HeaderBanner className="reserve" title="nav.reservation" />
      {/* <div className="reserve_banner"></div> */}
      <section className="section reserver">
        <aside className="reserve_aside">
          <PercentReserveSVG />
          <article>
            <p>{t('reserve.we_know_so_little')}</p>
            <p>{t('reserve.you_are_almost_there')}</p>
          </article>
          <article>
            <p>{t('reserve.we_know_so_little')}</p>
            <p>{t('reserve.you_are_almost_there')}</p>
          </article>
        </aside>

        <article className="reserve_article">
          <header className="grey">
            <h4 className="b900">
              {t('reserve.new_to_fit')}
              <br />
              {t('reserve.start_training_quicker')}
            </h4>
            <p>{t('reserve.as_one_of_our_main_focus')}</p>
          </header>
          <form id="authForm" onSubmit={handleAuthSubmit}>
            <fieldset>
              <legend>First name:</legend>
              <input
                type="text"
                name="name"
                placeholder="First name"
                onChange={handleChangeAuthData}
                required
              />
            </fieldset>
            <fieldset>
              <legend>Surname:</legend>
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                onChange={handleChangeAuthData}
                required
              />
            </fieldset>
            <fieldset>
              <legend>Gender:</legend>
              <select name="gender" onChange={handleChangeAuthData} required>
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
                required
              />
            </fieldset>

            <fieldset>
              <legend>Country:</legend>

              <select name="country" onChange={handleChangeAuthData} required>
                {countryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </fieldset>

            <fieldset>
              <legend>City:</legend>

              <select name="city" onChange={handleChangeAuthData} required>
                {cityOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </fieldset>

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
                required
              />
            </fieldset>

            <fieldset>
              <legend>Phone number:</legend>
              <input
                type="tel"
                name="phone"
                placeholder="Phone number"
                onChange={handleChangeAuthData}
                required
              />
            </fieldset>
            <button
              className="flex_center_center reserve_submit b900 white"
              type="submit"
            >
              {t('reserve.continue')}
            </button>
          </form>
        </article>
      </section>
    </Main>
  )
}
export default Reserve
