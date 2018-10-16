import React from 'react';
import {StyleSheet, Text, View, List, AsyncStorage, ScrollView, Button} from 'react-native';
import styles from "../stylesheets/Home.style.js";
import HomeListItemTodo from "./HomeListItemTodo";
import HomeListItemCalendar from "./HomeListItemCalendar";
import Moment from "moment";

export default class Home extends React.Component {

    constructor(props){
        super(props);
        let date = Moment().format("YYYY-MM-DD");
        this.state = {
            todoList: [],
            calendar: {},
            date: date,
        };
    }

    //This function runs when the user loads the application and press the refreshbutton
    refresh(){
        let todoList = [];
        this.state.calendar = {};
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
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

                    //check if key includes event
                    else if(key.substring(0,5) === "event"){
                        //Parse the JSON back to a js object
                        let parsedValue = JSON.parse(value);
                        //Get key of the js object, which will be the date
                        let listKeys = Object.keys(parsedValue);
                        //Get all events on this date and show them to the user
                        let today = Moment().format("YYYY-MM-DD");
                        if(listKeys.toString().match(today)){
                            if(!this.state.calendar[listKeys[0]]){
                                this.state.calendar[listKeys[0]] = [];
                            }
                            //Use this date as a key when storing the event in state.
                            //parsedValue[listKeys[0]] is the value of the object, which contains event name, start time and end time
                            this.state.calendar[listKeys[0]].push(parsedValue[listKeys[0]][0]);
                            //Making a new, empty object to add the new item in
                            let newItems = {};
                            //Get every key (every date) in this.state.items and for each key, get items (name and time) in the state-list, and add it to newItems
                            Object.keys(this.state.calendar).forEach(key => {newItems[key] = this.state.calendar[key];});
                            //Set state to be the newItems object. this.state.items now contains every date that previously was there, and the new one.
                            this.setState({
                                calendar: newItems,
                            });
                        }
                    }
                });
                //Create a sorted list for the homepage
                const sortedByDateTodos = this.sortByDate(todoList);
                this.setState({
                    todoList:sortedByDateTodos,
                });

            });
        });


    }

    //This function sorts the current list by date
    sortByDate(todoList){
        let todosWithDate = [];
        let todosWithoutDate = [];

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
    };

    componentDidMount(){
        this.refresh();
    }

    render() {
        if(!this.state.calendar[this.state.date]){this.state.calendar[this.state.date]=[];}
        return (
            <React.Fragment>
                <View style={styles.container}>
                    <View style={{padding: 10, borderBottomWidth: 0.5}}>
                        {/*Refreshbutton so the user can update the homepage*/}
                        <Button
                            onPress={() => this.refresh()}
                            title={"Refresh homepage"}
                        />
                    </View>
                    <View style={styles.homeItem}>
                        <Text style={styles.homeItemText}>Todays Events</Text>
                    </View>
                    {/*Shows today's events to the user*/}
                    {<View style={styles.list}>
                        {this.state.calendar[this.state.date].slice(0,3).map((element) => (
                            <HomeListItemCalendar key = {element.eventNr} name = {element.name} start = {element.startTime} end = {element.endTime} />
                        ))}

                    </View>}


                    <View style={styles.homeItem}>
                        <Text style={styles.homeItemText}>Upcoming Todos</Text>
                    </View>
                    {/*Shows the three first todos to the user*/}
                    {<View style={styles.list}>
                        {this.state.todoList.slice(0,3).map((element) =>
                            <HomeListItemTodo name = {element.todoText} key = {element.key} done = {element.done} date = {element.todoDate} todoNr = {element.todoNr}/>
                        )}
                    </View>}
                </View>
            </React.Fragment>
        );
    }
};
