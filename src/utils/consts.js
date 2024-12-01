export const APP_CONFIGS = {
  COUNTRIES_FLAGS: 'name,flags,capital,region,population,maps,languages,timezones,flags',
  BASE_URL: `https://restcountries.com/v3.1/all`,
  COUNTRIES_VIEW: {
      pageSize: 15,
      simple: true,
  }
}

export const ROUTES = {
  wine: {
    name: 'wine',
    path: '/wine',
    key: 'go-to-wine',
  },
  countries: {
    name: 'countries',
    path: '/countries',
    key: 'go-to-countries',
  },
  travel: {
    name: 'travel',
    path: '/travel',
    key: 'go-to-travel',
  },
  map: {
    name: 'map',
    path: '/map',
    key: 'go-to-map',
  },
  about: {
    name: 'about',
    path: '/about',
    key: 'go-to-about',
  },
}
