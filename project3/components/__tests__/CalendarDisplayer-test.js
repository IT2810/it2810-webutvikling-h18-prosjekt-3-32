import React from "react";
import CalendarDisplayer from "../components/CalendarDisplayer";
import { Alert } from "react-native";
import renderer from "react-test-renderer";
import ShallowRenderer from "react-test-renderer/shallow";

//Snapshot testing og CalendarDisplayer
test("CalendarDisplayer snapshot test", () => {
    const tree = renderer.create(<CalendarDisplayer/>);
    expect(tree).toMatchSnapshot();
});

test("Check if modal changes state", () => {
    const testCalendarDisplayer = <CalendarDisplayer/>;
    const calendarComponent = renderer.create(testCalendarDisplayer).getInstance();
    calendarComponent.setModalVisible(true);
    expect(calendarComponent.state.modalVisible).toEqual(true);
});

test("Check if modal closes", () => {
    const testCalendarDisplayer = <CalendarDisplayer/>;
    const calendarComponent = renderer.create(testCalendarDisplayer).getInstance();
    //Open modal
    calendarComponent.setModalVisible(true);
    //Close modal
    calendarComponent.closeModal();
    //Test if modal actually closed
    expect(calendarComponent.state.modalVisible).toEqual(false);
});

test("Add event test when event list is empty", () => {
    const testCalendarDisplayer = <CalendarDisplayer/>;
    const calendarComponent = renderer.create(testCalendarDisplayer).getInstance();
    //addEvent function takes values from these states
    calendarComponent.setState({
        date: "2018-10-18",
        eventText: "Test",
        eventDate: "2018-10-18",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        currEventNr: 1,
        prevEventNr: 0,
    });
    //Expecting this after function addEvent is finished
    const eventValues = [ {
        name: "Test",
        startTime: "10:00 AM",
        eventDate: "2018-10-18",
        endTime: "11:00 AM",
        eventNr: 1
      }];
    calendarComponent.addEvent(1);
    expect(calendarComponent.state.items["2018-10-18"]).toEqual(eventValues);
});

test("Add event test when event list has 1 item", () => {
    const testCalendarDisplayer = <CalendarDisplayer/>;
    const calendarComponent = renderer.create(testCalendarDisplayer).getInstance();
    //addEvent function takes values from these states
    calendarComponent.setState({
        date: "2018-10-18",
        eventText: "Test",
        eventDate: "2018-10-18",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        currEventNr: 1,
        prevEventNr: 0,
        items: {"2018-10-18":[{name: "No upcoming events."}]},
    });
    //Expecting this after function addEvent is finished
    const eventValues = [ {
        name: "Test",
        startTime: "10:00 AM",
        eventDate: "2018-10-18",
        endTime: "11:00 AM",
        eventNr: 1
      }];
    calendarComponent.addEvent(1);
    expect(calendarComponent.state.items["2018-10-18"]).toEqual(eventValues);
});

test("Add event test when event in question already exists", () => {
    const testCalendarDisplayer = <CalendarDisplayer/>;
    const calendarComponent = renderer.create(testCalendarDisplayer).getInstance();
    //addEvent function takes values from these states
    calendarComponent.setState({
        date: "2018-10-18",
        eventText: "Test",
        eventDate: "2018-10-18",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        currEventNr: 1,
        prevEventNr: 2,
        items: {"2018-10-18":[{name: "Some event", startTime: "10:00 AM", endTime: "11:11 AM", eventNr:1, date: "2018-12-24"}]},
    });
    //Expecting this after function addEvent is finished
    const eventValues = [ {
        name: "Test",
        startTime: "10:00 AM",
        eventDate: "2018-10-18",
        endTime: "11:00 AM",
        eventNr: 1
      }];
    calendarComponent.addEvent(1);
    expect(calendarComponent.state.items["2018-10-18"]).toEqual(eventValues);
});

test("Delete event test", () => {
    const testCalendarDisplayer = <CalendarDisplayer/>;
    const calendarComponent = renderer.create(testCalendarDisplayer).getInstance();
    //addEvent function takes values from these states
    calendarComponent.setState({
        date: "2018-10-18",
        eventText: "Test",
        eventDate: "2018-10-18",
        startTime: "10:00 AM",
        endTime: "11:00 AM",
        currEventNr: 1,
        prevEventNr: 0,
    });
    calendarComponent.addEvent(1);
    //deleteEvent uses these values from state to determine whether to delete something or not
    calendarComponent.setState({
        eventDate: "2018-10-18",
        currEventNr: 1,
    });
    calendarComponent.deleteEvent(1);
    //Expecting today's events in state to be empty after deleting
    expect(calendarComponent.state.items["2018-10-18"]).toEqual([]);
});

test("Load items test when there are no events in state", () => {
    const testCalendarDisplayer = <CalendarDisplayer/>;
    const calendarComponent = renderer.create(testCalendarDisplayer).getInstance();
    //Day to load. Timestamp is equal to timestamp for 2018-10-18
    const day = {
      "dateString": "2018-10-18",
      "day": 18,
      "month": 10,
      "timestamp": 1539820800000,
      "year": 2018,
    }
    calendarComponent.loadItems(day);
    //Since there are no events on today's date, I expect loadItems to create an event with name "No events to show."
    expect(calendarComponent.state.items[day.dateString]).toEqual([{name: "No upcoming events."}]);
});

test("Load items test when there are events in state, but not today", () => {
    const testCalendarDisplayer = <CalendarDisplayer/>;
    const calendarComponent = renderer.create(testCalendarDisplayer).getInstance();

    calendarComponent.setState({
      items: {"2018-12-24": [{name: "God jul!"}]}
    });
    //Day to load. Timestamp is equal to timestamp for 2018-10-18
    const day = {
      "dateString": "2018-10-18",
      "day": 18,
      "month": 10,
      "timestamp": 1539820800000,
      "year": 2018,
    }
    calendarComponent.loadItems(day);
    //Since there are no events on today's date, I expect loadItems to create an event with name "No events to show."
    expect(calendarComponent.state.items[day.dateString]).toEqual([{name: "No events to show."}]);
});


test("Show item info test", () => {
    const testCalendarDisplayer = <CalendarDisplayer/>;
    const calendarComponent = renderer.create(testCalendarDisplayer).getInstance();

    const item = {
      name: "test",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      eventDate: "2018-10-18",
    }
    calendarComponent.showItemInfo(item);
    //Expecting states to be this:
    expect(calendarComponent.state.eventText).toEqual(item.name);
    expect(calendarComponent.state.date).toEqual(item.eventDate);
    expect(calendarComponent.state.startTime).toEqual(item.startTime);
    expect(calendarComponent.state.endTime).toEqual(item.endTime);
});

test("Mock on press for addEvent button", () => {
    const mockOnPress = jest.fn();
    //Create shallowRenderer to get the render output of CalendarDisplayer
    const shallow = new ShallowRenderer();
    shallow.render(<CalendarDisplayer/>);
    const result = shallow.getRenderOutput();

    //Navigating to find onPress at Touchableopacity and trigger it
    result.props.children[1].props.onPress(mockOnPress(true));

    //Expect mockOnPress to have been called 1 time
    expect(mockOnPress).toHaveBeenCalledTimes(1);
});



test("Mock on press for android back button", () => {
    const mockOnRequestClose = jest.fn();
    //Create shallowRenderer to get the render output of CalendarDisplayer
    const shallow = new ShallowRenderer();
    shallow.render(<CalendarDisplayer/>);
    const result = shallow.getRenderOutput();
    //Navigating to find onRequestClose in Modal and trigger it
    result.props.children[2].props.children.props.onRequestClose(mockOnRequestClose());
    //Expect mockOnPress to have been called 1 time
    expect(mockOnRequestClose).toHaveBeenCalledTimes(1);
});

test("Mock on press for Modal close button", () => {
    const mockOnPress = jest.fn();
    //Create shallowRenderer to get the render output of CalendarDisplayer
    const shallow = new ShallowRenderer();
    shallow.render(<CalendarDisplayer/>);
    const result = shallow.getRenderOutput();
    //Navigating to find onRequestClose in Modal and trigger it
    result.props.children[2].props.children.props.children.props.children[1].props.onPress(mockOnPress());
    //Expect mockOnPress to have been called 1 time
    expect(mockOnPress).toHaveBeenCalledTimes(1);
});

test("Mock on text change for Modal text input", () => {
    const mockOnChangeText = jest.fn();
    //Create shallowRenderer to get the render output of CalendarDisplayer
    const shallow = new ShallowRenderer();
    shallow.render(<CalendarDisplayer/>);
    const result = shallow.getRenderOutput();
    //Navigating to find onRequestClose in Modal and trigger it
    result.props.children[2].props.children.props.children.props.children[2].props.onChangeText(mockOnChangeText("Test"));
    //Expect mockOnPress to have been called 1 time
    expect(mockOnChangeText).toHaveBeenCalledTimes(1);
});

test("Mock on date change for Modal date DatePicker", () => {
    const mockOnDateChange = jest.fn();
    //Create shallowRenderer to get the render output of CalendarDisplayer
    const shallow = new ShallowRenderer();
    shallow.render(<CalendarDisplayer/>);
    const result = shallow.getRenderOutput();
    //Navigating to find onRequestClose in Modal and trigger it
    result.props.children[2].props.children.props.children.props.children[3].props.children.props.onDateChange(mockOnDateChange("2018-10-18"));
    //Expect mockOnPress to have been called 1 time
    expect(mockOnDateChange).toHaveBeenCalledTimes(1);
});

test("Mock on date change for Modal start time DatePicker", () => {
    const mockOnDateChange = jest.fn();
    //Create shallowRenderer to get the render output of CalendarDisplayer
    const shallow = new ShallowRenderer();
    shallow.render(<CalendarDisplayer/>);
    const result = shallow.getRenderOutput();
    //Navigating to find onRequestClose in Modal and trigger it
    result.props.children[2].props.children.props.children.props.children[4].props.children[0].props.onDateChange(mockOnDateChange("2018-10-18"));
    //Expect mockOnPress to have been called 1 time
    expect(mockOnDateChange).toHaveBeenCalledTimes(1);
});

test("Mock on date change for Modal end time DatePicker", () => {
    const mockOnDateChange = jest.fn();
    //Create shallowRenderer to get the render output of CalendarDisplayer
    const shallow = new ShallowRenderer();
    shallow.render(<CalendarDisplayer/>);
    const result = shallow.getRenderOutput();
    //Navigating to find onRequestClose in Modal and trigger it
    result.props.children[2].props.children.props.children.props.children[4].props.children[1].props.onDateChange(mockOnDateChange("2018-10-18"));
    //Expect mockOnPress to have been called 1 time
    expect(mockOnDateChange).toHaveBeenCalledTimes(1);
});

test("Mock onPress for events", () => {
    const mockOnPress = jest.fn();

    //Make sure item has startTime and endTime
    const item = {
      name: "test",
      startTime: "10:00 AM",
      endTime: "11:00 AM",
      eventDate: "2018-10-18",
    }
    //To get instances of the component
    component = renderer.create(<CalendarDisplayer/>).getInstance();
    result = component.renderItem(item);

    //Navigating to find onPress in the TouchableOpacity and trigger it
    result.props.onPress(mockOnPress());
    //Expect mockOnPress to have been called 1 times
    expect(mockOnPress).toHaveBeenCalledTimes(1);
});

test("Test that event renders properly when it has no startTime or endTime ", () => {
    //Make sure item has no startTime or endTime
    const item = {
      name: "No upcoming events.",
    }
    //To get instances of the component
    component = renderer.create(<CalendarDisplayer/>).getInstance();
    result = component.renderItem(item);
    //Expect the value of the text inside TouchableOpacity to have value equal
    //to the name of the rendered item.
    expect(result.props.children.props.value).toEqual(item.name);
});

test("Test render of empty date", () => {
    //To get instances of the component
    component = renderer.create(<CalendarDisplayer/>).getInstance();
    result = component.renderEmptyDate();
    //Expect the value of the text inside TouchableOpacity to have value "empty"
    expect(result.props.children.props.value).toEqual("empty");
});

Alert.alert = jest.fn().mockImplementation(() => {
    console.log('Alert called');
});
