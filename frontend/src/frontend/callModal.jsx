import React from 'react';
import './styles/modal.css';

const CallModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="Callmodal-overlay">
      <div className="Callmodal-content">
        <button className="Callmodal-close" onClick={onClose}>
          &times;
        </button>
        {children}
        
      </div>
    </div>
  );
};

export default CallModal;
