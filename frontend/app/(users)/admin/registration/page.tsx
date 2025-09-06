'use client';
import { useState } from 'react';

export default function AdminRegistration() {

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [nid, setNid] = useState('');
  const [age, setAge] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = { id, name, email, password, phone, nid, age };
    console.log('Form submitted:', formData);
  };

  return (
    <div>
      <h1>Admin Registration</h1>
      <form onSubmit={handleSubmit}>
        <label>Id : </label>
        <input
          type="text"
          placeholder="Admin ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        /><br />
        <label>Full Name : </label>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        /><br />
        <label>Email : </label>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        /><br />
        <label>Password : </label>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        /><br />
        <label>Phone : </label>
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        /><br />
        <label>NID : </label>
        <input
          type="text"
          placeholder="NID Number"
          value={nid}
          onChange={(e) => setNid(e.target.value)}
          required
        /><br />
        <label>Age : </label>
        <input
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          min="18"
          required
        /><br />
        <label>Profile Picture : </label>
        <input type="file" accept="image/*" /><br /><br />

        <button type="submit">Create Account</button>
      </form>
    </div>
  );
}
