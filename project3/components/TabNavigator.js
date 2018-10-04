import React from 'react';
import {Image} from 'react-native';
import { createMaterialTopTabNavigator } from "react-navigation";
import TodoList from "./TodoList.js";
import Home from "./Home.js";
import HomeIcon from '../assets/home.png';

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
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 14,
    }
  }
});
