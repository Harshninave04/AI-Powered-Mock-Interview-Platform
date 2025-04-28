'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { ModeToggle } from '@/components/ModeToggle';
import Link from 'next/link';
import { motion } from 'framer-motion';

const Header = ({ logo }) => {
  const [isUserButtonLoaded, setUserButtonLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const path = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const SkeletonLoader = () => (
    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setUserButtonLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Questions', path: '/dashboard/question' },
    { name: 'Upgrade', path: '/dashboard/upgrade' },
    { name: 'How it works?', path: '/dashboard/howit' },
  ];

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/dashboard" className="mr-6">
              {logo && (
                <div className="relative w-12 h-12 overflow-hidden">
                  <Image
                    src={logo}
                    width={48}
                    height={48}
                    alt="AI Mock Interview Logo"
                    className="object-contain"
                  />
                </div>
              )}
            </Link>

            <nav className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <span
                    className={`text-sm font-medium relative py-2 px-1 transition-colors ${
                      path === item.path
                        ? 'text-primary dark:text-primary-400'
                        : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }`}>
                    {item.name}
                    {path === item.path && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary dark:bg-primary-400 rounded-full"></span>
                    )}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <ModeToggle />
            <div className="relative">
              {isUserButtonLoaded ? <UserButton afterSignOutUrl="/" /> : <SkeletonLoader />}
            </div>

            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-md text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-primary">
              <span className="sr-only">Toggle menu</span>
              {isOpen ? (
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
          <nav className="px-4 py-3 space-y-3">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <div
                  className={`block py-2 px-3 rounded-md text-sm font-medium ${
                    path === item.path
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setIsOpen(false)}>
                  {item.name}
                </div>
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
