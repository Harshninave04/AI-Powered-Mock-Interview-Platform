'use client';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAIModal';
import { LoaderCircle, BriefcaseBusiness, FileText, Clock, ArrowRight } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@clerk/nextjs';
import moment from 'moment';
import { useRouter } from 'next/navigation';

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [jobExperience, setJobExperience] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formError, setFormError] = useState('');
  const { user } = useUser();
  const router = useRouter();

  const validateForm = () => {
    if (!jobPosition || jobPosition.trim() === '') {
      setFormError('Please enter a job position');
      return false;
    }
    if (!jobDesc || jobDesc.trim() === '') {
      setFormError('Please enter a job description');
      return false;
    }
    if (!jobExperience) {
      setFormError('Please enter years of experience');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleNextStep = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  const resetForm = () => {
    setJobPosition('');
    setJobDesc('');
    setJobExperience('');
    setStep(1);
    setFormError('');
  };

  const handleCloseDialog = () => {
    resetForm();
    setOpenDialog(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const InputPrompt = `
        Job Position: ${jobPosition}, 
        Job Description: ${jobDesc}, 
        Years of Experience: ${jobExperience}. 
        Based on this information, please provide 5 interview questions with answers in JSON format, ensuring "Question" and "Answer" are fields in the JSON.
      `;

      const result = await chatSession.sendMessage(InputPrompt);
      const MockJsonResp = result.response.text().replace('```json', '').replace('```', '').trim();

      if (MockJsonResp) {
        const resp = await db
          .insert(MockInterview)
          .values({
            mockId: uuidv4(),
            jsonMockResp: MockJsonResp,
            jobPosition: jobPosition,
            jobDesc: jobDesc,
            jobExperience: jobExperience,
            createdBy: user?.primaryEmailAddress?.emailAddress,
            createdAt: moment().format('YYYY-MM-DD'),
          })
          .returning({ mockId: MockInterview.mockId });

        if (resp && resp[0]?.mockId) {
          handleCloseDialog();
          router.push('/dashboard/interview/' + resp[0].mockId);
        }
      } else {
        setFormError('Failed to generate interview questions. Please try again.');
      }
    } catch (error) {
      console.error('Error creating interview:', error);
      setFormError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Card to open dialog */}
      <div
        onClick={() => setOpenDialog(true)}
        className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 h-full hover:shadow-md hover:border-primary/30 dark:hover:border-primary/30 transition-all cursor-pointer group">
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary">
              <path d="M12 5v14"></path>
              <path d="M5 12h14"></path>
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Create New Interview
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Start a new AI-powered mock interview
          </p>
        </div>
      </div>

      {/* Dialog for creating a new interview */}
      <Dialog open={openDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6 pb-4 bg-primary/5 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-700">
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
              Create Mock Interview
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400 mt-1">
              Tell us about the job position you're interviewing for
            </DialogDescription>
          </DialogHeader>

          <div className="p-6">
            {step === 1 ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNextStep();
                }}>
                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="jobPosition"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Job Position
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BriefcaseBusiness className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="jobPosition"
                        className="pl-10"
                        placeholder="e.g. Full Stack Developer"
                        value={jobPosition}
                        onChange={(e) => setJobPosition(e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="jobDesc"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Job Description / Tech Stack
                    </label>
                    <div className="relative">
                      <div className="absolute top-3 left-3 flex items-center pointer-events-none">
                        <FileText className="h-5 w-5 text-gray-400" />
                      </div>
                      <Textarea
                        id="jobDesc"
                        className="min-h-24 pl-10 resize-none"
                        placeholder="e.g. React, Node.js, MySQL, AWS, Agile development"
                        value={jobDesc}
                        onChange={(e) => setJobDesc(e.target.value)}
                      />
                    </div>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Include key technologies, methodologies, or specific responsibilities
                    </p>
                  </div>

                  <div>
                    <label
                      htmlFor="jobExperience"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Years of Experience
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <Input
                        id="jobExperience"
                        className="pl-10"
                        type="number"
                        min="0"
                        max="50"
                        placeholder="e.g. 3"
                        value={jobExperience}
                        onChange={(e) => setJobExperience(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {formError && (
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                    <p className="text-sm text-red-600 dark:text-red-400">{formError}</p>
                  </div>
                )}

                <div className="flex justify-end gap-3 mt-6">
                  <Button type="button" variant="outline" onClick={handleCloseDialog}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                    Interview Details
                  </h3>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <BriefcaseBusiness className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">Position:</span>
                        <p className="text-gray-900 dark:text-white">{jobPosition}</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <FileText className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Description:
                        </span>
                        <p className="text-gray-900 dark:text-white">{jobDesc}</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <Clock className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          Experience:
                        </span>
                        <p className="text-gray-900 dark:text-white">{jobExperience} years</p>
                      </div>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                  <h3 className="font-medium text-blue-800 dark:text-blue-300 flex items-center">
                    <svg
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    What happens next?
                  </h3>
                  <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                    Our AI will generate 5 interview questions tailored to your job position,
                    description, and experience level. You'll be able to practice answering these
                    questions and receive feedback on your responses.
                  </p>
                </div>

                {formError && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                    <p className="text-sm text-red-600 dark:text-red-400">{formError}</p>
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={onSubmit} disabled={loading} className="min-w-32">
                    {loading ? (
                      <div className="flex items-center">
                        <LoaderCircle className="animate-spin h-4 w-4 mr-2" />
                        <span>Generating questions...</span>
                      </div>
                    ) : (
                      <span>Start Interview</span>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
