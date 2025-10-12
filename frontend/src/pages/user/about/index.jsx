import React from "react";
import HeroSection from "./components/HeroSection";
import FounderStory from "./components/FounderStory";
import Values from "./components/Values";
import Sustainability from "./components/Sustainability";
import Artisans from "./components/Artisans";
import Team from "./components/Team";

const About = () => {
  return (
    <>
      <>
        <title>
          Về chúng tôi - FurniCraft | Câu chuyện thương hiệu nội thất bền vững
        </title>
        <meta
          name="description"
          content="Khám phá câu chuyện của FurniCraft - thương hiệu nội thất hàng đầu Việt Nam với cam kết về chất lượng, bền vững và nghệ thuật chế tác tinh xảo."
        />
        <meta
          name="keywords"
          content="FurniCraft, nội thất, bền vững, chế tác, thiết kế, Việt Nam"
        />
        <meta property="og:title" content="Về chúng tôi - FurniCraft" />
        <meta
          property="og:description"
          content="Câu chuyện thương hiệu nội thất bền vững hàng đầu Việt Nam"
        />
        <meta property="og:type" content="website" />
      </>
          <HeroSection />
          <FounderStory />
          <Values />
          <Sustainability />
          <Artisans />
          <Team />
    </>
  );
};

export default About;
