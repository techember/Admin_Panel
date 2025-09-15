// import React, { useState } from 'react';
// import { AdminLayout } from '@/components/layout/AdminLayout';
// import { PlusIcon, ChevronLeftIcon, ChevronRightIcon, PencilSquareIcon, EyeIcon, TrashIcon, LinkIcon, XMarkIcon } from '@heroicons/react/24/outline';

// interface StoreItem {
//   id: string;
//   imageUrl: string;
//   name: string;
//   description: string;
//   link: string;
// }

// const mockStores: StoreItem[] = Array.from({ length: 24 }).map((_, i) => ({
//   id: `store_${i + 1}`,
//   imageUrl: '/placeholder.svg',
//   name: `Affiliate Store ${i + 1}`,
//   description: 'Short description of the affiliate store goes here.',
//   link: 'https://example.com'
// }));

// export const AffiliateStore: React.FC = () => {
//   const [stores, setStores] = useState<StoreItem[]>(mockStores);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [itemsPerPage] = useState(10);
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [newStore, setNewStore] = useState<{ name: string; description: string; imageFile?: File | null; link: string }>({
//     name: '',
//     description: '',
//     imageFile: null,
//     link: ''
//   });
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const totalPages = Math.ceil(stores.length / itemsPerPage);
//   const startIndex = (currentPage - 1) * itemsPerPage;
//   const endIndex = Math.min(startIndex + itemsPerPage, stores.length);
//   const currentItems = stores.slice(startIndex, endIndex);

//   const handleDelete = (id: string) => {
//     setStores((prev) => prev.filter((s) => s.id !== id));
//     if (startIndex >= stores.length - 1 && currentPage > 1) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const validate = () => {
//     const e: Record<string, string> = {};
//     if (!newStore.name.trim()) e.name = 'Store name is required';
//     if (!newStore.description.trim()) e.description = 'Description is required';
//     if (!newStore.link.trim()) e.link = 'Link is required';
//     try {
//       if (newStore.link) new URL(newStore.link);
//     } catch {
//       e.link = 'Enter a valid URL';
//     }
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = () => {
//     if (!validate()) return;
//     const imageUrl = newStore.imageFile ? URL.createObjectURL(newStore.imageFile) : '/placeholder.svg';
//     const item: StoreItem = {
//       id: `store_${Date.now()}`,
//       imageUrl,
//       name: newStore.name.trim(),
//       description: newStore.description.trim(),
//       link: newStore.link.trim()
//     };
//     setStores((prev) => [item, ...prev]);
//     setShowAddModal(false);
//     setNewStore({ name: '', description: '', imageFile: null, link: '' });
//     setErrors({});
//   };

//   return (
//     <AdminLayout title="Affiliate Stores">
//       <div className="p-6">
//         <div className="admin-card">
//           {/* Header */}
//           <div className="p-6 border-b border-border">
//             <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
//               <h2 className="text-xl font-semibold">Affiliate Stores</h2>
//               <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
//                 <PlusIcon className="h-4 w-4" />
//                 + NEW STORE
//               </button>
//             </div>
//           </div>

//           {/* Table */}
//           <div className="overflow-x-auto">
//             <table className="admin-table">
//               <thead>
//                 <tr>
//                   <th>Image</th>
//                   <th>Name</th>
//                   <th>Description</th>
//                   <th>Link</th>
//                   <th>Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {currentItems.map((item) => (
//                   <tr key={item.id}>
//                     <td>
//                       <div className="h-10 w-10 rounded overflow-hidden bg-accent flex items-center justify-center">
//                         <img src={item.imageUrl} alt={item.name} className="h-10 w-10 object-cover" />
//                       </div>
//                     </td>
//                     <td className="font-medium">{item.name}</td>
//                     <td className="text-sm text-muted-foreground">{item.description}</td>
//                     <td>
//                       <a href={item.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-primary hover:underline">
//                         <LinkIcon className="h-4 w-4" />
//                         {new URL(item.link).hostname}
//                       </a>
//                     </td>
//                     <td>
//                       <div className="flex items-center gap-2">
//                         <button className="p-1 text-primary hover:bg-primary/10 rounded" title="Edit">
//                           <PencilSquareIcon className="h-4 w-4" />
//                         </button>
//                         <button className="p-1 text-foreground hover:bg-accent rounded" title="View">
//                           <EyeIcon className="h-4 w-4" />
//                         </button>
//                         <button onClick={() => handleDelete(item.id)} className="p-1 text-destructive hover:bg-destructive/10 rounded" title="Delete">
//                           <TrashIcon className="h-4 w-4" />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Pagination */}
//           {totalPages > 1 && (
//             <div className="p-6 border-t border-border">
//               <div className="flex items-center justify-between">
//                 <p className="text-sm text-muted-foreground">
//                   Showing {startIndex + 1} to {endIndex} of {stores.length} results
//                 </p>
//                 <div className="flex items-center gap-2">
//                   <button
//                     onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//                     disabled={currentPage === 1}
//                     className="p-2 border border-border rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <ChevronLeftIcon className="h-4 w-4" />
//                   </button>
//                   <span className="text-sm font-medium px-3">
//                     {currentPage} of {totalPages}
//                   </span>
//                   <button
//                     onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//                     disabled={currentPage === totalPages}
//                     className="p-2 border border-border rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
//                   >
//                     <ChevronRightIcon className="h-4 w-4" />
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Add Store Modal */}
//       {showAddModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-background rounded-lg p-6 w-full max-w-md mx-4">
//             <div className="flex items-center justify-between mb-6">
//               <h3 className="text-lg font-semibold">Add New Store</h3>
//               <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-accent rounded">
//                 <XMarkIcon className="h-5 w-5" />
//               </button>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium mb-2">Store Name *</label>
//                 <input
//                   type="text"
//                   value={newStore.name}
//                   onChange={(e) => setNewStore({ ...newStore, name: e.target.value })}
//                   className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary ${errors.name ? 'border-destructive' : 'border-border'}`}
//                   placeholder="Enter store name"
//                 />
//                 {errors.name && <p className="text-sm text-destructive mt-1">{errors.name}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Description *</label>
//                 <textarea
//                   value={newStore.description}
//                   onChange={(e) => setNewStore({ ...newStore, description: e.target.value })}
//                   className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary ${errors.description ? 'border-destructive' : 'border-border'}`}
//                   placeholder="Enter description"
//                   rows={3}
//                 />
//                 {errors.description && <p className="text-sm text-destructive mt-1">{errors.description}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Image Upload</label>
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setNewStore({ ...newStore, imageFile: e.target.files?.[0] || null })}
//                   className="w-full p-2 border border-border rounded-lg"
//                 />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium mb-2">Link *</label>
//                 <input
//                   type="url"
//                   value={newStore.link}
//                   onChange={(e) => setNewStore({ ...newStore, link: e.target.value })}
//                   className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary ${errors.link ? 'border-destructive' : 'border-border'}`}
//                   placeholder="https://example.com"
//                 />
//                 {errors.link && <p className="text-sm text-destructive mt-1">{errors.link}</p>}
//               </div>
//             </div>

//             <div className="flex gap-3 mt-6">
//               <button onClick={handleSubmit} className="btn-primary flex-1">Submit</button>
//               <button onClick={() => setShowAddModal(false)} className="btn-secondary flex-1">Cancel</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </AdminLayout>
//   );
// }; 

import React, { useState, useEffect } from "react";
import { AdminLayout } from "@/components/layout/AdminLayout";
import {
  PlusIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  EyeIcon,
  TrashIcon,
  LinkIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

interface StoreItem {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
  link: string;
}

// Mock Data
const mockStores: StoreItem[] = Array.from({ length: 24 }).map((_, i) => ({
  id: `store_${i + 1}`,
  imageUrl: "/placeholder.svg",
  name: `Affiliate Store ${i + 1}`,
  description: "Short description of the affiliate store goes here.",
  link: "https://example.com",
}));

// Env vars
const useMock = (import.meta.env.VITE_USE_MOCK_AUTH || "false") === "true";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const AffiliateStore: React.FC = () => {
  const [stores, setStores] = useState<StoreItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [showAddModal, setShowAddModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [newStore, setNewStore] = useState<{
    name: string;
    description: string;
    imageFile?: File | null;
    link: string;
  }>({
    name: "",
    description: "",
    imageFile: null,
    link: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Fetch stores (mock or backend)
  const fetchStores = async () => {
    if (useMock) {
      setStores(mockStores);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/affiliate-stores`);
      if (!res.ok) throw new Error("Failed to fetch stores");
      const data = await res.json();
      setStores(data);
    } catch (err) {
      console.error("Error fetching stores:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const totalPages = Math.ceil(stores.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, stores.length);
  const currentItems = stores.slice(startIndex, endIndex);

  // Delete
  const handleDelete = async (id: string) => {
    if (useMock) {
      setStores((prev) => prev.filter((s) => s.id !== id));
    } else {
      try {
        const res = await fetch(`${API_BASE_URL}/affiliate-stores/${id}`, {
          method: "DELETE",
        });
        if (!res.ok) throw new Error("Failed to delete store");
        await fetchStores();
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }

    if (startIndex >= stores.length - 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Validation
  const validate = () => {
    const e: Record<string, string> = {};
    if (!newStore.name.trim()) e.name = "Store name is required";
    if (!newStore.description.trim()) e.description = "Description is required";
    if (!newStore.link.trim()) e.link = "Link is required";
    try {
      if (newStore.link) new URL(newStore.link);
    } catch {
      e.link = "Enter a valid URL";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // Add store
  const handleSubmit = async () => {
    if (!validate()) return;

    if (useMock) {
      const imageUrl = newStore.imageFile
        ? URL.createObjectURL(newStore.imageFile)
        : "/placeholder.svg";
      const item: StoreItem = {
        id: `store_${Date.now()}`,
        name: newStore.name.trim(),
        description: newStore.description.trim(),
        link: newStore.link.trim(),
        imageUrl,
      };
      setStores((prev) => [item, ...prev]);
    } else {
      try {
        const formData = new FormData();
        formData.append("name", newStore.name.trim());
        formData.append("description", newStore.description.trim());
        formData.append("link", newStore.link.trim());
        if (newStore.imageFile) formData.append("image", newStore.imageFile);

        const res = await fetch(`${API_BASE_URL}/affiliate-stores`, {
          method: "POST",
          body: formData,
        });
        if (!res.ok) throw new Error("Failed to add store");

        await fetchStores();
      } catch (err) {
        console.error("Add store failed:", err);
      }
    }

    setShowAddModal(false);
    setNewStore({ name: "", description: "", imageFile: null, link: "" });
    setErrors({});
  };

  return (
    <AdminLayout title="Affiliate Stores">
      <div className="p-6">
        <div className="admin-card">
          {/* Header */}
          <div className="p-6 border-b border-border">
            <div className="flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
              <h2 className="text-xl font-semibold">Affiliate Stores</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="btn-primary flex items-center gap-2"
              >
                <PlusIcon className="h-4 w-4" />
                NEW STORE
              </button>
            </div>
          </div>

          {/* Table */}
          {loading ? (
            <p className="p-6 text-center">Loading...</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Link</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="h-10 w-10 rounded overflow-hidden bg-accent flex items-center justify-center">
                          <img
                            src={item.imageUrl}
                            alt={item.name}
                            className="h-10 w-10 object-cover"
                          />
                        </div>
                      </td>
                      <td className="font-medium">{item.name}</td>
                      <td className="text-sm text-muted-foreground">
                        {item.description}
                      </td>
                      <td>
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-primary hover:underline"
                        >
                          <LinkIcon className="h-4 w-4" />
                          {new URL(item.link).hostname}
                        </a>
                      </td>
                      <td>
                        <div className="flex items-center gap-2">
                          <button
                            className="p-1 text-primary hover:bg-primary/10 rounded"
                            title="Edit"
                          >
                            <PencilSquareIcon className="h-4 w-4" />
                          </button>
                          <button
                            className="p-1 text-foreground hover:bg-accent rounded"
                            title="View"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1 text-destructive hover:bg-destructive/10 rounded"
                            title="Delete"
                          >
                            <TrashIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-6 border-t border-border">
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Showing {startIndex + 1} to {endIndex} of {stores.length}{" "}
                  results
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      setCurrentPage(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="p-2 border border-border rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeftIcon className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-medium px-3">
                    {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="p-2 border border-border rounded-lg hover:bg-accent disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRightIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add Store Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Add New Store</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-accent rounded"
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Store Name *
                </label>
                <input
                  type="text"
                  value={newStore.name}
                  onChange={(e) =>
                    setNewStore({ ...newStore, name: e.target.value })
                  }
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                    errors.name ? "border-destructive" : "border-border"
                  }`}
                  placeholder="Enter store name"
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">{errors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Description *
                </label>
                <textarea
                  value={newStore.description}
                  onChange={(e) =>
                    setNewStore({ ...newStore, description: e.target.value })
                  }
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                    errors.description ? "border-destructive" : "border-border"
                  }`}
                  placeholder="Enter description"
                  rows={3}
                />
                {errors.description && (
                  <p className="text-sm text-destructive mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Image Upload
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNewStore({
                      ...newStore,
                      imageFile: e.target.files?.[0] || null,
                    })
                  }
                  className="w-full p-2 border border-border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Link *
                </label>
                <input
                  type="url"
                  value={newStore.link}
                  onChange={(e) =>
                    setNewStore({ ...newStore, link: e.target.value })
                  }
                  className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary ${
                    errors.link ? "border-destructive" : "border-border"
                  }`}
                  placeholder="https://example.com"
                />
                {errors.link && (
                  <p className="text-sm text-destructive mt-1">{errors.link}</p>
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={handleSubmit} className="btn-primary flex-1">
                Submit
              </button>
              <button
                onClick={() => setShowAddModal(false)}
                className="btn-secondary flex-1"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
