import React, {useEffect} from "react";
import {View, StyleSheet} from "react-native";
import {Text} from "react-native-paper";

const AuthFooter = () => {
  useEffect(() => {

  }, []);

  return (
    <View style={styles.bottom}>
      <Text style={{textAlign: "center", color: "#272727"}}>
        By using URM, you accepted UR Market&apos;s
        <Text style={{color: "#0362e0"}}> Terms of Service </Text>and
        <Text style={{color: "#0362e0"}}> Privacy Policy.</Text>
      </Text>
    </View>
  );
};


const styles = StyleSheet.create({
  bottom: {
    marginTop: 80,
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: 360,
  },
});
export default AuthFooter;
