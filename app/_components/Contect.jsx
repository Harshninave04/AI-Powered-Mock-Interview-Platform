'use client';
import { db } from '@/utils/db';
import { Newsletter } from '@/utils/schema';
import { LoaderCircle } from 'lucide-react';
import moment from 'moment';
import React, { useState } from 'react';
import { toast } from 'sonner';

const Contact = () => {
  const handleInputChange = (setState) => (e) => {
    setState(e.target.value);
  };
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();

    console.log(name, email, message);

    if (name && email && message) {
      setLoading(true);
      try {
        const resp = await db.insert(Newsletter).values({
          newName: name,
          newEmail: email,
          newMessage: message,
          createdAt: moment().format('YYYY-MM-DD'),
        });

        if (resp) {
          toast('User Response recorded successfully');
          setName('');
          setEmail('');
          setMessage('');
        } else {
          toast('Error recording response');
        }
      } catch (error) {
        console.error(error);
        toast('Error recording response');
      } finally {
        setLoading(false);
      }
    } else {
      toast('No data entered');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-light text-gray-900 mb-3">Get In Touch</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Have any questions? We'll get back to you soon.
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleInputChange(setName)}
              className="w-full px-0 py-3 text-gray-900 placeholder-gray-400 bg-transparent border-0 border-b border-gray-200 focus:border-gray-900 focus:outline-none transition-colors duration-200"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={handleInputChange(setEmail)}
              className="w-full px-0 py-3 text-gray-900 placeholder-gray-400 bg-transparent border-0 border-b border-gray-200 focus:border-gray-900 focus:outline-none transition-colors duration-200"
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={handleInputChange(setMessage)}
              rows="4"
              className="w-full px-0 py-3 text-gray-900 placeholder-gray-400 bg-transparent border-0 border-b border-gray-200 focus:border-gray-900 focus:outline-none transition-colors duration-200 resize-none"
            />
          </div>

          <div className="pt-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 transition-colors duration-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2">
              {loading ? <LoaderCircle className="w-4 h-4 mx-auto animate-spin" /> : 'Send Message'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
