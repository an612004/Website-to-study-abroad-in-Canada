import React, { useEffect, useRef } from 'react';

import { GetServerSideProps } from 'next';
import Link from 'next/link';

// Import components
import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import { IAppConfig, getDataConfig } from '../../utils/Content';

interface IEducationProps {
  config: IAppConfig;
}

const Education: React.FC<IEducationProps> = (props) => {
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
          title="Education Services - Global Learning & Skills Development | TN7 Solutions"
          description="Transform your potential through comprehensive education services. Language learning, professional skills development, and global competency building programs."
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

        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
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

        .gradient-text-gold {
          background: linear-gradient(
            135deg,
            #f59e0b 0%,
            #d97706 50%,
            #92400e 100%
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

        .feature-highlight {
          background: linear-gradient(
            90deg,
            rgba(59, 130, 246, 0.1) 0%,
            rgba(139, 92, 246, 0.1) 100%
          );
          border-left: 4px solid #3b82f6;
        }

        .education-card {
          position: relative;
          overflow: hidden;
        }

        .education-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s;
        }

        .education-card:hover::before {
          left: 100%;
        }

        .learning-path {
          position: relative;
        }

        .learning-path::before {
          content: '';
          position: absolute;
          left: 50%;
          top: 0;
          width: 2px;
          height: 100%;
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6, #06b6d4);
          transform: translateX(-50%);
        }

        .path-step {
          position: relative;
          background: white;
          border: 3px solid #3b82f6;
          border-radius: 50%;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          z-index: 2;
        }

        .knowledge-bubble {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(
            45deg,
            rgba(59, 130, 246, 0.1),
            rgba(139, 92, 246, 0.1)
          );
          pointer-events: none;
          animation: float 6s ease-in-out infinite;
        }

        .knowledge-bubble:nth-child(1) {
          top: 10%;
          left: 10%;
          width: 80px;
          height: 80px;
          animation-delay: 0s;
        }
        .knowledge-bubble:nth-child(2) {
          top: 20%;
          right: 15%;
          width: 120px;
          height: 120px;
          animation-delay: 2s;
        }
        .knowledge-bubble:nth-child(3) {
          bottom: 30%;
          left: 20%;
          width: 100px;
          height: 100px;
          animation-delay: 4s;
        }
        .knowledge-bubble:nth-child(4) {
          bottom: 10%;
          right: 10%;
          width: 60px;
          height: 60px;
          animation-delay: 1s;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 text-white pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 bg-pattern opacity-20"></div>

        {/* Knowledge Bubbles */}
        <div className="knowledge-bubble"></div>
        <div className="knowledge-bubble"></div>
        <div className="knowledge-bubble"></div>
        <div className="knowledge-bubble"></div>

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
            <div className="mb-8">
              <span className="inline-flex items-center px-6 py-3 rounded-full text-sm font-medium bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg border border-white border-opacity-30">
                <svg
                  className="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                Education Platform
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 text-glow">
              Unlock Your <span className="gradient-text">Potential</span>
            </h1>

            <div
              className="text-xl md:text-2xl mb-6 font-medium opacity-90 animate-slide-up"
              style={{ animationDelay: '0.3s' }}
            >
              Where Great Aspirations Meet Global Learning
            </div>

            <p
              className="text-lg md:text-xl mb-10 max-w-4xl mx-auto opacity-90 animate-slide-up leading-relaxed"
              style={{ animationDelay: '0.6s' }}
            >
              The <strong>Education Platform</strong> is where TN7 E&S nurtures
              grand aspirations, ignites curiosity, and fuels the spirit of
              continuous learning. Beyond teaching languages or skills, we
              create journeys of <strong>global thinking discovery</strong>,
              building international competitiveness and affirming learning
              values connected to real practice.
            </p>

            <div
              className="animate-scale-in"
              style={{ animationDelay: '0.9s' }}
            >
              <Link
                href="https://tn7edu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center px-12 py-4 overflow-hidden text-lg font-bold text-blue-600 bg-white rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-blue-100 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="relative">Explore TN7EDU Platform</span>
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Statement */}
      <section
        className="py-20 relative parallax-bg"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2028&q=80)',
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Breaking <span className="gradient-text-gold">Boundaries</span>,
              Building Futures
            </h2>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto leading-relaxed">
              This is the gateway that leads you beyond familiar limitations,
              expands your vision, and steps into promising new markets and
              opportunities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="animate-on-scroll education-card rounded-2xl p-8 backdrop-filter backdrop-blur-lg border border-white border-opacity-20"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 icon-bounce">
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
              <h3 className="text-xl font-bold text-white mb-4">
                Ignite Curiosity
              </h3>
              <p className="text-gray-200">
                Spark the flame of endless questioning and discovery. Transform
                passive learning into active exploration of knowledge and
                possibilities.
              </p>
            </div>

            <div
              className="animate-on-scroll education-card rounded-2xl p-8 backdrop-filter backdrop-blur-lg border border-white border-opacity-20"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 icon-bounce">
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
              <h3 className="text-xl font-bold text-white mb-4">
                Global Thinking
              </h3>
              <p className="text-gray-200">
                Develop international perspectives and cross-cultural
                competencies. Build the mindset needed to thrive in our
                interconnected world.
              </p>
            </div>

            <div
              className="animate-on-scroll education-card rounded-2xl p-8 backdrop-filter backdrop-blur-lg border border-white border-opacity-20"
              style={{ animationDelay: '0.6s' }}
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 icon-bounce">
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
              <h3 className="text-xl font-bold text-white mb-4">
                Practical Learning
              </h3>
              <p className="text-gray-200">
                Connect knowledge with real-world applications. Ensure every
                lesson learned translates into tangible skills and
                opportunities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Pathways */}
      <section className="py-24 bg-gradient-to-br from-white to-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Your Learning <span className="gradient-text">Journey</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive educational pathways designed to transform potential
              into achievement
            </p>
          </div>

          <div className="space-y-20">
            {/* Language Mastery */}
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
                            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                          Language Mastery
                        </h3>
                        <p className="text-gray-600 text-lg">
                          Unlock Global Communication
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="feature-highlight p-5 rounded-xl">
                        <h4 className="font-bold text-blue-800 mb-3 text-lg">
                          What We Offer:
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-blue-700">
                              <strong>Multi-language programs</strong> including
                              English, French, German, Japanese, and more
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-blue-700">
                              <strong>Interactive learning methods</strong> with
                              native speaker instructors
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-blue-700">
                              <strong>Cultural immersion experiences</strong>{' '}
                              and real-world application
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-blue-700">
                              <strong>
                                International certification preparation
                              </strong>{' '}
                              (IELTS, TOEFL, DELF, JLPT)
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-12 text-white">
                    <h4 className="text-2xl font-bold mb-8">
                      Language Learning Benefits
                    </h4>
                    <div className="space-y-6">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-4">
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold">
                            Career Advancement
                          </div>
                          <div className="text-blue-100">
                            Open doors to international opportunities
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-4">
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold">
                            Cultural Connection
                          </div>
                          <div className="text-blue-100">
                            Build meaningful global relationships
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center mr-4">
                          <svg
                            className="w-6 h-6"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <div>
                          <div className="font-semibold">
                            Cognitive Enhancement
                          </div>
                          <div className="text-blue-100">
                            Boost brain function and creativity
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Professional Skills */}
            <div
              className="animate-on-scroll"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="glass-effect rounded-3xl shadow-2xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-12 text-white order-2 lg:order-1">
                    <h4 className="text-2xl font-bold mb-8">
                      Skill Development Areas
                    </h4>
                    <div className="space-y-4">
                      <div className="bg-white bg-opacity-20 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          Digital Literacy
                        </div>
                        <div className="text-emerald-100 text-sm">
                          Master modern technology and digital tools
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          Leadership & Management
                        </div>
                        <div className="text-emerald-100 text-sm">
                          Develop executive and team leadership skills
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          Critical Thinking
                        </div>
                        <div className="text-emerald-100 text-sm">
                          Enhance analytical and problem-solving abilities
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          Communication Excellence
                        </div>
                        <div className="text-emerald-100 text-sm">
                          Master presentation and interpersonal skills
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
                            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                          Professional Skills
                        </h3>
                        <p className="text-gray-600 text-lg">
                          Future-Ready Competencies
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="feature-highlight p-5 rounded-xl">
                        <h4 className="font-bold text-emerald-800 mb-3 text-lg">
                          Core Focus Areas:
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-emerald-700">
                              <strong>
                                Industry-specific training programs
                              </strong>{' '}
                              tailored to market demands
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-emerald-700">
                              <strong>Hands-on project-based learning</strong>{' '}
                              with real business scenarios
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-emerald-700">
                              <strong>
                                Professional certification pathways
                              </strong>{' '}
                              recognized globally
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-emerald-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-emerald-700">
                              <strong>Mentorship and career guidance</strong>{' '}
                              from industry experts
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Global Competitiveness */}
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
                          Global Competitiveness
                        </h3>
                        <p className="text-gray-600 text-lg">
                          International Readiness Programs
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="feature-highlight p-5 rounded-xl">
                        <h4 className="font-bold text-purple-800 mb-3 text-lg">
                          Competitive Advantages:
                        </h4>
                        <ul className="space-y-3">
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-purple-700">
                              <strong>
                                Cross-cultural intelligence development
                              </strong>{' '}
                              for global markets
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-purple-700">
                              <strong>
                                International networking opportunities
                              </strong>{' '}
                              and partnerships
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-purple-700">
                              <strong>
                                Study abroad and exchange programs
                              </strong>{' '}
                              with partner institutions
                            </span>
                          </li>
                          <li className="flex items-start">
                            <svg
                              className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span className="text-purple-700">
                              <strong>
                                Global career placement assistance
                              </strong>{' '}
                              and job market preparation
                            </span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-12 text-white">
                    <h4 className="text-2xl font-bold mb-8">
                      Global Opportunities
                    </h4>
                    <div className="space-y-4">
                      <div className="bg-white bg-opacity-20 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          International Internships
                        </div>
                        <div className="text-purple-100 text-sm">
                          Gain valuable experience in global companies
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          Cultural Exchange
                        </div>
                        <div className="text-purple-100 text-sm">
                          Immersive experiences in different countries
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          Professional Networks
                        </div>
                        <div className="text-purple-100 text-sm">
                          Connect with international professionals
                        </div>
                      </div>
                      <div className="bg-white bg-opacity-20 rounded-xl p-4">
                        <div className="font-semibold mb-2">
                          Career Pathways
                        </div>
                        <div className="text-purple-100 text-sm">
                          Access to worldwide job opportunities
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Process */}
      <section
        className="py-20 relative parallax-bg"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80)',
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Your Learning <span className="gradient-text">Process</span>
            </h2>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Structured pathway from curiosity to competency
            </p>
          </div>

          <div className="learning-path max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div
                className="animate-on-scroll text-center"
                style={{ animationDelay: '0.2s' }}
              >
                <div className="path-step mb-4">
                  <span className="text-2xl font-bold text-blue-600">1</span>
                </div>
                <div className="glass-effect rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-black mb-3">
                    Discover
                  </h3>
                  <p className="text-black-200 text-sm">
                    Explore your interests and identify learning goals through
                    comprehensive assessment.
                  </p>
                </div>
              </div>

              <div
                className="animate-on-scroll text-center"
                style={{ animationDelay: '0.4s' }}
              >
                <div className="path-step mb-4">
                  <span className="text-2xl font-bold text-blue-600">2</span>
                </div>
                <div className="glass-effect rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-black mb-3">Learn</h3>
                  <p className="text-black-200 text-sm">
                    Engage with interactive content, expert instructors, and
                    hands-on projects.
                  </p>
                </div>
              </div>

              <div
                className="animate-on-scroll text-center"
                style={{ animationDelay: '0.6s' }}
              >
                <div className="path-step mb-4">
                  <span className="text-2xl font-bold text-blue-600">3</span>
                </div>
                <div className="glass-effect rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-black mb-3">
                    Practice
                  </h3>
                  <p className="text-black-200 text-sm">
                    Apply knowledge through real-world scenarios and
                    collaborative projects.
                  </p>
                </div>
              </div>

              <div
                className="animate-on-scroll text-center"
                style={{ animationDelay: '0.8s' }}
              >
                <div className="path-step mb-4">
                  <span className="text-2xl font-bold text-blue-600">4</span>
                </div>
                <div className="glass-effect rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-black mb-3">Succeed</h3>
                  <p className="text-black-200 text-sm">
                    Achieve certification, secure opportunities, and continue
                    lifelong learning.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-xl text-blue-600">
              Real transformations from our learning community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              className="animate-on-scroll glass-effect rounded-2xl p-8 card-hover"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold text-white">A</span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Anna Chen
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Marketing Manager → Global Brand Director
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-center">
                &quot;The language and cultural competency programs opened doors
                I never imagined. Now I lead international campaigns for a
                Fortune 500 company.&quot;
              </p>
            </div>

            <div
              className="animate-on-scroll glass-effect rounded-2xl p-8 card-hover"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold text-white">M</span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Marcus Johnson
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Engineer → Tech Startup Founder
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-center">
                &quot;The entrepreneurship and leadership skills I developed
                here were crucial in launching my tech startup. We&apos;re now
                operating in 12 countries.&quot;
              </p>
            </div>

            <div
              className="animate-on-scroll glass-effect rounded-2xl p-8 card-hover"
              style={{ animationDelay: '0.6s' }}
            >
              <div className="mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <span className="text-2xl font-bold text-white">S</span>
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    Sarah Kim
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Student → International Diplomat
                  </p>
                </div>
              </div>
              <p className="text-gray-700 text-center">
                &quot;The global thinking approach and multilingual skills
                prepared me for diplomatic service. I now represent my country
                in international negotiations.&quot;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section
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
              Ready to{' '}
              <span className="gradient-text-gold">Transform Your Future</span>?
            </h2>
            <p className="text-2xl mb-6 font-medium opacity-90">
              Join TN7 E&S and Open the Door to Knowledge
            </p>
            <p className="text-lg mb-10 opacity-80 max-w-4xl mx-auto leading-relaxed">
              Step beyond familiar boundaries, expand your horizons, and enter
              promising new markets and opportunities. Your journey to{' '}
              <strong>global success</strong> starts here.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
              <Link
                href="https://tn7edu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center px-12 py-5 overflow-hidden text-xl font-bold text-blue-600 bg-white rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-blue-100 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="relative">Explore TN7EDU Platform</span>
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
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>

              <Link
                href="/contact"
                className="group relative inline-flex items-center px-12 py-5 overflow-hidden text-xl font-bold text-white border-2 border-white rounded-full hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105"
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-white opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="relative">Get Consultation</span>
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
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </Link>
            </div>

            <div className="mt-12 animate-pulse">
              <p className="text-sm opacity-70">
                🎓 Join thousands of learners who have transformed their careers
                through education
              </p>
            </div>
          </div>
        </div>
      </section> */}
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps<
  IEducationProps
> = async () => {
  const config = getDataConfig();
  return {
    props: {
      config,
    },
  };
};

export default Education;
