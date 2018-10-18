// Test that components mounts as expected

import React from 'react';
import Home from '../Home';
import renderer from 'react-test-renderer';
import MockAsyncStorage from "mock-async-storage";
import { AsyncStorage as storage } from "react-native";



test('Home.js renders correctly?', () => {
    const stepTree = renderer.create(<Home/>);
    expect(stepTree).toMatchSnapshot();
});

//Test to check if the function sortByDate works
test("check if the function sortByDate works", () => {
    //Creates instance of Home
    const testTodoListComponent = <Home/>;
    const homeComponent = renderer.create(testTodoListComponent).getInstance();

    //Creates an unsorted list
    const unsortedListByDate = [
        {key : 1, todoNr : "todo1", todoText: "test1", todoDate: "9999-12-24"},
        {key : 2, todoNr : "todo2", todoText: "test2", todoDate: "2000-12-24"}
    ];

    //Runs sortByDate which also triggers sortByDate
    const sortedList = homeComponent.sortByDate(unsortedListByDate);


    //Creates a sorted list
    const sortedListByDate = [
        {key : 2, todoNr : "todo2", todoText: "test2", todoDate: "2000-12-24"},
        {key : 1, todoNr : "todo1", todoText: "test1", todoDate: "9999-12-24"}
    ];

    //Checks if the state is the sorted list
    expect(sortedList).toEqual(sortedListByDate);
});

test("Functions using AsyncStorage", async () => {
    //Setting up mock Async
    const asyncMock = () => {
        const mockImpl = new MockAsyncStorage();
        jest.mock("AsyncStorage", () => mockImpl);
    };

    //Creates instance of Home
    const testTodoListComponent = <Home/>;
    const homeComponent = renderer.create(testTodoListComponent).getInstance();

    //Creates a testList
    const testTodoList = ["1", "test", "", false];
    const testAsyncList = [testTodoList[1], testTodoList[2], testTodoList[3]];

    //Initialize the mock for AsyncStorage
    asyncMock();

    await storage.setItem("todo"+testTodoList[0].toString(), JSON.stringify(testAsyncList));
    const value = await storage.getItem("todo1");
    const parsedValue = JSON.parse(value);

    const outList = [{
        key: "todo1",
        todoNr: "todo1",
        todoText: parsedValue[0],
        todoDate: parsedValue[1],
        done: parsedValue[2],
    }];

    homeComponent.refresh();

    expect(homeComponent.state.todoList).toEqual(outList);
});
