import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { IPrice } from 'types/interface'
import { apiEndpointCall } from 'utils/endpointApiCall'
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
  const { currentUser } = useContext(AppContext)
  const [scooterPriceId, setScooterPriceId] = useState('')
  const [accessoryPriceId, setAccessoryPriceId] = useState('')
  const [scooterConflictProductId, setScooterConflictProductId] =
    useState(false)
  const [accessoryConflictProductId, setAccessoryConflictProductId] =
    useState(false)
  const [scooterPoductId, setScooterPoductId] = useState('')
  const [accessoryPoductId, setAccessoryPoductId] = useState('')
  const abortController = new AbortController()
  const { signal } = abortController

  const scooterPrice: IPrice = {
    name: 'Scooter Autunm Sale 2023',
    amount: 799,
    discount: 15,
    taxRate: 5,
    currency: 'USD',
    productType: 'scooter',
  }

  const accessoryPrice: IPrice = {
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
    console.log('process.env.NODE_ENV: ', process.env.NODE_ENV)
    const fetchPriceAndCheckProduct = async (
      priceName: string,
      setPriceId: (id: string) => void,
      checkEndpoint: string,
      product: any,
      setProductId: (id: string) => void,
      setConflict: (conflict: boolean) => void
    ) => {
      try {
        const { data: priceId } = await apiEndpointCall(
          'get',
          `price/check-set?priceName=${priceName}`,
          {},
          true,
          signal
        )

        console.log("priceId: ", priceId)

        if (!priceId || signal.aborted) return
        setPriceId(priceId)

        const { data: productId } = await apiEndpointCall(
          'post',
          checkEndpoint,
          { ...product, priceId },
          true,
          signal
        )

        if (!productId || signal.aborted) return
        setProductId(productId)
        setConflict(true)
      } catch (error) {
        if (!signal.aborted) {
          console.error(`Error checking price for ${priceName}:`, error)
          setConflict(true)
        }
      }
    }

    const checkSetPrices = async () => {
      await Promise.all([
        fetchPriceAndCheckProduct(
          scooterPrice.name,
          setScooterPriceId,
          'scooter/check',
          scooterProduct,
          setScooterPoductId,
          setScooterConflictProductId
        ),
        fetchPriceAndCheckProduct(
          accessoryPrice.name,
          setAccessoryPriceId,
          'accessory/check',
          accessoryProduct,
          setAccessoryPoductId,
          setAccessoryConflictProductId
        ),
      ])
    }

    checkSetPrices()

    return () => abortController.abort()
  }, [])

  const handleCreatePrice = async (price: IPrice): Promise<string | void> => {
    apiEndpointCall('post', 'price/create', price, false, signal).then(
      ({ data }) => {
        if (signal.aborted) return
        if (data.productType === 'scooter') {
          setScooterPriceId(data?.id)
        } else {
          setAccessoryPriceId(data?.id)
        }
      }
    )
  }

  const handleCreateProduct = async (
    type: string,
    product: any
  ): Promise<string | void> => {
    apiEndpointCall('post', `${type}/create`, product, false, signal).then(
      ({ data }) => {
        if (signal.aborted) return
        if (type === 'scooter') {
          setScooterPoductId(data.id)
          setScooterConflictProductId(true)
        } else {
          setAccessoryPoductId(data.id)
          setAccessoryConflictProductId(true)
        }
      }
    )
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
                opacity: scooterPriceId ? 0.2 : 1,
                backgroundColor: scooterPriceId ? '#ff6376' : '#59b894',
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
                opacity: accessoryPriceId ? 0.2 : 1,
                backgroundColor: accessoryPriceId ? '#ff6376' : '#59b894',
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
                opacity: !currentUser || !scooterPoductId ? 0.2 : 1,
                backgroundColor: !currentUser
                  ? 'skyblue'
                  : scooterPoductId
                  ? '#59b894'
                  : '#ff6376',
              }}
              onClick={() =>
                apiEndpointCall('post', 'order/create', {
                  status: 'pending',
                  items: [
                    {
                      productType: 'scooter',
                      productId: scooterPoductId,
                      quantity: 1,
                    },
                  ],
                })
              }
            >
              MAKE SCOOTER ORDER
            </button>
          </div>

          <div className="flex_str_col">
            <button
              type="button"
              className="grey_button"
              style={{
                opacity: !currentUser || !accessoryPoductId ? 0.2 : 1,
                backgroundColor: !currentUser
                  ? 'skyblue'
                  : accessoryPoductId
                  ? '#59b894'
                  : '#ff6376',
              }}
              onClick={() =>
                apiEndpointCall('post', 'order/create', {
                  status: 'pending',
                  items: [
                    {
                      productType: 'accessory',
                      productId: accessoryPoductId,
                      quantity: 4,
                    },
                  ],
                })
              }
            >
              MAKE ACCESSORY ORDER
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
                opacity: currentUser ? 1 : 0.2,
                backgroundColor: currentUser ? '#59b894' : 'skyblue',
              }}
              onClick={() => apiEndpointCall('get', 'order/orders/scooter')}
            >
              Get Scooter Orders
            </button>
          </div>
          <div className="flex_str_col">
            <button
              type="button"
              className="grey_button"
              style={{
                opacity: currentUser ? 1 : 0.2,
                backgroundColor: currentUser ? '#59b894' : 'skyblue',
              }}
              onClick={() => apiEndpointCall('get', 'order/orders/accessory')}
            >
              Get Accessory Orders
            </button>
          </div>
        </div>
        <hr />
      </section>
    </Div>
  )
}
