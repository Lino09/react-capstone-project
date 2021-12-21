import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterWeather } from '../redux/home/home';
import Location from './Location';

const Home = () => {
  const dispatch = useDispatch();
  const cityList = useSelector((state) => state.homeReducer);
  const [code, setCode] = useState(100);
  const handleChange = (e) => {
    setCode(e.currentTarget.value);
    dispatch(filterWeather(e.currentTarget.value));
  };

  return (
    <div className="bg-pink-100 min-h-screen">
      <h1 className=" text-5xl">
        Cities
      </h1>
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
      <ul className="w-full flex flex-wrap">
        {Object.values(cityList).map((city) => {
          const nameToPath = city.name.replace(/, | /g, '-');
          return (
            <li className="p-px w-1/2" key={city.name}>
              {code}
              <Location nameToPath={nameToPath} city={city.name} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
