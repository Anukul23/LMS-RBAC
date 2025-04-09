import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { AbilityProvider } from "./context/AbilityContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/common/Sidebar";

import OverviewPage from "./pages/OverviewPage";
import ProductsPage from "./pages/ProductsPage";
import UsersPage from "./pages/UsersPage";
import SalesPage from "./pages/SalesPage";
import OrdersPage from "./pages/OrdersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import RoleManagementPage from "./pages/RoleManagementPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
//import Ragister from "./components/home/Register";

function App() {
	return (
		<AuthProvider>
			<AbilityProvider>
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route
						path="/*"
						element={
							<ProtectedRoute>
								<div className='flex h-screen bg-gray-900 text-gray-100'>
									{/* BG */}
									<div className='fixed inset-0 z-0'>
										<div className='absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-80' />
										<div className='absolute inset-0 backdrop-blur-sm' />
									</div>

									<Sidebar />
									<main className="flex-1 relative z-0 overflow-y-auto">
										<div className="container mx-auto px-4 py-6">
											<Routes>
												<Route path='/' element={<OverviewPage />} />
												<Route path='/products' element={<ProductsPage />} />
												<Route path='/users' element={<UsersPage />} />
												<Route path='/sales' element={<SalesPage />} />
												<Route path='/orders' element={<OrdersPage />} />
												<Route path='/analytics' element={<AnalyticsPage />} />
												<Route path='/settings' element={<SettingsPage />} />
												<Route path='/roles' element={<RoleManagementPage />} />
											</Routes>
										</div>
									</main>
								</div>
							</ProtectedRoute>
						}
					/>
				</Routes>
			</AbilityProvider>
		</AuthProvider>
	);
}

export default App;
