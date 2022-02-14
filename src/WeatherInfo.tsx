import React, {useEffect, useState} from 'react';
import axios from 'axios';

type WeatherData = {
    base : string,
    clouds : object,
    cod :string,
    coord:object,
    dt :string,
    id : number,
    main: object,
    name: String,
    sys:Object,
    timezone:string,
    visiblity : string,
    weather:Array<String>,
    wind:Object,
}

export default function WeatherInfo() {
    // @ts-ignore
    const [weatherInfo, setWeatherInfo] = useState<WeatherData>([]);
    const [searchText, setSearchText] = useState("India");

    useEffect(() => { 
        getWeatherInfo();
        return () => {
          
        }
      }, [])

    const  getWeatherInfo= () =>{
        if(searchText.length<3) {
            alert('No Text')
            return
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchText}&appid=0a9cb7f9907c0c31ed11b978e34341de`;

        axios({
          method: "GET",
          url,
        }).then((res) => {
            if(res.status ===200)
            {
                setWeatherInfo(res.data);
            }
        })
    }
    
    return (
        <div>
            <input style={{padding:'10px', width:'500px'}} placeholder="Add Country Details"  name="search" onChange={(e) => setSearchText(e.target.value)} value={searchText}/>
            &nbsp;<button style={{padding:'10px', }} disabled={searchText <3 ? true : false} onClick={() => getWeatherInfo()}>Search</button>



            <h3>Weather Info</h3>

            { weatherInfo.length != 0 ? 
            <table data-testid ="Weather-information">

                <tr>
                    <td>Name :</td>
                    <td> {weatherInfo?.name}</td>
                </tr>

                <tr>
                    <td>Temperature :</td>
                    <td> {weatherInfo?.main?.temp}</td>
                </tr>

                <tr>
                    <td>Humadity :</td>
                    <td> {weatherInfo?.main?.humidity}</td>
                </tr>
                <img alt="weather-icon" src={'https://scx2.b-cdn.net/gfx/news/2019/weatherforec.jpg'} height='150px' width='200px'/>
                <tr>
                    <td>Weather :</td>

                    <td> {weatherInfo?.weather && weatherInfo?.weather[0]?.description}</td>
                </tr>
                <tr>
                    <td>Wind speed :</td>
                    <td> {weatherInfo?.wind?.speed}</td>
                </tr>
            </table> :
            <div data-testid ="loading-information"> Loading Data ......</div>
                } 
        </div>
    )
}
