import React, { FormEvent, useEffect, useState } from 'react';

import { GetServerSideProps } from 'next';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { IAppConfig, getDataConfig } from '../utils/Content';

interface IPartnershipProps {
  config: IAppConfig;
}

interface ISubmitStatus {
  code: number;
  content?: { [key: string]: string };
}

function isValidEmail(email: string): boolean {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

const Partnership = (props: IPartnershipProps) => {
  const [loading, setLoading] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<ISubmitStatus>({ code: 0 });

  useEffect(() => {
    setLoading(false);
  }, [submitStatus]);

  const partnershipSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData(event.currentTarget);
      const formDict: { [id: string]: string } = {};
      formData.forEach((value, key) => {
        formDict[key] = value as string;
      });

      const checkDict: { [id: string]: any } = {};
      if (!formDict.company || formDict.company.length < 3) {
        checkDict.company = 'Company name is invalid (>=3 characters)';
      }
      if (!formDict.subject || formDict.subject.length < 5) {
        checkDict.subject = 'Partnership topic is invalid (>=5 characters)';
      }
      if (!formDict.email || !isValidEmail(formDict.email)) {
        checkDict.email = 'Email address format is incorrect';
      }
      if (!formDict.contact || formDict.contact.length < 2) {
        checkDict.contact = 'Contact person name is required';
      }
      if (!formDict.phone || formDict.phone.length < 10) {
        checkDict.phone = 'Valid phone number is required';
      }

      if (Object.keys(checkDict).length > 0) {
        setSubmitStatus({ code: 0, content: checkDict });
        return;
      }

      const response = await fetch('/api/partnership-register', {
        method: 'POST',
        body: JSON.stringify(formDict),
      });

      if (!response.ok) {
        const data = await response.json();
        setSubmitStatus({ code: 0, content: data });
      } else {
        setSubmitStatus({ code: 1 });
      }
    } catch (error) {
      setSubmitStatus({ code: -1 });
    }
  };

  return (
    <Main
      config={props.config}
      meta={
        <Meta
          title="TN7 Solutions"
          description="Partner with TN7 Solutions to expand your business reach and create sustainable value through strategic collaboration and mutual growth."
          config={props.config}
        />
      }
    >
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes pulse {
          0% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
          100% {
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-slide-in-left {
          animation: slideInLeft 1s ease-out forwards;
        }

        .animate-slide-in-right {
          animation: slideInRight 1s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
        }

        .gradient-text {
          background: linear-gradient(
            135deg,
            #3b82f6 0%,
            #8b5cf6 50%,
            #06b6d4 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .form-input {
          transition: all 0.3s ease;
          border-radius: 8px;
        }

        .form-input:focus {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
        }

        .btn-primary {
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          transition: all 0.3s ease;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -5px rgba(59, 130, 246, 0.3);
        }

        .partnership-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .partnership-card:hover {
          transform: translateY(-8px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .map-container {
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .contact-info {
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          border-left: 4px solid #3b82f6;
          transition: all 0.3s ease;
        }

        .contact-info:hover {
          transform: translateX(5px);
        }

        .success-animation {
          animation: fadeInUp 0.8s ease-out, float 2s ease-in-out 0.8s infinite;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 text-white pt-24 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
          <div
            className="absolute bottom-10 right-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"
            style={{ animationDelay: '1s' }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in-up">
            <div className="mb-6">
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-white border-opacity-30 animate-pulse">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
                Strategic Partnerships
              </span>
            </div>

            <div className="flex justify-center mb-8">
              {/* <img
                src="https://source.unsplash.com/random/400x300/?partnership,collaboration"
                alt="Partnership Illustration"
                className="rounded-xl shadow-2xl w-64 md:w-96 animate-float"
              /> */}
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-8">
              Partner with <span className="gradient-text">TN7 Solutions</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto opacity-90 leading-relaxed">
              We warmly welcome collaboration opportunities from partners to
              grow together, unlock potential, and create sustainable value for
              long-term success.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div
                className="glass-effect rounded-2xl p-6 partnership-card"
                style={{ animationDelay: '0.2s' }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Global Network
                </h3>
                <p className="text-gray-600 text-sm">
                  Expand your reach through our international partnerships
                </p>
              </div>

              <div
                className="glass-effect rounded-2xl p-6 partnership-card"
                style={{ animationDelay: '0.4s' }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Mutual Growth
                </h3>
                <p className="text-gray-600 text-sm">
                  Achieve sustainable development through collaborative success
                </p>
              </div>

              <div
                className="glass-effect rounded-2xl p-6 partnership-card"
                style={{ animationDelay: '0.6s' }}
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Innovation
                </h3>
                <p className="text-gray-600 text-sm">
                  Create cutting-edge solutions together
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Partnership Form */}
            <div className="animate-slide-in-left sticky top-24">
              <div className="glass-effect rounded-3xl shadow-2xl p-8 lg:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    Start Your{' '}
                    <span className="gradient-text">Partnership Journey</span>
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    Please fill out the information below so we can contact your
                    company as soon as possible and explore collaboration
                    opportunities together.
                  </p>
                </div>

                {submitStatus.code === 0 ? (
                  <form onSubmit={partnershipSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="company"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Company Name *
                          {submitStatus.content?.company && (
                            <span className="float-right text-sm text-red-500">
                              {submitStatus.content.company}
                            </span>
                          )}
                        </label>
                        <input
                          type="text"
                          name="company"
                          id="company"
                          placeholder="Your Company Name"
                          className="form-input w-full border-2 border-gray-200 bg-white py-3 px-4 text-gray-700 outline-none focus:border-blue-500 focus:shadow-lg"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="contact"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Contact Person *
                          {submitStatus.content?.contact && (
                            <span className="float-right text-sm text-red-500">
                              {submitStatus.content.contact}
                            </span>
                          )}
                        </label>
                        <input
                          type="text"
                          name="contact"
                          id="contact"
                          placeholder="Full Name"
                          className="form-input w-full border-2 border-gray-200 bg-white py-3 px-4 text-gray-700 outline-none focus:border-blue-500 focus:shadow-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Email Address *
                          {submitStatus.content?.email && (
                            <span className="float-right text-sm text-red-500">
                              {submitStatus.content.email}
                            </span>
                          )}
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          placeholder="example@domain.com"
                          className="form-input w-full border-2 border-gray-200 bg-white py-3 px-4 text-gray-700 outline-none focus:border-blue-500 focus:shadow-lg"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-semibold text-gray-700 mb-2"
                        >
                          Phone Number *
                          {submitStatus.content?.phone && (
                            <span className="float-right text-sm text-red-500">
                              {submitStatus.content.phone}
                            </span>
                          )}
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          id="phone"
                          placeholder="+1 (555) 000-0000"
                          className="form-input w-full border-2 border-gray-200 bg-white py-3 px-4 text-gray-700 outline-none focus:border-blue-500 focus:shadow-lg"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Partnership Topic *
                        {submitStatus.content?.subject && (
                          <span className="float-right text-sm text-red-500">
                            {submitStatus.content.subject}
                          </span>
                        )}
                      </label>
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        placeholder="e.g., Technology Partnership, Distribution Agreement, Joint Venture"
                        className="form-input w-full border-2 border-gray-200 bg-white py-3 px-4 text-gray-700 outline-none focus:border-blue-500 focus:shadow-lg"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                      >
                        Partnership Details
                      </label>
                      <textarea
                        rows={4}
                        name="message"
                        id="message"
                        placeholder="Please describe your partnership proposal, goals, and how we can work together..."
                        className="form-input w-full resize-none border-2 border-gray-200 bg-white py-3 px-4 text-gray-700 outline-none focus:border-blue-500 focus:shadow-lg"
                      ></textarea>
                    </div>

                    <div className="flex justify-center">
                      <button
                        type="submit"
                        className="btn-primary px-12 py-4 text-lg font-semibold text-white rounded-full outline-none flex gap-3 items-center justify-center min-w-[200px]"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <div className="h-5 w-5 border-t-transparent border-solid animate-spin rounded-full border-white border-2"></div>
                            Sending...
                          </>
                        ) : (
                          <>
                            Book a Call
                            <svg
                              className="w-5 h-5"
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
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col items-center gap-6 py-8">
                    {submitStatus.code === 1 ? (
                      <div className="text-center success-animation">
                        <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                          <svg
                            className="w-10 h-10 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                          Partnership Request Sent Successfully!
                        </h3>
                        <blockquote className="max-w-lg text-gray-700 italic text-center leading-relaxed">
                          &quot;TN7 Solutions sincerely thanks you for your
                          interest, we will contact you soon!&quot;
                        </blockquote>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mb-6 mx-auto">
                          <svg
                            className="w-10 h-10 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4">
                          Processing Error
                        </h3>
                        <p className="text-gray-600 mb-6">
                          There was an error processing your request. Please try
                          again!
                        </p>
                        <button
                          onClick={() => setSubmitStatus({ code: 0 })}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors"
                        >
                          Try Again
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Office Location & Contact Info */}
            <div
              className="animate-slide-in-right"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="space-y-8">
                {/* Contact Information */}
                <div className="glass-effect rounded-3xl shadow-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Get in <span className="gradient-text">Touch</span>
                  </h3>

                  <div className="space-y-6">
                    <div className="contact-info rounded-xl p-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Office Address
                          </div>
                          <div className="text-gray-600">
                            8th Floor, No. 19 Cao Thang, Ban Co Ward, Ho Chi
                            Minh City
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="contact-info rounded-xl p-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Email
                          </div>
                          <div className="text-gray-600">Contact@tn7.vn</div>
                        </div>
                      </div>
                    </div>

                    <div className="contact-info rounded-xl p-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Phone
                          </div>
                          <div className="text-gray-600">0763-771-191</div>
                        </div>
                      </div>
                    </div>

                    <div className="contact-info rounded-xl p-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                          <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">
                            Business Hours
                          </div>
                          <div className="text-gray-600">
                            Mon - Fri: 8:00 AM - 5:00 PM , Saturdays: 8:00 AM -
                            12:00 PM
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Google Map */}
                <div className="glass-effect rounded-3xl shadow-2xl p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">
                    Visit Our <span className="gradient-text">Office</span>
                  </h3>

                  <div className="map-container">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5516554595197!2d106.68036467309652!3d10.768995359334705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f2204d6e68b%3A0xdc7b2a65004b073b!2zMTkgQ2FvIFRo4bqvbmcsIFBoxrDhu51uZyAyLCBRdeG6rW4gMywgSOG7kyBDaMOtIE1pbmgsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1757085686764!5m2!1svi!2s"
                      width="100%"
                      height="300"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="TN7 Solutions Office Location"
                    ></iframe>
                  </div>

                  <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <strong>🏢 Visit us:</strong> Our office is located in the
                      heart of Ho Chi Minh City, easily accessible by various
                      transportation methods. We welcome partners to visit and
                      discuss collaboration opportunities in person.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-blue-700 mb-12 text-center animate-fade-in-up">
            Recruitment – TN7 E&S
          </h2>
          {/* Hero Section */}
          <div
            className="mb-16 flex flex-col md:flex-row items-center justify-center gap-10 animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
              <img
                src="https://i.pinimg.com/736x/2e/1c/09/2e1c0919c3af267a85d90494e0e68c0a.jpg"
                alt="Career Growth Illustration"
                className="rounded-2xl shadow-2xl w-full max-w-md h-auto animate-float"
              />
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                At TN7 E&S, careers are defined by more than titles. They are
                shaped by values, vision, and opportunities for real impact. Our
                ecosystem combines education, human resources, marketing, and
                global mobility to create a platform where individuals grow,
                organizations thrive, and communities connect. By joining TN7
                E&S, you become part of a forward‑thinking network built on
                professionalism, continuous learning, collaboration, and a
                global perspective. This is not only recruitment, it is an
                invitation to build your future with a company that invests in
                your long‑term success.
              </p>
            </div>
          </div>

          {/* Internships */}
          <div className="mb-16 flex flex-col md:flex-row items-center justify-center gap-10 animate-slide-in-left">
            <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center order-2 md:order-1">
              <img
                src="https://i.pinimg.com/736x/7b/1d/50/7b1d50b8aa0be17e754ab41ca90cac27.jpg"
                alt="Internship Illustration"
                className="rounded-2xl shadow-2xl w-full max-w-md h-auto animate-float"
              />
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">
                Internships (Undergraduate and Graduate)
              </h3>
              <p className="font-semibold text-gray-700 mb-2">
                Learn, contribute, and grow with real projects at TN7 E&S.
              </p>
              <p className="text-gray-700 mb-4">
                Internships at TN7 E&S are structured as clear career pathways
                rather than temporary support roles. Applications are carefully
                reviewed and considered through two distinct tracks.
                <br />
                <br />
                Qualified candidates who hold English certificates or relevant
                degrees are connected directly with internship placements at
                companies that match their career ambitions.
                <br />
                <br />
                Aspiring candidates from Year 2 onward who do not yet hold
                certificates or degrees are encouraged to build credentials
                through self‑study or TN7 E&S training programs. Those who
                complete this track are prioritized for referrals to partner
                companies.
              </p>
              <ul className="list-disc ml-6 mb-4 text-gray-700">
                <li>
                  Development of practical skills in education, human resources,
                  marketing, and operations.
                </li>
                <li>Direct placement opportunities with partner companies.</li>
                <li>
                  Priority referrals for candidates completing TN7 E&S training.
                </li>
                <li>
                  Professional references and certificates to strengthen
                  employability.
                </li>
              </ul>
              <div className="text-center md:text-left">
                <a
                  href="https://forms.office.com/pages/responsepage.aspx?id=49VLlcom6kixf9heaFLo2UIRRZSyR75NqgtxZP9bOa9UN1M1VkZGR1M1SkcyRkg1OFhPMTQzSkpNNy4u&route=shorturl"
                  className="btn-primary px-8 py-3 rounded-full font-semibold text-white inline-block mt-2 hover:animate-pulse"
                >
                  Apply for Internships Here
                </a>
              </div>
            </div>
          </div>

          {/* Teachers */}
          <div className="mb-16 flex flex-col md:flex-row items-center justify-center gap-10 animate-slide-in-right">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold text-purple-600 mb-2">
                Teachers (Full time, Part time, Project based)
              </h3>
              <p className="font-semibold text-gray-700 mb-2">
                Build careers with stability, mentoring, and international
                teaching opportunities.
              </p>
              <p className="text-gray-700 mb-4">
                TN7 E&S seeks educators who want to make a lasting contribution.
                Teachers are integrated into a professional ecosystem that spans
                education, human resources, and international collaboration.
                Roles are available on a full‑time, part‑time, project‑based, or
                long‑term collaboration basis. Each model provides transparent
                processes, structured professional development, and access to
                modern teaching tools.
              </p>
              <ul className="list-disc ml-6 mb-4 text-gray-700">
                <li>
                  Access to a professional network of teachers and specialists.
                </li>
                <li>Long‑term career growth through training and mentoring.</li>
                <li>
                  Transparent compensation aligned with international
                  benchmarks.
                </li>
                <li>
                  Opportunities within the TN7 E&S ecosystem across education,
                  human resources, and global mobility.
                </li>
              </ul>
              <div className="text-center md:text-left">
                <a
                  href="https://forms.office.com/pages/responsepage.aspx?id=49VLlcom6kixf9heaFLo2UIRRZSyR75NqgtxZP9bOa9UQ1paWE1KSEhZRERXOURNVDlLNEdDVVdTVi4u&route=shorturl"
                  className="btn-primary px-8 py-3 rounded-full font-semibold text-white inline-block mt-2 hover:animate-pulse"
                >
                  Apply for Teaching Positions Here
                </a>
              </div>
            </div>
            <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
              <img
                src="https://i.pinimg.com/736x/07/16/ed/0716ed2a6b9398744234110404b86214.jpg"
                alt="Teaching Illustration"
                className="rounded-2xl shadow-2xl w-full max-w-md h-auto animate-float"
              />
            </div>
          </div>

          {/* Open Talent Network */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-10 animate-slide-in-left">
            <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center order-2 md:order-1">
              <img
                src="https://i.pinimg.com/736x/35/47/48/354748471cbad482eccf036d1db1a86c.jpg"
                alt="Talent Network Illustration"
                className="rounded-2xl shadow-2xl w-full max-w-md h-auto animate-float"
              />
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <h3 className="text-2xl font-bold text-indigo-600 mb-2">
                Open Talent Network (All Disciplines)
              </h3>
              <p className="font-semibold text-gray-700 mb-2">
                Join our talent registry for diverse roles with training
                support.
              </p>
              <p className="text-gray-700 mb-4">
                The Open Talent Network at TN7 E&S is a strategic registry of
                graduates and professionals across key disciplines including
                information technology, banking and finance, international
                business, hospitality and tourism, operations management, human
                resources, marketing and communications, logistics and supply
                chain, education and training, legal and compliance sectors and
                healthcare administration and more. Candidates submit profiles,
                outline aspirations, and are matched with opportunities within
                TN7 E&S or among partner organizations. Applicants may include
                English or professional certifications, while those still
                preparing can take advantage of TN7 E&S training programs.
                Completion ensures priority consideration for job referrals.
              </p>
              <ul className="list-disc ml-6 mb-4 text-gray-700">
                <li>
                  Entry into a multi‑sector registry recognized by TN7 E&S
                  partners.
                </li>
                <li>Priority referrals across industries and disciplines.</li>
                <li>
                  Access to training programs for building essential skills.
                </li>
                <li>
                  Long‑term career matching aligned with interests and
                  readiness.
                </li>
              </ul>
              <div className="text-center md:text-left">
                <a
                  href="https://forms.office.com/pages/responsepage.aspx?id=49VLlcom6kixf9heaFLo2UIRRZSyR75NqgtxZP9bOa9UMkxDRlFESTVDVDhPN0o2OUxEN0M1QlRKNy4u&route=shorturl"
                  className="btn-primary px-8 py-3 rounded-full font-semibold text-white inline-block mt-2 hover:animate-pulse"
                >
                  Join the Open Talent Network Here
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Benefits Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Partner with{' '}
              <span className="text-yellow-300">TN7 Solutions</span>?
            </h2>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Join our ecosystem of innovation and growth-driven partnerships
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center glass-effect rounded-2xl p-6 partnership-card">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">
                Accelerated Growth
              </h3>
              <p className="text-sm opacity-80 text-black">
                Fast-track your business expansion with our proven strategies
              </p>
            </div>

            <div className="text-center glass-effect rounded-2xl p-6 partnership-card">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-teal-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">
                Global Reach
              </h3>
              <p className="text-sm opacity-80 text-black">
                Access international markets through our extensive network
              </p>
            </div>

            <div className="text-center glass-effect rounded-2xl p-6 partnership-card">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">
                Innovation Hub
              </h3>
              <p className="text-sm opacity-80 text-black">
                Collaborate on cutting-edge solutions and technologies
              </p>
            </div>

            <div className="text-center glass-effect rounded-2xl p-6 partnership-card">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-400 to-blue-500 rounded-2xl flex items-center justify-center mb-4 mx-auto">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-black">
                Revenue Growth
              </h3>
              <p className="text-sm opacity-80 text-black">
                Unlock new revenue streams and business opportunities
              </p>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps<
  IPartnershipProps
> = async () => {
  const config = getDataConfig();
  return {
    props: {
      config,
    },
  };
};

export default Partnership;
