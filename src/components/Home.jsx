import { useState } from "react";
import style from "./home.module.css";
import axios from "axios";

const Home = () => {
  let [data, setData] = useState({});
  let [location, setLocation] = useState("");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=49f98e1849a24b5e9b1500c903c6ee1e`;

  let searchloc = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  return (
    <div>
      <section id={style.container}>
        <div className={style.search}>
          <input
            type="text"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchloc}
            placeholder="Search Location"
          />
        </div>
        <article id={style.container_details}>
          <div className={style.top}>
            <div className={style.location}>
              <p>{data.name}</p>
            </div>
            <div className={style.temp}>
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
          </div>

          {data.name != undefined && (
            <div className={style.bottom}>
              <div className={style.condition}>
                {data.weather ? <p>{data.weather[0].main}</p> : null}
              </div>
              <div className={style.fah}>
                {data.main ? (
                  <p className={style.bold}>
                    {data.main.feels_like.toFixed()}°F
                  </p>
                ) : null}
                <p>Feels like</p>
              </div>
              <div className={style.humid}>
                {data.main ? (
                  <p className={style.bold}>{data.main.humidity}%</p>
                ) : null}
                <p>Humidity</p>
              </div>
            </div>
          )}
        </article>
      </section>
    </div>
  );
};

export default Home;
