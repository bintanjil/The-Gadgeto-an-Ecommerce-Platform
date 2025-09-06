'use client';
import { useState } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';


const adminSchema = z.object({
  id: z.coerce.number()
    .int({ message: "ID must be an integer" })
    .positive({ message: "ID must be a positive number" })
    .min(1, { message: "ID must be at least 1" }),
  
  name: z.string()
    .min(5, { message: "Name must be at least 5 characters long" })
    .regex(/^[A-Z][a-zA-Z\s]*$/, { 
      message: "Name should start with a capital letter and contain only alphabets" 
    })
    .trim(),
  
  email: z.string()
    .email({ message: "Please enter a valid email address" })
    .toLowerCase(),
  
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .trim(),

  phone: z.string()
    .regex(/^01\d{9}$/, { 
      message: "Phone number must be 11 digits and start with 01" 
    }),
  
  nid: z.string()
    .regex(/^\d{10,17}$/, { 
      message: "NID must be 10 to 17 digits" 
    }),
  
  age: z.coerce.number()
    .int({ message: "Age must be an integer" })
    .min(18, { message: "Admin must be at least 18 years old" }),
  
  profilePicture: z
    .instanceof(FileList)
    .optional()
    .refine((files) => {
      if (!files) return true;
      return Array.from(files).every(file => file.size <= 2*1024*1024);
    }, `File size should not exceed ${2}MB`),
  
  status: z.enum(['active', 'inactive']).default('active')
});

export default function AdminRegistration() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm({
    resolver: zodResolver(adminSchema),
    mode: 'onChange',
    defaultValues: {
      status: 'active'
    }
  });

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      
      // Append all fields to FormData
      Object.entries(data).forEach(([key, value]) => {
        if (key !== 'profilePicture' && value !== undefined && value !== null) {
          formData.append(key, value.toString());
        }
      });
      
      // Append file if selected
      if (data.profilePicture?.[0]) {
        formData.append('profilePicture', data.profilePicture[0]);
      }

      // Here you would typically make an API call
      console.log('Form data:', Object.fromEntries(formData.entries()));
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Admin registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
      setError('root', { 
        message: 'Registration failed. Please try again.' 
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#E5E4E2] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-[#00B7EB]">
            Admin Registration
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Create your admin account to manage the platform
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
          {errors.root && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {errors.root.message}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="id" className="block text-sm font-medium text-[#00B7EB]">
                Admin ID
              </label>
              <input
                id="id"
                type="number"
                placeholder="Enter your admin ID"
                {...register('id')}
                className="mt-1 block w-full px-3 py-2 border border-[#00B7EB]/30 rounded-md shadow-sm focus:outline-none focus:ring-[#00B7EB] focus:border-[#00B7EB] bg-[#E5E4E2]/20"
              />
              {errors.id && (
                <p className="mt-1 text-sm text-red-600">{errors.id.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#00B7EB]">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                {...register('name')}
                className="mt-1 block w-full px-3 py-2 border border-[#00B7EB]/30 rounded-md shadow-sm focus:outline-none focus:ring-[#00B7EB] focus:border-[#00B7EB] bg-[#E5E4E2]/20"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#00B7EB]">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register('email')}
                className="mt-1 block w-full px-3 py-2 border border-[#00B7EB]/30 rounded-md shadow-sm focus:outline-none focus:ring-[#00B7EB] focus:border-[#00B7EB] bg-[#E5E4E2]/20"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#00B7EB]">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register('password')}
                className="mt-1 block w-full px-3 py-2 border border-[#00B7EB]/30 rounded-md shadow-sm focus:outline-none focus:ring-[#00B7EB] focus:border-[#00B7EB] bg-[#E5E4E2]/20"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#00B7EB]">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number (e.g., 01712345678)"
                {...register('phone')}
                className="mt-1 block w-full px-3 py-2 border border-[#00B7EB]/30 rounded-md shadow-sm focus:outline-none focus:ring-[#00B7EB] focus:border-[#00B7EB] bg-[#E5E4E2]/20"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="nid" className="block text-sm font-medium text-[#00B7EB]">
                NID Number
              </label>
              <input
                id="nid"
                type="text"
                placeholder="Enter your NID number (10-17 digits)"
                {...register('nid')}
                className="mt-1 block w-full px-3 py-2 border border-[#00B7EB]/30 rounded-md shadow-sm focus:outline-none focus:ring-[#00B7EB] focus:border-[#00B7EB] bg-[#E5E4E2]/20"
              />
              {errors.nid && (
                <p className="mt-1 text-sm text-red-600">{errors.nid.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-[#00B7EB]">
                Age
              </label>
              <input
                id="age"
                type="number"
                placeholder="Enter your age"
                min="18"
                {...register('age')}
                className="mt-1 block w-full px-3 py-2 border border-[#00B7EB]/30 rounded-md shadow-sm focus:outline-none focus:ring-[#00B7EB] focus:border-[#00B7EB] bg-[#E5E4E2]/20"
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="profilePicture" className="block text-sm font-medium text-[#00B7EB]">
                Profile Picture (max 2MB)
              </label>
              <input
                id="profilePicture"
                type="file"
                accept="image/*"
                {...register('profilePicture')}
                className="mt-1 block w-full px-3 py-2 border border-[#00B7EB]/30 rounded-md shadow-sm focus:outline-none focus:ring-[#00B7EB] focus:border-[#00B7EB] bg-[#E5E4E2]/20"
              />
              {errors.profilePicture && (
                <p className="mt-1 text-sm text-red-600">{errors.profilePicture.message}</p>
              )}
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-md text-sm font-medium text-white bg-[#00B7EB] hover:bg-[#00B7EB]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00B7EB] transform transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
