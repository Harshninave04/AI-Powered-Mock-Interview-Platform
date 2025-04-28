import { UserButton } from '@clerk/nextjs';
import React from 'react';
import AddNewInterview from './_components/AddNewInterview';
import InterviewList from './_components/InterviewList';
import { FaRegLightbulb, FaHistory } from 'react-icons/fa';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <FaRegLightbulb className="text-primary h-5 w-5" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Create and manage your AI Mock Interviews to prepare for your next job opportunity
          </p>
        </div>

        {/* Create New Interview Section */}
        <div className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AddNewInterview />
          </div>
        </div>

        {/* Previous Interviews Section */}
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-6">
            <FaHistory className="text-gray-500 dark:text-gray-400 h-5 w-5" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              Previous Mock Interviews
            </h2>
          </div>
          <InterviewList />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
