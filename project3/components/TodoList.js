import React from 'react';
import { ScrollView, TextInput, TouchableOpacity, Text, View } from 'react-native';
import ListItem from "./ListItem.js";
import styles from "../stylesheets/TodoList.style.js";
import { AsyncStorage } from "react-native"

export default class TodoList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            todos: [],
            currTodoNr: 1,
            todoText: "",
        };

        this.addTodo = this.addTodo.bind(this);
        this.deleteTodo = this.deleteTodo.bind(this);
        this.myTextInput = React.createRef();
    }

    addTodo = (id) => {
        this.myTextInput.current.clear();
        if(this.state.todoText !== ""){
            const addList = this.state.todos.slice();
            addList.push({
                key: id,
                todoNr: id,
                name: "[" + id + "] - " + this.state.todoText,
            });
            this.setState({
                todos: addList,
                currTodoNr: this.state.currTodoNr + 1,
                todoText : "",
            });
        }
        else{alert("Todoen må ha en beskrivelse!");}
    };

    deleteTodo = (id) => {
        const deleteList = [];
        for(let i = 0; i < this.state.todos.length; i++){
            if(this.state.todos[i].todoNr !== id){
                deleteList.push(this.state.todos[i]);
            }
        }
        this.setState({
            todos: deleteList,
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <TextInput
                        autoFocus={true}
                        ref={this.myTextInput}
                        style={styles.textInput}
                        onChangeText={(text) => this.setState({todoText : text})}
                        value={this.state.todoText}
                    />
                    <TouchableOpacity style={styles.toolbarAddBtn} onPress={() => this.addTodo(this.state.currTodoNr)}>
                        <Text style={styles.toolbarAddBtnText}>Add</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1}}>
                    <ScrollView>
                    {this.state.todos.map((element) =>
                        <ListItem deleteTodo = {this.deleteTodo} name = {element.name} key = {element.key} todoNr = {element.todoNr}/>
                    )}
                    </ScrollView>
                </View>
            </View>
        );
    }
};