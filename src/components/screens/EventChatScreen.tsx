import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ArrowLeft, Send, Image as ImageIcon, Users, Sparkles, Info } from 'lucide-react';

export const EventChatScreen: React.FC = () => {
  const { goBack, chatMessages, sendChatMessage, navigateTo } = useApp();
  const [inputText, setInputText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendChatMessage(inputText);
    setInputText('');
  };

  return (
    <div className="flex-1 bg-[#13141a] text-white flex flex-col justify-between h-[750px] relative">
      {/* Top Chat Header */}
      <div className="p-3 bg-[#181924] border-b border-[#25283a] flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            onClick={goBack}
            className="w-8 h-8 rounded-full bg-[#202230] border border-[#2b2e40] flex items-center justify-center text-gray-300 hover:text-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h3 className="text-xs font-bold text-white leading-tight">
              Midnight Vinyl & Tapas
            </h3>
            <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span>32 attendees online</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => navigateTo('event_detail')}
          className="p-1.5 rounded-xl bg-[#202230] text-gray-400 hover:text-white"
          title="View Event Details"
        >
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Pinned Host Notice */}
      <div className="bg-purple-950/40 border-b border-purple-500/20 px-3 py-1.5 flex items-center justify-between text-[10px] text-purple-300">
        <div className="flex items-center gap-1.5 truncate">
          <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0" />
          <span className="truncate">Valet available on B1 & B2. Flash your QR pass at the gate.</span>
        </div>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5">
        {chatMessages.map((msg) => {
          const isMe = msg.isCurrentUser;
          return (
            <div
              key={msg.id}
              className={`flex gap-2.5 max-w-[85%] ${isMe ? 'ml-auto flex-row-reverse' : ''}`}
            >
              {!isMe && (
                <img
                  src={msg.senderAvatar}
                  alt={msg.senderName}
                  className="w-7 h-7 rounded-full object-cover shrink-0 mt-0.5 border border-[#2b2e40]"
                />
              )}

              <div className={`space-y-1 ${isMe ? 'items-end' : ''}`}>
                <div className="flex items-center gap-1.5 text-[10px]">
                  <span className={`font-semibold ${isMe ? 'text-purple-300' : 'text-gray-300'}`}>
                    {msg.senderName}
                  </span>
                  {msg.isHost && (
                    <span className="px-1.5 py-0.2 rounded text-[8px] font-bold bg-pink-500/20 text-pink-300 border border-pink-500/30">
                      HOST
                    </span>
                  )}
                  <span className="text-gray-500 font-mono text-[9px]">{msg.timestamp}</span>
                </div>

                <div
                  className={`p-3 rounded-2xl text-xs leading-relaxed shadow-sm ${
                    isMe
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none'
                      : 'bg-[#1e202e] border border-[#2c2f42] text-gray-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Message Input Bar */}
      <form
        onSubmit={handleSend}
        className="p-3 bg-[#181924] border-t border-[#25283a] flex items-center gap-2 shrink-0"
      >
        <button
          type="button"
          onClick={() => alert('Photo upload simulated')}
          className="p-2 rounded-xl bg-[#202230] hover:bg-[#282a3c] text-gray-400 hover:text-white transition"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Send a message to attendees..."
          className="flex-1 bg-[#12131b] border border-[#27293b] rounded-2xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-purple-500 font-medium"
        />

        <button
          type="submit"
          className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:brightness-110 active:scale-95 transition shadow-md shadow-purple-600/30"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

