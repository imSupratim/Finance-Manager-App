import { Lightbulb, Info } from "lucide-react"
import { generateInsights } from "../../utils/generateInsights.js"

const SmartInsights = ({ transactions }) => {
  const insights = generateInsights(transactions)


  

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-yellow-500" />
        <h2 className="text-lg font-semibold text-gray-800">
          Smart Insights
        </h2>
      </div>

      {/* Content */}
      {insights.length === 0 ? (
        <div className="flex items-center gap-2 rounded-md bg-gray-50 p-3 text-sm text-gray-500">
          <Info className="h-4 w-4" />
          <span>No insights yet</span>
        </div>
      ) : (
        <ul className="space-y-3">
          {insights.map((insight, i) => (
            <li
              key={i}
              className="flex items-start gap-2 rounded-lg bg-gray-50 p-3 text-sm text-gray-700"
            >
              <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-yellow-500" />
              <span>{insight}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SmartInsights
