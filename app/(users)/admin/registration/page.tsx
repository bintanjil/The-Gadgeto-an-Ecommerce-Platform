'use client';

import { useState } from 'react';
import { z } from 'zod';
import { useRouter } from 'next/navigation';

// Define Zod schema with coerce that parse the input field
const adminSchema = z.object({
  id: z.coerce
    .number("Id mus be a number")
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

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSuccessMessage('');

    // Prepare form data
    const formData = {
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

    // Validate form using safeParse instead tru catch block
    const validation = adminSchema.safeParse(formData);

    if (validation.success) {
      const validatedData = {
        id: parseInt(id),
        name: name.trim(),
        email: email.trim(),
        password,
        phone: phone.trim(),
        nid: nid.trim(),
        age: parseInt(age),
        fileName: file ? file.name : undefined
      };

      
      setTimeout(() => {
        setSuccessMessage('Admin registration successful');
        
        // Reset form
        setId('');
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
        setNid('');
        setAge('');
        setFile(null);
        
        
        setTimeout(() => router.push('/home'), 20);
        setIsSubmitting(false);
      }, 1000);
      
    } else {
      // Format Zod errors into our error state format
      const formattedErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0] as string;
        formattedErrors[path] = issue.message;
      });
      
      setErrors(formattedErrors);
      setIsSubmitting(false);
    }
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
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
        Admin Registration
      </h1>

      {successMessage && (
        <div style={{
          padding: '15px',
          backgroundColor: '#d4edda',
          color: '#155724',
          border: '1px solid #c3e6cb',
          borderRadius: '4px',
          marginBottom: '20px',
          textAlign: 'center'
        }}>
          {successMessage}
        </div>
      )}
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
            Admin ID: <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Enter Admin ID (positive number)"
            value={id}
            onChange={(e) => {
              setId(e.target.value);
              clearFieldError('id');
            }}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.id ? '2px solid #dc3545' : '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = errors.id ? '#dc3545' : '#007bff'}
            onBlur={(e) => e.target.style.borderColor = errors.id ? '#dc3545' : '#ccc'}
          />
          {errors.id && (
            <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px' }}>
               {errors.id}
            </div>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
            Full Name: <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="text"
            placeholder="Must start with capital letter (min 5 chars)"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              clearFieldError('name');
            }}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.name ? '2px solid #dc3545' : '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          {errors.name && (
            <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px' }}>
              {errors.name}
            </div>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
            Email: <span style={{ color: 'red' }}>*</span>
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
              padding: '10px',
              border: errors.email ? '2px solid #dc3545' : '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          {errors.email && (
            <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px' }}>
              {errors.email}
            </div>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
            Password: <span style={{ color: 'red' }}>*</span>
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
              padding: '10px',
              border: errors.password ? '2px solid #dc3545' : '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          {errors.password && (
            <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px' }}>
              {errors.password}
            </div>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
            Phone Number: <span style={{ color: 'red' }}>*</span>
          </label>
          <input
            type="tel"
            placeholder="01XXXXXXXXX (11 digits starting with 01)"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              clearFieldError('phone');
            }}
            style={{
              width: '100%',
              padding: '10px',
              border: errors.phone ? '2px solid #dc3545' : '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          {errors.phone && (
            <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px' }}>
              {errors.phone}
            </div>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
            NID Number: <span style={{ color: 'red' }}>*</span>
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
              padding: '10px',
              border: errors.nid ? '2px solid #dc3545' : '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          {errors.nid && (
            <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px' }}>
              {errors.nid}
            </div>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
            Age: <span style={{ color: 'red' }}>*</span>
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
              padding: '10px',
              border: errors.age ? '2px solid #dc3545' : '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          {errors.age && (
            <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px' }}>
              {errors.age}
            </div>
          )}
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold', color: '#333' }}>
            Profile Picture (Optional):
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{
              width: '100%',
              padding: '8px',
              border: errors.file ? '2px solid #dc3545' : '1px solid #ccc',
              borderRadius: '4px',
              fontSize: '14px',
              outline: 'none'
            }}
          />
          <small style={{ color: '#666', fontSize: '12px' }}>
            📁 Max file size: 2MB | Supported: JPG, PNG, GIF
          </small>
          {errors.file && (
            <div style={{ color: '#dc3545', fontSize: '12px', marginTop: '3px' }}>
               {errors.file}
            </div>
          )}
          {file && !errors.file && (
            <div style={{ color: '#28a745', fontSize: '12px', marginTop: '3px' }}>
              ✅ Selected: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
            </div>
          )}
        </div>

        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          style={{
            padding: '14px 20px',
            backgroundColor: isSubmitting ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            marginTop: '15px',
            transition: 'background-color 0.2s',
            opacity: isSubmitting ? 0.7 : 1
          }}
          onMouseOver={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.backgroundColor = '#0056b3';
            }
          }}
          onMouseOut={(e) => {
            if (!isSubmitting) {
              e.currentTarget.style.backgroundColor = '#007bff';
            }
          }}
        >
          {isSubmitting ? '⏳ Creating Account...' : '🚀 Create Account'}
        </button>
      </div>
    </div>
  );
}