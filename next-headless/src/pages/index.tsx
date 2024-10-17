import { useRef, useEffect } from "react";
import useAos from "hooks/aos";
import Image from "next/image";
import { IUser } from "types/interface";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import styled from "styled-components";
import { RESERVE_ROUTE, PRICE_ROUTE, TRAIN_ROUTE } from "constants/routes";
import { HeaderBanner } from "HeaderBanner";
import { GreenButton } from "components/ui/GreenButton";
import { GreenGreyLine } from "components/ui/GreenGreyLine";
import { ImageDescription } from "components/ImageDescription";
import { CommunityArticle } from "components/CommunityArticle";
import { InstaImages } from "components/InstaImages";
import { FooterBanner } from "FooterBanner";
import {
  MinutesSVG,
  RedRuporSVG,
  SuccessSVG,
  SupportSVG,
  TieFitSVG,
  TieWowSVG,
} from "icons";
import add_01 from "public/img/adds/add_1_1.jpg";
import add_02 from "public/img/adds/add_1_2.jpg";
import add_03 from "public/img/adds/add_1_3.jpg";
import pattern_bg_1_3 from "public/img/patterns/pattern_bg_1_3.webp";

const MainBlock = styled.main`
  .header_new {
    display: grid;
    justify-content: center;
    padding-bottom: 121px;
    h4 {
      font-size: 22px;
      svg {
        left: -60px;
        top: -68px;
      }
    }
    p {
      font-size: 54px;
      span {
        font-size: 28px;
      }
      .header_month {
        color: #ff6376;
      }
    }
  }
  .rupor {
    display: grid;
    gap: 25px;
    text-align: center;
    .rupor_trial,
    .rupor_book {
      padding: 30px 20px;
    }
    .rupor_trial {
      background: #000044;
      svg {
        top: -70px;
        left: -30px;
        @media (max-width: 1023px) {
          width: 120px;
          height: 120px;
        }
      }
      h6 {
        font-size: 86px;
        span {
          font-size: 64px;
        }
      }
      p {
        font-size: 24px;
        margin-bottom: 23px;
      }
    }
    .rupor_book {
      display: flex;
      flex-flow: column;
      p {
        font-size: 32px;
        margin-bottom: 76px;
      }
      a {
        height: 54px;
        font-size: 15px;
      }
    }
  }
  .rupor_member {
    box-sizing: border-box;
    max-width: 765px;
    margin: 25px auto 0;
    padding: 28px 30px 13px;
    h6 {
      font-size: 22px;
    }
    p {
      font-size: 16px;
    }
  }
  .main_icons {
    gap: 40px;
    h3 {
      max-width: 280px;
    }
  }
  .main_wow article {
    margin-bottom: 30px;
    p {
      svg {
        width: 160px;
        left: -60px;
        top: -65px;
      }
      font-size: 46px;
      span {
        font-size: 24px;
      }
      .header_month {
        color: #ff6376;
      }
    }
    h2 {
      font-size: 32px;
    }
  }
  @media (max-width: 1023px) {
    h4 svg {
      width: 163px;
      height: 90px;
    }
    .rupor_trial,
    .rupor_book,
    .rupor_member {
      box-sizing: border-box;
      width: 100%;
      max-width: 330px;
      justify-self: center;
    }
    .main_icons {
      flex-flow: column;
    }
    .main_wow article {
      flex-flow: column;
      gap: 75px;
    }
  }
  @media (min-width: 1024px) {
    .header_new {
      h4 svg {
        left: -80px;
        top: -91px;
      }
    }
    .rupor {
      grid-template-columns: 370px 370px;
      justify-content: center;
      .rupor_trial,
      .rupor_book {
        padding: 37px 47px;
      }
      .rupor_trial svg {
        top: -100px;
        left: -100px;
      }
      .rupor_book a {
        height: 64px;
        font-size: 18px;
      }
    }
    .main_wow article {
      gap: 120px;
    }
  }
`;

const Main = ({ user }: IUser) => {
  const { t } = useTranslation();
  return (
    <MainBlock data-aos="fade" ref={useAos()} className="page_view">
      <HeaderBanner className="main" title="nav.personal_training">
        <div className="header_new blue">
          <h4 className="b900 uppercase relative">
            <TieFitSVG className="absolute" />
            {t("header_banner.new_standard")}
          </h4>
          <p className="b900 uppercase">
            35<span>€</span>
            <span className="header_month">/{t("header_banner.month")}</span>
          </p>
        </div>
      </HeaderBanner>
      <div className="section margin_b_120_80">
        <div className="rupor white">
          <div className="rupor_trial relative shadow_radius">
            <RedRuporSVG className="absolute" />
            <h6>
              17<span className="b900">€</span>
            </h6>
            <p className="b900">3 {t("main.classes")}</p>
            <GreenButton route={RESERVE_ROUTE} />
          </div>
          <div className="rupor_book shadow_radius">
            <p className="b900 grey">{t("main.connected_results")}</p>
            <Link
              className="light_grey_button hover_green_white b900 green"
              href={PRICE_ROUTE}
            >
              {t("main.book_class")}
            </Link>
          </div>
        </div>
        <div className="rupor_member center shadow_radius">
          <h6 className="b900 grey">{t("main.number_memberships")}</h6>
          <GreenGreyLine sales={76} />
          <p className="b900 blue uppercase">76%{t("main.sold")}</p>
        </div>
      </div>
      <ImageDescription
        imgSrc={add_01}
        title="nav.personal_training"
        description="header_banner.35_minute_high"
        link={TRAIN_ROUTE}
      />
      <div className="section flex_center_bet main_icons center">
        <div>
          <SupportSVG />
          <h3 className="b900 grey">{t("main.more_time_for_personal")}</h3>
        </div>
        <div>
          <MinutesSVG />
          <h3 className="b900 grey">{t("main.35_minutes_to_better")}</h3>
        </div>
        <div>
          <SuccessSVG />
          <h3 className="b900 grey">
            {t("main.versatile_training_incentives")}
          </h3>
        </div>
      </div>
      <Image src={pattern_bg_1_3} alt="" />
      <div className="section main_wow margin_b_60_30 center">
        <article className="flex_center_center blue">
          <h2 className="b900 uppercase">{t("nav.personal_training")}</h2>
          <p className="b900 uppercase relative">
            <TieWowSVG className="absolute" />
            35<span>€</span>
            <span className="header_month">/{t("header_banner.month")}</span>
          </p>
        </article>
        <h2 className="b900 blue">{t("main.how_is_it_possible")}</h2>
      </div>
      <ImageDescription
        imgSrc={add_02}
        title="main.connected_training_system"
        description="main.never_before_has_digital"
        link={TRAIN_ROUTE}
      />
      <ImageDescription
        className="right_img"
        imgSrc={add_03}
        title="main.training_by_science"
        description="main.the_milonizer_can_determine"
        link={TRAIN_ROUTE}
      />
      <CommunityArticle
        className="alignCenter"
        title="main.pick_a_day"
        description="header_banner.training_becomes"
      />
      <Image src={pattern_bg_1_3} alt="" />
      <CommunityArticle
        title="35fit_community"
        subTitle={true}
        description="header_banner.training_becomes"
      />
      <InstaImages />
      <FooterBanner
        title="main.trial_foot_banner_title"
        price="17"
        subTitle="3 classes / 10 days"
      />
    </MainBlock>
  );
};
export default Main;
