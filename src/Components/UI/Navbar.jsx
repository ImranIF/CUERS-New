// import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
// import { faFan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import "./css/navbar.css";
// import { iconName } from "@heroicons/react/24/outline";
import { AtSymbolIcon } from '@heroicons/react/24/solid';
import UserInfo from '../UI/UserInfo';

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed border-gray-700 p-3 bg-cyan-900 text-cyan-100  w-full z-50 h-min">
      <div className="flex flex-row justify-between pl-4">
        <a href="" onClick={() => window.location.reload()}>
          <div className="flex gap-1 justify-center content-center  border-gray-700">
            <AtSymbolIcon className="h-8 w-8 text-cyan-400"></AtSymbolIcon>
            <span className="text-2xl font-bold text-slate-200">CUERS</span>
          </div>
        </a>
        <div className="flex gap-8 text-md pr-4 text-slate-100">
          <a href="" className="hover:text-slate-300">
            About
          </a>
          <a href="" className="hover:text-slate-300">
            Help
          </a>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
