import React from 'react';

const About: React.FC = () => {
  return (
    <div className="pb-20">
      <div className="bg-brand-dark text-white py-20">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Our Roots</h1>
          <p className="text-xl text-stone-300 max-w-2xl mx-auto">Founded in 2023, Cannabiabuds was born from a passion for plant medicine and a desire to elevate the standard of cannabis retail.</p>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 -mt-12">
        <img 
            src="https://picsum.photos/id/201/1200/600" 
            alt="Team" 
            className="w-full h-96 object-cover rounded-3xl shadow-2xl mb-16"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-20">
            <div>
                <h2 className="text-3xl font-bold text-brand-dark mb-4">Our Mission</h2>
                <p className="text-stone-600 leading-relaxed text-lg">
                    We believe in the power of cannabis to improve lives. Whether you are seeking relief from pain, better sleep, or simply a way to unwind and connect with friends, we are here to guide you. Our mission is to provide safe, high-quality products in a welcoming and educational environment.
                </p>
            </div>
            <div>
                <h2 className="text-3xl font-bold text-brand-dark mb-4">Community First</h2>
                <p className="text-stone-600 leading-relaxed text-lg">
                    Cannabiabuds isn't just a store; it's a part of the community. We actively support local artists, reform advocacy groups, and sustainability initiatives. We are committed to social equity in the cannabis industry and working to right the wrongs of the past.
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default About;