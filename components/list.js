import React from "react";
import { FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { getDecks } from "../utils/api";
import { Card, CardItem, Spinner, Text } from 'native-base'
import { formatStartingData } from "../utils/_decks";
import { withNavigationFocus } from 'react-navigation';



class List extends React.Component {

    state = {
        data: null,
    }

    _keyExtractor = (item, index) => item.title;

    updateDecks(){
        getDecks().then((result) => {
            if (result === null){
                formatStartingData()
                getDecks().then((result) => this.setState({ data: Object.values(result) }));
            } else {
                this.setState({ data: Object.values(result) })
            }
        })
    }

    componentWillMount(){
        this.updateDecks()
    }

    componentWillReceiveProps(){
        if(!this.props.isFocused){
            this.updateDecks()
        }
    }

    componentDidMount() {
        getDecks().then((result) => this.setState({ data: Object.values(result) }));

        getDecks().then((result) => {
            if (result === null) {
                formatStartingData();
            }
        });
    }

    render() {
        if (this.state.data != null) {
            return (
                <FlatList
                    data={this.state.data}
                    renderItem={(item) => <Card>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Deck', { title:`${item.item.title}`, item })}>
                            <CardItem style={styles.card}>
                                <Text>
                                    Title: {item.item.title}
                                </Text>
                                <Text>
                                    Number of cards: {item.item.questions.length}
                                </Text>
                            </CardItem>
                        </TouchableOpacity>
                    </Card>}
                    keyExtractor={this._keyExtractor}
                    style={styles.listStyle}
                    listRefresh={this.updateDecks}
                />
            );
        } else {
            return (
              <Spinner color="blue"/>
            );
        }
    }
}

export default withNavigationFocus(List);

const styles = StyleSheet.create({
    card: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
    },
    listStyle: {
        marginTop: 30,
    },
    buttonStyle: {
        marginLeft: 110,
    },
    viewStyle:{
        flex: 1,
        flexDirection: "column",
    },
});
