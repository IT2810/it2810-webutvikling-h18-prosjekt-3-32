import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TodoList from "./components/TodoList.js";
import styles from "./stylesheets/App.style.js";
import MenuBar from "./components/MenuBar.js";
import StepCounter from "./components/StepCounter.js";

export default class App extends React.Component {
  render() {
    return (
        <React.Fragment>
          <View style={styles.topBar}/>
          <View style={styles.header}>
            <Text style={styles.headerText}>[insert tittel]</Text>
          </View>
          <View style={styles.container}>
            <StepCounter/>
          </View>
          <MenuBar/>
        </React.Fragment>
    );
  }
};
