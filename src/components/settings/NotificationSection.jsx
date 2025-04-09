import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const NotificationSection = () => {
  const { user, updateNotificationPreferences } = useAuth();
  const [preferences, setPreferences] = useState({
    courseEnrollment: {
      email: true,
      sms: false,
      inApp: true,
    },
    deadlineReminders: {
      email: true,
      sms: true,
      inApp: true,
    },
    announcements: {
      email: false,
      sms: false,
      inApp: true,
    },
    systemUpdates: {
      email: true,
      sms: false,
      inApp: true,
    },
  });

  const handleToggle = (category, channel) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [channel]: !prev[category][channel],
      },
    }));
  };

  const handleSave = async () => {
    try {
      await updateNotificationPreferences(preferences);
      // Show success message
    } catch (error) {
      // Show error message
      console.error('Error updating notification preferences:', error);
    }
  };

  const NotificationCategory = ({ title, category, description }) => (
    <div className="py-4 border-b border-gray-600 last:border-0">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="text-sm font-medium text-white">{title}</h4>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={preferences[category].email}
            onChange={() => handleToggle(category, 'email')}
            className="form-checkbox h-4 w-4 text-indigo-600 bg-gray-700 border-gray-500 rounded focus:ring-indigo-500"
          />
          <span className="text-sm text-gray-300">Email</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={preferences[category].sms}
            onChange={() => handleToggle(category, 'sms')}
            className="form-checkbox h-4 w-4 text-indigo-600 bg-gray-700 border-gray-500 rounded focus:ring-indigo-500"
          />
          <span className="text-sm text-gray-300">SMS</span>
        </label>
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={preferences[category].inApp}
            onChange={() => handleToggle(category, 'inApp')}
            className="form-checkbox h-4 w-4 text-indigo-600 bg-gray-700 border-gray-500 rounded focus:ring-indigo-500"
          />
          <span className="text-sm text-gray-300">In-App</span>
        </label>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="bg-gray-700 rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium">Notification Preferences</h3>
          <button
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save Changes
          </button>
        </div>

        <div className="space-y-6">
          <NotificationCategory
            title="Course Enrollment"
            category="courseEnrollment"
            description="Notifications about new course enrollments and enrollment confirmations."
          />
          <NotificationCategory
            title="Deadline Reminders"
            category="deadlineReminders"
            description="Reminders about upcoming assignment deadlines and course milestones."
          />
          <NotificationCategory
            title="Announcements"
            category="announcements"
            description="Important announcements from instructors and course administrators."
          />
          <NotificationCategory
            title="System Updates"
            category="systemUpdates"
            description="Updates about system maintenance, new features, and improvements."
          />
        </div>
      </div>

      {/* Email Digest Settings */}
      <div className="bg-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Email Digest Settings</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Digest Frequency
            </label>
            <select
              className="block w-full rounded-md bg-gray-800 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
              defaultValue="daily"
            >
              <option value="realtime">Real-time</option>
              <option value="daily">Daily Digest</option>
              <option value="weekly">Weekly Digest</option>
              <option value="never">Never</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Preferred Time (for digests)
            </label>
            <select
              className="block w-full rounded-md bg-gray-800 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
              defaultValue="morning"
            >
              <option value="morning">Morning (8:00 AM)</option>
              <option value="afternoon">Afternoon (2:00 PM)</option>
              <option value="evening">Evening (6:00 PM)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Do Not Disturb */}
      <div className="bg-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Do Not Disturb</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium text-white">Quiet Hours</h4>
              <p className="text-sm text-gray-400">
                Pause all notifications during specified hours
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Start Time
              </label>
              <input
                type="time"
                className="block w-full rounded-md bg-gray-800 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
                defaultValue="22:00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                End Time
              </label>
              <input
                type="time"
                className="block w-full rounded-md bg-gray-800 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
                defaultValue="07:00"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationSection; 