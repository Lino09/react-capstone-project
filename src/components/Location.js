import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeathers } from '../redux/home/home';
import cityPicture from '../assets/images/city.jpg';
import drop from '../assets/images/drop.png';

const Location = ({ nameToPath, city }) => {
  const location = useSelector((state) => state.homeReducer[city]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!location.current.humidity) dispatch(fetchWeathers(location.name));
  }, []);
  return (
    <Link
      state={location}
      to={`weather/${nameToPath}`}
    >
      <div
        className="p-2 flex flex-col items-end space-y-2 bg-cover rounded text-white
        bg-pink-900 bg-blend-screen font-bold"
        style={{ backgroundImage: `url(${cityPicture})` }}
      >
        <h2 className="text-lg w-full">{location.name}</h2>
        <span className="flex items-center">
          <img
            src={`http://openweathermap.org/img/wn/${location.current.weather[0].icon}.png`}
            alt={location.current.weather[0].main}
          />
          { location.current.temp }
          °C
        </span>
        <span className="flex items-center">
          <img
            className="h-6 w-6 rounded-full"
            src={drop}
            alt={location.current.weather[0].main}
          />
          { location.current.humidity }
          %
        </span>
      </div>
    </Link>
  );
};

Location.propTypes = {
  nameToPath: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};

export default Location;
