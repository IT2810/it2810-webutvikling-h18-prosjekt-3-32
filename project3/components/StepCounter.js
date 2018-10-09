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
            // Indicating whether pedometer is available
            isPedometerAvailable: "?",
            stepsToday: 0,
            // Steps since opening the app
            currentStepCount: 0,
            // State below should be updated from AsyncStorage
            goalSteps: 0,
            // Will be updated from API
            averageStepsLastWeek: 500,
            // Will be updated based on whether goal is reached or not
            motivationalMessage: "Just a little more walking and you should reach your goal!",
        }
    }


    componentDidMount() {
        // Starts the API calls and state updating.
        try {
            this._subscribe();
        }
        catch (error) {
            console.log(error);
        }
    }

    // Closes connection to APIs when shutting down the app
    componentWillUnmount() {
        try {
            this._unsubscribe();
        }
        catch (error) {
            console.log(error);
        }

    }


    // Boiler code from React Native docs to save the goal set by user to AsyncStorage
    _storeGoal = async (goal) => {
        // Sets state to ensure the view is updated
        this.setState({
            goalSteps: goal
        })

        // Tries to save goal to persistent storage
        try {
            await AsyncStorage.setItem('goalSteps', goal.toString());

        } catch (error) {
            // Error saving data
            console.log("_storeGoal caused: " + error);
        }

        // Code below updates the motivational message if goal is achieved
        if (goal < this.state.averageStepsLastWeek) {
            this.setState({
                motivationalMessage: "Maybe increase your goal, you sporty athlete?"
            })
        }
        // Sets the motivational message if goal isnt achieved
        else {
            this.setState({
                motivationalMessage: "Just a bit of walking and you will reach your goal!"
            })
        }
    }

    // Boiler code from React Native docs, fetches goal from persistent storage
    _retrieveGoal = async () => {
        try {
            const goal = await AsyncStorage.getItem('goalSteps');
            // checks if user has saved goal before
            if (goal !== null) {
                this.setState({
                    goalSteps: goal
                })
            }
            else {
                this.setState({
                    goalsteps: 12000
                })
            }
        } catch (error) {
            // Error retrieving data, could be first use of app?
            console.log("_retrieveGoal caused: " + error)
            this.setState({
                goalSteps: 12000
            })
        }
    }


    _subscribe = () => {
        // Sets initial state to the value the user has saved in persistent storage
        this._retrieveGoal();

        // Sets up connection Google Fit API or Apple Core API
        this._subscription = Pedometer.watchStepCount(result => {
            initialSteps = this.state.stepsToday;
            this.setState({
                currentStepCount: initialSteps + result.steps
            });
        });

        // Checks if pedometer is available and saves status to state
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

        // Fetches steps for today
        Pedometer.getStepCountAsync(start, end).then(
            result => {
                this.setState({
                    stepsToday: result.steps,
                    currentStepCount: result.steps
                });
            },
            error => {
                this.setState({
                    stepsToday: "Could not get stepCount: " + error
                });
            }
        );

        // The code below defines the timespan between start and end to a week
        start.setDate(start.getDate()-8);
        end.setDate(end.getDate()-1);

        // Fetches steps for the last week
        Pedometer.getStepCountAsync(start, end).then(
            result => {
                this.setState({
                    averageStepsLastWeek: Math.round(result.steps/7),
                });
            },
            error => {
                console.log(error);
                this.setState({
                    averageStepsLastWeek: "0"
                });
            }
        );
    }

    // Disconnects the connection to the APIs
    _unsubscribe = () => {
        this._subscription.remove();
        this._subscription = null;
    };


    render() {
        return (
            <View style={styles.pedometerContainer}>
                <View style={styles.yellowBubble}>
                    <Text style={styles.pedometerText}>
                        Steps today:
                    </Text>

                    <Text style={styles.pedometerNumber}>
                        {this.state.currentStepCount}
                    </Text>
                </View>

                <View style={styles.yellowBubble}>
                    <Text style={styles.pedometerText}>
                        Your daily step goal:
                    </Text>

                    <Text style={styles.pedometerNumber}>
                        {this.state.goalSteps}
                    </Text>

                    <Slider
                        value={parseInt(this.state.goalSteps)} maximumValue={20000} step={500} thumbTintColor={"#4fcfff"}
                        onValueChange={(goalSteps) => this._storeGoal(goalSteps)} />
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
