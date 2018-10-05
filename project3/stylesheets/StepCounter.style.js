import {StyleSheet} from "react-native";

export default StyleSheet.create({
    pedometerContainer: {
        height: "100%",
        width: "100%",
        backgroundColor: "lightgray",
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    yellowBubble: {
        backgroundColor: "yellow",
        width: "90%",
        paddingTop: 10,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        borderRadius: 10,
    },

    pedometerText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    pedometerNumber: {
        paddingTop: 15,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    }
});
