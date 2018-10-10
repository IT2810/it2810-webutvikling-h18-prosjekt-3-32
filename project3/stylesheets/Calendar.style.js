import {StyleSheet} from "react-native";

export default StyleSheet.create({
    calendarContainer: {
      width: "100%",
      height: "100%",
    },
    agendaContainer: {
      height: "80%"
    },
    addEventButton: {
      position: "absolute",
      width: 70,
      height: 70,
      bottom: 10,
      right: 10,
      backgroundColor: "#5cacec",
      justifyContent: "center",
      borderRadius: 100,
      shadowOffset: { width: 1, height: 1, }, //IOS
      shadowColor: "black", //IOS
      shadowOpacity: 1.0, //IOS
      shadowRadius: 2, //IOS
      elevation: 4, //Android shadow
    },
    addEventText: {
      textAlign:'center',
      color: "white",
    },
    item: {
      backgroundColor: 'white',
      flex: 1,
      borderRadius: 5,
      padding: 10,
      marginRight: 10,
      marginTop: 17
    },
    itemText: {
      fontSize: 17,
      color: "#a0a0a0",
    },
    itemTime: {
      fontSize: 15,
      color: "#a0a0a0",
    },
    emptyDate: {
      height: 15,
      flex:1,
      paddingTop: 30
    },
    agendaContainer: {
      width: "100%",
      height: "80%",
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
        height: "100%",
        display: "flex",
        justifyContent: "flex-start",
        marginTop: 0,
    },

    modalItem: {
        width: "100%",
        height: "15%",
        backgroundColor: "#ededed",
        borderBottomWidth: 0.2,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    textInput: {
        width: "80%",
        height: "12%",
        color: "#a0a0a0",
        fontSize: 18,
    },
    newEventTitle: {
        //width: "80%",
        height: "100%",
        fontSize: 20,
        backgroundColor: "lightgrey",
        textAlign: "center",
        flex: 8,
        lineHeight: 50,
    },
    backBtn: {
        height: "100%",
        flex: 2,
        marginTop: 10,
    },
    newEventTitleBar: {
      display: "flex",
      flexDirection: "row",
      height: "7.5%",
      alignItems: "center",
      justifyContent: "center",
    }
});
