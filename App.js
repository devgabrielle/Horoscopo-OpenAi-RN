import React, { useState, useEffect } from "react";
import {
    View,
    StatusBar,
    Platform,
    TextInput,
    ImageBackground,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ScrollView,
    ActivityIndicator, Alert, Keyboard
} from "react-native";
import { MaterialIcons } from '@expo/vector-icons'


const statusBarHeight = StatusBar.currentHeight
const KEY_GPT = 'your-key-openai';



const signos = [
    { nome: 'Áries', inicio: '21-03', fim: '19-04', imagem: require('./assets/signos/aries.png') },
  { nome: 'Touro', inicio: '20-04', fim: '20-05', imagem: require('./assets/signos/touro.png') },
  { nome: 'Gêmeos', inicio: '21-05', fim: '20-06', imagem: require('./assets/signos/gemeos.png') },
  { nome: 'Câncer', inicio: '21-06', fim: '22-07', imagem: require('./assets/signos/cancer.png') },
  { nome: 'Leão', inicio: '23-07', fim: '22-08', imagem: require('./assets/signos/leao.png') },
  { nome: 'Virgem', inicio: '23-08', fim: '22-09', imagem: require('./assets/signos/virgem.png') },
  { nome: 'Libra', inicio: '23-09', fim: '22-10', imagem: require('./assets/signos/libra.png') },
  { nome: 'Escorpião', inicio: '23-10', fim: '21-11', imagem: require('./assets/signos/escorpiao.png') },
  { nome: 'Sagitário', inicio: '22-11', fim: '21-12', imagem: require('./assets/signos/sagitario.png') },
  { nome: 'Capricórnio', inicio: '22-12', fim: '19-01', imagem: require('./assets/signos/capricornio.png') },
  { nome: 'Aquário', inicio: '20-01', fim: '18-02', imagem: require('./assets/signos/aquario.png') },
  { nome: 'Peixes', inicio: '19-02', fim: '20-03', imagem: require('./assets/signos/peixes.png') },
];

export default function App({ navigation }) {
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [dada, setDada] = useState("");
    const [signo, setSigno] = useState(null);


    async function handleGenerate() {
        if (question === "") {
            Alert.alert("Atenção", "Digite sua data de nascimento no formato 'DD-MM'!")
            return;
        }


    // Calcular o signo baseado na data fornecida
    const encontrado = calcularSigno(question);
    if (!encontrado) {
        Alert.alert("Erro", "Não foi possível identificar o signo. Verifique o formato da data!");
        return;
    }


        setSigno(encontrado);
        setDada("");
        setQuestion("");
        setLoading(true);
        Keyboard.dismiss();

        const prompt = `Faça meu horoscopo de hoje. No inicio, diga o nome do meu signo.
        Crie uma resposta direta baseada na data do meu nascimento ${question},
        seja preciso nas respostas. Refências de Horóscopo do dia, Profissão, Amor, Dinheiro e Números da sorte e cor do dia.`

        try {
            const response = await fetch("https://api.openai.com/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${KEY_GPT}`,
                },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: 'user', content: prompt },
                    ],
                    temperature: 0.2,
                    max_tokens: 500,
                    top_p: 1,
                }),
            });
            const data = await response.json();
            setDada(data.choices[0].message.content);
        } catch (error) {
            console.error(error);
            Alert.alert("Erro", "Não foi possível gerar o horóscopo. Tente novamente!");
        } finally {
            setLoading(false);
        }
    }

    const calcularSigno = (dataNascimento) => {
        const [dia, mes] = dataNascimento.split('-').map(Number);
    
        if (!dia || !mes || dia > 31 || mes > 12) {
            return null; // Valida a data de nascimento
        }
    
        const data = new Date(2000, mes - 1, dia).getTime(); // Ano arbitrário para comparação
    
        return signos.find(({ inicio, fim }) => {
            const [inicioDia, inicioMes] = inicio.split('-').map(Number);
            const [fimDia, fimMes] = fim.split('-').map(Number);
    
            const inicioData = new Date(2000, inicioMes - 1, inicioDia).getTime();
            const fimData = new Date(2000, fimMes - 1, fimDia).getTime();
    
            if (inicioData > fimData) {
                // Signos que atravessam o final do ano (Ex.: Capricórnio)
                return data >= inicioData || data <= fimData;
            }
            return data >= inicioData && data <= fimData;
        });
    };


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" translucent={false} backgroundColor="#363636" />
            <ImageBackground source={require('./assets/background2.png')} resizeMode="cover" style={styles.image}>

                <ScrollView style={styles.messageContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.top}>
                        <Text style={styles.messageText}>HOROSCOPO</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
                            <MaterialIcons name="close" size={30} color="#FFF" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </ScrollView>



                <ScrollView contentContainerStyle={{ paddingBottom: 24, marginTop: 4, }} style={styles.containerScroll} showsVerticalScrollIndicator={false} >
                    {loading && (
                        <View style={styles.content}>
                            <Text style={styles.title}>Carregando signo...</Text>
                            <ActivityIndicator color="#000" size="large" />
                        </View>
                    )}

                    {dada && (
                        <View style={styles.content}>
                             <Image source={signo?.imagem} style={styles.cardImage} />
                            <Text style={styles.title}>Horoscopo do dia 👇</Text>
                            <Text style={{ lineHeight: 24 }}>{dada}</Text>
                        </View>
                    )}
                </ScrollView>


                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Data de nascimento (ex. '23-09')"
                        keyboardType="numeric"
                        value={question}
                        onChangeText={(text) => setQuestion(text)}
                    />

                    <TouchableOpacity style={styles.sendButton} onPress={handleGenerate}>
                        <MaterialIcons name="send" size={22} color="#FFF" />
                    </TouchableOpacity>
                </View>

            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
    },
    cardImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 12,
    },

    messageText: {
        fontSize: 20,
        lineHeight: 1,
        fontWeight: "300",
        color: 'white',
        paddingTop: Platform.OS === 'android' ? statusBarHeight : 54
    },
    top: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingHorizontal: 13,
        height: 100
    },
    icon: {
        alignSelf: "center",
        marginTop: 10,
    },





    card: {
        flexDirection: 'column',
        marginHorizontal: 10,
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'rgba(62, 42, 52, 0.7)',
        borderRadius: 10,
        shadowColor: '6',
        shadowOpacity: 1.2,
        shadowRadius: 5,
        shadowOffset: {
            height: 2,
            width: 0,
        },
    },
    cardImage: {
        width: 150,
        height: 200,
        borderRadius: 10,
        marginRight: 10,
    },
    cardDescription: {
        alignItems: 'center',
    },
    cardTitle: {
        marginTop: 15,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ccc',
    },
    cardText: {
        fontSize: 16,
        color: '#C4C4C4',
    },



    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#C4C4C4",
        paddingHorizontal: 16,
        paddingVertical: 4,
        marginTop: 5,
        marginBottom: 12,
        borderRadius: 100,
        marginHorizontal: 5,
    },
    input: {
        flex: 1,
        fontSize: 16,
        paddingVertical: 6,
        backgroundColor: "#C4C4C4",
    },
    sendButton: {
        backgroundColor: "#FF5656",
        borderRadius: 16,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginLeft: 8,
    },

    content: {
        alignItems: "center",
        backgroundColor: '#CCC',
        padding: 16,
        width: '100%',
        marginTop: 16,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 14
    },
    containerScroll: {
        marginHorizontal: 10,
        width: '95%',
        marginTop: 8,
    }
});