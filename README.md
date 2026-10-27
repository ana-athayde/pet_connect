# PetConnect (React Native + JavaScript)

Recriação do protótipo "Sistema PetConnect — Material 3 para Android" (PDF de 44 páginas):
29 telas, os estados de seleção/menu e as 9 caixas de confirmação, com navegação entre elas.

## Como rodar

```bash
npm install
npx expo start          # abre o menu do Expo
# a = emulador Android · i = simulador iOS · w = navegador
```

O app usa só módulos que já vêm no Expo Go (SDK 58), então também dá para abrir pelo QR code.

No navegador dá para abrir uma tela direto pela URL: `http://localhost:8081/?tela=Mapa`
(o nome é o do arquivo em `src/screens`).

## Estrutura

```
App.js            pilha de telas (useState), carregamento das fontes, botão voltar do Android
src/theme.js      cores, tipografia, raios e espaçamento da página de sistema do PDF
src/ui.js         componentes básicos: barra superior, barra inferior, botões, chips,
                  campos, cards, interruptor, botão flutuante, caixa de confirmação
src/icons.js      ícones Lucide + desenhos próprios (pata, xícara, ajustes)
src/data.js       dados de exemplo (Luna, Fluffy, postagens, locais…)
src/screens/      uma tela por arquivo
assets/fonts/     Roboto Flex 400 e 500 (licença OFL em assets/fonts/OFL.txt)
```

A navegação é uma pilha simples: `nav.go('Tela', params)`, `nav.back()` e
`nav.tab('Tela')` (recomeça a pilha, usado pela barra inferior).

## Telas e páginas do PDF

| Página do PDF | Arquivo em `src/screens` |
| ------------- | ------------------------ |
| 1             | `src/theme.js` e `src/ui.js` (sistema) |
| 2             | Login |
| 3             | Inicio |
| 4 e 33        | Comunidade (Geral / Meus grupos) |
| 5             | Mapa |
| 6             | barra inferior (`BottomNav` em `src/ui.js`) |
| 7 e 31        | Rotina (com lembretes / vazia) |
| 8             | Perfil |
| 9             | AvisoSumico |
| 10            | CadastroPet |
| 11            | Cuidados |
| 12            | Saude |
| 13            | PetsPerdidos |
| 14            | Grupos |
| 15 e 34       | Postagem (com o menu ⋮) |
| 16            | Tutor (conversa) |
| 17            | Feedback |
| 18            | CadastroTutor |
| 19            | Filtros |
| 20            | Local |
| 21            | EditarLembrete |
| 22 e 35       | Album (e modo de seleção) |
| 23            | Configuracoes |
| 24            | Notificacoes |
| 25            | NovaPostagem |
| 26            | PetPerdido |
| 27            | BoasVindas (primeira tela do app) |
| 28            | MeuPerfil |
| 29            | Grupo |
| 30            | AgendarConsulta |
| 32            | AvisoPublicado |
| 36 a 44       | caixas de confirmação (`ConfirmDialog` em `src/ui.js`) |

## Sobre a fidelidade

As medidas saíram das imagens do PDF (1080 × 2400 px = 360 × 800 dp em 3×) e cada tela
foi comparada com o original sobrepondo capturas do app. Dois detalhes do PDF foram
mantidos de propósito, porque fazem parte do "jeito exato que está":

- em Comunidade › Geral, a fileira de filtros aparece cortada na parte de baixo
  (`ChipRow height={31}` em `Comunidade.js`; remova o `height` para mostrar os chips inteiros);
- em Cadastro do pet, o campo "Peso (kg)" passa da borda direita da tela
  (larguras fixas no fim de `CadastroPet.js`).

A fonte é a Roboto Flex do PDF, gerada em dois pesos fixos (400 e 500) a partir da
versão variável, porque o React Native não ajusta eixos de fontes variáveis.
