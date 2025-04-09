import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/Tabs';
import PersonalInfoSection from '../components/settings/PersonalInfoSection';
import SecuritySection from '../components/settings/SecuritySection';
import NotificationSection from '../components/settings/NotificationSection';
import PreferencesSection from '../components/settings/PreferencesSection';
import IntegrationSection from '../components/settings/IntegrationSection';

const SettingsPage = () => {
	const [activeTab, setActiveTab] = useState('personal');

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-2xl font-bold mb-6">Settings</h1>
			
			<Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
				<TabsList className="grid grid-cols-5 gap-4 bg-gray-800 p-1 rounded-lg mb-6">
					<TabsTrigger 
						value="personal"
						className={`px-4 py-2 rounded-md transition-all ${
							activeTab === 'personal' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
						}`}
					>
						Personal Info
					</TabsTrigger>
					<TabsTrigger 
						value="security"
						className={`px-4 py-2 rounded-md transition-all ${
							activeTab === 'security' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
						}`}
					>
						Security
					</TabsTrigger>
					<TabsTrigger 
						value="notifications"
						className={`px-4 py-2 rounded-md transition-all ${
							activeTab === 'notifications' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
						}`}
					>
						Notifications
					</TabsTrigger>
					<TabsTrigger 
						value="preferences"
						className={`px-4 py-2 rounded-md transition-all ${
							activeTab === 'preferences' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
						}`}
					>
						Preferences
					</TabsTrigger>
					<TabsTrigger 
						value="integrations"
						className={`px-4 py-2 rounded-md transition-all ${
							activeTab === 'integrations' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'
						}`}
					>
						Integrations
					</TabsTrigger>
				</TabsList>

				<div className="bg-gray-800 rounded-lg p-6">
					<TabsContent value="personal">
						<PersonalInfoSection />
					</TabsContent>

					<TabsContent value="security">
						<SecuritySection />
					</TabsContent>

					<TabsContent value="notifications">
						<NotificationSection />
					</TabsContent>

					<TabsContent value="preferences">
						<PreferencesSection />
					</TabsContent>

					<TabsContent value="integrations">
						<IntegrationSection />
					</TabsContent>
				</div>
			</Tabs>
		</div>
	);
};

export default SettingsPage;
