import React, { useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const Ul = styled.ul`

  display        : flex;
  align-items    : center;
  justify-content: center;
  position       : relative;
  margin-left    : auto;
  font-weight    : 600;
  color          : #737373;

  .lang_list {
    visibility : hidden;
    opacity    : 0;
    position   : absolute;
    top        : 30px;
    left       : 0;
    transition : visibility 0s, opacity 0.5s linear;

    li:hover {
      color: #FF6376;
    }
  }

  .lang_arrow svg {
    width : 16px;
    height: 11px;
    fill       : #737373;
    transition : transform .2s;
    margin-left: 5px;
  }

  &:hover {
    .lang_base {
      color: #FF6376;
    }

    .lang_list {
      visibility: visible;
      opacity   : 1;
    }

    .lang_arrow svg {
      fill     : #FF6376;
      transform: rotate(180deg);
    }
  }
  @media (max-width: 991px) {
    font-size: 14px;
    .lang_arrow svg {
      width : 12px;
      height: 8px;
    }
  }

  @media (min-width: 992px) {
    .lang_arrow svg {
      width : 16px;
      height: 11px;
    }
    &:hover {
      cursor: pointer;
    }
  }`

const Language: React.FC = () => {
  const { i18n } = useTranslation(),
    [language, getLanguage] = useState(i18n.language),
    versions = ['en', 'ee', 'de']
  // const lungRef = createRef<HTMLLIElement>()
  // const handleShowList = () => {
  //   if (lungRef.current) lungRef.current.style.opacity = '1'
  // }
  return (
    <Ul>
      <li className="lang_base">{language.toLocaleUpperCase()}</li>
      <li className="lang_list">
        <ul>
          {versions.map(item => (
            item !== language ?
              <li key={item} onClick={() => (i18n.changeLanguage(item), getLanguage(i18n.language))}>
                {item.toLocaleUpperCase()}
              </li>
              : null
          ))}
        </ul>
      </li>
      <li className="lang_arrow">
        <svg viewBox="0 0 12 8" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd"
            d="M6 7.99991L0.292881 2.22679C-0.097627 1.83178 -0.097627 1.19126 0.292881 0.796256C0.683389 0.401248 1.3164 0.401248 1.70691 0.796256L6 5.13935L10.2931 0.796256C10.6836 0.401248 11.3166 0.401248 11.7071 0.796256C12.0976 1.19126 12.0976 1.83178 11.7071 2.22679L6 7.99991Z" />
        </svg>
      </li>
    </Ul>

  )
}

export default Language
