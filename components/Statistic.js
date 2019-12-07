import React from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

const SIZE_TITLE = 35;

export default class Carrello extends React.Component{

  static navigationOptions = ({navigation}) => {
    return {
        headerStyle: styles.headerStyle,
        headerTintColor: "black",
        headerTitleStyle: styles.headerTitleStyle        
    }
  }

  render() {
    return (
      <View>
        <Text style={styles.text}>Statistica</Text>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#78f7f1",
    height: 65,
  },
  headerTitleStyle: {  
    flex: 1,
    textAlign: "center",    
    marginBottom: 40,
    marginLeft: 70,
    fontSize: SIZE_TITLE,
    //borderWidth: 2,
    //borderColor: "#ffff" 
  },
  text: {
    color: "black",
    fontSize: 20,
  },
})