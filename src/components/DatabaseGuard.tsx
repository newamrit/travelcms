import React, { useState, useEffect } from 'react';
import { AlertTriangle, Database, RefreshCw, Server } from 'lucide-react';

interface DatabaseStatus {
  connected: boolean;
  checking: boolean;
  error: string | null;
  details: {
    host?: string;
    database?: string;
    tables?: number;
  } | null;
}

interface DatabaseGuardProps {
  children: React.ReactNode;
}

const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || '/api';

export const DatabaseGuard: React.FC<DatabaseGuardProps> = ({ children }) => {
  const [status, setStatus] = useState<DatabaseStatus>({
    connected: false,
    checking: true,
    error: null,
    details: null
  });

  const checkDatabase = async () => {
    setStatus(prev => ({ ...prev, checking: true, error: null }));

    try {
      const response = await fetch(`${API_BASE_URL}/health.php`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.status === 'healthy' && data.database?.connected) {
        setStatus({
          connected: true,
          checking: false,
          error: null,
          details: {
            host: data.database.host,
            database: data.database.name,
            tables: data.tables?.total || 0
          }
        });
      } else {
        throw new Error(data.database?.message || 'Database connection failed');
      }
    } catch (error) {
      setStatus({
        connected: false,
        checking: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
        details: null
      });
    }
  };

  useEffect(() => {
    checkDatabase();
  }, []);

  // Loading state
  if (status.checking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#012871] to-[#f35500] rounded-2xl flex items-center justify-center mb-4 animate-pulse">
              <Database className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Connecting to Database</h2>
            <p className="text-slate-600">Please wait while we verify the database connection...</p>
          </div>
          <div className="flex items-center justify-center gap-2 text-[#012871]">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span className="font-medium">Checking connection...</span>
          </div>
        </div>
      </div>
    );
  }

  // Error state - Database not connected
  if (!status.connected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-slate-900 to-red-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto bg-red-100 rounded-2xl flex items-center justify-center mb-4">
              <AlertTriangle className="w-10 h-10 text-red-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 mb-2">Database Connection Failed</h1>
            <p className="text-slate-600 text-lg">
              The application cannot run without a database connection
            </p>
          </div>

          {/* Error Details */}
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 mb-6">
            <div className="flex items-start gap-3">
              <Server className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-red-900 mb-2">Connection Error</h3>
                <p className="text-red-800 text-sm font-mono bg-red-100 p-3 rounded-lg">
                  {status.error}
                </p>
              </div>
            </div>
          </div>

          {/* Troubleshooting Steps */}
          <div className="bg-slate-50 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
              <Database className="w-5 h-5" />
              Troubleshooting Steps
            </h3>
            <ol className="space-y-3 text-sm text-slate-700">
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#012871] text-white rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>Check if MySQL/MariaDB service is running on your server</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#012871] text-white rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span>Verify database credentials in <code className="bg-slate-200 px-2 py-0.5 rounded">backend/api/config/Database.php</code></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#012871] text-white rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Ensure the database exists and tables have been created</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#012871] text-white rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <span>Check if the database user has proper permissions</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-[#012871] text-white rounded-full flex items-center justify-center text-xs font-bold">5</span>
                <span>Verify the API endpoint is accessible at <code className="bg-slate-200 px-2 py-0.5 rounded">{API_BASE_URL}/health.php</code></span>
              </li>
            </ol>
          </div>

          {/* Configuration Example */}
          <div className="bg-slate-900 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-slate-300 mb-3">Database Configuration Example</h3>
            <pre className="text-xs text-green-400 overflow-x-auto">
              <code>{`// backend/api/config/Database.php
$this->host = 'localhost';
$this->dbname = 'your_database_name';
$this->username = 'your_username';
$this->password = 'your_password';`}</code>
            </pre>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={checkDatabase}
              className="flex-1 bg-gradient-to-r from-[#012871] to-[#f35500] text-white font-semibold py-3 px-6 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              Retry Connection
            </button>
            <a
              href="https://docs.travelops.pro/troubleshooting"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-slate-200 text-slate-800 font-semibold py-3 px-6 rounded-xl hover:bg-slate-300 transition-all flex items-center justify-center gap-2"
            >
              View Documentation
            </a>
          </div>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-200 text-center text-sm text-slate-500">
            <p>TravelOps Pro v1.0.0 | Need help? Contact support@travelops.pro</p>
          </div>
        </div>
      </div>
    );
  }

  // Success state - Database connected, render children
  return <>{children}</>;
};
