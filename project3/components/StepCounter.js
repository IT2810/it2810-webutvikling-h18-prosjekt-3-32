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
import { Text, View, AsyncStorage } from 'react-native';
import { Slider } from 'react-native-elements';
import styles from '../stylesheets/StepCounter.style.js';


export default class StepCounter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isPedometerAvailable: "?",
            steps_last24hours: -1,
            currentStepCount: -1,
            // State below should be fetched from AsyncStorage
            goalSteps: 10000,
            motivationalMessage: "Please install Google Fit ;)",
            averageStepsLastWeek: -1,
        }
    }

    componentDidMount() {
        try {
            this._subscribe();
        }
        catch (error) {
            console.log(error);
        }
    }

    componentWillUnmount() {
        try {
            this._unsubscribe();
        }
        catch (error) {
            console.log(error);
        }

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

        // Set start hours to midnight
        let start = new Date();
        start.setHours(0);
        start.setMinutes(0);
        start.setSeconds(0);

        // Set end hours to midnight
        let end = new Date();
        end.setHours(23);
        end.setMinutes(59);
        end.setSeconds(59);

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

        start.setDate(start.getDate()-8);
        end.setDate(end.getDate()-1);

        Pedometer.getStepCountAsync(start, end).then(
            result => {
                this.setState({
                    averageStepsLastWeek: Math.round(result.steps/7),
                });
            },
            error => {
                this.setState({
                    averageStepsLastWeek: "Could not get stepCount for last week: " + error
                });
            }
        );

        // The code below should be chained in a then promise after new goal is set
        if (this.state.averageStepsLastWeek > this.state.goalSteps) {
            this.setState({
                motivationalMessage: "Great work fam!"
            })
        } else {
            this.setState({
                motivationalMessage: "Maybe walk some more?"
            })
        }
    }

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

                <View style={styles.yellowBubble}>
                    <Text style={styles.pedometerText}>
                        Your goal for steps per 24 hours:
                    </Text>

                    <Text style={styles.pedometerNumber}>
                        {this.state.goalSteps}
                    </Text>

                    <Slider
                        value={this.state.goalSteps} maximumValue={20000} step={500} thumbTintColor={"#4fcfff"}
                        onValueChange={(goalSteps) => this.setState({goalSteps: goalSteps})} />
                </View>

                <View style={styles.yellowBubble}>
                    <Text style={styles.pedometerText}>
                        Average daily steps last week:
                    </Text>

                    <Text style={styles.pedometerNumber}>
                        {this.state.averageStepsLastWeek}
                    </Text>

                    <Text style={styles.pedometerNumber}>
                        {this.state.motivationalMessage}
                    </Text>
                </View>
            </View>
    );
  }
};
