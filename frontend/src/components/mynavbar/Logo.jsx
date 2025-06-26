








// Logo.jsx - Responsive Version
import React from 'react';

const Logo = ({ 
  width = 120, 
  height = 36, 
  className = "",
  responsive = true 
}) => {
  // Style untuk responsive
  const responsiveStyle = responsive ? {
    width: '100%',
    height: 'auto',
    maxWidth: `${width}px`,
    maxHeight: `${height}px`
  } : {
    width: `${width}px`,
    height: `${height}px`
  };

  return (
    <svg 
      viewBox="0 0 200 60" 
      xmlns="http://www.w3.org/2000/svg" 
      style={responsiveStyle}
      className={className}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Gradient untuk background */}
        <linearGradient id="mainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#ff6b6b", stopOpacity:1}} />
          <stop offset="30%" style={{stopColor:"#4ecdc4", stopOpacity:1}} />
          <stop offset="70%" style={{stopColor:"#45b7d1", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#96ceb4", stopOpacity:1}} />
        </linearGradient>
        
        {/* Gradient untuk teks */}
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{stopColor:"#2c3e50", stopOpacity:1}} />
          <stop offset="100%" style={{stopColor:"#34495e", stopOpacity:1}} />
        </linearGradient>
        
        {/* Gradient untuk ikon */}
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{stopColor:"#ffffff", stopOpacity:0.9}} />
          <stop offset="100%" style={{stopColor:"#f1c40f", stopOpacity:0.8}} />
        </linearGradient>
        
        {/* Shadow filter */}
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodColor="#00000030"/>
        </filter>
        
        {/* Glow effect */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Background dengan bentuk rounded rectangle */}
      <rect x="10" y="10" width="180" height="40" rx="20" ry="20" 
            fill="url(#mainGradient)" 
            filter="url(#shadow)"/>
      
      {/* Ikon shopping di dalam background - posisi kiri */}
      <g transform="translate(25, 20)" opacity="0.3">
        {/* Cart base */}
        <path d="M2 8 L16 8 L15 18 C15 19 14 20 13 20 L5 20 C4 20 3 19 3 18 L2 8 Z" 
              fill="url(#iconGradient)"/>
        
        {/* Cart handle */}
        <path d="M6 8 L6 6 C6 4 7 3 9 3 C11 3 12 4 12 6 L12 8" 
              fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
        
        {/* Modern details */}
        <circle cx="7" cy="15" r="1" fill="#ffffff"/>
        <circle cx="11" cy="15" r="1" fill="#ffffff"/>
      </g>
      
      {/* Ikon shopping di dalam background - posisi kanan */}
      <g transform="translate(155, 20)" opacity="0.2">
        {/* Cart base */}
        <path d="M2 8 L16 8 L15 18 C15 19 14 20 13 20 L5 20 C4 20 3 19 3 18 L2 8 Z" 
              fill="url(#iconGradient)"/>
        
        {/* Cart handle */}
        <path d="M6 8 L6 6 C6 4 7 3 9 3 C11 3 12 4 12 6 L12 8" 
              fill="none" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"/>
        
        {/* Modern details */}
        <circle cx="7" cy="15" r="1" fill="#ffffff"/>
        <circle cx="11" cy="15" r="1" fill="#ffffff"/>
      </g>
      
      {/* Text "OkYaKu" dengan style modern - di tengah */}
      <g transform="translate(100, 30)">
        <text x="-30" y="8" fontFamily="Helvetica, Arial, sans-serif" fontSize="18" fontWeight="900" fill="#ffffff" textAnchor="middle" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
          Ok
        </text>
        <text x="0" y="8" fontFamily="Helvetica, Arial, sans-serif" fontSize="18" fontWeight="900" fill="#f1c40f" textAnchor="middle" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
          Ya
        </text>
        <text x="30" y="8" fontFamily="Helvetica, Arial, sans-serif" fontSize="18" fontWeight="900" fill="#ffffff" textAnchor="middle" style={{textShadow: '1px 1px 2px rgba(0,0,0,0.5)'}}>
          Ku
        </text>
      </g>
      
      {/* Decorative dots dengan animasi halus */}
      <circle cx="45" cy="35" r="1.5" fill="#ffffff" opacity="0.4">
        <animate attributeName="opacity" values="0.2;0.6;0.2" dur="3s" repeatCount="indefinite"/>
      </circle>
      
      <circle cx="155" cy="25" r="1" fill="#f1c40f" opacity="0.5">
        <animate attributeName="r" values="0.5;1.5;0.5" dur="2.5s" repeatCount="indefinite"/>
      </circle>
      
      <circle cx="50" cy="25" r="1" fill="#ffffff" opacity="0.3">
        <animate attributeName="opacity" values="0.1;0.5;0.1" dur="2s" repeatCount="indefinite"/>
      </circle>
    </svg>
  );
};

export default Logo;