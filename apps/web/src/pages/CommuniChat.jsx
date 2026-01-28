import { useState } from 'react';
import { Send, Mic, Hand, Volume2 } from 'lucide-react';
import { cn } from '@utils/helpers';

export default function CommuniChat() {
  const [messages, setMessages] = useState([
    { id: 1, type: 'system', text: 'Welcome to CommuniChat! Start a conversation using voice, text, or sign language.' },
  ]);
  const [inputText, setInputText] = useState('');
  const [inputMode, setInputMode] = useState('text');

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage = {
      id: Date.now(),
      type: 'user',
      mode: inputMode,
      text: inputText,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputText('');

    // Simulate response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          type: 'assistant',
          text: `Message received: "${inputText}"`,
          timestamp: new Date().toLocaleTimeString(),
        },
      ]);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">CommuniChat</h1>
        <p className="text-gray-600 dark:text-gray-400">
          Multi-modal conversation for everyone
        </p>
      </div>

      <div className="card h-[600px] flex flex-col">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex',
                message.type === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] rounded-2xl px-4 py-3',
                  message.type === 'user'
                    ? 'bg-primary-600 text-white rounded-br-md'
                    : message.type === 'system'
                    ? 'bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-gray-400 text-center w-full'
                    : 'bg-gray-200 dark:bg-dark-card text-gray-900 dark:text-white rounded-bl-md'
                )}
              >
                <p>{message.text}</p>
                {message.timestamp && (
                  <p className={cn(
                    'text-xs mt-1',
                    message.type === 'user' ? 'text-primary-200' : 'text-gray-400'
                  )}>
                    {message.timestamp}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Input Mode Selector */}
        <div className="px-4 py-2 border-t border-light-border dark:border-dark-border">
          <div className="flex justify-center gap-2">
            {[
              { mode: 'text', icon: Send, label: 'Text' },
              { mode: 'voice', icon: Mic, label: 'Voice' },
              { mode: 'sign', icon: Hand, label: 'Sign' },
            ].map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setInputMode(mode)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                  inputMode === mode
                    ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-dark-card'
                )}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-light-border dark:border-dark-border">
          {inputMode === 'text' && (
            <div className="flex gap-3">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder="Type your message..."
                className="input flex-1"
              />
              <button
                onClick={sendMessage}
                disabled={!inputText.trim()}
                className="btn btn-primary"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          )}

          {inputMode === 'voice' && (
            <div className="text-center py-4">
              <button className="w-16 h-16 rounded-full bg-primary-600 hover:bg-primary-700 text-white flex items-center justify-center mx-auto">
                <Mic className="w-8 h-8" />
              </button>
              <p className="text-sm text-gray-500 mt-2">Click to start speaking</p>
            </div>
          )}

          {inputMode === 'sign' && (
            <div className="text-center py-4">
              <button className="w-16 h-16 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center mx-auto">
                <Hand className="w-8 h-8" />
              </button>
              <p className="text-sm text-gray-500 mt-2">Click to open camera for sign input</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}