import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

export default function CadastroVeiculoScreen() {
  const navigation = useNavigation();
  const [veiculo, setVeiculo] = useState({
    placa: '',
    chassi: '',
    modelo: '',
    km: '',
    contrato: '',
    ocorrencia: '',
  });

  // Recuperar dados salvos ao iniciar a tela
  useEffect(() => {
    const carregarCadastroSalvo = async () => {
      try {
        const salvo = await AsyncStorage.getItem('ultimoCadastro');
        if (salvo) {
          setVeiculo(JSON.parse(salvo));
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };
    carregarCadastroSalvo();
  }, []);

  const handleDownloadQRCode = async () => {
    try {
      // Salvar os dados no AsyncStorage
      await AsyncStorage.setItem('ultimoCadastro', JSON.stringify(veiculo));

      const dataString = JSON.stringify(veiculo);
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        dataString
      )}&size=300x300`;

      if (Platform.OS === 'web') {
        window.open(qrUrl, '_blank');
        return;
      }

      const filename = FileSystem.documentDirectory + 'mottu-qr.png';
      const { uri } = await FileSystem.downloadAsync(qrUrl, filename);
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status === 'granted') {
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('Download', asset, false);
        Alert.alert('Sucesso', 'QR Code salvo na galeria!');
      } else {
        Alert.alert('Erro', 'Permissão negada para salvar imagens.');
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Erro', 'Falha ao salvar QR Code.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Cadastro de Veículos</Text>
        <View style={styles.form}>
          {(['placa', 'chassi', 'modelo', 'km', 'contrato', 'ocorrencia'] as const).map((key) => (
            <TextInput
              key={key}
              style={styles.input}
              placeholder={key.toUpperCase()}
              placeholderTextColor="#00FF00"
              value={veiculo[key]}
              onChangeText={(text) =>
                setVeiculo((v) => ({ ...v, [key]: text }))
              }
            />
          ))}

          <TouchableOpacity style={styles.button} onPress={handleDownloadQRCode}>
            <Text style={styles.buttonText}>IMPRIMIR</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>VOLTAR</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footer}>Desenvolvido por DPV-Tech</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: '#000' },
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  form: { alignItems: 'center' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FF00',
    textAlign: 'center',
    marginBottom: 30,
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
    backgroundColor: '#00FF00',
    borderRadius: 25,
    paddingVertical: 14,
    paddingHorizontal: 40,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#000', fontSize: 16, fontWeight: 'bold' },
  backButton: {
    marginTop: 15,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#00FF00',
  },
  backButtonText: { color: '#00FF00', fontSize: 16 },
  footer: {
    color: '#555',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 30,
  },
});
