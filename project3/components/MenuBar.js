import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ListItem from "./ListItem.js";
import styles from "../stylesheets/MenuBar.style.js";
import MenuItem from "./MenuItem.js";
import HomeIcon from "../assets/home.svg";

export default class MenuBar extends React.Component {
    render() {
        return (
            <View style={styles.menuBar}>
                <MenuItem source={require('../assets/home.png')}/>
                <MenuItem source={require('../assets/list.png')}/>
                <MenuItem source={require('../assets/home.png')}/>
                <MenuItem source={require('../assets/home.png')}/>
                <MenuItem source={require('../assets/home.png')}/>
            </View>
        );
    }
};
