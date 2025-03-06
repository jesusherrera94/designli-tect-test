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
    backgroundGradientFrom: '#fff',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#fff',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
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
    setData({ ...construcData });

  }, [stocks]);

  useEffect(() => {
    setLocalAlerts(alerts);
  }, [alerts]);

  return (
    <View style={styles.container}>
      <BarChart
          style={graphStyle}
          data={data}
          width={screenWidth}
          height={220}
          yAxisLabel="$"
          yAxisSuffix=""
          chartConfig={chartConfig}
          verticalLabelRotation={30}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
