import React from "react";
import TodoList from "../components/TodoList";
import ListItem from "../components/ListItem";

import ShallowRenderer from "react-test-renderer/shallow";
import renderer from "react-test-renderer";
import Moment from "moment";


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

//Test to check if onChangeValue at TextInput works
test("test onChangeValue at textInput", () => {
    const mockSetState = jest.fn();

    //Creates a shallowRenderer to get the renderoutput of TodoList
    const shallow = new ShallowRenderer();
    shallow.render(<TodoList/>);
    const result = shallow.getRenderOutput();

    //Navigating to find the onChangeText at textinput and triggers it
    result.props.children[0].props.children[0].props.onChangeText(mockSetState("test"));

    //Checks if the onChangeText was triggered one time
    expect(mockSetState).toHaveBeenCalledTimes(1);
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

    //Runs updateTodoList which also triggers sortByDate
    todoComponent.updateTodoList(unsortedListByDate);


    //Creates a sorted list
    const sortedListByDate = [
        {key : 2, todoNr : "todo2", todoText: "test2", todoDate: "2000-12-24"},
        {key : 1, todoNr : "todo1", todoText: "test1", todoDate: "9999-12-24"}
    ];

    //Checks if the state is the sorted list
    expect(todoComponent.state.todoList).toEqual(sortedListByDate);
});

//Test to check if the function handleFinishedTodo works
test("check if handleFinishedTodo", () => {
    //Creates instance of TodoList
    const testTodoListComponent = <TodoList/>;
    const todoComponent = renderer.create(testTodoListComponent).getInstance();

    //Creates a finished todolist
    let finishedList = ["todo1", "test", "2018-12-24", true];

    //Triggers handleFinishedTodo with the finishedList as parameter
    todoComponent.handleFinishedTodo(finishedList);

    //Checks if the state is updated
    expect(todoComponent.state.finishedTodoList).toEqual(finishedList);

});
