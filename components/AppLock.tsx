import React, { useState, useEffect } from 'react';
import { Lock, AlertCircle, Delete } from 'lucide-react';

interface AppLockProps {
  onUnlock: () => void;
}

export const AppLock: React.FC<AppLockProps> = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const CORRECT_PIN = '2025'; // Default PIN

  // Handle PIN validation
  useEffect(() => {
    if (pin.length === 4) {
      if (pin === CORRECT_PIN) {
        // Small delay for visual feedback before unlocking
        setTimeout(() => {
             onUnlock();
        }, 100);
      } else {
        setError(true);
        setShake(true);
        // Reset shake animation
        setTimeout(() => setShake(false), 500);
        // Clear pin after error
        setTimeout(() => {
          setPin('');
          setError(false);
        }, 600);
      }
    }
  }, [pin, onUnlock]);

  // Handle Keyboard Input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (error) return;

      if (e.key >= '0' && e.key <= '9') {
        if (pin.length < 4) {
          setPin(prev => prev + e.key);
        }
      } else if (e.key === 'Backspace') {
        setPin(prev => prev.slice(0, -1));
        setError(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin, error]);

  const handleNumberClick = (num: string) => {
    if (pin.length < 4 && !error) {
      setPin(prev => prev + num);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
    setError(false);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 relative overflow-hidden font-sans selection:bg-indigo-500/30">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
         <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-indigo-900/10 rounded-full blur-[100px] animate-pulse"></div>
         <div className="absolute bottom-[10%] left-[10%] w-[300px] h-[300px] bg-neutral-900/20 rounded-full blur-[80px]"></div>
      </div>

      <div className="w-full max-w-sm z-10">
        <div style={{ animation: shake ? 'shake 0.4s cubic-bezier(.36,.07,.19,.97) both' : 'none' }}>
             
             {/* Header Icon */}
             <div className="flex flex-col items-center mb-10">
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg ring-1 ring-white/5 transition-all duration-300 ${error ? 'bg-red-900/20 ring-red-500/50' : 'bg-neutral-800'}`}>
                 {error ? <AlertCircle className="w-8 h-8 text-red-500" /> : <Lock className="w-8 h-8 text-indigo-500" />}
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">System Locked</h2>
              <p className="text-neutral-500 text-sm mt-2">Enter security PIN to access command center</p>
            </div>

            {/* PIN Dots */}
            <div className="flex justify-center gap-6 mb-10">
              {[0, 1, 2, 3].map((i) => (
                <div 
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    pin.length > i 
                      ? 'bg-indigo-500 scale-125 shadow-[0_0_15px_rgba(99,102,241,0.5)]' 
                      : 'bg-neutral-800 ring-1 ring-neutral-700'
                  } ${error ? '!bg-red-500 !shadow-[0_0_15px_rgba(239,68,68,0.5)]' : ''}`}
                />
              ))}
            </div>

            {/* Numeric Keypad */}
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                <button
                  key={num}
                  onClick={() => handleNumberClick(num.toString())}
                  className="h-20 rounded-2xl text-2xl font-light text-neutral-300 hover:bg-neutral-800/50 hover:text-white transition-all active:scale-95 active:bg-neutral-800"
                >
                  {num}
                </button>
              ))}
              <div className="h-20 flex items-center justify-center">
                 {/* Empty slot layout */}
              </div>
              <button
                onClick={() => handleNumberClick('0')}
                className="h-20 rounded-2xl text-2xl font-light text-neutral-300 hover:bg-neutral-800/50 hover:text-white transition-all active:scale-95 active:bg-neutral-800"
              >
                0
              </button>
              <button 
                 onClick={handleBackspace}
                 className="h-20 flex items-center justify-center text-neutral-500 hover:text-white transition-colors active:scale-95"
              >
                 <Delete className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mt-12 text-center opacity-0 hover:opacity-100 transition-opacity duration-500">
                <p className="text-[10px] text-neutral-800 mt-1">Default PIN: 2025</p>
            </div>
        </div>
      </div>
      
      <style>{`
        @keyframes shake {
          10%, 90% { transform: translate3d(-1px, 0, 0); }
          20%, 80% { transform: translate3d(2px, 0, 0); }
          30%, 50%, 70% { transform: translate3d(-4px, 0, 0); }
          40%, 60% { transform: translate3d(4px, 0, 0); }
        }
      `}</style>
    </div>
  );
};
