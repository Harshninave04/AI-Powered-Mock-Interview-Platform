import { serial, text, varchar } from 'drizzle-orm/pg-core';
import { pgTable } from 'drizzle-orm/pg-core';

export const MockInterview = pgTable('mockinterview', {
  id: serial('id').primaryKey(),
  jsonMockResp: text('jsonmockresp').notNull(),
  jobPosition: varchar('jobposition').notNull(),
  jobDesc: varchar('jobdesc').notNull(),
  jobExperience: varchar('jobexperience').notNull(),
  createdBy: varchar('createdby').notNull(),
  createdAt: varchar('createdat'),
  mockId: varchar('mockid').notNull(),
});

export const Question = pgTable('question', {
  id: serial('id').primaryKey(),
  MockQuestionJsonResp: text('mockquestionjsonresp').notNull(),
  jobPosition: varchar('jobposition').notNull(),
  jobDesc: varchar('jobdesc').notNull(),
  jobExperience: varchar('jobexperience').notNull(),
  typeQuestion: varchar('typequestion').notNull(),
  company: varchar('company').notNull(),
  createdBy: varchar('createdby').notNull(),
  createdAt: varchar('createdat'),
  mockId: varchar('mockid').notNull(),
});

export const UserAnswer = pgTable('useranswer', {
  id: serial('id').primaryKey(),
  mockIdRef: varchar('mockidref').notNull(),
  question: varchar('question').notNull(),
  correctAns: text('correctans'),
  userAns: text('userans'),
  feedback: text('feedback'),
  rating: varchar('rating'),
  userEmail: varchar('useremail'),
  createdAt: varchar('createdat'),
});

export const Newsletter = pgTable('newsletter', {
  id: serial('id').primaryKey(),
  newName: varchar('newName'),
  newEmail: varchar('newEmail'),
  newMessage: text('newMessage'),
  createdAt: varchar('createdAt'),
});
