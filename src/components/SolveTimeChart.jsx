import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts';

export default function SolveTimeChart({ puzzleType, entries }) {
  const isPinpoint = puzzleType === 'PINPOINT';

  const data = [...entries].reverse().map(e => ({
    date: e.date,
    ...(isPinpoint
      ? { guesses: e.guessCount }
      : { solveTime: +(e.solveTimeMs / 1000).toFixed(1) }),
  }));

  return (
    <div className="chart-container">
      <h3 className="chart-title">Solve performance</h3>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={data} margin={{ top: 4, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="date" tick={{ fontSize: 11 }} tickLine={false} />
          <YAxis
            yAxisId="main"
            unit={isPinpoint ? '' : 's'}
            tick={{ fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 6, fontSize: 13 }}
          />
          <Legend wrapperStyle={{ fontSize: 13 }} />
          {isPinpoint ? (
            <Line
              yAxisId="main"
              type="monotone"
              dataKey="guesses"
              name="Guesses"
              stroke="#f59e0b"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          ) : (
            <Line
              yAxisId="main"
              type="monotone"
              dataKey="solveTime"
              name="Solve time (s)"
              stroke="var(--accent)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
