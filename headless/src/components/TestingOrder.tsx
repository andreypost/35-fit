import React, { Fragment, useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { IPrice } from 'types/interface'
import { useAppDispatch, useAppSelector } from 'utils/hooks'
// import { UserData, fetchFileData, setSortedList } from 'slices/fileData.slice'
import { apiEndpointCall } from 'utils/endpointApiCall'
// import axios from 'axios'
import { AppContext } from '../AppRouter'

const Div = styled.div`
  #orderBox {
    margin-left: auto;
    margin-right: auto;
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

export const TestingOrder = () => {
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
  const [scooterPoductId, setScooterPoductId] = useState('')
  const [accessoryPoductId, setAccessoryPoductId] = useState('')

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

    return () => abortController.abort()
  }, [])

  const handleCreatePrice = async (price: IPrice): Promise<string | void> => {
    apiEndpointCall('post', 'price/create', price).then(({ data }) => {
      if (data.productType === 'scooter') {
        setScooterPriceId(data?.id)
        setScooterConflictPriceId(true)
      } else {
        setAccessoryPriceId(data?.id)
        setAccessoryConflictPriceId(true)
      }
    })
  }

  useEffect(() => {
    if (scooterPriceId) {
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
  }, [scooterPriceId])

  useEffect(() => {
    if (accessoryPriceId) {
      apiEndpointCall(
        'post',
        'accessory/check',
        accessoryProduct,
        true,
        signal
      ).catch((error) => {
        // if (error?.statusCode === 409) {
        console.log('setAccessoryConflictProductId :', error)
        setAccessoryConflictProductId(true)
        // }
      })
    }
  }, [accessoryPriceId])

  const handleCreateProduct = async (
    type: string,
    product: any
  ): Promise<string | void> => {
    apiEndpointCall('post', `${type}/create`, product).then(({ data }) => {
      if (type === 'scooter') {
        console.log('setScooterPoductId: ', data)
        setScooterPoductId(data.id)
        setScooterConflictProductId(true)
      } else {
        console.log('setAccessoryPoductId: ', data)
        setAccessoryPoductId(data.id)
        setAccessoryConflictProductId(true)
      }
    })
  }

  return (
    <Div>
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
              onClick={() => handleCreateProduct('scooter', scooterProduct)}
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
                opacity:
                  accessoryPriceId && !accessoryConflictProductId ? 1 : 0.2,
                backgroundColor:
                  accessoryPriceId && !accessoryConflictProductId
                    ? '#59b894'
                    : '#ff6376',
              }}
              onClick={() => handleCreateProduct('accessory', accessoryProduct)}
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
              style={{
                opacity: scooterPoductId && accessoryPoductId ? 1 : 0.2,
                backgroundColor:
                  scooterPoductId && accessoryPoductId ? '#59b894' : '#ff6376',
              }}
              onClick={() =>
                apiEndpointCall('post', 'order/create', {
                  status: 'pending',
                  items: [
                    // {
                    //   productType: 'scooter',
                    //   productId: scooterPoductId,
                    //   quantity: 1,
                    // },
                    {
                      productType: 'accessory',
                      productId: accessoryPoductId,
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
      </section>
    </Div>
  )
}
