import React from "react";
import {StyleSheet, View} from "react-native";
import { saveDeckTitle, getDecks } from "../utils/api";
import { Input, Item, Text, Button } from 'native-base'
import { clearData } from '../utils/_decks';


export default class NewDeck extends React.Component {

    state = {
        name: ""
    }

    createDeck(name){
        let newDeck = { deck: name};
        saveDeckTitle(newDeck).then(getDecks().then(() => {
            this.setState({"name": ""})
        }))
        this.props.navigation.navigate("Decks");
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.topped}>What is the name of your new deck?</Text>
                <Item regular style={styles.input}>
                    <Input style={{ textAlign: "center"}} placeholder='Enter Deck Name' onChangeText={(e) => this.setState({"name": e})} value={this.state.name}/>
                </Item>

                {this.state.name.length ?
                    <Button style={styles.centered} onPress={() => this.createDeck(this.state.name)}>
                        <Text>Add Deck </Text>
                    </Button> :
                    <Button disabled style={styles.centered} onPress={() => this.createDeck(this.state.name)}>
                        <Text>Add Deck </Text>
                    </Button>}


                <Button style={styles.centered} onPress={() => clearData()}>
                    <Text>Reset to Dummy Data </Text>
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centered: {
        marginLeft: 130,
        marginTop: 20,
    },
    topped: {
      marginBottom: 20,
    },
    input:{
        width: 300,
    },
});
