import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation';
import { StatusBar } from "react-native";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';
import SurveysList from "./components/SurveysList";
import Statistic from "./components/Statistic";
import * as firebase from 'firebase';

StatusBar.setHidden(true);

const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  
  if (routeName === 'Questionari') {
    return <AntDesign name={"form"} size={30} color={tintColor} />;
  }
  return <MaterialIcons name={"data-usage"} size={35} color={tintColor}/>
};

const SurveysListStack = createStackNavigator({
  SurveysList: {
      screen: SurveysList,
      navigationOptions: {
        headerTitle: 'Lista Questionari',
      },
    },
    /* Questa parte e' dedicata agli altri screen riguardanti la creazione dei nuovi questionari 
    Details: {
      screen: Example,
      navigationOptions: {
        headerTitle: 'Details',
        headerStyle: {}
      },
    },*/
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