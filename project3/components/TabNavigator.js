import React from 'react';
import {Text, AsyncStorage, Image, View} from 'react-native';
import { createMaterialTopTabNavigator } from "react-navigation";
import Home from "./Home.js";
import StepCounter from "./StepCounter";
import CalendarDisplayer from "./CalendarDisplayer";
import TodoList from "./TodoList";

class homeTab extends React.Component {

    constructor(props){
        super(props);

    }
    render() {
        return (
            <Text>Her kommer en kul homescreen</Text>
        );
    }
}

export default createMaterialTopTabNavigator ({
    Home: {
      screen: homeTab,
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
