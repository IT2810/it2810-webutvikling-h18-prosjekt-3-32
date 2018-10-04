import {StyleSheet} from "react-native";

export default StyleSheet.create({
    todoItem: {
        height: 60,
        width: "100%",
        backgroundColor: "#ededed",
        display: "flex",
        alignItems: "center",
        borderBottomWidth: 0.2,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    todoItemText: {
        marginLeft: "1.5%",
        fontSize: 16,
        maxWidth: "70%",
    },
    todoItemDate: {
        marginRight: "1.5%",
        fontSize: 13,
        color: "gray",
    }
});
