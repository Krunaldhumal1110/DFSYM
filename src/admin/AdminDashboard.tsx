import React from 'react';
import { useNavigate } from 'react-router-dom';
import years from '../data/years.json';
import { toast } from 'react-toastify';

const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';

  if (!isAdmin) {
    toast.error('You are not admin!');
    navigate('/admin/login');
    return null;
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-orange-700 mb-6">Admin Dashboard</h1>
      <table className="min-w-full bg-white rounded shadow overflow-hidden">
        <thead className="bg-orange-600 text-white">
          <tr>
            <th className="py-2 px-4">Year</th>
            <th className="py-2 px-4">Banner</th>
            <th className="py-2 px-4">Short Description</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {years.map((item) => (
            <tr key={item.year} className="border-b">
              <td className="py-2 px-4 font-bold">{item.year}</td>
              <td className="py-2 px-4"><img src={item.banner} alt="Banner" className="h-12 rounded" /></td>
              <td className="py-2 px-4">{item.shortDescription}</td>
              <td className="py-2 px-4 flex gap-2">
                <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500 transition">Edit</button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="mt-6 bg-orange-600 text-white px-6 py-2 rounded hover:bg-orange-700 transition" onClick={() => navigate('/admin/edit')}>Add New Year</button>
    </main>
  );
};

export default AdminDashboard;
