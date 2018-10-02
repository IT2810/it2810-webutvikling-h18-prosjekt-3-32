import {StyleSheet} from "react-native";

export default StyleSheet.create({
    todoItem: {
        flex: 1,
        height: 60,
        width: "100%",
        backgroundColor: "#ededed",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },

    itemText: {
        width: "70%",
        marginLeft: 10,
        fontSize: 16,
        color: "#7f7f7f",
    },

    deleteTodo: {
        marginRight: 10,
        borderRadius: 35,
        width: "20%",
        height: "70%",
        backgroundColor: "#ff3d3d",
        justifyContent: "center",
        alignItems: "center",
    },

    deleteText: {
      fontSize: 16,
      color: "#f7f7f7",
      fontWeight: "bold",
    },

});