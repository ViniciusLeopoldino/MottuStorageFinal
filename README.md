# Mottu Storage – Sistema de Armazenamento de Motos

O **Mottu Storage** é um aplicativo mobile criado para controle de entrada, identificação, localização e consulta de motocicletas nos armazéns da empresa **Mottu**. Ele foi desenvolvido com **React Native (Expo)** e utiliza **leitura de QR Code e código de barras** para automatizar o processo de triagem de motos.

---

## 🎯 Problema Real

A empresa **Mottu** realiza o recebimento de motos que passam por uma triagem e são armazenadas em compartimentos sem qualquer sistema automatizado. Atualmente, não há etiquetas ou organização de localização, o que obriga os funcionários a procurarem moto por moto manualmente — um processo lento e ineficiente.

---

## 💡 Solução Proposta

O app **Mottu Storage** permite:

- Cadastrar motos com dados completos
- Gerar QR Codes com as informações
- Cadastrar localizações com estrutura hierárquica
- Ler QR Code (moto) para gravar as informações 
- Ler código de barras (local) para armazenar a moto no local 
- Consultar local onde as motos estão armazenadas rapidamente

---

## 📱 Funcionalidades

| Tela                    | Descrição                                                                                     |
|-------------------------|-----------------------------------------------------------------------------------------------|
| **Login**               | Tela inicial com campos de login (simulado/local)                                             |
| **Home**                | Navegação para Cadastro, Recebimento, Consulta e Histórico                                    |
| **Cadastro de Veículo** | Cadastro de moto + geração de QR Code + salvamento no dispositivo                             |
| **Cadastro de Localização** | Cadastro de Localização para armazenar o veículo (Armazém, Rua, Módulo, Compartimento)    |
| **Recebimento**         | Leitura do QR da moto + código de barras da localização para armazenamento                    |
| **Consulta**            | Consulta de veículo via PLACA, CHASSI ou CONTRATO                                             |
| **Histórico**           | Exibe histórico dos últimos veículos armazenados                                              |

---

## 🛠️ Tecnologias Utilizadas

- **React Native + Expo**
- **React Navigation**
- **Expo Camera / BarcodeScanner**
- **QRCode API**
- **AsyncStorage**
- **Expo FileSystem + MediaLibrary**
- **TypeScript**

---

## 🧪 Funcionalidades Técnicas

- `useState`, `useEffect` para controle de estado
- `AsyncStorage` para persistência de dados
- Leitura de QR Code e Código de Barras
- Salvamento de QR Code como imagem no dispositivo
- Interface com tema escuro e elementos em verde

---

## ▶️ Como Executar

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/mottu-storage.git
cd mottu-storage
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute

```bash
npx expo start
```

### 4. Pressione W para abrir no navegador

```bash
w
```

### 5. Login

- Login: teste
- Senha: teste

### 6. Funcionalidades

#### Cadastro
- Utilizar para cadastro de Veículos e Localizações
- Em cadastro de veículos é impresso o QR Code para identificar a moto

#### Recebimento
- Utilizar para realizar o recebimento do veículo cadastrado e armazenar na posição indicada

#### Consulta
- Utilizar para consultar veículos cadastrados com base na PLACA, CHASSI ou CONTRATO
- É exibido os dados do veículo e a localização que o mesmo se encontra

#### Histórico
- Exibe histórico dos últimos recebimentos realizados

---

## 📌 Observações

- Os dados são salvos localmente usando `AsyncStorage`
- Leitura de QR Code e código de barras funciona na Web e no Android
- A lógica de armazenamento é simulada, mas pronta para integração futura com banco de dados

---

## 🧠 Possíveis Expansões

- Integração com banco Oracle via API REST
- Dashboard Web com estatísticas de motos armazenadas
- Impressão direta dos QR Codes
- Controle de múltiplos usuários

---

## 👨‍💻 Autor e Créditos

**Desenvolvedor:** [Vinicius Leopoldino de Oliveira]  
**Curso:** [Analise e Desenvolvimento de Sistemas - FIAP]  
