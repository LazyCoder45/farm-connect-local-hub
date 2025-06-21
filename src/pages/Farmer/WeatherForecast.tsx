
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Cloud, Sun, CloudRain, Wind, Droplets, Thermometer, Eye, Gauge } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const WeatherForecast = () => {
  const { profile } = useAuth();
  const [currentWeather, setCurrentWeather] = useState({
    temperature: 28,
    humidity: 65,
    windSpeed: 12,
    visibility: 8,
    pressure: 1013,
    condition: 'Partly Cloudy',
    rainChance: 30,
  });

  const [forecast, setForecast] = useState([
    { day: 'Today', high: 28, low: 22, condition: 'Partly Cloudy', rain: 30 },
    { day: 'Tomorrow', high: 30, low: 24, condition: 'Sunny', rain: 10 },
    { day: 'Wednesday', high: 26, low: 20, condition: 'Rainy', rain: 80 },
    { day: 'Thursday', high: 29, low: 23, condition: 'Cloudy', rain: 40 },
    { day: 'Friday', high: 31, low: 25, condition: 'Sunny', rain: 5 },
  ]);

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case 'sunny': return <Sun className="h-8 w-8 text-yellow-500" />;
      case 'rainy': return <CloudRain className="h-8 w-8 text-blue-500" />;
      case 'cloudy': return <Cloud className="h-8 w-8 text-gray-500" />;
      case 'partly cloudy': return <Cloud className="h-8 w-8 text-gray-400" />;
      default: return <Sun className="h-8 w-8 text-yellow-500" />;
    }
  };

  const getFarmingAdvice = (weather: any) => {
    if (weather.rainChance > 70) {
      return {
        advice: 'Heavy rain expected - avoid field work and ensure proper drainage',
        color: 'destructive'
      };
    } else if (weather.temperature > 35) {
      return {
        advice: 'High temperature - increase irrigation and provide shade for sensitive crops',
        color: 'secondary'
      };
    } else if (weather.rainChance < 20 && weather.temperature > 25) {
      return {
        advice: 'Good weather for harvesting and field activities',
        color: 'default'
      };
    } else {
      return {
        advice: 'Moderate conditions - monitor soil moisture levels',
        color: 'outline'
      };
    }
  };

  const advice = getFarmingAdvice(currentWeather);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-farm-800 mb-2">Weather Forecast</h1>
        <p className="text-lg text-muted-foreground">
          Current conditions for {profile?.district}, {profile?.upazila}
        </p>
      </div>

      {/* Current Weather */}
      <Card className="mb-8 border-farm-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {getWeatherIcon(currentWeather.condition)}
            Current Weather
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <Thermometer className="h-6 w-6 text-red-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-farm-800">{currentWeather.temperature}°C</div>
              <p className="text-sm text-muted-foreground">Temperature</p>
            </div>
            <div className="text-center">
              <Droplets className="h-6 w-6 text-blue-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-farm-800">{currentWeather.humidity}%</div>
              <p className="text-sm text-muted-foreground">Humidity</p>
            </div>
            <div className="text-center">
              <Wind className="h-6 w-6 text-gray-500 mx-auto mb-2" />
              <div className="text-3xl font-bold text-farm-800">{currentWeather.windSpeed} km/h</div>
              <p className="text-sm text-muted-foreground">Wind Speed</p>
            </div>
            <div className="text-center">
              <CloudRain className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-3xl font-bold text-farm-800">{currentWeather.rainChance}%</div>
              <p className="text-sm text-muted-foreground">Rain Chance</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-farm-50 rounded-lg">
            <Badge variant={advice.color as any} className="mb-2">Farming Advice</Badge>
            <p className="text-farm-800">{advice.advice}</p>
          </div>
        </CardContent>
      </Card>

      {/* 5-Day Forecast */}
      <Card className="border-farm-200">
        <CardHeader>
          <CardTitle>5-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <Card key={index} className="border-farm-100">
                <CardContent className="p-4 text-center">
                  <h3 className="font-semibold text-farm-800 mb-2">{day.day}</h3>
                  {getWeatherIcon(day.condition)}
                  <div className="mt-2">
                    <div className="text-lg font-bold text-farm-800">{day.high}°</div>
                    <div className="text-sm text-muted-foreground">{day.low}°</div>
                  </div>
                  <div className="mt-2">
                    <Badge variant="outline" className="text-xs">
                      {day.rain}% rain
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{day.condition}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weather Alerts */}
      <Card className="mt-8 border-yellow-200 bg-yellow-50">
        <CardHeader>
          <CardTitle className="text-yellow-800">Weather Alerts & Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CloudRain className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800">Rain Expected Wednesday</h4>
                <p className="text-sm text-yellow-700">
                  Heavy rainfall predicted. Consider covering sensitive crops and ensuring proper drainage.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Sun className="h-5 w-5 text-orange-500 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800">Sunny Weekend Ahead</h4>
                <p className="text-sm text-yellow-700">
                  Perfect conditions for harvesting and field maintenance activities.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherForecast;
