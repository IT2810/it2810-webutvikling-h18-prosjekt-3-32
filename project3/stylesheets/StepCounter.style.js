import {StyleSheet} from "react-native";

export default StyleSheet.create({
    stepCounterContainer: {
        height: "100%",
        width: "100%",
        justifyContent: "center",
    },

    stepCounterItem1: {
        backgroundColor: "#ededed",
        width: "100%",
        height: "25%",
        borderTopWidth: 0.3,
        borderBottomWidth: 0.3,
        justifyContent: "center",
    },

    slider: {
        width: "90%",
        marginLeft: "5%",
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
    },

    stepCounterItem2: {
        backgroundColor: "#ededed",
        width: "100%",
        height: "50%",
        borderBottomWidth: 0.3,
        justifyContent: "space-around",
        alignItems: "center",
    },

    pedometerNumber2: {
        fontSize: 16,
        textAlign: 'center',
    },

    motivationText: {
        fontSize: 14,
        width: "90%",
        textAlign: "center",
    }
});