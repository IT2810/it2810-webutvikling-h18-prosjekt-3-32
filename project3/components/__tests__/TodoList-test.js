import React from "react";
import TodoList from "../TodoList";

import ShallowRenderer from "react-test-renderer/shallow";
import renderer from "react-test-renderer";
import MockAsyncStorage from "mock-async-storage";

import { AsyncStorage as storage } from "react-native";

//Snapshot testing of TodoList.js
test("TodoList renders correctly!", () => {
   const tree = renderer.create(<TodoList/>).toJSON();
   expect(tree).toMatchSnapshot();
});

//Test to check if the function addTodo works
test("testing addTodo in TodoList", () => {
    //Creates instance of TodoList
    const testTodoListComponent = <TodoList/>;
    const todoComponent = renderer.create(testTodoListComponent).getInstance();

    //Setting state and triggers addTodo with todonr: 1
    todoComponent.setState({todoText: "test"});
    todoComponent.addTodo(1);

    //Testlist to test state.todoList upon
    const testList = [{
        key: 1,
        todoNr: "todo1",
        todoText: "test",
        todoDate: "",
        done: false,
    }];

    //If addTodo did add the to-do, the todolist will be equal to testList
    expect(todoComponent.state.todoList).toEqual(testList);
});

//Test to check if the function deleteTodo works
test("testing deleteTodo in Todolist", () => {
    //Creates instance of TodoList
    const testTodoListComponent = <TodoList/>;
    const todoComponent = renderer.create(testTodoListComponent).getInstance();

    //Setting state.todoList to be only this testList
    const testList = [{
        key: 1,
        todoNr: "todo1",
        todoText: "test",
        todoDate: "",
        done: false,
    }];
    todoComponent.setState({todoList:testList});

    //Triggers deleTodo
    todoComponent.deleteTodo("todo1");

    const emptyList = [];

    //Checks is the testList is gone and todoList is empty
    expect(todoComponent.state.todoList).toEqual(emptyList);
});

//Test to check if the function updateSortedList works
test("check update Todo with date", () =>{
    //Creates instance of TodoList
    const testTodoListComponent = <TodoList/>;
    const todoComponent = renderer.create(testTodoListComponent).getInstance();

    todoComponent.setState({todoText: "test"});
    todoComponent.addTodo(1);

    //Checking with a list with date
    const testListWithDate = ["todo1", "test", "2018-12-24"];

    //Updating the todolist with the function updateSortedList
    todoComponent.updateSortedList(testListWithDate);

    const testList = [{
        key: 1,
        todoNr: "todo1",
        todoText: "test",
        todoDate: "2018-12-24",
        done: false,
    }];

    //Checks whether the date was added
    expect(todoComponent.state.todoList).toEqual(testList);
});

//Test to check if the function sortByDate works
test("check if the function sortByDate works", () => {
    //Creates instance of TodoList
    const testTodoListComponent = <TodoList/>;
    const todoComponent = renderer.create(testTodoListComponent).getInstance();

    //Creates an unsorted list
    const unsortedListByDate = [
        {key : 1, todoNr : "todo1", todoText: "test1", todoDate: "9999-12-24"},
        {key : 2, todoNr : "todo2", todoText: "test2", todoDate: "2000-12-24"}
    ];

    //Runs sortByDate which also triggers sortByDate
    const sortedList = todoComponent.sortByDate(unsortedListByDate);


    //Creates a sorted list
    const sortedListByDate = [
        {key : 2, todoNr : "todo2", todoText: "test2", todoDate: "2000-12-24"},
        {key : 1, todoNr : "todo1", todoText: "test1", todoDate: "9999-12-24"}
    ];

    //Checks if the state is the sorted list
    expect(sortedList).toEqual(sortedListByDate);
});

//Test to check if the function handleFinishedTodo works
test("check if handleFinishedTodo works", async () => {
    //Creates instance of TodoList
    const testTodoListComponent = <TodoList/>;
    const todoComponent = renderer.create(testTodoListComponent).getInstance();

    //Creates a finished todolist
    let finishedList = [{
        key:1,
        todoNr:"todo1",
        todoText:"test",
        todoDate:"2018-12-24",
        done:true
    }];

    //Triggers handleFinishedTodo with the finishedList as parameter
    await todoComponent.handleFinishedTodo(finishedList);

    //Checks if the state is updated
    expect(todoComponent.state.finishedTodoList).toEqual(finishedList);

});

test("check if handleShowFinishedTodos works", () => {
    //Creates instance of TodoList
    const testTodoListComponent = <TodoList/>;
    const todoComponent = renderer.create(testTodoListComponent).getInstance();

    //Creates a finished todolist
    let finishedList = [{
        key:1,
        todoNr:"todo1",
        todoText:"test",
        todoDate:"2018-12-24",
        done:true
    }];

    //Setting the state to be true for the first expect
    todoComponent.setState({showFinishedTodos:false, finishedTodoList:finishedList});

    //Triggers handleShowFinishedTodos which will enter the if-statement
    todoComponent.handleShowFinishedTodos();

    //Checks if the state for finishedTodoList is updated
    expect(todoComponent.state.showList).toEqual(finishedList);

    //Creates an unfinished todolist
    let unfinishedList = [{
        key:1,
        todoNr:"todo1",
        todoText:"test",
        todoDate:"2018-12-24",
        done:false
    }];

    //Setting the state to be false for the second expect
    todoComponent.setState({showFinishedTodos:true, todoList:unfinishedList});

    //Triggers handleShowFinishedTodos which will enter the else-statement
    todoComponent.handleShowFinishedTodos();

    //Checks if the state todoList is updated
    expect(todoComponent.state.showList).toEqual(unfinishedList);
});

//---Testing functions in Render() (onPress, onChangeText..)---//

//Test to check if onChangeValue at TextInput works
test("test onChangeText at textInput", () => {
    const mockOnChangeValue = jest.fn();

    //Creates a shallowRenderer to get the renderoutput of TodoList
    const shallow = new ShallowRenderer();
    shallow.render(<TodoList/>);
    const result = shallow.getRenderOutput();

    //Navigating to find the onChangeText at textinput and triggers it
    result.props.children[0].props.children[0].props.onChangeText(mockOnChangeValue("test"));

    //Checks if the onChangeText was triggered one time
    expect(mockOnChangeValue).toHaveBeenCalledTimes(1);
});

//Test to check if onPress at Button works
test("test onPress at Button", () => {
    const mockOnPress = jest.fn();

    //Creates a shallowRenderer to get the renderoutput of TodoList
    const shallow = new ShallowRenderer();
    shallow.render(<TodoList/>);
    const result = shallow.getRenderOutput();

    //Navigating to find the onPress at Button and triggers it
    result.props.children[1].props.children.props.onPress(mockOnPress(true));

    //Checks if the onChangeText was triggered one time
    expect(mockOnPress).toHaveBeenCalledTimes(1);
});

//---Testing AsyncStorage---//

test("Functions using AsyncStorage", async () => {
    //Setting up mock Async
    const asyncMock = () => {
        const mockImpl = new MockAsyncStorage();
        jest.mock("AsyncStorage", () => mockImpl);
    };

    //Creates instance of TodoList
    const testTodoListComponent = <TodoList/>;
    const todoComponent = renderer.create(testTodoListComponent).getInstance();

    //Creates a testList
    const testList = ["todo1", "test", "", false];

    //Initialize the mock for AsyncStorage
    asyncMock();

    //--Testing StoreTodo in TodoList (Storing in AsyncStorage)--//
    const testAsyncList = [testList[1], testList[2], testList[3]];

    //Triggers storeTodo in TodoList
    await todoComponent.storeTodo(testList[0].toString(), JSON.stringify(testAsyncList));
    const value = await storage.getItem(testList[0].toString());
    const parsedValue = JSON.parse(value);

    expect(parsedValue).toEqual(testAsyncList);

    //--Testing removeTodo in TodoList (Removing item in AsyncStorage)--//

    //Triggers removeTodo in TodoList, which will remove the item in the mockAsyncStorage
    await todoComponent.removeTodo(testList[0].toString());
    const value1 = await storage.getItem(testList[0].toString());

    //Will be undefined since there isn't anything there.
    expect(value1).toBeUndefined();
});