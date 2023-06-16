// import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
// import { faFan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import "./css/navbar.css";
// import { iconName } from "@heroicons/react/24/outline";
import { AtSymbolIcon } from '@heroicons/react/24/solid';
import UserInfo from '../UI/UserInfo';
import logo from '../../assets/fabicon.svg';

import React from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="shadow-md shadow-slate-300 fixed border-gray-700 p-3 bg-cyan-900 text-cyan-100  w-full z-50 h-min">
      <div className="flex flex-row justify-between pl-4">
        <a href="" onClick={() => window.location.reload()}>
          <div className="flex gap-1 justify-center content-center  border-gray-700">
            <img src={logo} className="w-8 h-8" />
            <span className="text-2xl font-bold text-slate-200">UERS</span>
          </div>
        </a>
        <div className="flex gap-2 text-md pr-4 text-slate-100">
          <a
            href=""
            className="duration-200 transition-all hover:text-slate-900 flex justify-center items-center px-4 hover:bg-slate-200 rounded-md"
          >
            About
          </a>
          <a
            href="https://github.com/Md-Kais/CUERS-New#getting-started"
            className="duration-200 transition-all bg-transparent hover:text-slate-900 hover:bg-slate-200 flex justify-center items-center px-4 rounded-md"
            target="_blank"
          >
            Help
          </a>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
