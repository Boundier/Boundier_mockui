import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip, XAxis } from 'recharts';
import { IntegratedPattern } from '@/lib/conscientEngine';

interface PatternLineChartProps {
  data: IntegratedPattern[];
}

export function PatternLineChart({ data }: PatternLineChartProps) {
  const chartData = data.map((item, idx) => ({
    ...item,
    index: idx,
  }));

  return (
    <div className="w-full h-[120px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <YAxis domain={[0, 1]} hide />
          <Tooltip 
            contentStyle={{ background: '#000543', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px' }}
            itemStyle={{ fontSize: '12px' }}
            labelStyle={{ display: 'none' }}
          />
          <Line 
            type="monotone" 
            dataKey="influence" 
            stroke="#0038FF" 
            strokeWidth={2} 
            dot={false}
            activeDot={{ r: 4, fill: '#fff' }}
            name="Influence"
          />
          <Line 
            type="monotone" 
            dataKey="distortion" 
            stroke="#FF3838" 
            strokeWidth={2} 
            dot={false}
            name="Distortion"
          />
          <Line 
            type="monotone" 
            dataKey="echo_risk" 
            stroke="#FFB800" 
            strokeWidth={1} 
            strokeDasharray="3 3"
            dot={false}
            name="Echo Risk"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
