// Componentes básicos do sistema PetConnect (página 1 do PDF).
// Cada um é uma função simples, sem estado escondido.
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, type } from './theme';
import {
  Calendar,
  Camera,
  ChevronLeft,
  ChevronRight,
  House,
  MapPin,
  Paw,
  Trash,
  User,
  Users,
  X,
} from './icons';

// ---------- Texto ----------

export function Txt({ v = 'body', color = colors.text, style, ...rest }) {
  return <Text style={[type[v], { color }, style]} {...rest} />;
}

// ---------- Estrutura da tela ----------

// bottomBg pinta a faixa de gestos do sistema (cor da barra inferior quando houver)
export function Screen({ children, bg = colors.surface, bottomBg = bg }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: bottomBg }} edges={['bottom']}>
      <SafeAreaView style={{ flex: 1, backgroundColor: bg }} edges={['top']}>
        {children}
      </SafeAreaView>
    </SafeAreaView>
  );
}

// Barra superior de 64 dp: título 22/28 e até dois ícones à direita
// close = true troca a seta de voltar por um X
export function TopBar({ title, onBack, close, children }) {
  return (
    <View style={{ height: 64, flexDirection: 'row', alignItems: 'center' }}>
      {onBack ? (
        <Pressable onPress={onBack} style={{ width: 48, height: 48, marginLeft: 3, marginRight: 5, alignItems: 'center', justifyContent: 'center' }}>
          {close ? <X size={24} color={colors.textVariant} /> : <ChevronLeft size={30} color={colors.textVariant} strokeWidth={1.6} />}
        </Pressable>
      ) : (
        <View style={{ width: 16 }} />
      )}
      <Txt v="screenTitle" style={{ flex: 1 }} numberOfLines={1}>
        {title}
      </Txt>
      <View style={{ flexDirection: 'row', gap: 8, marginRight: 4 }}>{children}</View>
    </View>
  );
}

// Botão de ícone 48 x 48 (alvo de toque) com ícone de 24
export function IconButton({ icon: Icon, onPress, color = colors.textVariant, size = 24 }) {
  return (
    <Pressable onPress={onPress} style={{ width: 48, height: 48, alignItems: 'center', justifyContent: 'center' }}>
      <Icon size={size} color={color} />
    </Pressable>
  );
}

// ---------- Barra inferior: cinco destinos fixos ----------

const TABS = [
  { name: 'Inicio', label: 'Início', icon: House },
  { name: 'Comunidade', label: 'Comunidade', icon: Users },
  { name: 'Rotina', label: 'Rotina', icon: Calendar },
  { name: 'Mapa', label: 'Mapa', icon: MapPin },
  { name: 'Perfil', label: 'Perfil', icon: User },
];

export function BottomNav({ active, nav }) {
  return (
    <View style={{ height: 80, backgroundColor: colors.surfaceHigh, flexDirection: 'row', paddingHorizontal: 7.5 }}>
      {TABS.map((tab) => {
        const on = tab.name === active;
        const Icon = tab.icon;
        return (
          <Pressable key={tab.name} onPress={() => nav.tab(tab.name)} style={{ flex: 1, alignItems: 'center' }}>
            <View
              style={{
                marginTop: 12,
                width: 64,
                height: 32,
                borderRadius: 16,
                backgroundColor: on ? colors.tonal : 'transparent',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon size={24} color={on ? colors.onTonal : colors.textVariant} />
            </View>
            <Txt
              v="caption"
              color={on ? colors.onTonal : colors.textVariant}
              style={{ marginTop: 4, fontFamily: on ? fonts.medium : fonts.regular }}
            >
              {tab.label}
            </Txt>
          </Pressable>
        );
      })}
    </View>
  );
}

// ---------- Botões (raio 24) ----------

const BUTTON_STYLES = {
  filled: { bg: colors.primary, fg: colors.onPrimary, border: null },
  tonal: { bg: colors.tonal, fg: colors.onTonal, border: null },
  outlined: { bg: 'transparent', fg: colors.primary, border: colors.outline },
  text: { bg: 'transparent', fg: colors.primary, border: null },
};

export function Button({ label, kind = 'filled', color, onPress, style, height = 48 }) {
  const s = BUTTON_STYLES[kind];
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          height,
          borderRadius: height / 2,
          backgroundColor: s.bg,
          borderWidth: s.border ? 1 : 0,
          borderColor: s.border || undefined,
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 24,
        },
        style,
      ]}
    >
      <Txt v="bodyMedium" color={color || s.fg} style={{ letterSpacing: 0.1 }}>
        {label}
      </Txt>
    </Pressable>
  );
}

// ---------- Chips (raio 8) ----------

export function Chip({ label, selected, onPress, letter, icon: Icon, bg = 'transparent', border = colors.outline, height = 44 }) {
  return (
    <Pressable
      onPress={onPress}
      style={{
        height,
        borderRadius: radius.chip,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
        backgroundColor: selected ? colors.tonal : bg,
        borderWidth: 1,
        borderColor: selected ? 'transparent' : border,
      }}
    >
      {letter ? (
        <View style={{ marginRight: 8 }}>
          <Avatar letter={letter} size={24} textSize={12} />
        </View>
      ) : null}
      {Icon ? (
        <View style={{ marginRight: 8 }}>
          <Icon size={18} color={selected ? colors.onTonal : colors.textVariant} />
        </View>
      ) : null}
      <Txt v="bodyMedium" color={selected ? colors.onTonal : colors.textVariant}>
        {label}
      </Txt>
    </Pressable>
  );
}

// Linha horizontal de chips, cortada na margem lateral
export function ChipRow({ children, style, height }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={[{ marginHorizontal: 16, flexGrow: 0, height }, style]}
      contentContainerStyle={{ gap: 8, alignItems: 'flex-start' }}
    >
      {children}
    </ScrollView>
  );
}

// Chips que quebram linha (formulários)
export function ChipWrap({ children, style }) {
  return <View style={[{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }, style]}>{children}</View>;
}

// Etiqueta pequena (ex.: "Saúde", "Em breve", "Perdido")
export function Tag({ label, bg = colors.tonal, color = colors.onTonal, style }) {
  return (
    <View style={[{ height: 24, borderRadius: radius.chip, backgroundColor: bg, paddingHorizontal: 8, justifyContent: 'center', alignSelf: 'flex-start' }, style]}>
      <Txt v="bodyMedium" color={color} style={{ fontSize: 12, lineHeight: 16 }}>
        {label}
      </Txt>
    </View>
  );
}

// ---------- Campo de texto com contorno (raio 4) ----------

export function Field({ label, value, onChangeText, placeholder, right: Right, multiline, height = 56, secure, style, keyboardType }) {
  return (
    <View style={[{ height, borderWidth: 1, borderColor: colors.outline, borderRadius: radius.field }, style]}>
      <View style={{ position: 'absolute', left: 12, top: -9, paddingHorizontal: 4, backgroundColor: colors.surface }}>
        <Txt v="caption" color={colors.textVariant}>
          {label}
        </Txt>
      </View>
      <View style={{ flex: 1, flexDirection: 'row', alignItems: multiline ? 'flex-start' : 'center' }}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.placeholder}
          secureTextEntry={secure}
          multiline={multiline}
          keyboardType={keyboardType}
          style={[
            type.item,
            {
              flex: 1,
              color: colors.text,
              paddingHorizontal: 16,
              paddingTop: multiline ? 15 : 0,
              paddingBottom: 0,
              height: multiline ? '100%' : 54,
              textAlignVertical: multiline ? 'top' : 'center',
              outlineStyle: 'none',
            },
          ]}
        />
        {Right ? (
          <View style={{ width: 48, height: 54, alignItems: 'center', justifyContent: 'center', marginRight: 0 }}>
            <Right size={24} color={colors.textVariant} />
          </View>
        ) : null}
      </View>
    </View>
  );
}

// ---------- Superfícies ----------

export function Card({ children, style, onPress }) {
  const body = (
    <View style={[{ backgroundColor: colors.surfaceHigh, borderRadius: radius.card, padding: 16 }, style]}>{children}</View>
  );
  return onPress ? <Pressable onPress={onPress}>{body}</Pressable> : body;
}

export function Divider({ style }) {
  return <View style={[{ height: 1, backgroundColor: colors.divider }, style]} />;
}

// Avatar circular: letra(s) ou pata
export function Avatar({ letter, size = 40, textSize = 16, paw, bg = colors.primaryContainer }) {
  return (
    <View style={{ width: size, height: size, borderRadius: size / 2, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}>
      {paw ? (
        <Paw size={paw} color={colors.primary} />
      ) : (
        <Txt v="bodyMedium" color={colors.primary} style={{ fontSize: textSize, lineHeight: textSize + 4 }}>
          {letter}
        </Txt>
      )}
    </View>
  );
}

// Quadrado arredondado com ícone (atalhos, miniaturas)
export function IconTile({ icon: Icon, size = 56, iconSize = 24, bg = colors.tonal, color = colors.onTonal, r = 16 }) {
  return (
    <View style={{ width: size, height: size, borderRadius: r, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}>
      <Icon size={iconSize} color={color} />
    </View>
  );
}

// Linha de lista: elemento à esquerda, título, apoio e algo à direita
export function ListRow({ left, title, subtitle, right, onPress, height = 64, titleV = 'item', style }) {
  return (
    <Pressable onPress={onPress} style={[{ minHeight: height, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16 }, style]}>
      {left ? <View style={{ marginRight: 16 }}>{left}</View> : null}
      <View style={{ flex: 1 }}>
        <Txt v={titleV}>{title}</Txt>
        {subtitle ? (
          <Txt v="body" color={colors.textVariant}>
            {subtitle}
          </Txt>
        ) : null}
      </View>
      {right}
    </Pressable>
  );
}

export function Chevron() {
  return <ChevronRight size={24} color={colors.textVariant} />;
}

// Tabela de informações dentro de um card (rótulo à esquerda, valor à direita)
export function InfoCard({ rows, style }) {
  return (
    <View style={[{ backgroundColor: colors.surfaceHigh, borderRadius: radius.card, paddingHorizontal: 16, paddingVertical: 3 }, style]}>
      {rows.map(([label, value], i) => (
        <View key={label}>
          {i > 0 ? <Divider /> : null}
          <View style={{ height: 48, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Txt v="body" color={colors.textVariant}>
              {label}
            </Txt>
            <Txt v="bodyMedium">{value}</Txt>
          </View>
        </View>
      ))}
    </View>
  );
}

// Foto ainda não carregada: caixa cinza com câmera
export function PhotoBox({ style, iconSize = 24, light, children }) {
  return (
    <View style={[{ backgroundColor: light ? colors.photoLight : colors.photo, borderRadius: radius.card, alignItems: 'center', justifyContent: 'center' }, style]}>
      <Camera size={iconSize} color={colors.photoIcon} />
      {children}
    </View>
  );
}

// Botão flutuante (quadrado 56 ou estendido com rótulo)
export function Fab({ icon: Icon, label, onPress, style }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          position: 'absolute',
          right: 16,
          bottom: 16,
          height: 56,
          minWidth: 56,
          borderRadius: 16,
          backgroundColor: colors.primaryContainer,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: label ? 16 : 0,
          paddingRight: label ? 20 : 0,
          shadowColor: '#000',
          shadowOpacity: 0.18,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 3 },
          elevation: 3,
        },
        style,
      ]}
    >
      <Icon size={24} color={colors.onPrimaryContainer} />
      {label ? (
        <Txt v="bodyMedium" color={colors.onPrimaryContainer} style={{ marginLeft: 12, letterSpacing: 0.1 }}>
          {label}
        </Txt>
      ) : null}
    </Pressable>
  );
}

// Interruptor Material 3 (52 x 32)
export function Switch({ value, onChange }) {
  return (
    <Pressable
      onPress={() => onChange(!value)}
      style={{
        width: 52,
        height: 32,
        borderRadius: 16,
        backgroundColor: value ? colors.primary : '#E6E5EA',
        borderWidth: value ? 0 : 2,
        borderColor: colors.outline,
        justifyContent: 'center',
        paddingHorizontal: value ? 4 : 6,
        alignItems: value ? 'flex-end' : 'flex-start',
      }}
    >
      <View
        style={{
          width: value ? 24 : 16,
          height: value ? 24 : 16,
          borderRadius: 12,
          backgroundColor: value ? colors.white : colors.outline,
        }}
      />
    </Pressable>
  );
}

// Caixa de confirmação de exclusão
// confirmWidth: largura fixa do botão de confirmar (o PDF quebra "Cancelar agendamento" em duas linhas)
export function ConfirmDialog({ visible, title = 'Excluir item?', message = 'Esta ação não pode ser desfeita.', confirmLabel = 'Excluir', cancelLabel = 'Cancelar', confirmWidth, onConfirm, onCancel }) {
  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onCancel}>
      <View style={{ flex: 1, backgroundColor: colors.scrim, justifyContent: 'center', paddingHorizontal: 24 }}>
        <View
          style={{
            backgroundColor: colors.dialog,
            borderRadius: 28,
            marginTop: 5,
            paddingTop: 24,
            paddingHorizontal: 24,
            paddingBottom: 28,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
            elevation: 6,
          }}
        >
          <View style={{ alignItems: 'center' }}>
            <Trash size={24} color={colors.error} />
          </View>
          <Txt style={{ fontSize: 24, lineHeight: 32, fontFamily: fonts.regular, textAlign: 'center', marginTop: 16 }}>{title}</Txt>
          <Txt v="body" color={colors.textVariant} style={{ marginTop: 16 }}>
            {message}
          </Txt>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 24, gap: 8 }}>
            <Pressable onPress={onCancel} style={{ minHeight: 48, paddingHorizontal: 16, justifyContent: 'center' }}>
              <Txt v="bodyMedium" color={colors.primary}>
                {cancelLabel}
              </Txt>
            </Pressable>
            <Pressable onPress={onConfirm} style={{ minHeight: 48, paddingHorizontal: 16, justifyContent: 'center', width: confirmWidth }}>
              <Txt v="bodyMedium" color={colors.error}>
                {confirmLabel}
              </Txt>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// Barra fixa no rodapé para a ação primária da tela
export function BottomActions({ children }) {
  return <View style={{ paddingHorizontal: 16, paddingBottom: 16, gap: 8 }}>{children}</View>;
}
