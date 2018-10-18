import React from 'react';
import { Text, View } from 'react-native';
import styles from "../stylesheets/HomeListItem.style.js";


export default class HomeListItemTodo extends React.Component {

    //------ RENDER  ------//

    render() {
        return (
            <React.Fragment>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemText}>{this.props.name}</Text>
                    <Text style={{color:"#7f7f7f", fontSize:12}}>{this.props.date}</Text>
                </View>
            </React.Fragment>
        );
    }
};
