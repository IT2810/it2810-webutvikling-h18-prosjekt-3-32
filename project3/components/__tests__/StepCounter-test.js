/*
Test that components mounts as expected
Also testing that it is possible to set a new goal 
using the _storeGoal method.
*/

// Imports necessary libraries
import React from 'react';
import StepCounter from '../StepCounter';
import renderer from 'react-test-renderer';
import MockAsyncStorage from 'mock-async-storage';
import { AsyncStorage as storage } from 'react-native';

// Tries to render new StepCounter component
test('StepCounter.js renders correctly?', () => {
    const stepTree = renderer.create(<StepCounter/>);
    expect(stepTree).toMatchSnapshot();
});

// Tries to set a new goal and compares with expected state
test("new goal appears in app", () => {
    const testStepCounterComponent = <StepCounter/>;
    const stepCounterComponent = renderer.create(testStepCounterComponent).getInstance();

    // Sets random goalSteps
    stepCounterComponent.setState({
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
    expect(stepCounterComponent.state.goalSteps)

});


test('_retrieveGoal fetches goal from ASyncStorage and updates state', async () => {

    // Renders test StepCounter component
    const testStepCounterComponent = <StepCounter/>;
    const stepCounterComponent = renderer.create(testStepCounterComponent).getInstance();

    // Sets up mock ASyncStorage
    const mock = () => {
        const mockImpl = new MockAsyncStorage()
        jest.mock('AsyncStorage', () => mockImpl)
    }

    // Initializes mock ASyncStorage
    mock();

    // Pushing the value we want to appear in the last test to mock ASyncStorage
    await storage.setItem(
        'goalSteps', 19500
    );

    // Sets random goalSteps state that needs to be changed
    stepCounterComponent.setState({
        goalSteps: 420
    })

    // Calls the _retrieveGoal method which should set state to 19500
    await stepCounterComponent._retrieveGoal();

    // Checking that state has successfully been set to 19500
    expect(stepCounterComponent.state.goalSteps).toBe(19500);

});


test('whether motivationalMessage updates after setting new goal', async () => {

    // Renders test StepCounter component
    const testStepCounterComponent = <StepCounter/>;
    const stepCounterComponent = renderer.create(testStepCounterComponent).getInstance();

    // Sets random goalSteps state that needs to be changed
    stepCounterComponent.setState({
        goalSteps: 0,
        averageStepsLastWeek: 500
    });

    // If this.state.averageStepsLastWeek < goal:
    // "Just a bit of walking and you will reach your goal!"
    expect(stepCounterComponent.state.motivationalMessage).toBe(
        "Just a little more walking and you should reach your goal!"
    );

    // Sets random goalSteps state that needs to be changed
    stepCounterComponent.setState({
        goalSteps: 1000,
        averageStepsLastWeek: 1500
    });

    await stepCounterComponent._storeGoal(stepCounterComponent.state.goalSteps);

    // If goal > this.state.averageStepsLastWeek:
    // "Maybe increase your goal, you sporty athlete?"
    expect(stepCounterComponent.state.motivationalMessage).toBe(
        "Maybe increase your goal, you sporty athlete?"
    );
});