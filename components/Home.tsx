import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { useApp } from '../App';
import { ProductCategory } from '../types';

const Home: React.FC = () => {
  const { products, addToCart } = useApp();
  const featuredProducts = products.filter(p => p.inStock).slice(0, 4);

  const categories = [
    { name: 'Flower', image: 'https://picsum.photos/id/106/400/300' },
    { name: 'Edibles', image: 'https://picsum.photos/id/292/400/300' },
    { name: 'Vapes', image: 'https://picsum.photos/id/301/400/300' },
    { name: 'Extracts', image: 'https://picsum.photos/id/319/400/300' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img 
            src="https://picsum.photos/id/191/1920/1080" 
            alt="Cannabis Farm" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10 text-white">
          <span className="inline-block px-3 py-1 bg-brand-accent text-brand-dark font-bold text-xs rounded-full mb-4 uppercase tracking-wider">
            Now Delivering
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Elevate Your <br/> Experience
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-xl text-stone-200 font-light">
            Premium cannabis curated for wellness, creativity, and relaxation. Sourced from California's finest growers.
          </p>
          <div className="flex gap-4">
            <Link to="/shop" className="px-8 py-4 bg-brand-green hover:bg-brand-dark transition-colors text-white font-bold rounded-xl flex items-center gap-2">
              Shop Now <ArrowRight size={20} />
            </Link>
            <Link to="/locations" className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-bold rounded-xl transition-colors">
              Find a Store
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-stone-50">
        <div className="container mx-auto px-4 lg:px-8">
          <h2 className="text-3xl font-bold mb-12 text-center text-brand-dark">Explore Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link to={`/shop?category=${cat.name}`} key={cat.name} className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                  <span className="text-white font-bold text-xl">{cat.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex justify-between items-end mb-8">
            <div>
              <h2 className="text-3xl font-bold text-brand-dark mb-2">Fresh Drops</h2>
              <p className="text-stone-500">The latest and greatest on our shelves.</p>
            </div>
            <Link to="/shop" className="text-brand-green font-bold hover:underline">View All</Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="relative aspect-square bg-stone-100 rounded-2xl overflow-hidden mb-4">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  {product.salePrice && (
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      SALE
                    </span>
                  )}
                  <button 
                    onClick={() => addToCart(product)}
                    className="absolute bottom-4 right-4 bg-white hover:bg-brand-green hover:text-white text-stone-900 p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg">{product.name}</h3>
                  <div className="flex items-center gap-1 text-sm font-medium text-stone-600">
                    <Star size={14} className="fill-brand-accent text-brand-accent" />
                    {product.rating}
                  </div>
                </div>
                <div className="flex gap-2 text-xs text-stone-500 mb-3">
                  <span className="px-2 py-1 bg-stone-100 rounded">{product.type}</span>
                  <span className="px-2 py-1 bg-stone-100 rounded">{product.thc}% THC</span>
                </div>
                <div className="flex items-center gap-3">
                  {product.salePrice ? (
                    <>
                      <span className="text-xl font-bold text-red-500">${product.salePrice}</span>
                      <span className="text-sm text-stone-400 line-through">${product.price}</span>
                    </>
                  ) : (
                    <span className="text-xl font-bold text-stone-900">${product.price}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features/Trust */}
      <section className="py-20 bg-brand-dark text-white text-center">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-accent text-3xl">🌿</div>
            <h3 className="text-xl font-bold mb-3">Organically Grown</h3>
            <p className="text-stone-300">We partner with farms that use sustainable, earth-friendly practices.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-accent text-3xl">🔬</div>
            <h3 className="text-xl font-bold mb-3">Lab Tested</h3>
            <p className="text-stone-300">Every product is triple-tested for purity, potency, and safety.</p>
          </div>
          <div>
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-accent text-3xl">🚚</div>
            <h3 className="text-xl font-bold mb-3">Fast Delivery</h3>
            <p className="text-stone-300">Get your favorites delivered to your door in under 60 minutes.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;