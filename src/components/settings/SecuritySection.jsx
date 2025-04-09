import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const SecuritySection = () => {
  const { user, updatePassword, enable2FA, disable2FA } = useAuth();
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [is2FAEnabled, setIs2FAEnabled] = useState(user?.is2FAEnabled || false);
  const [showQRCode, setShowQRCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [securityHistory, setSecurityHistory] = useState([
    { event: 'Last login', timestamp: new Date().toISOString(), location: 'New York, US' },
    { event: 'Password changed', timestamp: '2024-03-15T10:30:00Z', location: 'New York, US' },
    { event: '2FA enabled', timestamp: '2024-03-10T15:45:00Z', location: 'New York, US' },
  ]);

  const validatePassword = (password) => {
    const errors = [];
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Password must contain at least one uppercase letter');
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Password must contain at least one lowercase letter');
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Password must contain at least one number');
    }
    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('Password must contain at least one special character (!@#$%^&*)');
    }
    return errors;
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate current password
    if (!passwordData.currentPassword) {
      newErrors.currentPassword = 'Current password is required';
    }

    // Validate new password
    const passwordErrors = validatePassword(passwordData.newPassword);
    if (passwordErrors.length > 0) {
      newErrors.newPassword = passwordErrors;
    }

    // Validate password confirmation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      await updatePassword(passwordData.currentPassword, passwordData.newPassword);
      // Clear form and show success message
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      setErrors({});
      // Update security history
      setSecurityHistory(prev => [
        { event: 'Password changed', timestamp: new Date().toISOString(), location: 'New York, US' },
        ...prev
      ]);
    } catch (error) {
      setErrors({ submit: error.message });
    }
  };

  const handle2FAToggle = async () => {
    if (!is2FAEnabled) {
      // Enable 2FA
      try {
        const qrCodeData = await enable2FA();
        // Show QR code setup UI
        setShowQRCode(true);
      } catch (error) {
        setErrors({ twoFactor: error.message });
      }
    } else {
      // Disable 2FA
      try {
        await disable2FA();
        setIs2FAEnabled(false);
        setShowQRCode(false);
        // Update security history
        setSecurityHistory(prev => [
          { event: '2FA disabled', timestamp: new Date().toISOString(), location: 'New York, US' },
          ...prev
        ]);
      } catch (error) {
        setErrors({ twoFactor: error.message });
      }
    }
  };

  const handleVerificationSubmit = async (e) => {
    e.preventDefault();
    try {
      // Verify the code and complete 2FA setup
      await enable2FA(verificationCode);
      setIs2FAEnabled(true);
      setShowQRCode(false);
      setVerificationCode('');
      // Update security history
      setSecurityHistory(prev => [
        { event: '2FA enabled', timestamp: new Date().toISOString(), location: 'New York, US' },
        ...prev
      ]);
    } catch (error) {
      setErrors({ verification: error.message });
    }
  };

  return (
    <div className="space-y-8">
      {/* Password Change Section */}
      <div className="bg-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Change Password</h3>
        <form onSubmit={handlePasswordSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.currentPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.currentPassword}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.newPassword && (
              <ul className="mt-1 text-sm text-red-500 list-disc list-inside">
                {errors.newPassword.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Confirm New Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Two-Factor Authentication Section */}
      <div className="bg-gray-700 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
          <button
            onClick={handle2FAToggle}
            className={`px-4 py-2 text-sm font-medium rounded-md ${
              is2FAEnabled
                ? 'bg-red-600 hover:bg-red-700'
                : 'bg-green-600 hover:bg-green-700'
            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
          >
            {is2FAEnabled ? 'Disable 2FA' : 'Enable 2FA'}
          </button>
        </div>

        {showQRCode && (
          <div className="mt-4 space-y-4">
            <div className="bg-white p-4 rounded-lg inline-block">
              {/* QR Code placeholder - In a real app, this would be generated */}
              <div className="w-48 h-48 bg-gray-200" />
            </div>
            <form onSubmit={handleVerificationSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Verification Code
                </label>
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white focus:border-indigo-500 focus:ring-indigo-500"
                  placeholder="Enter 6-digit code"
                />
                {errors.verification && (
                  <p className="mt-1 text-sm text-red-500">{errors.verification}</p>
                )}
              </div>
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium rounded-md bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Verify and Enable
              </button>
            </form>
          </div>
        )}
      </div>

      {/* Security History Section */}
      <div className="bg-gray-700 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-4">Security History</h3>
        <div className="space-y-4">
          {securityHistory.map((event, index) => (
            <div
              key={index}
              className="flex justify-between items-center py-3 border-b border-gray-600 last:border-0"
            >
              <div>
                <p className="text-sm font-medium">{event.event}</p>
                <p className="text-xs text-gray-400">{event.location}</p>
              </div>
              <p className="text-sm text-gray-400">
                {new Date(event.timestamp).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SecuritySection; 