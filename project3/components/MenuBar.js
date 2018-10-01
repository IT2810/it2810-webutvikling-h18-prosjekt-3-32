import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListItem from "./ListItem.js";
import styles from "../stylesheets/MenuBar.style.js";

export default class MenuBar extends React.Component {
    render() {
        return (
            <View style={styles.menuBar}>
                <Text>legg til menyer her</Text>
            </View>
        );
    }
};