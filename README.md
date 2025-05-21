
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

| Tela                      | Descrição                                                                                     |
|---------------------------|-----------------------------------------------------------------------------------------------|
| **Login**                 | Tela inicial com campos de login (simulado/local)                                             |
| **Home**                  | Navegação para Cadastro, Recebimento, Consulta e Histórico                                    |
| **Cadastro de Veículo**   | Cadastro de moto + geração de QR Code + salvamento no dispositivo                             |
| **Cadastro de Localização** | Cadastro de Localização para armazenar o veículo (Armazém, Rua, Módulo, Compartimento)      |
| **Recebimento**           | Leitura do QR da moto + código de barras da localização para armazenamento                    |
| **Consulta**              | Consulta de veículo via PLACA, CHASSI ou CONTRATO                                             |
| **Histórico**             | Exibe histórico dos últimos veículos armazenados                                              |

---

## 🛠️ Tecnologias Utilizadas

- **React Native + Expo**  
- **React Navigation**  
- **Expo Camera / BarcodeScanner**  
- **QRCode API**  
- **AsyncStorage** (simulação de cadastro e armazenamento local dos dados)  
- **Expo FileSystem + MediaLibrary**  
- **TypeScript**  

---

## 🧪 Funcionalidades Técnicas

- `useState`, `useEffect` para controle de estado  
- `AsyncStorage` para persistência local dos dados (simulando um banco de dados)  
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

### 4. Pressione **W** para abrir no navegador

```bash
w
```

### 5. Login

-  Você precisa criar o cadastro do usuário para realizar o login

> **Importante:**  
> O cadastro está sendo simulado localmente usando a tecnologia **AsyncStorage**, que armazena os dados no dispositivo (ou navegador no modo web). Assim, os dados ficam salvos localmente para teste e simulação do fluxo real.

### 6. Funcionalidades

#### Cadastro  
- Use para cadastrar Veículos e Localizações  
- Na tela de cadastro de veículos, um QR Code é gerado para identificar a moto  

#### Recebimento  
- Use para receber o veículo cadastrado e armazená-lo na localização indicada  

#### Consulta  
- Use para consultar veículos cadastrados via PLACA, CHASSI ou CONTRATO  
- Exibe os dados do veículo e a localização onde está armazenado  

#### Histórico  
- Mostra o histórico dos últimos recebimentos realizados  

---

## 👨‍💻 Autor e Créditos

**Desenvolvedor:** [Vinicius Leopoldino de Oliveira]  
**Curso:** [Análise e Desenvolvimento de Sistemas - FIAP]
