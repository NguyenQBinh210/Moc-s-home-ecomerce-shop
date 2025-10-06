import React from "react";
import TeamProfiles from "./components/TeamProfiles";
import SupportPolicies from "./components/SupportPolicies";
import FAQ from "./components/FAQ";
import ShowroomLocations from "./components/ShowroomLocations";
import ContactForm from "./components/ContactForm";
import ContactMethods from "./components/ContactMethods";
import ContactHero from "./components/ContactHero";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <helmet>
        <title>Liên Hệ - Mộc's Home | Tư Vấn Nội Thất Chuyên Nghiệp</title>
        <meta
          name="description"
          content="Liên hệ với Mộc's Home để được tư vấn nội thất miễn phí. Hotline 24/7, showroom toàn quốc, đội ngũ chuyên gia giàu kinh nghiệm."
        />
        <meta
          name="keywords"
          content="liên hệ Mộc's Home, tư vấn nội thất, showroom nội thất, hỗ trợ khách hàng"
        />
      </helmet>
      <main className="pt-16">
        <ContactHero />
        <ContactMethods />
        <ContactForm />
        <ShowroomLocations />
        <FAQ />
        <SupportPolicies />
        <TeamProfiles />
      </main>
    </div>
  );
};

export default Contact;
