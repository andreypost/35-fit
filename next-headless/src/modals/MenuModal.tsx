import { useMemo } from "react";
import { IUser } from "types/interface";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { publicLinks, RESERVE_ROUTE } from "constants/routes";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { selectMenuModalActive, unsetMenuModal } from "slices/modal.slice";
import { User } from "components/User";
import { NavigationLinks } from "components/NavigationLinks";
import { CrossRedSVG } from "icons";
import useAos from "hooks/aos";

export const BaseDiv = styled.div`
  opacity: 0;
  position: fixed;
  z-index: -99;
  left: 0;
  top: 0;
  width: 100%;
  // height: 200%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.2);
  transition: opacity 0.4s, z-index 0.1s 0.4s;
  // @media (orientation: landscape) {
  //   height: 100%;
  // }
  @media (min-width: 1024px) {
    display: none;
  }
  nav {
    transform: scale(0);
    box-sizing: border-box;
    width: 90%;
    max-width: 480px;
    margin: 10vh auto;
    background: #fff;
    transition: transform 0.6s;
    .cross_icon {
      right: 15px;
      top: 15px;
      width: 24px;
      height: 24px;
      @media (hover: hover) {
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
  &.menuActive,
  &.dashboarActive,
  &.loginActive,
  &.messageActive {
    z-index: 99;
    opacity: 1;
    transition: z-index 0.1s, opacity 0.4s 0.1s;
    nav {
      transform: scale(1);
    }
  }
`;

const Div = styled(BaseDiv)`
  nav ul {
    padding: 40px;
    li {
      width: 100%;
      max-width: 280px;
      a {
        display: inline-block;
        font-size: 20px;
        padding-top: 9.5px;
        padding-bottom: 9.5px;
        &:hover {
          color: #ff6376 !important;
        }
      }
      &.login {
        margin: 40px auto 20px;
      }
      &.buyСlass a {
        display: flex;
        box-sizing: border-box;
        height: 42px;
        border-radius: 32px;
        font-size: 14px;
        background-color: #59b894;
        transition: background-color 0.2s;
        &:hover {
          background-color: #000044;
        }
      }
    }
  }
`;

export const MenuModal = ({ user }: IUser) => {
  const { t } = useTranslation(),
    modalState = useAppSelector(selectMenuModalActive),
    dispatch = useAppDispatch();
  // console.log('MenuModal: ')

  return (
    <Div
      ref={useAos()}
      // data-aos="fade"
      className={modalState}
      onClick={(e) =>
        e.target === e.currentTarget && dispatch(unsetMenuModal())
      }
    >
      <nav className="relative shadow_radius">
        <CrossRedSVG
          className="cross_icon absolute"
          onClick={() => dispatch(unsetMenuModal())}
        />
        <ul className="flex_center_bet_col center">
          <NavigationLinks links={publicLinks} bold="b900" color="#737373" />
          <li className={"login " + (user ? "signOut" : "signIn")}>
            {useMemo(
              () => (
                <User user={user} styleName="menu_modal" />
              ),
              [user]
            )}
          </li>
          <li className="buyСlass">
            <Link
              href={RESERVE_ROUTE}
              className="flex_center_center b700 white"
            >
              {t("nav.buy")}
            </Link>
          </li>
        </ul>
      </nav>
    </Div>
  );
};
