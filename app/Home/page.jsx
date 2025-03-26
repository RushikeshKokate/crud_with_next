"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "" });

  // Fetch Users from API
  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch("/api/users");
    const data = await res.json();
    if (data.success) setUsers(data.data);
    setLoading(false);
  };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

  // Handle Edit Click
  const handleEditClick = (user) => {
    setEditingId(user.id);
    setFormData({ name: user.name, email: user.email });
  };

  // Handle Save Edit
  const handleSave = async (id) => {
    const res = await fetch("/api/users", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...formData }),
    });

    if (res.ok) {
      setEditingId(null);
      fetchUsers(); // Refresh Data
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      const res = await fetch("/api/users", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) fetchUsers(); // Refresh Data
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Users Table</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Email</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{user.id}</td>
                
                {/* Editable Fields */}
                <td className="border border-gray-300 px-4 py-2">
                  {editingId === user.id ? (
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="border p-1 w-full"
                    />
                  ) : (
                    user.name
                  )}
                </td>
                
                <td className="border border-gray-300 px-4 py-2">
                  {editingId === user.id ? (
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="border p-1 w-full"
                    />
                  ) : (
                    user.email
                  )}
                </td>

                <td className="border border-gray-300 px-4 py-2">
                  {editingId === user.id ? (
                    <button
                      onClick={() => handleSave(user.id)}
                      className="bg-green-500 text-white px-2 py-1 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEditClick(user)}
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="bg-red-500 text-white px-2 py-1 ml-2 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Page;
