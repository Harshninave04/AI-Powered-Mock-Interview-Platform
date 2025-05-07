import React from 'react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { Calendar, Play, FileText } from 'lucide-react';

const InterviewItemCard = ({ interview }) => {
  const router = useRouter();

  const onStart = () => {
    router.push(`/dashboard/interview/${interview?.mockId}`);
  };

  const onFeedback = () => {
    router.push(`/dashboard/interview/${interview?.mockId}/feedback`);
  };

  // Format the date to be more readable without external libraries
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();

      // Format as MM/DD/YYYY
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();

      return `${month}/${day}/${year}`;
    } catch (error) {
      return dateString || 'Unknown date';
    }
  };

  return (
    <div className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow rounded-xl overflow-hidden">
      {/* Card Header with gradient */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 border-b border-gray-100">
        <h2 className="font-bold text-lg text-gray-800">
          {interview?.jobPosition || 'Untitled Position'}
        </h2>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <div className="flex items-center text-gray-600 mb-3">
          <div className="bg-blue-50 p-1.5 rounded-full mr-2">
            <Calendar size={16} className="text-blue-600" />
          </div>
          <span className="text-sm">{formatDate(interview?.createdAt)}</span>
        </div>

        <div className="bg-gray-50 rounded-lg p-2 mb-4">
          <p className="text-sm font-medium text-gray-700">
            {interview?.jobExperience} {interview?.jobExperience === 1 ? 'Year' : 'Years'} of
            Experience
          </p>
        </div>

        {/* Card Actions */}
        <div className="flex gap-3 mt-4">
          <Button
            onClick={onFeedback}
            variant="outline"
            className="w-full flex items-center justify-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50">
            <FileText size={16} />
            <span>Feedback</span>
          </Button>

          <Button
            onClick={onStart}
            className="w-full bg-purple-600 hover:bg-gradient-to-r hover:from-black hover:to-purple-600 flex items-center justify-center gap-2">
            <Play size={16} />
            <span>Start</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterviewItemCard;
