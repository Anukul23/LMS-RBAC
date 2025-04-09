import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "../components/ui/Table";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Plus, Search } from "lucide-react";

const courses = [
	{
		id: 1,
		name: "Web Development Fundamentals",
		category: "Programming",
		instructor: "John Smith",
		duration: "12 weeks",
		level: "Beginner",
		price: 299,
		status: "Active",
		enrolled: 156,
	},
	{
		id: 2,
		name: "Advanced Python Programming",
		category: "Programming",
		instructor: "Sarah Johnson",
		duration: "16 weeks",
		level: "Advanced",
		price: 399,
		status: "Active",
		enrolled: 89,
	},
	{
		id: 3,
		name: "Cloud Computing with AWS",
		category: "Cloud",
		instructor: "Michael Brown",
		duration: "10 weeks",
		level: "Intermediate",
		price: 349,
		status: "Active",
		enrolled: 124,
	},
	{
		id: 4,
		name: "Cybersecurity Fundamentals",
		category: "Security",
		instructor: "Emily Davis",
		duration: "14 weeks",
		level: "Intermediate",
		price: 379,
		status: "Active",
		enrolled: 112,
	},
	{
		id: 5,
		name: "Data Science with Python",
		category: "Data Science",
		instructor: "David Wilson",
		duration: "18 weeks",
		level: "Advanced",
		price: 449,
		status: "Active",
		enrolled: 78,
	},
];

const ProductsPage = () => {
	const [searchTerm, setSearchTerm] = useState("");

	const filteredCourses = courses.filter((course) =>
		course.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div className="p-6">
			<div className="flex justify-between items-center mb-6">
				<h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
					IT Courses
				</h1>
				<Button>
					<Plus className="w-4 h-4 mr-2" />
					Add New Course
				</Button>
			</div>

			<div className="mb-6">
				<div className="relative">
					<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
					<Input
						type="text"
						placeholder="Search courses..."
						className="pl-10"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
					/>
				</div>
			</div>

			<div className="bg-white dark:bg-slate-800 rounded-lg shadow">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Course Name</TableHead>
							<TableHead>Category</TableHead>
							<TableHead>Instructor</TableHead>
							<TableHead>Duration</TableHead>
							<TableHead>Level</TableHead>
							<TableHead>Price</TableHead>
							<TableHead>Enrolled</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{filteredCourses.map((course) => (
							<TableRow key={course.id}>
								<TableCell className="font-medium">{course.name}</TableCell>
								<TableCell>{course.category}</TableCell>
								<TableCell>{course.instructor}</TableCell>
								<TableCell>{course.duration}</TableCell>
								<TableCell>{course.level}</TableCell>
								<TableCell>${course.price}</TableCell>
								<TableCell>{course.enrolled}</TableCell>
								<TableCell>
									<span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
										{course.status}
									</span>
								</TableCell>
								<TableCell>
									<Button variant="ghost" size="sm">
										Edit
									</Button>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default ProductsPage;
