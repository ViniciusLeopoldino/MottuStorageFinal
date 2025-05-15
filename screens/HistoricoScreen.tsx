import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

interface Recebimento {
  veiculo: string;
  localizacao: string;
  data: string;
}

export default function HistoricoScreen() {
  const [historico, setHistorico] = useState<Recebimento[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    const carregarHistorico = async () => {
      const json = await AsyncStorage.getItem('historicoRecebimentos');
      if (json) setHistorico(JSON.parse(json));
    };
    carregarHistorico();
  }, []);

  const limparHistorico = () => {
    Alert.alert('Confirmação', 'Deseja apagar todo o histórico?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Apagar',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('historicoRecebimentos');
          setHistorico([]);
        },
      },
    ]);
  };

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Histórico de Recebimentos</Text>

        {historico.length === 0 ? (
          <Text style={styles.empty}>Nenhum recebimento armazenado ainda.</Text>
        ) : (
          historico.map((item, index) => (
            <View key={index} style={styles.item}>
              <Text style={styles.text}>Veículo: {item.veiculo}</Text>
              <Text style={styles.text}>Local: {item.localizacao}</Text>
              <Text style={styles.text}>Data: {new Date(item.data).toLocaleString()}</Text>
            </View>
          ))
        )}
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#880000' }]}
        onPress={limparHistorico}
      >
        <Text style={styles.buttonText}>Limpar Histórico</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Desenvolvido por DPV-Tech</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
    justifyContent: 'space-between',
  },
  container: {
    paddingBottom: 40,
  },
  title: {
    color: '#00FF00',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  empty: {
    color: '#888',
    textAlign: 'center',
    marginTop: 50,
  },
  item: {
    backgroundColor: '#111',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  text: {
    color: '#fff',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#00FF00',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    color: '#555',
    textAlign: 'center',
    fontSize: 12,
    marginTop: 20,
  },
});
