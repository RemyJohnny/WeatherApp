import "./style.css";
const root = document.documentElement;
const container = document.querySelector(".container");

const degree = document.querySelector(".degree");
const location = document.querySelector(".location");
const date_N_time = document.querySelector(".date-N-time");
const icon = document.querySelector(".icon");
const condition = document.querySelector(".condition");

const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");
const cloudy = document.querySelector(".cloudy");
const feels_like = document.querySelector(".feels_like");

const form = document.querySelector("form");
const input = document.querySelector("#location");

const selects = document.querySelectorAll(".option");

const loader = document.querySelector(".loader");

let measure = "c";

const imageOptions = ["bg-rainy", "bg-night", "bg-cloudy", "bg-sunny"];
function clearBG() {
  imageOptions.forEach((option) => {
    container.classList.remove(option);
  });
}

const themes = [
  {
    name: "cloudy",
    color: "66 102 120",
    bg: "bg-cloudy",
    textColor: "6 96 139",
  },
  {
    name: "sunny",
    color: "41 112 162",
    bg: "bg-sunny",
    textColor: "255 255 255",
  },
  {
    name: "rainy",
    color: "132 167 171",
    bg: "bg-rainy",
    textColor: "0 0 0",
  },
  {
    name: "snowy",
    color: "98 116 129",
    bg: "bg-snowy",
    textColor: "0 0 0",
  },
  {
    name: "night",
    color: "26 55 67",
    bg: "bg-night",
    textColor: "29 255 255",
  },
];

const SUNNY = ["sunny", "Sunny", "Clear"];
const CLOUDY = [
  "cloudy",
  "Cloudy",
  "overcast",
  "Overcast",
  "mist",
  "Mist",
  "fog",
  "Fog",
];
const RAINY = ["rain", "Rain", "drizzle", "Drizzle", "Thundery"];
const SNOWY = [
  "Snow",
  "snow",
  "Ice",
  "ice",
  "sleet",
  "Sleet",
  "Blizzard",
  "blizzard",
];

function checker(options, str) {
  for (let i = 0; i < options.length; i++) {
    const result = str.includes(options[i]);
    if (result) {
      return true;
    }
  }
}

function setTheme(theme) {
  clearBG();
  root.style.setProperty("--theme-color", theme.color);
  root.style.setProperty("--themeText-color", theme.textColor);
  container.classList.add(theme.bg);
}

function themeChanger(response) {
  let condition = response.current.condition.text;
  console.log(response.current.is_day);
  if (!response.current.is_day) {
    setTheme(themes[4]);
    console.log("it is night");
  } else {
    if (checker(CLOUDY, condition)) {
      setTheme(themes[0]);
    } else if (checker(SUNNY, condition)) {
      setTheme(themes[1]);
    } else if (checker(RAINY, condition)) {
      setTheme(themes[2]);
    } else if (checker(SNOWY, condition)) {
      setTheme(themes[3]);
    }
  }
}

function renderData(response) {
  degree.textContent = response.current.temp_c + "°";
  location.textContent = response.location.name;
  date_N_time.textContent = response.location.localtime;
  icon.src = response.current.condition.icon;
  condition.textContent = response.current.condition.text;
  wind.textContent = response.current.wind_kph + "km/h";
  humidity.textContent = response.current.humidity + "%";
  cloudy.textContent = response.current.cloud + "%";
  feels_like.textContent = response.current.feelslike_c + "°";
}

setTheme(themes[2]);

async function getWeatherConditions(location) {
  try {
    const rawResponse = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=b5fe11a180da4801b5073308232207&q=${location}`,
      { mode: "cors" }
    );
    const response = await rawResponse.json();

    console.log(response.status);
    console.log(response);
    themeChanger(response);
    renderData(response);
    loader.classList.add("hidden");
  } catch (err) {
    loader.classList.add("hidden");
    alert("OOPS something went wrong   \n check the name of city you entered");
  }
}

selects.forEach((option) => {
  option.addEventListener("click", (e) => {
    loader.classList.remove("hidden");
    getWeatherConditions(e.target.textContent);
  });
});

form.addEventListener("submit", (e) => {
  loader.classList.remove("hidden");
  e.preventDefault();
  getWeatherConditions(input.value);
});
getWeatherConditions("lagos");
