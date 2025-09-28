import React, { useState } from 'react';
import { FiMail, FiSend, FiCheck } from 'react-icons/fi';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log('Subscribed with email:', email);
      setIsSubscribed(true);
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };

  if (isSubscribed) {
    return (
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12 px-4 sm:px-6 lg:px-8 rounded-2xl">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-500/20 mb-6">
            <FiCheck className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            You're all set!
          </h2>
          <p className="mt-3 text-blue-100">
            Thanks for subscribing to TechTrend. You'll receive our latest updates, exclusive deals, and tech news directly to your inbox.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-700 py-12 px-4 sm:px-6 lg:px-8 rounded-2xl">
      <div className="max-w-6xl mx-auto">
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2 lg:pr-12 mb-8 lg:mb-0">
            <div className="flex items-center mb-4">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-500/20 mr-3">
                <FiMail className="h-5 w-5 text-blue-300" />
              </div>
              <h3 className="text-sm font-semibold text-blue-200 uppercase tracking-wider">
                Tech Updates
              </h3>
            </div>
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Stay Ahead with Our Tech Newsletter
            </h2>
            <p className="mt-3 text-blue-100">
              Get the latest tech news, product releases, and exclusive deals delivered straight to your inbox. No spam, just valuable content.
            </p>
          </div>
          
          <div className="lg:w-1/2">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-blue-300" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-blue-400/30 bg-blue-700/30 text-white placeholder-blue-300 rounded-lg focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-700 focus:border-white sm:text-sm"
                  placeholder="Your email address"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-700 focus:ring-white transition-colors ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  'Subscribing...'
                ) : (
                  <>
                    <FiSend className="mr-2 h-4 w-4" />
                    Subscribe Now
                  </>
                )}
              </button>
            </form>
            <p className="mt-3 text-xs text-blue-200 text-center lg:text-left">
              By subscribing, you agree to our{' '}
              <a href="#" className="text-white font-medium hover:underline">
                Privacy Policy
              </a>{' '}
              and consent to receive updates from our company.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
