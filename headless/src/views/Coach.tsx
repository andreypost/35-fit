import styled from 'styled-components'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { IRouteParams } from 'types/interface'
import { useAppSelector } from 'roothooks'
import { selectCoaches } from 'slices/coach.slice'
import { useTranslation } from 'react-i18next'
// import { Link } from "react-router-dom";
// import i18n from "../i18n";
import { HeaderBanner } from 'HeaderBanner'
import { TEAM_ROUTE } from 'constants/routes'
import { CommunityArticle } from 'components/CommunityArticle'
import { InstaImages } from 'components/InstaImages'

const Main = styled.main`
  &.coach_section {
    .coach > .section {
      padding-top: 20px;
    }
    .coach_person {
      .coach_banner {
        .coach_heading,
        img {
          flex: 1;
        }
        .coach_heading {
          .coach_name,
          .coach_descript {
            padding-top: 40px;
          }
        }
      }
    }
    .coach_hobby {
      align-items: center;
      row-gap: 20px;
      .hobby_name {
        top: -10px;
        left: 10px;
        font-size: 128px;
        color: #f5f5f5;
        span {
          display: inline-block;
        }
      }
      .hobby_descript {
        flex: 1;
        font-size: 16px;
        line-height: 28px;
      }
      .hobby_interest {
        flex: 1;
        .hobby_list {
          p {
            font-size: 21px;
            margin-bottom: 20px;
          }
          li {
            font-size: 20px;
            line-height: 32px;
            span {
            }
          }
        }
      }
    }
    @media (max-width: 768px) {
      .coach_person .coach_banner,
      .coach_hobby {
        flex-flow: column;
        .hobby_interest {
          align-self: center;
        }
      }
    }
    @media (max-width: 1023px) {
      .coach_person {
        .coach_banner {
          .coach_heading {
            .coach_name {
              font-size: 34px;
            }
            .coach_position {
              font-size: 18px;
            }
            .coach_descript {
              font-size: 20px;
              padding-bottom: 40px;
            }
          }
        }
      }
      .coach_hobby {
        padding: 40px 20px;
      }
    }
    @media (min-width: 1024px) {
      .coach_person {
        .coach_banner {
          .coach_heading {
            .coach_name {
              font-size: 48px;
            }
            .coach_position {
              font-size: 22px;
            }
            .coach_descript {
              font-size: 24px;
            }
          }
        }
      }
      .coach_hobby {
        padding: 40px 60px;
      }
    }
  }
`

const Coach = () => {
  const { t } = useTranslation(),
    { name } = useParams<IRouteParams>(),
    coaches = useAppSelector(selectCoaches),
    [selectedCoache, setSelectedCoache] = useState<any>(null)
  useEffect(
    () => setSelectedCoache(coaches?.find(({ route }) => route === name)),
    []
  )
  return (
    <Main data-aos="fade" className="coach_section">
      <HeaderBanner className="coach">
        <Link
          className="flex_center_center light_grey_button hover_green_white b900 green"
          to={TEAM_ROUTE}
        >
          {t('coach.back_to_team')}
        </Link>
      </HeaderBanner>
      {selectedCoache && (
        <div className="section coach_person">
          <div className="flex coach_banner">
            <article className="coach_heading grey">
              <h4 className="coach_name b900 blue">{selectedCoache.name}</h4>
              <p className="coach_position">{selectedCoache.position}</p>
              <p className="coach_descript">
                “{t('coach.dont_sell_yourself')}”
              </p>
            </article>
            <img
              src={require(`../img/person/${selectedCoache.img}.jpg`)}
              alt="coach"
            />
          </div>
          <div className="flex shadow_radius coach_hobby relative grey">
            {name && (
              <h3 className="hobby_name absolute">
                {name.split('').map((l, index) => (
                  <span key={index}>{index === 0 ? l.toUpperCase() : l}</span>
                ))}
              </h3>
            )}
            <p className="hobby_descript relative">
              For {selectedCoache.name}, SoulCycle is about showing up and
              challenging yourself. Born and raised in New York, SJ curates
              playlists encouraging riders to find the connection between life,
              resistance, and rhythm on the bike. Find unity of self in the here
              and now by activating your mind, body and SOUL.
            </p>
            <div className="flex_center_center hobby_interest relative">
              <svg
                className="absolute"
                width="96"
                height="86"
                viewBox="0 0 96 86"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M69.3428 0C76.4666 0 83.1628 2.83808 88.2 7.9955C98.6 18.6436 98.6 35.9686 88.2002 46.6126L50.9368 84.7643C50.1339 85.5884 49.078 86 48.0239 86C47.7561 86 47.4888 85.9751 47.2231 85.9214C46.4307 85.7738 45.6722 85.3905 45.0629 84.7643L7.79944 46.6126C-2.59981 35.9686 -2.59981 18.6436 7.79944 7.9955C12.8363 2.83808 19.5353 0 26.6584 0C33.7818 0 40.4803 2.83808 45.5176 7.9955L47.9998 10.5374L50.482 7.9955C55.5209 2.83808 62.2179 0 69.3428 0ZM48.0001 75.8421L82.3742 40.6482C89.5616 33.2911 89.5616 21.3212 82.3742 13.9604C78.8941 10.3968 74.2656 8.4367 69.343 8.4367C64.4189 8.4367 59.7899 10.3968 56.3098 13.9604L50.9145 19.4882C49.3676 21.0698 46.6341 21.0698 45.0869 19.4882L39.6896 13.9604C36.2097 10.3968 31.581 8.4367 26.6584 8.4367C21.7363 8.4367 17.1063 10.3968 13.6252 13.9604C6.43851 21.3212 6.43851 33.2913 13.6252 40.6482L48.0001 75.8421Z"
                  fill="#E8E8E8"
                />
              </svg>
              <ul className="hobby_list left relative">
                <li>
                  <p className="b700">Interested in:</p>
                </li>
                <li>
                  <span className="green b700">–</span> Dancing
                </li>
                <li>
                  <span className="green b700">–</span> Extreme sport
                </li>
                <li>
                  <span className="green b700">–</span> Surfing
                </li>
                <li>
                  <span className="green b700">–</span> Traveling
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      <img src={require('../img/patterns/pattern_bg_7_1.webp')} alt="" />

      <img src={require('../img/patterns/pattern_bg_1_3.webp')} alt="" />

      <CommunityArticle
        title="common.35fit_community"
        description="header_banner.training_becomes"
        coach="Joyce's"
      />
      <InstaImages />
    </Main>
  )
}
export default Coach
