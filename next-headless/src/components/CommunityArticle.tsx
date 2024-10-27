import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { ICoachTitleDescrip } from "types/interface";

const Article = styled.article`
  h2 {
    max-width: 420px;
    font-size: 32px;
    span {
      font-size: 21px;
    }
  }
  p {
    max-width: 560px;
    font-size: 18px;
    line-height: 24px;
  }
  @media (max-width: 1023px) {
    flex-flow: column;
    gap: 20px;
    &.alignCenter {
      align-items: center;
      text-align: center;
    }
  }
  @media (min-width: 1024px) {
    p {
      line-height: 32px;
    }
  }
`;

export const CommunityArticle = ({
  className,
  title = "",
  subTitle,
  description = "",
  coach,
}: ICoachTitleDescrip) => {
  const { t } = useTranslation("common");

  return (
    <Article
      className={`com_article section flex_start_bet margin_b_60_30 ${
        className ? className : ""
      }`}
    >
      <h2
        className="b900 blue"
        style={{ lineHeight: subTitle ? "22px" : "inherit" }}
      >
        {t(title)}
        {subTitle && (
          <>
            <br />
            <span>#{t("common.connected_to")}</span>
            <span className="green">{t("common.results")}</span>
          </>
        )}
        {coach && (
          <>
            <br />
            <span>{coach}</span> <span>insta</span>
          </>
        )}
      </h2>
      <p className="grey">{t(description)}</p>
    </Article>
  );
};
