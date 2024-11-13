// import { useState, useEffect } from 'react'
import styled from "styled-components";
// import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import useAos from "hooks/aos";
import { HeaderBanner } from "HeaderBanner";
import Image from "next/image";
import pattern_bg_7_1 from "public/img/patterns/pattern_bg_7_1.webp";
import { FooterBanner } from "FooterBanner";

const Main = styled.main`
  .faq {
  }
  @media (max-width: 768px) {
  }
  @media (min-width: 769px) {
  }
  @media (max-width: 1023px) {
  }
  @media (min-width: 1024px) {
  }
`;

const Faq = () => {
  // const { t } = useTranslation("common"),
  // useEffect(() => {
  // }, [])

  return (
    <Main data-aos="fade" ref={useAos()} className="page_view">
      <HeaderBanner
        className="faq"
        title="nav.faq"
        description="header_banner.training_becomes"
      />
      <section className="section faq"></section>
      <Image src={pattern_bg_7_1} alt="" />
      <FooterBanner
        title="faq.trial_foot_banner_title"
        price="99"
        subTitle="4 tests a year"
      />
    </Main>
  );
};

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, "common", null, [
        "en",
        "ee",
        "de",
      ])),
    },
  };
}

export default Faq;
