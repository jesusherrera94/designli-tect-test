import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAlerts } from '../hooks/useAlerts';

interface AddAlertScreenProps {
  navigation: any;
  onAlertAdded: (alert: { stock: string; price: number }) => void;
}

 export default function addAlert () {
    const [stock, setStock] = useState('AAPL');
    const [price, setPrice] = useState('');

    const { addAlert } = useAlerts();
  
    const handleAddAlert = async () => {
      if (!price) {
        return;
      }
      addAlert({ stock, price: parseFloat(price) });
      setPrice('');
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.titleStyle}>Add Alert</Text>
        <View style={styles.pickerContainer}>
          <Picker 
            selectedValue={stock}
            onValueChange={(itemValue) => setStock(itemValue)}
            style={styles.picker}
            >
            <Picker.Item label="AAPL" value="AAPL" />
            <Picker.Item label="GOOG" value="GOOG" />
            <Picker.Item label="MSFT" value="MSFT" />
          </Picker>
        </View>
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