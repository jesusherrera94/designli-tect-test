import { useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function StockCard({ stock, stockData, alertPrice }: any) {


    useEffect(() => {
        if (stockData?.p > alertPrice) {
          Notifications.scheduleNotificationAsync({
            content: {
              title: "Stock Alert",
              body: `${stock} has reached the alert price of $${alertPrice}`,
            },
            trigger: null,
          });
        }
      }, [stockData?.p, alertPrice]);

    // calculate the change
    const calculateChange = (c: number[]) => {
        if (c.length < 2) return 0;
        const initial = c[0];
        const final = c[c.length - 1];
        return ((final - initial) / initial) * 100;
      };
    
      const change = stockData?.c ? calculateChange(stockData.c) : 0;

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{stock}</Text>
      <Text>Value: $ {stockData?.p === undefined ? 'N/A' : stockData?.p }</Text>
      <Text>Change: {change.toFixed(2)}%</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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