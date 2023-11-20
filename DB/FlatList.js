import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

const FlatListData = ({ data }) => {
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>ID: {item.id}</Text>
      <Text>Data: {item.data}</Text>
      <Text>IMC: {item.imc}</Text>
      <Text>Status: {item.status}</Text>

      {/* Renderizando a subcoleção 'Treino' */}
      {item.treino && item.treino.length > 0 && (
        <FlatList
          data={item.treino}
          keyExtractor={(treinoItem) => treinoItem.id}
          renderItem={({ item: treinoItem }) => (
            <View>
              <Text>Status do Treino: {treinoItem.status}</Text>
            </View>
          )}
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default FlatListData;
