import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from "./stylesheets/App.style.js";
import TabNavigator from "./components/TabNavigator";
import MenuBar from "./components/MenuBar";
import { AsyncStorage } from "react-native"

export default class App extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            todoList: [],
        };
        this.updateTodoList = this.updateTodoList.bind(this);
        this.storeData = this.storeData.bind(this);
        this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount(){

    }

    updateTodoList(list){
        this.setState({todoList:list});
    }

    storeData = async (id, desc) => {
        try {
            await AsyncStorage.setItem(id.toString(), desc);
        } catch (error) {
            throw error;
        }
    };

    fetchData = async (id) => {
        try {
            const value = await AsyncStorage.getItem(id.toString());
            if (value !== null) {
                return value;
            }
        } catch (error) {
            throw error;
        }
    };

    render() {
        return (
            <React.Fragment>
              <View style={styles.topBar}/>
              <TabNavigator style={styles.tabNavigator}/>
              <View style={styles.container}>
                <TodoList todoList = {this.state.todoList} storeTodo = {this.storeData} updateParentTodoList = {this.updateTodoList}/>
              </View>
            </React.Fragment>
        );
    }
};