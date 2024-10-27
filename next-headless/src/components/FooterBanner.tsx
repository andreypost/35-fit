import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { IRoutePriceTitle } from "types/interface";
import { RedRuporSVG } from "icons";
import { GreenButton } from "./ui/GreenButton";

const Div = styled.div`
  max-width: 1440px;
  margin: auto auto -20px;
  padding: 0 20px;
  section {
    height: 440px;
    background: url("/img/patterns/pattern_bg_footer_banner.webp") no-repeat
        center 360% / cover,
      #fff;
    .fb_rupor {
      margin: 0px 200px -150px 0px;
    }
    .fb_title {
      font-size: 32px;
    }
    .fb_price {
      font-size: 104px;
      span {
        font-size: 46px;
      }
    }
    .fb_subtitle {
      font-size: 22px;
      margin-bottom: 20px;
    }
  }
  @media (min-width: 1024px) {
    section {
      .fb_rupor {
        margin-right: -320px;
      }
      .fb_title {
        font-size: 36px;
      }
      .fb_price {
        font-size: 124px;
        span {
          font-size: 68px;
        }
      }
      .fb_subtitle {
        font-size: 24px;
      }
    }
  }
`;

export const FooterBanner = ({
  className,
  title = "",
  price,
  subTitle = "",
  route = "/reserve",
}: IRoutePriceTitle) => {
  const { t } = useTranslation("common");

  return (
    <Div data-aos="fade" className={`footer_banner relative ${className}`}>
      <section className="flex_center_center_col shadow_radius center blue">
        <RedRuporSVG className="fb_rupor" />
        <h5 className="fb_title b900 relative">{t(title)}</h5>
        <h6 className="fb_price">
          {price}
          <span>€</span>
        </h6>
        <p className="fb_subtitle b900">{subTitle}</p>
        <GreenButton route={route} />
      </section>
    </Div>
  );
};
