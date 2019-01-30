import React from 'react';
import { StyleSheet, Button, View, Text } from 'react-native';
import Weather from '../components/Weather';
import { WEATHER_API_KEY } from '../utils/WeatherAPIKey';
import { SERVER_ADDRESS, SERVER_PORT, CUR_AUTH_USER } from '../utils/Const';

export default class WeatherScreen extends React.Component {
  static navigationOptions = {
    title: 'Weather',
  }
  state = {
    isLoading: true,
    temperature: 0,
    weatherCondition: null,
    error: null
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      position => {
        this.fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      error => {
        this.setState({
          error: 'Error Getting Weather Conditions'
        });
      }
    );
  }

  logWeather = () => {
    fetch(
      `${SERVER_ADDRESS}:${SERVER_PORT}/${CUR_AUTH_USER.uuid}/log?weather=${weatherCondition}&temperature=${temperature}`
    ).then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error('There was a network error with your request.');
    }).then(json => {
      console.log(json.totalLogs);
    });
  }

  fetchWeather(lat, lon) {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${WEATHER_API_KEY}&units=imperial`
    )
    .then(res => res.json())
    .then(json => {
      // console.log(lat);
      // console.log(lon);
      // console.log(json);
      this.setState({
        temperature: json.main.temp,
        weatherCondition: json.weather[0].main,
        isLoading: false
      });
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      throw error;
    });
  }

  render() {
    const { isLoading, weatherCondition, temperature } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Fetching The Weather</Text>
          </View>
        ) : (
          <Weather weather={weatherCondition} temperature={temperature} />
        )}
        <Button onPress={logWeather} title="Log the weather."/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFDE4'
  },
  loadingText: {
    fontSize: 30
  }
});
