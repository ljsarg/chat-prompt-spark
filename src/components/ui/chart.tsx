import {
  ResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart as RechartsLineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  TooltipProps,
} from 'recharts';

interface BarChartProps {
  data: {
    categories: string[];
    series: Array<{
      name: string;
      data: number[];
    }>;
  };
  colors?: string[];
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  labels?: boolean;
}

export const BarChart = ({
  data,
  colors = ['#8B5CF6'],
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  labels = false,
}: BarChartProps) => {
  // Transform the data for Recharts
  const transformedData = data.categories.map((category, index) => {
    const dataPoint: Record<string, any> = { name: category };
    data.series.forEach((series) => {
      dataPoint[series.name] = series.data[index];
    });
    return dataPoint;
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsBarChart data={transformedData}>
        {showXAxis && <XAxis dataKey="name" />}
        {showYAxis && <YAxis />}
        <Tooltip />
        {showLegend && <Legend />}
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        {data.series.map((series, index) => (
          <Bar
            key={series.name}
            dataKey={series.name}
            fill={colors[index % colors.length]}
            label={labels ? { position: 'top' } : false}
          />
        ))}
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};

interface LineChartProps {
  data: {
    categories: string[];
    series: Array<{
      name: string;
      data: number[];
    }>;
  };
  colors?: string[];
  showLegend?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  min?: number;
  max?: number;
  precision?: number;
}

export const LineChart = ({
  data,
  colors = ['#8B5CF6', '#6E59A5'],
  showLegend = true,
  showXAxis = true,
  showYAxis = true,
  min,
  max,
  precision = 0,
}: LineChartProps) => {
  // Transform the data for Recharts
  const transformedData = data.categories.map((category, index) => {
    const dataPoint: Record<string, any> = { name: category };
    data.series.forEach((series) => {
      dataPoint[series.name] = series.data[index];
    });
    return dataPoint;
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsLineChart data={transformedData}>
        {showXAxis && <XAxis dataKey="name" />}
        {showYAxis && (
          <YAxis
            domain={[min || 'auto', max || 'auto']}
            tickFormatter={(value) => value.toFixed(precision)}
          />
        )}
        <Tooltip />
        {showLegend && <Legend />}
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        {data.series.map((series, index) => (
          <Line
            key={series.name}
            type="monotone"
            dataKey={series.name}
            stroke={colors[index % colors.length]}
            activeDot={{ r: 8 }}
          />
        ))}
      </RechartsLineChart>
    </ResponsiveContainer>
  );
};

interface PieChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  colors?: string[];
  showLegend?: boolean;
  showLabels?: boolean;
}

export const PieChart = ({
  data,
  colors = ['#8B5CF6', '#6E59A5', '#7E69AB', '#D6BCFA', '#E9D5FF'],
  showLegend = true,
  showLabels = false,
}: PieChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <RechartsPieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={showLabels}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={showLabels ? ({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%` : false}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
          ))}
        </Pie>
        {showLegend && <Legend />}
        <Tooltip formatter={(value) => [`${value} prompts`, 'Count']} />
      </RechartsPieChart>
    </ResponsiveContainer>
  );
};
