import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/xangvqwj", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setSubmitted(true);
      } else {
        alert("Oops! There was a problem submitting your form");
      }
    } catch (error) {
      alert("Oops! There was a problem submitting your form");
    }
  };

  return (
    <div className="container mx-auto px-4 lg:px-8 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg border border-stone-100 overflow-hidden flex flex-col md:flex-row">
        <div className="bg-brand-dark text-white p-12 md:w-1/3">
           <h2 className="text-2xl font-bold mb-6">Get in Touch</h2>
           <p className="text-stone-300 mb-8">Have a question about a product or your order? We're here to help.</p>
           
           <div className="space-y-4 text-sm">
             <div>
               <span className="block font-bold text-brand-accent">Email</span>
               support@cannabiabuds.com
             </div>
             <div>
               <span className="block font-bold text-brand-accent">Phone</span>
               (800) 555-WEED
             </div>
             <div>
               <span className="block font-bold text-brand-accent">Press</span>
               media@cannabiabuds.com
             </div>
           </div>
        </div>

        <div className="p-12 md:w-2/3">
          {submitted ? (
            <div className="h-full flex flex-col items-center justify-center text-center">
               <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4 text-2xl">✓</div>
               <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
               <p className="text-stone-500">We'll get back to you within 24 hours.</p>
               <button onClick={() => setSubmitted(false)} className="mt-6 text-brand-green font-bold">Send another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                   <label className="block text-sm font-medium mb-1">First Name</label>
                   <input name="firstName" type="text" className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none" required />
                </div>
                <div>
                   <label className="block text-sm font-medium mb-1">Last Name</label>
                   <input name="lastName" type="text" className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none" required />
                </div>
              </div>
              <div>
                 <label className="block text-sm font-medium mb-1">Email Address</label>
                 <input name="email" type="email" className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none" required />
              </div>
              <div>
                 <label className="block text-sm font-medium mb-1">Message</label>
                 <textarea name="message" className="w-full p-3 bg-stone-50 border border-stone-200 rounded-lg focus:border-brand-green focus:ring-1 focus:ring-brand-green outline-none h-32" required></textarea>
              </div>
              <button type="submit" className="w-full bg-brand-green text-white font-bold py-4 rounded-xl hover:bg-brand-dark transition-colors">
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;