export const siteSettings = {
  name: "Geenia",
  description:
    "Geenia International is here to serve you better products for you we are in this Industry from many years and continuosly  upgrading products as per the environment",
  author: {
    name: "Geenia Internatoinal Private Limited",
    websiteUrl: "https://geenia.in",
    address: "",
  },
  logo: {
    url: "/images/logo.jpg",
    alt: "geenia",
    href: "/",
    width: 104,
    height: 40,
  },
  defaultLanguage: "en",
  currencyCode: "INR",
  site_header: {
    menu: [
      {
        id: 1,
        path: "/products/skincare",
        label: "menu-skincare",
      },
      {
        id: 2,
        path: "/products/bodycare",
        label: "menu-bodycare",
      },

      {
        id: 3,
        path: "/products/haircare",
        label: "menu-haircare",
      },
      {
        id: 4,
        path: "/products/makeup",
        label: "menu-makeup",
      },
      {
        id: 5,
        path: "/products/phy",
        label: "menu-phy",
      },

      {
        id: 6,
        path: "/",
        label: "menu-treatment",
        subMenu: [
          {
            id: 1,
            path: "/treatment/bodycare",
            label: "menu-body-care-treatment",
          },
          {
            id: 2,
            path: "/treatment/hairfall",
            label: "menu-hair-fall-treatment",
          },
          {
            id: 3,
            path: "/treatment/skincare",
            label: "menu-skin-care-treatment",
          },
          {
            id: 4,
            path: "/treatment/facecare",
            label: "menu-face-care-treatment",
          },
          {
            id: 5,
            path: "/treatment/consultation",
            label: "menu-doctor-consultation",
          },
        ],
      },
    ],
  },
};
