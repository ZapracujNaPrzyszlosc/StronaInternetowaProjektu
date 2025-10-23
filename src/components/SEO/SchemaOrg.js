import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

export const SchemaOrg = () => {
  const { i18n } = useTranslation();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zapracuj na przyszłość",
    alternateName:
      i18n.language === "en" ? "Work for the Future" : "Zapracuj na przyszłość",
    url: "https://zapracujnaprzyszlosc.pl",
    logo: "https://zapracujnaprzyszlosc.pl/logo512.png",
    sameAs: [
      "https://www.tiktok.com/@zapracuj.na.przyszlosc",
      "https://www.instagram.com/zapracuj.na.przyszlosc/",
    ],
    description:
      i18n.language === "en"
        ? "A social project helping young people choose their career path through interviews with professionals from various industries."
        : "Projekt społeczny pomagający młodym ludziom w wyborze ścieżki kariery poprzez wywiady z profesjonalistami z różnych branż.",
    founder: {
      "@type": "Person",
      name: "Zespół Zapracuj na przyszłość",
    },
    inLanguage: [i18n.language],
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export default SchemaOrg;
