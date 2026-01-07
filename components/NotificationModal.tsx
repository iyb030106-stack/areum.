import React, { useState } from 'react';
import { X, Mail, CheckCircle2 } from 'lucide-react';

interface NotificationModalProps {
  onClose: () => void;
}

const NotificationModal: React.FC<NotificationModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('이메일을 입력해주세요.');
      return;
    }

    if (!validateEmail(email)) {
      setError('정확한 이메일 형식을 입력해주세요.');
      return;
    }

    // Success simulation
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white border border-stone-200 rounded-2xl w-full max-w-md p-8 shadow-2xl transform transition-all">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 transition-colors"
        >
          <X size={24} />
        </button>

        {!isSubmitted ? (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-orange-200">
              <Mail className="text-orange-500 w-8 h-8" />
            </div>

            <h3 className="text-2xl font-bold text-stone-800 mb-2">
              아름의 소식 받기
            </h3>
            <p className="text-stone-500 mb-8 leading-relaxed">
              이메일을 입력하고 아름의 최신 소식을<br/>
              가장 빠르게 받아보세요.
            </p>

            <form className="w-full space-y-4" onSubmit={handleSubmit}>
              <div className="text-left space-y-1">
                <input 
                  type="text" 
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="example@email.com" 
                  className={`w-full bg-stone-50 border ${error ? 'border-red-400 focus:border-red-400' : 'border-stone-200 focus:border-orange-400'} rounded-xl py-3 px-4 text-stone-800 focus:outline-none transition-colors placeholder:text-stone-400`}
                />
                {error && (
                  <p className="text-red-500 text-xs ml-1">{error}</p>
                )}
              </div>
              <button 
                type="submit"
                className="w-full bg-stone-800 text-white font-bold py-3 rounded-xl hover:bg-stone-900 transition-colors"
              >
                알림 신청하기
              </button>
            </form>
          </div>
        ) : (
          <div className="flex flex-col items-center text-center py-6 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6 ring-1 ring-green-200">
              <CheckCircle2 className="text-green-500 w-8 h-8" />
            </div>
            
            <h3 className="text-2xl font-bold text-stone-800 mb-3">
              감사합니다.
            </h3>
            <p className="text-stone-500 mb-8 leading-relaxed">
              알림 신청이 완료되었습니다.<br/>
              곧 좋은 소식으로 찾아뵙겠습니다.
            </p>
            
            <button 
              onClick={onClose}
              className="w-full bg-stone-100 text-stone-800 font-medium py-3 rounded-xl hover:bg-stone-200 transition-colors border border-stone-200"
            >
              닫기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationModal;