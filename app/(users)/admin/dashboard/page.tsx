'use client';
import { useEffect, useState } from "react";
import axios from "axios";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Utility function for safe number conversion
const safeNumber = (value: any, defaultValue = 0): number => {
  if (value === null || value === undefined) return defaultValue;
  const num = Number(value);
  return isNaN(num) ? defaultValue : num;
};

// Confirmation Dialog Component
function ConfirmationDialog({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmText = 'Confirm',
  cancelText = 'Cancel'
}: {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4">
        <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

// Data fetching functions
async function getAdminData() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Raw admin response:', response.data);
    
    // Handle both array and structured responses
    let data = response.data;
    if (data && typeof data === 'object' && data.data && Array.isArray(data.data)) {
      data = data.data; 
    } else if (data && typeof data === 'object' && data.success && Array.isArray(data.data)) {
      data = data.data;
    }
    
    if (Array.isArray(data)) {
      return data.map(admin => ({
        ...admin,
        id: safeNumber(admin.id),
        age: safeNumber(admin.age)
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching admins:', error);
    throw error;
  }
}

async function getInactiveAdminsData() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/inactive/admins`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Raw inactive admins response:', response.data);
    
    // Handle both array and structured responses
    let data = response.data;
    if (data && typeof data === 'object' && data.data && Array.isArray(data.data)) {
      data = data.data;
    } else if (data && typeof data === 'object' && data.success && Array.isArray(data.data)) {
      data = data.data;
    }
    
    if (Array.isArray(data)) {
      return data.map(admin => ({
        ...admin,
        id: safeNumber(admin.id),
        age: safeNumber(admin.age)
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching inactive admins:', error);
    throw error;
  }
}

async function getSellersData() {
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/seller`, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    console.log('Raw sellers response:', response.data);
    
    // Handle both array and structured responses
    let data = response.data;
    if (data && typeof data === 'object' && data.data && Array.isArray(data.data)) {
      data = data.data;
    } else if (data && typeof data === 'object' && data.success && Array.isArray(data.data)) {
      data = data.data;
    }
    
    if (Array.isArray(data)) {
      return data.map(seller => ({
        ...seller,
        id: safeNumber(seller.id)
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching sellers:', error);
    throw error;
  }
}

// Delete function
async function deleteAdmin(id: number) {
  try {
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/${id}`,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error deleting admin:', error);
    throw error;
  }
}

// Interfaces
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
  status: 'active' | 'inactive';
}

type TabType = 'admin' | 'inactive' | 'sellers';

// Main Component
export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<TabType>('admin');
  const [adminData, setAdminData] = useState<Admin[] | null>(null);
  const [inactiveAdminsData, setInactiveAdminsData] = useState<Admin[] | null>(null);
  const [sellersData, setSellersData] = useState<Seller[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<number | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<{ id: number; name: string } | null>(null);
  
  const router = useRouter();

  const handleLogout = async () => {
  try {
    await axios.post(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/auth/logout`, {}, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
    router.push('/login');
  }
};

  // Open delete confirmation dialog
  const openDeleteDialog = (id: number, name: string) => {
    setAdminToDelete({ id, name });
    setIsDeleteDialogOpen(true);
  };

  // Handle confirmed delete
  const handleConfirmDelete = async () => {
    if (!adminToDelete) return;
    
    try {
      setDeleteLoading(adminToDelete.id);
      setDeleteError(null);
      setDeleteSuccess(null);

      await deleteAdmin(adminToDelete.id);
      
      setDeleteSuccess(`Admin "${adminToDelete.name}" deleted successfully`);
      
      // Refresh the data
      if (activeTab === 'admin') {
        const data = await getAdminData();
        setAdminData(data);
      } else if (activeTab === 'inactive') {
        const data = await getInactiveAdminsData();
        setInactiveAdminsData(data);
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setDeleteSuccess(null);
      }, 3000);
    } catch (error: any) {
      setDeleteError(error.response?.data?.message || 'Failed to delete admin');
      
      // Clear error message after 5 seconds
      setTimeout(() => {
        setDeleteError(null);
      }, 5000);
    } finally {
      setDeleteLoading(null);
      setIsDeleteDialogOpen(false);
      setAdminToDelete(null);
    }
  };

  // Handle cancel delete
  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setAdminToDelete(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setLoading(true);
        
        if (activeTab === 'admin') {
          const data = await getAdminData();
          console.log('Processed admin data:', data);
          setAdminData(data);
        } else if (activeTab === 'inactive') {
          const data = await getInactiveAdminsData();
          console.log('Processed inactive admins data:', data);
          setInactiveAdminsData(data);
        } else if (activeTab === 'sellers') {
          const data = await getSellersData();
          console.log('Processed sellers data:', data);
          setSellersData(data);
        }
      } catch (error: any) {
        console.error('Full error details:', error);
        console.error('Error response:', error.response);
        console.error('Error status:', error.response?.status);
        console.error('Error data:', error.response?.data);
        
        if (error.response?.status === 401) {
          router.push('/login');
        } else if (error.response?.status === 400) {
          setError('Bad request. Please check your API endpoint configuration.');
        } else {
          setError(error.response?.data?.message || `Failed to load ${activeTab} data. ${error.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab, router]);

  const currentData = activeTab === 'admin' 
    ? adminData 
    : activeTab === 'inactive' 
      ? inactiveAdminsData 
      : sellersData;
      
  const tabTitle = activeTab === 'admin' 
    ? 'Administrators' 
    : activeTab === 'inactive' 
      ? 'Inactive Administrators' 
      : 'Sellers';

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
            <li>Your backend server is running</li>
            <li>The API endpoints are accessible</li>
            <li>You have proper authentication and admin role</li>
            <li>CORS is properly configured in your backend</li>
          </ul>
        </div>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Notification Bar */}
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
          {deleteSuccess && (
            <div className="mx-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-lg shadow-lg flex items-center justify-between animate-fade-in-down">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                <p className="ml-3 text-sm font-medium text-green-800">{deleteSuccess}</p>
              </div>
            </div>
          )}
          {deleteError && (
            <div className="mx-4 p-4 bg-red-50 border-l-4 border-red-400 rounded-lg shadow-lg flex items-center justify-between animate-fade-in-down">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
                </svg>
                <p className="ml-3 text-sm font-medium text-red-800">{deleteError}</p>
              </div>
            </div>
          )}
        </div>

        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="sm:flex sm:items-center justify-between">
            <div className="sm:flex-auto">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[#00B7EB] to-[#0095C0] bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Manage administrators and sellers in the system
              </p>
            </div>
            <div className="mt-4 sm:mt-0 flex flex-wrap gap-3">
              <Link
                href="/admin/registration"
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-[#00B7EB] to-[#0095C0] hover:from-[#0095C0] hover:to-[#00B7EB] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                Add Admin
              </Link>
              <Link
                href="/seller/registration"
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-[#00B7EB] to-[#0095C0] hover:from-[#0095C0] hover:to-[#00B7EB] transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                </svg>
                Add Seller
              </Link>
              <button
                onClick={() => handleLogout()}
                className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <nav className="flex space-x-4">
            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-[#00B7EB] to-[#0095C0] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              All Administrators
            </button>
            <button
              onClick={() => setActiveTab('inactive')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === 'inactive'
                  ? 'bg-gradient-to-r from-[#00B7EB] to-[#0095C0] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              Inactive Administrators
            </button>
            <button
              onClick={() => setActiveTab('sellers')}
              className={`flex items-center px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeTab === 'sellers'
                  ? 'bg-gradient-to-r from-[#00B7EB] to-[#0095C0] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              Sellers
            </button>
          </nav>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                  {/* Conditionally show columns based on active tab */}
                  {(activeTab === 'admin' || activeTab === 'inactive') && (
                    <>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone</th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Age</th>
                    </>
                  )}
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.isArray(currentData) && currentData.length > 0 ? (
                  currentData.map((item) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {item.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#00B7EB] to-[#0095C0] flex items-center justify-center text-white font-medium text-lg">
                              {item.name.charAt(0)}
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.email}</td>
                      
                      {/* Conditionally show columns based on active tab */}
                      {(activeTab === 'admin' || activeTab === 'inactive') && (
                        <>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {(item as Admin).phone || 'N/A'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {(item as Admin).age || 'N/A'}
                          </td>
                        </>
                      )}
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-3">
                          {activeTab === 'sellers' ? (
                            <>
                              <Link
                                href={`/seller/update/${item.id}`}
                                className="inline-flex items-center px-3 py-1 rounded-md bg-green-50 text-green-700 hover:bg-green-100 transition-colors duration-200"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                                Update
                              </Link>
                              <Link
                                href={`/seller/status/${item.id}`}
                                className="inline-flex items-center px-3 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                                </svg>
                                Status
                              </Link>
                            </>
                          ) : (activeTab === 'admin' || activeTab === 'inactive') && (
                            <>
                              <Link
                                href={`/admin/status/${item.id}`}
                                className="inline-flex items-center px-3 py-1 rounded-md bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors duration-200"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
                                </svg>
                                Status
                              </Link>
                              <Link
                                href={`/admin/update/${item.id}`}
                                className="inline-flex items-center px-3 py-1 rounded-md bg-green-50 text-green-700 hover:bg-green-100 transition-colors duration-200"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                                </svg>
                                Edit
                              </Link>
                              <button
                                onClick={() => openDeleteDialog(item.id, item.name)}
                                disabled={deleteLoading === item.id}
                                className="inline-flex items-center px-3 py-1 rounded-md bg-red-50 text-red-700 hover:bg-red-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                                </svg>
                                {deleteLoading === item.id ? 'Deleting...' : 'Delete'}
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={activeTab === 'sellers' ? 5 : 7} className="px-6 py-10 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
                        </svg>
                        <p className="mt-2 text-sm text-gray-500">No {tabTitle.toLowerCase()} data available</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={isDeleteDialogOpen}
        title="Confirm Delete"
        message={`Are you sure you want to delete admin "${adminToDelete?.name}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}