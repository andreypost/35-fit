import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
// import './Training.scss'
// import { Link } from 'react-router-dom'
import { HeaderBanner } from 'HeaderBanner'
import axios from 'axios'
import { IAuth } from 'types/interface'

const Main = styled.main`
  /* .reserve_banner { */
  /* padding-top: 40px;
    padding-bottom: 40px;
    background: url(${require('../img/patterns/pattern_bg_footer_banner.png')})
      center 30% / contain no-repeat; */
  /* } */
  .reserver {
    margin-bottom: 20px;
  }
  @media (max-width: 768px) {
  }
  @media (min-width: 769px) {
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
    })
  // [gender, setGender] = useState('')

  const genderOptions = [
    { value: '', label: 'Select Gender' },
    { value: 'nonBinary', label: 'Non-binary' },
    { value: 'male', label: 'Male' },
    { value: 'femail', label: 'Femail' },
  ]
  // useEffect(() => {
  //   setOpacity('active')
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
        <aside></aside>
        <form id="authForm" onSubmit={handleAuthSubmit}>
          <fieldset>
            <legend>First name:</legend>
            <input
              type="text"
              name="name"
              placeholder="name"
              onChange={handleChangeAuthData}
              // required
            />
          </fieldset>
          <fieldset>
            <legend>Surname:</legend>
            <input
              type="text"
              name="surname"
              placeholder="surname"
              onChange={handleChangeAuthData}
              // required
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
              placeholder="age"
              onChange={handleChangeAuthData}
              // required
            />
          </fieldset>
          <fieldset>
            <legend>Country:</legend>
            <input
              type="text"
              name="country"
              placeholder="country"
              onChange={handleChangeAuthData}
              // required
            />
          </fieldset>
          <fieldset>
            <legend>City:</legend>
            <input
              type="text"
              name="city"
              placeholder="city"
              onChange={handleChangeAuthData}
              // required
            />
          </fieldset>

          <fieldset>
            <legend>E-mail:</legend>
            <input
              type="email"
              name="email"
              placeholder="email"
              onChange={handleChangeAuthData}
              // required
            />
          </fieldset>
          <fieldset>
            <legend>Password:</legend>
            <input
              type="password"
              name="password"
              placeholder="password"
              onChange={handleChangeAuthData}
              // required
            />
          </fieldset>

          <button type="submit">Continue</button>
        </form>
      </section>
    </Main>
  )
}
export default Reserve
