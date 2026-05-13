export interface WeatherStatus {
  condition: 'Rainy' | 'Cloudy' | 'Sunny' | 'Stormy' | string;
  temperature: number;
  humidity: number;
}

