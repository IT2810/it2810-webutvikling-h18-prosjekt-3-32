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
        top: 0,
        left: -10,
        backgroundColor: "#5cacec",
        height: "20%",
        width: 50,
        alignItems: "center",
        justifyContent: "center",
    },

    closeImg: {
        height: 20,
        width: 20
    },

    modalText: {
        width: "90%",
        marginTop: "3%",
        borderWidth: 0.7,
        fontSize: 20,
        textAlign: "center",
        backgroundColor: "#ededed",
        padding: 20,
    },

    modalView: {
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.8)",
    },

    modal: {
        alignItems: "center",
        height: 360,
        width: "90%",
        display: "flex",
        justifyContent: "flex-start",
        backgroundColor: "#ededed",
        position: "absolute",
        left: "5%",
        top: "25%",
    },


    modalItem: {
        width: "100%",
        height: "25%",
        borderBottomWidth: 0.7,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },

    newTodoTitle: {
        //width: "80%",
        height: "100%",
        fontSize: 20,
        backgroundColor: "#5cacec",
        textAlign: "center",
        flex: 8,
        lineHeight: 70,
        color: "white",
    },

    newTodoTitleBar: {
      display: "flex",
      flexDirection: "row",
      height: "20%",
      alignItems: "center",
      justifyContent: "center",
    },
});
