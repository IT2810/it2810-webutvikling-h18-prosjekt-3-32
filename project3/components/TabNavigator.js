import React from 'react';
import {Text, AsyncStorage, Image, View} from 'react-native';
import { createMaterialTopTabNavigator } from "react-navigation";
import Home from "./Home.js";
import TodoList from "./TodoList";
import StepCounter from "./StepCounter";

class todoTab extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            todoList: [],
            currentTodoNr: 0,
        };
        this.updateTodoList = this.updateTodoList.bind(this);
    }

    componentDidMount(){
        let updateList = [];
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                    let key = store[i][0];
                    let value = store[i][1];
                    if(key !== "CurrentTodoNr"){
                        //Retrieves the List with name and date (which is stringyfied), and parses it so it becomes an Array.
                        const valueList = JSON.parse(value);
                        updateList.push({
                            key: key,
                            todoNr: key,
                            todoText: valueList[0],
                            todoDate: valueList[1],
                        });
                        this.setState({todoList:updateList});
                    }
                });
            });
        });
    }

    //Updates the todolist, so the user get immediate update.
    updateTodoList(list){
        this.setState({todoList:list});
    }

    //Function to store values in the AsyncStorage
    storeTodo = async (id, data) => {
        try {
            await AsyncStorage.setItem(id, data);
        } catch (error) {
            throw error;
        }
    };

    render() {
        return (
            <TodoList todoList = {this.state.todoList} storeTodo = {this.storeTodo} updateParentTodoList = {this.updateTodoList}/>
        );
    }
}

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
      screen: todoTab,
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
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 14,
    }
  }
});
