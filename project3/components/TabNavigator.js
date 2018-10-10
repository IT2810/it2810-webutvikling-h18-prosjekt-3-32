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
            finishedTodoList:[],
            currentTodoNr: 0,
        };
        this.updateTodoList = this.updateTodoList.bind(this);
        this.updateFinishedTodoList = this.updateFinishedTodoList.bind(this);
    }

    componentDidMount(){
        let updateList = [];
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                    let key = store[i][0];
                    let value = store[i][1];
                    if(key !== "CurrentTodoNr" && key.substring(0,4) !== "done"){
                        //Retrieves the List with name and date (which is stringyfied), and parses it so it becomes an Array.
                        const valueList = JSON.parse(value);
                        updateList.push({
                            key: key,
                            todoNr: key,
                            todoText: valueList[0],
                            todoDate: valueList[1],
                        });
                    }
                });
                const sortedByDate = this.sortByDate(updateList);
                this.setState({todoList:sortedByDate});
            });
        });
    }

    sortByDate(todoList){
        const todosWithDate = [];
        const todosWithoutDate = [];

        todoList.map((item) => {
            if(item.todoDate !== ""){
                todosWithDate.push(item);
            }
            else{
                todosWithoutDate.push(item);
            }
        });

        todosWithDate.sort(function(a,b){
            if(a.todoDate !== "" && b.todoDate !== ""){
                let c = new Date(a.todoDate);
                let d = new Date(b.todoDate);
                return c-d;
            }
        });
        return todosWithDate.concat(todosWithoutDate);
    }

    updateFinishedTodoList(list){
        this.setState({finishedTodoList:list});
    }

    //Updates the todolist, so the user get immediate update.
    updateTodoList(list){
        const sortedByDate = this.sortByDate(list);
        this.setState({todoList:sortedByDate});
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
            <TodoList finishedTodoList = {this.state.finishedTodoList} todoList = {this.state.todoList} storeTodo = {this.storeTodo} updateFinishedTodoList = {this.updateFinishedTodoList} updateParentTodoList = {this.updateTodoList}/>
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
