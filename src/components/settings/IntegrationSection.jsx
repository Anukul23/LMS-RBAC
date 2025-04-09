import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const IntegrationSection = () => {
  const { user } = useAuth();
  const [integrations, setIntegrations] = useState({
    googleCalendar: false,
    microsoftTeams: false,
    zoom: false,
  });

  const handleToggle = (integration) => {
    setIntegrations((prev) => ({
      ...prev,
      [integration]: !prev[integration],
    }));
  };

  const handleSave = async () => {
    try {
      // TODO: Implement API call to save integration preferences
      console.log("Saving integration preferences:", integrations);
    } catch (error) {
      console.error("Error saving integration preferences:", error);
    }
  };

  const IntegrationCard = ({ title, description, icon, name }) => (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-2xl">{icon}</div>
          <div>
            <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
              {title}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            className="sr-only peer"
            checked={integrations[name]}
            onChange={() => handleToggle(name)}
          />
          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-blue-600"></div>
        </label>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-slate-900 dark:text-slate-100">
          Third-Party Integrations
        </h2>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Connect your account with external services to enhance your experience.
        </p>
      </div>

      <div className="space-y-4">
        <IntegrationCard
          title="Google Calendar"
          description="Sync your course schedule with Google Calendar"
          icon="📅"
          name="googleCalendar"
        />
        <IntegrationCard
          title="Microsoft Teams"
          description="Join virtual classes directly from Microsoft Teams"
          icon="👥"
          name="microsoftTeams"
        />
        <IntegrationCard
          title="Zoom"
          description="Access virtual classrooms through Zoom"
          icon="🎥"
          name="zoom"
        />
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default IntegrationSection; 