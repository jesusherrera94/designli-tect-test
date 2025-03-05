import { Text, View, StyleSheet } from 'react-native';

// TODO: refactor this
export default function StockCard({stock, value, change}: any) {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{stock}</Text>
            <Text>Value: ${value}</Text>
            <Text>Change: {change}%</Text>
        </View>
    );
};

  const styles = StyleSheet.create({
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
  });