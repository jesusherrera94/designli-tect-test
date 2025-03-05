import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAlerts } from '../hooks/useAlerts';
import { useFinhubConfigs } from '@/hooks/useFinhubConfigs';
import { StockSymbols } from '@/interfaces/StockSymbols';

interface AddAlertScreenProps {
  navigation: any;
  onAlertAdded: (alert: { stock: string; price: number }) => void;
}


 export default function addAlert () {
    const [stock, setStock] = useState('');
    const [price, setPrice] = useState('');
    const [stockSymbols, setStockSymbols] = useState<StockSymbols[]>([]);
    const [loading, setLoading] = useState(true);

    const { addAlert } = useAlerts();
    const { apiId } = useFinhubConfigs();

    useEffect(() => {

      const loadStockSimbols = async () => {
        try {
        const response = await fetch(`https://finnhub.io/api/v1/stock/symbol?exchange=US&token=${apiId}`);
        const data = await response.json();
        const sortedData = data.sort((a: StockSymbols, b: StockSymbols) => a.symbol.localeCompare(b.symbol));
        setStock(sortedData[0].symbol);
        setStockSymbols(sortedData);
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

      loadStockSimbols();

    }, []);
  
    const handleAddAlert = async () => {
      if (!price) {
        Alert.alert('Price is required to add the alert');
        return;
      }
      addAlert({ stock, price: parseFloat(price) });
      setPrice('');
    };
  
    return (
      <View style={styles.container}>
      <Text style={styles.titleStyle}>Add Alert</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={stock}
            onValueChange={(itemValue) => setStock(itemValue)}
            style={styles.picker}
          >
            {stockSymbols.map((symbol) => (
              <Picker.Item key={symbol.symbol} label={symbol.symbol} value={symbol.symbol} />
            ))}
          </Picker>
        </View>
      )}
      <TextInput
        style={styles.input}
        placeholder="Price Alert"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.button} onPress={handleAddAlert}>
        <Text style={styles.buttonText}>Add Alert</Text>
      </TouchableOpacity>
    </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      padding: 20,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
      color: '#f0f0f0'
    },
    picker: {
      height: 50,
      color: '#f0f0f0',
      borderColor: 'gray',
      width: '100%',
      borderWidth: 1,
    },
    pickerContainer: {
      borderColor: 'gray',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 10,
    },
    button: {
      backgroundColor: 'blue',
      padding: 10,
      alignItems: 'center',
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
    },
    card: {
      backgroundColor: '#f0f0f0',
      padding: 15,
      marginBottom: 10,
      borderRadius: 5,
    },
    cardTitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    titleStyle: {
      alignContent: 'center',
      color: '#f0f0f0',
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 10,
    },
  });