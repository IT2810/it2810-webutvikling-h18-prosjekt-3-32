import React from 'react';
import {Image} from "react-native";
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Home from "./Home.js";
import StepCounter from "./StepCounter";
import CalendarDisplayer from "./CalendarDisplayer";
import TodoList from "./TodoList";

export default createMaterialBottomTabNavigator ({
    Home: {
      screen: Home,
      navigationOptions: {
          tabBarIcon: ({ tintColor }) => {
              return <Image style={{height:23, width:23}} source={require('../assets/home.png')}/>;
          }
      }
    },

    TodoList: {
      screen: TodoList,
      navigationOptions: {
          tabBarIcon: ({ tintColor }) => {
              return <Image style={{height:23, width:23}} source={require('../assets/todo.png')}/>;
          }
      }
    },

    Pedometer: {
        screen: StepCounter,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => {
                return <Image style={{height:23, width:23}} source={require('../assets/stepcounter.png')}/>;
            }
        }
    },

    Calendar: {
      screen: CalendarDisplayer,
      navigationOptions: {
          tabBarIcon: ({ tintColor }) => {
              return <Image style={{height:23, width:23}} source={require('../assets/calendar.png')}/>;
          },

      }
    },
}, {
  barStyle: {
    backgroundColor: "#5cacec",
  },
  activeColor: "white",
  tabBarOptions: {
    labelStyle: {
      fontSize: 14,
    },
    showIcon: true,
    showLabel: false,
  }
});
