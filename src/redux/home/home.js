import axios from 'axios';

const API_KEY = '77372caba8dce1328afad7d75df28bfb';
/* eslint-disable */
const HOME_FETCH = 'HOME_FETCH';
const FILTER = 'FILTER';
const cities = {
  'Lagos, Nigeria': { name: 'Lagos, Nigeria', coords: { lat: '6.46', lon: '3.40' }, current: { temp: 'fetching', weather: [{ icon: '01d', main: 'clear', id: 800 }] } },
  'Rome, Italy': { name: 'Rome, Italy', coords: { lat: '41.90', lon: '12.49' }, current: { temp: 'fetching', weather: [{ icon: '01d', main: 'clear', id: 800 }] } },
  'Tokyo, Japan': { name: 'Tokyo, Japan', coords: { lat: '35.65', lon: '139.83' }, current: { temp: 'fetching', weather: [{ icon: '01d', main: 'clear', id: 800 }] } },
  'Delhi, India': { name: 'Delhi, India', coords: { lat: '28.64', lon: '77.21' }, current: { temp: 'fetching', weather: [{ icon: '01d', main: 'clear', id: 800 }] } },
  'Istambul, Turkey': { name: 'Istambul, Turkey', coords: { lat: '41.01', lon: '28.97' }, current: { temp: 'fetching', weather: [{ icon: '01d', main: 'clear', id: 800 }] } },
  'Paris, France': { name: 'Paris, France', coords: { lat: '48.86', lon: '2.34' }, current: { temp: 'fetching', weather: [{ icon: '01d', main: 'clear', id: 800 }] } },
  'Singapore': { name: 'Singapore', coords: { lat: '1.29', lon: '103.85' }, current: { temp: 'fetching', weather: [{ icon: '01d', main: 'clear', id: 800 }] } },
  'London, UK': { name: 'London, UK', coords: { lat: '51.50', lon: '-0.11' }, current: { temp: 'fetching', weather: [{ icon: '01d', main: 'clear', id: 800 }] } },
  'Bangkok, Thailand': { name: 'Bangkok, Thailand', coords: { lat: '13.73', lon: '100.52' }, current: { temp: 'fetching', weather: [{ icon: '01d', main: 'clear', id: 800 }] } },
  'Hong Kong': { name: 'Hong Kong', coords: { lat: '22.30', lon: '114.17' }, current: { temp: 'fetching', weather: [{ icon: '01d', main: 'clear', id: 800 }] } },
};
let cacheState = {};

export const fetchCityWeather = (payload) => ({ type: HOME_FETCH, payload });

export const fetchWeathers = (city) => {
  const cityToFetch = cities[city];
  return ((dispatch) => {
    axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${cityToFetch.coords.lat}&lon=${cityToFetch.coords.lon}&exclude=minutely,hourly,daily,alerts&units=metric&appid=${API_KEY}`)
      .then((response) => (
        dispatch(fetchCityWeather({ current: response.data.current, name: city }))));
  });
};

export const filterWeather = (payload) => ({
  type: FILTER,
  payload
})

const home = (state = cities, { type, payload }) => {
  switch (type) {
    case HOME_FETCH: {
      const newState = { ...state };
      newState[payload.name].current = payload.current;
      cacheState = newState;
      return newState;
    }
    case FILTER: {
     const newState = Object.values(cacheState).filter((el) => {
        let flag = false;
        payload = parseInt(payload, 10)
        const elCode = el.current.weather[0].id
        if (elCode >= payload && elCode < payload + 100) flag = true;
        if (elCode > 800 && payload === 800) flag = false;
        if (payload === 100) flag = true;
        return flag
      })
      const finalState = newState.reduce((acc,el) => ({
        ...acc, [el.name] : el
      }), {})
      return finalState
    }
    default:
      return state;
  }
};

export default home;
