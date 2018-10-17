import {StyleSheet} from "react-native";

export default StyleSheet.create({
    todoItemTop: {
        flex: 1,
        height: 70,
        width: "100%",
        backgroundColor: "#ededed",
        alignItems: "center",
        flexDirection: "row",
    },

    topDone:{
        flex: 1,
        height: 70,
        width: "100%",
        backgroundColor: "#939393",
        alignItems: "center",
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

    bottomDone: {
        flex: 1,
        height: 18,
        width: "100%",
        backgroundColor: "#939393",
        alignItems: "center",
        justifyContent: "center",
        borderBottomWidth: 0.25,
    },

    itemText: {
        maxWidth: "78%",
        width: "78%",
        marginLeft: -30,
        fontSize: 16,
        color: "#7f7f7f",
    },

    itemRed: {
        width: "78%",
        maxWidth: "78%",
        marginLeft: -30,
        fontSize: 16,
        fontWeight: "bold",
        color: "#ff5e5e",
    },

    checkBtn:{
        backgroundColor: "transparent",
        marginLeft: -3,
        borderColor: "transparent",
    },

    //--MODAL---

    todoInfo:{
        height: 30,
        width: 30,
    },


    dateText: {
        fontSize: 12,
        color: "#7f7f7f",
    },



    deleteText: {
        fontSize: 16,
        color: "red",
    },

    saveText: {
        fontSize: 16,
        color: "green",
    },

    deleteButton: {
        width: 70,
        height: 70,
        borderRadius: 100,
        borderColor: "red",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    saveButton: {
        width: 70,
        height: 70,
        borderRadius: 100,
        borderColor: "green",
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
    },

    buttonsView: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "60%",
        height: "10%",
        position: "absolute",
        bottom: 50,
    },

    modalClose: {
        alignSelf: "flex-start",
        marginLeft: 10,
        marginBottom: 15,
        position: "absolute",
        top: 17,
        left: -10,
        backgroundColor: "lightgrey",
        height: "5%",
        width: 70,
    },

    backBtn: {
        height: "100%",
        width: "100%",
        flex: 2,
        marginTop: 10,
    },

    modalText: {
        width: "100%",
        fontSize: 25,
        textAlign: "center",
        backgroundColor: "#ededed",
        padding: 20,
    },

    modal: {
        alignItems: "center",
        justifyContent: "center",
        height: 700,
        display: "flex",
        justifyContent: "flex-start",
    },

    modalItem: {
        width: "100%",
        height: "15%",
        borderBottomWidth: 0.7,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },

    newTodoTitle: {
        //width: "80%",
        height: "100%",
        fontSize: 20,
        backgroundColor: "lightgrey",
        textAlign: "center",
        flex: 8,
        lineHeight: 80,
    },

    newTodoTitleBar: {
      display: "flex",
      flexDirection: "row",
      height: "10%",
      alignItems: "center",
      justifyContent: "center",
    },
});
