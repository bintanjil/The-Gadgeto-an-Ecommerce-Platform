'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

async function getAdminData() {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin`, {
        withCredentials: true,
        headers: {
            'Content-Type': 'application/json'
        }
    });
    return response.data;
}

async function getSellersData() {
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/sellers`, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log('Seller API Response:', response.data);
        if (Array.isArray(response.data)) {
            return response.data;
        }
        return response.data?.data || [];
    } catch (error) {
        console.error('Error fetching sellers:', error);
        throw error;
    }
}

interface Admin {
  id: number;
  name: string;
  email: string;
  phone: string;
  age: number;
  status: 'active' | 'inactive';
}

interface Seller {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  // Add other seller-specific fields as needed
}

type TabType = 'admin' | 'sellers';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('admin');
  const [adminData, setAdminData] = useState<Admin[] | null>(null);
  const [sellersData, setSellersData] = useState<Seller[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/logout`, {}, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // Clear any local storage or cookies
      localStorage.clear();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      // Redirect to login anyway
      router.push('/login');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);
        
        if (activeTab === 'admin') {
          const data = await getAdminData();
          console.log('Fetched Admin Data:', data);
          setAdminData(Array.isArray(data) ? data : []);
        } else if (activeTab === 'sellers') {
          const data = await getSellersData();
          console.log('Fetched Sellers Data:', data);
          if (data && Array.isArray(data)) {
            setSellersData(data);
          } else {
            console.error('Invalid sellers data format:', data);
            setError('Invalid data format received from server');
          }
        }
      } catch (error: any) {
        console.error('Error in component:', error);
        if (error.response?.status === 401) {
          router.push('/login');
        } else {
          setError(error.response?.data?.message || `Failed to load ${activeTab} data. ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  const currentData = activeTab === 'admin' ? adminData : sellersData;
  const tabTitle = activeTab === 'admin' ? 'Administrators' : 'Sellers';

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-xl text-blue-600">Loading {activeTab} data...</div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="text-red-600 text-lg font-medium mb-2">Error</div>
        <div className="text-gray-600">{error}</div>
        <div className="mt-4 text-sm text-gray-500">
          Make sure:
          <ul className="list-disc pl-5 mt-2">
            <li>Your backend server is running on port 3000</li>
            <li>The /{activeTab} endpoint is accessible</li>
            <li>CORS is properly configured in your backend</li>
            <li>You have proper authentication and admin role</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="sm:flex sm:items-center justify-between">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-semibold text-[#00B7EB]">Admin Dashboard</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage administrators and sellers in the system.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/admin/registration"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00B7EB] hover:bg-[#0095C0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B7EB]"
            >
              Add Admin
            </Link>
            <Link
              href="/seller/registration"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00B7EB] hover:bg-[#0095C0] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B7EB]"
            >
              Add Seller
            </Link>
            <button
              onClick={() => handleLogout()}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('admin')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'admin'
                  ? 'border-[#00B7EB] text-[#00B7EB]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Administrators
            </button>
            <button
              onClick={() => setActiveTab('sellers')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'sellers'
                  ? 'border-[#00B7EB] text-[#00B7EB]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Sellers
            </button>
          </nav>
        </div>
        
        <div className="mt-8 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ID</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Email</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {Array.isArray(currentData) && currentData.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {item.id}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                          {item.name}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{item.email}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{item.phone}</td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm">
                          <div className="flex items-center space-x-2">
                            <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                              item.status === 'active' 
                                ? 'bg-green-100 text-green-800'
                                : 'bg-red-100 text-red-800'
                            }`}>
                              {item.status}
                            </span>
                            {activeTab === 'admin' && (
                              <Link
                                href={`/admin/status/${item.id}`}
                                className="text-[#00B7EB] hover:text-[#0095C0] text-sm font-medium ml-2"
                              >
                                Change Status
                              </Link>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {Array.isArray(currentData) && currentData.length === 0 && (
                  <div className="text-center py-8 bg-white">
                    <p className="text-gray-500 text-sm">No {tabTitle.toLowerCase()} data available</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}