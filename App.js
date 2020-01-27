import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { StatusBar } from "react-native";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import SurveysList from "./components/SurveysList";
import Statistic from "./components/Statistic";
import AddSurvey from "./components/AddSurvey";
import * as firebase from 'firebase';

StatusBar.setHidden(true);
const SIZE_ICON = 35;

var firebaseConfig = {
  /* YOUR FIREBASE CONFIGURATIONS */
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : null;

/*
// TODO: Add dynamics login
_login = () => {
  this.setState({ isLoading: true }, () =>{
    firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(user => {
        this.setState({ isLoading: false });
        console.log("LOGIN: ",user);
        this.props.navigation.navigate("TodoList");
      })
      .catch(error => {
        this.setState({ isLoading: false, error: error.message });
        //alert(error.message);
      });
  });
};*/


const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  
  if (routeName === 'Questionari') {
    return <AntDesign name={"form"} size={SIZE_ICON} color={tintColor} />;
  }
  return <MaterialIcons name={"data-usage"} size={SIZE_ICON} color={tintColor}/>
};

const SurveysListStack = createStackNavigator({
  SurveysList: {
      screen: SurveysList,
      navigationOptions: {
        headerTitle: 'Lista Questionari',
      },
  },
  AddSurvey: {
    screen: AddSurvey
  }
});
  
const StatisticStack = createStackNavigator({
  Statistic: {
      screen: Statistic,
      navigationOptions: {
        headerTitle: 'Statistica',
      },
    },
    /* Questa parte e' dedicata agli altri screen riguardante la gestione della statistica dei vari questionari 
    Details: {
      screen: Example,
      navigationOptions: {
        headerTitle: 'Details',
        headerStyle: {}
      },
    },*/
});

const TabNavigator = createBottomTabNavigator( 
  {
    Questionari: SurveysListStack,
    Statistica: StatisticStack
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
    }),
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'black',
      style:{
        height: 65,
        backgroundColor: "#78f7f1"
        //fontSize: 0,
        //backgroundColor: "#35f3ea"
      } 
     
    },
  }
);

export default createAppContainer(TabNavigator);