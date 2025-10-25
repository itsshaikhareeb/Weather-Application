const btn = document.getElementById("btnSearch")
const inpt = document.getElementById("inptSearch")
const API_KEY = 'a8e34201d7793aff0619f1563c184630'
const info = document.getElementById("extraInfo")
let res= ""
// let hold = ""





 async function fetchData(city_name) {
    if(city_name == ""){
        emptyInpt()
        return;
    }
     let result = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_KEY}&units=metric`)
     res = await result.json()
    // console.log(res.message);
    console.log(`this is ${res}`);
    if( res == "" || res.cod == "404" || res.cod == "400"){
        emptyInpt()
        return;
    }
    info.innerHTML = `
                <div  id="temp">
                  <p id='temp1' >${res.main.temp}°C</p> 
                    <p id="loc1" >${res.name}</p>
                </div>
                <div id="air" >
                    <p>Wind: <span>${res.wind.speed}km/h</span></p>
                    <p>Air Pressure <span>${res.main.pressure}</span></p>
                    <p>Humidity <span>${res.main.humidity}</span></p>
                </div>`
}

btn.addEventListener('click', ()=>{
    fetchData(inpt.value)
})

inpt.addEventListener('keydown', (e)=>{
    if(e.key === "Enter"){
        console.log(res);
        fetchData(inpt.value)

    }
})

function emptyInpt(){
    alert("Please enter valid city name.")
}

