'use client';
import { db } from '@/utils/db';
import { UserAnswer } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react';
import {
  ChevronDown,
  Star,
  Home,
  Award,
  HelpCircle,
  MessageSquare,
  BookOpen,
  AlertCircle,
} from 'lucide-react';

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

const Feedback = ({ params }) => {
  const router = useRouter();
  const [feedbackList, setFeedbackList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getFeedback();
  }, []);

  const getFeedback = async () => {
    try {
      setIsLoading(true);
      const result = await db
        .select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef, params.interviewId))
        .orderBy(UserAnswer.id);

      console.log(result);
      setFeedbackList(result);
    } catch (error) {
      console.error('Failed to fetch feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const overallRating = useMemo(() => {
    if (feedbackList && feedbackList.length > 0) {
      const totalRating = feedbackList.reduce((sum, item) => sum + Number(item.rating), 0);
      return (totalRating / feedbackList.length).toFixed(1);
    }
    return 0;
  }, [feedbackList]);

  // Function to determine rating color class
  const getRatingColorClass = (rating) => {
    if (rating >= 8) return 'text-green-500';
    if (rating >= 5) return 'text-amber-500';
    return 'text-red-500';
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {feedbackList?.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <AlertCircle className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h2 className="font-bold text-xl text-gray-500 mb-6">
            No Interview Feedback Record Found
          </h2>
          <Button onClick={() => router.replace('/dashboard')} className="flex items-center gap-2">
            <Home size={16} />
            Go Home
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Header Section */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="bg-primary/10 p-6 border-b border-gray-100">
              <div className="flex items-center gap-3 mb-2">
                <Award className="h-8 w-8 text-primary" />
                <h2 className="text-2xl font-bold text-gray-800">Interview Feedback</h2>
              </div>
              <p className="text-gray-600">Review your performance and learn how to improve</p>
            </div>

            <div className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-700">Overall Rating</h3>
                  <div className="flex items-end mt-1">
                    <span className={`text-4xl font-bold ${getRatingColorClass(overallRating)}`}>
                      {overallRating}
                    </span>
                    <span className="text-xl text-gray-500 ml-1">/10</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-6 w-6 ${
                        star <= Math.round(overallRating / 2)
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-100 flex items-start gap-3">
                <MessageSquare className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-blue-700">
                  Below you'll find detailed feedback on each interview question. Click on any
                  question to see your answer, the correct answer, and personalized feedback.
                </p>
              </div>
            </div>
          </div>

          {/* Questions Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Question Analysis
            </h3>

            <div className="space-y-3">
              {feedbackList.map((item, index) => (
                <Collapsible
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden">
                  <CollapsibleTrigger className="p-4 bg-gray-50 hover:bg-gray-100 transition-colors text-left flex items-center justify-between w-full">
                    <div className="flex items-center gap-3 pr-2">
                      <div
                        className={`h-8 w-8 rounded-full flex items-center justify-center text-white font-medium ${getRatingColorClass(
                          item.rating,
                        )} bg-opacity-20`}>
                        {index + 1}
                      </div>
                      <p className="font-medium text-gray-800">{item.question}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getRatingColorClass(
                          item.rating,
                        )}`}>
                        {item.rating}/10
                      </span>
                      <ChevronDown className="h-5 w-5 text-gray-500 flex-shrink-0" />
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="p-4 border-t border-gray-200">
                    <div className="space-y-3">
                      <div className="bg-red-50 rounded-lg p-3 border border-red-100">
                        <h4 className="text-sm font-medium text-red-800 mb-1 flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-red-500"></div>
                          Your Answer
                        </h4>
                        <p className="text-sm text-red-700 whitespace-pre-line">{item.userAns}</p>
                      </div>

                      <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                        <h4 className="text-sm font-medium text-green-800 mb-1 flex items-center gap-1.5">
                          <div className="h-1.5 w-1.5 rounded-full bg-green-500"></div>
                          Correct Answer
                        </h4>
                        <p className="text-sm text-green-700 whitespace-pre-line">
                          {item.correctAns}
                        </p>
                      </div>

                      <div className="bg-primary/5 rounded-lg p-3 border border-primary/10">
                        <h4 className="text-sm font-medium text-primary-800 mb-1 flex items-center gap-1.5">
                          <BookOpen className="h-4 w-4 text-primary" />
                          Feedback for Improvement
                        </h4>
                        <p className="text-sm text-primary-700 whitespace-pre-line">
                          {item.feedback}
                        </p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="flex justify-center pt-4">
            <Button
              onClick={() => router.replace('/dashboard')}
              className="flex items-center gap-2 px-8">
              <Home size={16} />
              Return to Dashboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Feedback;
