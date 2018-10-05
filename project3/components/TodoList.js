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
        this.deleteTodo = this.deleteTodo.bind(this);
        this.myTextInput = React.createRef();
    };

    componentDidMount(){
        this.getCurrentTodo();
    }

    sortByDate(todoList){
        todoList.sort(function compare(a, b) {
            let dateA = new Date(a.date);
            let dateB = new Date(b.date);
            return dateA - dateB;
        });
    }

    getCurrentTodo(){
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
    //Each element in addTodo gets a key, todoNr and a name.
    addTodo = (id) => {
        this.myTextInput.current.clear();
        if(this.state.todoText !== ""){
            const addList = this.props.todoList.slice();
            addList.push({
                key: id,
                todoNr: id,
                todoText: this.state.todoText,
            });
            this.setState({
                currTodoNr: this.state.currTodoNr + 1,
                todoText : "",
            });
            this.props.updateParentTodoList(addList);
            addList.map((item) => {
                this.props.storeTodo(item.todoNr.toString(), item.todoText.toString());
                this.props.storeTodo("CurrentTodoNr", item.todoNr.toString());
            });
        }
        else{alert("Todoen må ha en beskrivelse!");}
    };

    //deleteTodo deletes an to-do from the todolist.
    //The function gets an id as parameter and, creates a new temporarily list, and adds each element from the todolist except
    //the element with the given id
    //At the end, it passes the list to the parent component, the same way addTodo does it.
    deleteTodo = (id) => {
        const deleteList = [];
        for(let i = 0; i < this.props.todoList.length; i++){
            if(this.props.todoList[i].todoNr !== id){
                deleteList.push(this.props.todoList[i]);
            }
        }
        this.props.updateParentTodoList(deleteList);
        AsyncStorage.removeItem(id.toString());
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    {/*Textinput that automatically gets focused when the user enters the todopage.*/}
                    {/*When text is written, the todoTextstate gets changed*/}
                    <TextInput
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
                        <ListItem deleteTodo = {this.deleteTodo} name = {element.todoText} key = {element.key} todoNr = {element.todoNr}/>
                    )}
                    </ScrollView>}
                </View>
            </View>
        );
    }
};