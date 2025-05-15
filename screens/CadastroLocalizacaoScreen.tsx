import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function CadastroLocalizacao() {
  const navigation = useNavigation();
  const [localizacao, setLocalizacao] = useState({
    armazem: '',
    rua: '',
    modulo: '',
    compartimento: '',
  });

  // Carregar dados salvos
  useEffect(() => {
    const carregarLocalizacaoSalva = async () => {
      try {
        const salvo = await AsyncStorage.getItem('ultimaLocalizacao');
        if (salvo) {
          setLocalizacao(JSON.parse(salvo));
        }
      } catch (err) {
        console.error('Erro ao carregar localização:', err);
      }
    };
    carregarLocalizacaoSalva();
  }, []);

  const salvarLocalizacao = async () => {
    const nome_localizacao = `${localizacao.armazem}-${localizacao.rua}-${localizacao.modulo}-${localizacao.compartimento}`;
    try {
      await AsyncStorage.setItem('ultimaLocalizacao', JSON.stringify(localizacao));
      Alert.alert('Sucesso', `Localização salva: ${nome_localizacao}`);
    } catch (err) {
      console.error('Erro ao salvar:', err);
      Alert.alert('Erro', 'Não foi possível salvar a localização.');
    }
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.title}>Cadastro de Localização</Text>
        {(Object.keys(localizacao) as Array<keyof typeof localizacao>).map((key) => (
          <TextInput
            key={key}
            style={styles.input}
            placeholder={key.toUpperCase()}
            placeholderTextColor="#aaa"
            value={localizacao[key]}
            onChangeText={(text) =>
              setLocalizacao((prev) => ({ ...prev, [key]: text }))
            }
          />
        ))}
        <TouchableOpacity style={styles.button} onPress={salvarLocalizacao}>
          <Text style={styles.buttonText}>Salvar Localização</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </ScrollView>

      <Text style={styles.footer}>Desenvolvido por DPV-Tech</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'space-between',
  },
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FF00',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#111',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#00FF00',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  backButton: {
    marginTop: 15,
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#00FF00',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#00FF00',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    textAlign: 'center',
    color: '#555',
    fontSize: 12,
    paddingVertical: 10,
  },
});
