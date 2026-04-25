import { motion, AnimatePresence } from 'framer-motion';
import { X, Minimize2, Maximize2 } from 'lucide-react';
import { useState } from 'react';
import './DesktopWindow.css';

interface DesktopWindowProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const DesktopWindow = ({ isOpen, onClose, title, children, icon }: DesktopWindowProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ 
            opacity: 1, 
            scale: isMinimized ? 0.5 : 1, 
            y: isMinimized ? window.innerHeight : 0,
            width: isMaximized ? '100vw' : '90vw',
            height: isMaximized ? '100vh' : '85vh',
            x: isMaximized ? 0 : undefined,
            top: isMaximized ? 0 : undefined,
            left: isMaximized ? 0 : undefined
          }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="desktop-window cursor-target"
          style={{
            position: 'fixed',
            top: '5%',
            left: '5%',
            zIndex: 1000,
            maxWidth: isMaximized ? '100vw' : '1400px',
            borderRadius: isMaximized ? 0 : undefined
          }}
        >
          {/* Window Header */}
          <div className="window-header">
            <div className="window-title-area">
              {icon && <div className="window-icon">{icon}</div>}
              <span className="window-title font-mono">{title}</span>
            </div>
            
            <div className="window-controls">
              <button 
                onClick={() => setIsMinimized(!isMinimized)}
                className="window-control-btn minimize cursor-target"
                title="Minimize"
              >
                <Minimize2 size={16} />
              </button>
              <button 
                onClick={() => setIsMaximized(!isMaximized)}
                className="window-control-btn maximize cursor-target"
                title={isMaximized ? "Restore" : "Maximize"}
              >
                <Maximize2 size={16} />
              </button>
              <button 
                onClick={onClose}
                className="window-control-btn close cursor-target"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Window Content */}
          <div className="window-content">
            {children}
          </div>

          {/* Scanline Effect */}
          <div className="scanline" style={{ pointerEvents: 'none' }}></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DesktopWindow;

