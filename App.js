import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FlatListData from './DB/FlatList';
import useImcData from './DB/Storage/data';
import LineData from './DB/Grafico';
import PiGrafico from './DB/PieGrafico';

export default function App() {
  const { data, pieChartData, getImcValues} = useImcData();
  const datas = [1,2,3,4,5]
  return (
    <View style={styles.container}>
      <FlatListData data={data} />
      <LineData imcValues={getImcValues()} />
      <PiGrafico pieChartData={pieChartData}/>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});