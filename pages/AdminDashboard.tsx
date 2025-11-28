import React, { useState } from 'react';
import { useApp } from '../App';
import { Product, ProductCategory, PlantType } from '../types';
import { Edit2, Trash2, Plus, Image } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { products, setProducts } = useApp();
  const [isEditing, setIsEditing] = useState<string | null>(null);
  
  // Empty state for new product
  const initialFormState: Omit<Product, 'id' | 'rating' | 'reviews'> = {
    name: '',
    category: ProductCategory.Flower,
    type: PlantType.Hybrid,
    price: 0,
    thc: 0,
    cbd: 0,
    description: '',
    effects: [],
    flavors: [],
    image: 'https://picsum.photos/500/500', // Default placeholder
    inStock: true
  };

  const [formData, setFormData] = useState(initialFormState);

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      setProducts(prev => prev.map(p => p.id === isEditing ? { ...p, ...formData } : p));
      setIsEditing(null);
    } else {
      const newProduct: Product = {
        ...formData,
        id: Date.now().toString(),
        rating: 0,
        reviews: 0
      };
      setProducts(prev => [...prev, newProduct]);
    }
    setFormData(initialFormState);
  };

  const startEdit = (product: Product) => {
    setIsEditing(product.id);
    const { id, rating, reviews, ...rest } = product;
    setFormData(rest);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <span className="bg-yellow-100 text-yellow-800 px-4 py-2 rounded-lg text-sm font-medium">
          Changes are local only (Session)
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-200 sticky top-24">
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Product Name</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2 border rounded-lg"
                  required 
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                   <label className="block text-sm font-medium mb-1">Category</label>
                   <select 
                      value={formData.category} 
                      onChange={e => setFormData({...formData, category: e.target.value as ProductCategory})}
                      className="w-full p-2 border rounded-lg"
                   >
                     {Object.values(ProductCategory).map(c => <option key={c} value={c}>{c}</option>)}
                   </select>
                </div>
                <div>
                   <label className="block text-sm font-medium mb-1">Type</label>
                   <select 
                      value={formData.type} 
                      onChange={e => setFormData({...formData, type: e.target.value as PlantType})}
                      className="w-full p-2 border rounded-lg"
                   >
                     {Object.values(PlantType).map(t => <option key={t} value={t}>{t}</option>)}
                   </select>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2">
                 <div>
                    <label className="block text-sm font-medium mb-1">Price ($)</label>
                    <input type="number" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} className="w-full p-2 border rounded-lg" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">THC %</label>
                    <input type="number" value={formData.thc} onChange={e => setFormData({...formData, thc: Number(e.target.value)})} className="w-full p-2 border rounded-lg" />
                 </div>
                 <div>
                    <label className="block text-sm font-medium mb-1">CBD %</label>
                    <input type="number" value={formData.cbd} onChange={e => setFormData({...formData, cbd: Number(e.target.value)})} className="w-full p-2 border rounded-lg" />
                 </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea 
                  value={formData.description} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  className="w-full p-2 border rounded-lg h-24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Image URL</label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={formData.image} 
                    onChange={e => setFormData({...formData, image: e.target.value})}
                    className="w-full p-2 border rounded-lg"
                  />
                  {formData.image && <img src={formData.image} alt="Preview" className="w-10 h-10 rounded object-cover" />}
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                 <button type="submit" className="flex-1 bg-brand-dark text-white py-2 rounded-lg font-bold hover:bg-brand-green">
                    {isEditing ? 'Update Product' : 'Create Product'}
                 </button>
                 {isEditing && (
                   <button type="button" onClick={() => { setIsEditing(null); setFormData(initialFormState); }} className="px-4 py-2 border rounded-lg hover:bg-stone-100">
                     Cancel
                   </button>
                 )}
              </div>
            </form>
          </div>
        </div>

        {/* Product List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-stone-50 border-b border-stone-200 text-stone-500 text-sm uppercase">
                  <th className="p-4 font-semibold">Product</th>
                  <th className="p-4 font-semibold">Category</th>
                  <th className="p-4 font-semibold">Price</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product.id} className="border-b border-stone-100 hover:bg-stone-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt="" className="w-10 h-10 rounded-lg object-cover bg-stone-200" />
                        <div>
                          <div className="font-medium text-stone-900">{product.name}</div>
                          <div className="text-xs text-stone-500">ID: {product.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-stone-600">{product.category}</td>
                    <td className="p-4 font-medium">${product.price}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => startEdit(product)} className="p-2 text-brand-green hover:bg-brand-light rounded-lg">
                          <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(product.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;