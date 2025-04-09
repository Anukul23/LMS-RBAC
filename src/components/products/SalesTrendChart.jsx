import React from "react";
import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
} from "recharts";

const data = [
	{ month: "Jan", enrollments: 120, completions: 85 },
	{ month: "Feb", enrollments: 150, completions: 95 },
	{ month: "Mar", enrollments: 180, completions: 110 },
	{ month: "Apr", enrollments: 220, completions: 130 },
	{ month: "May", enrollments: 250, completions: 150 },
	{ month: "Jun", enrollments: 280, completions: 170 },
];

const SalesTrendChart = () => {
	return (
		<div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
			<h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">
				Course Enrollment Trends
			</h3>
			<div className="h-[300px]">
				<ResponsiveContainer width="100%" height="100%">
					<LineChart
						data={data}
						margin={{
							top: 5,
							right: 30,
							left: 20,
							bottom: 5,
						}}
					>
						<CartesianGrid strokeDasharray="3 3" />
						<XAxis dataKey="month" />
						<YAxis />
						<Tooltip />
						<Legend />
						<Line
							type="monotone"
							dataKey="enrollments"
							stroke="#0088FE"
							activeDot={{ r: 8 }}
						/>
						<Line
							type="monotone"
							dataKey="completions"
							stroke="#00C49F"
							activeDot={{ r: 8 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default SalesTrendChart;
