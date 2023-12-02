'use client'
import {Analysis} from '@prisma/client'
import {ResponsiveContainer, LineChart, Line, XAxis, Tooltip} from 'recharts'

const CustomTooltip = ({payload, label, active}: any) => {
  const dateLabel = new Date(label).toLocaleString('eu', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  })

  if (active) {
    const analysis = payload[0].payload
    return <div>yo</div>
    // return (
    //   <div className="custom-tooltip relative rounded-lg border border-black/10 bg-white/5 p-8 shadow-md backdrop-blur-md">
    //     <div
    //       className="absolute left-2 top-2 h-2 w-2 rounded-full"
    //       style={{background: analysis.color}}
    //     ></div>
    //     <p className="label text-sm text-black/30">{dateLabel}</p>
    //     <p className="intro text-xl uppercase">{analysis.mood}</p>
    //   </div>
    // )
  }

  return null
}

const HistoryChart = ({data}: {data: Analysis[]}) => {
  if (!data) {
    return null
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart width={300} height={100} data={data}>
        <Line
          type="monotone"
          dataKey="sentimentScore"
          stroke="#8884d8"
          strokeWidth={2}
          activeDot={{r: 8}}
        />
        <XAxis dataKey="updatedAt" />
        <Tooltip content={<CustomTooltip />} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default HistoryChart

// const data = [
//   {
//     name: 'Jan',
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: 'Feb',
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: 'Mar',
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: 'Apr',
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: 'May',
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: 'Jun',
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: 'Jul',
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: 'Aug',
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: 'Sep',
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: 'Oct',
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: 'Nov',
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
//   {
//     name: 'Dec',
//     total: Math.floor(Math.random() * 5000) + 1000,
//   },
// ]

// export default function HistoryChart() {
//   return (
//     <ResponsiveContainer width="100%" height={350}>
//       <BarChart data={data}>
//         <XAxis
//           dataKey="name"
//           stroke="#888888"
//           fontSize={12}
//           tickLine={false}
//           axisLine={false}
//         />
//         <YAxis
//           stroke="#888888"
//           fontSize={12}
//           tickLine={false}
//           axisLine={false}
//           tickFormatter={value => `$${value}`}
//         />
//         <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
//       </BarChart>
//     </ResponsiveContainer>
//   )
// }
