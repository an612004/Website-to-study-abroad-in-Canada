import React, { FormEvent, useEffect, useState } from 'react';

const Booking = () => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);

  useEffect(() => {
    setLoading(false);
  }, [status]);

  const bookingSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const formDict: { [id: string]: any } = {};
      formData.forEach((value, key) => {
        formDict[key] = value;
      });
      const response = await fetch('/api/booking/add', {
        method: 'POST',
        body: JSON.stringify(formDict),
      });
      if (!response.ok) {
        setStatus(-1);
        return;
      }
      setStatus(1);
    } catch (error) {
      setStatus(-1);
    }
  };

  return (
    <div className="w-full">
      {status === 0 ? (
        <form className="w-full" onSubmit={bookingSubmit}>
          <div className="space-y-5">
            {/* Name and Phone Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff5603] focus:border-transparent transition-all duration-300"
                  placeholder="Enter your full name"
                  aria-label="Full name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-white mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff5603] focus:border-transparent transition-all duration-300"
                  placeholder="+1 (555) 123-4567"
                  aria-label="Phone number"
                  required
                />
              </div>
            </div>

            {/* Email - Full Width */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff5603] focus:border-transparent transition-all duration-300"
                placeholder="your.email@example.com"
                aria-label="Email address"
                required
              />
            </div>

            {/* Service Selection - Full Width */}
            {/* <div>
              <label className="block text-sm font-medium text-white mb-2">
                Service of Interest
              </label>
              <select
                name="service"
                className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#ff5603] focus:border-transparent transition-all duration-300"
              >
                <option value="" className="text-gray-900">
                  Select a service
                </option>
                <option value="hr" className="text-gray-900">
                  HR & Global Career Solutions
                </option>
                <option value="marketing" className="text-gray-900">
                  Strategic Marketing & Business Growth
                </option>
                <option value="education" className="text-gray-900">
                  Education & Language Solutions
                </option>
                <option value="immigration" className="text-gray-900">
                  Immigration & Settlement Services
                </option>
              </select>
            </div> */}

            {/* Message - Full Width */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                className="w-full px-4 py-3 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#ff5603] focus:border-transparent transition-all duration-300 resize-none"
                placeholder="Tell us about your goals and how we can help..."
                aria-label="Message"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-gradient-to-r from-[#ff5603] to-[#d94e38] text-white font-bold text-lg rounded-lg hover:from-[#e04d02] hover:to-[#c4462f] focus:outline-none focus:ring-2 focus:ring-[#ff5603] focus:ring-offset-2 focus:ring-offset-gray-900 transform transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-xl"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </div>
              ) : (
                <span className="flex items-center justify-center">
                  🚀 Send Information
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </span>
              )}
            </button>

            {/* Privacy Notice
            <p className="text-xs text-gray-400 text-center">
              By submitting this form, you agree to our{' '}
              <a
                href="/privacy"
                className="text-[#ff5603] hover:text-[#e04d02] underline"
              >
                Privacy Policy
              </a>
              . We'll contact you within 24 hours.
            </p> */}
          </div>
        </form>
      ) : (
        <div className="w-full mx-auto flex flex-col items-center py-8">
          {status === 1 ? (
            <>
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-green-600"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Thank You!</h3>
              <p className="text-base text-center text-gray-300 leading-relaxed">
                We have received your information successfully.
                <br />
                Our consulting team will contact you within 24 hours.
              </p>
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <svg
                  className="w-10 h-10 text-red-600"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                Oops! Something went wrong
              </h3>
              <p className="text-base text-center text-gray-300 mb-6">
                There was an error processing your request. Please try again.
              </p>
              <button
                onClick={() => setStatus(0)}
                className="px-6 py-3 bg-[#ff5603] text-white font-semibold rounded-lg hover:bg-[#e04d02] transition-colors duration-300"
              >
                Try Again
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Booking;
