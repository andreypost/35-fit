import styled from "styled-components";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { IImageLinkTitleDescrip } from "types/interface";
import Image from "next/image";

const Div = styled.div`
  display: grid;
  align-items: center;
  gap: 35px;
  article {
    max-width: 480px;
    h3 {
      font-size: 28px;
      margin-bottom: 30px;
    }
    p {
      font-size: 18px;
      line-height: 24px;
      margin-bottom: 40px;
    }
  }
  @media (min-width: 1024px) {
    grid-template-columns: 1.4fr 1fr;
    &.right_img {
      grid-template-columns: 1fr 1.4fr;
      img {
        order: 2;
      }
      article {
        order: 1;
      }
    }
    article {
      p {
        font-size: 21px;
        line-height: 32px;
      }
    }
  }
`;

export const ImageDescription = ({
  className,
  imgSrc,
  title = "",
  description = "",
  link,
}: IImageLinkTitleDescrip) => {
  const { t } = useTranslation("common");

  return (
    <Div
      data-aos="fade-up"
      data-aos-duration="1000"
      className={`image_descript section margin_b_60_30 ${
        className ? className : ""
      }`}
    >
      <Image src={imgSrc} className="shadow_radius" alt="" />
      <article className="grey">
        <h3 className="b900">{t(title)}</h3>
        <p>{t(description)}</p>
        {link && (
          <Link
            className="light_grey_button hover_green_white green"
            href={link}
          >
            {t("main.discover_more")}
          </Link>
        )}
      </article>
    </Div>
  );
};
