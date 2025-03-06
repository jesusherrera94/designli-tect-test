import { useEffect, useState, useRef } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { FloatingAction } from 'react-native-floating-action';
import { useNavigation } from '@react-navigation/native';
import { useAlerts } from '../../hooks/useAlerts';
import StockCard from '../../components/StockCard';
import { useFinhubConfigs } from '../../hooks/useFinhubConfigs';
import { useStocks } from '@/hooks/useStocks';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export default function HomeScreen() {

  const [localAlerts, setLocalAlerts] = useState<any[]>([]);
  const [stockData, setStockData] = useState<any>({});
  const navigation = useNavigation<any>();
  const { alerts } = useAlerts();
  const { apiId, socket } = useFinhubConfigs();
  const { setStocks } = useStocks();
  const socketRef = useRef<WebSocket | null>(null);
  const { getItem, setItem } = useLocalStorage();

  const handleAddAlert = () => {
    navigation.navigate('addAlert');
  };

  useEffect(() => {
    const loadItems = async () => {
    getItem('alerts').then((data: any) => {
      console.log('Data', data);
      if (data) {
        setLocalAlerts(data);
      }
    });
  }
    loadItems();
  }, []);

  useEffect(() => {
    const socketController = new WebSocket(`${socket}?token=${apiId}`);
    socketRef.current = socketController;

    socketController.onopen = () => {
      localAlerts.forEach((alert) => {
        socketController.send(JSON.stringify({ type: 'subscribe', symbol: alert.stock }));
      });
    };

    socketController.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Socket data', data);
      if (data.type === 'trade') {
        setStockData((prevData: any) => ({
          ...prevData,
          [data.data[0].s]: data.data[0],
        }));
        setStocks((prevStocks: any) => ({
          ...prevStocks,
          [data.data[0].s]: data.data[0],
        }));
      }
    };
    socketController.onerror = (error) => {
      console.log('Socket error', error);
    };

    return () => {
      socketController.close();
    };
  }, [apiId, socket, localAlerts]);

  useEffect(() => {
    setLocalAlerts(alerts);
    setItem('alerts', alerts);
  }, [alerts]);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.titleStyle}>Your Watchlist</Text>
        {localAlerts.length > 0 ? (
          localAlerts.map((alert, index) => (
            <View key={index} style={styles.stepContainer}>
              <StockCard stock={alert.stock} alertPrice={alert.price} stockData={stockData[alert.stock]} />
            </View>
          ))
        ) : (
          <Text style={styles.textNoAlerts}>No alerts</Text>
        )}
      </ScrollView>

      <FloatingAction
        actions={[
          {
            name: 'addAlert',
            icon: <Icon size={24} name="bell" color={'#fff'} type="font-awesome" />,
          },
        ]}
        onPressItem={() => handleAddAlert()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
  },
  scrollContainer: {
    padding: 16,
    flexGrow: 1,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    marginTop: 8,
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  textTitleContainer: {
    color: '#f0f0f0',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  textNoAlerts: {
    marginTop: '50%',
    textAlign: 'center',
    color: '#f0f0f0',
    fontSize: 28,
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