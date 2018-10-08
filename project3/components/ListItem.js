import React from 'react';
import {AsyncStorage, Image, Modal, TouchableOpacity, Text, View, TextInput} from 'react-native';
import styles from "../stylesheets/ListItem.style.js";
import DatePicker from 'react-native-datepicker';

export default class ListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = ({
            date:"",
            name:"",
            modalVisible: false,
        });
    }

    //Since both date and name may be changed, the state is set by the props which comes from TodoList.js
    //When the name or date is changed, the state is changed and the user get immediate update!
    componentDidMount(){
        this.setState({
            date:this.props.date,
            name:this.props.name
        });
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

    };

    render() {
        return (
            <React.Fragment>
                <View style={styles.todoItemTop}>
                    <Text style={styles.itemText}>{this.state.name}</Text>
                    {/*Button to open the modal, where the user may enter date, save and delete the todo*/}
                    <TouchableOpacity
                        onPress={() => {
                            this.setModalVisible(true);
                        }}>
                        <Image style={styles.todoInfo} source={require('../assets/information.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.todoItemBottom}>
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