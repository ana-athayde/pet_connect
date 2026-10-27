import { useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { colors } from '../theme';
import { BottomActions, Button, Chip, ChipWrap, ConfirmDialog, Field, Screen, TopBar, Txt } from '../ui';
import { Camera } from '../icons';

export default function CadastroPet({ nav, params, data, setData }) {
  // params.novo = cadastro de um pet novo; sem parâmetro edita a Luna
  const pet = params.novo ? null : data.pets.find((p) => p.id === (params.id || 'luna'));
  const [form, setForm] = useState({
    nome: pet ? pet.name : '',
    especie: pet ? pet.species : 'Cachorro',
    raca: pet ? pet.breed : '',
    sexo: pet ? pet.sex : 'Fêmea',
    nascimento: '',
    peso: '',
  });
  const [confirm, setConfirm] = useState(false);
  const set = (key) => (value) => setForm({ ...form, [key]: value });

  function save() {
    if (pet) {
      setData((d) => ({
        ...d,
        pets: d.pets.map((p) => (p.id === pet.id ? { ...p, name: form.nome, species: form.especie, breed: form.raca, sex: form.sexo } : p)),
      }));
    } else if (form.nome.trim()) {
      const novo = {
        id: 'pet' + Date.now(),
        name: form.nome.trim(),
        letter: form.nome.trim()[0].toUpperCase(),
        species: form.especie,
        breed: form.raca,
        age: '',
        sex: form.sexo,
        weight: form.peso ? `${form.peso} kg` : '',
        lastVisit: '—',
        nextVaccine: '—',
      };
      setData((d) => ({ ...d, pets: [...d.pets, novo] }));
    }
    nav.back();
  }

  function remove() {
    setData((d) => ({ ...d, pets: d.pets.filter((p) => p.id !== pet.id) }));
    setConfirm(false);
    nav.tab('Perfil');
  }

  return (
    <Screen>
      <TopBar title="Cadastro do pet" onBack={nav.back} />
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: 16 }}>
        <Pressable
          style={{
            alignSelf: 'center',
            width: 96,
            height: 96,
            borderRadius: 48,
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: colors.outline,
            backgroundColor: colors.surfaceHigh,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Camera size={24} color={colors.primary} />
        </Pressable>

        <Field label="Nome do pet" value={form.nome} onChangeText={set('nome')} style={{ marginTop: 20 }} />

        <Txt v="label" color={colors.textVariant} style={{ marginTop: 16 }}>
          Espécie
        </Txt>
        <ChipWrap style={{ marginTop: 8 }}>
          {['Cachorro', 'Gato', 'Outro'].map((e) => (
            <Chip key={e} label={e} selected={form.especie === e} onPress={() => set('especie')(e)} />
          ))}
        </ChipWrap>

        <Field label="Raça" value={form.raca} onChangeText={set('raca')} style={{ marginTop: 16 }} />

        <Txt v="label" color={colors.textVariant} style={{ marginTop: 16 }}>
          Sexo
        </Txt>
        <ChipWrap style={{ marginTop: 8 }}>
          {['Fêmea', 'Macho'].map((s) => (
            <Chip key={s} label={s} selected={form.sexo === s} onPress={() => set('sexo')(s)} />
          ))}
        </ChipWrap>

        {/* no PDF o campo de peso passa da borda direita da tela */}
        <View style={{ flexDirection: 'row', gap: 12, marginTop: 16, width: 356 }}>
          <Field label="Nascimento" placeholder="dd/mm/aaaa" value={form.nascimento} onChangeText={set('nascimento')} style={{ width: 212 }} />
          <Field label="Peso (kg)" placeholder="0,0" value={form.peso} onChangeText={set('peso')} keyboardType="decimal-pad" style={{ width: 132 }} />
        </View>
      </ScrollView>

      <BottomActions>
        <Button label="Salvar pet" onPress={save} />
        {pet ? <Button label="Excluir pet" kind="text" color={colors.error} onPress={() => setConfirm(true)} /> : null}
      </BottomActions>

      <ConfirmDialog
        visible={confirm}
        title={pet ? `Excluir ${pet.sex === 'Fêmea' ? 'a' : 'o'} ${pet.name}?` : ''}
        message={`O perfil, a rotina, o histórico de saúde e o álbum ${pet && pet.sex === 'Macho' ? 'dele' : 'dela'} serão removidos.`}
        confirmLabel="Excluir pet"
        onCancel={() => setConfirm(false)}
        onConfirm={remove}
      />
    </Screen>
  );
}
