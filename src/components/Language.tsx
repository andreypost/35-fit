import { useContext } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { AppContext } from '../AppRouter'
import { LangArrowSVG } from './icons'
// import { Spinner } from 'Spinner'

const Ul = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-left: auto;
  font-weight: 600;
  color: #737373;

  .lang_base {
    width: 24px;
  }

  .lang_list {
    visibility: hidden;
    opacity: 0;
    position: absolute;
    top: 30px;
    left: 0;
    transition: visibility 0s, opacity 0.5s linear;

    li:hover {
      color: #ff6376;
    }
  }

  .lang_arrow svg {
    width: 16px;
    height: 11px;
    fill: #737373;
    transition: transform 0.2s;
    margin-left: 5px;
  }

  &:hover {
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
    &:hover {
      cursor: pointer;
    }
  }
`

export const Language = () => {
  const { i18n } = useTranslation(),
    { language, setLanguage } = useContext(AppContext),
    versions = ['en', 'ee', 'de']
  // const lungRef = createRef<HTMLLIElement>()
  // const handleShowList = () => {
  //   if (lungRef.current) lungRef.current.style.opacity = '1'
  // }
  // if (!language) return <Spinner />
  return (
    <Ul>
      <li className="lang_base">{language.toLocaleUpperCase()}</li>
      <li className="lang_list">
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
  )
}
