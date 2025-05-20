import React, { useState } from 'react';
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

// Tela principal de cadastro de veículos
export default function CadastroVeiculoScreen() {
  const navigation = useNavigation();

  // Estado para armazenar os dados do veículo
  const [veiculo, setVeiculo] = useState({
    placa: '',
    chassi: '',
    modelo: '',
    km: '',
    contrato: '',
    ocorrencia: '',
  });

  // Estado para mensagem de sucesso ou erro
  const [mensagemSucesso, setMensagemSucesso] = useState('');

  // Limpa todos os campos do formulário
  const limparCampos = () => {
    setVeiculo({
      placa: '',
      chassi: '',
      modelo: '',
      km: '',
      contrato: '',
      ocorrencia: '',
    });
  };

  // Reutiliza o último cadastro salvo no AsyncStorage
  const reutilizarCadastro = async () => {
    try {
      const salvo = await AsyncStorage.getItem('ultimoCadastro');
      if (salvo) {
        setVeiculo(JSON.parse(salvo));
        Alert.alert('Sucesso', 'Último cadastro carregado!');
      } else {
        Alert.alert('Aviso', 'Nenhum cadastro anterior encontrado.');
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar o cadastro.');
      console.error(error);
    }
  };

  // Gera o QRCode, salva o cadastro e faz download da imagem
  const handleDownloadQRCode = async () => {
    try {
      await AsyncStorage.setItem('ultimoCadastro', JSON.stringify(veiculo));

      const dataString = JSON.stringify(veiculo);
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
        dataString
      )}&size=300x300`;

      // Para web, apenas abre o QR em nova aba
      if (Platform.OS === 'web') {
        window.open(qrUrl, '_blank');
        setMensagemSucesso('Veículo cadastrado com sucesso!');
        return;
      }

      // Para mobile, faz download e salva na galeria
      const filename = FileSystem.documentDirectory + 'mottu-qr.png';
      const { uri } = await FileSystem.downloadAsync(qrUrl, filename);
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status === 'granted') {
        const asset = await MediaLibrary.createAssetAsync(uri);
        await MediaLibrary.createAlbumAsync('Download', asset, false);
        setMensagemSucesso('Veículo cadastrado com sucesso!');
      } else {
        setMensagemSucesso('⚠️ Permissão negada para salvar imagens.');
      }
    } catch (err) {
      console.error(err);
      setMensagemSucesso('❌ Falha ao cadastrar o veículo.');
    }
  };

  // Renderização do componente
  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Cadastro de Veículos</Text>

        <View style={styles.form}>
          {/* Campos de entrada do formulário */}
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

          {/* Links para reutilizar cadastro e limpar campos */}
          <View style={styles.linkContainer}>
            <TouchableOpacity onPress={reutilizarCadastro}>
              <Text style={styles.linkText}>Reutilizar último cadastro</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={limparCampos}>
              <Text style={styles.linkText}>Limpar Campos</Text>
            </TouchableOpacity>
          </View>

          {/* Botão para gerar e baixar o QRCode */}
          <TouchableOpacity style={styles.button} onPress={handleDownloadQRCode}>
            <Text style={styles.buttonText}>IMPRIMIR</Text>
          </TouchableOpacity>

          {/* Mensagem de sucesso ou erro */}
          {mensagemSucesso !== '' && (
            <Text style={styles.successMessage}>{mensagemSucesso}</Text>
          )}

          {/* Botão para voltar */}
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>VOLTAR</Text>
          </TouchableOpacity>
        </View>

        {/* Rodapé */}
        <Text style={styles.footer}>Desenvolvido por DPV-Tech</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

// Estilos do componente
const styles = StyleSheet.create({
  successMessage: {
    color: '#00FF00',
    textAlign: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  linkContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
    marginBottom: 20,
  },
  linkText: {
    color: '#00FF00',
    textDecorationLine: 'underline',
    fontSize: 14,
    fontWeight: '500',
  },
  wrapper: { flex: 1, backgroundColor: '#000' },
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  form: { alignItems: 'center' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FF00',
    textAlign: 'center',
    marginBottom: 20,
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
  clearButton: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    backgroundColor: '#111',
    borderWidth: 1,
    borderColor: '#00FF00',
  },
  clearButtonText: {
    color: '#00FF00',
    fontWeight: 'bold',
  },
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
  reuseButton: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#111',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#00FF00',
    alignItems: 'center',
  },
  reuseText: {
    color: '#00FF00',
    fontWeight: 'bold',
  },
});
