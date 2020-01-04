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
    screen: AddSurvey,
    navigationOptions: {
      headerTitle: 'Nuovo questionario'
    }
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