'use strict'
import * as React from 'react';
import { AppRegistry, Button, Alert, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import Weather from '/Users/hannah/Documents/seniorProject/avalancheApp/components/Weather';
import { API_KEY } from '/Users/hannah/Documents/seniorProject/avalancheApp/utils/WeatherApiKey';
import { Conditions } from '/Users/hannah/Documents/seniorProject/avalancheApp/utils/Conditions';

export class Home extends React.Component {
	state = {
                isLoading: true,
                temperature: 0,
                weatherCondition: null,
                        error: null
        };
        componentDidMount() {
          Geolocation.getCurrentPosition(
            position => { this.fetchWeather(position.coords.latitude, position.coords.longitude); },
            error => { this.setState({ error: 'Error Getting Weather Conditions'});
                     }
          );
        }

        fetchWeather(lat, lon) {
	  fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=imperial` )     
		  .then(res => res.json())
                  .then(json => {
			console.log(json);
                     this.setState({
                     temperature: json.main.temp,
                     weatherCondition: json.weather[0].main,
                     isLoading: false
                     });
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
        </View>
      );
    }
 }

const styles = StyleSheet.create({
        container: {
                flex: 1,
                backgroundColor: '#66A6FF'
        }
});
AppRegistry.registerComponent('Home', () => Home);
