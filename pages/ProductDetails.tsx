import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { Star, ShieldCheck, Truck, ArrowLeft } from 'lucide-react';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart } = useApp();
  const product = products.find(p => p.id === id);

  if (!product) {
    return <div className="p-20 text-center">Product not found</div>;
  }

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-stone-500 hover:text-brand-green mb-8">
        <ArrowLeft size={18} /> Back to Shop
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-stone-100 rounded-3xl overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Details */}
        <div>
          <div className="flex items-center gap-4 mb-4">
             <span className="px-3 py-1 bg-stone-100 rounded-full text-sm font-semibold text-stone-600">{product.category}</span>
             <span className={`px-3 py-1 rounded-full text-sm font-semibold border ${
                product.type === 'Sativa' ? 'border-yellow-200 text-yellow-700 bg-yellow-50' :
                product.type === 'Indica' ? 'border-purple-200 text-purple-700 bg-purple-50' :
                'border-green-200 text-green-700 bg-green-50'
             }`}>{product.type}</span>
          </div>

          <h1 className="text-4xl font-bold text-brand-dark mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex text-brand-accent">
               {[...Array(5)].map((_, i) => <Star key={i} size={18} className={i < Math.floor(product.rating) ? 'fill-current' : 'text-stone-300'} />)}
            </div>
            <span className="text-stone-500 text-sm">{product.reviews} reviews</span>
          </div>

          <div className="text-3xl font-bold mb-8">
             {product.salePrice ? (
               <div className="flex items-center gap-3">
                 <span className="text-red-500">${product.salePrice}</span>
                 <span className="text-xl text-stone-400 line-through">${product.price}</span>
               </div>
             ) : (
                <span>${product.price}</span>
             )}
          </div>

          <p className="text-stone-600 text-lg leading-relaxed mb-8">
            {product.description}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-stone-50 p-4 rounded-xl">
               <span className="block text-stone-400 text-xs uppercase tracking-wider mb-1">THC Content</span>
               <span className="text-2xl font-bold text-brand-dark">{product.thc}%</span>
            </div>
            <div className="bg-stone-50 p-4 rounded-xl">
               <span className="block text-stone-400 text-xs uppercase tracking-wider mb-1">CBD Content</span>
               <span className="text-2xl font-bold text-brand-dark">{product.cbd}%</span>
            </div>
          </div>

          {/* Effects Tags */}
          <div className="mb-8">
            <h3 className="font-bold text-sm mb-3 uppercase tracking-wide text-stone-500">Effects</h3>
            <div className="flex flex-wrap gap-2">
              {product.effects.map(effect => (
                <span key={effect} className="px-4 py-2 bg-brand-light text-brand-dark rounded-full text-sm font-medium">
                  {effect}
                </span>
              ))}
            </div>
          </div>

          <button 
            onClick={() => addToCart(product)}
            className="w-full bg-brand-green text-white py-4 rounded-xl font-bold text-lg hover:bg-brand-dark transition-colors shadow-lg shadow-brand-green/20 mb-8"
          >
            Add to Cart
          </button>

          <div className="grid grid-cols-2 gap-6 text-sm text-stone-600">
            <div className="flex items-start gap-3">
              <ShieldCheck className="text-brand-green shrink-0" />
              <div>
                <span className="font-bold block text-stone-900">Lab Tested</span>
                Every batch is tested for purity.
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Truck className="text-brand-green shrink-0" />
              <div>
                <span className="font-bold block text-stone-900">Fast Delivery</span>
                Same-day delivery available.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;