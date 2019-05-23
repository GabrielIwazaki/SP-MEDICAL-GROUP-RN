import React, { Component } from 'react'
import { Text, Image, StyleSheet, TouchableOpacity, View, AsyncStorage, FlatList } from "react-native";
import Axios from 'axios';
import api from '../services/api';


class mainMed extends Component {

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            ListaDeConsultas: []
        }
    }
    componentDidMount() {
        this.carregarToken();
    }

    logout = async() => {
        await AsyncStorage.removeItem("userToken");
        this.props.navigation.navigate('AuthStack');
    }

    _solicitarConsultas = async () => {

        const userToken = this.state.token;
        const response = await api.get("/consultas/usuario", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer ' + userToken
            }
        }); 
        
        
        const dataApi = response.data;
        this.setState({ ListaDeConsultas: dataApi });
    }

    carregarToken = async () => {
        await AsyncStorage.getItem("userToken").then((token) => {
            this.setState({ token: token }, () => {
                this._solicitarConsultas();
            });
        });   
    }
    
    renderizaItem = ({ item }) => (
        <View style={styles.li}> 
            <Text style={styles.itemname}>{item.idProntuarioNavigation.nome}</Text>
            <Text style={styles.item}>{item.idMedicoNavigation.nome}</Text>
            <Text style={styles.item}>{item.dtConsulta}</Text>
            <Text style={styles.item}>{item.idSituacaoNavigation.tipo}</Text>
            <Text style={styles.item}>{item.descricao}</Text>
        </View>
    );

    render() {
        return (
            <View style={styles.main}>
                <View style={styles.logoff}>
                    <Text style={styles.h1}>Lista de Consultas</Text>
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this.logout}
                    >
                    <Text
                        style={styles.btntxt}
                    >Deslogar</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    <FlatList
                        data={this.state.ListaDeConsultas}
                        keyExtractor={item => item.id}
                        renderItem={this.renderizaItem}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    main: {
        alignItems: "center",
        backgroundColor: "lightblue",
        height: "100%"
    },
    logoff: {
        display: "flex",
        flexDirection: "row",
    },
    h1: {
        marginTop: 30,
        fontSize: 30,
        color: "#0052BC"
    },
    li: {
        padding: 5,
        width: "100%",
        marginTop: 20,
        borderBottomColor: "#0052BC",
        borderBottomWidth: 1
        
    },
    btn: {
        width: 50,
        height: 30,
        backgroundColor: "#0052BC",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 35,
        alignSelf: "center",
        marginLeft: 25
    },
    btntxt: {
        color: "white",
        fontSize: 10
    },
    itemname: {
        color: "#0052BC",
        alignSelf: "center"
    },
    item: {
        alignSelf: "center"
    }
})

export default mainMed;