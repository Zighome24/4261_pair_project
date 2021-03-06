import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import WeatherScreen from '../screens/WeatherScreen';
import LogsScreen from '../screens/LogsScreen';

const WeatherStack = createStackNavigator({
  Weather: WeatherScreen,
});

WeatherStack.navigationOptions = {
  tabBarLabel: 'Weather',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-cloudy-night' : 'md-cloudy-night'}
    />
  ),
};

const LogStack = createStackNavigator({
  Logs: LogsScreen,
});

LogStack.navigationOptions = {
  tabBarLabel: 'Logs',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};


export default createBottomTabNavigator({
  WeatherStack,
  LogStack
});
