import React from 'react';
import { StyleSheet, AsyncStorage } from 'react-native';
import List from './components/list';
import NewDeck from './components/newDeck';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import DeckView from "./components/deckView";
import NewCard from "./components/newCard";
import Quiz from "./components/quiz";
import {clearLocalNotification, setLocalNotification} from './utils/api';


const Stack = createStackNavigator({
    ListView: {
        screen: List,
        navigationOptions: {
            title: "Decks",
        }
    },
    Deck: {
        screen: DeckView,
        },
    AddCard: {
        screen: NewCard
    },
    Quiz: {
        screen: Quiz
    },
})


const Tabs = createBottomTabNavigator({
    Decks: {
        screen: Stack
    },
    "Add Deck": {
        screen: NewDeck,
    },
});


export default class App extends React.Component {

    componentDidMount(){
        setLocalNotification();
    }

  render() {
    return (
        <Tabs />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
