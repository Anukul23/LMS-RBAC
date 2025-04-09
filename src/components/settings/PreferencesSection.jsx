import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const PreferencesSection = () => {
  const { user, updatePreferences } = useAuth();
  const [preferences, setPreferences] = useState({
    language: user?.preferences?.language || 'en',
    timezone: user?.preferences?.timezone || 'UTC',
    interests: user?.preferences?.interests || [],
    dashboardLayout: user?.preferences?.dashboardLayout || {
      showPinnedCourses: true,
      showUpcomingDeadlines: true,
      showProgressWidget: true,
      showActivityFeed: true,
      showCalendar: true,
    },
  });

  const [availableInterests] = useState([
    'Programming',
    'Data Science',
    'Web Development',
    'Mobile Development',
    'Cloud Computing',
    'Artificial Intelligence',
    'Machine Learning',
    'Cybersecurity',
    'DevOps',
    'Business Analytics',
  ]);

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ja', name: 'Japanese' },
  ];

  const timezones = [
    'UTC',
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Asia/Shanghai',
    'Australia/Sydney',
  ];

  const handleLanguageChange = (e) => {
    setPreferences(prev => ({
      ...prev,
      language: e.target.value,
    }));
  };

  const handleTimezoneChange = (e) => {
    setPreferences(prev => ({
      ...prev,
      timezone: e.target.value,
    }));
  };

  const handleInterestToggle = (interest) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleWidgetToggle = (widget) => {
    setPreferences(prev => ({
      ...prev,
      dashboardLayout: {
        ...prev.dashboardLayout,
        [widget]: !prev.dashboardLayout[widget],
      },
    }));
  };

  const handleSave = async () => {
    try {
      await updatePreferences(preferences);
      // Show success message
    } catch (error) {
      // Show error message
      console.error('Error updating preferences:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Language and Timezone */}
      <div className="bg-gray-700 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Language & Region</h3>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Language
            </label>
            <select
              value={preferences.language}
              onChange={handleLanguageChange}
              className="block w-full rounded-md bg-gray-800 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Timezone
            </label>
            <select
              value={preferences.timezone}
              onChange={handleTimezoneChange}
              className="block w-full rounded-md bg-gray-800 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
            >
              {timezones.map(tz => (
                <option key={tz} value={tz}>
                  {tz.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Learning Interests */}
      <div className="bg-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Learning Interests</h3>
        <p className="text-sm text-gray-400 mb-4">
          Select your interests to get personalized course recommendations
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {availableInterests.map(interest => (
            <label key={interest} className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={preferences.interests.includes(interest)}
                onChange={() => handleInterestToggle(interest)}
                className="form-checkbox h-4 w-4 text-indigo-600 bg-gray-700 border-gray-500 rounded focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-300">{interest}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Dashboard Layout */}
      <div className="bg-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Dashboard Layout</h3>
        <p className="text-sm text-gray-400 mb-4">
          Customize which widgets appear on your dashboard
        </p>
        <div className="space-y-4">
          <label className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Pinned Courses</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={preferences.dashboardLayout.showPinnedCourses}
                onChange={() => handleWidgetToggle('showPinnedCourses')}
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </label>

          <label className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Upcoming Deadlines</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={preferences.dashboardLayout.showUpcomingDeadlines}
                onChange={() => handleWidgetToggle('showUpcomingDeadlines')}
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </label>

          <label className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Progress Widget</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={preferences.dashboardLayout.showProgressWidget}
                onChange={() => handleWidgetToggle('showProgressWidget')}
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </label>

          <label className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Activity Feed</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={preferences.dashboardLayout.showActivityFeed}
                onChange={() => handleWidgetToggle('showActivityFeed')}
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </label>

          <label className="flex items-center justify-between">
            <span className="text-sm text-gray-300">Calendar</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={preferences.dashboardLayout.showCalendar}
                onChange={() => handleWidgetToggle('showCalendar')}
              />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </label>
        </div>
      </div>
    </div>
  );
};

export default PreferencesSection; 