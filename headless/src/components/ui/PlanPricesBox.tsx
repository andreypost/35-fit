import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import { IPlanPricesBoxRoute } from 'types/interface'
import { GreenButton } from './GreenButton'

const Div = styled.div`
  background-color: #fff;
  .box_top,
  .box_bottom {
    hr {
      margin-bottom: 30px;
    }
    .box_price {
      font-size: 48px;
      margin-bottom: 20px;
    }
    .box_month {
      font-size: 36px;
    }
    .box_subtitle {
      font-size: 18px;
      margin-bottom: 30px;
    }
    width: 100%;
    margin-right: auto;
    margin-left: auto;
    .green_button {
      margin-right: auto;
      margin-left: auto;
    }
  }
  .box_bottom .box_descript {
    font-size: 18px;
  }
  &.banner {
    gap: 60px;
    .box_top,
    .box_bottom {
      flex: 1;
    }
  }
  &.box {
    padding: 40px 15px;
    .box_plan {
      font-size: 12px;
      margin-bottom: 20px;
    }
  }
  &.text {
  }
  @media (max-width: 1023px) {
    .box_top {
      .box_title {
        font-size: 32px;
        margin-bottom: 20px;
      }
    }
    &.banner {
      flex-flow: column;
      padding: 40px 10px;
    }
  }
  @media (min-width: 1024px) {
    .box_top {
      .box_title {
        font-size: 36px;
        margin-bottom: 30px;
      }
      .box_price {
        margin-bottom: 30px;
      }
      .box_subtitle {
        margin-bottom: 50px;
      }
    }
    &.banner {
      padding: 60px 40px;
    }
  }
`

export const PlanPricesBox = ({
  className,
  title = '',
  subTitle = '',
  description = '',
  price = '',
  sales = 0,
  button = '',
}: IPlanPricesBoxRoute) => {
  const { t } = useTranslation()

  return (
    <Div
      className={`plan_prices_box shadow_radius flex ${
        className ? className : ''
      }`}
    >
      {className !== 'text' && (
        <article className="box_top center">
          {className === 'box' && <p className="box_plan b900 grey">PLAN</p>}
          <h2 className="box_title b900 blue">
            {/\./g.test(title) ? t(title) : title}
          </h2>
          {className === 'box' && <hr />}
          <p className="box_subtitle b900 blue">{subTitle}</p>
          <p className="box_price b900 green">{price}</p>
          {className === 'box' && (
            <p className="box_month b900 blue">monthly</p>
          )}
          {button && <GreenButton text={button} />}
        </article>
      )}
      {(className === 'banner' || className === 'text') && (
        <article className="box_bottom">
          <p className="box_descript grey">
            {/\./g.test(description) ? t(description) : description}
          </p>
        </article>
      )}
    </Div>
  )
}
