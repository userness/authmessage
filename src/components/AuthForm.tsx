import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Loader } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface AuthFormProps {
  onAuth: (username: string) => void;
}

export function AuthForm({ onAuth }: AuthFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setIsLoading(true);
    try {
      // Simplified auth - just validate username format
      if (username.length < 3) {
        throw new Error('Username must be at least 3 characters long');
      }
      
      if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
        throw new Error('Username can only contain letters, numbers, underscores, and hyphens');
      }

      onAuth(username);
      toast.success('Welcome to the chat!');
    } catch (error) {
      console.error('Auth error:', error);
      toast.error(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md w-full mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-100"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">
        Join the Chat
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Choose a Username
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your username"
            required
            minLength={3}
            maxLength={20}
            pattern="[a-zA-Z0-9_-]+"
            title="Username can only contain letters, numbers, underscores, and hyphens"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn btn-primary flex items-center justify-center space-x-2"
        >
          {isLoading ? (
            <Loader className="w-5 h-5 animate-spin" />
          ) : (
            <LogIn className="w-5 h-5" />
          )}
          <span>Join Chat</span>
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        No account needed - just pick a username and start chatting!
      </p>
    </motion.div>
  );
}