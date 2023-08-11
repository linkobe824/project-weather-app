let locationData;

function getData(){
    const searchBtn = document.querySelector(".search-btn");
    const searchInput = document.querySelector("#nav__input");

    searchBtn.addEventListener('click', async () => {
        const city = searchInput.value;
        const key = '0b65e33d4c094f19a38192914230408';
        const url = `http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=7`;
        try {
            const response = await fetch(url,{mode: 'cors'});
            const data = await response.json();
            locationData = data;
            updateScreenData();
        }
        catch(e){
            console.log(e);
        }
    });
}

function updateScreenData(unit="cel"){
    //get radio button value
    const celsius = document.querySelector('#cel');

    if(celsius.checked) unit = 'cel';
    else unit = 'fah';

    updateCityTemp(locationData, unit);
    updateCityForecast(locationData, unit);
}

function updateCityTemp(obj, unit){
    const city = document.querySelector(".city");
    const region = document.querySelector(".region");
    const country = document.querySelector(".country");
    const temp = document.querySelector(".temp");
    const max = document.querySelector(".max__temp");
    const min = document.querySelector(".min__temp");
    const humidity =  document.querySelector(".humidity_perc");
    const dayNightIcon = document.querySelector("#day-night-icon")
    const weatherImg = document.querySelector(".weather-img>img");

    //create span for degree unit
    const tempUnit = document.createElement('span');
    tempUnit.classList.add('temp__unit');

    // set day night icon
    if(obj.current.is_day) dayNightIcon.classList.add('fa-regular','fa-sun');
    else dayNightIcon.classList.add('fa-regular', 'fa-moon');

    city.textContent = obj.location.name;
    region.textContent = obj.location.region;
    country.textContent = obj.location.country;
    humidity.textContent = obj.current.humidity;
    weatherImg.src = obj.current.condition.icon;

    // set temps depending on unit - celsius default
    if(unit === 'cel'){
        temp.textContent = obj.current.temp_c;
        tempUnit.textContent = 'ºC';
        temp.appendChild(tempUnit);
        max.textContent = obj.forecast.forecastday[0].day.maxtemp_c;
        min.textContent = obj.forecast.forecastday[0].day.mintemp_c;
    }
    else {
        temp.textContent = obj.current.temp_f;
        tempUnit.textContent = 'ºF';
        temp.appendChild(tempUnit);
        max.textContent = obj.forecast.forecastday[0].day.maxtemp_f;
        min.textContent = obj.forecast.forecastday[0].day.mintemp_f;
    }
}

function updateCityForecast(obj, unit) {
    const daysArray = obj.forecast.forecastday;
    const imgList = document.querySelectorAll('.weather_icon')
    const avgList = document.querySelectorAll('.card__average-temp');
    const minList = document.querySelectorAll('.card__min-max-temp>.min');
    const maxList = document.querySelectorAll('.card__min-max-temp>.max');
    const dayList = document.querySelectorAll('.card__day');

    const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    for(let i = 1; i < daysArray.length; i++){
        imgList[i-1].src = daysArray[i].day.condition.icon;
        //get day
        let date = new Date(daysArray[i].date);
        let weekDay = weekDays[date.getDay()];
        dayList[i-1].textContent = weekDay;
    }

    // set temps depending on unit - celsius default
    if(unit === 'cel'){
        for(let i = 1; i < daysArray.length; i++){
            avgList[i-1].textContent = daysArray[i].day.avgtemp_c;
            minList[i-1].textContent = daysArray[i].day.mintemp_c;
            maxList[i-1].textContent = daysArray[i].day.maxtemp_c;
        }
    }
    else {
        for(let i = 1; i < daysArray.length; i++){
            avgList[i-1].textContent = daysArray[i].day.avgtemp_f;
            minList[i-1].textContent = daysArray[i].day.mintemp_f;
            maxList[i-1].textContent = daysArray[i].day.maxtemp_f;
        }
    }
    
}

function radioButtonHandler(){
    document.body.addEventListener('change', e => {
        let target = e.target;

        switch(target.id){
            case 'cel':
                updateScreenData('cel');
                break;
            case 'fah':
                updateScreenData('fah');
                break
        }
    });
}

radioButtonHandler();
getData();

