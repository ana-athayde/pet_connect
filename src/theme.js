// Tokens do "Sistema PetConnect" (página 1 do PDF).
// Cores nomeadas vêm direto da página de sistema; as demais foram
// medidas nas telas (imagens 1080 x 2400 = 360 x 800 dp em 3x).

export const colors = {
  // página de sistema
  primary: '#6A3FD0',
  primaryContainer: '#EADDFF',
  tonal: '#E8DEF8',
  surfaceHigh: '#F1F1F3',
  surface: '#FAFAFA',
  error: '#B3261E',

  // medidas nas telas
  onPrimary: '#FFFFFF',
  onPrimaryContainer: '#21005D',
  onTonal: '#1D192B',
  text: '#1B1B1F',
  textVariant: '#47464B',
  placeholder: '#727276',
  outline: '#7A797E',
  divider: '#D3D1D8',
  errorContainer: '#F9DEDC',
  onErrorContainer: '#410E0B',
  photo: '#E4E4E6',
  photoLight: '#ECECEE',
  photoIcon: '#7A797E',
  searchField: '#E8E8EA',
  dialog: '#E9E8EC',
  scrim: 'rgba(0, 0, 0, 0.28)',
  white: '#FFFFFF',

  // mapa
  mapGround: '#E9E9EB',
  mapPark: '#D6E5CE',
  mapStreet: '#FFFFFF',
  markerDark: '#4B2A9F',
  userDot: '#1B6DF4',
  userHalo: '#BFD0EC',
};

export const fonts = {
  regular: 'RobotoFlex-Regular',
  medium: 'RobotoFlex-Medium',
};

// Escala tipográfica: tamanho / altura de linha (página de sistema)
export const type = {
  headline: { fontFamily: fonts.regular, fontSize: 28, lineHeight: 36 },
  name: { fontFamily: fonts.regular, fontSize: 26, lineHeight: 32 },
  screenTitle: { fontFamily: fonts.regular, fontSize: 22, lineHeight: 28 },
  sectionTitle: { fontFamily: fonts.medium, fontSize: 16, lineHeight: 24 },
  item: { fontFamily: fonts.regular, fontSize: 16, lineHeight: 24 },
  itemMedium: { fontFamily: fonts.medium, fontSize: 16, lineHeight: 24 },
  body: { fontFamily: fonts.regular, fontSize: 14, lineHeight: 20 },
  bodyMedium: { fontFamily: fonts.medium, fontSize: 14, lineHeight: 20 },
  label: { fontFamily: fonts.medium, fontSize: 12, lineHeight: 16, letterSpacing: 0.5 },
  caption: { fontFamily: fonts.regular, fontSize: 12, lineHeight: 16 },
};

// Formas e espaçamento (página de sistema)
export const radius = { field: 4, chip: 8, card: 16, button: 24 };
export const space = { side: 16, base: 8 };
