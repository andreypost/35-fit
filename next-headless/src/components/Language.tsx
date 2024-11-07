import { useContext, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { AppContext } from "src/pages/_app";
import { LangArrowSVG } from "icons";

const Ul = styled.ul`
  margin-left: auto;
  font-size: 20px;
  .lang_base {
    width: 26px;
  }
  .lang_list {
    visibility: hidden;
    opacity: 0;
    top: 34px;
    left: 0;
    transition: opacity 0.5s linear;
    li:hover {
      color: #ff6376;
    }
  }
  .lang_arrow svg {
    width: 16px;
    height: 11px;
    margin-left: 8px;
    margin-bottom: 1px;
    fill: #737373;
    transition: transform 0.2s;
  }
  &.active {
    .lang_base {
      color: #ff6376;
    }
    .lang_list {
      visibility: visible;
      opacity: 1;
    }
    .lang_arrow svg {
      fill: #ff6376;
      transform: rotate(180deg);
    }
  }
  @media (hover: hover) {
    cursor: pointer;
  }
`;

export const Language = () => {
  const { i18n } = useTranslation("common");
  const { language, setLanguage } = useContext(AppContext);
  const versions = ["en", "ee", "de"];
  const [langList, setLangList] = useState(false);
  const langRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const handleMouseEnter = () => setLangList(true);
    const handleMouseLeave = () => setLangList(false);
    const langRefElem = langRef?.current;

    if (langRefElem) {
      langRefElem.addEventListener("mouseenter", handleMouseEnter);
      langRefElem.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        langRefElem.removeEventListener("mouseenter", handleMouseEnter);
        langRefElem.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  useEffect(() => setLangList(false), [language]);

  return (
    <Ul
      className={`flex_center_center b700 grey relative ${
        langList ? "active" : ""
      }`}
      ref={langRef}
    >
      <li className="lang_base">{language.toLocaleUpperCase()}</li>
      <li className="lang_list absolute">
        <ul>
          {versions.splice(versions.indexOf(language), 1) &&
            versions.map((item) => (
              <li
                key={item}
                onClick={() => (
                  i18n.changeLanguage(item), setLanguage(i18n.language)
                )}
              >
                {item.toLocaleUpperCase()}
              </li>
            ))}
        </ul>
      </li>
      <li className="lang_arrow">
        <LangArrowSVG />
      </li>
    </Ul>
  );
};
