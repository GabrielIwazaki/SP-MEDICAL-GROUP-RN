import login from './pages/login';
import main from './pages/main';
import mainMed from './pages/mainMed';
import mainComum from './pages/mainComum';
import {createStackNavigator, createAppContainer, createSwitchNavigator} from "react-navigation"

const AuthStack = createStackNavigator({login});

const MainNavigator = createStackNavigator({main});

const MainMedNavigator = createStackNavigator({mainMed});

const MainComumNavigator = createStackNavigator({mainComum});

export default createAppContainer(
    createSwitchNavigator(
        {
            AuthStack,
            MainNavigator,
            MainMedNavigator,
            MainComumNavigator
        },
        {
            initialRouteName: 'AuthStack'
        }
    )
);