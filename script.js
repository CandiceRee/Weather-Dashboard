function weather(){
    var temperature=document.getElementById("temperature");
    var humdity=document.getElementById("humidity");
    var windSpeed=document.getElementById("windSpeed");
    var UVindex=document.getElementById("UVindex")
    var forecast=document.getElementById("forecast");
    var weather=document.getElementById("weather");
    var getCity=document.getElementById("getCity");
    var clearCity=document.getElementById("clearCity");
    var searchHistory=JSON.parse(localStorage.getItem("search"))||[];
    console.log(searchHistory);
var APIKey= "096da4fe0f52722ad1e8d2f87be98cf8";

function getWeather(cityName){
fetch("https://api.openweathermap.org/data/2.5/weather?q="+ cityName+ "&appid"+APIKey)
.then(function(response){
    console.log(response);

var currentDate=new Date(response.data.dt*1000);
console.log(currentDate);
var day=currentDate.getDate();
var month=currentDate.getMonth()+1;
var year=currentDate.getFullYear();
cityName.innerHTML=response.data.name+"("+month+"/"+day+"/"+year+")";
temperature.innerHTML="Temperature:"+k2f(response.data.main.temp)+"&#176F";
humdity.innerHTML="Humidity:"+response.data.main.humdity+"%";
windSpeed.innerHTML="Wind Speed:"+response.data.wind.speed+"MPH";
var lat=response.data.coord.lat;
var lon= response.data.coord.lon;
fetch("https://api.openweathermap.org/data/2.5/uvi/forecast?lat="+lat+"&lon="+lon+"&appid="+APIKey+"&cnt=1")
.then(function(response){
    var UVIndex = document.createElement("span");
    UVIndex.innerHTML=response.data[0].value;
    UVindex.innerHTML="UV Index";
    UVindex.append(UVIndex);
    console.log(response);
});
var getCity=response.data.id;
fetch("https://api.openweathermap.org/data/2.5/forecast?id="+getCity+"&appid="+APIKey)
.then(function(response){
    console.log(response);
    var forecastElement=document.querySelectorAll(".forecast");
    for (i=0; i<forecastElement.length;i++){
        forecastElement[i].innerHTML="";
        var forecastIndex=i*8+4;
        var forecastDate=new Date(response.data.list[forecastIndex].dt*1000);
        var forecastDay=forecastDate.getDate();
        var forecastMonth=forecastDate.getMonth()+1;
        var forecastYear=forecastDate.getFullYear();
        var forecastDateElement=document.createElement("p");
        forecastDateElement.setAttribute("class","mt-3 mb-0")
        forecastDateElement.innerHTML=forecastMonth+"/"+forecastDay+"/"+forecastYear;
        forecast[i].append(forecastDateElement);
        var forecastWeatherElement=document.createElement("img");
        forecastWeatherElement.setAttribute("src","https://openweathermap.org/img/wn/"+response.data.list[forecastIndex].weather[0].icon+"@2x.png");
        forecastWeatherElement.setAttribute("alt",response.data.list[forecastIndex].weather[0].description);
        forecast[i].append(forecastWeatherElement);
        var forecastTemp=document.createElement("p");
        forecastTemp.innerHTML="Temp:"+k2f(response.data.list[forecastIndex].main.temp)+"&#176F";
        forecast[i].append(forecastTemp);
        var forecastHumidity=document.createElement("p");
        forecastHumidity.innerHTML="Humidity:"+response.data.list[forecastIndex].main.humdity+"%";
        forecast[i].append(forecastHumidity);
    }
})
});
}
getCity.addEventListener("click",function(){
    var searchTerm=inputElement.value;
    getWeather(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search",JSON.stringify(searchHistory));
    renderSearchHistory();
})
clearCity.addEventListener("click",function(){
    searchHistory=[];
    renderSearchHistory();
})
function k2f(K){
    return Math.floor((K-273.15)*1.8+32);
}
function renderSearchHistory(){
    history.innerHTML="";
    for(var i=0; i<searchHistory.length;i++){
        var historyItem=document.createElement("input");
        historyItem.setAttribute("type","text");
        historyItem.setAttribute("readonly",true);
        historyItem.setAttribute("class", "form-control d-block bg-white");
        historyItem.setAttribute("value",searchHistory[i]);
        historyItem.addEventListener("click",function(){
            weather(historyItem.value);
        })
        history.append(historyItem);
    }
}
renderSearchHistory();
if(searchHistory.length>0){
    weather(searchHistory[searchHistory.length-1]);
}
}
weather();
