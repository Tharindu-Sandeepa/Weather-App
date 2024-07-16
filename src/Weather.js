import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Card, CardContent, Box, Grid, Divider } from '@mui/material';
import { LocationOn, Opacity, AcUnit, Speed ,Air,WbSunny,WbTwilight} from '@mui/icons-material';
import axios from 'axios';
import { Zoom, Slide, Fade } from 'react-awesome-reveal';
import ReactAnimatedWeather from "react-animated-weather";
import './Weather.css'; // Import the CSS file for animations

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const apiKey = '6ac4190d7ee2eebed335c9802f843bb8'; // Replace with your OpenWeatherMap API key

  const getWeather = async () => {
    try {
      setError('');
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
      setWeather(response.data);
    } catch (err) {
      setError('City not found or error fetching data.');
    }
  };

  // Define weather icons based on weather conditions
  const weatherIcons = {
    'Clear': {
      icon: 'CLEAR_DAY',
      color: 'yellow',
    },
    'Clouds': {
      icon: 'CLOUDY',
      color: 'white',
    },
    'Rain': {
      icon: 'RAIN',
      color: 'white',
    },
    'Drizzle': {
      icon: 'SLEET',
      color: 'deepskyblue',
    },
    'Thunderstorm': {
      icon: 'WIND',
      color: 'darkslategrey',
    },
    'Snow': {
      icon: 'SNOW',
      color: 'whitesmoke',
    },
    'Mist': {
      icon: 'FOG',
      color: 'lightgrey',
    },
    'Smoke': {
      icon: 'FOG',
      color: 'lightgrey',
    },
    'Haze': {
      icon: 'FOG',
      color: 'lightgrey',
    },
    'Dust': {
      icon: 'FOG',
      color: 'lightgrey',
    },
    'Fog': {
      icon: 'FOG',
      color: 'lightgrey',
    },
    'Sand': {
      icon: 'FOG',
      color: 'lightgrey',
    },
    'Ash': {
      icon: 'FOG',
      color: 'lightgrey',
    },
    'Squall': {
      icon: 'WIND',
      color: 'darkslategrey',
    },
    'Tornado': {
      icon: 'WIND',
      color: 'darkslategrey',
    },
  };

  // Function to generate random position and animation delay for stars
  const generateStars = () => {
    return Array.from({ length: 40 }).map((_, index) => ({
      top: `${Math.floor(Math.random() * 100)}%`,
      left: `${Math.floor(Math.random() * 100)}%`,
      animationDelay: `${Math.random() * 5}s`,
    }));
  };

  return (
    <Container maxWidth="sm" style={{ marginTop: '20px' ,marginBottom:'100px'}}>

      {/* Animated Background */}
      <div className="animated-background">
        {generateStars().map((star, index) => (
          <div
            key={index}
            className="star"
            style={{
              top: star.top,
              left: star.left,
              animationDelay: star.animationDelay,
            }}
          ></div>
        ))}
      </div>

      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" style={{  padding: '10px' }}>
        <Typography sx={{ color: '#ffffff', fontWeight: 'bold' }} variant="h4" gutterBottom>Weather App</Typography>
        <TextField
          label="City"
          variant="outlined"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          InputProps={{
            style: { color: 'white' },
          }}
          InputLabelProps={{
            style: { color: 'white' },
          }}
          style={{ marginBottom: '20px'}}
        />
        <Button variant="contained" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }} onClick={getWeather}>
          Get Weather
        </Button>
      </Box>

      {error && <Typography color="error" style={{ marginTop: '20px' }}>{error}</Typography>}
      
      {weather && (
         <Card
         className="card-container"
         style={{
           marginTop: '20px',
           backgroundColor: 'rgba(255, 255, 255, 0.1)', // Transparent background
           backdropFilter: 'blur(10px)', // Blur effect
           boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.4)',
           borderRadius:'25px'

         }}
       >
           <CardContent className="card">
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box display="flex" alignItems="center">
                    <LocationOn sx={{ color:"#FF4242"}} style={{ marginRight: '10px' }} />
                    <Typography sx={{ color:"#ffff"}} variant="h6">{weather.name}, {weather.sys.country}</Typography>
                  </Box>
                  <Typography sx={{ color:"#ffff"}} variant="h6">{new Date().toLocaleDateString()}</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" justifyContent="center" style={{ margin: '20px 0' }}>
                  <Zoom><ReactAnimatedWeather
                    icon={weatherIcons[weather.weather[0].main]?.icon || 'CLEAR_DAY'}
                    color={weatherIcons[weather.weather[0].main]?.color || 'goldenrod'}
                    size={140}
                    animate={true}
                  /></Zoom>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Typography sx={{color: '#ffffff' }} variant="h1" style={{ fontSize: '4rem' }}>{Math.round(weather.main.temp)}°C</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <Typography sx={{ color:"#C0FDFF"}} variant="body1" style={{ textTransform: 'capitalize' }}>{weather.weather[0].description}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center">
                  <Opacity style={{ marginRight: '10px' }} />
                  <Typography>Humidity: {weather.main.humidity} %</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center">
                  <Speed style={{ marginRight: '10px' }} />
                  <Typography>Wind Speed: {weather.wind.speed} m/s</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center">
                  <AcUnit style={{ marginRight: '10px' }} />
                  <Typography>Pressure: {weather.main.pressure} hPa</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center">
                <Air style={{ marginRight: '10px' }} />
                  <Typography>Wind Direction: {weather.wind.deg}°</Typography>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider style={{ margin: '20px 0' }} />
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center" className="sun-info">
                <WbSunny sx={{ color:"#FCF138"}} className="sun-info" style={{ marginRight: '10px' }} />
                  <Typography>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</Typography>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box display="flex" alignItems="center" className="sun-info">
                <WbTwilight className="sun-info" sx={{ color:"#FAB653"}} style={{ marginRight: '10px' }} />
                  <Typography >Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</Typography>
                </Box>
              </Grid>
            </Grid>
        </CardContent>
        </Card>
      )}

    </Container>
  );
};

export default Weather;
