import React, { useState, useEffect } from 'react';
import { Database, Users } from 'lucide-react';
import { supabase, User, usersTable } from './lib/supabase';

function App() {
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function checkConnection() {
      try {
        const { data, error } = await supabase.from('Users').select('count').limit(1);
        
        if (error) {
          throw error;
        }
        
        setIsConnected(true);
        setError(null);
      } catch (err: any) {
        setIsConnected(false);
        setError(err.message || 'Failed to connect to Supabase');
      }
    }

    checkConnection();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-10 text-center">
          <div className="flex items-center justify-center mb-4">
            <Database className="h-10 w-10 text-indigo-600 mr-2" />
            <h1 className="text-3xl font-bold text-gray-800">Supabase Users Database</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            A database configuration with a Users table including email, display name, photo URLs, bio, 
            location data, premium status, and subscription information.
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center mb-6">
            <Users className="h-6 w-6 text-indigo-600 mr-2" />
            <h2 className="text-xl font-semibold text-gray-800">Users Table Schema</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Field</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Properties</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">email</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">String</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Unique, Indexed</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">displayName</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">String</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">photoURLs</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Array&lt;String&gt;</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">bio</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">String</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">last_known_location</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Geopoint</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Geo Indexed</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">isPremium</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Boolean</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Indexed</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">subscription</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Object</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    revenueCatCustomerID: String<br />
                    entitlement: String<br />
                    expiresAt: Timestamp
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">createdAt</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Timestamp</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Auto-generated</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">updatedAt</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Timestamp</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Auto-generated</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Connection Status</h2>
          {isConnected === null ? (
            <p className="text-gray-600">Checking connection to Supabase...</p>
          ) : isConnected ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Connected to Supabase successfully!
              </p>
            </div>
          ) : (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                Failed to connect to Supabase: {error}
              </p>
              <p className="mt-2 text-sm text-gray-600">
                Make sure to update the .env.local file with your Supabase credentials.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;