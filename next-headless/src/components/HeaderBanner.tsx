import { useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { useAppDispatch } from "hooks/redux";
import { unsetAllModal } from "slices/modal.slice";
import { IChildrenTitleDescrip } from "types/interface";

const Div = styled.div`
  section {
    padding-top: 144px;
  }

  h1 {
    font-size: 36px;
    margin-bottom: 40px;
  }

  p {
    max-width: 400px;
    font-size: 18px;
    padding-bottom: 70px;
  }

  &.main h1 {
    margin-bottom: 120px;
    text-transform: uppercase;
    text-align: center;
    @media (min-width: 1024px) {
      margin-bottom: 210px;
    }
  }

  @media (max-width: 1023px) {
    section {
      h3 {
        font-size: 16px;
      }
    }
  }

  @media (min-width: 1024px) {
    section {
      padding-top: 170px;
      h1 {
        font-size: 48px;
      }
      h3 {
        padding-bottom: 140px;
      }
    }
  }
`;

export const HeaderBanner = ({
  children,
  className,
  title = "",
  description = "",
}: IChildrenTitleDescrip) => {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();

  const keyDownHandler = (e: { key: string }) => {
    e.key === "Escape" && dispatch(unsetAllModal());
  };

  useEffect(() => {
    // window.scrollTo(0, 0);
    document.addEventListener("keydown", (e) => keyDownHandler(e));
    return () => {
      document.removeEventListener("keydown", keyDownHandler);
      dispatch(unsetAllModal());
    };
  }, []);

  return (
    <Div className={`header_banner ${className}`}>
      <section className="section">
        <h1 className="b900 blue">{/\./.test(title) ? t(title) : title}</h1>
        <p className="grey">
          {/\./.test(description) ? t(description) : description}
        </p>
        {children}
      </section>
    </Div>
  );
};
