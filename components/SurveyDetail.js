import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Entypo } from '@expo/vector-icons';

StatusBar.setHidden(true);

const DIM_ICON = 24;

export default class SurveyDetail extends Component {
    render() {
        return (
            <View style={styles.row}>
                <View style={styles.title}>
                    <Text style={styles.text}>{this.props.data.title}</Text>
                </View>
                <View style={styles.box}>
                    <View style={{flex: 1, justifyContent:"space-around"}}>
                        <Entypo name={"dot-single"} size={DIM_ICON} color={"black"}>
                            <Text style={styles.text}> PARTECIPANTI: {this.props.data.numerPerson}</Text>
                        </Entypo>
                        <Entypo name={"dot-single"} size={DIM_ICON} color={"black"}>
                            <Text style={styles.text}> N. DOMANDE: {this.props.data.numberQuestion}</Text>
                        </Entypo>
                    </View>
                    <View style={styles.boxAvg}>
                        <View style={{flexDirection: "row"}}>
                            <Text style={styles.text}>MEDIA</Text>
                        </View>
                        <View style={{flexDirection: "row",alignItems: "center"}}>
                            <Text style={styles.text}>{this.props.data.totalScore}</Text>
                            <Text style={styles.text}>/</Text>
                            <Text style={styles.text}>{this.props.data.numberQuestion*this.props.data.numerPerson}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        borderRadius: 15,
        height: 300,
        borderWidth: 2,
        borderColor: "blue",
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        backgroundColor: "#7CE2CE",
        alignItems: "center",
        marginBottom:15
    },
    text: {
        fontSize: 16,
        marginLeft: 10,
        color: "black"
    },
    title: {
        flexDirection: "row",
        alignItems: "center",
        paddingBottom: 35
    },
    box: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    boxAvg: {
        flex: 1,
        borderWidth:1,
        borderColor:"black",
        justifyContent:"space-around",
        alignItems:"center",
        margin: 15,
        borderRadius: 15
    }
});