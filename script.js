function weather(){
    var results=document.getElementById("results");
    var answers=document.getElementById("answers");
    var cityName=document.getElementById("cityName");
    var temperature=document.getElementById("temperature");
    var humdity=document.getElementById("humidity");
    var windSpeed=document.getElementById("windSpeed");
    var UVindex=document.getElementById("UVindex")
    var forecast=document.getElementById("forecast");
    var title=document.getElementById("title");
    var day=document.getElementById("day");
    var weather=document.getElementById("weather");
    var travel=document.getElementById("travel");
    var getCity=document.getElementById("getCity");
    var clearCity=document.getElementById("clearCity");
    let searchHistory=JSON.parse(localStorage.getItem("search"))||[];
    console.log(searchHistory);
var APIKey= "096da4fe0f52722ad1e8d2f87be98cf8";

function getWeather(cityName){
    let querySelector="https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}";
fetch(querySelector)
.then(function(response){
    console.log(response);

var currentDate=new Date(response.data.dt*1000);
console.log(currentDate);
var day=currentDate.getDate();
var month=currentDate.getMonth()+1;
var year=currentDate.getFullYear();
cityName.innerHTML=response.data.name+"("+month+"/"+day+"/"+year+")";
temperature.innerHTML="Temperature:"+k2f(response.data.main.temp)+""
})
}
}

