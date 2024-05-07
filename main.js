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

// Слушаем отправку формы (можно нажать на кнопку, а можно Enter - и то, и то отправка)
// По-хорошему этот блок кода лучше разбить на отдельные функции, в том числе - отдельная асинхронная для запроса, отдельно для принятия данных и формирования разметки и т.д.
form.onsubmit = function (e) {
  // Отменяем отправку формы
  e.preventDefault();
  let city;
  city = input.value.trim();

  // Адрес запроса
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  // Выполняем запрос
  fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // Проверка на ошибку
      if (data.error) {
        const html = `<div class="card">${data.error.message}</div>`;
        const prevCard = document.querySelector(".card");
        if (prevCard) prevCard.remove();
        header.insertAdjacentHTML("afterend", html);
      } else {
        // если ошибки нет - выводим карточку, удаляем предыдущую
        const prevCard = document.querySelector(".card");
        if (prevCard) prevCard.remove();
        console.log(data);
        console.log(data.location.name);
        console.log(data.location.country);
        console.log(data.current.temp_c);
        console.log(data.current.condition.text);
        // Разметка для карточки
        const html = ` <div class="card">
          <div class="card-city">
            <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>
          </div>
          <div class="card-weather">
            <div class="card-value">${data.current.temp_c}<sup>°c</sup></div>
            <img src="weather.png" alt="weather" class="card-image" />
          </div>
  
          <div class="card-description">${data.current.condition.text}</div>
        </div>`;

        //  Отображаем карточку на странице
        header.insertAdjacentHTML("afterend", html);
      }
    });
};
