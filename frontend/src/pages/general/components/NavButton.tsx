import React from 'react';
import { Link } from 'react-router-dom';

interface NavButtonProps {
  text: string;
  to: string;
}

const NavButton: React.FC<NavButtonProps> = ({ text, to }) => {
  return (
    <div className="relative group py-4">
      <Link
        to={to}
        className="text-white text-3xl md:text-4xl font-bold relative z-10 transition-colors duration-300 hover:text-yellow-400 pl-8"
      >
        {text}
      </Link>
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-y-0 right-0 w-0 bg-black group-hover:w-full transition-all duration-500 ease-in-out"></div>
        <div className="absolute inset-y-0 right-0 w-0 border-t-8 border-yellow-400 group-hover:w-full transition-all duration-500 ease-in-out delay-100"></div>
        </div>
     </div>
  );
};

export default NavButton;
