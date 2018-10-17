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
        eventDate: "",
        eventText: "",
        prevEventNr: 0,
        currEventNr: 1,
        modalVisible: false,
        items: {},
      };
    }

    componentDidMount(){
        //Gets the highest eventNr and updates the state so that no events have the same eventNr and key.
        AsyncStorage.getAllKeys((err, keys) => {
            AsyncStorage.multiGet(keys, (err, stores) => {
                stores.map((result, i, store) => {
                    // get each store's key/value so you can work with it
                    let key = store[i][0];
                    let value = store[i][1];
                    //Check if key is CurrentEventNr. If so, update this.state.currEventNr
                    if(key === "CurrentEventNr"){
                        this.setState({currEventNr:parseInt(value)+1});
                    }
                    //If key includes event, get the value and add it to the Object with events in state
                    if(key.includes("event")){
                        //Parse the JSON back to a js object
                        let parsedValue = JSON.parse(value);
                        //Get key of the js object, which will be the date
                        let listKeys = Object.keys(parsedValue);
                        //Use this date as a key when storing the event in state.
                        //parsedValue[listKeys[0]] is the value of the object, which contains event name, start time and end time
                        if(!this.state.items[listKeys[0]]){
                          this.state.items[listKeys[0]] = [];
                        }
                        this.state.items[listKeys[0]].push(parsedValue[listKeys[0]][0]);
                        //Making a new, empty object to add the new item in
                        const newItems = {};
                        //Get every key (every date) in this.state.items and for each key, get items (name and time) in the state-list, and add it to newItems
                        Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
                        //Set state to be the newItems object. this.state.items now contains every date that previously was there, and the new one.
                        this.setState({
                          items: newItems,
                        });
                    }
                });
            });
        });
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
              minDate={'2016-01-01'}
              maxDate={'2020-12-31'}
              //Numbers of months user can scroll backwards
              pastScrollRange={12}
              //Numbers of months user can scroll forwards. Limited to 12 to make loading time better
              futureScrollRange={12}
              //Items in Agenda should be equal to items in state
              items={this.state.items}
              // callback that gets called when items for a certain month should be loaded (month became visible)
              loadItemsForMonth={this.loadItems.bind(this)}
              // callback that fires when the calendar is opened or closed
              onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
              // callback that gets called on day press
              onDayPress={(day)=>{this.setState({date: day.dateString})}}
              // callback that gets called when day changes while scrolling agenda list
              onDayChange={(day)=>{console.log('day changed')}}
              // specify how each item should be rendered in agenda
              renderItem={this.renderItem.bind(this)}
              // specify how empty date content with no items should be rendered
              renderEmptyDate={this.renderEmptyDate.bind(this)}
              // specify your item comparison function for increased performance
              rowHasChanged={this.rowHasChanged.bind(this)}
            />
            <TouchableOpacity style={styles.addEventButton}
              onPress={() => this.setModalVisible(true)} >
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
                          <Text style={styles.newEventTitle}>{"Event info"}</Text>
                        </View>
                        <TouchableOpacity
                            onPress={() =>{this.closeModal();}}
                            style={styles.modalClose}>
                            <Image style={styles.backBtn} source={require('../assets/back.png')}/>
                        </TouchableOpacity>
                        <TextInput
                            style={styles.textInput}
                            onChangeText={(text) => this.setState({eventText : text})}
                            placeholder={"Event description"}
                            value={this.state.eventText}
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
                                iconSource={require('../assets/clock.png')}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={(time) => {
                                  this.setState({startTime: time});
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
                                iconSource={require('../assets/clock.png')}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                onDateChange={(time) => {
                                  this.setState({endTime: time});
                                  }
                                }
                            />
                        </View>
                        <View style={styles.buttonsView}>
                              {/*Button to save the changes done in the modal*/}
                              <TouchableOpacity style={styles.saveButton} onPress={() => { this.addEvent(this.state.currEventNr);}}>
                                  <Text style={styles.saveText}>Save</Text>
                              </TouchableOpacity>
                              {/*Button to delete the todo*/}
                              <TouchableOpacity style={styles.deleteButton} onPress={() => { this.deleteEvent(this.state.currEventNr);}}>
                                  <Text style={styles.deleteText}>Delete</Text>
                              </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
          </View>

        );
    }

    //This is triggered when the back button is pressed when editing an event or when creating an event
    closeModal(){
      let newEventNr = this.state.currEventNr;
      //If the event in question already exists, then the event nr must be set to the old event nr,
      //In order to not overwrite the event in question when a new event is added later on
      if(this.state.currEventNr < this.state.prevEventNr){
        newEventNr = this.state.prevEventNr;
      }
      //Reset state values and close modal
      this.setState({
        eventText: "",
        startTime: "",
        endTime: "",
        prevEventNr: this.state.currEventNr,
        currEventNr: newEventNr,
        modalVisible: false,
      });
    }

    //Hide/Show the modal window
    setModalVisible(visible) {
      this.setState({
        modalVisible: visible
      });
    }

    deleteEvent = (id) => {
        let deleteIndex = null;
        const evtDate = this.state.eventDate;
        //Go through each element in today's list
        Object.keys(this.state.items[evtDate]).forEach( index =>
          //If events eventNr is equal to current event nr, then we know what to delete.
          {if(this.state.items[evtDate][index].eventNr == this.state.currEventNr){
            //Saving the index
            deleteIndex = index;
          }}
        );
        //If we found something to delete
        if(deleteIndex!=null){
          //Delete it
          this.state.items[evtDate].splice(deleteIndex, 1);
        }
        //Also deletes event from Async
        AsyncStorage.removeItem("event"+id.toString());

        //Making new empty object to add the newItems in
        const newItems = {};
        //Get every key (every date) in this.state.items and for each key, get item items in the state-list, and add it to newItems
        Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});

        //Set item state to be newItems, and reset all other states
        this.setState({
          items: newItems,
          currEventNr: this.state.currEventNr+1,
          eventText: "",
          eventDate: "",
          startTime: "",
          endTime: "",
          modalVisible: false,
        });

        this.loadItems.bind(this);
    }

    addEvent = (id) => {
        //Get current date
        const newDate = this.state.date;
        const evtDate = this.state.eventDate;
        //Check whether the event already exists, or if it's a new one
        if(this.state.currEventNr < this.state.prevEventNr){
          let deleteIndex = null;
          //Go through each element in today's list
          Object.keys(this.state.items[evtDate]).forEach( index =>
            //If events eventNr is equal to current event nr, then we know what to delete.
            {if(this.state.items[evtDate][index].eventNr == this.state.currEventNr){
              //Saving the index
              deleteIndex = index;
            }}
          );
          //If we found something to delete
          if(deleteIndex!=null){
            //Delete it
            this.state.items[evtDate].splice(deleteIndex, 1);
          }
        }

        //Now, after checking (and deleting) if we had to delete something, we can start creating a new event object

        //Check if all inputs fields are filled in
        if(this.state.eventText !== "" && this.state.date !== "" && this.state.startTime !== "" && this.state.startTime !== ""){
          //If there is no object for current date
          if(!this.state.items[newDate]){
            //Then make object with current date as key
            this.state.items[newDate] = [];
          }
          //If date contains at least one element
          if(this.state.items[newDate].length>0){
            //Check if date has an object where name value is "No upcoming events."
            //If so, this must be deleted in order for it not to show in calendar
            if(this.state.items[newDate][0]["name"]=="No upcoming events."){
              //Delete event that says "no upcoming event"
              delete this.state.items[newDate];
              //Create new, empty date key in object
              this.state.items[newDate] = [];
            }
          }

          //Push event Object to today's list
          this.state.items[newDate].push({
            name: this.state.eventText,
            startTime: this.state.startTime,
            eventDate: newDate,
            endTime: this.state.endTime,
            eventNr: this.state.currEventNr,
          });

          // Making new empty object to add the newItems in
          const newItems = {};
          //Get every key (every date) in this.state.items and for each key, get item items in the state-list, and add it to newItems
          Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
          //Make object to store in AsyncStorage
          const AsyncObject = {};
          AsyncObject[newDate] = [];
          AsyncObject[newDate].push({
            name: this.state.eventText,
            eventDate: newDate,
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            eventNr: this.state.currEventNr,
          });
          //Set item state to be newItems, and reset all other states
          this.setState({
            items: newItems,
            currEventNr: this.state.currEventNr+1,
            eventText: "",
            eventDate: "",
            startTime: "",
            endTime: "",
          });
          //Store event in async
          this.storeEvent("event"+id.toString(), JSON.stringify(AsyncObject));
          //Store currEventNr in async
          this.storeEvent("CurrentEventNr", id.toString());
          //Close modal
          this.setModalVisible(!this.state.modalVisible);
          if(this.state.currEventNr<this.state.prevEventNr){
            this.setState({
              currEventNr: this.state.prevEventNr,

            });
          }
          this.loadItems.bind(this);
        }
        //If something is not filled in, alert the user
        else{alert("No fields can be empty!")};

    }

    //Store event in AsyncStorage. This is always called from addEvent
    storeEvent = async (id, data) => {
        try {
            await AsyncStorage.setItem(id, data);
        } catch (error) {
            throw error;
        }
    };

    loadItems(day) {
      setTimeout(() => {
        //Get today's date
        const time = day.timestamp + 0 * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        //If there are no events in state at all
        console.log(Object.keys(this.state.items));
        if(Object.keys(this.state.items).length === 0){
          this.state.items[strTime] = [];
          //Add description to object. Notice how no start or end time is added
          //in order for this item to be returned in a different way
          this.state.items[strTime].push({
            name: 'No upcoming events.',
          });
        }
        //Check if today's list is empty, if yes, add "No events today"
        if(!this.state.items[strTime]){
          this.state.items[strTime] = [];
          //Add description to object. Notice how no start or end time is added
          //in order for this item to be returned in a different way
          this.state.items[strTime].push({
            name: 'No events to show.',
          });
        }
        //Making a new, empty object to add the newItems in
        const newItems = {};
        //Get every key (every date) in this.state.items and for each key, get item items in the state-list, and add it to newItems
        Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
        //Sets state to be the newItems object.
        this.setState({
          items: newItems,
        });
      }, 1000);
    }

    renderItem(item) {
      //If item has starTime and endTime, then return this code.
      if(item.startTime && item.endTime){
        return (
          <TouchableOpacity style={styles.item} onPress={() => this.showItemInfo(item)}>
            <Text style={styles.itemTime}>{item.startTime + " - " + item.endTime}</Text>
            <Text style={styles.itemText} >{item.name}</Text>
          </TouchableOpacity>
        );
      }
      //If it doesn't have start or end time, then tell the user they have no upcoming events.
      else{
          return (
            <TouchableOpacity style={styles.item}>
              <Text style={styles.itemText}> {item.name} </Text>
            </TouchableOpacity>
          );
      }
    }

    showItemInfo(item){
       this.setState({
         eventText: item.name,
         startTime: item.startTime,
         endTime: item.endTime,
         eventDate: item.eventDate,
         date: item.eventDate,
         prevEventNr: this.state.currEventNr,
         currEventNr: item.eventNr,
       }, () => this.setModalVisible(true));
    }

    renderEmptyDate() {
      return (
        <TouchableOpacity style={styles.item}>
          <Text style={styles.itemText}>No events to show </Text>
        </TouchableOpacity>
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
