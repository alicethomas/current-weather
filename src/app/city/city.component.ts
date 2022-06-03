import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { WeatherService } from '../services/weather.service';

export interface weather_details {
  description: string,
  icon: string,
  id: string,
  main: string
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
  weather: weather_details = {
                                description: '',
                                icon: '',
                                id: '',
                                main: ''
                              };

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
      
    this.weatherService.getWeather(this.city_name).subscribe((res: any) => {
      console.log('res', res);
      this.weather = res.weather[0];
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
