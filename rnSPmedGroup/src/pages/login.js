import React, { Component } from 'react'
import {
    View,
    StyleSheet,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    AsyncStorage
} from 'react-native'
import Axios from 'axios';
import jwt from 'jwt-decode';
import api from '../services/api';

class login extends Component {
    static navigationOptions =
        {
            header: null
        }
    constructor(props) {
        super(props);
        this.state = { email: "", senha: "" };
    }

    solicitarEnvio = async() => {
        const resposta = await api.post("/Login",{
            email: this.state.email,
            senha: this.state.senha
        });

        const token = resposta.data.token;
        await AsyncStorage.setItem("userToken", token);

        if (jwt(token).Role == "ADMIN") {
            this.props.navigation.navigate("MainNavigator")
        } else if (jwt(token).Role == "MEDICO"){
            this.props.navigation.navigate("MainMedNavigator")
        }else {
            this.props.navigation.navigate("MainComumNavigator")
        }

    };

    // solicitarEnvio = async () => {
    //     await Axios.post('http://192.168.3.215:5000/api/Login',
    //         {
    //             email: this.state.email,
    //             senha: this.state.senha
    //         },
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         .then(response => {
    //             if (response.status === 200) {
    //                 const token = response.data;
    //                 AsyncStorage.setItem('userToken', token);
    //                 this.props.navigation.navigate("MainNavigator")
    //             }
    //         })
    //         .catch(error => console.warn(error))
    // };

    render() {
        return (
            <View style={styles.main}>
                <Image
                    style={styles.logo}
                    source={require('../assets/img/logo.png')}
                >
                </Image>
                <View>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="black"
                        borderBottom="solid"
                        placeholder="email"
                        onChangeText={email => this.setState({ email })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="black"
                        placeholder="senha"
                        secureTextEntry={true}
                        onChangeText={senha => this.setState({ senha })}
                    />
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={this.solicitarEnvio}
                    >
                    <Text
                        style={styles.btntxt}
                    >ENTRAR</Text>
                    </TouchableOpacity>
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
    logo: {
        marginTop: 20,
        marginBottom: 80
    },
    input: {
        textAlign: "center",
        width: 300,
        marginTop: 20,
        borderBottomWidth: 3,
        borderBottomColor: "#677FA0",
    },
    btn: {
        width: 120,
        height: 60,
        backgroundColor: "#0052BC",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
        borderRadius: 5,
        marginTop: 80,
        alignSelf: "center"
    },
    btntxt: {
        color: "white",
        fontSize: 20
    }
})
export default login;