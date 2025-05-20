import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Definição dos tipos de rotas para navegação
type RootStackParamList = {
  Home: undefined;
};

const RecebimentoScreen: React.FC = () => {
  // Hook de navegação
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  // Estados principais do componente
  const [permission, requestPermission] = BarCodeScanner.usePermissions();
  const [scanningType, setScanningType] = useState<'none' | 'qr' | 'loc'>('none');
  const [codigoVeiculo, setCodigoVeiculo] = useState<string>('');
  const [codigoLocal, setCodigoLocal] = useState<string>('');
  const [mensagem, setMensagem] = useState<string>('');

  // Solicita permissão de câmera ao iniciar (exceto web)
  useEffect(() => {
    if (Platform.OS !== 'web' && !permission) {
      requestPermission();
    }
  }, [permission]);

  // Manipula leitura do código de barras/QR
  const handleBarCodeScanned = ({ data }: { data: string }) => {
    if (scanningType === 'qr') {
      setCodigoVeiculo(data);
      setMensagem('Veículo identificado!');
    } else {
      setCodigoLocal(data);
      setMensagem('Localização identificada!');
    }
    setScanningType('none');
  };

  // Permite entrada manual no navegador web
  const manualInput = async (type: 'qr' | 'loc') => {
    if (Platform.OS !== 'web') return;
    const texto = window.prompt(
      type === 'qr'
        ? 'Cole aqui o conteúdo do QR Code do veículo:'
        : 'Cole aqui o código de barras da localização:'
    );
    if (!texto) return;
    if (type === 'qr') {
      setCodigoVeiculo(texto);
      setMensagem('Veículo identificado!');
    } else {
      setCodigoLocal(texto);
      setMensagem('Localização identificada!');
    }
  };

  // Inicia processo de identificação (scanner ou manual)
  const onPressIdentify = async (type: 'qr' | 'loc') => {
    setMensagem('');
    if (Platform.OS === 'web') {
      manualInput(type);
    } else {
      if (!permission?.granted) {
        const { granted } = await requestPermission();
        if (!granted) {
          Alert.alert('Permissão necessária', 'Precisamos de acesso à câmera para escanear.');
          return;
        }
      }
      setScanningType(type);
    }
  };

  // Armazena o registro no AsyncStorage
  const handleArmazenar = async () => {
    const novoRegistro = {
      veiculo: codigoVeiculo,
      localizacao: codigoLocal,
      data: new Date().toISOString(),
    };

    try {
      const historicoAtual = await AsyncStorage.getItem('historicoRecebimentos');
      const historico = historicoAtual ? JSON.parse(historicoAtual) : [];
      historico.push(novoRegistro);

      await AsyncStorage.setItem('historicoRecebimentos', JSON.stringify(historico));
      Alert.alert('Sucesso', `Veículo ${codigoVeiculo} armazenado em ${codigoLocal}`);

      // Resetar estado após armazenar
      setCodigoVeiculo('');
      setCodigoLocal('');
      setMensagem('');
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar o histórico');
      console.error('Erro ao salvar histórico:', error);
    }
  };

  // Renderiza tela de scanner nativa (mobile)
  if (Platform.OS !== 'web' && scanningType !== 'none') {
    if (!permission?.granted) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Sem acesso à câmera</Text>
        </View>
      );
    }
    return (
      <View style={styles.scannerContainer}>
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => setScanningType('none')}
        >
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Render principal da tela de recebimento
  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Text style={styles.title}>RECEBIMENTO DE VEÍCULO</Text>

        <TouchableOpacity style={styles.button} onPress={() => onPressIdentify('qr')}>
          <Text style={styles.buttonText}>
            {codigoVeiculo ? `Veículo: ${codigoVeiculo}` : 'IDENTIFICAÇÃO (QR Code)'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => onPressIdentify('loc')}>
          <Text style={styles.buttonText}>
            {codigoLocal ? `Local: ${codigoLocal}` : 'LOCALIZAÇÃO (Cód. Barras)'}
          </Text>
        </TouchableOpacity>

        {codigoVeiculo && codigoLocal && (
          <TouchableOpacity style={styles.storeButton} onPress={handleArmazenar}>
            <Text style={styles.storeButtonText}>Armazenar</Text>
          </TouchableOpacity>
        )}

        {!!mensagem && <Text style={styles.message}>{mensagem}</Text>}
      
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.backButtonText}>VOLTAR</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.footer}>Desenvolvido por DPV-Tech</Text>
    </View>
  );
};

export default RecebimentoScreen;

// Estilos da tela
const styles = StyleSheet.create({
wrapper: {
  flex: 1,
  backgroundColor: '#000',
  justifyContent: 'center',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingBottom: 30, // espaço pro rodapé
},
container: {
  width: '100%',
  alignItems: 'center',
},
  scannerContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FF00',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00FF00',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
    backButton: {
    marginTop: 15,
    padding: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#00FF00',
    alignItems: 'center',
    width: '100%',
  },

  backButtonText: { 
    color: '#00FF00',
    fontWeight: 'bold', 
    fontSize: 16, 
  },

  storeButton: {
    width: '100%',
    backgroundColor: '#00FF00',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  storeButtonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    color: '#fff',
    marginTop: 20,
    textAlign: 'center',
  },
  errorText: {
    color: '#f00',
    textAlign: 'center',
  },
  cancelButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    backgroundColor: '#000000aa',
    padding: 10,
    borderRadius: 8,
  },
  cancelText: {
    color: '#fff',
  },
  footer: {
  position: 'absolute',
  bottom: 10,
  textAlign: 'center',
  color: '#555',
  fontSize: 12,
  width: '100%',
  },
});
