import React, { useRef } from 'react';
import { Line } from 'react-chartjs-2';

const ChartComponent = ({ data, options, period = 'annual' }) => {
  const chartRef = useRef(null);
  
  // Nettoyer le graphique lors du démontage du composant
  React.useEffect(() => {
    return () => {
      if (chartRef.current) {
        const chart = chartRef.current;
        if (chart.chartInstance) {
          chart.chartInstance.destroy();
        }
      }
    };
  }, []);
  
  return (
    <div className="h-full w-full">
      {data && (
        <Line 
          ref={chartRef}
          data={data} 
          options={options}
          key={`chart-${period}-${Date.now()}`} 
        />
      )}
    </div>
  );
};

export default ChartComponent;
