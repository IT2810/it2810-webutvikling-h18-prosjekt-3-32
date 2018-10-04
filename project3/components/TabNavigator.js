import React from 'react';
import {AsyncStorage, Image, View} from 'react-native';
import { createMaterialTopTabNavigator } from "react-navigation";
import Home from "./Home.js";
import TodoList from "./TodoList";

class todoTab extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            todoList: [],
            test: "hei",
            currentTodoNr: 0,
        };
        this.updateTodoList = this.updateTodoList.bind(this);
    }

    componentDidMount(){
        let updateList = [];
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    let value = store[i][1];
                    console.log("Key: " + key);
                    console.log("Value: " + value);
                    updateList.push({
                        key: key,
                        todoNr: key,
                        todoText: value,
                    });
                    let newKey = parseInt(key)+1;
                    console.log("Newkeynumber: " + newKey);
                    this.setState({
                        todoList:updateList,
                        currentTodoNr:newKey,
                    }, function(){console.log(this.state.currentTodoNr);});
                });
            });
        });
    }

    updateTodoList(list){
        this.setState({todoList:list});
    }

    storeTodo = async (id, data) => {
        try {
            await AsyncStorage.setItem(id, data);
        } catch (error) {
            throw error;
        }
    };

    fetchTodo = async (id) => {
        try {
            const value = await AsyncStorage.getItem(id);
            if (value !== null) {
                return value;
            }
        } catch (error) {
            throw error;
        }
    };

    render() {
        return (
            <TodoList currentTodoNr = {this.state.currentTodoNr} todoList = {this.state.todoList} storeTodo = {this.storeTodo} updateParentTodoList = {this.updateTodoList}/>
        );
    }
}

class homeTab extends React.Component {
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
            <TodoList todoList = {this.state.todoList} storeTodo = {this.props.storeTodo} updateParentTodoList = {this.updateTodoList}/>
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
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 14,
    }
  }
});
