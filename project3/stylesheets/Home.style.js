import {StyleSheet} from "react-native";

export default StyleSheet.create({
    container: {
        height: "100%",
        width: "100%",
        borderRadius: 4,
    },

    homeItem: {
        height: "8%",
        width: "100%",
        backgroundColor: "#5cacec",
        alignItems: "center",
        justifyContent: "center",
    },

    homeItemText: {
        fontSize: 18,
        color: "white",
    },

    list:{
        width:"100%",
        borderBottomWidth: 0.5,
    },

    listItem:{
        width:"100%",
        height: 140,
        backgroundColor: "red",

    },
    refreshButtonView: {
      padding: 10,
      borderBottomWidth: 0.5,
      position: "absolute",
      bottom: 0,
      width: "100%",
    },

});
