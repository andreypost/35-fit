/** @type {import('next-i18next').UserConfig} */

module.exports = {
  //   debug: process.env.NEXT_PUBLIC_NODE_ENV === "development",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ee", "de"],
  },
  // fallbackLng: false,
  // fallbackLng: "en",
  // fallbackLng: {
  //   default: ["en"],
  //   ee: ["ee"],
  //   de: ["de"],
  // },
  // localePath: require("path").resolve("./public/locales"),
  // localePath:
  //   typeof window === "undefined"
  //     ? require("path").resolve("./public/locales")
  //     : "/locales",
  // reloadOnPrerender: process.env.NEXT_PUBLIC_NODE_ENV === "development",
  // nonExplicitSupportedLngs: true,
  // react: { useSuspense: false },
};
