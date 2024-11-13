import { Html, Head, Main, NextScript } from "next/document";
import i18nextConfig from "../../next-i18next.config";

export default function Document() {
  const currentLocale = i18nextConfig.i18n.defaultLocale || "en"; // #TO DO does not work
  return (
    <Html lang={currentLocale}>
      <Head>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
