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
    <div>
      <Link className="absolute top-4 left-4 border border-indigo-400 rounded-full w-8 h-8 flex items-center justify-center" to="/">&larr;</Link>
      <h1 className="text-2xl mt-8 mb-12 text-center">
        How is
        {' '}
        {name}
        {' '}
        today
      </h1>
      <div>
        <ul className="px-4 space-y-2">
          <li className="w-full flex justify-between h-16">
            <span>{main}</span>
            <img src={`http://openweathermap.org/img/wn/${icon}.png`} alt="" />
          </li>
          <li className="w-full flex justify-between h-16">
            <span>Temp</span>
            <span>
              {temp}
              °C
            </span>
          </li>
          <li className="w-full flex justify-between h-16">
            <span>Humidity</span>
            <span>
              {humidity}
            </span>
          </li>
          <li className="w-full flex justify-between h-16">
            <span>Ultra Violet Radiation index</span>
            <span>
              {uvi}
            </span>
          </li>
          <li className="w-full flex justify-between h-16">
            <span>Wind Speed</span>
            <span>
              {windSpeed}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

LocationDetail.propTypes = {
  city: PropTypes.object.isRequired //eslint-disable-line
};

export default LocationDetail;
