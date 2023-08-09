const api = "0b65e33d4c094f19a38192914230408";
const url = `http://api.weatherapi.com/v1/forecast.json?key=${api}&q=culiacan&days=7`

async function test(){
    const response = await fetch(url, {mode: "cors"});
    const data = await response.json();
    console.log(data);
}

test();