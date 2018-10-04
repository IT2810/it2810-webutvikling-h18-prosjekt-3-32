/*
Solutions is based on Pedometer API from Expo

Apple iPhone:
Data is fetched from Apple APIs and should be available instantly

Android:
Data is fetched from Google Fit APIs and requires the Google Fit app
and a successful OAuth verification to your Google account.

Boiler code from Expo docs: https://docs.expo.io/versions/latest/sdk/pedometer
*/

import Expo from 'expo';
import React from 'react';
import { Pedometer } from 'expo';
import { Text, View } from 'react-native';
import styles from "../stylesheets/StepCounter.style.js";


export default class StepCounter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isPedometerAvailable: "?",
            steps_last24hours: -1,
            currentStepCount: -1
        }
    }

    componentDidMount() {
        this._subscribe();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    _subscribe = () => {
        this._subscription = Pedometer.watchStepCount(result => {
            initialSteps = this.state.steps_last24hours;
            this.setState({
                currentStepCount: initialSteps + result.steps
            });
        });

        Pedometer.isAvailableAsync().then(
            result => {
                this.setState({
                    isPedometerAvailable: String(result)
                });
            },
            error => {
                this.setState({
                    isPedometerAvailable: "Pedometer seems unavaiable, error: " + error
                });
            }
        );

        const end = new Date();
        const start = new Date();
        start.setDate(end.getDate() - 1);

        Pedometer.getStepCountAsync(start, end).then(
            result => {
                this.setState({
                    steps_last24hours: result.steps,
                    currentStepCount: result.steps
                });
            },
            error => {
                this.setState({
                    steps_last24hours: "Could not get stepCount: " + error
                });
            }
        );
    };

    _unsubscribe = () => {
        this._subscription.remove();
        this._subscription = null;
    };


    render() {
        return (
            <View style={styles.pedometerContainer}>
                <View style={styles.yellowBubble}>
                    <Text style={styles.pedometerText}>
                        Number of steps last 24 hours:
                    </Text>

                    <Text style={styles.pedometerNumber}>
                        {this.state.currentStepCount}
                    </Text>
                </View>
            </View>
    );
  }
};
