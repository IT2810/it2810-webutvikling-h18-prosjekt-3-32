import React from 'react';
import {Image, View} from 'react-native';
import { createMaterialTopTabNavigator } from "react-navigation";
import Home from "./Home.js";
import TodoList from "./TodoList";

class todoTab extends React.Component {
    updateTodoList(list){
        this.setState({todoList:list});
    }
    constructor(props){
        super(props);
        this.state = {
            todoList: [],
        };
        this.updateTodoList = this.updateTodoList.bind(this);

    }
    render() {
        return (
            <TodoList todoList = {this.state.todoList} storeTodo = {this.storeData} updateParentTodoList = {this.updateTodoList}/>
        );
    }
}

export default createMaterialTopTabNavigator ({
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Home',
      },
    },


    TodoList: {
      screen: todoTab,
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
