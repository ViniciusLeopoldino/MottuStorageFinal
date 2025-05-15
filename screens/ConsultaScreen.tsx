import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

type RootStackParamList = {
  ConsultaScreen: undefined;
  Home: undefined;
};

type TipoCadastroScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ConsultaScreen'
>;

export default function ConsultaScreen() {
  const navigation = useNavigation<TipoCadastroScreenNavigationProp>();
  const [codigoConsulta, setCodigoConsulta] = useState('');
  const [dadosVeiculo, setDadosVeiculo] = useState<{
    placa: string;
    modelo: string;
    km: string;
    contrato: string;
    ocorrencia: string;
    localizacao: string;
  } | null>(null);

  const consultarVeiculo = async () => {
    if (!codigoConsulta) {
      Alert.alert('Atenção', 'Por favor, insira um código válido.');
      return;
    }

    try {
      // Buscar dados salvos anteriormente
      const cadastro = await AsyncStorage.getItem('ultimoCadastro');
      const local = await AsyncStorage.getItem('ultimaLocalizacao');

      if (!cadastro || !local) {
        Alert.alert('Erro', 'Nenhum dado cadastrado foi encontrado.');
        return;
      }

      const dados = JSON.parse(cadastro);
      const localizacao = JSON.parse(local);
      const nome_localizacao = `${localizacao.armazem}-${localizacao.rua}-${localizacao.modulo}-${localizacao.compartimento}`;

      // Verifica se o dado consultado corresponde a algum campo
      const encontrado =
        dados.placa === codigoConsulta ||
        dados.chassi === codigoConsulta ||
        dados.contrato === codigoConsulta;

      if (!encontrado) {
        Alert.alert('Não encontrado', 'Veículo não identificado.');
        return;
      }

      setDadosVeiculo({
        placa: dados.placa,
        modelo: dados.modelo,
        km: dados.km,
        contrato: dados.contrato,
        ocorrencia: dados.ocorrencia,
        localizacao: nome_localizacao,
      });
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Falha ao buscar dados.');
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Consulta de Veículo</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira PLACA, CHASSI ou CONTRATO"
          placeholderTextColor="#00FF00"
          value={codigoConsulta}
          onChangeText={setCodigoConsulta}
        />
        <TouchableOpacity style={styles.button} onPress={consultarVeiculo}>
          <Text style={styles.buttonText}>Consultar</Text>
        </TouchableOpacity>

        {dadosVeiculo && (
          <View style={styles.resultado}>
            <Text style={styles.resultadoTitulo}>Dados do Veículo:</Text>
            {Object.entries(dadosVeiculo).map(([key, value]) => (
              <Text key={key} style={styles.resultadoTexto}>
                {`${key.toUpperCase()}: ${value}`}
              </Text>
            ))}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>VOLTAR</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Desenvolvido por DPV-Tech</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
    padding: 20,
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FF00',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#00FF00',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: '#fff',
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    width: '100%',
    backgroundColor: '#00FF00',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultado: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#111',
    borderRadius: 10,
  },
  resultadoTitulo: {
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#00FF00',
  },
  resultadoTexto: {
    marginBottom: 5,
    color: '#fff',
  },
  footer: {
    color: '#555',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 10,
  },
});
