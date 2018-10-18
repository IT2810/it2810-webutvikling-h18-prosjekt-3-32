import React from "react";
import ListItem from "../components/ListItem";
import ShallowRenderer from "react-test-renderer/shallow";
import renderer from "react-test-renderer";

//Test to check if the function dueDate works
test("check duedate to be true in ListItem", () =>{
    //Creates a testDate that have been
    const testDate = "2000-01-01";

    //Creates instance of ListItem
    const testListItemComponent = <ListItem date = {testDate}/>;
    const listComponent = renderer.create(testListItemComponent).getInstance();

    //Triggers the function checkDueDate
    listComponent.checkDueDate();

    //Since the function have been, the expect state.dueDate to be true
    expect(listComponent.state.dueDate).toBeTruthy();
});

//Test to check if the function dueDate works
test("check duedate to be false in ListItem", () =>{
    //Creates a testDate that haven't been
    const testDate = "9999-01-01";

    //Creates instance of ListItem
    const testListItemComponent = <ListItem date = {testDate}/>;
    const listComponent = renderer.create(testListItemComponent).getInstance();

    //Triggers the function checkDueDate
    listComponent.checkDueDate();

    //Since the function have been, the expect state.dueDate to be true
    expect(listComponent.state.dueDate).toBeFalsy();
});

//Test to check if the function handlePressedCheckbox works
test("check if the checkbox has been pressed", () =>{
    //Creates instance of ListItem
    const testListItemComponent = <ListItem done = {false}/>;
    const listComponent = renderer.create(testListItemComponent).getInstance();

    //Triggers the function handlePressedCheckbox
    listComponent.handlePressedCheckbox();

    //Since the function will set the state:done to be true, this is checked
    expect(listComponent.state.done).toBeTruthy();
});

//Test to check if the function handleChangedDate works
test("check if the date has been changed", () =>{
    //Creates a testDate
    const testDate = "2424-12-24";

    //Creates instance of ListItem
    const testListItemComponent = <ListItem/>;
    const listComponent = renderer.create(testListItemComponent).getInstance();

    //Triggers handleChangedDate with the testDate as parameter
    listComponent.handleChangedDate(testDate);

    //Expecting the state.date to be equal to the testdate
    expect(listComponent.state.date).toEqual(testDate);
});

//Test to check if the function setModalVisible works
test("check if the modal has been set to visible", () =>{
    //Creates instance of ListItem
    const testListItemComponent = <ListItem/>;
    const listComponent = renderer.create(testListItemComponent).getInstance();

    //Triggers setModalVisible with true as parameter
    listComponent.setModalVisible(true);

    //Expecting state.ModalVisible to be true
    expect(listComponent.state.modalVisible).toEqual(true);
});

//Test to check if the function deleteTodo works
test("check if handleFinishedTodo triggers if ...state.done is true", () => {
    //Creates a mockDeleteTodo function
    let mockDeleteTodo = jest.fn();
    let mockOnPress = jest.fn();

    //Creates instance if ListItem with the mockfunction and done=true as props
    const testListItemComponent = <ListItem deleteTodo = {mockDeleteTodo} done = {true} />;
    const listComponent = renderer.create(testListItemComponent).getInstance();

    //Triggers deleteTodo (with 1 as parameter, because the function needs a parameter)
    listComponent.deleteTodo(mockOnPress(1));

    //Expecting the mockOnPress to have been called one time
    expect(mockOnPress).toHaveBeenCalledTimes(1);
});

//---Testing functions in Render() (onPress, onChangeText..)---//

//Test to check if onPress at TouchableOpacity(1) works
test("test onPress at TouchableOpacity(1)", () => {
    const mockOnPress = jest.fn();

    //Creates a shallowRenderer to get the renderoutput of ListItem
    const shallow = new ShallowRenderer();
    shallow.render(<ListItem/>);
    const result = shallow.getRenderOutput();

    //Navigating to find the onPress at TouchableOpacity and triggers it
    result.props.children[0].props.onPress(mockOnPress(true));

    //Expecting the mockfunction to have been called one time
    expect(mockOnPress).toHaveBeenCalledTimes(1);
});

//Test to check if onIconPress as Checkbox works
test("test onIconPress at Checkbox", () => {
    const mockOnPress = jest.fn(x => "test");

    //Creates a shallowRenderer to get the renderoutput of ListItem
    const shallow = new ShallowRenderer();
    shallow.render(<ListItem/>);
    const result = shallow.getRenderOutput();

    //Navigating to find the onIconPress at Checkbox and triggers it
    result.props.children[0].props.children[0].props.onIconPress(mockOnPress(true));

    //Expecting the mockfunction to have been called one time
    expect(mockOnPress).toHaveBeenCalledTimes(1);
});

//Test to check if onPress at TouchableOpacity(2) works
test("test onPress at TouchableOpacity(2)", () => {
    const mockOnPress = jest.fn();

    //Creates a shallowRenderer to get the renderoutput of ListItem
    const shallow = new ShallowRenderer();
    shallow.render(<ListItem/>);
    const result = shallow.getRenderOutput();

    //Navigating to find the onPress at TouchableOpacity and triggers it
    result.props.children[0].props.children[2].props.onPress(mockOnPress(true));

    //Expecting the mockfunction to have been called one time
    expect(mockOnPress).toHaveBeenCalledTimes(1);
});

//Test to check if onRequestClose at Modal works
test("test onRequestClose at Modal", () => {
    const mockOnRequest = jest.fn();

    //Creates a shallowRenderer to get the renderoutput of ListItem
    const shallow = new ShallowRenderer();
    shallow.render(<ListItem/>);
    const result = shallow.getRenderOutput();

    //Navigating to find the onPress at Modal and triggers it
    result.props.children[2].props.children.props.onRequestClose(mockOnRequest(true));

    //Expecting the mockfunction to have been called one time
    expect(mockOnRequest).toHaveBeenCalledTimes(1);
});

//Test to check if onPress at TouchableOpacity(3) works
test("test onPress at TouchableOpacity(3)", () => {
    const mockOnPress = jest.fn();

    //Creates a shallowRenderer to get the renderoutput of ListItem
    const shallow = new ShallowRenderer();
    shallow.render(<ListItem/>);
    const result = shallow.getRenderOutput();

    //Navigating to find the onPress at TouchableOpacity and triggers it
    result.props.children[2].props.children.props.children.props.children.props.children[1].props.onPress(mockOnPress(true));

    //Expecting the mockfunction to have been called one time
    expect(mockOnPress).toHaveBeenCalledTimes(1);
});

//Test to check if onChangeText at TextInput(1) works
test("test onChangeText at TextInput(1)", () => {
    const mockOnChangeText = jest.fn();

    //Creates a shallowRenderer to get the renderoutput of ListItem
    const shallow = new ShallowRenderer();
    shallow.render(<ListItem/>);
    const result = shallow.getRenderOutput();

    //Navigating to find the onChangeText at TextInput and triggers it
    result.props.children[2].props.children.props.children.props.children.props.children[2].props.onChangeText(mockOnChangeText("test"));

    //Expecting the mockfunction to have been called one time
    expect(mockOnChangeText).toHaveBeenCalledTimes(1);
});

//Test to check if onDateChange at Datepicker(1) works
test("test onPress at Datepicker(1)", () => {
    const mockOnDateChange = jest.fn();

    //Creates a shallowRenderer to get the renderoutput of ListItem
    const shallow = new ShallowRenderer();
    shallow.render(<ListItem/>);
    const result = shallow.getRenderOutput();

    //Navigating to find the onPress at Datepicker and triggers it
    result.props.children[2].props.children.props.children.props.children.props.children[3].props.children.props.onDateChange(mockOnDateChange());

    //Expecting the mockfunction to have been called one time
    expect(mockOnDateChange).toHaveBeenCalledTimes(1);
});

//Test to check if onDateChange at TouchableOpacity(4) works
test("test onPress at TouchableOpacity(4)", () => {
    const mockOnPress = jest.fn();

    //Creates a shallowRenderer to get the renderoutput of ListItem
    const shallow = new ShallowRenderer();
    shallow.render(<ListItem/>);
    const result = shallow.getRenderOutput();

    //Navigating to find the onPress at TouchableOpacity and triggers it
    result.props.children[2].props.children.props.children.props.children.props.children[4].props.children[0].props.onPress(mockOnPress());

    //Expecting the mockfunction to have been called one time
    expect(mockOnPress).toHaveBeenCalledTimes(1);
});

//Test to check if onDateChange at TouchableOpacity(5) works
test("test onPress at TouchableOpacity(5)", () => {
    const mockDeleteTodo = jest.fn();
    const mockOnPress = jest.fn();

    //Creates a shallowRenderer to get the renderoutput of ListItem
    const shallow = new ShallowRenderer();
    shallow.render(<ListItem deleteTodo = {mockDeleteTodo}/>);
    const result = shallow.getRenderOutput();

    //Navigating to find the onPress at TouchableOpacity and triggers it
    result.props.children[2].props.children.props.children.props.children.props.children[4].props.children[1].props.onPress(mockOnPress(1));

    //Expecting the mockfunction to have been called one time
    expect(mockOnPress).toHaveBeenCalledTimes(1);
});



