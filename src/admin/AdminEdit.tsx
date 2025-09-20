import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AdminEdit: React.FC = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  const [form, setForm] = useState({
    year: '',
    banner: '',
    shortDescription: '',
    description: '',
    photos: '',
    videos: '',
  });

  if (!isAdmin) {
    toast.error('You are not admin!');
    navigate('/admin/login');
    return null;
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send data to backend or update JSON
    toast.success('Year entry saved (mock)!');
    navigate('/admin/dashboard');
  };

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-orange-700 mb-4">Add / Edit Year</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-lg mx-auto">
        <input name="year" type="number" placeholder="Year" value={form.year} onChange={handleChange} className="w-full mb-3 px-3 py-2 border rounded" required />
        <input name="banner" placeholder="Banner Image URL" value={form.banner} onChange={handleChange} className="w-full mb-3 px-3 py-2 border rounded" required />
        <input name="shortDescription" placeholder="Short Description" value={form.shortDescription} onChange={handleChange} className="w-full mb-3 px-3 py-2 border rounded" required />
        <textarea name="description" placeholder="Full Description" value={form.description} onChange={handleChange} className="w-full mb-3 px-3 py-2 border rounded" required />
        <input name="photos" placeholder="Photos (comma separated URLs)" value={form.photos} onChange={handleChange} className="w-full mb-3 px-3 py-2 border rounded" />
        <input name="videos" placeholder="Videos (comma separated URLs)" value={form.videos} onChange={handleChange} className="w-full mb-3 px-3 py-2 border rounded" />
        <button type="submit" className="w-full bg-orange-600 text-white py-2 rounded hover:bg-orange-700 transition">Save</button>
      </form>
    </main>
  );
};

export default AdminEdit;
