import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import styles from "../stylesheets/HomeListItem.style.js";

export default class HomeListItem extends React.Component {

    onLongPressButton() {
        alert('dsadsadssad!')
    };

    render() {
        return (
            <TouchableOpacity style={styles.todoItem} onPress={() => this.onLongPressButton()}>
              <Text style={styles.todoItemText}>{this.props.text}</Text>
              <Text style={styles.todoItemDate}>{this.props.date}</Text>
            </TouchableOpacity>
        );
    }
};
