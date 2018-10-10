import React from 'react';
import {AppState, AsyncStorage, Image, Modal, TouchableOpacity, Text, View, TextInput} from 'react-native';
import styles from "../stylesheets/ListItem.style.js";
import DatePicker from 'react-native-datepicker';
import { CheckBox } from 'react-native-elements'
import App from "../App";

export default class ListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = ({
            date:"",
            name:"",
            modalVisible: false,
            dueDate: false,
            done:false,
            appState: AppState.currentState,
        });
    }

    //Since both date and name may be changed, the state is set by the props which comes from TodoList.js
    //When the name or date is changed, the state is changed and the user get immediate update!
    componentDidMount(){
        AppState.addEventListener('change', this.handleAppStateChange);
        this.setState({
            date: this.props.date,
            name: this.props.name
        });
        this.checkDueDate();
    }

    componentWillUnmount(){
        AppState.removeEventListener('change', this.handleAppStateChange);
    }

    //This function checks the current state of the device (active, background, inactive)
    //If the app is closed, this.handleFinishedTodo will be triggered
    handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {

        }
        else{this.handleFinishedTodo()}
        this.setState({appState: nextAppState});
    };


    //This function only run when the application is closed.
    //It checks whether a to-do is marked as done or not, if it is (when the application is closed), the to-do is removed from the list
    //The to-do is also renamed in the AsyncStorage (see line 69 in TodoList.js for more!)
    handleFinishedTodo(){
        if(this.state.done){
            const finishedList = [this.props.todoNr, this.state.name, this.state.date];
            this.props.handleFinishedTodo(finishedList);
        }
    }

    //This Function checks whether a given due date to an to-do is today or have been
    //The text will be red, as an reminder for the user 
    checkDueDate(){
        const today = new Date();
        const dueDate = new Date(this.props.date);
        if(dueDate <= today){
            this.setState({dueDate:true});
        }
        else{
            this.setState({dueDate:false})
        }
    }

    //Set the modal visible
    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    //deleteTodo delete an item with the given id.
    //this.props.deleteTodo is a function passed down to ListItem from TodoList.
    deleteTodo(id){
        this.props.deleteTodo(id);
    };

    //saveChanges is an async function which saves the changes to an to-do done by the user.
    //the new changes are stored in the Asyncstorage by the given todonr
    saveChanges = async () => {
        this.setModalVisible(!this.state.modalVisible);
        const list = [this.state.name, this.state.date];
        try {
            await AsyncStorage.setItem(this.props.todoNr.toString(), JSON.stringify(list));
        } catch (error) {
            throw error;
        }


        //Creates a list to update the list immediately when the user have changed the date or name
        const updateList = [this.props.todoNr, this.state.name, this.state.date];
        this.props.updateSortedList(updateList);


        this.checkDueDate();

    };

    render() {
        return (
            <React.Fragment>
                <TouchableOpacity onPress={() => {this.setModalVisible(true);}} style={this.state.done ? styles.topDone : styles.todoItemTop}>
                    <CheckBox
                        containerStyle={styles.checkBtn}
                        checked={this.state.done}
                        onIconPress={() => this.setState({done:!this.state.done})}
                    />
                    <Text style={this.state.dueDate ? styles.itemRed : styles.itemText}>{this.state.name}</Text>
                    {/*Button to open the modal, where the user may enter date, save and delete the todo*/}
                    <TouchableOpacity
                        onPress={() => {
                            this.setModalVisible(true);
                        }}>
                        <Image style={styles.todoInfo} source={require('../assets/information.png')}/>
                    </TouchableOpacity>
                </TouchableOpacity>
                <View style={this.state.done ? styles.bottomDone : styles.todoItemBottom}>
                    <Text style={styles.dateText}>{this.state.date}</Text>
                </View>
                <View>
                    {/*Modal which contains several options to the user regarding the todo*/}
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}>
                        <View style={styles.modal}>
                            {/*Simple backbutton if the user choose to not do any changes*/}
                            <TouchableOpacity
                                onPress={() => {this.setModalVisible(!this.state.modalVisible);}}
                                style={styles.modalClose}>
                                <Image style={styles.backBtn} source={require('../assets/back.png')}/>
                            </TouchableOpacity>
                            {/*The user may change the todoText*/}
                            <TextInput style={styles.modalText}
                                       onChangeText={(text) => this.setState({name:text})}
                                       value={this.state.name}/>
                            <View style={styles.modalItem}>
                                {/*Date picker so the user could choose an due date to the todo.*/}
                                <DatePicker
                                    style={styles.datePicker}
                                    date={this.state.date}
                                    mode="date"
                                    placeholder="select date"
                                    minDate={new Date()}
                                    format="YYYY-MM-DD"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    onDateChange={(date) => {this.setState({date:date})}}
                                />
                            </View>
                            <View style={styles.modalItem}>
                                {/*Button to save the changes done in the modal*/}
                                <TouchableOpacity style={styles.saveTodo}
                                                  onPress={() => {this.saveChanges()}}>
                                    <Text style={styles.saveText}>Save</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalItem}>
                                {/*Button to delete the todo*/}
                                <TouchableOpacity style={styles.deleteTodo} onPress={() => this.deleteTodo(this.props.todoNr)}>
                                    <Text style={styles.deleteText}>Delete</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </React.Fragment>
        );
    }
};