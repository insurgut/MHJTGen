import { useEffect } from "react";

interface ToastMessageProps {
  visible: boolean;
  message: string;
  type: "success" | "accent";
  onClose: () => void;
}

export default function ToastMessage({ visible, message, type, onClose }: ToastMessageProps) {
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (visible) {
      timer = setTimeout(() => {
        onClose();
      }, 3000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [visible, onClose]);
  
  if (!visible) return null;
  
  return (
    <div 
      className={`fixed bottom-4 right-4 ${
        type === "success" ? "bg-[hsl(var(--success))]" : "bg-accent"
      } text-white px-4 py-2 rounded shadow-lg flex items-center z-50`}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 mr-2" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        {type === "success" ? (
          <path 
            fillRule="evenodd" 
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
            clipRule="evenodd" 
          />
        ) : (
          <path 
            fillRule="evenodd" 
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" 
            clipRule="evenodd" 
          />
        )}
      </svg>
      <span>{message}</span>
    </div>
  );
}
