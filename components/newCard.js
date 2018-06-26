import React from "react";
import {StyleSheet, View} from "react-native";
import { addCardToDeck } from "../utils/api";
import { Input, Item, Text, Button } from 'native-base'


export default class NewCard extends React.Component {

    state = {
        question: "",
        answer: "",
        deckName: "",
    }


    addCard(){
        let data = this.props.navigation.getParam("item");
        let payload = {
            deck: data.title,
            card:{
                question: this.state.question,
                answer: this.state.answer,
            },
        }
        addCardToDeck(payload);
        this.props.navigation.goBack();
    }

    componentWillMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <Item regular style={styles.input}>
                    <Input style={{ textAlign: "center"}} placeholder='Enter Question' onChangeText={(e) => this.setState({"question": e})} value={this.state.question}/>
                </Item>
                <Item regular style={styles.input}>
                    <Input style={{ textAlign: "center"}} placeholder='Enter Answer' onChangeText={(e) => this.setState({"answer": e})} value={this.state.answer}/>
                </Item>
                <Button style={styles.centered} onPress={() => this.addCard()}>
                    <Text>Add Card</Text>
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
