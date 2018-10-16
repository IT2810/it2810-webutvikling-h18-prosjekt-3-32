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
    const testTodoListComponent = <TodoList/>;
    const todoComponent = renderer.create(testTodoListComponent).getInstance();
    todoComponent.setState({todoText: "test"});
    todoComponent.addTodo(1);

    const testList = [{
        key: 1,
        todoNr: "todo1",
        todoText: "test",
        todoDate: "",
        done: false,
    }];

    expect(todoComponent.state.todoList).toEqual(testList);
});

test("testing deleteTodo in Todolist", () => {
    const testTodoListComponent = <TodoList/>;
    const todoComponent = renderer.create(testTodoListComponent).getInstance();
    const testList = [{
        key: 1,
        todoNr: "todo1",
        todoText: "test",
        todoDate: "",
        done: false,
    }];
    todoComponent.setState({todoList:testList});
    todoComponent.deleteTodo("todo1");

    const emptyList = [];

    expect(todoComponent.state.todoList).toEqual(emptyList);
});

test("check update Todo with date", () =>{
    const testTodoListComponent = <TodoList/>;
    const todoComponent = renderer.create(testTodoListComponent).getInstance();

    todoComponent.setState({todoText: "test"});
    todoComponent.addTodo(1);

    const testListWithDate = ["todo1", "test", "2018-12-24"];

    todoComponent.updateSortedList(testListWithDate);

    const testList = [{
        key: 1,
        todoNr: "todo1",
        todoText: "test",
        todoDate: "2018-12-24",
        done: false,
    }];

    expect(todoComponent.state.todoList).toEqual(testList);
});