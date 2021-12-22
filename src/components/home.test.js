import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import * as homeStore from '../redux/home/home';
import store from '../redux/configureStore';
import Home from './Home';
import Location from './Location';
import LocationDetail from './LocationDetail';

describe('Component renderization', () => {
  test('Render Home component', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Home />
        </Provider>
      </BrowserRouter>,
    );
    screen.debug();
  });
  test('Render Location component', () => {
    const nameToPath = 'hong-kong';
    const city = { name: 'Hong Kong' };
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Location nameToPath={nameToPath} city={city.name} />
        </Provider>
      </BrowserRouter>,
    );
    screen.debug();
  });
  test('Render Detail Component', () => {
    const location = { name: 'Lagos, Nigeria', coords: { lat: '6.46', lon: '3.40' }, current: { temp: 'fetching', weather: [{ icon: '01d', main: 'clear', id: 800 }] } };
    render(
      <BrowserRouter>
        <Provider store={store}>
          <LocationDetail state={location} />
        </Provider>
      </BrowserRouter>,
    );
    screen.debug();
  });
});

describe('Test Action creators', () => {
  test('Fetch weather of different cities', () => {
    const weather = { temp: 32, humidity: 20 };
    const action = homeStore.fetchCityWeather(weather);
    expect(action).toEqual({ type: 'HOME_FETCH', payload: { temp: 32, humidity: 20 } });
  });
  test('Filter according to a code', () => {
    const code = 100;
    const action = homeStore.filterWeather(code);
    expect(action).toEqual({ type: 'FILTER', payload: 100 });
  });
});
