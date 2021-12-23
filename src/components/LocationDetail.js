import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const LocationDetail = ({ city }) => {
  const { name, current } = city;
  const {
    temp,
    humidity,
    uvi,
    weather: [{ icon, main }],
  } = current;
  const windSpeed = current.wind_speed;
  return (
    <div className="w-full flex flex-col items-center justify-start min-h-screen  bg-gray-200 ">
      <div className="max-w-lg w-full px-4">
        <Link className="absolute top-4 left-4 border border-indigo-400 rounded-full w-8 h-8 flex items-center justify-center" to="/">&larr;</Link>
        <h1 className="text-2xl mt-8 mb-12 text-center">
          How is
          {' '}
          {name}
          {' '}
          today
        </h1>
        <div>
          <ul className="px-1 space-y-1">
            <li
              className="w-full flex justify-between h-16 items-center bg-fuchsia-400 px-8 text-xl rounded
            hover:bg-fuchsia-500"
            >
              <span>{main}</span>
              <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="" />
            </li>
            <li
              className="w-full flex justify-between h-16 items-center bg-fuchsia-300 px-8 text-xl rounded
            hover:bg-fuchsia-500"
            >
              <span>Temp</span>
              <span>
                {temp}
                °C
              </span>
            </li>
            <li
              className="w-full flex justify-between h-16 items-center bg-fuchsia-400 px-8 text-xl rounded
            hover:bg-fuchsia-500"
            >
              <span>Humidity</span>
              <span>
                {humidity}
                %
              </span>
            </li>
            <li
              className="w-full flex justify-between h-16 items-center bg-fuchsia-300 px-8 text-xl rounded
            hover:bg-fuchsia-500"
            >
              <span>Ultra Violet Radiation index</span>
              <span>
                {uvi}
              </span>
            </li>
            <li
              className="w-full flex justify-between h-16 items-center bg-fuchsia-400 px-8 text-xl rounded
            hover:bg-fuchsia-500"
            >
              <span>Wind Speed</span>
              <span>
                {windSpeed}
                m/s
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

LocationDetail.propTypes = {
  city: PropTypes.objectOf(PropTypes.string, PropTypes.number, PropTypes.object),
};
LocationDetail.defaultProps = {
  city: { name: 'Lagos, Nigeria', coords: { lat: '6.46', lon: '3.40' }, current: { temp: 'fetching', weather: [{ icon: '01d', main: 'clear', id: 800 }] } },
};

export default LocationDetail;
