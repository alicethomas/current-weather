import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  private weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
  constructor(private http: HttpClient) { }

  getWeather(city_name: string, temperature_unit: string)
  {
    return this.http.get(this.weatherUrl + "?q="+city_name+"&units="+temperature_unit+"&appid=96b2d8899b1dc93083dbe4b85ed75de6");
  }
}
