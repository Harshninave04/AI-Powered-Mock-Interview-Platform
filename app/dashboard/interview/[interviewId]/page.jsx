'use client';

import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, Video, VideoOff } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import Webcam from 'react-webcam';
import Link from 'next/link';
import { useContext } from 'react';
import { WebCamContext } from '../../layout';

const Interview = ({ params }) => {
  const { webCamEnabled, setWebCamEnabled } = useContext(WebCamContext);
  const [interviewData, setInterviewData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log(params.interviewId);
    getInterviewDetails();
  }, [params.interviewId]);

  const getInterviewDetails = async () => {
    try {
      setIsLoading(true);
      const result = await db
        .select()
        .from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId));

      setInterviewData(result[0]);
    } catch (error) {
      console.error('Failed to fetch interview details:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 rounded-full border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-black to-purple-600 px-6 py-8 text-white">
          <h1 className="text-3xl font-bold mb-2">Let's Get Started</h1>
          <p className="text-blue-100">Prepare for your upcoming interview with our mock session</p>
        </div>

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Interview Details */}
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                  Interview Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium text-gray-700">Job Position</h3>
                    <p className="text-gray-800 mt-1">
                      {interviewData?.jobPosition || 'Not specified'}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700">Job Description/Stack</h3>
                    <p className="text-gray-800 mt-1">
                      {interviewData?.jobDesc || 'Not specified'}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700">Years of Experience</h3>
                    <p className="text-gray-800 mt-1">
                      {interviewData?.jobExperience || 'Not specified'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-6">
                <div className="flex items-start gap-3">
                  <Lightbulb className="text-blue-600 flex-shrink-0 mt-1" size={20} />
                  <div>
                    <h2 className="text-xl font-semibold mb-2 text-gray-800">Information</h2>
                    <p className="text-gray-700">
                      {process.env.NEXT_PUBLIC_INFORMATION ||
                        'Prepare thoughtful answers and showcase your experience. Remember to be specific with examples from your past work.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Webcam Section */}
            <div className="flex flex-col items-center justify-between space-y-4">
              <div className="w-full bg-gray-100 rounded-lg overflow-hidden aspect-video flex items-center justify-center">
                {webCamEnabled ? (
                  <Webcam
                    audio={false}
                    screenshotFormat="image/jpeg"
                    onUserMedia={() => setWebCamEnabled(true)}
                    onUserMediaError={() => setWebCamEnabled(false)}
                    className="w-full h-full object-cover"
                    mirrored={true}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-gray-500 p-6">
                    <VideoOff size={48} className="mb-3" />
                    <p className="text-center">Camera is currently disabled</p>
                    <p className="text-sm text-center mt-1">
                      Enable to see yourself during the interview
                    </p>
                  </div>
                )}
              </div>

              <Button
                variant="outline"
                size="lg"
                onClick={() => setWebCamEnabled((prev) => !prev)}
                className="flex items-center gap-2 w-full">
                {webCamEnabled ? (
                  <>
                    <VideoOff size={18} />
                    <span>Disable Camera</span>
                  </>
                ) : (
                  <>
                    <Video size={18} />
                    <span>Enable Camera</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Link href={'/dashboard/interview/' + params.interviewId + '/start'}>
              <Button className="bg-gradient-to-r from-black to-purple-600 hover:from-purple-700 hover:to-black text-white font-medium px-8 py-6 text-lg rounded-full shadow-md hover:shadow-lg transition-all">
                Start Interview
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
