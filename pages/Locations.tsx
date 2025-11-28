import React from 'react';
import { STORE_LOCATIONS } from '../constants';
import { MapPin, Phone, Clock } from 'lucide-react';

const Locations: React.FC = () => {
  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-center mb-4">Find a Store</h1>
      <p className="text-center text-stone-500 mb-12 max-w-2xl mx-auto">Visit us in person to speak with our expert budtenders and see our premium selection up close.</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          {STORE_LOCATIONS.map(location => (
            <div key={location.id} className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100 hover:border-brand-green transition-colors cursor-pointer group">
              <h3 className="font-bold text-xl mb-3 group-hover:text-brand-green">{location.name}</h3>
              <div className="space-y-3 text-stone-600">
                <div className="flex items-start gap-3">
                  <MapPin size={20} className="shrink-0 mt-1" />
                  <span>{location.address}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={20} className="shrink-0" />
                  <span>{location.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={20} className="shrink-0" />
                  <span>{location.hours}</span>
                </div>
              </div>
              <button className="mt-4 w-full py-2 border border-brand-green text-brand-green rounded-lg font-medium hover:bg-brand-green hover:text-white transition-colors">
                Get Directions
              </button>
            </div>
          ))}
        </div>

        {/* Static Map Image Placeholder */}
        <div className="lg:col-span-2 h-[500px] bg-stone-200 rounded-3xl overflow-hidden relative">
          <img 
            src="https://picsum.photos/id/10/1200/800" 
            alt="Map" 
            className="w-full h-full object-cover grayscale opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="bg-white/80 backdrop-blur p-4 rounded-xl text-stone-600 font-medium">
                Map View Integration (Google Maps API would go here)
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Locations;