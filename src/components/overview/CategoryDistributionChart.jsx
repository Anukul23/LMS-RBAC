import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

// Sample data for different time periods
const timeData = {
	month: [
		{ name: "Jan", value: 35 },
		{ name: "Feb", value: 42 },
		{ name: "Mar", value: 28 },
		{ name: "Apr", value: 45 },
		{ name: "May", value: 38 },
		{ name: "Jun", value: 52 },
	],
	week: [
		{ name: "Mon", value: 15 },
		{ name: "Tue", value: 22 },
		{ name: "Wed", value: 18 },
		{ name: "Thu", value: 25 },
		{ name: "Fri", value: 32 },
		{ name: "Sat", value: 28 },
		{ name: "Sun", value: 20 },
	],
	day: [
		{ name: "00:00", value: 5 },
		{ name: "04:00", value: 8 },
		{ name: "08:00", value: 15 },
		{ name: "12:00", value: 25 },
		{ name: "16:00", value: 18 },
		{ name: "20:00", value: 12 },
	],
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const CategoryDistributionChart = () => {
	const [timePeriod, setTimePeriod] = useState("month");

	const handlePeriodChange = (period) => {
		setTimePeriod(period);
	};

	return (
		<div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
			<div className="flex justify-between items-center mb-4">
				<h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
					Course Category Distribution
				</h3>
				<div className="flex space-x-2">
					<button
						onClick={() => handlePeriodChange("day")}
						className={`px-3 py-1 rounded-md text-sm ${
							timePeriod === "day"
								? "bg-blue-500 text-white"
								: "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
						}`}
					>
						Day
					</button>
					<button
						onClick={() => handlePeriodChange("week")}
						className={`px-3 py-1 rounded-md text-sm ${
							timePeriod === "week"
								? "bg-blue-500 text-white"
								: "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
						}`}
					>
						Week
					</button>
					<button
						onClick={() => handlePeriodChange("month")}
						className={`px-3 py-1 rounded-md text-sm ${
							timePeriod === "month"
								? "bg-blue-500 text-white"
								: "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300"
						}`}
					>
						Month
					</button>
				</div>
			</div>
			<div className="h-[300px]">
				<ResponsiveContainer width="100%" height="100%">
					<BarChart data={timeData[timePeriod]}>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="name" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Bar dataKey="value" fill="#8884d8">
							{timeData[timePeriod].map((entry, index) => (
								<React.Fragment key={`cell-${index}`}>
									<Bar dataKey="value" fill={COLORS[index % COLORS.length]} />
								</React.Fragment>
							))}
						</Bar>
					</BarChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default CategoryDistributionChart;
