import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherfindUrl = 'https://api.openweathermap.org/data/2.5/find';
  private weatherUrl = 'https://api.openweathermap.org/data/2.5/onecall';
  constructor(private http: HttpClient) { }

  findCityOptions(city_name: string, temperature_unit: string)
  {
    return this.http.get(this.weatherfindUrl + "?q="+city_name+"&units="+temperature_unit+"&appid=96b2d8899b1dc93083dbe4b85ed75de6");
  }

  getCityWeather(latitude: number, longitude: number, temperature_unit: string)
  {
    return this.http.get(this.weatherUrl + "?lat=" + latitude + "&lon=" + longitude + "&units=" + temperature_unit + "&appid=96b2d8899b1dc93083dbe4b85ed75de6")
  }

}
