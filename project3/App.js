import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from "./stylesheets/App.style.js";
import TabNavigator from "./components/TabNavigator";
import { AsyncStorage } from "react-native"

export default class App extends React.Component {
    render() {
        return (
            <React.Fragment>
              <View style={styles.topBar}/>
              <TabNavigator/>
            </React.Fragment>
        );
    }
};
