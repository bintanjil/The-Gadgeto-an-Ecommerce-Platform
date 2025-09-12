'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import axios from 'axios';

// Types for our admin data
interface AdminFormData {
  id: number;
  name: string;
  email: string;
  password: string;
  phone: string;
  nid: string;
  age: number;
}

// API functions
async function createAdmin(adminData: AdminFormData, file: File | null) {
  try {
    const formData = new FormData();
    
    // Insert all admin data to FormData
    formData.append('id', adminData.id.toString());
    formData.append('name', adminData.name);
    formData.append('email', adminData.email);
    formData.append('password', adminData.password);
    formData.append('phone', adminData.phone);
    formData.append('nid', adminData.nid);
    formData.append('age', adminData.age.toString());
    
    if (file) {
      formData.append('myfile', file);
    }

    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/createAdmin`,
      formData,
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

async function validateFormData(formData: any) {
  const validation = adminSchema.safeParse(formData);
  if (!validation.success) {
    const formattedErrors: Record<string, string> = {};
    validation.error.issues.forEach((issue) => {
      const path = issue.path[0] as string;
      formattedErrors[path] = issue.message;
    });
    throw { type: 'validation', errors: formattedErrors };
  }
  return validation.data;
}

// Define Zod schema with coerce that parse the input field
const adminSchema = z.object({
  id: z.coerce
    .number("Id must be a number")
    .positive('ID must be a positive number'),
  name: z.string()
    .min(1, 'Name is required')
    .min(5, 'Name must be at least 5 characters')
    .regex(/^[A-Z][a-zA-Z\s]*$/, 'Name should start with a capital letter and contain only alphabets'),
  email: z.string()
    .min(1, 'Email is required')
    .email('Please enter a valid email'),
  password: z.string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters long'),
  phone: z.string()
    .min(1, 'Phone number is required')
    .regex(/^01\d{9}$/, 'Phone number must be 11 digits and start with 01'),
  nid: z.string()
    .min(1, 'NID number is required')
    .regex(/^\d{10,17}$/, 'Bangladeshi NID must be 10 to 17 digits'),
  age: z.coerce
    .number("Age must be a number")
    .min(18, 'Admin must be at least 18 years old'),
  fileName: z.string().optional(),
  file: z.instanceof(File).optional()
    .refine((file) => !file || file.size <= 2 * 1024 * 1024, 'File size must be less than 2MB')
    .refine((file) => !file || file.type.startsWith('image/'), 'Only image files are allowed')
});

export default function AdminRegistration() {
  const router = useRouter();
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [nid, setNid] = useState('');
  const [age, setAge] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  async function resetForm() {
    setId('');
    setName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setNid('');
    setAge('');
    setFile(null);
    
    // Reset file input
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  async function handleBackendError(error: any) {
    console.error('Error creating admin:', error);
    
    if (error.response?.data?.message) {
      // Backend validation errors
      if (Array.isArray(error.response.data.message)) {
        const backendErrors: Record<string, string> = {};
        error.response.data.message.forEach((msg: string) => {
          // Parse backend error messages and map to fields
          if (msg.includes('email')) backendErrors.email = msg;
          else if (msg.includes('phone')) backendErrors.phone = msg;
          else if (msg.includes('id')) backendErrors.id = msg;
          else backendErrors.general = msg;
        });
        return backendErrors;
      }
      return { general: error.response.data.message };
    } else if (error.response?.status === 409) {
      return { general: 'Admin with this email or ID already exists' };
    } else if (error.response?.status === 400) {
      return { general: 'Invalid data provided. Please check your inputs.' };
    }
    return { general: 'Failed to create admin. Please try again.' };
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');

    // Prepare form data for validation
    const formDataForValidation = {
      id,
      name,
      email,
      password,
      phone,
      nid,
      age,
      fileName: file ? file.name : undefined,
      file
    };

    try {
      // Validate form data
      const validatedData = await validateFormData(formDataForValidation);

      // Prepare admin data
      const adminData = {
        id: parseInt(id),
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim(),
        nid: nid.trim(),
        age: parseInt(age),
      };

      // Create admin
      const result = await createAdmin(adminData, file);
      console.log('Admin created successfully:', result);

      // Show success message
      setSuccessMessage('Admin registration successful!');
      
      // Reset the form
      await resetForm();
      
      // Redirect after success
      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 2000);
      
    } catch (error: any) {
      if (error.type === 'validation') {
        setErrors(error.errors);
      } else {
        const backendErrors = await handleBackendError(error);
        setErrors(backendErrors);
      }
    } finally {
      setIsSubmitting(false);
    }
    
    setIsSubmitting(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    
    if (errors.file) {
      const newErrors = { ...errors };
      delete newErrors.file;
      setErrors(newErrors);
    }
  };

  // Clear field errors when user starts typing
  const clearFieldError = (fieldName: string) => {
    if (errors[fieldName]) {
      const newErrors = { ...errors };
      delete newErrors[fieldName];
      setErrors(newErrors);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 50%, #f1f5f9 100%)',
      padding: '40px 20px',
      fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    }}>
      <div style={{
        maxWidth: '580px',
        margin: '0 auto',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08), 0 6px 20px rgba(0, 0, 0, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        {/* Header Section */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            backgroundColor: '#e0f2fe',
            borderRadius: '50%',
            margin: '0 auto 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px'
          }}>
            👤
          </div>
          <h1 style={{
            fontSize: '28px',
            fontWeight: '700',
            color: '#1e293b',
            margin: '0 0 8px 0',
            letterSpacing: '-0.5px'
          }}>
            Admin Registration
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#64748b',
            margin: '0'
          }}>
            Create a new administrator account
          </p>
        </div>

        {/* General error message */}
        {errors.general && (
          <div style={{
            padding: '16px 20px',
            backgroundColor: '#fef2f2',
            color: '#dc2626',
            border: '1px solid #fecaca',
            borderRadius: '12px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
            ⚠️ {errors.general}
          </div>
        )}

        {successMessage && (
          <div style={{
            padding: '16px 20px',
            backgroundColor: '#f0fdf4',
            color: '#16a34a',
            border: '1px solid #bbf7d0',
            borderRadius: '12px',
            marginBottom: '24px',
            fontSize: '14px',
            fontWeight: '500'
          }}>
             {successMessage}
          </div>
        )}
        
        {/* Form Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Admin ID */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Admin ID <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Admin ID"
              value={id}
              onChange={(e) => {
                setId(e.target.value);
                clearFieldError('id');
              }}
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '16px',
                color: '#000000',
                backgroundColor: '#ffffff',
                border: errors.id ? '2px solid #f87171' : '2px solid #e5e7eb',
                borderRadius: '12px',
                outline: 'none',
                transition: 'all 0.2s ease-in-out',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
              onFocus={(e) => {
                if (!errors.id) {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.id ? '#f87171' : '#e5e7eb';
                e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            />
            {errors.id && (
              <div style={{
                color: '#ef4444',
                fontSize: '13px',
                marginTop: '6px',
                fontWeight: '500'
              }}>
                {errors.id}
              </div>
            )}
          </div>

          {/* Full Name */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Full Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                clearFieldError('name');
              }}
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '16px',
                color: '#000000',
                backgroundColor: '#ffffff',
                border: errors.name ? '2px solid #f87171' : '2px solid #e5e7eb',
                borderRadius: '12px',
                outline: 'none',
                transition: 'all 0.2s ease-in-out',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
              onFocus={(e) => {
                if (!errors.name) {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.name ? '#f87171' : '#e5e7eb';
                e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            />
            {errors.name && (
              <div style={{
                color: '#ef4444',
                fontSize: '13px',
                marginTop: '6px',
                fontWeight: '500'
              }}>
                {errors.name}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Email Address <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="email"
              placeholder="Enter valid email address"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                clearFieldError('email');
              }}
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '16px',
                color: '#000000',
                backgroundColor: '#ffffff',
                border: errors.email ? '2px solid #f87171' : '2px solid #e5e7eb',
                borderRadius: '12px',
                outline: 'none',
                transition: 'all 0.2s ease-in-out',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
              onFocus={(e) => {
                if (!errors.email) {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.email ? '#f87171' : '#e5e7eb';
                e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            />
            {errors.email && (
              <div style={{
                color: '#ef4444',
                fontSize: '13px',
                marginTop: '6px',
                fontWeight: '500'
              }}>
                {errors.email}
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Password <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="password"
              placeholder="Minimum 8 characters"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                clearFieldError('password');
              }}
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '16px',
                color: '#000000',
                backgroundColor: '#ffffff',
                border: errors.password ? '2px solid #f87171' : '2px solid #e5e7eb',
                borderRadius: '12px',
                outline: 'none',
                transition: 'all 0.2s ease-in-out',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
              onFocus={(e) => {
                if (!errors.password) {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.password ? '#f87171' : '#e5e7eb';
                e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            />
            {errors.password && (
              <div style={{
                color: '#ef4444',
                fontSize: '13px',
                marginTop: '6px',
                fontWeight: '500'
              }}>
                {errors.password}
              </div>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Phone Number <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="tel"
              placeholder="A valid Bangladeshi number"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                clearFieldError('phone');
              }}
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '16px',
                color: '#000000',
                backgroundColor: '#ffffff',
                border: errors.phone ? '2px solid #f87171' : '2px solid #e5e7eb',
                borderRadius: '12px',
                outline: 'none',
                transition: 'all 0.2s ease-in-out',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
              onFocus={(e) => {
                if (!errors.phone) {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.phone ? '#f87171' : '#e5e7eb';
                e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            />
            {errors.phone && (
              <div style={{
                color: '#ef4444',
                fontSize: '13px',
                marginTop: '6px',
                fontWeight: '500'
              }}>
                {errors.phone}
              </div>
            )}
          </div>

          {/* NID Number */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>
              NID Number <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              placeholder="10-17 digits Bangladeshi NID"
              value={nid}
              onChange={(e) => {
                setNid(e.target.value);
                clearFieldError('nid');
              }}
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '16px',
                color: '#000000',
                backgroundColor: '#ffffff',
                border: errors.nid ? '2px solid #f87171' : '2px solid #e5e7eb',
                borderRadius: '12px',
                outline: 'none',
                transition: 'all 0.2s ease-in-out',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
              onFocus={(e) => {
                if (!errors.nid) {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.nid ? '#f87171' : '#e5e7eb';
                e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            />
            {errors.nid && (
              <div style={{
                color: '#ef4444',
                fontSize: '13px',
                marginTop: '6px',
                fontWeight: '500'
              }}>
                {errors.nid}
              </div>
            )}
          </div>

          {/* Age */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Age <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="number"
              placeholder="Must be 18 or older"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
                clearFieldError('age');
              }}
              min="18"
              style={{
                width: '100%',
                padding: '14px 16px',
                fontSize: '16px',
                color: '#000000',
                backgroundColor: '#ffffff',
                border: errors.age ? '2px solid #f87171' : '2px solid #e5e7eb',
                borderRadius: '12px',
                outline: 'none',
                transition: 'all 0.2s ease-in-out',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
              onFocus={(e) => {
                if (!errors.age) {
                  e.target.style.borderColor = '#3b82f6';
                  e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
                }
              }}
              onBlur={(e) => {
                e.target.style.borderColor = errors.age ? '#f87171' : '#e5e7eb';
                e.target.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            />
            {errors.age && (
              <div style={{
                color: '#ef4444',
                fontSize: '13px',
                marginTop: '6px',
                fontWeight: '500'
              }}>
                {errors.age}
              </div>
            )}
          </div>

          {/* Profile Picture */}
          <div>
            <label style={{
              display: 'block',
              marginBottom: '8px',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151'
            }}>
              Profile Picture <span style={{ color: '#6b7280', fontWeight: '400' }}>(Optional)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{
                width: '100%',
                padding: '12px 16px',
                fontSize: '14px',
                color: '#000000',
                backgroundColor: '#ffffff',
                border: errors.file ? '2px solid #f87171' : '2px solid #e5e7eb',
                borderRadius: '12px',
                outline: 'none',
                cursor: 'pointer'
              }}
            />
            <div style={{
              fontSize: '12px',
              color: '#6b7280',
              marginTop: '6px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              Max file size: 2MB 
            </div>
            {errors.file && (
              <div style={{
                color: '#ef4444',
                fontSize: '13px',
                marginTop: '6px',
                fontWeight: '500'
              }}>
                {errors.file}
              </div>
            )}
            {file && !errors.file && (
              <div style={{
                color: '#16a34a',
                fontSize: '13px',
                marginTop: '6px',
                fontWeight: '500',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '16px 24px',
              fontSize: '16px',
              fontWeight: '600',
              color: '#ffffff',
              backgroundColor: isSubmitting ? '#9ca3af' : '#3b82f6',
              border: 'none',
              borderRadius: '12px',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              marginTop: '8px',
              transition: 'all 0.2s ease-in-out',
              boxShadow: isSubmitting ? 'none' : '0 4px 14px rgba(59, 130, 246, 0.25)',
              transform: isSubmitting ? 'none' : 'translateY(0)'
            }}
            onMouseOver={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#2563eb';
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.35)';
              }
            }}
            onMouseOut={(e) => {
              if (!isSubmitting) {
                e.currentTarget.style.backgroundColor = '#3b82f6';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(59, 130, 246, 0.25)';
              }
            }}
          >
            {isSubmitting ? ' Creating Account...' : 'Create Admin Account'}
          </button>
        </div>
      </div>
    </div>
  );
}