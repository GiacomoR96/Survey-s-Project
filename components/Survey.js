import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';

StatusBar.setHidden(true);

const DIM_ICON = 24;

export default class Survey extends Component {
    render() {
        return (
            <View style={styles.row}>
                <TouchableOpacity onPress={this.props.onDeleteSurvey}>
                    <MaterialIcons name="delete" style={styles.iconDelete} size={DIM_ICON} />
                </TouchableOpacity>
                <Text style={styles.text}>{this.props.data.text}</Text>
                <TouchableOpacity onPress={this.props.onEditSurvey}>
                    <MaterialIcons name="chevron-right" style={styles.iconChevron} size={DIM_ICON} />
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    row: {
        borderRadius: 15,
        flexDirection: "row",
        height: 60,
        borderWidth: 2,
        borderColor: "blue",
        marginLeft: 10,
        marginRight: 10,
        padding: 10,
        backgroundColor: "#7CE2CE",
        alignItems: "center",
        marginBottom:15
    },
    iconDelete: {
        color: "red",
        paddingLeft: 5
    },
    text: {
        flex: 1,
        fontSize: 20,
        marginLeft: 10,
        color: "black"
    },
    iconChevron: {
        color: "black",
        paddingLeft: 5
    },
});