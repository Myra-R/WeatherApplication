var apiKey="024ddb005de3a7453bb87db856f5f0ec";
var cityArr=[];

function oneday(city){
    //api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} // 1 day

    var oneurl="http://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey;
    console.log(oneurl);
    $.ajax({
        url: oneurl,
        method: "GET"
    }).then(function (response) {
        console.log(response.name);
        console.log(response.main.temp);
        console.log(response.main.humidity);
        console.log(response.wind.speed);
        console.log(response.weather[0].icon);
        var lon = response.coord.lon
        var lat = response.coord.lat;
        var uvurl="http://api.openweathermap.org/data/2.5/uvi?lat="+lat+"&lon="+lon+"&appid="+apiKey;
        console.log(uvurl)
        $.ajax({
            url: uvurl,
            method: "GET"
        }).then(function (uvObj) {
            console.log(uvObj)
            console.log(uvObj.value)

        });


    });


    //city
    //temp
    //hum
    //windspeed
    //icon
    //uv -> lon and lat
        //http://api.openweathermap.org/data/2.5/uvi?lat={lat}&lon={lon}&appid={API key} //lon lat 

}


function fiveday(city){
    //run a for loop 5x => each iteration mult i*8 =24hrs

    //api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key} // 5day
    var fiveurl="http://api.openweathermap.org/data/2.5/forecast?q="+city+"&appid="+apiKey;
    console.log(fiveurl)
    $.ajax({
        url: fiveurl,
        method: "GET"
    }).then(function (fiveObj) {
        for(var i=0;i<5;i++){
        console.log(fiveObj.list[i*8].main.temp);
        console.log(fiveObj.list[i*8].weather[0].icon)
        console.log(fiveObj.list[i*8].main.humidity)
        console.log(moment(fiveObj.list[i*8].dt_txt).format("LL"))
        }
 

    });
    //temp
    //icon
    //hum
}

function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $(".city-area").empty();
    cityArr = JSON.parse(localStorage.getItem("cityArr"));

    // If todos were retrieved from localStorage, update the todos array to it
    if (!Array.isArray(cityArr)) {
      cityArr = [];
    }

    // Loops through the array of movies
    for (var i = 0; i < cityArr.length; i++) {

      // Then dynamicaly generates buttons for each movie in the array
      // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
      var a = $("<button>");
      // Adds a class of movie to our button
      a.addClass("citybtn");
      // Added a data-attribute
      a.attr("data-name", cityArr[i]);
      // Provided the initial button text
      a.text(cityArr[i]);
      // Added the button to the buttons-view div
      $(".city-area").append(a);
    }
  }

//onclick fx that 
$(".add-city").on("click", function(event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var city = $("#userinput").val().trim();
    console.log(city);
    cityArr = JSON.parse(localStorage.getItem("cityArr"));

    // If todos were retrieved from localStorage, update the todos array to it
    if (!Array.isArray(cityArr)) {
      cityArr = [];
    }

    
     cityArr.push(city);
     localStorage.setItem("cityArr", JSON.stringify(cityArr));


    // // Calling renderButtons which handles the processing of our movie array
     renderButtons();
    oneday(city);
    fiveday(city);
  });
//call oneday
//call fiveday
//store that current city int localstorage as ab array
//renderbtn





//onclick for .citybtn{
    $(".citybtn").on("click", function(event) {
        event.preventDefault();
       oneday(city);
       fiveday(city);
        
        //grab value of the city
        //call oneday(city)
        //call fiveday()


    });
    //call oneday
    //callfiveday
//}





renderButtons();
