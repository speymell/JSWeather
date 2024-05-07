const apiKey = "523c6d40483b475aa80121938240205";

// fetch(query)
//   .then((response) => {
//     return response.json();
//   })
//   .then((data) => {
//     console.log(data);
//   });
// const query = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apiKey}`

const header = document.querySelector(".header");
const form = document.querySelector("#form");
const input = document.querySelector("#city");

// Функция удаления карточки
function removeCard() {
  const prevCard = document.querySelector(".card");
  if (prevCard) prevCard.remove();
}

function showError(errorMessage) {
  const html = `<div class="card">${errorMessage}</div>`;
  header.insertAdjacentHTML("afterend", html);
}

async function getWeather(city) {
  // Адрес запроса
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  return data;
}

function showCard({ name, country, temp, condition }) {
  // Разметка для карточки
  const html = ` <div class="card">
   <div class="card-city">
     <h2 class="card-city">${name} <span>${country}</span></h2>
   </div>
   <div class="card-weather">
     <div class="card-value">${temp}<sup>°c</sup></div>
     <img src="weather.png" alt="weather" class="card-image" />
   </div>

   <div class="card-description">${condition}</div>
 </div>`;
  //  Отображаем карточку на странице
  header.insertAdjacentHTML("afterend", html);
}

// Слушаем отправку формы (можно нажать на кнопку, а можно Enter - и то, и то отправка)
// По-хорошему этот блок кода лучше разбить на отдельные функции, в том числе - отдельная асинхронная для запроса, отдельно для принятия данных и формирования разметки и т.д.
form.onsubmit = async function (e) {
  // Отменяем отправку формы
  e.preventDefault();
  let city = input.value.trim();

  const data = await getWeather(city);

  // Выполняем запрос
  // Проверка на ошибку
  if (data.error) {
    // если ошибка есть - выводим
    removeCard();
    showError(data.error.message);
  } else {
    // если ошибки нет - выводим карточку, удаляем предыдущую
    removeCard();
    const weatherData = {
      name: data.location.name,
      country: data.location.country,
      temp: data.current.temp_c,
      condition: data.current.condition.text,
    };
    showCard(weatherData);
  }
};
