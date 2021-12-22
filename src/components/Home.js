import axios from 'axios';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterWeather } from '../redux/home/home';
import Location from './Location';
import logo from '../assets/images/logo.png';

const Home = () => {
  const dispatch = useDispatch();
  const cityList = useSelector((state) => state.homeReducer);
  const handleChange = (e) => {
    dispatch(filterWeather(e.currentTarget.value));
  };
  const [localWeather, setWeather] = useState('');
  const [localTemp, setTemp] = useState('');
  const handleLocalWeather = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('Latitude is :', position.coords.latitude);
        console.log('Longitude is :', position.coords.longitude);
        axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${position.coords.latitude}&lon=${position.coords.longitude}&exclude=minutely,hourly,daily,alerts&units=metric&appid=77372caba8dce1328afad7d75df28bfb`)
          .then((response) => {
            const { weather } = response.data.current;
            setWeather(` ${weather[0].main}`);
            setTemp(`${response.data.current.temp}°C`);
          });
      });
    } else {
      alert('Your geolocation is not Available!');
    }
  };
  const today = new Date();
  const time = `${today.getHours()}:${today.getMinutes()}`;

  return (
    <div className=" bg-pinkardo-header min-h-screen w-full flex flex-col items-center">
      <div className="w-full max-w-lg">
        <h1 className="text-2xl mt-2 mb-4 text-center font-sans font-light text-white relative">
          <span className="text-base absolute left-4 top-2">{time}</span>
          <img src="" alt="" />
          Cities weather
        </h1>
        <div className="flex flex-col bg-pinkardo px-4 mb-4 py-4 text-white">
          <span>
            Local Weather:
            {' '}
            {localWeather}
          </span>
          <span>
            Local Temperature:
            {' '}
            {localTemp}
          </span>
          <button
            type="button"
            className="border-2 bg-pinkardo-header rounded-lg w-full text-center py-2 my-4 font-bold"
            onClick={() => handleLocalWeather()}
          >
            Get your local weather
          </button>
        </div>
        <div className="flex w-full justify-between mb-2">
          <span className="text-white"> Filter by weather condition</span>
          <select name="code" id="cityCode" onChange={(e) => handleChange(e)}>
            <option value="100">All</option>
            <option value="200">Thunderstorm</option>
            <option value="300">Drizzle</option>
            <option value="500">Rain</option>
            <option value="600">Snow</option>
            <option value="700">Mist</option>
            <option value="800">Clear</option>
            <option value="801">Cloudy</option>
          </select>
        </div>
        <ul className="w-full flex flex-wrap">
          {Object.values(cityList).map((city) => {
            const nameToPath = city.name.replace(/, | /g, '-').toLowerCase();
            return (
              <li className="py-1 px-px w-1/2" key={city.name}>
                <Location nameToPath={nameToPath} city={city.name} />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
