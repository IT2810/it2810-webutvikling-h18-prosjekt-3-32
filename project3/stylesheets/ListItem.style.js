import {StyleSheet} from "react-native";

export default StyleSheet.create({
    todoItemTop: {
        flex: 1,
        height: 70,
        width: "100%",
        backgroundColor: "#ededed",
        alignItems: "center",
        justifyContent: "space-between",
        flexDirection: "row",
    },

    todoItemBottom:{
        flex: 1,
        height: 18,
        width: "100%",
        backgroundColor: "#ededed",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 0.25,
    },

    itemText: {
        maxWidth: "80%",
        marginLeft: 10,
        fontSize: 16,
        color: "#7f7f7f",
    },

    dateText: {
        fontSize: 12,
        color: "#7f7f7f",
    },

    deleteTodo: {
        width: "100%",
        height: "100%",
        backgroundColor: "#ff3d3d",
        justifyContent: "center",
        alignItems: "center",
    },

    deleteText: {
        fontSize: 16,
        color: "#f7f7f7",
        fontWeight: "bold",
    },

    saveTodo: {
        width: "100%",
        height: "100%",
        backgroundColor: "#3aadff",
        justifyContent: "center",
        alignItems: "center",
    },

    saveText: {
        fontSize: 16,
        color: "#f7f7f7",
        fontWeight: "bold",
    },

    todoInfo:{
        height: 30,
        width: 30,
        marginRight: 20,
    },

    modalClose: {
        alignSelf: "flex-start",
        marginLeft: 10,
        marginBottom: 15,
    },

    backBtn: {
        height: 30,
        width: 30,
        padding: 5,
    },

    modalText: {
        width: "100%",
        fontSize: 25,
        textAlign: "center",
        backgroundColor: "#dddddd",
        padding: 10,
    },

    modal: {
        alignItems: "center",
        justifyContent: "center",
    },

    modalItem: {
        width: "100%",
        height: "15%",
        backgroundColor: "#ededed",
        borderBottomWidth: 0.2,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    }
});