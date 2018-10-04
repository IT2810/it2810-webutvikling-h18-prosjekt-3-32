import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import styles from "../stylesheets/ListItem.style.js";

export default class ListItem extends React.Component {

    onLongPressButton() {
        alert('dsadsadssad!')
    };

    render() {
        return (
            <TouchableOpacity style={styles.todoItem} onPress={() => this.onLongPressButton()}/>
        );
    }
};
