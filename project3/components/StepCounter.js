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
                    isPedometerAvailable: "Pedometer seems unavaiable, error: " + error
                });
            }
        );

        const end = new Date();
        const start = new Date();
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
                    Du har gått {this.state.steps_last24hours} steg de siste 24 timer.
                </Text>
            </View>
    );
  }
};
