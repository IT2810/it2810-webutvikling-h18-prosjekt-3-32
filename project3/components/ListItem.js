import React from 'react';
import { Image, Modal, TouchableOpacity, Text, View } from 'react-native';
import styles from "../stylesheets/ListItem.style.js";
import DatePicker from 'react-native-datepicker';

export default class ListItem extends React.Component {
    constructor(props){
        super(props);
        this.state = ({
            date:"",
            modalVisible: false,
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

    render() {
        return (
            <React.Fragment>
                <View style={styles.todoItemTop}>
                    <Text style={styles.itemText}>{this.props.name}</Text>
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
                        visible={this.state.modalVisible}
                        onRequestClose={()=>{this.setModalVisible(!this.state.modalVisible);}}>
                        <View style={styles.modal}>
                            {/*Simple backbutton if the user choose to not do any changes*/}
                            <TouchableOpacity
                                onPress={() => {this.setModalVisible(!this.state.modalVisible);}}
                                style={styles.modalClose}>
                                <Image style={styles.backBtn} source={require('../assets/back.png')}/>
                            </TouchableOpacity>
                            <Text style={styles.modalText}>{this.props.name}</Text>
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
                                    onDateChange={(date) => {this.setState({date: date})}}
                                />
                            </View>
                            <View style={styles.modalItem}>
                                {/*Button to save the changes done in the modal*/}
                                <TouchableOpacity style={styles.saveTodo}
                                                  onPress={() => {this.setModalVisible(!this.state.modalVisible);}}>
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
