import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, MapPin, User, Search, Cannabis, Instagram, Facebook, Twitter, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../App';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { cart, toggleCart, isCartOpen, cartTotal, user } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!newsletterEmail) return;
    setNewsletterStatus('submitting');
    
    const formData = new FormData();
    formData.append('email', newsletterEmail);
    formData.append('message', 'Newsletter Subscription Request');

    try {
      const response = await fetch("https://formspree.io/f/xangvqwj", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setNewsletterStatus('success');
        setNewsletterEmail('');
      } else {
        setNewsletterStatus('error');
      }
    } catch (error) {
      setNewsletterStatus('error');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 font-sans text-stone-900">
      {/* Promo Bar */}
      <div className="bg-brand-dark text-white text-xs text-center py-2 px-4 font-medium tracking-wide">
        FREE DELIVERY ON ORDERS OVER $100 • FIRST TIME CUSTOMERS GET 20% OFF
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-stone-100 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8 h-20 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 -ml-2 text-stone-600"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-brand-green text-white p-2 rounded-lg group-hover:bg-brand-dark transition-colors">
              <Cannabis size={24} />
            </div>
            <span className="text-xl font-bold tracking-tight text-brand-dark">CANNABIABUDS</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8 font-medium text-sm text-stone-600">
            <Link to="/" className="hover:text-brand-green transition-colors uppercase tracking-wide">Home</Link>
            <Link to="/shop" className="hover:text-brand-green transition-colors uppercase tracking-wide">Shop</Link>
            <Link to="/deals" className="hover:text-brand-green transition-colors uppercase tracking-wide text-brand-accent">Deals</Link>
            <Link to="/locations" className="hover:text-brand-green transition-colors uppercase tracking-wide">Locations</Link>
            <Link to="/learn" className="hover:text-brand-green transition-colors uppercase tracking-wide">Learn</Link>
            <Link to="/about" className="hover:text-brand-green transition-colors uppercase tracking-wide">About</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Link to="/search" className="p-2 text-stone-600 hover:text-brand-green transition-colors hidden sm:block">
              <Search size={20} />
            </Link>
            <Link to="/account" className="p-2 text-stone-600 hover:text-brand-green transition-colors">
              <User size={20} />
            </Link>
            <button 
              className="p-2 text-stone-600 hover:text-brand-green transition-colors relative"
              onClick={toggleCart}
            >
              <ShoppingBag size={20} />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-brand-green text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {cart.reduce((acc, item) => acc + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm lg:hidden">
          <div className="bg-white w-3/4 h-full shadow-xl flex flex-col">
            <div className="p-4 flex justify-between items-center border-b">
              <span className="font-bold text-lg">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)}><X size={24} /></button>
            </div>
            <nav className="flex flex-col p-4 gap-4 text-lg font-medium">
              <Link to="/" className="py-2 border-b border-stone-100">Home</Link>
              <Link to="/shop" className="py-2 border-b border-stone-100">Shop Menu</Link>
              <Link to="/deals" className="py-2 border-b border-stone-100 text-brand-accent">Deals</Link>
              <Link to="/locations" className="py-2 border-b border-stone-100">Locations</Link>
              <Link to="/learn" className="py-2 border-b border-stone-100">Learn</Link>
              <Link to="/rewards" className="py-2 border-b border-stone-100">Rewards</Link>
              <Link to="/contact" className="py-2">Contact</Link>
            </nav>
            {user?.role === 'admin' && (
               <Link to="/admin" className="p-4 bg-gray-100 mt-auto text-center font-bold">Admin Dashboard</Link>
            )}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-stone-900 text-stone-400 py-12">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4 text-white">
               <Cannabis size={24} className="text-brand-green" />
               <span className="font-bold text-xl">CANNABIABUDS</span>
            </div>
            <p className="text-sm mb-6">
              Premium cannabis products for the modern lifestyle. Quality tested, responsibly sourced, and delivered with care.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
                <h5 className="text-white font-bold text-sm mb-2 uppercase tracking-wide">Stay Updated</h5>
                {newsletterStatus === 'success' ? (
                    <div className="text-brand-green text-sm font-medium bg-brand-green/10 p-2 rounded">
                        Thanks for subscribing!
                    </div>
                ) : (
                    <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                        <input 
                            type="email" 
                            name="email"
                            placeholder="Your email" 
                            className="w-full bg-stone-800 border border-stone-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-brand-green"
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            required
                        />
                        <button 
                            type="submit" 
                            disabled={newsletterStatus === 'submitting'}
                            className="bg-brand-green hover:bg-brand-dark text-white p-2 rounded-lg transition-colors disabled:opacity-50"
                        >
                            <ArrowRight size={18} />
                        </button>
                    </form>
                )}
                {newsletterStatus === 'error' && <p className="text-red-400 text-xs mt-1">Something went wrong. Try again.</p>}
            </div>

            <div className="flex gap-4">
              <Instagram size={20} className="hover:text-white cursor-pointer" />
              <Facebook size={20} className="hover:text-white cursor-pointer" />
              <Twitter size={20} className="hover:text-white cursor-pointer" />
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop?category=Flower" className="hover:text-brand-green">Flower</Link></li>
              <li><Link to="/shop?category=Edibles" className="hover:text-brand-green">Edibles</Link></li>
              <li><Link to="/shop?category=Vapes" className="hover:text-brand-green">Vapes</Link></li>
              <li><Link to="/shop?category=Concentrates" className="hover:text-brand-green">Concentrates</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-brand-green">About Us</Link></li>
              <li><Link to="/locations" className="hover:text-brand-green">Locations</Link></li>
              <li><Link to="/contact" className="hover:text-brand-green">Contact</Link></li>
              <li><Link to="/careers" className="hover:text-brand-green">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/faq" className="hover:text-brand-green">FAQ</Link></li>
              <li><Link to="/privacy" className="hover:text-brand-green">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand-green">Terms of Service</Link></li>
            </ul>
            <div className="mt-6 flex items-center gap-2 text-xs text-stone-500">
              <ShieldCheck size={16} />
              <span>21+ Only. Please consume responsibly.</span>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 lg:px-8 mt-12 pt-8 border-t border-stone-800 text-center text-xs">
          © {new Date().getFullYear()} Cannabiabuds. All rights reserved. C10-0000000-LIC
        </div>
      </footer>
    </div>
  );
};