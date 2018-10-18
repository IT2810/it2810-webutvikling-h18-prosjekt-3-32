import React from "react";
import CalendarDisplayer from "../components/CalendarDisplayer";

import renderer from "react-test-renderer";

//Snapshot testing og CalendarDisplayer
test("CalendarDisplayer snapshot test", () => {
    const tree = renderer.create(<CalendarDisplayer/>);
    expect(tree).toMatchSnapshot();
});


test("Check if modal changes stat", () => {
    const testCalendarDisplayer = <CalendarDisplayer/>;
    const calendarComponent = renderer.create(testCalendarDisplayer).getInstance();

    calendarComponent.setModalVisible(true);
    expect(calendarComponent.state.modalVisible).toEqual(true);
});
