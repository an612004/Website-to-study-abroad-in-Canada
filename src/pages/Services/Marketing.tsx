import React, { useEffect, useRef } from 'react';

import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';

// Import components
import { Meta } from '../../layout/Meta';
import { Main } from '../../templates/Main';
import { IAppConfig, getDataConfig } from '../../utils/Content';

interface IMarketingProps {
  config: IAppConfig;
}

const Marketing: React.FC<IMarketingProps> = (props) => {
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
          title="TN7 Solutions - Complete Marketing Partner for Canadian SMEs"
          description="Empowering Your Brand with Full-Spectrum, Transparent Marketing Solutions. Data-Driven, AI-Powered Results with Cultural Expertise."
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
            opacity: 1;
          }
          50% {
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
          background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-text-blue {
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

        .bg-pattern {
          background-image: radial-gradient(
            circle at 2px 2px,
            rgba(255, 255, 255, 0.15) 1px,
            transparent 0
          );
          background-size: 40px 40px;
        }

        .success-highlight {
          background: linear-gradient(
            90deg,
            rgba(34, 197, 94, 0.1) 0%,
            rgba(34, 197, 94, 0.2) 100%
          );
          border-left: 4px solid #22c55e;
        }

        .image-hover {
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .image-hover:hover {
          transform: scale(1.05);
        }

        .parallax-bg {
          background-attachment: fixed;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        }
      `}</style>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0 bg-pattern opacity-20"></div>

        {/* Hero Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=2426&q=80"
            alt="Digital Marketing Analytics Dashboard"
            fill
            className="object-cover opacity-20 mix-blend-overlay"
            priority
          />
        </div>

        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"></div>
          <div
            className="absolute top-40 right-10 w-72 h-72 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"
            style={{ animationDelay: '1s' }}
          ></div>
          <div
            className="absolute -bottom-8 left-20 w-72 h-72 bg-gradient-to-r from-pink-500 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-float"
            style={{ animationDelay: '2s' }}
          ></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto py-32 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-left animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-8 text-glow">
                <span className="gradient-text-blue">TN7 Solutions</span>
              </h1>
              <div
                className="text-xl md:text-2xl mb-6 font-medium opacity-90 animate-slide-up"
                style={{ animationDelay: '0.3s' }}
              >
                Your Complete, Transparent &amp; Data-Driven Marketing Partner
              </div>
              <p
                className="text-lg md:text-xl mb-10 opacity-90 animate-slide-up leading-relaxed"
                style={{ animationDelay: '0.6s' }}
              >
                Empowering Your Brand with Full-Spectrum, Transparent Marketing
                Solutions.
                <strong> 7+ years of proven success</strong> serving clients
                across Canada, US, and Vietnam with cutting-edge AI, deep market
                insights, and cultural expertise.
              </p>
              <div
                className="animate-scale-in"
                style={{ animationDelay: '0.9s' }}
              >
                <Link
                  href={`${props.config.seo.url}/#booking`}
                  className="group relative inline-flex items-center px-12 py-4 overflow-hidden text-lg font-bold text-purple-600 bg-white rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  <span className="absolute left-0 block w-full h-0 transition-all bg-purple-100 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                  <span className="relative">Get Your Free Consultation</span>
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

            {/* Hero Image */}
            <div className="animate-fade-in" style={{ animationDelay: '0.5s' }}>
              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Marketing Team Collaboration"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl image-hover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition with Background Image */}
      <section
        className="py-20 relative parallax-bg"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1553484771-371a605b060b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-white/95"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Why Marketing Feels{' '}
              <span className="gradient-text">Overwhelming</span>?
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed text-left">
                <p>
                  In today&apos;s fast-paced digital world, marketing is complex
                  and constantly evolving. We understand the challenges
                  businesses face trying to stay ahead — whether it&apos;s
                  <strong> navigating ever-changing algorithms</strong>,
                  maximizing tight budgets, or connecting authentically with
                  diverse audiences.
                </p>
                <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                  <p className="text-blue-800 font-semibold">
                    <strong>At TN7 Solutions</strong>, we deliver from A to Z:
                    comprehensive marketing strategies that combine cutting-edge
                    AI, deep market insights, and cultural expertise — all
                    wrapped in full transparency and continuous communication.
                  </p>
                </div>
                <p>
                  With our <strong>certified PMP project managers</strong>,
                  every campaign is carefully planned, executed, and optimized
                  for measurable growth. Partner with TN7 to simplify your
                  marketing journey, gain clear visibility into your
                  investments, and confidently unlock sustainable business
                  growth.
                </p>
              </div>

              <div className="relative">
                <Image
                  src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2339&q=80"
                  alt="Complex Marketing Analytics"
                  width={500}
                  height={350}
                  className="rounded-2xl shadow-xl image-hover"
                />
                <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-lg">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">7+</div>
                    <div className="text-sm text-gray-600">
                      Years Experience
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-gradient-to-br from-white to-gray-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Marketing Solutions with{' '}
              <span className="gradient-text">
                Precision, Passion &amp; Proven Impact
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We don&apos;t just deliver services; we become your dedicated
              partner, transforming marketing from a cost center into your
              strongest business asset.
            </p>
          </div>

          <div className="space-y-16">
            {/* Social Media Management */}
            <div
              className="animate-on-scroll"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="glass-effect rounded-3xl shadow-2xl p-10 card-hover border-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-8">
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-3xl flex items-center justify-center mr-6 icon-bounce">
                        <svg
                          className="w-12 h-12 text-white"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                          Social Media Management
                        </h3>
                        <p className="text-gray-600 font-medium text-lg">
                          Your Brand, Heard, Trusted &amp; Loved in Complex
                          Digital World
                        </p>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="bg-gradient-to-r from-red-50 to-red-100 p-5 rounded-xl border-l-4 border-red-500">
                        <h4 className="font-bold text-red-800 mb-3 text-lg">
                          Common Pain Points:
                        </h4>
                        <ul className="text-red-700 space-y-2">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            Sudden drops in organic reach due to unpredictable
                            algorithm changes?
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            Struggling to produce consistent, engaging content
                            while managing community?
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                            Brand message feels inconsistent, weakening follower
                            loyalty?
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-5 rounded-xl border-l-4 border-blue-500">
                      <h4 className="font-bold text-blue-800 mb-3 text-lg">
                        TN7&apos;s Strategic Response:
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-start">
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
                          <span className="text-blue-700">
                            <strong>AI-powered real-time monitoring</strong>{' '}
                            combined with cultural insights
                          </span>
                        </div>
                        <div className="flex items-start">
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
                          <span className="text-blue-700">
                            <strong>Authentic content pillars</strong> tailored
                            to your audience
                          </span>
                        </div>
                        <div className="flex items-start">
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
                          <span className="text-blue-700">
                            <strong>Empathetic community management</strong>{' '}
                            building loyalty
                          </span>
                        </div>
                        <div className="flex items-start">
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
                          <span className="text-blue-700">
                            <strong>Transparent monthly reports</strong> with
                            clear ROI tracking
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="success-highlight p-5 rounded-xl">
                      <h4 className="font-bold text-green-800 mb-2 flex items-center text-lg">
                        <svg
                          className="w-6 h-6 text-green-600 mr-2"
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
                        Proven Success Story:
                      </h4>
                      <p className="text-green-700 font-semibold">
                        Canadian SME:{' '}
                        <span className="text-2xl font-bold">45%</span> increase
                        in Facebook organic reach and{' '}
                        <span className="text-2xl font-bold">60%</span>{' '}
                        engagement growth in just 4 months
                      </p>
                    </div>
                  </div>

                  {/* Social Media Image */}
                  <div className="relative">
                    <Image
                      src="https://images.unsplash.com/photo-1611262588024-d12430b98920?ixlib=rb-4.0.3&auto=format&fit=crop&w=1974&q=80"
                      alt="Social Media Analytics Dashboard"
                      width={400}
                      height={300}
                      className="rounded-2xl shadow-xl image-hover"
                    />
                    <div className="absolute top-4 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      +45% Reach
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Paid Advertising */}
            <div
              className="animate-on-scroll"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="glass-effect rounded-3xl shadow-2xl p-10 card-hover border-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                  <div className="order-2 lg:order-1 space-y-6">
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-5 rounded-xl border-l-4 border-yellow-500">
                      <h4 className="font-bold text-yellow-800 mb-3 text-lg">
                        TN7&apos;s Data-Driven Solution:
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-start">
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
                          <span className="text-yellow-700">
                            <strong>Deep behavioral analytics &amp; AI</strong>{' '}
                            for precision targeting
                          </span>
                        </div>
                        <div className="flex items-start">
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
                          <span className="text-yellow-700">
                            <strong>
                              Audience segmentation &amp; creative design
                            </strong>{' '}
                            optimization
                          </span>
                        </div>
                        <div className="flex items-start">
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
                          <span className="text-yellow-700">
                            <strong>Smart bidding &amp; A/B testing</strong>{' '}
                            maximizing ROI
                          </span>
                        </div>
                        <div className="flex items-start">
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
                          <span className="text-yellow-700">
                            <strong>Real-time dashboards</strong> showing budget
                            &amp; results
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="success-highlight p-5 rounded-xl">
                      <h4 className="font-bold text-green-800 mb-2 flex items-center text-lg">
                        <svg
                          className="w-6 h-6 text-green-600 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        Success Story:
                      </h4>
                      <p className="text-green-700 font-semibold">
                        US Tech Startup:{' '}
                        <span className="text-2xl font-bold">35%</span>{' '}
                        conversion rate boost,
                        <span className="text-2xl font-bold">20%</span>{' '}
                        cost-per-lead reduction in 3 months
                      </p>
                    </div>
                  </div>

                  <div className="order-3 lg:order-2 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                      alt="Google Ads Dashboard"
                      width={400}
                      height={300}
                      className="rounded-2xl shadow-xl image-hover"
                    />
                    <div className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      +35% Conversion
                    </div>
                  </div>

                  <div className="order-1 lg:order-3">
                    <div className="flex items-center mb-8">
                      <div className="w-24 h-24 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-3xl flex items-center justify-center mr-6 icon-bounce">
                        <svg
                          className="w-12 h-12 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                          Paid Advertising
                        </h3>
                        <p className="text-gray-600 font-medium text-lg">
                          Maximize Every Dollar with Data-Backed Precision
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-red-50 to-red-100 p-5 rounded-xl border-l-4 border-red-500">
                      <h4 className="font-bold text-red-800 mb-3 text-lg">
                        Challenges You Face:
                      </h4>
                      <ul className="text-red-700 space-y-2">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          Spending heavily on ads but seeing little return or
                          unclear conversion data?
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          Losing valuable leads to competitors with smarter,
                          personalized targeting?
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          Multi-platform ad management feels complicated and
                          time-consuming?
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Graphic Design & Branding */}
            <div
              className="animate-on-scroll"
              style={{ animationDelay: '0.6s' }}
            >
              <div className="glass-effect rounded-3xl shadow-2xl p-10 card-hover border-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                  <div>
                    <div className="flex items-center mb-8">
                      <div className="w-24 h-24 bg-gradient-to-r from-pink-500 to-rose-600 rounded-3xl flex items-center justify-center mr-6 icon-bounce">
                        <svg
                          className="w-12 h-12 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2a2 2 0 002-2V5a2 2 0 00-2-2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                          Graphic Design &amp; Branding
                        </h3>
                        <p className="text-gray-600 font-medium text-lg">
                          Design That Truly Reflects Your Brand&apos;s Soul
                          &amp; Strategy
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-red-50 to-red-100 p-5 rounded-xl border-l-4 border-red-500">
                      <h4 className="font-bold text-red-800 mb-3 text-lg">
                        Pain Points We Solve:
                      </h4>
                      <ul className="text-red-700 space-y-2">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          Struggling to stand out visually in saturated market?
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          Inconsistent brand visuals weakening customer trust?
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          Lack of design partners fluent in global trends &amp;
                          local cultures?
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-5 rounded-xl border-l-4 border-pink-500">
                      <h4 className="font-bold text-pink-800 mb-3 text-lg">
                        TN7&apos;s Artistic &amp; Strategic Approach:
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-start">
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
                          <span className="text-pink-700">
                            <strong>
                              Consumer psychology &amp; data insights
                            </strong>{' '}
                            driven creativity
                          </span>
                        </div>
                        <div className="flex items-start">
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
                          <span className="text-pink-700">
                            <strong>Cross-cultural design expertise</strong>{' '}
                            (Canada, US, Vietnam)
                          </span>
                        </div>
                        <div className="flex items-start">
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
                          <span className="text-pink-700">
                            <strong>Comprehensive brand identity</strong>{' '}
                            systems
                          </span>
                        </div>
                        <div className="flex items-start">
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
                          <span className="text-pink-700">
                            <strong>
                              Sustainability &amp; social responsibility
                            </strong>{' '}
                            integration
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="success-highlight p-5 rounded-xl">
                      <h4 className="font-bold text-green-800 mb-2 flex items-center text-lg">
                        <svg
                          className="w-6 h-6 text-green-600 mr-2"
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
                        Impact Example:
                      </h4>
                      <p className="text-green-700 font-semibold">
                        Canadian Retailer:{' '}
                        <span className="text-2xl font-bold">25%</span> brand
                        awareness increase after culturally-tailored brand
                        redesign
                      </p>
                    </div>
                  </div>

                  {/* Branding Image */}
                  <div className="relative">
                    <Image
                      src="https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2064&q=80"
                      alt="Brand Identity Design Process"
                      width={400}
                      height={300}
                      className="rounded-2xl shadow-xl image-hover"
                    />
                    <div className="absolute bottom-4 left-4 bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      +25% Brand Awareness
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Website Development */}
            <div
              className="animate-on-scroll"
              style={{ animationDelay: '0.8s' }}
            >
              <div className="glass-effect rounded-3xl shadow-2xl p-10 card-hover border-0">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                  <div className="order-2 lg:order-1 space-y-6">
                    <div className="bg-gradient-to-r from-green-50 to-teal-50 p-5 rounded-xl border-l-4 border-green-500">
                      <h4 className="font-bold text-green-800 mb-3 text-lg">
                        TN7&apos;s Strategic Website Development:
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="flex items-start">
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
                            <strong>Mobile-first, UX/UI-optimized</strong> for
                            Canadian SMEs
                          </span>
                        </div>
                        <div className="flex items-start">
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
                            <strong>Canadian market standards</strong> for SEO
                            &amp; compliance
                          </span>
                        </div>
                        <div className="flex items-start">
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
                            <strong>Conversion-focused architecture</strong>{' '}
                            maximizing engagement
                          </span>
                        </div>
                        <div className="flex items-start">
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
                            <strong>Ongoing analytics monitoring</strong> &amp;
                            technical support
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="success-highlight p-5 rounded-xl">
                      <h4 className="font-bold text-green-800 mb-2 flex items-center text-lg">
                        <svg
                          className="w-6 h-6 text-green-600 mr-2"
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
                        Client Success:
                      </h4>
                      <p className="text-green-700 font-semibold">
                        Toronto SME:{' '}
                        <span className="text-2xl font-bold">30%</span> online
                        sales increase in 6 months through speed &amp; UX
                        improvements
                      </p>
                    </div>
                  </div>

                  <div className="order-3 lg:order-2 relative">
                    <Image
                      src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2069&q=80"
                      alt="Website Development Process"
                      width={400}
                      height={300}
                      className="rounded-2xl shadow-xl image-hover"
                    />
                    <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      +30% Sales
                    </div>
                  </div>

                  <div className="order-1 lg:order-3">
                    <div className="flex items-center mb-8">
                      <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-teal-600 rounded-3xl flex items-center justify-center mr-6 icon-bounce">
                        <svg
                          className="w-12 h-12 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-2">
                          Website Development
                        </h3>
                        <p className="text-gray-600 font-medium text-lg">
                          Your Digital Home: Fast, Intuitive &amp;
                          Conversion-Optimized
                        </p>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-red-50 to-red-100 p-5 rounded-xl border-l-4 border-red-500">
                      <h4 className="font-bold text-red-800 mb-3 text-lg">
                        Issues You May Have:
                      </h4>
                      <ul className="text-red-700 space-y-2">
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          Slow or outdated websites costing customers and
                          credibility?
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          Digital presence failing to reflect professionalism
                          and brand?
                        </li>
                        <li className="flex items-start">
                          <span className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2 flex-shrink-0"></span>
                          Confused about SEO, UX, and legal compliance
                          requirements?
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stats with Background */}
      <section
        className="py-20 relative parallax-bg"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-gray-900/90"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Results That Speak Volumes
            </h2>
            <p className="text-xl text-gray-300">
              Our track record across Canada, US, and Vietnam
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div
              className="text-center animate-on-scroll"
              style={{ animationDelay: '0.2s' }}
            >
              <div className="text-5xl font-bold text-blue-400 mb-2">45%</div>
              <p className="text-gray-300">Average Organic Reach Increase</p>
            </div>
            <div
              className="text-center animate-on-scroll"
              style={{ animationDelay: '0.4s' }}
            >
              <div className="text-5xl font-bold text-green-400 mb-2">35%</div>
              <p className="text-gray-300">Conversion Rate Improvement</p>
            </div>
            <div
              className="text-center animate-on-scroll"
              style={{ animationDelay: '0.6s' }}
            >
              <div className="text-5xl font-bold text-purple-400 mb-2">25%</div>
              <p className="text-gray-300">Brand Awareness Growth</p>
            </div>
            <div
              className="text-center animate-on-scroll"
              style={{ animationDelay: '0.8s' }}
            >
              <div className="text-5xl font-bold text-orange-400 mb-2">7+</div>
              <p className="text-gray-300">Years of Proven Success</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose TN7 */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose <span className="gradient-text">TN7 Solutions</span>?
            </h2>
            <p className="text-xl text-gray-300">
              Full Transparency | End-to-End Service | Cutting-Edge Technology |
              Cultural Expertise
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div
              className="animate-on-scroll text-center bg-white bg-opacity-10 rounded-2xl p-8 card-hover backdrop-filter backdrop-blur-lg border border-white border-opacity-20"
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
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Full Transparency</h3>
              <p className="text-gray-300">
                Clear, regular reporting and open communication. You always know
                where your investment goes and what results you achieve.
              </p>
            </div>

            <div
              className="animate-on-scroll text-center bg-white bg-opacity-10 rounded-2xl p-8 card-hover backdrop-filter backdrop-blur-lg border border-white border-opacity-20"
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
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">
                Cutting-Edge Technology
              </h3>
              <p className="text-gray-300">
                AI and Big Data drive smarter decisions. Advanced analytics and
                automation deliver superior results efficiently.
              </p>
            </div>

            <div
              className="animate-on-scroll text-center bg-white bg-opacity-10 rounded-2xl p-8 card-hover backdrop-filter backdrop-blur-lg border border-white border-opacity-20"
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
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Cultural Expertise</h3>
              <p className="text-gray-300">
                7+ years serving Canada, US, and Vietnam. Deep understanding of
                diverse markets and localized solutions that work.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className="animate-on-scroll text-center bg-white bg-opacity-10 rounded-2xl p-8 card-hover backdrop-filter backdrop-blur-lg border border-white border-opacity-20"
              style={{ animationDelay: '0.8s' }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6 icon-bounce">
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
              <h3 className="text-xl font-bold mb-4">Certified Management</h3>
              <p className="text-gray-300">
                PMP-certified project managers ensure guaranteed quality and
                accountability in every campaign.
              </p>
            </div>

            <div
              className="animate-on-scroll text-center bg-white bg-opacity-10 rounded-2xl p-8 card-hover backdrop-filter backdrop-blur-lg border border-white border-opacity-20"
              style={{ animationDelay: '1.0s' }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 icon-bounce">
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
              <h3 className="text-xl font-bold mb-4">End-to-End Service</h3>
              <p className="text-gray-300">
                From strategy to design, implementation to monitoring. Complete
                marketing solutions under one roof.
              </p>
            </div>

            <div
              className="animate-on-scroll text-center bg-white bg-opacity-10 rounded-2xl p-8 card-hover backdrop-filter backdrop-blur-lg border border-white border-opacity-20"
              style={{ animationDelay: '1.2s' }}
            >
              <div className="w-20 h-20 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 icon-bounce">
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
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">
                Sustainable &amp; Ethical
              </h3>
              <p className="text-gray-300">
                Marketing that builds positive brand equity. Socially
                responsible campaigns reflecting your values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-teal-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
          <div
            className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-blue-400 to-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"
            style={{ animationDelay: '1s' }}
          ></div>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-on-scroll">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-glow">
              Ready to Simplify and Scale Your Marketing?
            </h2>
            <p className="text-2xl mb-6 font-medium opacity-90">
              Transform Marketing from Cost Center into Your Strongest Asset
            </p>
            <p className="text-lg mb-10 opacity-80 max-w-4xl mx-auto leading-relaxed">
              Contact TN7 Solutions today for a{' '}
              <strong>free consultation</strong>. Let&apos;s craft a
              transparent, measurable, and impactful marketing strategy tailored
              just for you — with guaranteed quality and full accountability.
            </p>

            <div className="animate-scale-in">
              <Link
                href={`${props.config.seo.url}/#booking`}
                className="group relative inline-flex items-center px-12 py-5 overflow-hidden text-xl font-bold text-purple-600 bg-white rounded-full hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
              >
                <span className="absolute left-0 block w-full h-0 transition-all bg-purple-100 opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease"></span>
                <span className="relative">Get Your Free Consultation</span>
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
  IMarketingProps
> = async () => {
  const config = getDataConfig();
  return {
    props: {
      config,
    },
  };
};

export default Marketing;
