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
    state = {
        Domanda: null,
        A: null,
        B: null,
        C: null,
        D: null,
        Esatta: null,
    }
    selectAnswers = null;

    _isPresent = (value) => {
        if(typeof value != "undefined" && typeof value != "" && value != null && value.length > 0 && value.trim().length > 0) {
            return true;
        }
        return false;
    };

    _load = () => {
        if(this._isPresent(this.props.data.Domanda)) {
            let domanda = this.props.data.Domanda;
            if(domanda.includes(':')) {
                let array = domanda.split(":");
                domanda = array[1].trim();
            } 
            this.setState({Domanda: domanda});
        }
        this._isPresent(this.props.data.A) ? this.setState({A: this.props.data.A}) : {};
        this._isPresent(this.props.data.B) ? this.setState({B: this.props.data.B}) : {};
        this._isPresent(this.props.data.C) ? this.setState({C: this.props.data.C}) : {};
        this._isPresent(this.props.data.D) ? this.setState({D: this.props.data.D}) : {};

        if(this._isPresent(this.props.data.Esatta)) {
            this._isPresent(this.state.Esatta) ? this._setValueAnswers(this.state.Esatta) : this._setValueAnswers(this.props.data.Esatta)
            this.setState({Esatta: this.props.data.Esatta});
        }
    }

    _setValueAnswers = (value) => {
        correctAnswersList.map(current => current.label==value ? this.selectAnswers = current.value : {});
    }

    _changeValueAnswers = (index) => {
        this.selectAnswers = index;
        let result;
        correctAnswersList.map(current => current.value==index ? result=current.label : {});
        this.setState({Esatta: result}, () => this.props.onSaveChangeQuestion(this.state,this.props.data.id));
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
                        onChangeText={(value) => this.setState({Domanda: value})}
                        value={this.state.Domanda}
                        onEndEditing={() => this.props.onSaveChangeQuestion(this.state,this.props.data.id)}
                    />
                    <TouchableOpacity onPress={() => this.props.onDeleteSingleQuestion(this.props.data.id)}>
                        <MaterialIcons name="delete" style={styles.iconDelete} size={DIM_ICON} />
                    </TouchableOpacity>
                </View>
                <View>
                    <View style={[styles.question, this._isPresent(this.state.Esatta) && !(this._isPresent(this.state.A))  ? styles.isInvalid : {}]}>
                        <Text style={styles.responseText}>A: </Text>
                        <TextInput 
                            style={styles.response}
                            placeholder="Inserisci risposta A"
                            placeholderTextColor={COLOR_TEXT}
                            style={styles.inputText}
                            onChangeText={(value) => this.setState({A: value})}
                            value={this.state.A}
                            onEndEditing={() => this.props.onSaveChangeQuestion(this.state,this.props.data.id)}
                        />
                    </View>
                    <View style={[styles.question, this._isPresent(this.state.Esatta) && !(this._isPresent(this.state.B))  ? styles.isInvalid : {}]}>
                        <Text style={styles.responseText}>B: </Text>
                        <TextInput 
                            style={styles.response}
                            placeholder="Inserisci risposta B"
                            placeholderTextColor={COLOR_TEXT}
                            style={styles.inputText}
                            onChangeText={(value) => this.setState({B: value})}
                            value={this.state.B}
                            onEndEditing={() => this.props.onSaveChangeQuestion(this.state,this.props.data.id)}
                        />
                    </View>
                    <View style={[styles.question, this._isPresent(this.state.Esatta) && !(this._isPresent(this.state.C))  ? styles.isInvalid : {}]}>
                        <Text style={styles.responseText}>C: </Text>
                        <TextInput 
                            style={styles.response}
                            placeholder="Inserisci risposta C"
                            placeholderTextColor={COLOR_TEXT}
                            style={styles.inputText}
                            onChangeText={(value) => this.setState({C: value})}
                            value={this.state.C}
                            onEndEditing={() => this.props.onSaveChangeQuestion(this.state,this.props.data.id)}
                        />
                    </View>
                    <View style={[styles.question, this._isPresent(this.state.Esatta) && !(this._isPresent(this.state.D))  ? styles.isInvalid : {}]}>
                        <Text style={styles.responseText}>D: </Text>
                        <TextInput 
                            style={styles.response}
                            placeholder="Inserisci risposta D"
                            placeholderTextColor={COLOR_TEXT}
                            style={styles.inputText}
                            onChangeText={(value) => this.setState({D: value})}
                            value={this.state.D}
                            onEndEditing={() => this.props.onSaveChangeQuestion(this.state,this.props.data.id)}
                        />
                    </View>
                </View>

                <View>
                    <View style= {{flexDirection: 'row'}}>
                        <Text style={styles.responseText}>RISPOSTA CORRETTA: </Text>
                        <Text style={[styles.responseText, {color: COLOR_CORRECT_ANSWERS}]}>{this.state.Esatta}</Text>
                    </View>
                    <RadioForm style={styles.buttonAnswers} formHorizontal={true} animation={true}>
                    {
                        correctAnswersList.map((obj, index) => (
                        <RadioButton labelHorizontal={true} key={index} >
                            <RadioButtonInput
                                obj={obj}
                                index={index}
                                isSelected={this.selectAnswers === index}
                                onPress={() => {
                                    this.state.Domanda == null || this.state.Domanda == '' ? 
                                    Alert.alert('Attenzione','Inserisci il testo della domanda prima di selezionare la risposta!') :
                                    this._changeValueAnswers(index);                                  
                                }}
                                borderWidth={2}
                                buttonInnerColor={COLOR_CORRECT_ANSWERS}
                                buttonOuterColor={this.selectAnswers === index ? COLOR_CORRECT_ANSWERS : '#000'}
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