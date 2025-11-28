import React, { useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useApp } from '../App';
import { ProductCategory, PlantType } from '../types';
import { Filter, Star, ShoppingCart } from 'lucide-react';

const Shop: React.FC<{ showDealsOnly?: boolean }> = ({ showDealsOnly = false }) => {
  const { products, addToCart } = useApp();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialCategory = searchParams.get('category') as ProductCategory | 'All';

  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'All'>(initialCategory || 'All');
  const [selectedType, setSelectedType] = useState<PlantType | 'All'>('All');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (showDealsOnly && !p.salePrice) return false;
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (selectedType !== 'All' && p.type !== selectedType) return false;
      return true;
    });
  }, [products, selectedCategory, selectedType, showDealsOnly]);

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Filters Sidebar */}
        <aside className={`md:w-64 space-y-8 ${showMobileFilters ? 'block' : 'hidden md:block'}`}>
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <Filter size={20} /> Filters
            </h3>
            
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">Category</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="category" 
                    checked={selectedCategory === 'All'}
                    onChange={() => setSelectedCategory('All')}
                    className="text-brand-green focus:ring-brand-green"
                  />
                  <span>All Products</span>
                </label>
                {Object.values(ProductCategory).map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="category" 
                      checked={selectedCategory === cat}
                      onChange={() => setSelectedCategory(cat)}
                      className="text-brand-green focus:ring-brand-green"
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-stone-500 uppercase tracking-wider mb-3">Strain Type</h4>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="type" 
                    checked={selectedType === 'All'}
                    onChange={() => setSelectedType('All')}
                    className="text-brand-green focus:ring-brand-green"
                  />
                  <span>All Types</span>
                </label>
                {Object.values(PlantType).map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="type" 
                      checked={selectedType === type}
                      onChange={() => setSelectedType(type)}
                      className="text-brand-green focus:ring-brand-green"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        {/* Mobile Filter Toggle */}
        <button 
          className="md:hidden flex items-center justify-center gap-2 w-full py-3 border border-stone-300 rounded-lg font-medium"
          onClick={() => setShowMobileFilters(!showMobileFilters)}
        >
          <Filter size={18} /> {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Product Grid */}
        <div className="flex-grow">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-brand-dark">
              {showDealsOnly ? 'Current Deals' : 'Shop Menu'}
            </h1>
            <p className="text-stone-500">{filteredProducts.length} results found</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="bg-white border border-stone-100 rounded-2xl p-4 shadow-sm hover:shadow-lg transition-shadow flex flex-col">
                <Link to={`/product/${product.id}`} className="block relative aspect-square rounded-xl overflow-hidden bg-stone-50 mb-4">
                   <img src={product.image} alt={product.name} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                   {product.salePrice && <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>}
                </Link>
                <div className="flex justify-between items-start mb-2">
                   <div>
                     <p className="text-xs text-stone-500 uppercase tracking-wide">{product.category}</p>
                     <Link to={`/product/${product.id}`} className="font-bold text-lg hover:text-brand-green">{product.name}</Link>
                   </div>
                   <div className="flex items-center text-xs font-bold bg-stone-100 px-2 py-1 rounded">
                     <Star size={10} className="fill-brand-accent text-brand-accent mr-1" />
                     {product.rating}
                   </div>
                </div>
                <div className="flex items-center gap-2 mb-4 text-xs">
                   <span className={`px-2 py-0.5 rounded border ${
                     product.type === 'Sativa' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' :
                     product.type === 'Indica' ? 'border-purple-200 text-purple-700 bg-purple-50' :
                     'border-green-200 text-green-700 bg-green-50'
                   }`}>{product.type}</span>
                   <span className="text-stone-500">{product.thc}% THC</span>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-stone-100">
                   <div className="flex flex-col">
                      {product.salePrice ? (
                        <>
                          <span className="text-lg font-bold text-red-600">${product.salePrice}</span>
                          <span className="text-xs text-stone-400 line-through">${product.price}</span>
                        </>
                      ) : (
                        <span className="text-lg font-bold">${product.price}</span>
                      )}
                   </div>
                   <button 
                     onClick={() => addToCart(product)}
                     className="bg-brand-dark text-white p-2.5 rounded-lg hover:bg-brand-green transition-colors"
                   >
                     <ShoppingCart size={18} />
                   </button>
                </div>
              </div>
            ))}
          </div>
          {filteredProducts.length === 0 && (
             <div className="text-center py-20 bg-stone-50 rounded-2xl">
                <p className="text-stone-500 text-lg">No products found matching your filters.</p>
                <button onClick={() => { setSelectedCategory('All'); setSelectedType('All'); }} className="mt-4 text-brand-green underline">Clear Filters</button>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;