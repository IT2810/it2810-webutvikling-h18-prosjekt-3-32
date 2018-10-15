import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import styles from "../stylesheets/HomeListItem.style.js";


export default class HomeListItem extends React.Component {

    render() {
        return (
            <React.Fragment>
                <View style={styles.itemContainer}>
                    <Text style={styles.itemText}>{this.props.name}</Text>
                    <Text style={{color:"#7f7f7f", fontSize:12}}>{this.props.start} - {this.props.end}</Text>
                </View>
            </React.Fragment>
        );
    }
};
