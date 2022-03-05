import { ChartEvent, ChartOptions, LegendElement, LegendItem } from 'chart.js';
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import { useIntl } from 'react-intl';

import { useGetProgressQuery } from 'services/prephouse';

import { ColorPicker } from 'styles/colours';

import { camelCaseToWords } from 'utils/string';

const ProgressChart = () => {
  const intl = useIntl();
  const { data: progressData } = useGetProgressQuery();

  const labels = useMemo(
    () => progressData?.dates?.map(date => new Date(date).toDateString()),
    [progressData]
  );

  const datasets = useMemo(() => {
    const colorPicker = new ColorPicker();

    return Object.entries(progressData?.scores ?? {}).map(([key, value]) => ({
      label: camelCaseToWords(key),
      data: value,
      borderColor: colorPicker.getColor(),
      hidden: localStorage.getItem(camelCaseToWords(key)) === 'true',
    }));
  }, [progressData]);

  const chartData = {
    labels,
    datasets,
  };

  const chartOptions: ChartOptions<'line'> = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: intl.formatMessage({ id: 'progress.chart.xLabel' }),
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: intl.formatMessage({ id: 'progress.chart.yLabel' }),
        },
        min: 0,
        max: 100,
      },
    },
    plugins: {
      legend: {
        onClick: (evt: ChartEvent, legendItem: LegendItem, legend: LegendElement<'line'>) => {
          const nextState = (localStorage.getItem(legendItem.text) ?? 'true') === 'false';

          localStorage.setItem(legendItem.text, nextState.toString());
          const meta = legend.chart.getDatasetMeta(legendItem.datasetIndex);
          meta.hidden = nextState;
          legend.chart.update();
        },
      },
    },
  };
  return <Line data={chartData} options={chartOptions} />;
};

export default ProgressChart;
