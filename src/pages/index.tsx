import React, { useEffect, useRef, useState } from 'react';

import { format } from 'date-fns';
import { GetServerSideProps } from 'next';
import Link from 'next/link';

import Booking from '../layout/Booking';
import { Meta } from '../layout/Meta';
import Canada from '../svg/Canada';
import Liberty from '../svg/Liberty';
import { Main } from '../templates/Main';
import { imageKitExtract, parseDateString } from '../utils/Common';
import {
  IAppConfig,
  PostItems,
  getDataConfig,
  getPostBySlug,
} from '../utils/Content';

// Custom hook for scroll animations
const useScrollAnimation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, isVisible] as const;
};

// Education: Use a book or graduation cap icon to represent education
const BookIcon = () => (
  <img
    src="https://cdn-icons-png.flaticon.com/128/3976/3976631.png"
    alt="Book Icon"
    className="w-12 h-12"
  />
);

// Career: Use a briefcase or suit icon to represent career
const BriefcaseIcon = () => (
  <img
    src="https://cdn-icons-png.flaticon.com/128/8765/8765344.png"
    alt="BriefcaseIcon"
    className="w-12 h-12"
  />
);

// Marketing: Use a megaphone or bullhorn icon to represent marketing
const MegaphoneIcon = () => (
  <img
    src="https://cdn-icons-png.flaticon.com/128/17318/17318392.png"
    alt="MegaphoneIcon"
    className="w-12 h-12"
  />
);

// Immigration: Use a globe or passport icon to represent immigration
const GlobeIcon = () => (
  <img
    src="https://cdn-icons-png.flaticon.com/128/10154/10154524.png"
    alt="GlobeIcon"
    className="w-12 h-12"
  />
);

interface IhomeProps {
  config: IAppConfig;
  blogs: PostItems[];
}

const Home = (props: IhomeProps) => {
  // Animation refs
  const [heroRef, heroVisible] = useScrollAnimation();
  const [servicesRef, servicesVisible] = useScrollAnimation();
  const [aboutRef, aboutVisible] = useScrollAnimation();
  const [helpRef, helpVisible] = useScrollAnimation();
  const [bookingRef, bookingVisible] = useScrollAnimation();
  const [blogsRef, blogsVisible] = useScrollAnimation();

  const services = [
    {
      title: 'HR & Global Career Solutions',
      description:
        'Connect talented professionals with global opportunities. We provide comprehensive HR solutions, talent acquisition, career development, and international recruitment services.',
      icon: <BriefcaseIcon />,
      link: '/Services/Hrsolutions',
    },
    {
      title: 'Strategic Marketing & Business Growth',
      description:
        'Accelerate your business growth with innovative marketing strategies. From digital marketing campaigns to brand development and market expansion solutions.',
      icon: <MegaphoneIcon />,
      link: '/Services/Marketing',
    },
    {
      title: 'Education & Language Solutions',
      description:
        'Comprehensive language learning programs and international test preparation (IELTS, TOEFL, SAT) with proven methodologies for global success.',
      icon: <BookIcon />,
      link: '/Services/Education',
    },
    {
      title: 'Immigration & Settlement Services',
      description:
        'Expert immigration consulting for Canada & USA. Complete support for study permits, work visas, permanent residence, and settlement services.',
      icon: <GlobeIcon />,
      link: '/Services/Immigration',
    },
  ];

  return (
    <Main
      config={props.config}
      meta={
        <Meta
          title={props.config.seo.site_title}
          description={props.config.seo.site_description}
          config={props.config}
        />
      }
    >
      {/* Enhanced CSS Animations */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-60px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(60px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(100px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes rotateIn {
          from {
            opacity: 0;
            transform: rotate(-10deg) scale(0.9);
          }
          to {
            opacity: 1;
            transform: rotate(0deg) scale(1);
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.5);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes typing {
          from {
            width: 0;
          }
          to {
            width: 100%;
          }
        }

        @keyframes blink-caret {
          from,
          to {
            border-color: transparent;
          }
          50% {
            border-color: #d94e38;
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
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
            opacity: 0.9;
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fadeInLeft 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }

        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }

        .animate-bounce-in {
          animation: bounceIn 0.8s ease-out forwards;
        }

        .animate-slide-in-bottom {
          animation: slideInFromBottom 0.8s ease-out forwards;
        }

        .animate-rotate-in {
          animation: rotateIn 0.8s ease-out forwards;
        }

        .animate-zoom-in {
          animation: zoomIn 0.6s ease-out forwards;
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }

        .animate-pulse-slow {
          animation: pulse 3s ease-in-out infinite;
        }

        .typing-text {
          overflow: hidden;
          border-right: 3px solid #d94e38;
          white-space: nowrap;
          animation: typing 3s steps(30, end),
            blink-caret 0.75s step-end infinite;
        }

        .stagger-animation > * {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .stagger-animation > *:nth-child(1) {
          animation-delay: 0.1s;
        }
        .stagger-animation > *:nth-child(2) {
          animation-delay: 0.2s;
        }
        .stagger-animation > *:nth-child(3) {
          animation-delay: 0.3s;
        }
        .stagger-animation > *:nth-child(4) {
          animation-delay: 0.4s;
        }
        .stagger-animation > *:nth-child(5) {
          animation-delay: 0.5s;
        }
        .stagger-animation > *:nth-child(6) {
          animation-delay: 0.6s;
        }
        .stagger-animation > *:nth-child(7) {
          animation-delay: 0.7s;
        }
        .stagger-animation > *:nth-child(8) {
          animation-delay: 0.8s;
        }

        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .card-hover:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 25px 50px -12px rgba(217, 78, 56, 0.3);
        }

        .icon-bounce {
          transition: transform 0.3s ease;
        }

        .icon-bounce:hover {
          transform: scale(1.2) rotate(10deg);
        }

        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
        }

        .gradient-border {
          background: linear-gradient(45deg, #d94e38, #ff6b47, #ff8c69);
          background-size: 300% 300%;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .shimmer {
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.4) 50%,
            transparent 100%
          );
          background-size: 200px 100%;
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -200px 0;
          }
          100% {
            background-position: calc(200px + 100%) 0;
          }
        }

        .glow-effect {
          box-shadow: 0 0 20px rgba(217, 78, 56, 0.3);
          transition: box-shadow 0.3s ease;
        }

        .glow-effect:hover {
          box-shadow: 0 0 30px rgba(217, 78, 56, 0.5);
        }
      `}</style>

      {/* Hero Section with Enhanced Animations */}
      <div
        ref={heroRef}
        className={`mt-12 pt-28 pb-24 relative mb-6 intro-has-bg transition-all duration-1000 ${
          heroVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="absolute left-1/2 -translate-y-1/2 -translate-x-1/2 top-1/2 pointer-events-none z-1">
          <div className="relative w-1000px hide-on-phone">
            <div
              className={`absolute left-2 -translate-y-3/5 top-1/2 pointer-events-none transition-all duration-1000 ${
                heroVisible ? 'animate-rotate-in animate-float' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.5s' }}
            >
              <Canada
                className="w-48 h-48 rotate-12"
                fill="rgba(255, 234, 234, 1)"
              />
            </div>
            <div
              className={`absolute right-2 -translate-y-3/5 top-1/2 pointer-events-none transition-all duration-1000 ${
                heroVisible ? 'animate-rotate-in animate-float' : 'opacity-0'
              }`}
              style={{ animationDelay: '0.7s', animationDuration: '4s' }}
            >
              <Liberty className="w-56 h-56" />
            </div>
          </div>
        </div>
        <div className="bg-whitex bg-opacity-90 md:p-6 p-0 mx-auto max-w-[620px]">
          <h1
            className={`font-bold text-center text-gray-900 px-2 ${
              heroVisible ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <span className="text-3xl md:text-5xl font-extrabold whitespace-nowrap text-shadow">
              Your Gateway to
            </span>
            <br />
            <span
              className={`text-4xl md:text-6xl text-[#d94e38] bg-clip-text font-extrabold leading-none whitespace-nowrap ${
                heroVisible ? 'typing-text' : ''
              }`}
              style={{ animationDelay: '0.5s' }}
            >
              Global Success
            </span>
            <br />
            <span
              className={`text-lg md:text-3xl whitespace-nowrap ${
                heroVisible ? 'animate-bounce-in' : 'opacity-0'
              }`}
              style={{ animationDelay: '1s' }}
            >
              HR • Marketing • Education • Immigration
            </span>
          </h1>
          <div
            className={`text-xl text-gray-900 text-center px-4 py-4 md:px-8 md:py-6 mx-auto my-10 bg-white bg-opacity-40 rounded-2xl glow-effect ${
              heroVisible ? 'animate-scale-in shimmer' : 'opacity-0'
            }`}
            style={{ animationDelay: '1.5s' }}
          >
            <p>
              Our team of international experts, lawyers, and HR professionals
              will thoroughly evaluate your profile and provide the most{' '}
              <span className="whitespace-nowrap font-bold text-[#d94e38]">
                effective solutions
              </span>
              ,{' '}
              <span className="whitespace-nowrap font-bold text-[#d94e38]">
                optimized{' '}
              </span>
              for both time and cost efficiency.
            </p>
          </div>
        </div>
      </div>

      {/* Services Section with Enhanced Animations */}
      <div
        ref={servicesRef}
        className={`py-16 bg-gradient-to-b from-gray-50 to-gray-100 transition-all duration-1000 ${
          servicesVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className={`text-3xl md:text-4xl font-extrabold text-red-900 text-center mb-12 tracking-tight text-shadow ${
              servicesVisible ? 'animate-bounce-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.2s' }}
          >
            Our Core Services
          </h2>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 ${
              servicesVisible ? 'stagger-animation' : ''
            }`}
          >
            {services.map((service, index) => (
              <div
                key={index}
                className="relative bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl group h-full card-hover glow-effect"
              >
                <div className="mb-6 p-4 bg-[#d94e38]/10 rounded-full transition-colors duration-300 group-hover:bg-[#d94e38]/20 icon-bounce">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 leading-tight min-h-[56px] flex items-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-base leading-relaxed mb-6 flex-grow">
                  {service.description}
                </p>
                <Link
                  href={service.link}
                  className="inline-block px-6 py-3 bg-[#d94e38] text-white font-semibold rounded-full hover:bg-[#b83c2f] transition-all duration-300 mt-auto transform hover:scale-105 gradient-border"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Why Choose Us with Enhanced Animations */}
      <div
        ref={aboutRef}
        className={`relative mx-auto max-w-screen-xl px-6 py-20 transition-all duration-1000 ${
          aboutVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="grid md:grid-cols-12 gap-12 items-center">
          {/* Illustration */}
          <div
            className={`md:col-span-5 flex justify-center ${
              aboutVisible ? 'animate-fade-in-left' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.3s' }}
          >
            <img
              className="rounded-3xl shadow-2xl max-h-[520px] object-contain hover:scale-105 transition-transform duration-500 glow-effect animate-pulse-slow"
              src="/assets/images/about-us.png"
              alt="TN7 Solutions"
            />
          </div>

          {/* Content */}
          <div
            className={`md:col-span-7 space-y-10 ${
              aboutVisible ? 'animate-fade-in-right' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.5s' }}
            data-aos="fade-up"
          >
            {/* Introduction */}
            <div className="space-y-4">
              <h2
                className={`text-5xl font-extrabold leading-tight bg-gradient-to-r from-red-500 to-orange-400 bg-clip-text text-transparent text-shadow ${
                  aboutVisible ? 'animate-zoom-in' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.7s' }}
              >
                Our Story <br />
              </h2>
              <p
                className={`text-lg text-gray-600 leading-relaxed text-justify ${
                  aboutVisible ? 'animate-slide-in-bottom' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.9s' }}
              >
                TN7 Solutions provides comprehensive services for education,
                career development, business growth, and international
                immigration. We are committed to partnering with you through
                fast – transparent – effective services, giving you confidence
                and steady steps on your global journey.
              </p>
            </div>

            {/* 4 core areas */}
            <div
              className={`grid sm:grid-cols-2 gap-6 ${
                aboutVisible ? 'stagger-animation' : ''
              }`}
            >
              {/* Area 1 - HR Focus */}
              <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col gap-3 h-full card-hover glow-effect">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-500 flex-shrink-0 icon-bounce">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-800">
                  HR & Global Career Solutions
                </p>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  Global job connections, recruitment, and high-quality HR
                  solutions with international professionals.
                </p>
              </div>

              {/* Area 2 - Marketing Focus */}
              <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col gap-3 h-full card-hover glow-effect">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-500 flex-shrink-0 icon-bounce">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-800">
                  Strategic Marketing & Business Growth
                </p>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  Modern marketing strategies, brand enhancement, and
                  sustainable business development solutions.
                </p>
              </div>

              {/* Area 3 */}
              <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col gap-3 h-full card-hover glow-effect">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-100 text-green-500 flex-shrink-0 icon-bounce">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.332 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-800">
                  Education & Language Training
                </p>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  IELTS, TOEFL, SAT preparation courses with experienced
                  international instructors.
                </p>
              </div>

              {/* Area 4 */}
              <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex flex-col gap-3 h-full card-hover glow-effect">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-orange-100 text-orange-500 flex-shrink-0 icon-bounce">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                  </svg>
                </div>
                <p className="font-semibold text-gray-800">
                  Immigration & Settlement Services
                </p>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow">
                  Comprehensive consulting for study abroad, work, and
                  immigration to the US & Canada with transparent processes.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div
              className={`${aboutVisible ? 'animate-bounce-in' : 'opacity-0'}`}
              style={{ animationDelay: '1.2s' }}
            >
              <a
                href={`${props.config.seo.url}/#booking`}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-full shadow-xl hover:scale-105 transition-transform duration-300 glow-effect gradient-border"
              >
                🚀 Get Free Consultation Now
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Help Section with Enhanced Animations */}
      <div
        ref={helpRef}
        className={`mx-auto max-w-screen-lg py-12 md:py-20 relative my-6 transition-all duration-1000 ${
          helpVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-12'
        }`}
      >
        <div
          className={`max-w-3xl mx-auto text-center pb-12 ${
            helpVisible ? 'animate-zoom-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.2s' }}
        >
          <h2 className="text-3xl font-bold text-shadow">
            TN7 Solutions
            <br />
            helps you achieve global success through study, investment, and
            skilled immigration
          </h2>
          <p className="text-xl text-gray-600">
            {/* with cost savings and quick turnaround thanks to: */}
          </p>
        </div>
        <div
          className={`max-w-sm mx-auto grid gap-6 lg:grid-cols-4 md:grid-cols-2 items-stretch md:max-w-2xl lg:max-w-none ${
            helpVisible ? 'stagger-animation' : ''
          }`}
        >
          <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-md border duration-300 ease-in-out hover:shadow-lg h-full card-hover glow-effect">
            <svg
              className="w-16 h-16 p-1 -mt-1 mb-4 flex-shrink-0 animate-pulse-slow"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <rect
                  className="fill-current text-blue-600"
                  width="64"
                  height="64"
                  rx="32"
                ></rect>
                <g strokeWidth="2">
                  <path
                    className="stroke-current text-blue-300"
                    d="M34.514 35.429l2.057 2.285h8M20.571 26.286h5.715l2.057 2.285"
                  ></path>
                  <path
                    className="stroke-current text-white"
                    d="M20.571 37.714h5.715L36.57 26.286h8"
                  ></path>
                  <path
                    className="stroke-current text-blue-300"
                    strokeLinecap="square"
                    d="M41.143 34.286l3.428 3.428-3.428 3.429"
                  ></path>
                  <path
                    className="stroke-current text-white"
                    strokeLinecap="square"
                    d="M41.143 29.714l3.428-3.428-3.428-3.429"
                  ></path>
                </g>
              </g>
            </svg>
            <h4 className="text-xl font-bold leading-snug tracking-tight mb-3 text-center">
              Expert Legal Team
            </h4>
            <p className="text-gray-600 text-center text-base leading-relaxed flex-grow">
              You will be supported by our team of immigration lawyers from the
              US and Canada
            </p>
          </div>
          <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-md border duration-300 ease-in-out hover:shadow-lg h-full card-hover glow-effect">
            <svg
              className="w-16 h-16 p-1 -mt-1 mb-4 flex-shrink-0 animate-pulse-slow"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              style={{ animationDelay: '0.5s' }}
            >
              <g fill="none" fillRule="evenodd">
                <rect
                  className="fill-current text-blue-600"
                  width="64"
                  height="64"
                  rx="32"
                ></rect>
                <g strokeWidth="2" transform="translate(19.429 20.571)">
                  <circle
                    className="stroke-current text-white"
                    strokeLinecap="square"
                    cx="12.571"
                    cy="12.571"
                    r="1.143"
                  ></circle>
                  <path
                    className="stroke-current text-white"
                    d="M19.153 23.267c3.59-2.213 5.99-6.169 5.99-10.696C25.143 5.63 19.514 0 12.57 0 5.63 0 0 5.629 0 12.571c0 4.527 2.4 8.483 5.99 10.696"
                  ></path>
                  <path
                    className="stroke-current text-blue-300"
                    d="M16.161 18.406a6.848 6.848 0 003.268-5.835 6.857 6.857 0 00-6.858-6.857 6.857 6.857 0 00-6.857 6.857 6.848 6.848 0 003.268 5.835"
                  ></path>
                </g>
              </g>
            </svg>
            <h4 className="text-xl font-bold leading-snug tracking-tight mb-3 text-center">
              Professional Advisors
            </h4>
            <p className="text-gray-600 text-center text-base leading-relaxed flex-grow">
              From top-tier universities and companies in the US and Canada
            </p>
          </div>
          <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-md border duration-300 ease-in-out hover:shadow-lg h-full card-hover glow-effect">
            <svg
              className="w-16 h-16 p-1 -mt-1 mb-4 flex-shrink-0 animate-pulse-slow"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              style={{ animationDelay: '1s' }}
            >
              <g fill="none" fillRule="evenodd">
                <rect
                  className="fill-current text-blue-600"
                  width="64"
                  height="64"
                  rx="32"
                ></rect>
                <g strokeWidth="2">
                  <path
                    className="stroke-current text-blue-300"
                    d="M34.743 29.714L36.57 32 27.43 43.429H24M24 20.571h3.429l1.828 2.286"
                  ></path>
                  <path
                    className="stroke-current text-white"
                    strokeLinecap="square"
                    d="M34.743 41.143l1.828 2.286H40M40 20.571h-3.429L27.43 32l1.828 2.286"
                  ></path>
                  <path
                    className="stroke-current text-blue-300"
                    d="M36.571 32H40"
                  ></path>
                  <path
                    className="stroke-current text-white"
                    d="M24 32h3.429"
                    strokeLinecap="square"
                  ></path>
                </g>
              </g>
            </svg>
            <h4 className="text-xl font-bold leading-snug tracking-tight mb-3 text-center">
              Comprehensive Consulting
            </h4>
            <p className="text-gray-600 text-center text-base leading-relaxed flex-grow">
              Complete skill preparation from application submission to
              interview process.
            </p>
          </div>
          <div className="relative flex flex-col items-center p-6 bg-white rounded shadow-md border duration-300 ease-in-out hover:shadow-lg h-full card-hover glow-effect">
            <svg
              className="w-16 h-16 p-1 -mt-1 mb-4 flex-shrink-0 animate-pulse-slow"
              viewBox="0 0 64 64"
              xmlns="http://www.w3.org/2000/svg"
              style={{ animationDelay: '1.5s' }}
            >
              <g fill="none" fillRule="evenodd">
                <rect
                  className="fill-current text-blue-600"
                  width="64"
                  height="64"
                  rx="32"
                ></rect>
                <g strokeWidth="2">
                  <path
                    className="stroke-current text-white"
                    d="M32 37.714A5.714 5.714 0 0037.714 32a5.714 5.714 0 005.715 5.714"
                  ></path>
                  <path
                    className="stroke-current text-white"
                    d="M32 37.714a5.714 5.714 0 015.714 5.715 5.714 5.714 0 015.715-5.715M20.571 26.286a5.714 5.714 0 005.715-5.715A5.714 5.714 0 0032 26.286"
                  ></path>
                  <path
                    className="stroke-current text-white"
                    d="M20.571 26.286A5.714 5.714 0 0126.286 32 5.714 5.714 0 0132 26.286"
                  ></path>
                  <path
                    className="stroke-current text-blue-300"
                    d="M21.714 40h4.572M24 37.714v4.572M37.714 24h4.572M40 21.714v4.572"
                    strokeLinecap="square"
                  ></path>
                </g>
              </g>
            </svg>
            <h4 className="text-xl font-bold leading-snug tracking-tight mb-3 text-center">
              Seamless Settlement
            </h4>
            <p className="text-gray-600 text-center text-base leading-relaxed flex-grow">
              Support services for housing, schooling, transportation, and all
              issues that arise during the settlement process
            </p>
          </div>
        </div>
      </div>

      {/* Booking Section with Enhanced Animations */}
      <div
        ref={bookingRef}
        id="booking"
        className={`md:pt-20 my-6 transition-all duration-1000 ${
          bookingVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-12'
        }`}
      >
        <div className="relative bg-gray-900 py-8 px-4 md:py-20 md:px-8 shadow-2xl overflow-hidden glow-effect">
          <div
            className={`mx-auto max-w-screen-lg relative transition-all duration-1000 ${
              bookingVisible ? 'animate-scale-in' : 'opacity-0'
            }`}
            style={{ animationDelay: '0.3s' }}
          >
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div
                className={`text-center lg:text-left ${
                  bookingVisible ? 'animate-fade-in-left' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.5s' }}
              >
                <img
                  src="/logo_light.png"
                  className="mx-auto lg:mx-0 h-16 md:h-20 mb-4 animate-pulse-slow"
                  alt="TN7 Solutions logo"
                />
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[#ff5603] text-shadow">
                  Dedicated and completely free consultation
                </h3>
                <p className="text-gray-300 text-base md:text-lg mb-6 leading-relaxed">
                  Our team of lawyers and immigration experts is always ready to
                  provide initial profile consultation to help you save time and
                  costs.
                </p>
              </div>

              {/* Right Contact Form */}
              <div
                className={`${
                  bookingVisible ? 'animate-fade-in-right' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.7s' }}
              >
                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-2xl p-6 md:p-8 border border-white border-opacity-20">
                  <h4 className="text-xl font-bold text-white mb-6 text-center">
                    Contact Us
                  </h4>
                  <Booking />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Blogs Section with Enhanced Animations */}
      <div
        ref={blogsRef}
        className={`relative mx-auto max-w-screen-lg py-12 md:py-20 max-w-6xl my-6 transition-all duration-1000 ${
          blogsVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-12'
        }`}
      >
        <h4
          className={`text-3xl font-bold leading-snug tracking-tight mb-1 text-center text-shadow ${
            blogsVisible ? 'animate-bounce-in' : 'opacity-0'
          }`}
          style={{ animationDelay: '0.2s' }}
        ></h4>
        <div
          className={`pt-20 max-w-screen-lg mx-auto grid justify-center grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ${
            blogsVisible ? 'stagger-animation' : ''
          }`}
        >
          {props.blogs.map((blog, index) => (
            <Link
              href="/blogs/[slug]"
              as={`/blogs/${blog.slug}`}
              key={blog.slug}
              legacyBehavior
            >
              <a
                rel="noopener noreferrer"
                className="rounded max-w-sm mx-auto group hover:text hover:no-underline focus:no-underline shadow-md duration-300 ease-in-out hover:shadow-xl card-hover glow-effect"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <img
                  role="presentation"
                  alt="blog"
                  className="object-cover w-full rounded h-44 dark:bg-gray-500 transition-transform duration-300 group-hover:scale-105"
                  src={imageKitExtract(blog.image)?.url ?? ''}
                />
                <div className="p-6 space-y-2">
                  <h3 className="text-xl font-semibold group-hover:text-[#d94e38] transition-colors duration-300">
                    {blog.title}
                  </h3>
                  <span className="text-xs dark:text-gray-600">
                    {format(parseDateString(blog.date), 'LLL d, yyyy')}
                  </span>
                  <p className="text-base text-gray-700">{blog.description}</p>
                </div>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps<IhomeProps> = async () => {
  const config = getDataConfig();
  const posts = config.blogs.slugs
    .map((slug) =>
      getPostBySlug({ slug }, ['slug', 'title', 'description', 'date', 'image'])
    )
    .filter((p) => p !== null);
  return {
    props: {
      config,
      blogs: posts,
    },
  };
};

export default Home;
