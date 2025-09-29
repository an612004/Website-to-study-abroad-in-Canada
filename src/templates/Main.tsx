import React, { ReactNode } from 'react';

import Link from 'next/link';
import Script from 'next/script';

import { Navbar } from '../navigation/Navbar';
import Messenger from '../svg/Messenger';
import { IAppConfig } from '../utils/Content';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
  config: IAppConfig;
};

const Main = (props: IMainProps) => {
  return (
    <div className="antialiased w-full relative">
      <style jsx global>{`
        .footer-gradient {
          background: linear-gradient(
            135deg,
            #1e293b 0%,
            #334155 50%,
            #475569 100%
          );
        }

        .footer-pattern {
          background-image: radial-gradient(
            circle at 2px 2px,
            rgba(255, 255, 255, 0.1) 1px,
            transparent 0
          );
          background-size: 30px 30px;
        }

        .glass-footer {
          background: rgba(15, 23, 42, 0.95);
          backdrop-filter: blur(10px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-link {
          color: #cbd5e1;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          padding: 0.25rem 0;
        }

        .footer-link:hover {
          color: #60a5fa;
          transform: translateX(4px);
        }

        .footer-link::before {
          content: '';
          position: absolute;
          width: 0;
          height: 2px;
          bottom: 0;
          left: 0;
          background: linear-gradient(90deg, #60a5fa, #3b82f6);
          transition: width 0.3s ease;
        }

        .footer-link:hover::before {
          width: 100%;
        }

        .contact-item {
          display: flex;
          align-items: flex-start;
          margin-bottom: 0.75rem;
          transition: all 0.3s ease;
        }

        .contact-item:hover {
          transform: translateX(4px);
        }

        .contact-icon {
          width: 20px;
          height: 20px;
          margin-right: 12px;
          margin-top: 2px;
          flex-shrink: 0;
          color: #60a5fa;
        }

        .social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .social-icon:hover {
          background: rgba(96, 165, 250, 0.2);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(96, 165, 250, 0.3);
        }

        .messenger-floating {
          background: linear-gradient(135deg, #0084ff 0%, #0066cc 100%);
          box-shadow: 0 8px 32px rgba(0, 132, 255, 0.3);
          transition: all 0.3s ease;
        }

        .messenger-floating:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 48px rgba(0, 132, 255, 0.4);
        }

        .logo-glow {
          filter: drop-shadow(0 4px 12px rgba(96, 165, 250, 0.3));
          transition: all 0.3s ease;
        }

        .logo-glow:hover {
          filter: drop-shadow(0 8px 24px rgba(96, 165, 250, 0.5));
          transform: scale(1.05);
        }

        .gradient-text {
          background: linear-gradient(
            135deg,
            #60a5fa 0%,
            #3b82f6 50%,
            #1d4ed8 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .edu-link {
          background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
          color: white;
          padding: 12px 24px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
        }

        .edu-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(245, 158, 11, 0.4);
          background: linear-gradient(135deg, #d97706 0%, #b45309 100%);
        }

        .section-divider {
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          margin: 2rem 0;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-4px);
          }
        }

        .floating-animation {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <Navbar config={props.config}></Navbar>

      <div className="w-full text-gray-700 px-3 md:px-0">
        {props.meta}
        <div className="mx-auto">
          <div className="text-xl">{props.children}</div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="footer-gradient footer-pattern text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 floating-animation"></div>
          <div
            className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 floating-animation"
            style={{ animationDelay: '1.5s' }}
          ></div>
        </div>

        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Company Info */}
            <div className="text-center lg:text-left">
              <img
                src="/tn7_logo.png"
                className="h-16 mb-6 mx-auto lg:mx-0 logo-glow"
                alt="TN7 Solutions Logo"
              />
              <h3 className="text-xl font-bold mb-4 gradient-text">
                TN7 Solutions
              </h3>
              <p className="text-slate-300 leading-relaxed mb-6">
                Canada & USA Immigration Solutions <br />
                <span className="text-blue-300">
                  through Study Abroad or Investment
                </span>
              </p>

              {/* TN7EDU Link */}
              <Link
                href="https://tn7edu.com"
                target="_blank"
                rel="noopener noreferrer"
                className="edu-link"
              >
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
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.332 18.477 18.746 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
                Visit TN7EDU Platform
              </Link>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-xl font-bold mb-6 gradient-text">
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="contact-item">
                  <svg
                    className="contact-icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-black mb-2">
                      Head Office:
                    </p>
                    <p className="text-black leading-relaxed">
                      Tầng 8, số 19 Cao Thắng,
                      <br />
                      Phường Bàn Cờ, TP. Hồ Chí Minh
                    </p>
                  </div>
                </div>

                <div className="contact-item">
                  <svg
                    className="contact-icon"
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
                  <div>
                    <p className="font-semibold text-black mb-2">
                      Branch Office:
                    </p>
                    <p className="text-black leading-relaxed">
                      20 Đường số 43,
                      <br />
                      Phường Bình Thuận, TP.HCM
                    </p>
                  </div>
                </div>

                <div className="contact-item">
                  <svg
                    className="contact-icon"
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
                  <div>
                    <p className="font-semibold text-black mb-3">Phone:</p>
                    <p className="text-black mb-3">
                      {props.config.contact.phone}
                    </p>
                  </div>
                </div>

                <div className="contact-item">
                  <svg
                    className="contact-icon"
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
                  <div>
                    <p className="font-semibold text-black mb-3">Email:</p>
                    <p className="text-black mb-3">
                      {props.config.contact.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 gradient-text">
                Quick Links
              </h3>
              <div className="space-y-3 text-black">
                {props.config.footer.links.map(({ name, url }) => (
                  <Link key={name} href={url} className="footer-link block">
                    {name}
                  </Link>
                ))}
              </div>

              <div className="section-divider"></div>

              {/* Social Media */}
              <div>
                <h4 className="text-lg font-semibold mb-4 text-blue-600 mb-3">
                  Follow Us
                </h4>
                <div className="flex gap-4">
                  <a
                    href="https://www.facebook.com/groups/dinhcunhanhgon"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    title="Facebook Group"
                  >
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/TN7Solutions/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    title="Facebook Fanpage"
                  >
                    <svg
                      className="w-5 h-5 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="section-divider mt-12"></div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <a
                href="//www.dmca.com/Protection/Status.aspx?ID=efbc5d8a-2a2c-4902-b40e-86ddbb56eb15"
                title="DMCA.com Protection Status"
                className="dmca-badge transition-transform hover:scale-105"
              >
                <img
                  src="https://images.dmca.com/Badges/dmca_protected_sml_120m.png?ID=efbc5d8a-2a2c-4902-b40e-86ddbb56eb15"
                  alt="DMCA.com Protection Status"
                  className="h-10"
                />
              </a>
              <Script
                id="dmca-script"
                src="https://images.dmca.com/Badges/DMCABadgeHelper.min.js"
              />
            </div>

            <div className="text-center md:text-right">
              <p className="text-slate-400">
                © Copyright {new Date().getFullYear()}{' '}
                <span className="gradient-text font-semibold">
                  {props.config.seo.site_name}
                </span>
                . All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Enhanced Messenger Button */}
      <a
        className="messenger-floating fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center cursor-pointer z-50"
        href="https://m.me/161702587034414"
        target="_blank"
        rel="noreferrer"
        title="Chat with us on Messenger"
      >
        <Messenger className="w-10 h-10 fill-current text-white" />
      </a>
    </div>
  );
};

export { Main };
