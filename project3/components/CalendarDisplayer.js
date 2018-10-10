import React from 'react';
import { AsyncStorage, StyleSheet, Text, View, List, TouchableOpacity, Modal, Image, TextInput } from 'react-native';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import styles from "../stylesheets/Calendar.style.js";
import DatePicker from 'react-native-datepicker';

export default class CalendarDisplayer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        date: "",
        startTime: "",
        endTime: "",
        eventText: "",
        currEventNr: 1,
        modalVisible: false,
        items: {},
      };

    }


    render() {
        return (
          <View style={styles.calendarContainer}>
            <Agenda
              style = {styles.agendaContainer}
              //Set monday to be first day of week
              firstDay={1}
              //Show week numbers
              showWeekNumbers={true}
              items={this.state.items}
              // callback that gets called when items for a certain month should be loaded (month became visible)
              loadItemsForMonth={this.loadItems.bind(this)}
              // callback that fires when the calendar is opened or closed
              onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
              // callback that gets called on day press
              onDayPress={(day)=>{console.log('day pressed')}}
              // callback that gets called when day changes while scrolling agenda list
              onDayChange={(day)=>{console.log('day changed')}}
              // specify how each item should be rendered in agenda
              renderItem={this.renderItem.bind(this)}
              // specify how empty date content with no items should be rendered
              renderEmptyDate={this.renderEmptyDate.bind(this)}
              // specify your item comparison function for increased performance
              rowHasChanged={this.rowHasChanged.bind(this)}
            />
            <TouchableOpacity style={styles.addEventButton} onPress={() => this.setModalVisible(true)} >
              <Text style={styles.addEventText}>{"Add new event"}</Text>
            </TouchableOpacity>
            <View>
                {/*Modal which contains several options to the user regarding the todo*/}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.modalVisible}
                    //If the back button on the users phone is pressed, close the Modal
                    onRequestClose={()=>{this.setModalVisible(!this.state.modalVisible);}}>
                    <View style={styles.modal}>
                        {/*Simple backbutton if the user choose to not do any changes*/}
                        <View style={styles.newEventTitleBar}>
                          <TouchableOpacity
                              onPress={() => {this.setModalVisible(!this.state.modalVisible);}}
                              style={styles.modalClose}>
                              <Image style={styles.backBtn} source={require('../assets/back.png')}/>
                          </TouchableOpacity>
                          <Text style={styles.newEventTitle}>{"Add a new event"}</Text>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({eventText : text})}
                            placeholder={"Event description"}
                        />

                        <View style={styles.modalItem}>
                            {/*Date picker so the user can choose an event date.*/}
                            <DatePicker
                                date={this.state.date}
                                mode="date"
                                placeholder="select date"
                                minDate={new Date()}
                                format="YYYY-MM-DD"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={(date) => {this.setState({date: date})}}
                            />
                        </View>
                        <View style={styles.modalItem}>
                            {/*Time picker so the user can choose event start time.*/}
                            <DatePicker
                                date={this.state.startTime}
                                mode="time"
                                placeholder="start time"
                                is24Hour={true}
                                format="LT"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={(time) => {
                                  this.setState({startTime: time},
                                  () => console.log(this.state.startTime));
                                  }
                                }
                            />
                            {/*Time picker so the user can choose event end time.*/}
                            <DatePicker
                                date={this.state.endTime}
                                mode="time"
                                placeholder="end time"
                                is24Hour={true}
                                format="LT"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={(time) => {
                                  this.setState({endTime: time},
                                  () => console.log(this.state.sendTime));
                                  }
                                }
                            />
                        </View>
                        <View style={styles.modalItem}>
                            {/*Button to save the changes done in the modal*/}
                            <TouchableOpacity style={styles.saveTodo}
                                              onPress={() => { this.addEvent(this.state.currEventNr);}}>
                                <Text style={styles.saveText}>Save</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.modalItem}>
                            {/*Button to delete the todo*/}
                            <TouchableOpacity style={styles.deleteTodo} >
                                <Text style={styles.deleteText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
          </View>

        );
    }

    //Set the modal visible
    setModalVisible(visible) {
      this.setState({modalVisible: visible});
    }

    addEvent = (id) => {
        //Should maybe clear input field here

        if(this.state.eventText !== "" && this.state.date !== "" && this.state.startTime !== "" && this.state.startTime !== ""){
          //Get current date
          const currDate = this.state.date;
          //If there is no object for current date
          if(!this.state.items[currDate]){
            //Then make object with current date as key
            this.state.items[currDate] = [];
          }
          //Add event to object
          this.state.items[currDate].push({
            name: this.state.eventText,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
          });
          // Making new empty object to add the newItems in
          const newItems = {};
          //Get every key (every date) in this.state.items and for each key, get item items in the state-list, and add it to newItems
          Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
          //Set item state to be newItems, and reset all other states
          this.setState({
            currEventNr: this.state.currEventNr+1,
            eventText: "",
            date: "",
            startTime: "",
            endTime: "",
            items: newItems,
          });
          //console.log("NEW LIST: " + newList);
          //Add to AsyncStorage
          const AsyncList = [this.state.eventText, this.state.date, this.state.startTime, this.state.endTime];
          this.storeEvent("event"+id.toString(), JSON.stringify(AsyncList));
          //alert("Trying to store: " + id.toString() + " as " + JSON.stringify(AsyncList));

          //this.storeEvent("CurrentEventNr", id.toString());
          //Close modal
          this.setModalVisible(!this.state.modalVisible);
        }
        else{alert("No fields can be empty!")};

    }

    //Store event in AsyncStorage. This is always called from addEvent
    storeEvent = async (id, data) => {
      //console.log("Made it to store event. Id is: " + id +" and Data is: " + data);
        try {
            await AsyncStorage.setItem(id, data);
            alert("Stored in async: " + data);
        } catch (error) {
          console.log(error);
            throw error;
        }
    };


    loadItems(day) {
      setTimeout(() => {
        //Run this loop 99 times
        
        for (let i = -15; i < 85; i++) {
          //Getting "today's" date. By today I mean the relevant date,
          //i.e the one we're looping through. When i=0, that is the current date
          const time = day.timestamp + i * 24 * 60 * 60 * 1000;
          //Converting it to a string
          const strTime = this.timeToString(time);
          //If there is no object in this.state.items named today's date
          if (!this.state.items[strTime]) {
            //Then make that object
            this.state.items[strTime] = [];
            //Add item to the object which tells us that there are no plans on today's agenda
            this.state.items[strTime].push({
              name: 'No plans for ' + strTime,
            });
          }
        }
        //console.log(this.state.items);

        //Making a new, empty object to add the newItems in
        const newItems = {};
        //Get every key (every date) in this.state.items and for each key, get item items in the state-list, and add it to newItems
        Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
        //Sets state to be the newItems list.
        this.setState({
          items: newItems,
        });
        console.log("Today is: ", this.state.date);
      }, 1000);
      // console.log(`Load Items for ${day.year}-${day.month}`);
    }

    renderItem(item) {
      if(item.startTime && item.endTime){
        return (
          <TouchableOpacity style={styles.item} onPress={this.showItemInfo.bind(item.name)}>
            <Text style={styles.itemTime}>{item.startTime + " - " + item.endTime}</Text>
            <Text style={styles.itemText} >{item.name}</Text>
          </TouchableOpacity>
        );
      }
      else{
        return (
          <TouchableOpacity style={styles.item} onPress={this.showItemInfo.bind(item.name)}>
            <Text style={styles.itemText} >{item.name}</Text>
          </TouchableOpacity>
        );
      }


    }

    showItemInfo(itemName){
      alert("Showing item" + itemName);
    }

    renderEmptyDate() {
      return (
        <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
      );
    }

    rowHasChanged(r1, r2) {
      return r1.name !== r2.name;
    }

    timeToString(time) {
      const date = new Date(time);
      return date.toISOString().split('T')[0];
    }
  }
