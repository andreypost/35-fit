import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useAppDispatch, useAppSelector } from "hooks/redux";
import { useTranslation } from "next-i18next";
import { useMutation } from "@apollo/client";
import { LoginModal } from "./LoginModal";
import { selectLoginModalActive, unsetLoginModal } from "slices/modal.slice";
import { loginUserFromDatabase } from "slices/databaseUser.slice";
import { LOGIN_USER } from "graphql/login";
import { useRouter } from "next/router";

// jest.mock('utils/hooks', () => ({
//   useAppDispatch: jest.fn(),
//   useAppSelector: jest.fn(),
// }))
