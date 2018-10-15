import React from 'react';
import {Image} from "react-native";
import { createMaterialTopTabNavigator } from "react-navigation";
import Home from "./Home.js";
import StepCounter from "./StepCounter";
import CalendarDisplayer from "./CalendarDisplayer";
import TodoList from "./TodoList";

export default createMaterialTopTabNavigator ({
    Home: {
      screen: Home,
      navigationOptions: {
          tabBarIcon: ({ tintColor }) => {
              return <Image style={{height:30, width:30}} source={require('../assets/home.png')}/>;
          }
      }
    },

    TodoList: {
      screen: TodoList,
      navigationOptions: {
          tabBarIcon: ({ tintColor }) => {
              return <Image style={{height:30, width:30}} source={require('../assets/todo.png')}/>;
          }
      }
    },

    Pedometer: {
        screen: StepCounter,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => {
                return <Image style={{height:30, width:30}} source={require('../assets/stepcounter.png')}/>;
            }
        }
    },

    Calendar: {
      screen: CalendarDisplayer,
      navigationOptions: {
          tabBarIcon: ({ tintColor }) => {
              return <Image style={{height:30, width:30}} source={require('../assets/calendar.png')}/>;
          }
      }
    },
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 14,
    },
    showIcon: true,
    showLabel: false,
  }
});
