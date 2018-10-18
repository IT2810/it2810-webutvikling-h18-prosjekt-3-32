import {StyleSheet} from "react-native";

export default StyleSheet.create({
    //---------Calendar elements--------
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

    //-------Modal elements----------

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

    todoInfo:{
        height: 30,
        width: 30,
        marginRight: 20,
    },

    modalClose: {
        alignSelf: "flex-start",
        marginLeft: 10,
        marginBottom: 25,
        position: "absolute",
        top: -10,
        left: -10,
        backgroundColor: "#5cacec",
        height: "20%",
        width: 50,
        alignItems: "center",
        justifyContent: "center",
    },

    modalView: {
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.8)",
    },

    modal: {
        alignItems: "center",
        justifyContent: "center",
        height: 460,
        width: "90%",
        display: "flex",
        justifyContent: "flex-start",
        backgroundColor: "#ededed",
        position: "absolute",
        left: "5%",
        top: "15%",
    },

    modalItem: {
        width: "100%",
        height: "20%",
        borderBottomWidth: 0.7,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },

    textInput: {
        width: "100%",
        fontSize: 25,
        textAlign: "center",
        backgroundColor: "#ededed",
        padding: 20,
    },

    newEventTitle: {
        //width: "80%",
        height: "100%",
        fontSize: 20,
        backgroundColor: "#5cacec",
        textAlign: "center",
        flex: 8,
        lineHeight: 70,
        color: "white",
    },

    closeImg: {
      height: 20,
      width: 20,
    },

    newEventTitleBar: {
      display: "flex",
      flexDirection: "row",
      height: "15%",
      alignItems: "center",
      justifyContent: "center",
    }
});
