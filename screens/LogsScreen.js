import React from 'react'
import { StyleSheet, Text, TextInput, View, Button } from 'react-native'
import { SERVER_ADDRESS, SERVER_PORT, CUR_AUTH_USER } from './../utils/Const'

export default class LogsScreen extends React.Component {
    state = {
        logs : [],
        queried: false
    };

    componentDidMount() {
        fetch(`${SERVER_ADDRESS}/${CUR_AUTH_USER.uuid}/logs`).then(response => {
            if (response.ok) {
                return response.json();
            } throw new Error('There was a network failure.');
        }).then(result => {
            console.log(result)
            this.setState({logs : result});
        });
    }

    render() {
        return (
            <View style={styles.container}>
                { this.state.logs.length === 0 ?
                (
                    <Text style="font-size">Loading</Text>
                ) 
                : <Text>{JSON.stringify(this.state.logs)}</Text>
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
});