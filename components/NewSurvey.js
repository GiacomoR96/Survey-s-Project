import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, TextInput, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import { MaterialIcons } from '@expo/vector-icons';

StatusBar.setHidden(true);

const COLOR_DEFAULT = "blue";
const COLOR_TEXT = "black";
const COLOR_CORRECT_ANSWERS = '#2ecc71';
const DIM_ICON = 24;
const SIZE_TITLE = 35;
const correctAnswersList = [ 
    {label: 'A', value: 0},
    {label: 'B', value: 1},
    {label: 'C', value: 2},
    {label: 'D', value: 3},
];
selectAnswers = null;

/* Example obj = {
      "Domanda": "DOMANDA N. 1",
      "A": "Risposta A",
      "B": "Risposta B",
      "C": "Risposta C",
      "D": "Risposta D",
      "Esatta": "A"
    },
*/

export default class NewSurvey extends Component {
    // TODO: Valutare se da sostituire con '' + effettuare refactoring  
    state = {
        domanda: null,
        A: null,
        B: null,
        C: null,
        D: null,
        esatta: null,
    }

    _isSelect = (obj) => {
        return obj.value === selectAnswers;
    }

    _load = () => {
        this.props.data.domanda != null || this.props.domanda != '' ? this.setState({domanda: this.props.data.domanda}) : {};
        this.props.data.A != null || this.props.A != '' ? this.setState({A: this.props.data.A}) : {};
        this.props.data.B != null || this.props.B != '' ? this.setState({B: this.props.data.B}) : {};
        this.props.data.C != null || this.props.C != '' ? this.setState({C: this.props.data.C}) : {};
        this.props.data.D != null || this.props.D != '' ? this.setState({D: this.props.data.D}) : {};
        this.props.data.esatta != null && selectAnswers == null ? this.setState({esatta: this.props.data.esatta}) : {};
    }

    _changeValueAnswers = (index) => {
        selectAnswers = index;
        let result = correctAnswersList.filter(this._isSelect);
        this.setState({esatta: result[0].label});
    }

    componentWillMount() {
        this._load();        
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.responseText}>DOMANDA: </Text>
                    <TextInput
                        placeholder="Inserisci qui la domanda.."
                        placeholderTextColor={COLOR_TEXT}
                        style={styles.inputText}
                        onChangeText={(value) => this.setState({domanda: value})}
                        value={this.state.domanda}
                    />
                    <TouchableOpacity onPress={() => console.log("DELETE SELECT SURVEY!")}>
                        <MaterialIcons name="delete" style={styles.iconDelete} size={DIM_ICON} />
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={[styles.question, this.state.esatta != '' && (this.state.A == null || this.state.A == '')  ? styles.isInvalid : {}]}>
                        <Text style={styles.responseText}>A: </Text>
                        <TextInput 
                            style={styles.response}
                            placeholder="Inserisci risposta A"
                            placeholderTextColor={COLOR_TEXT}
                            style={styles.inputText}
                            onChangeText={(value) => this.setState({A: value})}
                            value={this.state.A}
                        />
                    </View>
                    <View style={[styles.question, this.state.esatta != '' && (this.state.B == null || this.state.B == '')  ? styles.isInvalid : {}]}>
                        <Text style={styles.responseText}>B: </Text>
                        <TextInput 
                            style={styles.response}
                            placeholder="Inserisci risposta B"
                            placeholderTextColor={COLOR_TEXT}
                            style={styles.inputText}
                            onChangeText={(value) => this.setState({B: value})}
                            value={this.state.B}
                        />
                    </View>
                    <View style={[styles.question, this.state.esatta != '' && (this.state.C == null || this.state.C == '')  ? styles.isInvalid : {}]}>
                        <Text style={styles.responseText}>C: </Text>
                        <TextInput 
                            style={styles.response}
                            placeholder="Inserisci risposta C"
                            placeholderTextColor={COLOR_TEXT}
                            style={styles.inputText}
                            onChangeText={(value) => this.setState({C: value})}
                            value={this.state.C}
                        />
                    </View>
                    <View style={[styles.question, this.state.esatta != '' && (this.state.D == null || this.state.D == '')  ? styles.isInvalid : {}]}>
                        <Text style={styles.responseText}>D: </Text>
                        <TextInput 
                            style={styles.response}
                            placeholder="Inserisci risposta D"
                            placeholderTextColor={COLOR_TEXT}
                            style={styles.inputText}
                            onChangeText={(value) => this.setState({D: value})}
                            value={this.state.D}
                        />
                    </View>
                </View>

                <View>
                    <View style= {{flexDirection: 'row'}}>
                        <Text style={styles.responseText}>RISPOSTA CORRETTA: </Text>
                        <Text style={[styles.responseText, {color: COLOR_CORRECT_ANSWERS}]}>{this.state.esatta}</Text>
                    </View>
                    <RadioForm style={styles.buttonAnswers} formHorizontal={true} animation={true}>
                    {
                        correctAnswersList.map((obj, index) => (
                        <RadioButton labelHorizontal={true} key={index} >
                            <RadioButtonInput
                                obj={obj}
                                index={index}
                                isSelected={selectAnswers === index}
                                onPress={() => {
                                    this.state.domanda == null || this.state.domanda == '' ? 
                                    Alert.alert('Attenzione','Inserisci il testo della domanda prima di selezionare la risposta!') :
                                    this._changeValueAnswers(index);                                  
                                }}
                                borderWidth={2}
                                buttonInnerColor={COLOR_CORRECT_ANSWERS}
                                buttonOuterColor={selectAnswers === index ? COLOR_CORRECT_ANSWERS : '#000'}
                                buttonSize={30}
                                buttonOuterSize={50}
                                buttonStyle={{}}
                            />
                            <RadioButtonLabel
                                obj={obj}
                                index={index}
                                labelHorizontal={true}
                                onPress={() => {}}              
                                labelStyle={{fontSize: 20, fontWeight: 'bold', color: COLOR_DEFAULT}}
                                labelWrapStyle={{}}
                            />
                        </RadioButton>
                        ))
                    }
                </RadioForm>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 375,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: COLOR_DEFAULT,
        margin: 10,
        padding: 10,
        backgroundColor: "#E2E2E2",
        //alignItems: "flex-start",
        //justifyContent: "space-between"
    },
    title: {
        flexDirection: "row",
        height: 50,
        alignItems: "center",
    },
    responseText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginRight: 20,
    },
    question: {
        flexDirection: "row",
        height: 50,
        alignItems: "center",
        margin: 2
    },
    isInvalid: {
        borderWidth: 1,
        borderColor: "red",
        borderRadius: 15,
    },
    isCorrect: {
        borderWidth: 2,
        borderColor: "green"
    },
    buttonAnswers: {
        justifyContent: "space-around"
    },
    inputText: {
        flex: 1
    },
    iconDelete: {
        color: "red",
        padding: 5
    },
    correctAnswers: {
        color: '#2ecc71'
    }
});