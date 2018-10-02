import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import styles from "../stylesheets/ListItem.style.js";

export default class ListItem extends React.Component {
    constructor(props){
        super(props);
    }

    onLongPressButton() {

    };

    deleteTodo(item){
        this.props.deleteTodo(item);
    };

    render() {
        return (
            <TouchableOpacity style={styles.todoItem} onPress={() => this.onLongPressButton()}>
                <Text style={styles.itemText}>{this.props.name}</Text>
                <TouchableOpacity style={styles.deleteTodo} onPress={() => this.deleteTodo(this.props.todoNr)}>
                    <Text style={styles.deleteText}>Delete</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }
};