import React from 'react';
import { StyleSheet, Text, View, List } from 'react-native';
import styles from "../stylesheets/Home.style.js";
import HomeListItem from "./HomeListItem.js";

export default class Home extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        eventsList: [
          {
            text: 'HMS-kurs',
            date: '2018-10-02'
          },
          {
            text: 'Bedpress med gutta as. Det blir fette najs. Kjørrr',
            date: '2018-10-04'
          }
        ],
        todoList: ['Bake pepperkaker', 'Fikse prosjekt3', 'Flæææ'],
        dailySteps: 100,
      };
    }

    render() {
        return (
          <View style={styles.homeContainer}>
            <View style={styles.calendarTodoContainer}>
                <View style={styles.nextEventsInfoBox}>
                  <Text style={styles.nextEventsInfoText}>{"Upcoming events"}</Text>
                </View>
                {
                  this.state.eventsList.map((item) => (
                    <HomeListItem text={item.text} date={item.date} key={item.text}/>
                  ))
                }
                <View style={styles.nextEventsInfoBox}>
                  <Text style={styles.nextEventsInfoText}>{"To do"}</Text>
                </View>
                {
                  this.state.todoList.map((item) => (
                    <HomeListItem text={item} key={item}/>
                  ))
                }
            </View>

            <View style={styles.showSteps}>
              <Text>{"Number of steps today: " + this.state.dailySteps}</Text>
            </View>
          </View>

        );
    }
};
