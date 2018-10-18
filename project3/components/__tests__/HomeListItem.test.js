// Test that components mounts as expected

import React from 'react';
import HomeListItemCalendar from '../HomeListItemCalendar';
import HomeListItemTodo from '../HomeListItemTodo';
import renderer from 'react-test-renderer';


test('HomeListItemCalendar.js renders correctly?', () => {
    const stepTree = renderer.create(<HomeListItemCalendar/>);
    expect(stepTree).toMatchSnapshot();
})

test('HomeListItemTodo.js renders correctly?', () => {
    const stepTree = renderer.create(<HomeListItemTodo/>);
    expect(stepTree).toMatchSnapshot();
})
