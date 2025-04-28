import React from 'react';
import { Button } from '@/components/ui/button';
import Head from 'next/head';
import Contect from './_components/Contect'; // Fixed component name typo
import Link from 'next/link';
import { FaGithub, FaLinkedin, FaRegLightbulb, FaFileAlt, FaChartBar } from 'react-icons/fa';

const page = () => {
  // Component name should be capitalized
  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100">
      <Head>
        <title>AI Mock Interview | Practice and Prepare</title>
        <meta
          name="description"
          content="Ace your next interview with AI-powered mock interviews, personalized feedback, and comprehensive performance analysis"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="min-h-screen">
        {/* Header Section */}
        <header className="w-full py-6 bg-white shadow-sm sticky top-0 z-10">
          <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
            <div className="flex items-center">
              <div className="bg-primary rounded-full p-2 mr-3">
                <FaRegLightbulb className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight bg-clip-text bg-gradient-to-r from-primary to-primary-600">
                AI Mock Interview
              </h1>
            </div>

            <nav className="flex flex-col sm:flex-row items-center mt-4 md:mt-0 space-y-4 sm:space-y-0">
              <div className="flex space-x-6 mr-8">
                <a
                  href="#features"
                  className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                  Features
                </a>
                <a
                  href="#testimonials"
                  className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                  Testimonials
                </a>
                <a
                  href="#contact"
                  className="text-sm font-medium text-gray-700 hover:text-primary transition-colors">
                  Contact
                </a>
              </div>

              <div className="flex items-center space-x-4">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/Harshninave04/AI-Powered-Mock-Interview-Platform"
                  className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                  <FaGithub className="w-5 h-5 text-gray-700" />
                </a>

                {/* <iframe
                  src="https://github.com/sponsors/modamaan/button"
                  title="Sponsor modamaan on GitHub"
                  height="32"
                  width="114"
                  className="border-0 rounded-lg"></iframe> */}
              </div>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/20 -z-10"></div>
          <div className="container mx-auto px-6 flex flex-col items-center text-center">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              Prepare with confidence
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight max-w-4xl">
              Ace Your Next Interview with AI-Powered Practice
            </h2>
            <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-2xl">
              Get realistic interview experience, immediate feedback, and personalized insights to
              help you land your dream job.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-600 text-white font-medium px-8 py-3 rounded-lg shadow-lg hover:shadow-primary/30 transition-all">
                <Link href="/dashboard">Get Started</Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 font-medium px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                <a href="#features">Learn More</a>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Features
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
                Everything You Need to Succeed
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Our comprehensive platform provides all the tools you need to prepare for your
                interviews
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="rounded-xl p-8 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center mb-6">
                  <FaRegLightbulb className="w-6 h-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Mock Interviews</h3>
                <p className="text-gray-600">
                  Experience realistic interview scenarios tailored to your industry, role, and
                  experience level.
                </p>
              </div>

              <div className="rounded-xl p-8 bg-gradient-to-br from-green-50 to-green-100 border border-green-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center mb-6">
                  <FaFileAlt className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant Feedback</h3>
                <p className="text-gray-600">
                  Receive immediate, personalized feedback on your responses to improve your
                  interview technique.
                </p>
              </div>

              <div className="rounded-xl p-8 bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center mb-6">
                  <FaChartBar className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Comprehensive Reports</h3>
                <p className="text-gray-600">
                  Track your progress with detailed performance analytics and identify areas for
                  improvement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                Testimonials
              </span>
              <h2 className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
                What Our Users Say
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Discover how our platform has helped professionals succeed in their interviews
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-xl p-8 bg-white border border-gray-100 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <span className="text-blue-600 font-medium">AJ</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Alex Johnson</h4>
                    <p className="text-sm text-gray-500">Software Engineer</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The AI mock interviews were incredibly helpful. The realistic scenarios and
                  detailed feedback helped me identify my weaknesses and improve. I felt much more
                  confident going into my real interview and landed my dream job!"
                </p>
                <div className="flex mt-4 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>

              <div className="rounded-xl p-8 bg-white border border-gray-100 shadow-md">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                    <span className="text-green-600 font-medium">SW</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Sarah Williams</h4>
                    <p className="text-sm text-gray-500">Product Manager</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  "The feedback was spot on and helped me improve my answers. The platform helped me
                  understand my strengths and weaknesses, allowing me to focus my preparation
                  accordingly. Highly recommend this service to anyone serious about interview
                  prep!"
                </p>
                <div className="flex mt-4 text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-white">
          <Contect />
        </section>
      </main>

      <footer className="py-12 bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-6 md:mb-0">
              <div className="bg-primary rounded-full p-2 mr-3">
                <FaRegLightbulb className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white">AI Mock Interview</h3>
            </div>

            <div className="flex space-x-4">
              <a
                href="https://github.com/Harshninave04/AI-Powered-Mock-Interview-Platform"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                <FaGithub className="w-5 h-5 text-white" />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                <FaLinkedin className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 AI Mock Interview. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-400 hover:text-gray-300 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default page;
