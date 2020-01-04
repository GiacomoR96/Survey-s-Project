import React from 'react';
import { Text, View, FlatList, Image, StyleSheet, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import Survey from "./Survey";

StatusBar.setHidden(true);

const SIZE_TITLE = 30;
const surveysList = [{ id:1, text :"Prova 1"}, { id:2, text: "Prova 2"}];

export default class SurveysList extends React.Component {
  
  state = {
    surveysList: surveysList || []
  }

  _generateRow = ({ item }) => (
    <Survey data={item} onEditSurvey={() => this._editSurvey(item)} onDeleteSurvey={() => this._delete(item)} />
  );

  _keyExtractor = (item, index) => {
    return String(index);
  };

  _saveData = () => {
    // TODO: Salvataggio dati su firebase
    console.log("Salvataggio dati su firebase..");
  }

  _loadData = () => {
    // TODO: Prendere dati da firebase
    console.log("Prelevamento dati da firebase..")
  }

  componentWillMount() {
    this.props.navigation.setParams({ addNewSurvey: this._saveData });
    //this._loadData();   
  }

  static navigationOptions = ({navigation}) => {
    return {
        headerStyle: styles.headerStyle,
        headerTintColor: "black",
        headerTitleStyle: styles.headerTitleStyle,
        headerRight: (
            <View style={styles.buttonHeaderRight}>
              {/* onPress={ () => navigation.navigate('AddSurvey', { addNewSurvey: navigation.state.params.addNewSurvey,}) */}
                <TouchableOpacity 
                  onPress={ () => 
                  navigation.navigate('AddSurvey', { addNewSurvey: navigation.state.params.addNewSurvey})}>
                  <MaterialIcons name={"add"} size={SIZE_TITLE} color={"black"}/>
                </TouchableOpacity>          
            </View>
        )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.surveysList}
          renderItem={this._generateRow}
          keyExtractor={this._keyExtractor}
        />
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
  container: {
    paddingTop: 15,
  },
  text: {
    color: "black",
    fontSize: 20,
  },
  buttonHeaderRight: {
    marginRight: 10,
    marginBottom: 40,
  }
});