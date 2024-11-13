import { useContext, useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { AppContext } from "src/pages/_app";
import { isBrowser } from "utils/isBrowser";
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
  // const { language, setLanguage } = useContext(AppContext);
  const [language, setLanguage] = useState(
    isBrowser() ? localStorage.getItem("i18nextLng") || "en" : "en"
  );
  const versions = ["en", "ee", "de"];
  const [langList, setLangList] = useState(false);
  const langRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    if (isBrowser() && localStorage.getItem("i18nextLng")) {
      // console.log("localStorage: ", localStorage.getItem("i18nextLng"));
      i18n.changeLanguage(localStorage.getItem("i18nextLng"));
    }
    console.log("i18n: ", i18n.language, i18n.resolvedLanguage);
    // if (i18n.language !== i18n.resolvedLanguage) {
    //   i18n.changeLanguage("en");
    // }
  }, [i18n]);

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

  // this logic handles simultaneous setting language from another open page
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "i18nextLng" && e.newValue) {
        setLanguage(e.newValue);
        i18n.changeLanguage(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  useEffect(() => setLangList(false), [language]); // important for tap device

  return (
    <Ul
      className={`flex_center_center b700 grey relative ${
        langList ? "active" : ""
      }`}
      ref={langRef}
    >
      {/* <li className="lang_base">{language.toLocaleUpperCase()}</li> */}
      <li className="lang_list absolute">
        {/* <ul>
          {isBrowser() &&
            versions
              .filter((i) => i !== language)
              .map((item) => (
                <li
                  key={item}
                  onClick={() => (
                    i18n.changeLanguage(item),
                    setLanguage(item),
                    localStorage.setItem("i18nextLng", item)
                  )}
                >
                  {item.toLocaleUpperCase()}
                </li>
              ))}
        </ul> */}
      </li>
      <li className="lang_arrow">
        <LangArrowSVG />
      </li>
    </Ul>
  );
};
