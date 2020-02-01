import React from 'react';
import { Text, View, FlatList, Image, StyleSheet, ActivityIndicator } from 'react-native';
import SurveyDetail from "./SurveyDetail";
import * as firebase from 'firebase';

const COLOR_DEFAULT = 'blue';
const SIZE_TITLE = 35;
let account = { email: "nuovo@gmail.com", password: "pippo1234" };

export default class Statistic extends React.Component{
  state = {
    listSurvey: [],
    isLoading: false
  }

  _generateRow = ({ item }) => (
    <SurveyDetail data={item} />
  );

  _keyExtractor = (item, index) => {
    return String(index);
  };

  _idExtractor = (item, index) => {
    return index;
  };

  _isObjPresent = (value) => {
    if(typeof value != "undefined" && typeof value != "" && typeof value != "null" && value != null) {
        return true;
    }
    return false;
};

  _generateKey = () => {
    if(typeof listSurvey != "undefined" && typeof listSurvey != "[]" && listSurvey != null && listSurvey.length != null && listSurvey.length > 0) {
      let newListSurvey = this.state.listSurvey;
      newListSurvey.sort();
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
        this._populateList();
      })
  }

  _populateList = () => {
    console.log("Popolamento lista...");
  
    const currentUID = firebase.auth().currentUser.uid;
    if(currentUID){

      let newSurveysLists = [];
      let numberItem = 0;
      firebase.database().ref("QuestionsQuestionnaires").on("value", result => {
        result.forEach( element => {
          let obj = {
            title: element.key,
            numberQuestion: 0,
            totalScore: 0,
            numerPerson: 0
          }
          let current = element.val();

          if(Array.isArray(current.array)) {
            obj.numberQuestion = current.array.length;
          } else {
            obj.numberQuestion = Object.values(current.array).length;
          }
          newSurveysLists.push(obj);

        });
        this._loadData(newSurveysLists);
      });
  
    } else {
      console.log("Non riesco a caricare i dati da firebase..");
    }
  
  }

 _loadData = (newSurveysLists) => {
  console.log("Prelevamento dati da firebase..");

  const currentUID = firebase.auth().currentUser.uid;
  if(currentUID){

    let numberItem = 0;
    firebase.database().ref("users").on("value", result =>{
      result.forEach( element => {
        let data = Object.values(element.val().ResultQuestionnaires);
        data.forEach( value => {
          let current = Object.values(value)[0];
          if( (typeof current === "object" || typeof current === 'function') && (current !== null) ) {

            let valTitle = current.Codice_test;
            let valueTitle = valTitle.concat("_").concat(current.Nome_test);
            newSurveysLists.forEach(elementList => {

              if(elementList.title == valueTitle){
                elementList.numerPerson = elementList.numerPerson + 1;
                elementList.totalScore = elementList.totalScore + current.punteggio;
              }
            });
          }
        });

      });
      this.setState({listSurvey: newSurveysLists});
    });
  } else {
    console.log("Non riesco a caricare i dati da firebase..");
  }

  }

  static navigationOptions = ({navigation}) => {
    return {
        headerStyle: styles.headerStyle,
        headerTintColor: "black",
        headerTitleStyle: styles.headerTitleStyle        
    }
  }

  componentWillMount() {
    this._login();
  }

  render() {
    return (
      <View style={styles.container}>
      {   this.state.listSurvey.length == 0 ?
            <ActivityIndicator style={styles.spinner} size="large" color={COLOR_DEFAULT} />
            :
          <View style={styles.showList}>
          <FlatList
              data={this.state.listSurvey}
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
    height: 65
  },
  headerTitleStyle: {  
    flex: 1,
    textAlign: "center",    
    marginBottom: 40,
    marginLeft: 70,
    fontSize: SIZE_TITLE,
    marginRight: 45
  },
  text: {
    color: "black",
    fontSize: 20
  },
  showList: {
    paddingTop: 15
  },
  spinner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})