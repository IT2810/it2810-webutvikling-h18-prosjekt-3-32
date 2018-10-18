// Test that components mounts as expected

import React from 'react';
import HomeListItem from '../HomeListItem';
import renderer from 'react-test-renderer';


test('HomeListItem.js renders correctly?', () => {
    const stepTree = renderer.create(<HomeListItem/>);
    expect(stepTree).toMatchSnapshot();
})
