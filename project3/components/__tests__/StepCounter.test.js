/*
Test that components mounts as expected
Also testing that it is possible to set a new goal 
using the _storeGoal method.
*/

// Imports necessary libraries
import React from 'react';
import StepCounter from '../StepCounter';
import renderer from 'react-test-renderer';

// Tries to render new StepCounter component
test('StepCounter.js renders correctly?', () => {
    const stepTree = renderer.create(<StepCounter/>);
    expect(stepTree).toMatchSnapshot();
});

// Tries to set a new goal and compares with expected state
test("new goal appears in app", () => {
    const testStepCounterComponent = <StepCounter/>;
    const stepCounterComponent = renderer.create(testStepCounterComponent).getInstance();
    stepCounterComponent.setState({
        // Sets random goalSteps
        goalSteps: 1234
    });

    // Sets mock state
    const testList = [{
        isPedometerAvailable: "?",
        stepsToday: 0,
        // Steps since opening the app
        currentStepCount: 0,
        // State below should be updated from AsyncStorage
        goalSteps: 15000,
        // Will be updated from API
        averageStepsLastWeek: 500,
        // Will be updated based on whether goal is reached or not
        motivationalMessage: "Just a bit of walking and you will reach your goal!"
    }];

    stepCounterComponent._storeGoal(15000);

    expect(stepCounterComponent.state.goalSteps).toEqual(testList[0].goalSteps);
});