import React from "react";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { SITE_INFO, SOCIAL_LINKS } from "../../config/constants";

/**
 * SchemaOrg component - provides structured data for search engines.
 */
export const SchemaOrg = () => {
  const { i18n } = useTranslation();

  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_INFO.name,
    alternateName:
      i18n.language === "en" ? SITE_INFO.nameEN : SITE_INFO.name,
    url: SITE_INFO.domain,
    logo: `${SITE_INFO.domain}${SITE_INFO.logo}`,
    sameAs: [
      SOCIAL_LINKS.tiktok,
      SOCIAL_LINKS.instagram,
    ],
    description:
      i18n.language === "en"
        ? SITE_INFO.description.en
        : SITE_INFO.description.pl,
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
