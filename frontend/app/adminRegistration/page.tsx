'use client';
import { useState } from 'react';

export default function AdminRegistration() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    nid: '',
    age: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add your form submission logic here
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-xl mx-auto py-10 px-4">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-2">
          Admin Registration
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Please fill in the details to create an admin account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Admin ID */}
          <div>
            <label className="block text-gray-800 mb-2">Admin ID</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter admin ID"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-gray-800 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-gray-800 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-800 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter password"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-gray-800 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter phone number"
            />
          </div>

          {/* NID */}
          <div>
            <label className="block text-gray-800 mb-2">NID Number</label>
            <input
              type="text"
              name="nid"
              value={formData.nid}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter NID number"
            />
          </div>

          {/* Age */}
          <div>
            <label className="block text-gray-800 mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min="18"
              className="w-full px-4 py-2 text-black border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
              placeholder="Enter your age"
            />
          </div>

          {/* Profile Photo */}
          <div>
            <label className="block text-gray-800 mb-2">Profile Photo</label>
            <input
              type="file"
              accept="image/*"
              className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

