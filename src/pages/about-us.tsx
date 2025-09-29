import React, { useEffect, useRef, useState } from 'react';

import { GetServerSideProps } from 'next';
import Image from 'next/image';

import { Meta } from '../layout/Meta';
import { Main } from '../templates/Main';
import { IAppConfig, getDataConfig } from '../utils/Content';

interface IhomeProps {
  config: IAppConfig;
}

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible] as const;
};

const AboutUs = (props: IhomeProps) => {
  // Animation refs
  const [heroRef, heroVisible] = useScrollAnimation();
  const [ceoRef, ceoVisible] = useScrollAnimation();
  const [companyRef, companyVisible] = useScrollAnimation();
  const [valuesRef, valuesVisible] = useScrollAnimation();
  const [destinationsRef, destinationsVisible] = useScrollAnimation();
  const [storiesRef, storiesVisible] = useScrollAnimation();
  const [partnersRef, partnersVisible] = useScrollAnimation();
  const [teamRef, teamVisible] = useScrollAnimation();
  const [canadaPartnersRef, canadaPartnersVisible] = useScrollAnimation();

  // Sample data for study abroad destinations
  const destinations = [
    {
      name: '',
      image: '/assets/images/canada.jpg',
      description:
        'Study at world-class universities in vibrant cities like Toronto and Vancouver.',
    },
    {
      name: '',
      image: '/assets/images/mỹ.jpg',
      description:
        'Explore diverse academic programs at prestigious institutions like Harvard and MIT.',
    },
    {
      name: '',
      image: '/assets/images/canada2.jpg',
      description:
        'Experience innovative education in a multicultural environment in Sydney or Melbourne.',
    },
    {
      name: '',
      image: '/assets/images/an.jpg',
      description:
        'Pursue academic excellence at historic universities like Oxford and Cambridge.',
    },
    {
      name: '',
      image: '/assets/images/canada3.jpg',
      description:
        'Study in a safe, scenic country with top universities like the University of Auckland.',
    },
  ];

  // Success stories data
  const stories = [
    {
      name: 'Sarah Chen',
      role: 'HR Director, Toronto',
      image: '/assets/images/chimai1.jpg',
      avatar: 'JL', // THÊM avatar property
      color: 'blue',
      title: 'From IELTS Struggles to Career Success',
      story:
        'Sarah struggled with multiple IELTS attempts for her Canadian immigration goals. With her application deadline approaching, she found TN7 Solutions in a state of anxiety and near despair. Our team understood her situation and guided her to switch to the CELPIP exam. With specialized training and close mentorship, Sarah not only excelled in the test but also completed her immigration application on time, now thriving as an HR Director in Toronto.',
      reverse: false,
      rating: 5,
    },
    {
      name: 'Michael Rodriguez',
      role: 'SME Business Owner',
      image: '/assets/images/anhhung.jpg',
      avatar: 'JL', // THÊM avatar property
      color: 'cyan',
      title: 'Expanding Business to North America',
      story:
        'Michael owned an SME in Vietnam and was hesitant about expanding to the North American market due to high costs and lack of clear direction. When he came to TN7 Solutions, he received support not only with legal matters but also comprehensive international marketing strategy development. Within one year, his business successfully established a branch in Alberta, Canada, operating efficiently with significant cost savings.',
      reverse: true,
    },
    {
      name: 'Jennifer Liu',
      role: 'Family Immigration Success',
      image: '/assets/images/lan.jpg',
      avatar: 'JL', // THÊM avatar property
      color: 'purple',
      title: 'Family Dreams Realized in Canada',
      story:
        "Jennifer's family always dreamed of their children studying and living in an international environment. With many concerns about choosing the right immigration path, she found TN7 Solutions for consultation. With our comprehensive support from legal document preparation to startup model development and implementation, Jennifer's family succeeded in the Start-Up Visa program and established the foundation for an educational technology business in Canada.",
      reverse: false,
    },
  ];

  // Canadian partnerships data
  const canadianPartners = [
    {
      name: 'Maple Legal Associates',
      type: 'Immigration Law Firm',
      location: 'Toronto, ON',
      specialty: 'Business Immigration & Start-up Visas',
      avatar: 'JL', // THÊM avatar property
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=face',
      description:
        'Leading immigration law firm specializing in business immigration and investor programs.',
      services: [
        'Start-up Visa Program',
        'Investor Immigration',
        'Work Permits',
        'Legal Compliance',
      ],
      years: '10+ years',
      color: 'red',
    },
    {
      name: 'Northern Talent Solutions',
      type: 'HR & Recruitment Agency',
      location: 'Vancouver, BC',
      specialty: 'Tech & Professional Services Recruitment',
      image:
        'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      description:
        'Premier recruitment agency connecting international talent with Canadian employers.',
      services: [
        'Executive Search',
        'Talent Acquisition',
        'HR Consulting',
        'Workforce Planning',
      ],
      years: '9+ years',
      color: 'blue',
    },
    {
      name: 'Pacific Business Consulting',
      type: 'Business Development Firm',
      location: 'Calgary, AB',
      specialty: 'SME Expansion & Market Entry',
      image:
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop',
      description:
        'Strategic consulting firm helping international businesses establish operations in Canada.',
      services: [
        'Market Research',
        'Business Setup',
        'Financial Planning',
        'Regulatory Compliance',
      ],
      years: '10+ years',
      color: 'green',
    },
    {
      name: 'Great Lakes Education Partners',
      type: 'Educational Institution Network',
      location: 'Montreal, QC',
      specialty: 'International Student Programs',
      image:
        'https://tse3.mm.bing.net/th/id/OIP.ocBVW1fbR9Wmvr9GYPvMSwHaE7?pid=Api&P=0&h=180',
      description:
        'Network of educational institutions offering pathways for international students.',
      services: [
        'University Partnerships',
        'Student Placement',
        'Academic Support',
        'Career Guidance',
      ],
      years: '11+ years',
      color: 'purple',
    },
    {
      name: 'Atlantic Maritime Group',
      type: 'Construction & Development',
      location: 'Halifax, NS',
      specialty: 'Infrastructure & Skilled Trades',
      image:
        'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop',
      description:
        'Leading construction company actively recruiting skilled international workers.',
      services: [
        'LMIA Work Permits',
        'Skilled Trades Training',
        'Housing Support',
        'Settlement Services',
      ],
      years: '8+ years',
      color: 'orange',
    },
    {
      name: 'Paragon Testing Canada',
      type: 'Language Testing Authority',
      location: 'National Coverage',
      specialty: 'CELPIP English Testing',
      image:
        'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop',
      description:
        'Official CELPIP testing organization and TN7 Solutions strategic partner in Vietnam.',
      services: [
        'CELPIP Testing',
        'Test Preparation',
        'Score Reporting',
        'Immigration Support',
      ],
      years: '10+ years',
      color: 'indigo',
    },
  ];

  return (
    <Main
      config={props.config}
      meta={
        <Meta
          title="About TN7 Solutions - Global HR, Marketing & Immigration Services"
          description="Your trusted partner connecting Vietnam to global opportunities. Professional HR solutions, strategic marketing, education services, and immigration consulting for Canada & USA."
          config={props.config}
        />
      }
    >
      <div className="bg-gradient-to-b from-slate-50 to-blue-50 min-h-screen overflow-hidden">
        {/* Enhanced Hero Section */}
        <section
          ref={heroRef}
          className={`relative bg-gradient-to-br from-blue-600 via-purple-700 to-indigo-800 text-white py-20 md:py-32 px-4 md:px-8 overflow-hidden transition-all duration-1000 ${
            heroVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="absolute inset-0 bg-black/30"></div>

          {/* Animated Background Elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-64 h-64 md:w-96 md:h-96 bg-white/5 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-48 h-48 md:w-80 md:h-80 bg-blue-300/10 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/4 w-40 h-40 md:w-64 md:h-64 bg-cyan-300/5 rounded-full animate-bounce delay-2000"></div>
          </div>

          {/* Floating Icons */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-32 left-10 animate-float">
              <svg
                className="w-8 h-8 text-white/20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div className="absolute top-40 right-16 animate-float delay-1000">
              <svg
                className="w-6 h-6 text-white/20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
              </svg>
            </div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <div
              className={`mb-8 md:mb-16 transition-all duration-1500 delay-300 ${
                heroVisible
                  ? 'opacity-100 translate-y-0 scale-100'
                  : 'opacity-0 translate-y-20 scale-95'
              }`}
            >
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-lg border border-white/20 mb-8">
                <span className="text-sm font-medium">
                  🌟 Trusted Global Partner Since 2019
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-wide bg-gradient-to-r from-white via-blue-200 to-cyan-200 bg-clip-text text-transparent">
                TN7 Solutions
              </h1>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-200 mb-6">
                Your Gateway to Global Success
              </h2>
              <div className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-500 text-white py-3 px-8 rounded-full inline-block text-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                HR • Marketing • Education • Immigration
              </div>
            </div>

            <div
              className={`grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto transition-all duration-1000 delay-600 ${
                heroVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              {[
                {
                  icon: '🌐',
                  text: 'tn7solutions.com',
                  label: 'Official Website',
                },
                { icon: '✉️', text: 'contact@tn7.vn', label: 'Email Support' },
                { icon: '📱', text: '076 377 1191', label: 'WhatsApp/Zalo' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-white/15 backdrop-blur-lg rounded-2xl p-6 border border-white/30 hover:bg-white/25 transition-all duration-500 hover:scale-105 hover:shadow-lg group"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <p className="font-bold text-lg mb-1">{item.text}</p>
                  <p className="text-sm text-blue-200">{item.label}</p>
                </div>
              ))}
            </div>

            <div
              className={`bg-white/15 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/30 max-w-5xl mx-auto hover:bg-white/20 transition-all duration-700 hover:scale-[1.02] hover:shadow-xl ${
                heroVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '900ms' }}
            >
              <h3 className="text-2xl md:text-3xl font-bold text-blue-100 mb-6">
                Empowering Global Connections & Career Success
              </h3>
              <div className="space-y-4 text-lg leading-relaxed max-w-4xl mx-auto">
                <p>
                  We provide the most{' '}
                  <span className="font-bold text-yellow-300">
                    effective, optimized, and rapid solutions
                  </span>{' '}
                  to the challenges and issues you&apos;re facing in your global
                  career journey.
                </p>
                <p>
                  TN7 Solutions will always be your trusted partner as you
                  expand worldwide and build a better future, connecting
                  Vietnamese talent with international opportunities.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CEO Letter with Enhanced Animation */}
        <section
          ref={ceoRef}
          className={`py-20 md:py-32 px-4 bg-gradient-to-r from-blue-50 via-white to-purple-50 transition-all duration-1000 ${
            ceoVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div
              className={`bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 hover:shadow-3xl transition-all duration-700 hover:scale-[1.01] ${
                ceoVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="bg-gradient-to-r from-blue-600 via-purple-700 to-indigo-600 text-white p-8 md:p-16 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-pulse"></div>
                <div className="relative z-10">
                  <div className="w-24 h-24 bg-white/20 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl md:text-5xl font-bold mb-4">
                    Message from Our CEO
                  </h3>
                  <div className="w-32 h-1.5 bg-white mx-auto rounded-full"></div>
                </div>
              </div>

              <div className="p-8 md:p-16">
                <div className="grid md:grid-cols-3 gap-12 items-start">
                  <div
                    className={`md:col-span-2 space-y-8 transition-all duration-1000 delay-300 ${
                      ceoVisible
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-10'
                    }`}
                  >
                    <p className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">
                      Dear Valued Partners and Clients,
                    </p>

                    <div className="space-y-6 text-gray-700 leading-relaxed text-justify text-lg">
                      <p>
                        TN7 Solutions was born with a burning ambition: to
                        become the strong and sustainable bridge between Vietnam
                        and the World, creating comprehensive solutions from
                        education, employment, marketing to immigration and
                        international study abroad. We believe that every
                        sustainable success stems from solid knowledge, deep
                        connections, and a bold global vision.
                      </p>
                      <p>
                        With a team of passionate experts and a
                        multi-dimensional service ecosystem, TN7 Solutions is
                        committed to not only accompanying, but also inspiring
                        and motivating our clients on their journey of studying,
                        career development, and international immigration. We
                        aspire to become a trusted companion, always standing by
                        to help our clients turn aspirations into reality.
                      </p>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8 border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300">
                      <p className="text-xl font-semibold text-blue-800 mb-3">
                        With sincere regards,
                      </p>
                      <p className="text-3xl font-bold text-blue-900 mb-2">
                        Nguyen Thi Phuong Trang
                      </p>
                      <p className="text-blue-600 text-lg">
                        CEO & Founder – TN7 Solutions
                      </p>
                      <div className="flex items-center mt-4 text-sm text-gray-600">
                        <span className="bg-blue-100 px-3 py-1 rounded-full mr-3">
                          📚 Master of Law
                        </span>
                        <span className="bg-purple-100 px-3 py-1 rounded-full">
                          🏆 10+ Years Experience
                        </span>
                      </div>
                    </div>
                  </div>

                  <div
                    className={`text-center transition-all duration-1000 delay-500 ${
                      ceoVisible
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-10'
                    }`}
                  >
                    <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 hover:shadow-lg transition-all duration-300 sticky top-8">
                      <div className="w-40 h-40 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-xl">
                        <span className="text-4xl text-white font-bold">
                          TN
                        </span>
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-3">
                        Nguyen Thi Phuong Trang
                      </h4>
                      <p className="text-blue-600 font-semibold mb-4 text-lg">
                        CEO & Founder
                      </p>

                      <div className="space-y-4">
                        {/* Credentials Row */}
                        <div className="flex flex-wrap justify-center gap-2">
                          <div className="flex items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group">
                            <svg
                              className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z" />
                            </svg>
                            <span className="text-sm font-semibold">
                              Master of Law
                            </span>
                          </div>

                          <div className="flex items-center bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group">
                            <svg
                              className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                            </svg>
                            <span className="text-sm font-semibold">CBAP®</span>
                          </div>

                          <div className="flex items-center bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group">
                            <svg
                              className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                            </svg>
                            <span className="text-sm font-semibold">PMP</span>
                          </div>
                        </div>

                        {/* Stats Row */}
                        <div className="flex justify-center space-x-6 pt-2">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">
                              10+
                            </div>
                            <div className="text-xs text-gray-500">
                              Years Experience
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              500+
                            </div>
                            <div className="text-xs text-gray-500">
                              Clients Served
                            </div>
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

        {/* Company Introduction with Modern Layout */}
        <section
          ref={companyRef}
          className={`py-20 md:py-32 px-4 bg-gradient-to-br from-slate-50 to-blue-50 transition-all duration-1000 ${
            companyVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div
              className={`text-center mb-16 transition-all duration-1000 ${
                companyVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-blue-100 border border-blue-200 mb-8">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
                <span className="text-blue-600 font-medium text-sm uppercase tracking-wider">
                  About TN7 Solutions
                </span>
              </div>
              <h3 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent mb-6">
                Who We Are
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Your trusted global partner for HR solutions, strategic
                marketing, education services, and immigration consulting
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div
                className={`space-y-8 transition-all duration-1000 delay-300 ${
                  companyVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-20'
                }`}
              >
                <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                  <div className="flex items-center mb-6">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-800">
                      Company Information
                    </h4>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        label: 'Full Name',
                        value: 'TN7 EDUCATION & SOLUTIONS CO., LTD',
                      },
                      { label: 'Short Name', value: 'TN7 Solutions' },
                      {
                        label: 'Headquarters',
                        value:
                          '8th Floor, No. 19 Cao Thang,Ban Co Ward, Ho Chi Minh City',
                      },
                      { label: 'Founded', value: '2019' },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="flex items-start p-4 rounded-lg hover:bg-blue-50 transition-all duration-300 group"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 mr-4 group-hover:scale-125 transition-transform duration-300"></div>
                        <div>
                          <span className="font-semibold text-blue-700">
                            {item.label}:
                          </span>
                          <span className="ml-2 text-gray-700">
                            {item.value}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div
                className={`space-y-8 transition-all duration-1000 delay-500 ${
                  companyVisible
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-20'
                }`}
              >
                {[
                  {
                    title: 'Our Vision',
                    content:
                      'To become the leading strategic partner in Vietnam for international education, human resource development, and global immigration – carrying the burning aspirations of Vietnamese people to reach the world, while bringing global knowledge and opportunities back to elevate the young generation of Vietnam.',
                    color: 'blue',
                    icon: '🎯',
                  },
                  {
                    title: 'Our Mission',
                    content:
                      "To help Vietnamese individuals and businesses expand opportunities, unlock potential, nurture integration capabilities, and conquer international standards, affirming Vietnam's position on the world map.",
                    color: 'purple',
                    icon: '🚀',
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]"
                  >
                    <div className="flex items-center mb-6">
                      <span className="text-3xl mr-4">{item.icon}</span>
                      <h4
                        className={`text-2xl font-bold text-${item.color}-800`}
                      >
                        {item.title}
                      </h4>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {item.content}
                    </p>
                  </div>
                ))}

                <div className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-[1.02]">
                  <div className="flex items-center mb-6">
                    <span className="text-3xl mr-4">💎</span>
                    <h4 className="text-2xl font-bold text-gray-800">
                      Core Values
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {[
                      'Professional Excellence',
                      'Global Diversity',
                      'Strategic Connections',
                      'Sustainable Growth',
                      'Innovation Driven',
                    ].map((value, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full font-semibold text-sm hover:scale-105 transition-transform duration-300 cursor-pointer shadow-md hover:shadow-lg"
                      >
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4 Core Services with Modern Card Design */}
        <section
          ref={valuesRef}
          className={`py-20 md:py-32 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50 transition-all duration-1000 ${
            valuesVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div
              className={`text-center mb-20 transition-all duration-1000 ${
                valuesVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-purple-100 border border-purple-200 mb-8">
                <span className="w-2 h-2 bg-purple-500 rounded-full mr-3 animate-pulse"></span>
                <span className="text-purple-600 font-medium text-sm uppercase tracking-wider">
                  Our Services
                </span>
              </div>
              <h3 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent mb-6">
                4 Core Service Areas
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive solutions designed to connect Vietnamese talent
                with global opportunities
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  number: '1',
                  title: 'HR & Global Career Solutions',
                  subtitle: 'Connecting Talent Worldwide',
                  color: 'blue',
                  icon: '🤝',
                  points: [
                    'Executive search and talent acquisition for international markets',
                    'Employer of Record (EOR) services for Canadian and US companies',
                    'HR compliance and workforce management solutions',
                    'Professional onboarding and cross-cultural training programs',
                  ],
                  highlight:
                    'TN7 Solutions bridges Vietnamese talent with global opportunities, ensuring seamless integration and sustainable career growth in international markets.',
                },
                {
                  number: '2',
                  title: 'Strategic Marketing & Business Growth',
                  subtitle: 'Amplifying Your Global Presence',
                  color: 'purple',
                  icon: '📈',
                  points: [
                    'Digital marketing strategies across multiple platforms (LinkedIn, Facebook, Google)',
                    'Brand development and corporate identity design',
                    'Website development and e-commerce solutions',
                    'Market entry strategies for North American expansion',
                  ],
                  highlight:
                    'Our marketing expertise helps Vietnamese businesses establish strong international presence and achieve sustainable growth in competitive global markets.',
                },
                {
                  number: '3',
                  title: 'Education & Language Excellence',
                  subtitle: 'Unlocking Global Academic Success',
                  color: 'green',
                  icon: '📚',
                  points: [
                    'IELTS, CELPIP, PTE, and TOEFL preparation with certified instructors',
                    'Business English and professional communication training',
                    'Academic pathway consulting for international universities',
                    'Official CELPIP testing partnership with Paragon Testing',
                  ],
                  highlight:
                    'Beyond language learning, we create personalized educational journeys that connect academic success with career advancement and global mobility.',
                },
                {
                  number: '4',
                  title: 'Immigration & Settlement Services',
                  subtitle: 'Your Pathway to Global Citizenship',
                  color: 'orange',
                  icon: '🌎',
                  points: [
                    'Start-Up Visa programs for entrepreneur immigration to Canada',
                    'C11 Owner Operator visas for business investors',
                    'LMIA Work Permits and skilled worker programs',
                    'Comprehensive settlement support and community integration',
                  ],
                  highlight:
                    'Complete immigration solutions combining legal expertise, business development, and settlement support for successful transition to life in Canada and the USA.',
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className={`group bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-700 hover:scale-[1.02] relative overflow-hidden ${
                    valuesVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 200}ms` }}
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-${service.color}-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  ></div>

                  <div className="relative z-10">
                    <div className="flex items-start mb-6">
                      <div
                        className={`w-16 h-16 bg-gradient-to-r from-${service.color}-500 to-${service.color}-600 rounded-xl flex items-center justify-center mr-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                      >
                        <span className="text-white text-2xl font-bold">
                          {service.number}
                        </span>
                      </div>
                      <div className="flex-1">
                        <h4
                          className={`text-2xl font-bold text-${service.color}-800 mb-2`}
                        >
                          {service.title}
                        </h4>
                        <p
                          className={`text-${service.color}-600 font-semibold`}
                        >
                          {service.subtitle}
                        </p>
                      </div>
                      <span className="text-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                        {service.icon}
                      </span>
                    </div>

                    <ul className="space-y-3 text-gray-700 mb-6">
                      {service.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start">
                          <span
                            className={`w-2 h-2 bg-${service.color}-500 rounded-full mt-2 mr-3 flex-shrink-0`}
                          ></span>
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>

                    <div
                      className={`bg-${service.color}-50 rounded-xl p-4 border-l-4 border-${service.color}-500 group-hover:bg-${service.color}-100 transition-colors duration-300`}
                    >
                      <p
                        className={`text-sm font-semibold text-${service.color}-800 mb-2`}
                      >
                        Key Advantage:
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {service.highlight}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Canadian Partnerships Section - NEW */}
        <section
          ref={canadaPartnersRef}
          className={`py-20 md:py-32 px-4 bg-gradient-to-br from-red-50 via-white to-red-50 relative overflow-hidden transition-all duration-1000 ${
            canadaPartnersVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-20'
          }`}
        >
          {/* Canadian Flag Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-20 right-20 w-32 h-32">
              <svg viewBox="0 0 100 50" className="w-full h-full text-red-500">
                <path
                  d="M50 5l5 15h15l-12 9 5 15-13-9-13 9 5-15-12-9h15z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <div className="absolute bottom-20 left-20 w-24 h-24">
              <svg viewBox="0 0 100 50" className="w-full h-full text-red-500">
                <path
                  d="M50 5l5 15h15l-12 9 5 15-13-9-13 9 5-15-12-9h15z"
                  fill="currentColor"
                />
              </svg>
            </div>
          </div>

          <div className="relative max-w-7xl mx-auto">
            <div
              className={`text-center mb-16 transition-all duration-1000 ${
                canadaPartnersVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-red-100 border border-red-200 mb-8">
                <span className="text-2xl mr-3">🇨🇦</span>
                <span className="text-red-600 font-medium text-sm uppercase tracking-wider">
                  Strategic Partnerships
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-red-500 to-red-700 bg-clip-text text-transparent mb-6">
                Our Canadian Partners
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Trusted relationships with leading Canadian organizations across
                immigration, HR, business development, and education sectors
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {canadianPartners.map((partner, index) => (
                <div
                  key={index}
                  className={`group bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 hover:scale-105 ${
                    canadaPartnersVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Partner Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                        {partner.years}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center text-white text-sm">
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                        </svg>
                        <span>{partner.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Partner Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-red-600 transition-colors duration-300">
                        {partner.name}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500 mb-1">
                        <span
                          className={`w-2 h-2 bg-${partner.color}-500 rounded-full mr-2`}
                        ></span>
                        {partner.type}
                      </div>
                      <p className="text-sm font-medium text-gray-700">
                        {partner.specialty}
                      </p>
                    </div>

                    <p className="text-gray-600 text-sm leading-relaxed mb-4">
                      {partner.description}
                    </p>

                    {/* Services */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-800 mb-2">
                        Key Services:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {partner.services
                          .slice(0, 3)
                          .map((service, serviceIndex) => (
                            <span
                              key={serviceIndex}
                              className={`bg-${partner.color}-100 text-${partner.color}-700 px-2 py-1 rounded-md text-xs font-medium`}
                            >
                              {service}
                            </span>
                          ))}
                        {/* {partner.services.length > 3 && (
                          <span className="bg-gray-100 text-while-600 px-2 py-1 rounded-md text-xs font-medium">
                            {partner.services.length - 3}
                          </span>
                        )} */}
                      </div>
                    </div>

                    {/* Partnership Strength Indicator */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center text-xs text-gray-500">
                        <svg
                          className="w-4 h-4 mr-1 text-green-500"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                        </svg>
                        Verified Partner
                      </div>
                      <div className="flex items-center">
                        <span className="text-2xl mr-1">🇨🇦</span>
                        <span className="text-xs text-gray-500 font-medium">
                          Active Partnership
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Partnership Benefits */}
            <div
              className={`mt-16 bg-white rounded-2xl p-8 shadow-xl border border-gray-100 transition-all duration-1000 delay-500 ${
                canadaPartnersVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Why Our Canadian Partnerships Matter
                </h3>
                <p className="text-gray-600">
                  These strategic alliances ensure authentic, compliant, and
                  successful outcomes for our clients
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  {
                    icon: '🏛️',
                    title: 'Legal Compliance',
                    description:
                      'Direct access to licensed Canadian legal professionals and regulatory expertise',
                  },
                  {
                    icon: '🎯',
                    title: 'Market Access',
                    description:
                      'Established networks providing immediate market entry and business opportunities',
                  },
                  {
                    icon: '🤝',
                    title: 'Quality Assurance',
                    description:
                      'Vetted partnerships ensuring high-quality services and successful outcomes',
                  },
                  {
                    icon: '⚡',
                    title: 'Faster Processing',
                    description:
                      'Streamlined processes through established relationships and proven workflows',
                  },
                ].map((benefit, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-lg hover:bg-red-50 transition-colors duration-300"
                  >
                    <div className="text-3xl mb-3">{benefit.icon}</div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      {benefit.title}
                    </h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Popular Study Abroad Destinations with Enhanced Design */}
        <section
          ref={destinationsRef}
          className={`py-16 md:py-24 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 transition-all duration-1000 ${
            destinationsVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div
              className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
                destinationsVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 bg-clip-text text-transparent mb-4">
                Popular Study Abroad Destinations
              </h3>
              <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-600 mx-auto rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 md:gap-6">
              {destinations.map((destination, index) => (
                <div
                  key={index}
                  className={`group relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-700 transform hover:-translate-y-2 hover:scale-105 ${
                    destinationsVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <div className="relative w-full h-48 md:h-56 lg:h-64 overflow-hidden">
                    <Image
                      src={destination.image}
                      alt={destination.name}
                      fill
                      className="object-cover brightness-75 group-hover:brightness-90 group-hover:scale-110 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                    <div className="absolute inset-0 flex flex-col justify-end p-2 md:p-4">
                      <h4 className="text-white text-base md:text-lg font-bold mb-1 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        {destination.name}
                      </h4>
                      <p className="text-white/90 text-xs md:text-sm leading-relaxed transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                        {destination.description}
                      </p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories with Enhanced Animation */}
        <section
          ref={storiesRef}
          className={`py-16 md:py-24 px-4 transition-all duration-1000 ${
            storiesVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div
              className={`text-center mb-12 md:mb-16 transition-all duration-1000 ${
                storiesVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-4">
                Success Story
              </h3>
              <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 mx-auto rounded-full"></div>
            </div>

            <div className="space-y-8 md:space-y-12">
              {stories.map((story, index) => (
                <div
                  key={index}
                  className={`bg-gradient-to-r from-${
                    story.color
                  }-50 via-white to-${
                    story.color
                  }-50 rounded-xl p-4 md:p-6 shadow-lg border border-${
                    story.color
                  }-100 hover:shadow-xl transition-all duration-700 hover:scale-[1.01] ${
                    storiesVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 300}ms` }}
                >
                  <div
                    className={`grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6 items-center ${
                      story.reverse ? 'lg:grid-flow-col-dense' : ''
                    }`}
                  >
                    <div
                      className={`text-center ${
                        story.reverse ? 'lg:col-start-4' : ''
                      }`}
                    >
                      {story.image ? (
                        <div
                          className={`w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-${story.color}-400 to-${story.color}-600 rounded-full mx-auto mb-3 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-500 hover:scale-105 relative overflow-hidden`}
                        >
                          <Image
                            src={story.image}
                            alt={`${story.name}'s avatar`}
                            width={96}
                            height={96}
                            className="rounded-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                        </div>
                      ) : (
                        <div
                          className={`w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-${story.color}-400 to-${story.color}-600 rounded-full mx-auto mb-3 flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-500 hover:scale-105 relative overflow-hidden`}
                        >
                          <span className="text-white text-xl md:text-2xl font-bold relative z-10">
                            {story.avatar}
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent animate-pulse"></div>
                        </div>
                      )}
                      <h4
                        className={`text-xl md:text-2xl font-bold text-${story.color}-800 mb-1`}
                      >
                        {story.name}
                      </h4>
                      <p
                        className={`text-${story.color}-600 font-semibold text-sm md:text-base`}
                      >
                        {story.role}
                      </p>
                    </div>
                    <div
                      className={`lg:col-span-3 ${
                        story.reverse ? 'lg:col-start-1' : ''
                      }`}
                    >
                      <h5
                        className={`text-xl md:text-2xl font-bold text-${story.color}-800 mb-3`}
                      >
                        {story.title}
                      </h5>
                      <p className="text-gray-700 leading-relaxed text-justify text-sm md:text-base">
                        {story.story}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Partners & Clients with Modern Grid */}
        <section
          ref={partnersRef}
          className={`py-32 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50 transition-all duration-1000 ${
            partnersVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            <div
              className={`text-center mb-20 transition-all duration-1000 ${
                partnersVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <h3 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-slate-600 to-cyan-600 bg-clip-text text-transparent mb-8">
                Clients & Partners
              </h3>
              <div className="w-40 h-2 bg-gradient-to-r from-blue-500 via-slate-500 to-cyan-500 mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {[
                {
                  title: 'Canadian Enterprises',
                  description:
                    'Construction, Services, Information Technology, Restaurant & Hospitality sectors',
                  icon: '🏢',
                  color: 'blue',
                },
                {
                  title: 'International Educational Institutions',
                  description:
                    'Prestigious training centers in Vietnam and internationally',
                  icon: '🎓',
                  color: 'cyan',
                },
                {
                  title: 'Immigration & Legal Partners',
                  description:
                    'Leading international immigration and legal partners in Canada & USA',
                  icon: '⚖️',
                  color: 'purple',
                },
                {
                  title: 'Vietnamese SMEs',
                  description:
                    'Businesses aspiring to expand into North America',
                  icon: '🚀',
                  color: 'green',
                },
                {
                  title: 'Marketing Enterprises',
                  description:
                    'Partners seeking comprehensive marketing solutions in USA & Canada',
                  icon: '📈',
                  color: 'orange',
                },
                {
                  title: 'Paragon Testing',
                  description:
                    'Strategic international partner of TN7 E&S in Vietnam (CELPIP)',
                  icon: '🎯',
                  color: 'red',
                },
              ].map((partner, index) => (
                <div
                  key={index}
                  className={`group bg-white rounded-3xl p-10 shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-700 transform hover:-translate-y-4 hover:scale-105 relative overflow-hidden ${
                    partnersVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Background Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Content */}
                  <div className="relative z-10 text-center">
                    <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {partner.icon}
                    </div>
                    <h4 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                      {partner.title}
                    </h4>
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {partner.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section with Enhanced Design */}
        <section
          ref={teamRef}
          className={`py-20 px-4 transition-all duration-1000 ${
            teamVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-20'
          }`}
        >
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div
              className={`text-center mb-16 transition-all duration-1000 ${
                teamVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="inline-flex items-center justify-center bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full px-8 py-3 mb-6 border border-blue-100 shadow-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></span>
                <p className="text-blue-600 font-medium text-sm uppercase tracking-wider">
                  Professional Team
                </p>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                <span className="text-blue-600">TN7 E&S</span> Team
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Experienced team of specialists, ready to support you in
                achieving your business objectives
              </p>
            </div>

            {/* CEO Section Enhanced */}
            <div
              className={`bg-gradient-to-br from-white to-blue-50 rounded-3xl p-8 md:p-12 mb-16 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-500 ${
                teamVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              <div className="flex flex-col lg:flex-row gap-10 items-start">
                {/* CEO Profile */}
                <div
                  className={`w-full lg:w-1/3 transition-all duration-1000 delay-500 ${
                    teamVisible
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-10'
                  }`}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-md h-full">
                    <div className="flex flex-col items-center text-center mb-6">
                      <div className="w-40 h-40 bg-gradient-to-br from-blue-300 via-cyan-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
                        <span className="text-4xl text-white font-bold">
                          TN
                        </span>
                      </div>
                      <h4 className="text-2xl font-bold text-gray-900 mb-2">
                        NGUYEN THI PHUONG TRANG
                      </h4>
                      <div className="inline-flex items-center bg-blue-100 rounded-full px-4 py-1 mb-3">
                        <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                        <p className="text-blue-700 font-semibold text-sm">
                          CEO & Founder
                        </p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center text-gray-700">
                        <svg
                          className="w-5 h-5 text-blue-500 mr-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>Master of Law</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <svg
                          className="w-5 h-5 text-blue-500 mr-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>10+ Years Experience</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CEO Skills */}
                <div
                  className={`w-full lg:w-2/3 space-y-6 transition-all duration-1000 delay-700 ${
                    teamVisible
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 translate-x-10'
                  }`}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    {[
                      {
                        title: 'Project Management & Business Analysis',
                        content: 'PMP-certified, specialized in Agile & Scrum.',
                        color: 'blue',
                        icon: '📊',
                      },
                      {
                        title: 'Marketing & Sales Optimization',
                        content:
                          'Design and implement cost-effective marketing strategies, affiliate marketing.',
                        color: 'cyan',
                        icon: '📈',
                      },
                      {
                        title: 'Data Analysis & Decision Support',
                        content:
                          'Provide accurate insights, support enhancement and efficiency improvements.',
                        color: 'blue',
                        icon: '🎯',
                      },
                      {
                        title: 'Recruitment & HR Solutions',
                        content:
                          'Connect Vietnamese workforce with global enterprises.',
                        color: 'green',
                        icon: '🤝',
                      },
                    ].map((skill, index) => (
                      <div
                        key={index}
                        className="bg-white rounded-xl p-5 border-l-4 border-blue-500 shadow-sm hover:shadow-md transition-all duration-300 group"
                      >
                        <div className="flex items-start mb-3">
                          <span className="text-2xl mr-3 group-hover:scale-110 transition-transform duration-300">
                            {skill.icon}
                          </span>
                          <h5 className="font-semibold text-gray-900 text-lg">
                            {skill.title}
                          </h5>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {skill.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Experience Highlight */}
                  <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl p-6 shadow-md relative overflow-hidden">
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full"></div>
                    <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/5 rounded-full"></div>

                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mr-3">
                          <span className="text-xl">🏆</span>
                        </div>
                        <h5 className="font-bold text-xl">
                          10 YEARS OF EXPERIENCE
                        </h5>
                      </div>
                      <p className="leading-relaxed mb-4 text-blue-100">
                        I believe that every client who comes to TN7 E&amp;S is
                        a precious trust, so I prioritize our clients&apos;
                        success and happiness above all else.
                      </p>
                      <div className="flex flex-wrap gap-4 text-sm">
                        <span className="bg-white/20 px-3 py-1 rounded-full">
                          ✅ 500+ Successful Clients
                        </span>
                        <span className="bg-white/20 px-3 py-1 rounded-full">
                          ✅ 50+ Completed Projects
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Members Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  name: 'HO BINH AN',
                  role: 'Full Stack Developer',
                  dept: 'Web Developer',
                  avatar: 'HA',
                  emoji: '💻',
                  color: 'blue',
                  features: [
                    'Web Application Development Expertise',
                    'Experience in multiple projects',
                    'Experience in developing website functionality and interface',
                  ],
                },
                {
                  name: 'NGUYEN THI THUY TIEN',
                  role: 'Administration & Human Resources',
                  dept: '5+ years experience in education & training',
                  avatar: 'TT',
                  emoji: '📝',
                  color: 'blue',
                  features: [
                    'Expert in HR management',
                    'Strong organizational skills',
                    'Dedicated to employee growth',
                  ],
                },
                {
                  name: 'TRUONG THI HONG',
                  role: 'Tax & Accounting Specialist',
                  dept: '8+ years experience in accounting & finance',
                  avatar: 'TH',
                  emoji: '💰',
                  color: 'blue',
                  features: [
                    'Certified tax consultant',
                    'Excellent financial analysis',
                    'Deep knowledge of regulations',
                  ],
                },
                {
                  name: 'LE THI DIEU THAO',
                  role: 'Public Relations Specialist',
                  dept: '3+ years experience in Marketing',
                  avatar: 'DT',
                  emoji: '🎯',
                  color: 'blue',
                  features: [
                    'Creative PR campaign strategies',
                    'Strong media relationships',
                    'Passionate about brand image',
                  ],
                },
              ].map((member, index) => (
                <div
                  key={index}
                  className={`group bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-500 transform hover:-translate-y-2 relative overflow-hidden ${
                    teamVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                >
                  {/* Background Effect */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex flex-col items-center text-center mb-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-md mb-4 group-hover:shadow-lg transition-all duration-500">
                        <span className="text-white font-semibold">
                          {member.avatar}
                        </span>
                      </div>

                      <h5 className="font-bold text-gray-900 mb-1">
                        {member.name}
                      </h5>
                      <div className="flex items-center justify-center text-blue-600 font-medium text-sm mb-2">
                        <span className="mr-1">{member.emoji}</span>
                        {member.role}
                      </div>
                      <p className="text-gray-500 text-xs">{member.dept}</p>
                    </div>

                    <div className="border-t border-gray-100 pt-4">
                      <ul className="space-y-2 text-xs text-gray-600">
                        {member.features.map((feature, fIndex) => (
                          <li key={fIndex} className="flex items-start">
                            <svg
                              className="w-4 h-4 text-blue-500 mt-0.5 mr-2 flex-shrink-0"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Get in Touch */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="absolute inset-0">
            <div className="absolute top-20 right-20 w-96 h-96 bg-white/5 rounded-full animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-300/10 rounded-full animate-pulse"></div>
          </div>

          <div className="relative z-10 max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h3 className="text-5xl font-bold mb-6">GET IN TOUCH</h3>
              <p className="text-xl text-blue-200 mb-8">
                Contact us to begin your journey
              </p>
              <div className="w-32 h-1.5 bg-white mx-auto rounded-full"></div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  icon: '📞',
                  title: '076 377 1191',
                  subtitle: '(WHATSAPP/ZALO)',
                },
                {
                  icon: '🌐',
                  title: 'tn7solutions.com',
                  subtitle: 'Official Website',
                },
                {
                  icon: '✉️',
                  title: 'contact@tn7.vn',
                  subtitle: 'Support Email',
                },
                {
                  icon: '📍',
                  title: '19 Cao Thang, Ban Co Ward',
                  subtitle: 'Ho Chi Minh City',
                },
                {
                  icon: '🏢',
                  title: 'TN7 E&S Co., Ltd',
                  subtitle: 'Head Office',
                },
              ].map((contact, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div className="text-3xl mb-4">{contact.icon}</div>
                  <p className="font-semibold text-lg mb-2">{contact.title}</p>
                  <p className="text-sm text-blue-200">{contact.subtitle}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-16">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20 max-w-4xl mx-auto">
                <h4 className="text-2xl font-bold mb-4">
                  🌟 Ready to transform your life?
                </h4>
                <p className="text-lg text-blue-200 mb-6">
                  Let TN7 E&S accompany you on your journey to conquer global
                  dreams
                </p>
                {/* <div className="flex flex-wrap justify-center gap-4">
                  <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition-colors duration-300">
                    Free Consultation
                  </button>
                  <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300">
                    View More Services
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps<IhomeProps> = async () => {
  const config = getDataConfig();
  return {
    props: {
      config,
    },
  };
};

export default AboutUs;
