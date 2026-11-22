import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';

export default function Estoque() {
  const [nomeProduto, setNomeProduto] = useState('');
  
  // Nosso "banco de dados" volátil em memória (Array de Objetos)
  const [itens, setItens] = useState([
    { id: '1', nome: 'Parafuso 3mm', qtd: '150' },
    { id: '2', nome: 'Chave Philips', qtd: '40' }
  ]);

  function adicionarProduto() {
    if (!nomeProduto) return;

    const novoItem = {
      id: String(new Date().getTime()), // Gera um ID único baseado no relógio
      nome: nomeProduto,
      qtd: '1'
    };

    // Atualiza o estado espalhando os antigos (...) e adicionando o novo
    setItens([...itens, novoItem]);
    setNomeProduto(''); // Limpa o input
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📦 Controle de Estoque (Memória)</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o nome do produto..."
        value={nomeProduto}
        onChangeText={setNomeProduto}
      />

      <TouchableOpacity style={styles.button} onPress={adicionarProduto}>
        <Text style={styles.buttonText}>Salvar na Memória</Text>
      </TouchableOpacity>

      <Text style={styles.subtitle}>Itens Cadastrados:</Text>

      {/* Renderiza a lista direto da memória RAM do app */}
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.itemText}>{item.nome}</Text>
            <Text style={styles.itemQtd}>Qtd: {item.qtd}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 60, backgroundColor: '#f5f5f5' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20, color: '#333' },
  subtitle: { fontSize: 16, fontWeight: 'bold', marginTop: 20, marginBottom: 10, color: '#555' },
  input: { backgroundColor: '#fff', padding: 15, borderRadius: 8, borderWidth: 1, borderColor: '#ddd', marginBottom: 10 },
  button: { backgroundColor: '#28a745', padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  card: { flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 8, borderWidth: 1, borderColor: '#eee' },
  itemText: { fontSize: 16, color: '#333' },
  itemQtd: { fontSize: 16, fontWeight: 'bold', color: '#28a745' }
});