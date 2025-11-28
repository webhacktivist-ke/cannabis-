import React, { createContext, useContext, useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Layout } from './components/Layout';
import { CartSidebar } from './components/CartSidebar';
import { BudtenderChat } from './components/BudtenderChat';
import { Product, CartItem, User } from './types';
import { MOCK_PRODUCTS } from './constants';

// -- Pages Imports (Inline for simplicity in this single-file logic structure, usually separate) --
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import AdminDashboard from './pages/AdminDashboard';
import Locations from './pages/Locations';
import About from './pages/About';
import Contact from './pages/Contact';

// -- Context --
interface AppContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  isCartOpen: boolean;
  toggleCart: () => void;
  cartTotal: number;
  user: User | null;
  loginAsAdmin: () => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return removeFromCart(id);
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: qty } : item));
  };

  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const cartTotal = cart.reduce((sum, item) => sum + ((item.salePrice || item.price) * item.quantity), 0);

  const loginAsAdmin = () => {
    setUser({ id: 'admin', name: 'Admin User', email: 'admin@cannabiabuds.com', role: 'admin', points: 0 });
  };

  const logout = () => setUser(null);

  return (
    <AppContext.Provider value={{
      products, setProducts,
      cart, addToCart, removeFromCart, updateQuantity,
      isCartOpen, toggleCart, cartTotal,
      user, loginAsAdmin, logout
    }}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/deals" element={<Shop showDealsOnly={true} />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />} />
            <Route path="/account" element={<AccountRedirect />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Layout>
        <CartSidebar />
        <BudtenderChat />
      </Router>
    </AppContext.Provider>
  );
};

// Simple redirects/placeholders
const AccountRedirect = () => {
  const { user, loginAsAdmin, logout } = useApp();
  if (user) {
    return (
      <div className="container mx-auto py-20 px-4 text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome back, {user.name}</h1>
        <p className="mb-8 text-stone-600">You are logged in as {user.role}.</p>
        <div className="flex justify-center gap-4">
            {user.role === 'admin' && (
                <Link to="/admin" className="px-6 py-3 bg-brand-dark text-white rounded-lg">Go to Dashboard</Link>
            )}
            <button onClick={logout} className="px-6 py-3 border border-stone-300 rounded-lg">Logout</button>
        </div>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-20 px-4 max-w-md">
      <h1 className="text-3xl font-bold mb-8 text-center">Sign In</h1>
      <div className="bg-white p-8 rounded-xl shadow-lg border border-stone-100">
          <p className="mb-4 text-sm text-stone-500 text-center">For demo purposes, click below to access Admin features.</p>
          <button onClick={loginAsAdmin} className="w-full bg-brand-green text-white py-3 rounded-lg font-bold hover:bg-brand-dark transition-colors">
              Simulate Admin Login
          </button>
      </div>
    </div>
  );
};

export default App;