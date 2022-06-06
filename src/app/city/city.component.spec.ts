import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityComponent } from './city.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CityComponent', () => {
  let component: CityComponent;
  let fixture: ComponentFixture<CityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule],
      declarations: [ CityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contain Submit button', () => {
    const btn = fixture.debugElement.nativeElement.querySelector('#fetch_weather');
    expect(btn.innerHTML).toBe('Submit');
  });

  it('should show error message for empty city field', () => {
    component.city_name = '';
    component.selected_temperature_unit = 1;
    component.fetchWeather(component.selected_temperature_unit);
    fixture.detectChanges();
    expect(component.message).toEqual('Please enter a city name and try again');

  });

  
  it('should show temperature in °C when metric clicked', () => {
    component.city_name = 'helsinki';
    component.selected_temperature_unit  = 2;
    component.showMetricTemperature();
    expect(component.temp_unit.const).toBe('°C');
  });

});
