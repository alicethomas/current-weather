import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';

export interface WeatherDetails {
  description: string,
  icon: string,
  id: string,
  main: string
}

export interface TemperatureDetails {
  feels_like: number,
  temp: number
}

export interface Units {
  id: number,
  name: string,
  const: string
}

export interface CityDetails {
  id: number,
  city: string,
  country: string,
  latitude: number,
  longitude: number
}

@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css']
})
export class CityComponent implements OnInit {

  city_name: string = '';
  selectedCity = <CityDetails>{};
  cities_list: CityDetails[] = [];

  display_info: boolean = false;
  set_error_message: boolean = false;
  error_message: string;

  selected_temperature_unit: number = 1;
  temp_unit : Units = {
                        id: 1, 
                        name: 'Metric', 
                        const: '°C'
                      };
  temperature_units: Units[] = [
                                {id: 1, name: 'Metric', const: '°C'},
                                {id: 2, name: 'Imperial', const: '°F'}
                              ];
  temperature: TemperatureDetails = {
                                      feels_like: 0,
                                      temp: 0
                                    }

  weather: WeatherDetails = {
                              description: '',
                              icon: '',
                              id: '',
                              main: ''
                            };

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
  }

  fetchCityList(temp: number)
  {
    this.cities_list = [];
    if (this.city_name == '')
    {
      this.showErrorMessage();
    }
    else {
      this.set_error_message = false;
      this.temp_unit = this.temperature_units.filter(b => {return b.id == temp})[0];
      this.weatherService.findCityOptions(this.city_name, this.temp_unit.name).subscribe((res: any) => {
        res.list.forEach((el: any) => {
          this.cities_list.push({'id':el.id,'city': el.name,'country': el.sys.country, 'latitude': el.coord.lat, 'longitude': el.coord.lon})
        });
      },
      error => {
        alert(this.city_name + ' ' + error.statusText);
      });

    }
  }

  onSelect(city: CityDetails)
  {
    this.selectedCity = city;
    this.fetchCityWeather(city);
  }

  fetchCityWeather(city: CityDetails)
  {
    this.cities_list = [];
    this.temp_unit = this.temperature_units.filter(b => {return b.id == this.selected_temperature_unit})[0];
    this.weatherService.getCityWeather(city.latitude, city.longitude, this.temp_unit.name).subscribe((response: any) => {
      this.city_name = this.selectedCity.city;
      this.weather = response.current.weather[0];
      this.temperature = {'feels_like': response.current.feels_like, 'temp': response.current.temp};
    });
    this.displayInfo(true);
  }

  showMetricTemperature()
  {
    if (this.city_name) {
      this.selected_temperature_unit = 1;
      this.fetchCityWeather(this.selectedCity);
    } else {
      this.showErrorMessage();
    }
  }

  showImperialTemperature()
  {
    if (this.city_name){
      this.selected_temperature_unit = 2;
      this.fetchCityWeather(this.selectedCity);
    }
    else {
      this.showErrorMessage();
    }
  }

  controlDisplay()
  {
    this.displayInfo(false)
  }

  displayInfo(val:boolean)
  {
    this.display_info = val;
  }

  showErrorMessage()
  {
    this.set_error_message = true;
    this.error_message = 'Please enter a city name and try again';
  }
}
