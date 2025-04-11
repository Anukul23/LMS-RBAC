import { BarChart2, DollarSign, HomeIcon, LogOut, Menu, Settings, ShoppingBag, ShoppingCart, TrendingUp, Users, Shield } from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { RequirePermission } from "../common/RBAC";
import { Actions, Subjects } from "../../config/permissions";

const SIDEBAR_ITEMS = [
	{
		name: "Overview",
		icon: BarChart2,
		color: "#6366f1",
		href: "/",
	},
	//{name : "Home" , icon : HomeIcon , color : "#3B82F6" ,href :"/"},
	{ name: "Courses", icon: ShoppingBag, color: "#8B5CF6", href: "/products" },
	{ name: "Users", icon: Users, color: "#EC4899", href: "/users" },
	{ name: "Sales", icon: DollarSign, color: "#10B981", href: "/sales" },
	{ name: "Orders", icon: ShoppingCart, color: "#F59E0B", href: "/orders" },
	{ name: "Analytics", icon: TrendingUp, color: "#3B82F6", href: "/analytics" },
	{ name: "Settings", icon: Settings, color: "#6EE7B7", href: "/settings" },
	{
		name: "Role Management",
		icon: Shield,
		color: "#EF4444",
		href: "/roles",
	}
];

const Sidebar = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);
	const { logout, user, hasPermission, hasRole } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		console.log('Sidebar - Current user:', user);
		console.log('Sidebar - User roles:', user?.roles);
		console.log('Sidebar - Is admin?', hasRole('ADMIN'));
		console.log('Sidebar - Can edit role:', hasPermission(Actions.EDIT_ROLE, Subjects.ROLE));
		console.log('Sidebar - Can assign role:', hasPermission(Actions.ASSIGN_ROLE, Subjects.USER));
		console.log('Sidebar - Can view role:', hasPermission(Actions.VIEW_ROLE, Subjects.ROLE));
	}, [user, hasPermission, hasRole]);

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<motion.div
			className={`relative z-10 transition-all duration-300 ease-in-out flex-shrink-0 ${
				isSidebarOpen ? "w-64" : "w-20"
			}`}
			animate={{ width: isSidebarOpen ? 256 : 80 }}
		>
			<div className='h-full bg-gray-800 bg-opacity-50 backdrop-blur-md p-4 flex flex-col border-r border-gray-700'>
				<motion.button
					whileHover={{ scale: 1.1 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => setIsSidebarOpen(!isSidebarOpen)}
					className='p-2 rounded-full hover:bg-gray-700 transition-colors max-w-fit'
				>
					<Menu size={24} />
				</motion.button>

				<nav className='mt-8 flex-grow'>
					{SIDEBAR_ITEMS.map((item) => {
						// Check if this is the Role Management item
						if (item.name === "Role Management") {
							// Show Role Management if user is ADMIN
							if (!hasRole('ADMIN')) return null;
						}
						
						return (
							<Link key={item.href} to={item.href}>
								<motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'>
									<item.icon size={20} style={{ color: item.color, minWidth: "20px" }} />
									<AnimatePresence>
										{isSidebarOpen && (
											<motion.span
												className='ml-4 whitespace-nowrap'
												initial={{ opacity: 0, width: 0 }}
												animate={{ opacity: 1, width: "auto" }}
												exit={{ opacity: 0, width: 0 }}
												transition={{ duration: 0.2, delay: 0.3 }}
											>
												{item.name}
											</motion.span>
										)}
									</AnimatePresence>
								</motion.div>
							</Link>
						);
					})}
					
					{/* Admin-only items */}
					{user && user.roles && user.roles.includes('ADMIN') && (
						<div className='mt-8 pt-4 border-t border-gray-700'>
							<h3 className='text-xs uppercase text-gray-400 mb-4 px-4'>Admin Tools</h3>
							<Link to="/roles">
								<motion.div className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors mb-2'>
									<Shield size={20} style={{ color: "#EF4444", minWidth: "20px" }} />
									<AnimatePresence>
										{isSidebarOpen && (
											<motion.span
												className='ml-4 whitespace-nowrap'
												initial={{ opacity: 0, width: 0 }}
												animate={{ opacity: 1, width: "auto" }}
												exit={{ opacity: 0, width: 0 }}
												transition={{ duration: 0.2, delay: 0.3 }}
											>
												Role Management
											</motion.span>
										)}
									</AnimatePresence>
								</motion.div>
							</Link>
						</div>
					)}
				</nav>

				<div className='mt-auto'>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={handleLogout}
						className='flex items-center p-4 text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors w-full'
					>
						<LogOut size={20} style={{ color: "#EF4444", minWidth: "20px" }} />
						<AnimatePresence>
							{isSidebarOpen && (
								<motion.span
									className='ml-4 whitespace-nowrap'
									initial={{ opacity: 0, width: 0 }}
									animate={{ opacity: 1, width: "auto" }}
									exit={{ opacity: 0, width: 0 }}
									transition={{ duration: 0.2, delay: 0.3 }}
								>
									Logout
								</motion.span>
							)}
						</AnimatePresence>
					</motion.button>
				</div>
			</div>
		</motion.div>
	);
};

export default Sidebar;
