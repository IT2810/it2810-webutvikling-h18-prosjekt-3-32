import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        borderRadius: 4,
    },
    toolbar: {
        height: "13%",
        width: "100%",
        backgroundColor: "#f7f7f7",
        alignItems: "center",
        justifyContent: "space-around",
        flexDirection: "row",
    },

    toolbarAddBtn: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
        borderColor: "#a0a0a0",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    toolbarAddBtnText: {
        fontSize: 15,
        color: "#a0a0a0",
    },

    textInput: {
        width: "70%",
        height: "80%",
        color: "#a0a0a0",
        fontSize: 18,
    }


});