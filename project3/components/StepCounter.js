// boiler code from Expo docs: https://docs.expo.io/versions/latest/sdk/pedometer

import Expo from 'expo';
import React from 'react';
import { Pedometer } from 'expo';
import { Text, View } from 'react-native';


export default class StepCounter extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            isPedometerAvailable: "?",
            steps_last24hours: 0,
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
            this.setState({
                currentStepCount: result.steps
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
                    isPedometerAvailable: "Could not get isPedometerAvailable: " + error
                });
            }
        );

        const end = new Date();
        const start = end;
        start.setDate(end.getDate() - 1);

        Pedometer.getStepCountAsync(start, end).then(
            result => {
                this.setState({ steps_last24hours: result.steps });
            },
            error => {
                this.setState({
                    steps_last24hours: "Could not get stepCount: " + error
                });
            }
        );
    };

    _unsubscribe = () => {
        this._subscription && this._subscription.remove();
        this._subscription = null;
    };


    render() {
        return (
            <View>
                <Text>
                    Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}
                </Text>

                <Text>
                    You have walked {this.state.steps_last24hours} steps in the last 24 hours.
                </Text>
            </View>
    );
  }
};
