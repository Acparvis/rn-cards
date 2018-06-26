import React from "react";
import {StyleSheet, View} from "react-native";
import {clearLocalNotification, getDeck, setLocalNotification} from "../utils/api";
import { Text, Button } from 'native-base';
import { withNavigationFocus } from 'react-navigation';


class DeckView extends React.Component {

    state = {
        title: "",
        questions: [],
    }

    componentWillMount(){
        this.getDeckData()

        clearLocalNotification()
            .then(setLocalNotification);
    }

    componentWillReceiveProps(){
        if(!this.props.isFocused){
            this.getDeckData()
        }
    }


    getDeckData(){
        let data = this.props.navigation.getParam("item");
        getDeck(data.item.title).then((result) => {
            this.setState({"title": result.title});
            this.setState({"questions": result.questions});
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.topped}>{this.state.title}</Text>
                <Text style={styles.topped}>{this.state.questions.length} Cards</Text>
                <View style={styles.buttonCont}>
                    <Button success onPress={() => this.props.navigation.navigate("AddCard", this.props.navigation.getParam("item") )}><Text>Add Card</Text></Button>

                    {this.state.questions.length > 0 ? <Button onPress={() => this.props.navigation.navigate("Quiz", this.props.navigation.getParam("item") )}><Text>Start Quiz</Text></Button> :
                        <Button disabled onPress={() => this.props.navigation.navigate("Quiz", this.props.navigation.getParam("item") )}><Text>Start Quiz</Text></Button>}

                </View>
            </View>
        );
    }
}

DeckView.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("title")
})

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    topped: {
        marginBottom: 20,
    },
    buttonCont: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});


export default withNavigationFocus(DeckView);
