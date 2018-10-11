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
            showList:[],
            currentTodoNr: 0,
        };
        this.updateTodoList = this.updateTodoList.bind(this);
        this.updateFinishedTodoList = this.updateFinishedTodoList.bind(this);
        this.updateShowList = this.updateShowList.bind(this);
    }

    componentDidMount(){
        let todoList = [];
        let finishedTodoList = [];
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                    let key = store[i][0];
                    let value = store[i][1];

                    //Checks if the item is a to-do
                    if(key.substring(0,4) === "todo"){
                        const valueList = JSON.parse(value);
                        todoList.push({
                            key: key,
                            todoNr: key,
                            todoText: valueList[0],
                            todoDate: valueList[1],
                            done: valueList[2],
                        });
                    }

                    //Checks if the item is a finished to-do
                    else if (key.substring(0,4) === "done"){
                        const valueList = JSON.parse(value);
                        finishedTodoList.push({
                            key: key,
                            todoNr: key,
                            todoText: valueList[0],
                            done: valueList[2],
                        });
                    }
                });

                //Sorts the imported list from AsyncStorage and updates the state to all three lists
                const sortedByDateTodos = this.sortByDate(todoList);
                const sortedByDateFinishedTodos = this.sortByDate(finishedTodoList);
                this.setState({
                    showList:sortedByDateTodos,
                    todoList:sortedByDateTodos,
                    finishedTodoList:sortedByDateFinishedTodos,
                });
            });
        });
    }

    //This function sorts the current list by date
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

    //This is the list being shown to the user, and this function updates the list.
    updateShowList(list){
        const sortedByDate = this.sortByDate(list);
        this.setState({showList:sortedByDate});
    }

    //Updates the finished todolist
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
            <TodoList showList = {this.state.showList} finishedTodoList = {this.state.finishedTodoList} todoList = {this.state.todoList} storeTodo = {this.storeTodo} updateShowList = {this.updateShowList} updateFinishedTodoList = {this.updateFinishedTodoList} updateParentTodoList = {this.updateTodoList}/>
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
