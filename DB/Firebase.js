// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, StyleSheet } from 'react-native';
// import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs } from 'firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'AIzaSyCLYJG3rtsxX50qIXGyMhoC8mD-DtIT2qo',
//   authDomain: 'imc-react-native-88645.firebaseapp.com',
//   projectId: 'imc-react-native-88645',
//   storageBucket: 'imc-react-native-88645.appspot.com',
//   messagingSenderId: '171763356642',
//   appId: '1:171763356642:web:ca838f8250e3a39bb61fbb',
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const FlatListData = () => {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const imcCollection = collection(db, 'Imc');
//       const snapshot = await getDocs(imcCollection);
//       const imcData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//       setData(imcData);
//     };

//     fetchData();
//   }, []);

//   const renderItem = ({ item }) => (
//     <View style={styles.item}>
//       <Text>ID: {item.id}</Text>
//       <Text>Data: {item.data}</Text>
//       <Text>IMC: {item.imc}</Text>
//       <Text>Status: {item.status}</Text>
//       {console.log()}
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={data}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 20,
//   },
//   item: {
//     backgroundColor: '#f9c2ff',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
// });

// export default FlatListData;
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCLYJG3rtsxX50qIXGyMhoC8mD-DtIT2qo',
  authDomain: 'imc-react-native-88645.firebaseapp.com',
  projectId: 'imc-react-native-88645',
  storageBucket: 'imc-react-native-88645.appspot.com',
  messagingSenderId: '171763356642',
  appId: '1:171763356642:web:ca838f8250e3a39bb61fbb',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const FlatListData = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const imcCollection = collection(db, 'Imc');
      const imcQuery = query(imcCollection);

      const snapshot = await getDocs(imcQuery);

      const imcData = [];
      for (const doc of snapshot.docs) {
        const treinoCollection = collection(doc.ref, 'Treino');
        const treinoSnapshot = await getDocs(treinoCollection);
        const treinoData = treinoSnapshot.docs.map((treinoDoc) => ({ id: treinoDoc.id, ...treinoDoc.data() }));

        imcData.push({ id: doc.id, ...doc.data(), treino: treinoData });
      }

      setData(imcData);
    };

    fetchData();
  }, []);

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
