import React from 'react';

interface AnimatedBackgroundProps {
  children: React.ReactNode;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ children }) => {
  return (
    <>
      <style>
        {`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            100% { background-position: 100% 50%; }
          }
          .animate-gradient {
            animation: gradient 24s linear infinite;
            background-size: 400% 400%;
          }
        `}
      </style>
      <div
        className="flex items-center justify-center min-h-screen animate-gradient"
        style={{
          background: `
            linear-gradient(135deg,
              rgba(255, 215, 0, 0.1),
              rgba(255, 255, 255, 0.25),
              rgba(255, 215, 0, 0.1)
            ),
            radial-gradient(circle at 10% 20%, rgba(255, 215, 0, 0.2) 2px, transparent 2px),
            radial-gradient(circle at 90% 80%, rgba(0, 0, 0, 0.1) 2px, transparent 2px),
            radial-gradient(circle at 50% 40%, rgba(255, 215, 0, 0.2) 1.5px, transparent 1.5px)
          `,
          backgroundSize: '70px 70px, 400% 400%'
        }}
      >
        {children}
      </div>
    </>
  );
};

export default AnimatedBackground;
