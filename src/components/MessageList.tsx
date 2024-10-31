import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Clock } from 'lucide-react';
import type { Message } from '../lib/supabase';

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="flex flex-col space-y-6 py-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-start space-x-4 px-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="flex items-center space-x-2">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                <div className="h-3 bg-gray-200 rounded w-16 animate-pulse" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <MessageCircle className="w-12 h-12 mb-4 animate-bounce" />
        <p className="text-lg font-medium">No messages yet</p>
        <p className="text-sm mt-2">Be the first to start the conversation!</p>
      </div>
    );
  }

  return (
    <div className="space-y-1 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
      <AnimatePresence initial={false}>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="group px-4 py-2 hover:bg-gray-50 transition-colors rounded-lg"
          >
            <div className="flex items-start space-x-3">
              <img
                src={message.avatar_url}
                alt={message.user_name}
                className="w-10 h-10 rounded-full object-cover ring-2 ring-white"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://ui-avatars.com/api/?name=${message.user_name}&background=random`;
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-semibold text-gray-900">
                    {message.user_name}
                  </span>
                  <span className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {formatTimestamp(message.created_at)}
                  </span>
                </div>
                <p className="mt-1 text-gray-800 break-words">
                  {message.content}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}