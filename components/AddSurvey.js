import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar, FlatList, Button, Alert, AsyncStorage, ScrollView, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { MaterialIcons } from '@expo/vector-icons';
import NewSurvey from "./NewSurvey";

StatusBar.setHidden(true);

const COLOR_DEFAULT = 'blue';
const SIZE_TITLE = 30;
const SIZE_ICON = 35;
const listSurvey= [ { id: 0, domanda: '', A:'', B:'', C:'', D:'', esatta:'' } ];

export default class AddSurvey extends Component {
    state = {
        listSurvey: [],
        isLoading: false
    }

    _generateSurvey = ({ item }) => {
        return <NewSurvey data={ item } onSaveChangeQuestion={this._saveChangeQuestion} onDeleteSingleQuestion={this._deleteSingleQuestion} />
    };

    _keyExtractor = (item, index) => {
        return String(index);
    };
    
    _idExtractor = (item, index) => {
        return index;
    };

    _add = () => {
        // TODO: Da rivedere considerando this._generateID + considerare se eliminare il salvataggio qui
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
    };

    _saveChangeQuestion = (item, index) => {
        let newListSurvey = this.state.listSurvey;
        item.id = index;
        newListSurvey[index] = item;
        this.setState({listSurvey: newListSurvey}, () => this._storeData(newListSurvey));
    }

    _deleteSingleQuestion = (index) => {
        let newListSurvey = this.state.listSurvey;
        newListSurvey.splice(index, 1);
        console.log(" listSurvey Dop!0 : ", newListSurvey);
        this._storeData(newListSurvey);

        // TODO : Modificare con l'aggiunta di firebase
        //var elementRef = firebase.database().ref(this.state.path+"/"+item.id);
        //elementRef.remove().then(this._loadData);
    };

    // Funzione attraverso il quale si crea un record dinamico nel caso in cui non sono presenti record nel Database
    _checkLoad = () => {
        if(this.state.listSurvey.length === 0){
            this.setState({listSurvey:listSurvey}, this._generateID);
        }
    }

    async _storeData(newListSurvey) {
        console.log("Salvataggio dati con AsyncStorage...");
        try {
            await AsyncStorage.setItem('listSurvey', JSON.stringify(newListSurvey));
        } catch (error) {
            console.log('Errore nello salvataggio dei dati!');
        }
        this.setState({ isLoading: false },this._getSizeList(newListSurvey) ? () => this._loadData() : () =>this.props.navigation.goBack());
    }

    _generateID = () => {
        let newListSurvey = this.state.listSurvey;
        newListSurvey.map((obj, index) => {
            obj.id = this._idExtractor(obj,index)
        });
        this.setState({listSurvey: newListSurvey, isLoading: true});
    }

    async _loadData() {
        const response = await AsyncStorage.getItem('listSurvey');
        let result = response ? await JSON.parse(response) : listSurvey;
        if(this._getSizeList(result)) {
            this.setState({listSurvey: result}, this._generateID);
        } else {
            this.setState({listSurvey: listSurvey}, this._generateID);
        }
    }

    _getSizeList = (listSurvey) => {
        if(typeof listSurvey != "undefined" && typeof listSurvey != "[]" && listSurvey != null && listSurvey.length != null && listSurvey.length > 0) {
            return true;
        }
        return false;
    };

    componentWillMount() {
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
        return (
            <View style={styles.container}>
                {   !this.state.isLoading ?
                        <ActivityIndicator style={styles.spinner} size="large" color={COLOR_DEFAULT} />
                    :
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
                                this._getSizeList(this.state.listSurvey) ?
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
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
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
    buttonAddSurvey: {
        borderRadius: 15,
        backgroundColor: "#E2E2E2",
        height: 90,
        borderWidth: 2,
        borderColor: COLOR_DEFAULT,
        margin: 10,
        fontSize: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    spinner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});