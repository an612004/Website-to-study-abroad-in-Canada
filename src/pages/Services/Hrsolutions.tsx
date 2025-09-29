import React, { useEffect, useRef } from 'react';

import { GetServerSideProps } from 'next';
import Link from 'next/link';

// Import components
import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import { IAppConfig, getDataConfig } from '../../utils/Content';

interface IHRSolutionsProps {
  config: IAppConfig;
}

const HRSolutions: React.FC<IHRSolutionsProps> = (props) => {
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
          title="HR Solutions by TN7 Solutions - Professional HR Services Canada"
          description="Unlocking Human Potential | Navigating Complexity | Delivering Compliance - Empowering Your Workforce Across Canada with Precision & Care"
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

        @keyframes pulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.05);
            opacity: 0.8;
          }
        }

        @keyframes slideInFromLeft {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromRight {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
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

        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }

        .animate-slide-left {
          animation: slideInFromLeft 0.8s ease-out forwards;
        }

        .animate-slide-right {
          animation: slideInFromRight 0.8s ease-out forwards;
        }

        .animate-on-scroll {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }

        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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

        .image-overlay {
          position: relative;
          overflow: hidden;
        }

        .image-overlay::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            45deg,
            rgba(59, 130, 246, 0.1) 0%,
            rgba(139, 92, 246, 0.1) 100%
          );
          z-index: 1;
        }

        .image-hover {
          transition: all 0.5s ease;
        }

        .image-hover:hover {
          transform: scale(1.05);
        }

        .floating-elements {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
        }

        .floating-icon {
          position: absolute;
          opacity: 0.1;
          animation: float 6s ease-in-out infinite;
        }

        .floating-icon:nth-child(1) {
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .floating-icon:nth-child(2) {
          top: 20%;
          right: 15%;
          animation-delay: 2s;
        }

        .floating-icon:nth-child(3) {
          bottom: 30%;
          left: 20%;
          animation-delay: 4s;
        }

        .floating-icon:nth-child(4) {
          bottom: 20%;
          right: 10%;
          animation-delay: 1s;
        }

        .stats-counter {
          font-size: 3rem;
          font-weight: 800;
          color: transparent;
          background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
          -webkit-background-clip: text;
          background-clip: text;
        }

        .testimonial-card {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.9) 0%,
            rgba(248, 250, 252, 0.9) 100%
          );
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
      `}</style>

      {/* Hero Section with Enhanced Visual Elements */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white pt-20 overflow-hidden min-h-screen flex items-center">
        <div className="absolute inset-0 bg-black opacity-20"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
          <div
            className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>

        {/* Floating HR Icons */}
        <div className="floating-elements">
          <div className="floating-icon">
            <svg
              className="w-16 h-16 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="floating-icon">
            <svg
              className="w-12 h-12 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div className="floating-icon">
            <svg
              className="w-14 h-14 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="floating-icon">
            <svg
              className="w-10 h-10 text-white"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left animate-fade-in">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-white border-opacity-30 mb-8">
                <span className="text-sm font-medium">
                  🚀 Professional HR Services
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-glow leading-tight">
                HR Solutions by{' '}
                <span className="gradient-text text-yellow-300">TN7</span>
              </h1>

              <div
                className="text-xl md:text-2xl mb-6 font-medium opacity-90 animate-slide-up"
                style={{ animationDelay: '0.3s' }}
              >
                <span className="block">🔓 Unlocking Human Potential</span>
                <span className="block">🧭 Navigating Complexity</span>
                <span className="block">📋 Delivering Compliance</span>
              </div>

              <p
                className="text-lg md:text-xl mb-10 opacity-90 animate-slide-up"
                style={{ animationDelay: '0.6s' }}
              >
                Empowering Your Workforce Across{' '}
                <span className="font-bold text-yellow-300">Canada</span> with
                Precision & Care
              </p>

              <div
                className="animate-scale-in"
                style={{ animationDelay: '0.9s' }}
              >
                <Link
                  href={`${props.config.seo.url}/#booking`}
                  className="group relative inline-flex items-center px-10 py-4 overflow-hidden text-lg font-medium text-blue-600 bg-white rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <span className="absolute left-0 block w-full h-0 transition-all bg-blue-100 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                  <span className="relative">
                    🎯 Get Your Free Consultation
                  </span>
                  <svg
                    className="relative ml-2 w-5 h-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Column - Hero Image */}
            <div className="animate-slide-right">
              <div className="relative image-overlay rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Professional HR Team Meeting"
                  className="w-full h-96 lg:h-[500px] object-cover image-hover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-gray-800 font-semibold text-sm">
                      &quot;🌟 TN7s HR solutions transformed our hiring process
                      and compliance management &quot;
                    </p>
                    <p className="text-gray-600 text-xs mt-1">
                      - Leading Tech Company, Toronto
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div className="animate-on-scroll">
              <div className="stats-counter">500+</div>
              <p className="text-gray-600 font-medium">Companies Served</p>
            </div>
            <div
              className="animate-on-scroll"
              style={{ animationDelay: '0.1s' }}
            >
              <div className="stats-counter">98%</div>
              <p className="text-gray-600 font-medium">Client Satisfaction</p>
            </div>
            <div
              className="animate-on-scroll"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="stats-counter">35%</div>
              <p className="text-gray-600 font-medium">Faster Hiring</p>
            </div>
            <div
              className="animate-on-scroll"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="stats-counter">10+</div>
              <p className="text-gray-600 font-medium">Years Experience</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Enhanced Images */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative">
        <div className="absolute inset-0 bg-grid-gray-100 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Strategic HR Solutions for{' '}
              <span className="gradient-text">Canada</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive services designed for Canadian market realities and
              compliance excellence
            </p>
          </div>

          <div className="space-y-16">
            {/* Recruitment Services */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-left">
                <div className="glass-effect rounded-2xl shadow-xl p-8 card-hover border-0">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8 icon-bounce">
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Recruitment for Canadian Companies
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    <strong className="text-blue-600">
                      Strategic Talent Acquisition
                    </strong>{' '}
                    designed for Canadian market realities
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-gray-800 font-semibold mb-3 flex items-center">
                        <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        We solve challenges like:
                      </h4>
                      <ul className="text-gray-600 space-y-2 ml-4">
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></span>
                          Fierce competition for quality talent
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></span>
                          Complex employment law navigation
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></span>
                          Time-consuming recruitment processes
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-gray-800 font-semibold mb-3 flex items-center">
                        <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                        Our proven approach:
                      </h4>
                      <ul className="text-gray-600 space-y-2 ml-4">
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></span>
                          AI-driven candidate profiling &amp; screening
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></span>
                          Cultural fit analysis for retention
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3"></span>
                          Compliant contracting &amp; onboarding
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl mt-6 border-l-4 border-green-500">
                    <p className="text-green-800 font-semibold">
                      <span className="text-2xl font-bold text-green-600">
                        35%
                      </span>{' '}
                      reduced time-to-hire, higher retention rates
                    </p>
                  </div>
                </div>
              </div>

              <div className="animate-slide-right">
                <div className="relative image-overlay rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Professional recruitment process"
                    className="w-full h-96 object-cover image-hover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* EOR Services */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-left order-2 lg:order-1">
                <div className="relative image-overlay rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Team collaboration and employer services"
                    className="w-full h-96 object-cover image-hover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/30 to-transparent"></div>
                </div>
              </div>

              <div className="animate-slide-right order-1 lg:order-2">
                <div className="glass-effect rounded-2xl shadow-xl p-8 card-hover border-0">
                  <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-8 icon-bounce">
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
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Employer of Record (EOR) Services
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    <strong className="text-green-600">
                      Expand Confidently
                    </strong>{' '}
                    with full legal &amp; administrative compliance
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-gray-800 font-semibold mb-3 flex items-center">
                        <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                        Perfect if you&apos;re:
                      </h4>
                      <ul className="text-gray-600 space-y-2 ml-4">
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                          Entering Canadian market
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                          Hiring international talent
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3"></span>
                          Focused on scaling vs HR logistics
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-gray-800 font-semibold mb-3 flex items-center">
                        <span className="w-2 h-2 bg-purple-500 rounded-full mr-2"></span>
                        We handle everything:
                      </h4>
                      <ul className="text-gray-600 space-y-2 ml-4">
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></span>
                          Legal contracting &amp; compliance
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></span>
                          Payroll &amp; benefits administration
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></span>
                          Regulatory updates across provinces
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-xl mt-6 border-l-4 border-emerald-500">
                    <p className="text-emerald-800 font-semibold">
                      <strong>Scale flexibly</strong> without overhead while
                      retaining full operational control
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* HR Compliance */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-left">
                <div className="glass-effect rounded-2xl shadow-xl p-8 card-hover border-0">
                  <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl flex items-center justify-center mb-8 icon-bounce">
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
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    HR Compliance (Canadian Labour Law)
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    <strong className="text-red-600">
                      Comprehensive Legal Assurance
                    </strong>{' '}
                    to protect &amp; empower your business
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-gray-800 font-semibold mb-3 flex items-center">
                        <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                        Concerned about:
                      </h4>
                      <ul className="text-gray-600 space-y-2 ml-4">
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3"></span>
                          Keeping up with dynamic labour laws
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3"></span>
                          Avoiding costly compliance penalties
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mr-3"></span>
                          Building compliant HR policies
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-gray-800 font-semibold mb-3 flex items-center">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                        Our compliance framework:
                      </h4>
                      <ul className="text-gray-600 space-y-2 ml-4">
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-3"></span>
                          Comprehensive legal audits
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-3"></span>
                          Custom policy development
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full mr-3"></span>
                          Interactive training workshops
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-red-50 to-pink-50 p-4 rounded-xl mt-6 border-l-4 border-red-500">
                    <p className="text-red-800 font-semibold">
                      <strong>Risk-free operations</strong> with compliance
                      culture that strengthens your employer brand
                    </p>
                  </div>
                </div>
              </div>

              <div className="animate-slide-right">
                <div className="relative image-overlay rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Legal compliance and documentation"
                    className="w-full h-96 object-cover image-hover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-red-900/30 to-transparent"></div>
                </div>
              </div>
            </div>

            {/* Onboarding & Training */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-left order-2 lg:order-1">
                <div className="relative image-overlay rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                    alt="Employee training and development session"
                    className="w-full h-96 object-cover image-hover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 to-transparent"></div>
                </div>
              </div>

              <div className="animate-slide-right order-1 lg:order-2">
                <div className="glass-effect rounded-2xl shadow-xl p-8 card-hover border-0">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-8 icon-bounce">
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
                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Onboarding &amp; Employee Training
                  </h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    <strong className="text-purple-600">
                      Accelerate Workforce Integration
                    </strong>{' '}
                    through cultural fluency &amp; skill development
                  </p>

                  <div className="space-y-6">
                    <div>
                      <h4 className="text-gray-800 font-semibold mb-3 flex items-center">
                        <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
                        Struggling with:
                      </h4>
                      <ul className="text-gray-600 space-y-2 ml-4">
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></span>
                          Slow productivity due to cultural barriers
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></span>
                          Lack of Canadian workplace English training
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mr-3"></span>
                          Inconsistent onboarding experiences
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-gray-800 font-semibold mb-3 flex items-center">
                        <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
                        Our training journey:
                      </h4>
                      <ul className="text-gray-600 space-y-2 ml-4">
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-3"></span>
                          Business English communication coaching
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-3"></span>
                          Critical soft skills development
                        </li>
                        <li className="flex items-center">
                          <span className="w-1.5 h-1.5 bg-teal-400 rounded-full mr-3"></span>
                          Canadian cultural orientation
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 p-4 rounded-xl mt-6 border-l-4 border-purple-500">
                    <p className="text-purple-800 font-semibold">
                      <strong>Faster integration</strong>, enhanced
                      communication, higher satisfaction &amp; performance gains
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our <span className="gradient-text">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="animate-on-scroll testimonial-card rounded-2xl p-8 shadow-xl card-hover">
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=64&h=64&q=80"
                  alt="Client testimonial"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Michael Chen</h4>
                  <p className="text-gray-600 text-sm">CEO, TechStart Inc.</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                &quot;TN7s EOR services allowed us to hire top talent in Canada
                without the legal complexity. Their compliance expertise saved
                us months of setup time.&quot;
              </p>
              <div className="flex text-yellow-400 mt-4">⭐⭐⭐⭐⭐</div>
            </div>

            <div
              className="animate-on-scroll testimonial-card rounded-2xl p-8 shadow-xl card-hover"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1494790108755-2616b612b77c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=64&h=64&q=80"
                  alt="Client testimonial"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">
                    HR Director, Global Corp
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                &quot;The recruitment quality and cultural fit analysis from TN7
                has been exceptional. Our retention rate improved by 40% in the
                first year. &quot;
              </p>
              <div className="flex text-yellow-400 mt-4">⭐⭐⭐⭐⭐</div>
            </div>

            <div
              className="animate-on-scroll testimonial-card rounded-2xl p-8 shadow-xl card-hover"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="flex items-center mb-6">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=64&h=64&q=80"
                  alt="Client testimonial"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">David Rodriguez</h4>
                  <p className="text-gray-600 text-sm">
                    Founder, Maple Innovations
                  </p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                &quot;Their compliance framework gave us complete peace of mind.
                No more worrying about labour law changes - TN7 handles
                everything proactively. &quot;
              </p>
              <div className="flex text-yellow-400 mt-4">⭐⭐⭐⭐⭐</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose TN7 - Enhanced */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Partner with{' '}
              <span className="gradient-text">TN7 Solutions</span>?
            </h2>
            <p className="text-xl text-gray-600">
              Local Expertise | Human-Centered Approach | Compliance Excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div
              className="animate-on-scroll text-center glass-effect rounded-2xl p-8 card-hover"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 icon-bounce">
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
                    d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Deep Local Expertise
              </h3>
              <p className="text-gray-600">
                Nuanced understanding of Canadian labour markets and legal
                frameworks
              </p>
            </div>

            <div
              className="animate-on-scroll text-center glass-effect rounded-2xl p-8 card-hover"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 icon-bounce">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Human-Centered Approach
              </h3>
              <p className="text-gray-600">
                Balancing operational rigor with empathy and cultural insight
              </p>
            </div>

            <div
              className="animate-on-scroll text-center glass-effect rounded-2xl p-8 card-hover"
              style={{ animationDelay: '0.6s' }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 icon-bounce">
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Measurable Results
              </h3>
              <p className="text-gray-600">
                Transparency, innovation, and results bridging people &amp;
                business strategy
              </p>
            </div>
          </div>

          <div className="animate-on-scroll glass-effect rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              Our Clients Experience:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="group">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
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
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="font-bold text-blue-600 text-lg">
                  Reduced Hiring Risks
                </p>
                <p className="text-gray-600">and legal exposure</p>
              </div>
              <div className="group">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
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
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <p className="font-bold text-green-600 text-lg">
                  Accelerated Performance
                </p>
                <p className="text-gray-600">and retention rates</p>
              </div>
              <div className="group">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
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
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <p className="font-bold text-purple-600 text-lg">
                  Future-Ready HR Engine
                </p>
                <p className="text-gray-600">tailored to growth plans</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div
            className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
            style={{ animationDelay: '1s' }}
          ></div>
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
              Ready to Elevate Your HR Strategy?
            </h2>
            <p className="text-2xl mb-6 font-medium opacity-90">
              Get Your Complimentary, No-Obligation Consultation Today
            </p>
            <p className="text-lg mb-10 opacity-80 max-w-3xl mx-auto">
              Let TN7 Solutions craft a customized HR solution that delivers
              compliance certainty, operational efficiency, and empowered
              people.
            </p>

            <div className="animate-scale-in">
              <Link
                href={`${props.config.seo.url}/#booking`}
                className="group relative inline-flex items-center px-12 py-5 overflow-hidden text-xl font-bold text-blue-600 bg-white rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-blue-100 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="relative">
                  🚀 Schedule Your Consultation Now
                </span>
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

            <div className="mt-8 text-sm opacity-60">
              <p>
                ✅ Free consultation • ✅ No obligations • ✅ Expert guidance
              </p>
            </div>
          </div>
        </div>
      </section>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps<
  IHRSolutionsProps
> = async () => {
  const config = getDataConfig();
  return {
    props: {
      config,
    },
  };
};

export default HRSolutions;
