import React from 'react';
import { Text, View, FlatList, Image, StyleSheet, StatusBar, ActivityIndicator, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import Survey from "./Survey";
import * as firebase from 'firebase';

StatusBar.setHidden(true);

const COLOR_DEFAULT = 'blue';
const SIZE_TITLE = 30;
const defaultList = [];
const defaultTitle = "Nuovo questionario";
let account = { email: "nuovo@gmail.com", password: "pippo1234" };

export default class SurveysList extends React.Component {
  state = {
    surveysList: [],
    isLoading: false
  }

  _generateRow = ({ item }) => (
    <Survey data={item} onEditSurvey={() => this._editSurvey(item)} onDeleteSurvey={() => this._delete(item)} />
  );

  _keyExtractor = (item, index) => {
    return String(index);
  };

  _idExtractor = (item, index) => {
    return index;
  };

  _generateKey = () => {
    if(typeof listSurvey != "undefined" && typeof listSurvey != "[]" && listSurvey != null && listSurvey.length != null && listSurvey.length > 0) {
      let newListSurvey = this.state.listSurvey;
      newListSurvey.map((obj, index) => {
          obj.id = this._idExtractor(obj,index)
      });
      this.setState({listSurvey: newListSurvey, isLoading: true});
    }
  }

  _login = async () => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(account.email, account.password)
      .then(user => {
        console.log("Avvio il caricamento dei dati da FIREBASE!");
        this._loadData();
      })
  }

  _loadData = async() => {
    console.log("Prelevamento dati da firebase..");

    const currentUID = firebase.auth().currentUser.uid;
    if(currentUID){
      const path = this.state.isLoading ? this.state.path : "/QuestionsQuestionnaires";
      this.setState({ path: path }); 

      let newSurveysLists = [];
      let numberItem = 0;
      await firebase.database().ref("QuestionsQuestionnaires").on("value", result =>{
        result.forEach( element => {
          newSurveysLists.push({text: element.key, ...element.val()});
          numberItem++;
          if(newSurveysLists.length === numberItem) {
            this.setState({surveysList: newSurveysLists}, () => this._generateKey())
          }
        });
      });

    } else {
      console.log("Non riesco a caricare i dati da firebase..");
    }

  }

  _reloadData = () => {
    this.setState({surveysList:defaultList}, () =>this._loadData());
  }

  _editSurvey = (item) => {

    if(typeof item.array != "undefined" && typeof item.array != "[]" && typeof item.array != "null" && item.array != null && item.array.length > 0
        && Array.isArray(item.array)) {

      this.props.navigation.navigate('AddSurvey', { title: item.text, listSurvey : item.array, onSaveComplete: () =>this._reloadData()});
    } else {
      let ris = item[Object.keys(item)[1]];
      let result = ris[Object.keys(ris)[0]];

      this.props.navigation.navigate('AddSurvey', { title: item.text, listSurvey : result, onSaveComplete: () =>this._reloadData()}); 
    }
  }

  _delete = (item) => {
    let elementSelected;

    if(typeof item.array != "undefined" && typeof item.array != "[]" && typeof item.array != "null" && item.array != null && item.array.length > 0
        && Array.isArray(item.array)) {

          elementSelected = item.array;
    } else{
      let ris = item[Object.keys(item)[1]];
      elementSelected = ris[Object.keys(ris)[0]];
    }

    if(elementSelected.length == 0) {
      firebase.database().ref("QuestionsQuestionnaires").child(item.text).remove().then(this._loadData());

    } else {
      Alert.alert('Errore','Non puoi eliminare un questionario popolato!\nElimina prima le domande al suo interno!');
    }
  }

  componentWillMount() {
    this.props.navigation.setParams({ addNewSurvey: this._saveData, onSaveComplete : () => this._reloadData() });
    this._login();
  }

  static navigationOptions = ({navigation}) => {
    var onSave = navigation.getParam("onSaveComplete");
    return {
        headerStyle: styles.headerStyle,
        headerTintColor: "black",
        headerTitleStyle: styles.headerTitleStyle,
        headerRight: (
            <View style={styles.buttonHeaderRight}>
                <TouchableOpacity 
                  onPress={ () => 
                  navigation.navigate('AddSurvey', { title: defaultTitle, listSurvey: defaultList, addNewSurvey: navigation.state.params.addNewSurvey, onSaveComplete: onSave})}>
                  <MaterialIcons name={"add"} size={SIZE_TITLE} color={"black"}/>
                </TouchableOpacity>          
            </View>
        )
    }
  }

  render() {
    return (
      <View style={styles.container}>
      {   this.state.surveysList.length == 0 ?
            <ActivityIndicator style={styles.spinner} size="large" color={COLOR_DEFAULT} />
            :
          <View style={styles.showList}>
            <FlatList
              data={this.state.surveysList}
              renderItem={this._generateRow}
              keyExtractor={this._keyExtractor}
            />
          </View>
      }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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
  },
  showList: {
    paddingTop: 15,
  },
  text: {
    color: "black",
    fontSize: 20,
  },
  buttonHeaderRight: {
    marginRight: 10,
    marginBottom: 40,
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});