'use client';
import { useEffect, useState } from "react";
import axios from "axios";


async function getAdminData() {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin`);
    return response.data;
}

export default function AdminDashboard() {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null); // Clear any previous errors
        const data = await getAdminData();
        console.log('Fetched Data:', data); // Debug log
        setAdminData(data);
      } catch (error: any) {
        console.error('Error in component:', error);
        setError(error.message || "Failed to load admin data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-xl text-blue-600">Loading admin data...</div>
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
            <li>The /admin endpoint is accessible</li>
            <li>CORS is properly configured in your backend</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <pre>{JSON.stringify(adminData, null, 2)}</pre>
    </div>
  );
}