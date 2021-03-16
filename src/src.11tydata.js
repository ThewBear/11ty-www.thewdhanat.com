const online_certificates = [
  {
    url:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/9PWKSNT8CJKA",
    title: "AI for Medicine",
    platform: "Coursera Specialization",
    date: new Date("January 2021"),
    children: [
      {
        url:
          "https://www.coursera.org/account/accomplishments/certificate/BCQF99EU3EE8",
        title: "AI for Medical Diagnosis",
      },
      {
        url:
          "https://www.coursera.org/account/accomplishments/certificate/B8BK2P4BKCQJ",
        title: "AI for Medical Prognosis",
      },
      {
        url:
          "https://www.coursera.org/account/accomplishments/certificate/BJVVPYTDQUJ8",
        title: "AI for Medical Treatment",
      },
    ],
  },
  {
    url:
      "https://www.coursera.org/account/accomplishments/certificate/426PWL4NMXND",
    title: "COVID-19 Training for Healthcare Workers",
    platform: "Coursera",
    date: new Date("January 2021"),
  },
  {
    url:
      "https://www.coursera.org/account/accomplishments/certificate/WT2H5VTZWYNB",
    title: "COVID-19 Contact Tracing",
    platform: "Coursera",
    date: new Date("December 2020"),
  },
  {
    url:
      "https://www.coursera.org/account/accomplishments/certificate/QJRDNMFVA2AF",
    title: "AI For Everyone",
    platform: "Coursera",
    date: new Date("October 2020"),
  },
  {
    url:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/59DUGN2Y2USV",
    title: "Cloud Engineering with Google Cloud",
    platform: "Coursera Professional Certificate",
    date: new Date("May 2020"),
    children: [
      {
        url:
          "https://www.coursera.org/account/accomplishments/certificate/P43N7NZDTKVZ",
        title: "Google Cloud Platform Fundamentals: Core Infrastructure",
      },
      {
        url:
          "https://www.coursera.org/account/accomplishments/certificate/ZG4S9JGNA4L3",
        title: "Essential Google Cloud Infrastructure: Foundation",
      },
      {
        url:
          "https://www.coursera.org/account/accomplishments/certificate/EBZGV2U5HDPD",
        title: "Essential Google Cloud Infrastructure: Core Services",
      },      
      {
        url:
          "https://www.coursera.org/account/accomplishments/certificate/FKKBJTYNYCLX",
        title: "Elastic Google Cloud Infrastructure: Scaling and Automation",
      },
      {
        url:
          "https://www.coursera.org/account/accomplishments/certificate/YLHT7NGFHSAJ",
        title: "Preparing for the Google Cloud Associate Cloud Engineer Exam",
      },
    ],
  },
  {
    url:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/MH7WBBF38WPH",
    title: "Data Engineering with Google Cloud",
    platform: "Coursera Professional Certificate",
    date: new Date("May 2020"),
    children: [
      {
        url:
          "https://www.coursera.org/account/accomplishments/certificate/CM2XU48XV37G",
        title: "Google Cloud Platform Big Data and Machine Learning Fundamentals",
      },
      {
        url:
          "https://www.coursera.org/account/accomplishments/certificate/NWFUNRM3AZZH",
        title: "Modernizing Data Lakes and Data Warehouses with GCP",
      },
      {
        url:
          "https://www.coursera.org/account/accomplishments/certificate/CK2LALWX3EPR",
        title: "Building Batch Data Pipelines on GCP",
      },
      {
        url:
          "https://www.coursera.org/account/accomplishments/certificate/CJ8HLPFKD4UV",
        title: "Building Resilient Streaming Analytics Systems on GCP",
      },
      {
        url:
          "https://www.coursera.org/account/accomplishments/certificate/GHU8YTBQ4DWV",
        title: "Smart Analytics, Machine Learning, and AI on GCP",
      },
      {
        url:
          "https://www.coursera.org/account/accomplishments/certificate/9PT5JWGM9V4D",
        title: "Preparing for the Google Cloud Professional Data Engineer Exam",
      },
    ],
  },
  {
    url:
      "https://www.datacamp.com/statement-of-accomplishment/track/0a8ccad7613bc34fdff3cca2143dcd228dc8e58d",
    title: "Data Scientist with Python Track",
    platform: "DataCamp",
    date: new Date("May 2020"),
  },
];

const online_certificates_by_year = {};

online_certificates.forEach((certificate) => {
  const year = certificate.date.getFullYear();
  if (!online_certificates_by_year[year]) {
    online_certificates_by_year[year] = [];
  }
  online_certificates_by_year[year].push(certificate);
});

Object.keys(online_certificates_by_year).forEach((year) => {
  online_certificates_by_year[year] = online_certificates_by_year[year].sort(
    (a, b) => a.date - b.date
  );
});

module.exports = {
  online_certificates,
  online_certificates_by_year,
  online_certificates_front: online_certificates.slice(0, 5),
  accomplishments: [
    {
      url:
        "https://opensource.googleblog.com/2017/01/announcing-google-code-in-2016-winners.html",
      title: "Google Code-in 2016",
      summary: "Grand Prize Winner",
    },
  ],
};
