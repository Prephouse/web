import { ChartOptions } from 'chart.js';
import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import { useIntl } from 'react-intl';

import { SessionResponseSchema } from 'schemas/session/sessionSchema';

import { ColorPicker } from 'styles/colours';

import { camelCaseToWords } from 'utils/string';

const ScoreChart = ({ sessionData }: { sessionData: SessionResponseSchema | undefined }) => {
  const intl = useIntl();

  const labels = useMemo(
    () => Object.keys(sessionData?.scores ?? {}).map(key => camelCaseToWords(key)),
    [sessionData]
  );

  const datasets = useMemo(() => {
    const dataset: {
      data: number[];
      label: string;
      backgroundColor: string[];
      borderColor: string[];
      borderWidth: number;
    } = {
      data: [],
      label: intl.formatMessage({ id: 'session.chart.dataLabel' }),
      backgroundColor: [],
      borderColor: [],
      borderWidth: 2,
    };

    const colorPicker = new ColorPicker();

    Object.entries(sessionData?.scores ?? {}).forEach(([, value]) => {
      const [colour, opaqueColour] = colorPicker.getColorPair(0.6);
      dataset.data.push(value);
      dataset.backgroundColor.push(opaqueColour);
      dataset.borderColor.push(colour);
    });

    return [dataset];
  }, [sessionData, intl]);

  const chartData = {
    labels,
    datasets,
  };

  const chartOptions: ChartOptions<'bar'> = {
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: intl.formatMessage({ id: 'session.chart.xLabel' }),
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: intl.formatMessage({ id: 'session.chart.yLabel' }),
        },
        min: 0,
        max: 100,
      },
    },
  };

  return <Bar data={chartData} options={chartOptions} />;
};

export default ScoreChart;
