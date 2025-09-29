import React, { useEffect, useRef } from 'react';

import { GetServerSideProps } from 'next';
import Link from 'next/link';

// Import components
import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import { IAppConfig, getDataConfig } from '../../utils/Content';

interface IImmigrationProps {
  config: IAppConfig;
}

const Immigration: React.FC<IImmigrationProps> = (props) => {
  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-slide-up');
            entry.target.classList.remove('opacity-0', 'translate-y-8');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => {
      observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  return (
    <Main
      config={props.config}
      meta={
        <Meta
          title="Immigration Services - LMIA, Work Permits & PR Pathways | TN7 Solutions"
          description="Expert Immigration Support for Canadian Employers and Individuals. LMIA Applications, Work Permits, PR Pathways, and Business Immigration Solutions."
          config={props.config}
        />
      }
    >
      <style jsx global>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
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

        .animate-slide-up {
          animation: slideUp 0.6s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
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

        .gradient-text-red {
          background: linear-gradient(135deg, #ef4444 0%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-8px);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        }

        .icon-bounce {
          transition: transform 0.3s ease;
        }

        .icon-bounce:hover {
          transform: scale(1.1) rotate(5deg);
        }

        .text-glow {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5);
        }

        .bg-pattern {
          background-image: radial-gradient(
            circle at 2px 2px,
            rgba(255, 255, 255, 0.15) 1px,
            transparent 0
          );
          background-size: 40px 40px;
        }

        .parallax-bg {
          background-attachment: fixed;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        .parallax-bg::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 1;
        }

        .parallax-bg > * {
          position: relative;
          z-index: 2;
        }

        .problem-highlight {
          background: linear-gradient(
            90deg,
            rgba(239, 68, 68, 0.1) 0%,
            rgba(239, 68, 68, 0.2) 100%
          );
          border-left: 4px solid #ef4444;
        }

        .solution-highlight {
          background: linear-gradient(
            90deg,
            rgba(34, 197, 94, 0.1) 0%,
            rgba(34, 197, 94, 0.2) 100%
          );
          border-left: 4px solid #22c55e;
        }

        .process-step {
          position: relative;
        }

        .process-step::before {
          content: '';
          position: absolute;
          left: 15px;
          top: 60px;
          width: 2px;
          height: calc(100% - 60px);
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
        }

        .process-step:last-child::before {
          display: none;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 text-white pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 bg-pattern opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
          <div
            className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto py-32 px-4 sm:px-6 lg:px-8">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-glow">
              Immigration <span className="gradient-text">Solutions</span>
            </h1>
            <div
              className="text-xl md:text-2xl mb-6 font-medium opacity-90 animate-slide-up"
              style={{ animationDelay: '0.3s' }}
            >
              Employer Support for LMIA &amp; Work Permits | PR Pathways |
              Business Immigration
            </div>
            <p
              className="text-lg md:text-xl mb-10 max-w-4xl mx-auto opacity-90 animate-slide-up leading-relaxed"
              style={{ animationDelay: '0.6s' }}
            >
              Struggling with complex LMIA procedures and rejected applications?
              <strong> Let us solve it for you</strong> — fast, transparent, and
              compliant with the latest 2025 regulations!
            </p>
            <div
              className="animate-scale-in"
              style={{ animationDelay: '0.9s' }}
            >
              <Link
                href={`${props.config.seo.url}/#booking`}
                className="group relative inline-flex items-center px-12 py-4 overflow-hidden text-lg font-bold text-blue-600 bg-white rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-blue-100 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="relative">Get Free Consultation Today</span>
                <svg
                  className="relative ml-3 w-6 h-6 transition-transform group-hover:translate-x-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement with Background */}
      <section
        className="py-20 relative parallax-bg"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80)',
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Are You Facing These{' '}
              <span className="gradient-text-red">Immigration Challenges</span>?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              className="animate-on-scroll problem-highlight rounded-2xl p-8 backdrop-filter backdrop-blur-lg border border-white border-opacity-20"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mb-6 icon-bounce">
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
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.08 14.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Repeated LMIA Rejections
              </h3>
              <p className="text-gray-200">
                Multiple failed LMIA applications causing recruitment delays and
                business disruption. Unclear requirements leading to costly
                mistakes.
              </p>
            </div>

            <div
              className="animate-on-scroll problem-highlight rounded-2xl p-8 backdrop-filter backdrop-blur-lg border border-white border-opacity-20"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mb-6 icon-bounce">
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
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Time-Consuming Procedures
              </h3>
              <p className="text-gray-200">
                Complex paperwork taking months without clear guidance. Missing
                deadlines due to procedural confusion and documentation errors.
              </p>
            </div>

            <div
              className="animate-on-scroll problem-highlight rounded-2xl p-8 backdrop-filter backdrop-blur-lg border border-white border-opacity-20"
              style={{ animationDelay: '0.6s' }}
            >
              <div className="w-16 h-16 bg-red-500 rounded-2xl flex items-center justify-center mb-6 icon-bounce">
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
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Legal Compliance Risks
              </h3>
              <p className="text-gray-200">
                Fear of violating labor laws and immigration regulations.
                Potential investigations affecting business reputation and
                operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-br from-white to-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Comprehensive Immigration Solutions for{' '}
              <span className="gradient-text">Success</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Strategic partner for Vietnamese and international businesses,
              providing complete immigration services updated with the latest
              July 2025 regulations.
            </p>
          </div>

          <div className="space-y-20">
            {/* LMIA Support */}
            <div
              className="animate-on-scroll"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="glass-effect rounded-3xl shadow-2xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-12">
                    <div className="flex items-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mr-6 icon-bounce">
                        <svg
                          className="w-10 h-10 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                          Employer LMIA Support
                        </h3>
                        <p className="text-gray-600 text-lg">
                          Complete LMIA Application Management
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="solution-highlight p-5 rounded-xl">
                        <h4 className="font-bold text-green-800 mb-3 text-lg">
                          What We Provide:
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-green-700">
                              <strong>
                                Detailed step-by-step LMIA preparation
                              </strong>{' '}
                              updated with latest 2025 Canadian labor laws
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-green-700">
                              <strong>Legal recruitment effort guidance</strong>{' '}
                              with proper wage and benefits compliance
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-green-700">
                              <strong>
                                Complete documentation preparation
                              </strong>{' '}
                              including contracts, job descriptions, recruitment
                              evidence
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-green-700">
                              <strong>
                                Progress monitoring and supplementary request
                                handling
                              </strong>{' '}
                              to avoid delays
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-blue-50 p-5 rounded-xl border-l-4 border-blue-500">
                        <p className="text-blue-800 font-semibold">
                          <strong>Benefits:</strong> Save time, minimize
                          rejection risks, increase success rate for legal
                          foreign worker recruitment.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-12 text-white">
                    <h4 className="text-2xl font-bold mb-8">
                      Why Choose Our LMIA Service?
                    </h4>
                    <div className="space-y-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-4">
                          <span className="text-2xl font-bold">95%</span>
                        </div>
                        <div>
                          <div className="font-semibold">Success Rate</div>
                          <div className="text-blue-100">
                            First-time approval rate
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-4">
                          <span className="text-2xl font-bold">30%</span>
                        </div>
                        <div>
                          <div className="font-semibold">Cost Savings</div>
                          <div className="text-blue-100">
                            Reduced unnecessary expenses
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-4">
                          <span className="text-xl font-bold">24/7</span>
                        </div>
                        <div>
                          <div className="font-semibold">Support</div>
                          <div className="text-blue-100">
                            Dedicated consultation
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Work Permit Consulting */}
            <div
              className="animate-on-scroll"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="glass-effect rounded-3xl shadow-2xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-12 text-white order-2 lg:order-1">
                    <h4 className="text-2xl font-bold mb-8">
                      Work Permit Expertise
                    </h4>
                    <div className="space-y-6">
                      <div className="bg-white bg-opacity-20 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          LMIA-Based Permits
                        </div>
                        <div className="text-emerald-100 text-sm">
                          For positions requiring labor market assessment
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          LMIA-Exempt Permits
                        </div>
                        <div className="text-emerald-100 text-sm">
                          For eligible positions under latest regulations
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          Renewal & Extensions
                        </div>
                        <div className="text-emerald-100 text-sm">
                          Seamless continuation of work authorization
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          Special Situations
                        </div>
                        <div className="text-emerald-100 text-sm">
                          Job changes, condition modifications
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-12 order-1 lg:order-2">
                    <div className="flex items-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl flex items-center justify-center mr-6 icon-bounce">
                        <svg
                          className="w-10 h-10 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                          Work Permit Consulting
                        </h3>
                        <p className="text-gray-600 text-lg">
                          Fast, Legal Work Authorization
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="solution-highlight p-5 rounded-xl">
                        <h4 className="font-bold text-green-800 mb-3 text-lg">
                          Our Comprehensive Approach:
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-green-700">
                              <strong>
                                Permit type analysis and selection
                              </strong>{' '}
                              for each specific case
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-green-700">
                              <strong>
                                Personal application preparation and submission
                                support
                              </strong>
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-green-700">
                              <strong>
                                Renewal guidance and special situation handling
                              </strong>
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-green-700">
                              <strong>Risk prevention strategies</strong> to
                              avoid technical rejections
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-teal-50 p-5 rounded-xl border-l-4 border-teal-500">
                        <p className="text-teal-800 font-semibold">
                          <strong>Benefits:</strong> Ensure fast legal work
                          authorization, reduce work disruptions, full
                          immigration law compliance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* PR Pathways */}
            <div
              className="animate-on-scroll"
              style={{ animationDelay: '0.6s' }}
            >
              <div className="glass-effect rounded-3xl shadow-2xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="p-12">
                    <div className="flex items-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mr-6 icon-bounce">
                        <svg
                          className="w-10 h-10 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                          PR Pathways for Employees
                        </h3>
                        <p className="text-gray-600 text-lg">
                          Your Long-Term Settlement Route to Canada
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="solution-highlight p-5 rounded-xl">
                        <h4 className="font-bold text-green-800 mb-3 text-lg">
                          Complete PR Services:
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-green-700">
                              <strong>
                                Individual and business assessment
                              </strong>{' '}
                              for Express Entry, PNP, Family Sponsorship,
                              Entrepreneur programs
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-green-700">
                              <strong>Detailed transparent planning</strong> for
                              step-by-step settlement preparation
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-green-700">
                              <strong>Professional application support</strong>{' '}
                              with progress monitoring
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-green-700">
                              <strong>
                                Flexible response to immigration law changes
                              </strong>{' '}
                              and rejection risk management
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-purple-50 p-5 rounded-xl border-l-4 border-purple-500">
                        <p className="text-purple-800 font-semibold">
                          <strong>Benefits:</strong> Build stable future,
                          long-term peace of mind in Canada for you and your
                          family.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-12 text-white">
                    <h4 className="text-2xl font-bold mb-8">
                      Popular PR Programs
                    </h4>
                    <div className="space-y-4">
                      <div className="bg-white bg-opacity-20 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          Express Entry System
                        </div>
                        <div className="text-purple-100 text-sm">
                          Federal Skilled Worker, Canadian Experience Class,
                          Federal Skilled Trades
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          Provincial Nominee Programs (PNP)
                        </div>
                        <div className="text-purple-100 text-sm">
                          Province-specific immigration streams
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          Family Class Sponsorship
                        </div>
                        <div className="text-purple-100 text-sm">
                          Spouse, common-law partner, dependent children
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          Caregiver Programs
                        </div>
                        <div className="text-purple-100 text-sm">
                          Home Child Care Provider, Home Support Worker
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Immigration */}
            <div
              className="animate-on-scroll"
              style={{ animationDelay: '0.8s' }}
            >
              <div className="glass-effect rounded-3xl shadow-2xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="bg-gradient-to-br from-orange-500 to-red-600 p-12 text-white order-2 lg:order-1">
                    <h4 className="text-2xl font-bold mb-8">
                      Business Immigration Options
                    </h4>
                    <div className="space-y-4">
                      <div className="bg-white bg-opacity-20 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          Start-Up Visa (SUV)
                        </div>
                        <div className="text-orange-100 text-sm">
                          For innovative entrepreneurs with business support
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          LMIA Owner Operator
                        </div>
                        <div className="text-orange-100 text-sm">
                          Own and operate a Canadian business legally
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          C11 Intracompany Transfer
                        </div>
                        <div className="text-orange-100 text-sm">
                          Transfer senior staff from foreign branch quickly
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          Investment Planning
                        </div>
                        <div className="text-orange-100 text-sm">
                          Strategic investment and management guidance
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-12 order-1 lg:order-2">
                    <div className="flex items-center mb-8">
                      <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-600 rounded-3xl flex items-center justify-center mr-6 icon-bounce">
                        <svg
                          className="w-10 h-10 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6M6 12V4a2 2 0 012-2h4a2 2 0 012 2v8"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                          Business Immigration Support
                        </h3>
                        <p className="text-gray-600 text-lg">
                          SUV, C11, LMIA Owner Operator Solutions
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="solution-highlight p-5 rounded-xl">
                        <h4 className="font-bold text-green-800 mb-3 text-lg">
                          Comprehensive Business Solutions:
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-green-700">
                              <strong>Start-Up Visa consulting</strong> with
                              innovative business plans and reputable investor
                              connections
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-green-700">
                              <strong>LMIA Owner Operator support</strong> for
                              legal business ownership and operation
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-green-700">
                              <strong>C11 program consulting</strong> for fast
                              senior staff transfer from foreign branches
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-green-700">
                              <strong>
                                Investment and management planning
                              </strong>{' '}
                              compliant with latest 2025 immigration laws
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className="bg-orange-50 p-5 rounded-xl border-l-4 border-orange-500">
                        <p className="text-orange-800 font-semibold">
                          <strong>Benefits:</strong> Effective Canadian market
                          access, expand settlement and sustainable business
                          opportunities.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps with Background */}
      <section
        className="py-20 relative parallax-bg"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80)',
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Our <span className="gradient-text">Step-by-Step Process</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Detailed service roadmap to help you &quot;diagnose correctly
              &quot; and solve comprehensively
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div
                className="animate-on-scroll process-step"
                style={{ animationDelay: '0.2s' }}
              >
                <div className="glass-effect rounded-2xl p-6 card-hover">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="text-xl font-bold text-black">
                      Business Assessment &amp; File Review
                    </h3>
                  </div>
                  <p className="text-black-200 mb-3">
                    Analyze recruitment needs, industry, geographic region,
                    identify suitable LMIA type
                  </p>
                  <div className="solution-highlight p-3 rounded-lg">
                    <p className="text-green-800 font-semibold">
                      <strong>Clear Benefit:</strong> Reduce errors, choose
                      correct program, optimize approval chances
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="animate-on-scroll process-step"
                style={{ animationDelay: '0.4s' }}
              >
                <div className="glass-effect rounded-2xl p-6 card-hover">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-black font-bold">2</span>
                    </div>
                    <h3 className="text-xl font-bold text-black">
                      Recruitment Effort Guidance
                    </h3>
                  </div>
                  <p className="text-black-200 mb-3">
                    Detailed guidance on Job Bank posting, creating compliant
                    recruitment processes
                  </p>
                  <div className="solution-highlight p-3 rounded-lg">
                    <p className="text-green-800 font-semibold">
                      <strong>Clear Benefit:</strong> Increase file credibility,
                      avoid rejection due to insufficient evidence
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="animate-on-scroll process-step"
                style={{ animationDelay: '0.6s' }}
              >
                <div className="glass-effect rounded-2xl p-6 card-hover">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-black font-bold">3</span>
                    </div>
                    <h3 className="text-xl font-bold text-black">
                      Complete File Preparation
                    </h3>
                  </div>
                  <p className="text-black-200 mb-3">
                    Prepare document checklist, contracts, job descriptions,
                    wage reports
                  </p>
                  <div className="solution-highlight p-3 rounded-lg">
                    <p className="text-green-800 font-semibold">
                      <strong>Clear Benefit:</strong> Minimize file returns,
                      save time &amp; costs
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-8">
              <div
                className="animate-on-scroll process-step"
                style={{ animationDelay: '0.8s' }}
              >
                <div className="glass-effect rounded-2xl p-6 card-hover">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-black font-bold">4</span>
                    </div>
                    <h3 className="text-xl font-bold text-black">
                      Progress Monitoring &amp; ESDC Response
                    </h3>
                  </div>
                  <p className="text-black-200 mb-3">
                    Proactive communication, timely handling of supplementary
                    requests or clarifications
                  </p>
                  <div className="solution-highlight p-3 rounded-lg">
                    <p className="text-green-800 font-semibold">
                      <strong>Clear Benefit:</strong> Avoid extended processing
                      times, increase success rates
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="animate-on-scroll process-step"
                style={{ animationDelay: '1.0s' }}
              >
                <div className="glass-effect rounded-2xl p-6 card-hover">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-black font-bold">5</span>
                    </div>
                    <h3 className="text-xl font-bold text-black">
                      Work Permit Support
                    </h3>
                  </div>
                  <p className="text-black-200 mb-3">
                    Consult on suitable work permits, personal files, monitor
                    permit processing
                  </p>
                  <div className="solution-highlight p-3 rounded-lg">
                    <p className="text-green-800 font-semibold">
                      <strong>Clear Benefit:</strong> Ensure staff get legal
                      permits quickly, reduce work disruptions
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="animate-on-scroll process-step"
                style={{ animationDelay: '1.2s' }}
              >
                <div className="glass-effect rounded-2xl p-6 card-hover">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                      <span className="text-black font-bold">6</span>
                    </div>
                    <h3 className="text-xl font-bold text-black">
                      Long-Term PR Pathways
                    </h3>
                  </div>
                  <p className="text-black-200 mb-3">
                    Assess and build individual and group settlement plans
                    suitable for each case
                  </p>
                  <div className="solution-highlight p-3 rounded-lg">
                    <p className="text-green-800 font-semibold">
                      <strong>Clear Benefit:</strong> Help businesses retain
                      quality staff, stabilize long-term workforce
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-xl text-gray-600">
              Common questions to help you feel confident before getting started
            </p>
          </div>

          <div className="space-y-8">
            <div
              className="animate-on-scroll glass-effect rounded-2xl p-8 card-hover"
              style={{ animationDelay: '0.2s' }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Is LMIA mandatory for my position?
              </h3>
              <p className="text-gray-700">
                We help you analyze each industry and position clearly to
                determine exact LMIA requirements. Many positions have
                exemptions under specific programs and agreements.
              </p>
            </div>

            <div
              className="animate-on-scroll glass-effect rounded-2xl p-8 card-hover"
              style={{ animationDelay: '0.4s' }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                How long does the application review process take?
              </h3>
              <p className="text-gray-700">
                Average 4-12 weeks depending on application type and recruitment
                region. We provide regular updates and realistic timelines based
                on current processing standards.
              </p>
            </div>

            <div
              className="animate-on-scroll glass-effect rounded-2xl p-8 card-hover"
              style={{ animationDelay: '0.6s' }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Are there additional service costs?
              </h3>
              <p className="text-gray-700">
                Completely transparent - costs clearly stated in contract
                upfront. No additional charges without your agreement. We
                provide detailed cost breakdowns during consultation.
              </p>
            </div>

            <div
              className="animate-on-scroll glass-effect rounded-2xl p-8 card-hover"
              style={{ animationDelay: '0.8s' }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Can applications be resubmitted if rejected?
              </h3>
              <p className="text-gray-700">
                Yes, and we analyze rejection reasons, develop correction plans
                to increase success chances. Our experience helps identify and
                address common rejection factors.
              </p>
            </div>

            <div
              className="animate-on-scroll glass-effect rounded-2xl p-8 card-hover"
              style={{ animationDelay: '1.0s' }}
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                What do I need to prepare to start consulting?
              </h3>
              <p className="text-gray-700">
                Business license, job description, expected employment contract,
                personal employee files (if available). We provide a complete
                preparation checklist during initial consultation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div
            className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
            style={{ animationDelay: '1s' }}
          ></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
              Don&apos;t Let Complex Procedures Disrupt Your Business!
            </h2>
            <p className="text-2xl mb-6 font-medium opacity-90">
              Turn Your Immigration Worries into Success Solutions
            </p>
            <p className="text-lg mb-10 opacity-80 max-w-4xl mx-auto leading-relaxed">
              Let us help you transform concerns into successful solutions —
              <strong>fast, accurate, effective, and sustainable</strong>. Get
              expert guidance with transparent costs and guaranteed quality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
              <Link
                href={`${props.config.seo.url}/#booking`}
                className="group relative inline-flex items-center px-12 py-5 overflow-hidden text-xl font-bold text-blue-600 bg-white rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-blue-100 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="relative">Get Expert Consultation</span>
                <svg
                  className="relative ml-3 w-6 h-6 transition-transform group-hover:translate-x-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>

            <div className="mt-8 text-sm opacity-70">
              <p>
                Document updated: July 21, 2025 | 7+ Years of Proven Success
                Across Canada, US, and Vietnam
              </p>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps<
  IImmigrationProps
> = async () => {
  const config = getDataConfig();
  return {
    props: {
      config,
    },
  };
};

export default Immigration;
