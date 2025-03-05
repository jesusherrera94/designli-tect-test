import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Icon } from 'react-native-elements';
import { FloatingAction } from 'react-native-floating-action';
import { useNavigation } from '@react-navigation/native';
import { useAlerts } from '../../hooks/useAlerts';
import StockCard  from '../../components/StockCard';


export default function HomeScreen() {

  const [localAlerts, setLocalAlerts] = useState<any[]>([]);

  const navigation = useNavigation<any>();
  const { alerts } = useAlerts();

  const handleAddAlert = () => {
    navigation.navigate('addAlert');
  }


  useEffect(() => {
    setLocalAlerts(alerts);
  }, [alerts]);


  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {localAlerts.length > 0 ? (
          localAlerts.map((alert, index) => (
            <View key={index} style={styles.stepContainer}>
              <StockCard stock={alert.stock} value={'100'} change={'100'} />
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
          }]}
        onPressItem={() => handleAddAlert()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  }
});
