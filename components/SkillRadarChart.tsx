'use client'

import { motion } from 'framer-motion'

interface SkillRadarChartProps {
  skills: {
    leadership: number
    communication: number
    planning: number
    creativity: number
    teamwork: number
    technical: number
  }
}

const SkillRadarChart = ({ skills }: SkillRadarChartProps) => {
  const skillLabels = {
    leadership: 'リーダーシップ',
    communication: 'コミュ力',
    planning: '計画性',
    creativity: '創造性',
    teamwork: 'チーム力',
    technical: '技術力',
  }

  const skillsArray = [
    { key: 'leadership', label: skillLabels.leadership, value: skills.leadership },
    { key: 'communication', label: skillLabels.communication, value: skills.communication },
    { key: 'planning', label: skillLabels.planning, value: skills.planning },
    { key: 'creativity', label: skillLabels.creativity, value: skills.creativity },
    { key: 'teamwork', label: skillLabels.teamwork, value: skills.teamwork },
    { key: 'technical', label: skillLabels.technical, value: skills.technical },
  ]

  const size = 300
  const center = size / 2
  const maxRadius = size / 2 - 40
  const levels = 5

  // Calculate polygon points for radar chart
  const calculatePoint = (value: number, index: number, total: number) => {
    const angle = (Math.PI * 2 * index) / total - Math.PI / 2
    const radius = (value / 100) * maxRadius
    const x = center + radius * Math.cos(angle)
    const y = center + radius * Math.sin(angle)
    return { x, y }
  }

  // Create polygon path
  const dataPoints = skillsArray.map((skill, index) =>
    calculatePoint(skill.value, index, skillsArray.length)
  )
  const dataPath = dataPoints.map((point, index) =>
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ') + ' Z'

  // Create background grid
  const gridPaths = Array.from({ length: levels }, (_, i) => {
    const levelValue = ((i + 1) / levels) * 100
    const points = skillsArray.map((_, index) =>
      calculatePoint(levelValue, index, skillsArray.length)
    )
    return points.map((point, index) =>
      `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
    ).join(' ') + ' Z'
  })

  // Create axis lines
  const axisLines = skillsArray.map((_, index) => {
    const endPoint = calculatePoint(100, index, skillsArray.length)
    return `M ${center} ${center} L ${endPoint.x} ${endPoint.y}`
  })

  // Label positions
  const labelPositions = skillsArray.map((skill, index) => {
    const angle = (Math.PI * 2 * index) / skillsArray.length - Math.PI / 2
    const radius = maxRadius + 25
    const x = center + radius * Math.cos(angle)
    const y = center + radius * Math.sin(angle)
    return { ...skill, x, y }
  })

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Background grid */}
        {gridPaths.map((path, i) => (
          <path
            key={`grid-${i}`}
            d={path}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="1"
            opacity={0.5}
          />
        ))}

        {/* Axis lines */}
        {axisLines.map((path, i) => (
          <path
            key={`axis-${i}`}
            d={path}
            stroke="#d1d5db"
            strokeWidth="1"
            opacity={0.3}
          />
        ))}

        {/* Data polygon */}
        <motion.path
          d={dataPath}
          fill="url(#gradient)"
          fillOpacity="0.3"
          stroke="url(#gradient)"
          strokeWidth="3"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        />

        {/* Data points */}
        {dataPoints.map((point, index) => (
          <motion.circle
            key={`point-${index}`}
            cx={point.x}
            cy={point.y}
            r="5"
            fill="#667eea"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
          />
        ))}

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#667eea" />
            <stop offset="100%" stopColor="#764ba2" />
          </linearGradient>
        </defs>

        {/* Labels */}
        {labelPositions.map((item, index) => (
          <text
            key={`label-${index}`}
            x={item.x}
            y={item.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-xs font-bold fill-gray-700"
          >
            {item.label}
          </text>
        ))}
      </svg>

      {/* Legend with values */}
      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
        {skillsArray.map((skill) => (
          <div key={skill.key} className="flex items-center justify-between gap-3">
            <span className="text-gray-700">{skill.label}</span>
            <div className="flex items-center gap-2">
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-indigo-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.value}%` }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                />
              </div>
              <span className="text-purple-600 font-bold w-8 text-right">{skill.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillRadarChart
