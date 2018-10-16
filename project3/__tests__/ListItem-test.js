import React from "react";
import TodoList from "../components/TodoList";
import ListItem from "../components/ListItem";

import ShallowRenderer from "react-test-renderer/shallow";
import renderer from "react-test-renderer";
import Moment from "moment";

//Snapshot testing of ListItem.js
test("ListItem renders correctly!", () => {
    const tree = renderer.create(<ListItem/>).toJSON();
    expect(tree).toMatchSnapshot();
});