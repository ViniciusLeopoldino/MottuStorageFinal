import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CadastroVeiculoScreen from './screens/CadastroVeiculosScreen';
import CadastroLocalizacaoScreen from './screens/CadastroLocalizacaoScreen';
import RecebimentoScreen from './screens/RecebimentoScreen';
import ConsultaScreen from './screens/ConsultaScreen';
import MensagemPopupScreen from './screens/MensagemPopupScreen';
import TipoCadastroScreen from './screens/TipoCadastro';
import RegisterScreen from './screens/RegisterScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }} // <-- ESSA LINHA REMOVE TODOS OS HEADERS
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TipoCadastro" component={TipoCadastroScreen} />
        <Stack.Screen name="CadastroVeiculo" component={CadastroVeiculoScreen} />
        <Stack.Screen name="CadastroLocalizacao" component={CadastroLocalizacaoScreen} />
        <Stack.Screen name="Recebimento" component={RecebimentoScreen} />
        <Stack.Screen name="Consulta" component={ConsultaScreen} />
        <Stack.Screen
          name="MensagemPopup"
          component={({ route }: { route: any }) => <MensagemPopupScreen route={route} />}
        />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
