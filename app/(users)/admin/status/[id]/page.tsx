'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

interface AdminData {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
}

async function getAdminData(id: string) {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/byId/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function updateStatus(id: string, newStatus: 'active' | 'inactive') {
  try {
    const response = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/updateStatus/${id}`,
      { status: newStatus }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
}

export default function UpdateAdminStatus({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const data = await getAdminData(params.id);
        setAdminData(data);
      } catch (error: any) {
        setError(error.response?.data?.message || 'Failed to fetch admin data');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, [params.id]);

  const handleStatusChange = async (newStatus: 'active' | 'inactive') => {
    try {
      setUpdating(true);
      setError(null);
      setSuccessMessage('');

      await updateStatus(params.id, newStatus);
      
      // Fetch updated admin data
      const updatedData = await getAdminData(params.id);
      setAdminData(updatedData);
      
      setSuccessMessage('Admin status updated successfully!');
      setTimeout(() => router.push('/admin/dashboard'), 1500);
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to update admin status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-blue-600">Loading admin data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
          <div className="text-red-600 text-lg font-medium mb-2">Error</div>
          <div className="text-gray-600">{error}</div>
        </div>
      </div>
    );
  }

  if (!adminData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-xl text-red-600">Admin not found</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-blue-100">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Update Admin Status
            </h1>
            <p className="mt-2 text-gray-600">Change the status for {adminData.name}</p>
          </div>

          {successMessage && (
            <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-center mb-6">
              {successMessage}
            </div>
          )}

          <div className="space-y-6">
            {/* Admin Info */}
            <div className="bg-gray-50 rounded-lg p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm font-medium text-gray-500">Name</div>
                  <div className="mt-1 text-sm text-gray-900">{adminData.name}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Email</div>
                  <div className="mt-1 text-sm text-gray-900">{adminData.email}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Phone</div>
                  <div className="mt-1 text-sm text-gray-900">{adminData.phone}</div>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-500">Current Status</div>
                  <div className="mt-1">
                    <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      adminData.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {adminData.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Status Change Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={() => handleStatusChange('active')}
                disabled={updating || adminData.status === 'active'}
                className={`flex-1 py-3 px-4 rounded-lg font-medium
                  ${adminData.status === 'active'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-green-500 text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2'
                  } transition-all duration-200 ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Set Active
              </button>
              <button
                onClick={() => handleStatusChange('inactive')}
                disabled={updating || adminData.status === 'inactive'}
                className={`flex-1 py-3 px-4 rounded-lg font-medium
                  ${adminData.status === 'inactive'
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2'
                  } transition-all duration-200 ${updating ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Set Inactive
              </button>
            </div>

            {/* Cancel Button */}
            <div>
              <button
                onClick={() => router.push('/admin/dashboard')}
                className="w-full py-3 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium
                  hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 
                  transition-all duration-200"
              >
                Back to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
