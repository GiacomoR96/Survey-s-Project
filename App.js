import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { StatusBar, YellowBox } from "react-native";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import SurveysList from "./components/SurveysList";
import Statistic from "./components/Statistic";
import AddSurvey from "./components/AddSurvey";
import * as firebase from 'firebase';

YellowBox.ignoreWarnings(['Setting a timer']);
YellowBox.ignoreWarnings(['Warning']);
StatusBar.setHidden(true);
const SIZE_ICON = 35;

var firebaseConfig = {
  apiKey: "AIzaSyAmg53UHB-tdKwfFlHDo7XEDud7tKkCRFY",
  authDomain: "survey-s-project.firebaseapp.com",
  databaseURL: "https://survey-s-project.firebaseio.com",
  projectId: "survey-s-project",
  storageBucket: "survey-s-project.appspot.com",
  messagingSenderId: "272290505001",
  appId: "1:272290505001:web:e7e6193e892ce58e485738",
  measurementId: "G-PQZHK09SQK"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : null;

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
    }
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
      }
    },
  }
);

export default createAppContainer(TabNavigator);