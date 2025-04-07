import { body, param } from "express-validator";
import { msg } from "../../constants/messages";
import { validateEmailPasswordDto } from "../../validators/commonValidators";

export const validateUserDto = [
  body("name").notEmpty().withMessage(msg.NAME_IS_REQUIRED),
  body("surname").notEmpty().withMessage(msg.SURNAME_IS_REQUIRED),
  body("gender")
    .isIn(["nonBinary", "male", "femail"])
    .withMessage(msg.GENDER_IS_REQUIRED),
  body("age").isInt({ min: 1, max: 111 }).withMessage(msg.VALID_AGE_REQUIRED),
  body("country").notEmpty().withMessage(msg.COUNTRY_IS_REQUIRED),
  body("city").notEmpty().withMessage(msg.CITY_IS_REQUIRED),
  ...validateEmailPasswordDto,
  body("email").isEmail().withMessage(msg.VALID_EMAIL_IS_REQUIRED),
  body("password")
    .isLength({ min: 4 })
    .withMessage(msg.PASSWORD_MUTS_BE_AT_LEAST),
  body("phone")
    .isMobilePhone(["uk-UA", "en-US", "pl-PL"])
    .withMessage(msg.PLEASE_ENTER_A_VALID_PHONE),
];

export const validatePrivilegesDto = [
  param("id").isUUID().withMessage(msg.ID_MUST_BE_UUID),
  body("grantedPrivileges").notEmpty().withMessage(msg.GRANTED_PRINILEGES),
  body("deniedPrivileges").notEmpty().withMessage(msg.DENIED_PRINILEGES),
];
