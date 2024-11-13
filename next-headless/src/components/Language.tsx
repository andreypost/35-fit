import { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import { useTranslation } from "next-i18next";
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
  const [language, setLanguage] = useState("en");
  const versions = ["en", "ee", "de"];
  const [langList, setLangList] = useState(false);
  const langRef = useRef<HTMLUListElement>(null);

  const setLanguageHandler = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    document.documentElement.lang = lng;
  };

  useEffect(() => {
    if (isBrowser()) {
      const i18nextLng = localStorage.getItem("i18nextLng");
      if (i18nextLng && versions.includes(i18nextLng)) {
        setLanguageHandler(i18nextLng);
      }
    }
    // if (i18n.language !== i18n.resolvedLanguage) {
    //   setLanguageHandler("en");
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
      if (e.key === "i18nextLng" && versions.includes(e.newValue)) {
        setLanguageHandler(e.newValue);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // important for tap device
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
          {versions
            .filter((i) => i !== language)
            .map((item) => (
              <li
                key={item}
                onClick={() => (
                  setLanguageHandler(item),
                  localStorage.setItem("i18nextLng", item)
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
