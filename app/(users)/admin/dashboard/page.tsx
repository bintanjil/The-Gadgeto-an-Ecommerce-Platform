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
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/inactive`, {
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
      localStorage.clear();
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
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Success and Error Messages */}
        {deleteSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            {deleteSuccess}
          </div>
        )}
        {deleteError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
            {deleteError}
          </div>
        )}

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
              All Administrators
            </button>
            <button
              onClick={() => setActiveTab('inactive')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'inactive'
                  ? 'border-[#00B7EB] text-[#00B7EB]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Inactive Administrators
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
                      {/* Conditionally show columns based on active tab */}
                      {(activeTab === 'admin' || activeTab === 'inactive') && (
                        <>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Phone</th>
                          <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Age</th>
                        </>
                      )}
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {Array.isArray(currentData) && currentData.length > 0 ? (
                      currentData.map((item) => (
                        <tr key={item.id} className="hover:bg-gray-50">
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                            {item.id}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                            {item.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">{item.email}</td>
                          
                          {/* Conditionally show columns based on active tab */}
                          {(activeTab === 'admin' || activeTab === 'inactive') && (
                            <>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                {(item as Admin).phone || 'N/A'}
                              </td>
                              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-900">
                                {(item as Admin).age || 'N/A'}
                              </td>
                            </>
                          )}
                          
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                                item.status === 'active' 
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {item.status}
                              </span>
                            </div>
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm">
                            <div className="flex items-center space-x-2">
                              {activeTab === 'sellers' ? (
                                <>
                                  <Link
                                    href={`/seller/update/${item.id}`}
                                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                                  >
                                    Update
                                  </Link>
                                  <Link
                                    href={`/seller/status/${item.id}`}
                                    className="text-[#00B7EB] hover:text-[#0095C0] text-sm font-medium"
                                  >
                                    Change Status
                                  </Link>
                                </>
                              ) : (activeTab === 'admin' || activeTab === 'inactive') && (
                                <>
                                  <Link
                                    href={`/admin/status/${item.id}`}
                                    className="text-[#00B7EB] hover:text-[#0095C0] text-sm font-medium"
                                  >
                                    Change Status
                                  </Link>
                                  <Link
                                    href={`/admin/update/${item.id}`}
                                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                                  >
                                    Edit
                                  </Link>
                                  <button
                                    onClick={() => openDeleteDialog(item.id, item.name)}
                                    disabled={deleteLoading === item.id}
                                    className="text-red-600 hover:text-red-800 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
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
                        <td colSpan={activeTab === 'sellers' ? 5 : 7} className="text-center py-8">
                          <p className="text-gray-500 text-sm">No {tabTitle.toLowerCase()} data available</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
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