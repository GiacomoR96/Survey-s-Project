import React from 'react';
import { Text, View, FlatList, Image, StyleSheet, StatusBar, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import Survey from "./Survey";
import * as firebase from 'firebase';

StatusBar.setHidden(true);

const COLOR_DEFAULT = 'blue';
const SIZE_TITLE = 30;
const defaultList = [];
const defaultTitle = "Nuovo questionario";
let account = { email: " **YOUR EMAIL** ", password: " **YOUR PASSWORD** " };

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

  _saveData = () => {
    // TODO: Salvataggio dati su firebase
    console.log("Salvataggio dati su firebase..");
  }
/*
  _loadInfoUser = async () => {
    await firebase.auth().currentUser.uid.then(result => {
      console.log("1 - ",result);
        this.currentUID = result;
        console.log("2-  ",this.currentUID);
        return true;
      });
    return false;
  }
*/

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
      // TODO : Path da modificare in futuro
      const path = this.state.isLoading ? this.state.path : "/QuestionsQuestionnaires";
      console.log("PATH_> ",path)
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

  _editSurvey = (item) => {
    this.props.navigation.navigate('AddSurvey', { title: item.text, listSurvey : item.array }); 
  }

  _delete = (item) => {
    console.log("Propos PADRE surveyList, item : ",item);
    console.log("Propos PADRE surveyList, ELIMINAZIONE survey!");
  }

  componentWillMount() {
    this.props.navigation.setParams({ addNewSurvey: this._saveData });
    this._login();   
  }

  static navigationOptions = ({navigation}) => {
    return {
        headerStyle: styles.headerStyle,
        headerTintColor: "black",
        headerTitleStyle: styles.headerTitleStyle,
        headerRight: (
            <View style={styles.buttonHeaderRight}>
                <TouchableOpacity 
                  onPress={ () => 
                  navigation.navigate('AddSurvey', { title: defaultTitle, listSurvey: defaultList, addNewSurvey: navigation.state.params.addNewSurvey})}>
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