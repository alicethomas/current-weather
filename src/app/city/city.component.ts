import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeatherService } from '../services/weather.service';

export interface weather_details {
  description: string,
  icon: string,
  id: string,
  main: string
}

export interface temperature_details {
  feels_like: number,
  temp: number
}
export interface units {
  id: number,
  name: string,
  const: string
}

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  city_name: string = '';
  display_info: boolean = false;
  error_message: boolean = false;
  message: string;
  selected_temperature_unit: number = 1;
  temp_unit : units;
  temperature_units: units[] = [
    {id: 1, name: 'Metric', const: '°C'},
    {id: 2, name: 'Imperial', const: '°F'}];
  weather: weather_details = {
                                description: '',
                                icon: '',
                                id: '',
                                main: ''
                              };
  temperature: temperature_details =  {
    feels_like: 0,
    temp: 0
  }
  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  fetchWeather()
  {
    if (this.city_name == '')
    {
      this.error_message = true;
      this.message = 'Please enter a city name and try again';
    }
    else {
      this.error_message = false;
      this.temp_unit = this.temperature_units.filter(b => {return b.id == this.selected_temperature_unit})[0];
      this.weatherService.getWeather(this.city_name, this.temp_unit.name).subscribe((res: any) => {
        this.weather = res.weather[0];
        this.temperature = res.main
      });

      this.displayInfo(true);
    }
  }

  hideDisplay()
  {
    this.displayInfo(false)
  }

  displayInfo(val:boolean)
  {
    this.display_info = val;
  }


}
