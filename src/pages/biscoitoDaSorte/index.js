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


export default function App({ navigation }) {

    const [img, setImg] = useState(require('./assets/biscoito/biscoito.png'));
    const [textoFrase, setTextoFrase] = useState('');

    let frases = [
        'A vida trará coisas boas se tiver paciência.',
        'Demonstre amor e alegria em todas as oportunidades e verá que a paz nasce dentro de si.',
        'Não compense na ira o que lhe falta na razão.',
        'Defeitos e virtudes são apenas dois lados da mesma moeda.',
        'A maior de todas as torres começa no solo.',
        'Não há que ser forte. Há que ser flexível.',
        'Todos os dias organiza os seus cabelos, por que não faz o mesmo com o coração?',
        'Há três coisas que jamais voltam; a flecha lançada, a palavra dita e a oportunidade perdida.',
        'A juventude não é uma época da vida, é um estado de espírito.',
        'Podemos escolher o que semear, mas somos obrigados a colher o que plantamos.',
        'Dê toda a atenção á formação dos seus filhos, sobretudo com bons exemplos da sua própria vida.',
        'Siga os bons e aprenda com eles.',
        'Não importa o tamanho da montanha, ela não pode tapar o sol.',
        'O bom-senso vale mais do que muito conhecimento.',
        'Quem quer colher rosas tem de estar preparado para suportar os espinhos.',
        'São os nossos amigos que nos ensinam as mais valiosas lições.',
        'Aquele que se importa com o sentimento dos outros, não é um tolo.',
        'A adversidade é um espelho que reflete o verdadeiro eu.',
        'Lamentar aquilo que não temos é desperdiçar aquilo que já possuímos.',
        'Uma bela flor é incompleta sem as suas folhas.',
        'Sem o fogo do entusiasmo, não há o calor da vitória.',
        'O riso é a menor distância entre duas pessoas.',
        'Os defeitos são mais fortes quando o amor é fraco.',
        'Amizade e Amor são coisas que se unem num piscar de olhos.',
        'Surpreender e ser surpreendido é o segredo do amor.',
        'Faça pequenas coisas hoje e coisas maiores lhe serão confiadas amanhã.',
        'A paciência na adversidade é sinal de um coração sensível.',
        'A sorte favorece a mente bem preparada.',
        "Grandes surpresas estão a caminho, esteja pronto para abraçá-las.",
        "A vida recompensa quem caminha com coragem.",
        "Sua gentileza será a chave para abrir novas portas.",
        "Um pequeno gesto hoje trará grandes frutos amanhã.",
        "A felicidade é o caminho, não apenas o destino.",
        "Confie no processo; o universo está conspirando ao seu favor.",
        "Acredite em si mesmo e tudo será possível.",
        "Hoje é o dia perfeito para começar algo novo.",
        "Oportunidades escondem-se onde menos se espera.",
        "Sua determinação é sua maior força.",
        "Você está mais perto do sucesso do que imagina.",
        "Algo maravilhoso está prestes a acontecer.",
        "A sorte favorece os corajosos.",
        "Grandes mudanças começam com pequenos passos.",
        "Você é a energia que atrai suas melhores conquistas.",
        "Cada desafio traz consigo uma oportunidade única.",
        "Acredite: o universo tem um plano perfeito para você.",
        "A sabedoria vem do coração, não apenas da mente.",
        "Os ventos da mudança sopram a seu favor.",
        "Uma nova amizade trará alegria inesperada.",
        "O futuro pertence a quem acredita na beleza dos seus sonhos.",
        "Uma atitude positiva pode transformar qualquer situação.",
        "Você está exatamente onde precisa estar neste momento.",
        "Cada passo dado com fé é um passo rumo ao sucesso.",
        "Os dias mais brilhantes começam com um pensamento otimista.",
        "Um coração cheio de gratidão atrai milagres.",
        "Seja você mesmo; o mundo se ajustará.",
        "A resposta que você procura está dentro de você.",
        "A paciência é o segredo para grandes conquistas.",
        "Hoje é um bom dia para espalhar sorrisos.",
        "Sua energia positiva é seu maior superpoder.",
        "O melhor ainda está por vir, confie nisso.",
        "Uma nova oportunidade surgirá quando você menos esperar.",
        "Grandes sonhos começam com pequenas ideias.",
        "O sucesso é um reflexo da sua perseverança.",
        "Confie no tempo; ele sabe o momento certo para tudo.",
        "Você tem tudo o que precisa para realizar seus desejos.",
        "Caminhos inesperados podem levar a destinos incríveis.",
        "O amor e a alegria que você espalha sempre retornam.",
        "Acredite: sua luz pode iluminar o mundo.",
        "Seu sorriso é o primeiro passo para transformar o dia de alguém.",
        "O universo recompensa corações bondosos.",
        "Você está prestes a viver algo que sempre desejou.",
        "A simplicidade é o segredo para uma vida plena.",
        "Seus sonhos têm força suficiente para se tornarem realidade.",
        "Cada dia é uma nova chance para recomeçar.",
        "Ouça seu coração, ele conhece o caminho.",
        "A serenidade é a chave para tomar as melhores decisões.",
        "Algo especial está esperando por você ao virar da esquina.",
        "Você é a fonte de sua própria felicidade.",
        "A vida tem o hábito de surpreender os que acreditam.",
        "Seu coração conhece o caminho, confie nele.",
        "Um pequeno ato de bondade pode transformar um dia inteiro.",
        "O segredo do sucesso está na persistência.",
        "Novos começos trazem novas possibilidades.",
        "Um sorriso é o primeiro passo para abrir qualquer porta.",
        "Você é mais forte do que imagina e mais amado do que sabe.",
        "As respostas estão no silêncio; aprenda a ouvi-lo.",
        "Sua determinação transforma sonhos em realidade.",
        "Tudo que você planta com amor, floresce no tempo certo.",
    ];


    function quebraBiscoito() {
        let numeroAleatorio = Math.floor(Math.random() * frases.length);
        setTextoFrase(' "' + frases[numeroAleatorio] + '" ');
        setImg(require('./assets/biscoito/biscoitoAberto.png'));
    }

    function reiniciBiscoito() {
        setTextoFrase('');
        setImg(require('./assets/biscoito/biscoito.png'));
    }
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" translucent={false} backgroundColor="#363636" />

            <View style={styles.container}>
                <Image
                    source={img}
                    style={styles.img}
                />
                <Text style={styles.textofrase}>
                    {textoFrase}
                </Text>
                <TouchableOpacity style={styles.botao} onPress={quebraBiscoito}>
                    <View style={styles.btnArea}>
                        <Text style={styles.btnText}>Quebrar Biscoito</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.botao, { marginTop: 15, borderColor: '#121212' }]} onPress={reiniciBiscoito}>
                    <View style={styles.btnArea}>
                        <Text style={[styles.btnText, { color: '#121212' }]}>Reiniciar Biscoito</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    img: {
        width: 230,
        height: 230,
    },
    textofrase: {
        fontSize: 20,
        color: '#dd7b22',
        margin: 30,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    botao: {
        width: 230,
        height: 50,
        borderColor: '#dd7b22',
        borderWidth: 2,
        borderRadius: 25
    },
    btnArea: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#dd7b22'
    }

})
