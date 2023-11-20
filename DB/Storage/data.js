import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyCLYJG3rtsxX50qIXGyMhoC8mD-DtIT2qo',
    authDomain: 'imc-react-native-88645.firebaseapp.com',
    projectId: 'imc-react-native-88645',
    storageBucket: 'imc-react-native-88645.appspot.com',
    messagingSenderId: '171763356642',
    appId: '1:171763356642:web:ca838f8250e3a39bb61fbb',
  }

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const useImcData = () => {
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

  const getImcValues = () => {
    return data.map((item) => {
      const imc = parseFloat(item.imc);
      return !isNaN(imc) ? imc : null;
    }).filter((value) => value !== null);
  };
  const formatDataForPieChart = (imcData) => {
    return imcData.map((item, index) => ({
      name: `Category ${index + 1}`,
      population: parseFloat(item.imc),
      color: `rgba(131, 167, 234, 1)`, // Customize the color as needed
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    }));
  };
  const pieChartData = formatDataForPieChart(data);

  return { data, getImcValues, pieChartData };
};

export default useImcData;
