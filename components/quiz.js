import React from "react";
import {StyleSheet, View} from "react-native";
import { getDeck, clearLocalNotification, setLocalNotification } from "../utils/api";
import { Text, Button, Spinner } from 'native-base'
import { withNavigationFocus } from 'react-navigation';


class Quiz extends React.Component {

    state = {
        questions: [],
        deckName: "",
        currentQuestion: 0,
        showAnswer: false,
        correctAnswers: 0,
        quizEnded: false,
    }

    componentWillReceiveProps(){
        if(this.props.isFocused){
            this.refreshQuestions()
        }
    }

    componentWillMount(){
        data = this.props.navigation.getParam("item");

        if (data.questions.length > 0){
            this.setState({deckName: data.title});
            this.setState({questions: data.questions});
            this.refreshQuestions();
        } else {
            this.setState({noQuestions: true})
        }


    }


    refreshQuestions(){
        data = this.props.navigation.getParam("item");
        getDeck(data.title).then((result) => {
            this.setState({deckName: result.title});
            this.setState({questions: result.questions});
        });
    }

    quizEnd(){
        this.setState({quizEnded: true});
        this.refreshQuestions();
        clearLocalNotification()
            .then(setLocalNotification);
    }

    answerIncorrect(){
        if (this.state.currentQuestion + 1 === this.state.questions.length){
            this.quizEnd();
        } else {
            // reset showAnswer to false
            this.setState({showAnswer: false});
            // increment current question
            this.setState({ currentQuestion: this.state.currentQuestion + 1 });
        }
    }

    answerCorrect(){
        // increment correct answer
        this.setState({correctAnswers: this.state.correctAnswers + 1});
        if (this.state.currentQuestion + 1 === this.state.questions.length){
            this.quizEnd();
        } else {
            // reset showAnswer to false
            this.setState({showAnswer: false});
            // increment current question
            this.setState({ currentQuestion: this.state.currentQuestion + 1 });
        }
    }

    showAnswer(){
        this.setState({showAnswer: true});
    }

    startOver(){
        data = this.props.navigation.getParam("item");
        this.setState({
            currentQuestion: 0,
            showAnswer: false,
            correctAnswers: 0,
            quizEnded: false,
        });
    }

    render() {
        if(this.state.questions.length === 0){
            return(
                <View>
                    <Spinner color="blue"/>
                </View>
                    );
        } else if(!this.state.quizEnded){
            return (
                <View style={styles.container}>
                    <Text>Question {this.state.currentQuestion + 1} of {this.state.questions.length}</Text>
                    <Text style={styles.textStyle}>Question: {this.state.questions[this.state.currentQuestion].question}</Text>

                    <Text style={styles.textStyle}>{this.state.showAnswer ? "Answer: " + this.state.questions[this.state.currentQuestion].answer : null}</Text>

                    <View>
                        <Button onPress={() => this.showAnswer()}><Text>Show Answer</Text></Button>
                    </View>
                    <View style={styles.buttonRow}>
                        <Button success onPress={() => this.answerCorrect()}><Text>Correct</Text></Button>
                        <Button danger onPress={() => this.answerIncorrect()}><Text>Incorrect</Text></Button>
                    </View>
                </View>
            );
        } else{
            return (
                <View style={styles.container}>
                    <Text style={styles.textStyle}>Your score is {this.state.correctAnswers} out of {this.state.questions.length}</Text>
                    <Text style={styles.textStyle}>Would you like to repeat the quiz or return to the deck view?</Text>
                    <View style={styles.buttonRow}>
                        <Button danger onPress={() => this.startOver()}><Text>Start Over</Text></Button>
                        <Button success onPress={() => this.props.navigation.goBack()}><Text>Back to Deck</Text></Button>
                    </View>
                </View>
            );
        }

    }
}

Quiz.navigationOptions = ({ navigation }) => ({
    title: navigation.getParam("item").title + " Quiz"
})

export default withNavigationFocus(Quiz);


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 20,
        marginBottom: 20,
    },
    textStyle: {
        textAlign: 'center',
    },
});
