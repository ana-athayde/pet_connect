import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { BottomActions, Button, Field, Screen, TopBar, Txt } from '../ui';
import { Tick } from '../icons';

export default function CadastroTutor({ nav }) {
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', senha: '', confirmar: '' });
  const [aceito, setAceito] = useState(false);
  const set = (key) => (text) => setForm({ ...form, [key]: text });

  return (
    <Screen>
      <TopBar title="Cadastro do tutor" onBack={nav.back} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Txt v="body" color={colors.textVariant} style={{ marginTop: 0 }}>
          Preencha seus dados para começar a usar o PetConnect.
        </Txt>

        <Field label="Nome completo" placeholder="Seu nome" value={form.nome} onChangeText={set('nome')} style={{ marginTop: 24 }} />
        <Field label="E-mail" placeholder="nome@exemplo.com" value={form.email} onChangeText={set('email')} keyboardType="email-address" style={{ marginTop: 20 }} />
        <Field label="Telefone" placeholder="(11) 99999-0000" value={form.telefone} onChangeText={set('telefone')} keyboardType="phone-pad" style={{ marginTop: 20 }} />
        <Field label="Senha" placeholder="Mínimo de 8 caracteres" value={form.senha} onChangeText={set('senha')} secure style={{ marginTop: 20 }} />
        <Field label="Confirmar senha" placeholder="Repita a senha" value={form.confirmar} onChangeText={set('confirmar')} secure style={{ marginTop: 20 }} />

        <Pressable onPress={() => setAceito(!aceito)} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16 }}>
          <View
            style={{
              width: 14,
              height: 14,
              borderRadius: 2,
              borderWidth: aceito ? 0 : 1.5,
              borderColor: colors.textVariant,
              backgroundColor: aceito ? colors.primary : 'transparent',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {aceito ? <Tick size={12} color={colors.white} strokeWidth={3} /> : null}
          </View>
          <Txt v="item" style={{ flex: 1, marginLeft: 18 }}>
            Li e aceito os Termos de Uso e a Política de Privacidade
          </Txt>
        </Pressable>
      </ScrollView>

      <BottomActions>
        <Button label="Criar conta" onPress={() => nav.tab('Inicio')} />
      </BottomActions>
    </Screen>
  );
}
