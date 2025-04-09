import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
	{ name: "Programming", value: 35 },
	{ name: "Web Development", value: 25 },
	{ name: "Data Science", value: 20 },
	{ name: "Cloud Computing", value: 15 },
	{ name: "Cybersecurity", value: 5 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

const CategoryDistributionChart = () => {
	return (
		<div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow">
			<h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-4">
				Course Category Distribution
			</h3>
			<div className="h-[300px]">
				<ResponsiveContainer width="100%" height="100%">
					<PieChart>
						<Pie
							data={data}
							cx="50%"
							cy="50%"
							labelLine={false}
							label={({ name, percent }) =>
								`${name} ${(percent * 100).toFixed(0)}%`
							}
							outerRadius={80}
							fill="#8884d8"
							dataKey="value"
						>
							{data.map((entry, index) => (
								<Cell
									key={`cell-${index}`}
									fill={COLORS[index % COLORS.length]}
								/>
							))}
						</Pie>
						<Tooltip />
						<Legend />
					</PieChart>
				</ResponsiveContainer>
			</div>
		</div>
	);
};

export default CategoryDistributionChart;
