'use strict';

let $ = require('jquery'),
    // db = require("./db-interaction"),
    login = require("./user"),
    userId = "",
    zip = "",
    firebase = require("./firebaseConfig"),
    key = require("./fb-getter"),
    weatherKey = key(),
    weatherData = {};



//----1---//
//given a user wants to view weather information
// when the user visits your application
// then they should be presented with an authentication mechanism that allows login via Google, Twitter, Facebook, or Github. Pick one, at a minimum, but if you want to add all, that would be impressive.
//***************************************************************
// User login section. Should ideally be in its own module
$("#auth-btn").click(function() {
  console.log("clicked auth");
  login()
  .then(function(result){
    let user = result.user;
    // console.log("logged in user", user.uid);
        userId = user.uid;
    // loadToDOM();
  });
});
//****************************************************************


//----2---//
//given a user wants to view weather information
// when the user visits your initial view
// then there should be an input field to accept a zip code value




// function loadToDOM() {
//   $(".uiContainer--wrapper").html('');
//   getZipCode()
//   .then(function(weatherData){
//       console.log("Need to load some weathers, Buddy");
//   });
// }
function getWeather(zipcode) {
  return new Promise(function(resolve, reject){
    $.ajax({
      url: `http://api.openweathermap.org/data/2.5/weather?zip=${zipcode},us&APPID=df98c288bb6073c877b9a67690c36d0d`,
      method: "GET",
      data: JSON
      }).done(function(data) {
        // console.log("data", data);
        resolve(data);
      });
  });
}

  $("#zipp").on('click', function (evet) {
    // console.log(" submit clicked");
    zip = $('#userInput').val();
    // console.log("zip", zip);
      if (zip.length !== 5) {
      console.log("Please enter a 5-digit Zip-code.");
      zip = "";
     }
     else {
      getWeather(zip)
      .then(function (weatherData) {
        // console.log("weatherData", weatherData);
         weatherList(weatherData);
          // console.log("weatherData1", weatherData.main.temp);
      });
     }

 });
function kelToFah (kelvin) {
      return Math.round((kelvin * (9/5)) - 459.67);
    }


function weatherList(weatherData) {
      let outputString = "";

    for (let i = 0; i < 1; i++) {
          let temperature = weatherData.main.temp,
              pressure = weatherData.main.pressure,
              condition = weatherData.weather,
              wind = weatherData.wind.speed;
      console.log("weatherData", weatherData);
   outputString += `<div class="col-md-4 eachList">
   <ul>
      <li>${"The weather forecast for zip-code "} ${zip} ${" will be:"}</li></br>
      <li>${"Temperature: "} ${kelToFah(temperature)}</li></br>
      <li>${"Air Pressure: "} ${pressure}</li></br>
      <li>${"Conditions: "} ${condition[0].description}</li></br>
      <li>${"wind speed: "} ${wind}</li></br>
      </li></br>
     </ul> </div>`;
 }
      $("#output").append(outputString);

}
