import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import styles from "../stylesheets/MenuItem.style.js";
import ListItem from "./ListItem.js";

export default class MenuItem extends React.Component {
    render() {
        return (
            <TouchableOpacity style={styles.menuItem} onPress={()=>{alert("you clicked me")}}>
              <Image style={styles.menuItemButton} source={this.props.source}/>

            </TouchableOpacity>
        );
    }
};
