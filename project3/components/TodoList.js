import React from 'react';
import { AsyncStorage, ScrollView, TextInput, TouchableOpacity, Text, View } from 'react-native';
import ListItem from "./ListItem.js";
import styles from "../stylesheets/TodoList.style.js";

export default class TodoList extends React.Component {
    constructor(props){
        super(props);

        //State with current todonr, which increases, and the current todotext that the user is entering
        this.state = {
            currTodoNr: 1,
            todoText: "",
        };

        //Binding functions
        this.addTodo = this.addTodo.bind(this);
        this.updateSortedList = this.updateSortedList.bind(this);
        this.handleFinishedTodo = this.handleFinishedTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.myTextInput = React.createRef();
    };

    componentDidMount(){
        //Gets the highest todoNr and updates the state to no todos have the same todoNr and key.
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                    // get at each store's key/value so you can work with it
                    let key = store[i][0];
                    let value = store[i][1];
                    if(key === "CurrentTodoNr"){
                        this.setState({currTodoNr:parseInt(value)+1});
                    }
                });
            });
        });
    }

    //addTodo adds a new to-do, add it to a list, and passes the list to app.js, since the to-do-list is needed at the home screen.
    //Each element in addTodo gets a key, todoNr, a name and a date(which is empty until the users sets a due date)
    addTodo = (id) => {
        this.myTextInput.current.clear();
        if(this.state.todoText !== ""){
            //Creates a list, sliced from the current todolist
            //Adds the new to-do to the list.
            const addList = this.props.todoList.slice();
            addList.push({
                key: id,
                todoNr: id,
                todoText: this.state.todoText,
                todoDate: "",
            });
            this.setState({
                currTodoNr: this.state.currTodoNr + 1,
                todoText : "",
            });
            //The list is sent to the parent (app.js), for immediate change on the screen
            this.props.updateParentTodoList(addList);

            //The new to-do is also added in the AsyncStorage, aswell as the latest todoNr.
            const AsyncList = [this.state.todoText, ""];
            this.props.storeTodo(id.toString(), JSON.stringify(AsyncList));
            this.props.storeTodo("CurrentTodoNr", id.toString());
        }
        else{alert("Todoen må ha en beskrivelse!");}
    };

    handleFinishedTodo(list){
        const id = list[0]; const text = list[1]; const date = list[2];
        const AsyncList = [text,date];
        AsyncStorage.removeItem(id.toString());

        this.props.storeTodo("done"+id.toString(), JSON.stringify(AsyncList));
        this.props.updateFinishedTodoList(list);
    }

    //updateSortedList immediately updates the list when the date is changed.
    //if a to-do with an older date than another to-do is changed, the to-do will move above
    updateSortedList(list){
        const updateList = this.props.todoList.slice();
        updateList.map((item) => {
            //checks if the to-do which is changed matches an todonr in the todolist
            if(item.todoNr === list[0]){
                //update the todoDate to the new one
                item.todoDate = list[2];
            }
        });

        //The list is sent to the parent (app.js), for immediate change on the screen
        this.props.updateParentTodoList(updateList);
    }

    //deleteTodo deletes an to-do from the todolist.
    //The function gets an id as parameter and, creates a new temporarily list, and adds each element from the todolist except
    //the element with the given id
    deleteTodo = (id) => {
        const deleteList = [];
        for(let i = 0; i < this.props.todoList.length; i++){
            if(this.props.todoList[i].todoNr !== id){
                deleteList.push(this.props.todoList[i]);
            }
        }
        //Passes the list to the parent component, the same way addTodo does it.
        this.props.updateParentTodoList(deleteList);

        //The item is also removed from the AsyncStorage
        AsyncStorage.removeItem(id.toString());
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    {/*Textinput that automatically gets focused when the user enters the todopage.*/}
                    {/*When text is written, the todoTextstate gets changed*/}
                    <TextInput
                        placeholder="write something here"
                        ref={this.myTextInput}
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({todoText : text})}
                        value={this.state.todoText}
                    />
                    {/*Creates a to-do with the given text written in the textinput, and the current todonr*/}
                    <TouchableOpacity style={styles.toolbarAddBtn} onPress={() => this.addTodo(this.state.currTodoNr)}>
                        <Text style={styles.toolbarAddBtnText}>Add</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                    {/*Scrollview so the user could scroll if the amount of todos become large*/}
                    {/*Maps through the todolist (which is a prop from app.js), and creates a listitem for each to-do*/}
                    {<ScrollView>
                        {this.props.todoList.map((element) =>
                        <ListItem handleFinishedTodo = {this.handleFinishedTodo} updateSortedList = {this.updateSortedList} deleteTodo = {this.deleteTodo} name = {element.todoText} key = {element.key} date = {element.todoDate} todoNr = {element.todoNr}/>
                    )}
                    </ScrollView>}
                </View>
            </View>
        );
    }
};