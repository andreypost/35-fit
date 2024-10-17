// import { useState, useEffect } from 'react'
// import { useTranslation } from 'react-i18next'
// import i18n from "../i18n";
import styled from "styled-components";
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
  // const { t } = useTranslation(),
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
export default Faq;
