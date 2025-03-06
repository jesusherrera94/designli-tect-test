import { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { useAlerts } from '../../hooks/useAlerts';
import { BarChart } from 'react-native-chart-kit';
import { useStocks } from '@/hooks/useStocks';

export default function Graphs() {

  const [localAlerts, setLocalAlerts] = useState<any[]>([]);
  const [data, setData] = useState<{ labels: string[], datasets: { data: number[] }[] }>({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const { stocks } = useStocks();
  const screenWidth = Dimensions.get('window').width;
  const { alerts } = useAlerts();

  const graphStyle = {
    marginVertical: 8,
    borderRadius: 16,
  };
  const chartConfig = {
    backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 2, 
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
  };

  useEffect(() => {
    const labels = Object.keys(stocks);
    const dataset = Object.values(stocks).map((stock: any) => stock.p);

    const construcData = {
      labels: labels,
      datasets: [
        {
          data: dataset,
        },
      ],
    };
    console.log('Data', construcData);
    setData(construcData);

  }, [stocks]);

  useEffect(() => {
    setLocalAlerts(alerts);
  }, [alerts]);

  return (
    <View style={styles.container}>
      <Text style={styles.titleStyle}>Graphs Views</Text>
      <View style={styles.graphContainer}>
        <BarChart
            style={graphStyle}
            data={data}
            width={screenWidth - 40}
            height={220}
            yAxisLabel="$"
            yAxisSuffix=""
            chartConfig={chartConfig}
            verticalLabelRotation={30}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 50,
    justifyContent: 'center',
  },
  graphContainer: {
    marginTop: 20,

  },
  titleStyle: {
    alignContent: 'center',
    color: '#f0f0f0',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
