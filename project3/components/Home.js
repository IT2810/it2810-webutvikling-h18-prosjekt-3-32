import React from 'react';
import { StyleSheet, Text, View, List } from 'react-native';
import styles from "../stylesheets/Home.style.js";
import ListItem from "./ListItem.js";

export default class Home extends React.Component {
    constructor(props) {
      super(props);
      // Don't call this.setState() here!
      this.state = {
        eventsList: [
          {
            text: 'HMS-kurs',
            date: '2018-10-02'
          },
          {
            text: 'Bedpress',
            date: '2018-10-04'
          }
        ],
        todoList: ['Søke sommerjobb', 'Fikse prosjekt3', 'Flæææ'],
        };
    }

    render() {
        return (
            <View style={styles.homeContainer}>
                <View style={styles.nextEventsInfoBox}>
                  <Text style={styles.nextEventsInfoText}>{"Upcoming events"}</Text>
                </View>
                {
                  this.state.eventsList.map((item) => (
                    <ListItem text={item.text} date={item.date} key={item.text}/>
                  ))
                }
                <View style={styles.nextEventsInfoBox}>
                  <Text style={styles.nextEventsInfoText}>{"To do"}</Text>
                </View>
                {
                  this.state.todoList.map((item) => (
                    <ListItem text={item} key={item}/>
                  ))
                }
            </View>
        );
    }
};
