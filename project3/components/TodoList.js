import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import ListItem from "./ListItem.js";
import styles from "../stylesheets/TodoList.style.js";

export default class TodoList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            todos: [],
        }
    }

    addTodo(){

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.toolbar}>
                    <TouchableOpacity style={styles.toolbarBtn} title="+sssss" onPress={() => this.addTodo()}/>
                </View>

            </View>
        );
    }
};