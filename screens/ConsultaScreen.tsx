// Importação de dependências e tipos necessários
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

// Definição dos tipos de navegação utilizados na tela
type RootStackParamList = {
  ConsultaScreen: undefined;
  Home: undefined;
};

type TipoCadastroScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ConsultaScreen'
>;

// Componente principal da tela de consulta de veículo
export default function ConsultaScreen() {
  // Hook de navegação
  const navigation = useNavigation<TipoCadastroScreenNavigationProp>();

  // Estados para armazenar o código de consulta e os dados do veículo consultado
  const [codigoConsulta, setCodigoConsulta] = useState('');
  const [dadosVeiculo, setDadosVeiculo] = useState<{
    placa: string;
    modelo: string;
    km: string;
    contrato: string;
    ocorrencia: string;
    localizacao: string;
  } | null>(null);

  // Função responsável por consultar os dados do veículo no AsyncStorage
  const consultarVeiculo = async () => {
    if (!codigoConsulta) {
      Alert.alert('Atenção', 'Por favor, insira um código válido.');
      return;
    }

    try {
      // Busca os dados salvos anteriormente no AsyncStorage
      const cadastro = await AsyncStorage.getItem('ultimoCadastro');
      const local = await AsyncStorage.getItem('ultimaLocalizacao');

      if (!cadastro || !local) {
        Alert.alert('Erro', 'Nenhum dado cadastrado foi encontrado.');
        return;
      }

      const dados = JSON.parse(cadastro);
      const localizacao = JSON.parse(local);
      const nome_localizacao = `${localizacao.armazem}-${localizacao.rua}-${localizacao.modulo}-${localizacao.compartimento}`;

      // Verifica se o código informado corresponde a algum campo do cadastro
      const encontrado =
        dados.placa === codigoConsulta ||
        dados.chassi === codigoConsulta ||
        dados.contrato === codigoConsulta;

      if (!encontrado) {
        Alert.alert('Não encontrado', 'Veículo não identificado.');
        return;
      }

      // Atualiza o estado com os dados encontrados
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

  // Renderização da interface da tela
  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Título da tela */}
        <Text style={styles.title}>Consulta de Veículo</Text>

        {/* Campo de entrada para código de consulta */}
        <TextInput
          style={styles.input}
          placeholder="Insira PLACA, CHASSI ou CONTRATO"
          placeholderTextColor="#00FF00"
          value={codigoConsulta}
          onChangeText={setCodigoConsulta}
        />

        {/* Botão para acionar a consulta */}
        <TouchableOpacity style={styles.button} onPress={consultarVeiculo}>
          <Text style={styles.buttonText}>Consultar</Text>
        </TouchableOpacity>

        {/* Exibição dos dados do veículo, caso encontrados */}
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

      {/* Botão para voltar à tela inicial */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>VOLTAR</Text>
      </TouchableOpacity>

      {/* Rodapé com créditos */}
      <Text style={styles.footer}>Desenvolvido por DPV-Tech</Text>
    </View>
  );
}

// Estilos utilizados na tela
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
