import styled from "styled-components";
import { useTranslation } from "next-i18next";
import { useAppDispatch } from "hooks/redux";
import { loginModal, dashModal, unsetDashModal } from "slices/modal.slice";
import { IUser, IStyle } from "types/interface";
import Image from "next/image";
import empty_user from "public/img/empty_user.png";
import { LangArrowSVG } from "icons";

const Div = styled.div`
  .user_name {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    transition: color 0.2s;
  }
  .user_face {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
  .user_arrow {
    display: none;
  }
  @media (hover: hover) {
    cursor: pointer;
  }
  &:hover {
    background-color: #59b894;
    .user_name {
      color: white;
    }
  }
  &.header_nav {
    @media (max-width: 1023px) {
      width: 120px;
    }
    width: 140px;
    padding-left: 8px;
    padding-right: 2px;
    justify-content: space-between;
    &.loggedIn {
      justify-content: center;
      .user_face {
        display: none;
      }
    }
  }
  &.menu_modal {
    @media (max-width: 1023px) {
      width: 100%;
      justify-content: space-between;
      column-gap: 10px;
      padding-left: 8px;
      padding-right: 2px;
      &.loggedIn {
        justify-content: center;
        .user_face {
          display: none;
        }
      }
    }
  }
  &.dashboard_modal {
    width: 100%;
    height: 100%;
    justify-content: space-between;
    column-gap: 10px;
    border-radius: unset;
    border: unset;
    margin-bottom: 10px;
    padding: 0 20px 16px;
    border-bottom: 2px solid #e8e8e8;
    .user_name {
      width: 100%;
      order: 2;
      font-size: 16px;
      color: #004;
    }
    .user_face {
      order: 1;
    }
    .user_arrow {
      display: inline-block;
      order: 3;
      width: 36px;
      height: 11px;
      fill: #737373;
      transition: transform 0.2s;
    }
    &:hover {
      background-color: unset;
      .user_name {
        color: #ff6376;
      }
      .user_arrow {
        fill: #ff6376;
        transform: rotate(180deg);
      }
    }
  }
`;

export const User = ({ user, styleName }: IUser & IStyle) => {
  const { t } = useTranslation("common");
  const dispatch = useAppDispatch();

  return (
    <Div
      className={
        "light_grey_button " + styleName + (user ? " loggedOut" : " loggedIn")
      }
      onClick={() =>
        styleName === "dashboard_modal"
          ? dispatch(unsetDashModal())
          : user
          ? dispatch(dashModal())
          : dispatch(loginModal())
      }
    >
      <p className="user_name b700 green">
        {user?.displayName || user?.name || t("nav.login")}
      </p>
      <Image
        priority={true}
        src={user?.photoURL || empty_user}
        width={36}
        height={36}
        onError={(e: any) => (
          (e.target.onerror = null), (e.target.src = empty_user)
        )}
        className="user_face"
        alt="user's face"
      />
      <LangArrowSVG className="user_arrow" />
    </Div>
  );
};
