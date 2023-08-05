export default {
	COLORS: {    
		DEFAULT: '#DCDCDC',
    PRIMARY: '#9C26B0',
    LABEL: '#FE2472',
    INFO: '#00BCD4',
    ERROR: '#F44336',
    SUCCESS: '#4CAF50',
    WARNING: '#FF9800',
    MUTED: '#979797',
    INPUT: '#DCDCDC',
    ACTIVE: '#9C26B0',
    BUTTON_COLOR: '#9C26B0',
    PLACEHOLDER: '#9FA5AA',
    SWITCH_ON: '#9C26B0',
    SWITCH_OFF: '#D4D9DD',
    GRADIENT_START: '#6B24AA',
    GRADIENT_END: '#AC2688',
    PRICE_COLOR: '#EAD5FB',
    BORDER_COLOR: '#E7E7E7',
    BLOCK: '#E7E7E7',
    ICON: '#4A4A4A',
	},
	SIZES: {
    BLOCK_SHADOW_RADIUS: 2,
  },
	STYLE: {
		container: {
      backgroundColor: "#ffffff",
      flex: 1,
      //justifyContent: "center",
      //alignItems: "center",
      flexDirection: "column",
      paddingLeft: 20,
      paddingRight: 20,
		},
    header: {
        marginTop: 60,
        marginBottom: 20,
        alignItems: "center",
        //flex: 1,
        flexDirection: "column",
    },
    headerText: {
      textAlign: "center",
      color:"#0055d2",
      fontSize: 40,
      fontWeight: "bold"
    },
    sub: {
      marginTop: 20,
      flexDirection: "row",
      alignItems: "center",
    },
    leftHalf: {
        alignItems: "center",
        height: 60,
        flex: 1,
        flexDirection: "row",
        marginLeft: 'auto',
    },
    rightHalf: {
      alignItems: "center",
      height: 60,
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
      marginRight: 0
    },
    textInput: {
      //marginTop: 20,
      //flex: 1,
      //borderRadius: 10,
      backgroundColor: "#FFFFFF",
    },
    errorText: {
      //backgroundColor: "#FFFF00",
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      //justifyContent: "center",
      height: 40,
    },
    button: {
      justifyContent: "center",
      flex: 1,
      //borderRadius: 5,
    },

    divider: {
      marginTop: 30,
    }
	}
}