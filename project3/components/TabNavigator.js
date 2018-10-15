import React from 'react';
import { createMaterialTopTabNavigator } from "react-navigation";
import Home from "./Home.js";
import StepCounter from "./StepCounter";
import CalendarDisplayer from "./CalendarDisplayer";
import TodoList from "./TodoList";

export default createMaterialTopTabNavigator ({
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
      },
    },

    TodoList: {
      screen: TodoList,
      navigationOptions: {
        tabBarLabel: 'To do'
      }
    },

    Pedometer: {
        screen: StepCounter,
        navigationOptions: {
            tabBarLabel: 'Pedometer'
        }
    },

    Calendar: {
      screen: CalendarDisplayer,
      navigationOptions: {
        tabBarLabel: 'Calendar'
      }
    },
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 14,
    }
  }
});
