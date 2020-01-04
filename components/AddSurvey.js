import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, FlatList, Button, Alert, AsyncStorage, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import NewSurvey from "./NewSurvey";

StatusBar.setHidden(true);

const COLOR_DEFAULT = "blue";
const SIZE_TITLE = 30;
const SIZE_ICON = 35;
const listSurvey= [ { domanda: '', A:'', B:'', C:'', D:'', esatta:'' } ];

export default class AddSurvey extends Component {
    state = {
        listSurvey: listSurvey || [],
        isLoading: false
    }

    _generateSurvey = ({ item }) => {
        return <NewSurvey data={ item }  />
    };

    _keyExtractor = (item, index) => {
        return String(index);
    };
    
    _idExtractor = (item, index) => {
        return index;
    };

    _add = () => {
        // TODO: Da rivedere considerando this._generateID
        let newObject = {
            domanda: "",
            A: "",
            B: "",
            C: "",
            D: "",
            esatta: ""
        }
        let newList = this.state.listSurvey;
        newList.push(newObject);
        this._storeData(newList);
    }

    // Funzione attraverso il quale si crea un record dinamico nel caso in cui non sono presenti record nel Database
    /*_checkLoad = () =>{
        if(this.state.listSurvey.length === 0){
            let newListSurvey = [{domanda: "", A:"", B:"", C:",", D:",", esatta:""}]
            this.setState({listSurvey:newListSurvey});
        }
    }*/

    async _storeData(newListSurvey) {
        console.log("Salvataggio dati con AsyncStorage...");
        this.setState({ listSurvey: newListSurvey });

        try {
            await AsyncStorage.setItem('listSurvey', JSON.stringify(newListSurvey));
        } catch (error) {
            console.log('Errore nello salvataggio dei dati!');
        }
        this._loadData();
    }

    _generateID = () => {
        let newListSurvey = this.state.listSurvey;
        newListSurvey.map((obj, index) => {
            obj.id = this._idExtractor(obj,index)
        });
        this.setState({listSurvey: newListSurvey, isLoading: true}, () => console.log("VALORE FINALE LISTA: ",this.state));
    }

    async _loadData() {
        const response = await AsyncStorage.getItem('listSurvey');
        this.setState({
            listSurvey: response ? await JSON.parse(response) : listSurvey
        },this._generateID);
    }

    _getSizeList = () => {
        if(this.state.listSurvey.length > 0) {
            return true;
        }
        return false;
    }

    componentWillMount() {
        console.log("-------------------------------------------------------------");
        console.log("Ricarico..");
       this._loadData();
    }

    /*
        headLeft: (
                <View style={styles.buttonHeaderLeft}>
                    <TouchableOpacity 
                      onPress={ () => 
                        this.props.navigation.goBack(null)}>
                      <MaterialIcons name={"arrow-back"} size={SIZE_TITLE} color={"black"}/>
                    </TouchableOpacity>          
                </View>
            ), 
    */

    static navigationOptions = ({navigation}) => {
        return {
            headerStyle: styles.headerStyle,
            headerTintColor: "black",
            headerTitleStyle: styles.headerTitleStyle,
        }
    }
    
    render() {
        console.log("Render: ",this.state);
        return (
            <View>
                <View>
                    <TouchableOpacity 
                        style={styles.buttonAddSurvey}
                        onPress= {() => this._add()}>
                        <MaterialIcons name={"note-add"} color={COLOR_DEFAULT} size={SIZE_ICON}/>
                        <Text>Inserisci domanda</Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.scrollMenu}>
                    <FlatList
                        data={this.state.listSurvey}
                        renderItem={this._generateSurvey}
                        keyExtractor={this._keyExtractor}
                    />
                    { // TODO: Inserire pulsanti nel messaggio 'Salvataggio dati' per confermare o annullare l'operazione 
                        this._getSizeList() ?
                        <View style={styles.buttonSave}>
                            <Button
                                title="Salva questionario"
                                onPress={() => Alert.alert('Salvataggio dati','Confermi il salvataggio dei seguenti dati?')}
                            />
                        </View>
                        : {}
                    }
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerStyle: {
        backgroundColor: "#78f7f1",
        height: 65,
    },
    buttonHeaderLeft: {
        marginLeft: 10,
        marginBottom: 40,
    },
    headerTitleStyle: {  
        flex: 1,
        textAlign: "center",    
        marginBottom: 40,
        marginRight: 70,
        fontSize: SIZE_TITLE,
    },
    scrollMenu: {
        marginBottom: 75,
    },
    buttonSave: {
        marginTop:10,
        marginBottom: 75,
        fontSize: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonAddSurvey:{
        borderRadius: 15,
        backgroundColor: "#E2E2E2",
        height: 90,
        borderWidth: 2,
        borderColor: COLOR_DEFAULT,
        margin: 10,
        fontSize: 20,
        alignItems: "center",
        justifyContent: "center"
    }
});