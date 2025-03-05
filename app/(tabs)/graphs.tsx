import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import { useAlerts } from '../../hooks/useAlerts';

export default function Graphs() {

  const [localAlerts, setLocalAlerts] = useState<any[]>([]);
  const { alerts } = useAlerts();

  useEffect(() => {
    setLocalAlerts(alerts);
  }, [alerts]);

  return (
    <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {localAlerts.length > 0 ? (
        localAlerts.map((alert, index) => (
          <View key={index} style={styles.stepContainer}>
            <View style={styles.titleContainer}>
              <Icon size={24} name="bell" color={'#f0f0f0'} type="font-awesome" />
              <Text style={styles.textTitleContainer}>{alert.stock} - {alert.price}</Text>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.textNoAlerts}>No alerts</Text>
      )}
    </ScrollView>
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
