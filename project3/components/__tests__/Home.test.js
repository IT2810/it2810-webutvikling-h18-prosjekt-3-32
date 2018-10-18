// Test that components mounts as expected

import React from 'react';
import Home from '../Home';
import renderer from 'react-test-renderer';


test('Home.js renders correctly?', () => {
    const stepTree = renderer.create(<Home/>);
    expect(stepTree).toMatchSnapshot();
})
