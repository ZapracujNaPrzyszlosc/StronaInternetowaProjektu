import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SchemaOrg = () => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Zapracuj na przyszłość',
    'url': 'https://zapracujnaprzyszlosc.pl',
    'logo': 'https://zapracujnaprzyszlosc.pl/logo512.png',
    'sameAs': [
      'https://www.tiktok.com/@zapracuj.na.przyszlosc',
      'https://www.instagram.com/zapracuj.na.przyszlosc/'
    ],
    'description': 'Projekt społeczny pomagający młodym ludziom w wyborze ścieżki kariery poprzez wywiady z profesjonalistami z różnych branż.',
    'founder': {
      '@type': 'Person',
      'name': 'Zespół Zapracuj na przyszłość'
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default SchemaOrg;