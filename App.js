import { useEffect, useState } from 'react';
import { BackHandler, Platform, View } from 'react-native';
import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { initialData } from './src/data';
import { colors } from './src/theme';

import AgendarConsulta from './src/screens/AgendarConsulta';
import Album from './src/screens/Album';
import AvisoPublicado from './src/screens/AvisoPublicado';
import AvisoSumico from './src/screens/AvisoSumico';
import BoasVindas from './src/screens/BoasVindas';
import CadastroPet from './src/screens/CadastroPet';
import CadastroTutor from './src/screens/CadastroTutor';
import Comunidade from './src/screens/Comunidade';
import Configuracoes from './src/screens/Configuracoes';
import Cuidados from './src/screens/Cuidados';
import EditarLembrete from './src/screens/EditarLembrete';
import Feedback from './src/screens/Feedback';
import Filtros from './src/screens/Filtros';
import Grupo from './src/screens/Grupo';
import Grupos from './src/screens/Grupos';
import Inicio from './src/screens/Inicio';
import Local from './src/screens/Local';
import Login from './src/screens/Login';
import Mapa from './src/screens/Mapa';
import MeuPerfil from './src/screens/MeuPerfil';
import Notificacoes from './src/screens/Notificacoes';
import NovaPostagem from './src/screens/NovaPostagem';
import Perfil from './src/screens/Perfil';
import PetPerdido from './src/screens/PetPerdido';
import PetsPerdidos from './src/screens/PetsPerdidos';
import Postagem from './src/screens/Postagem';
import Rotina from './src/screens/Rotina';
import Saude from './src/screens/Saude';
import Tutor from './src/screens/Tutor';

const SCREENS = {
  AgendarConsulta,
  Album,
  AvisoPublicado,
  AvisoSumico,
  BoasVindas,
  CadastroPet,
  CadastroTutor,
  Comunidade,
  Configuracoes,
  Cuidados,
  EditarLembrete,
  Feedback,
  Filtros,
  Grupo,
  Grupos,
  Inicio,
  Local,
  Login,
  Mapa,
  MeuPerfil,
  Notificacoes,
  NovaPostagem,
  Perfil,
  PetPerdido,
  PetsPerdidos,
  Postagem,
  Rotina,
  Saude,
  Tutor,
};

// No navegador dá para abrir uma tela direto: ?tela=Mapa
function firstScreen() {
  if (Platform.OS === 'web') {
    const name = new URLSearchParams(window.location.search).get('tela');
    if (SCREENS[name]) return name;
  }
  return 'BoasVindas';
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'RobotoFlex-Regular': require('./assets/fonts/RobotoFlex-Regular.ttf'),
    'RobotoFlex-Medium': require('./assets/fonts/RobotoFlex-Medium.ttf'),
  });

  // Pilha de telas: a última é a que aparece
  const [stack, setStack] = useState([{ name: firstScreen(), params: {} }]);

  // Dados do protótipo, compartilhados entre as telas
  const [data, setData] = useState(initialData);

  const nav = {
    go: (name, params = {}) => setStack((s) => [...s, { name, params }]),
    back: () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)),
    // destinos da barra inferior e telas "raiz" recomeçam a pilha
    tab: (name, params = {}) => setStack([{ name, params }]),
  };

  // Botão "voltar" do Android
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      if (stack.length > 1) {
        nav.back();
        return true;
      }
      return false;
    });
    return () => sub.remove();
  }, [stack.length]);

  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: colors.surface }} />;
  }

  const current = stack[stack.length - 1];
  const Current = SCREENS[current.name];

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <Current key={stack.length + current.name} nav={nav} params={current.params} data={data} setData={setData} />
    </SafeAreaProvider>
  );
}
