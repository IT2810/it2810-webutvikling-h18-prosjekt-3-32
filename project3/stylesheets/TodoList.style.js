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
        backgroundColor: "black",
        borderBottomColor: "white",
        borderTopColor: "white",
        borderWidth: 2,
        alignItems: "flex-end",
        justifyContent: "center",
    },

    toolbarBtn: {
        backgroundColor: "red",
        width: 40,
        height: 40,
        marginRight: 10,
    }
});