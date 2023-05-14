import {
  ArrowLeftOnRectangleIcon,
  RectangleStackIcon,
  ClipboardIcon,
  HashtagIcon,
} from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import Buttoncmp from '../UI/Buttoncmp';
import Chairman from './Chairman/Chairman';
import Table from '../UI/Table';
import CEC from './CEC/CEC';
import FillActivityBill from './Chairman/FillActivityBill';
import Tablenew from '../UI/Tablenew';
import ManageEvaluators from './Chairman/ManageEvaluators';
import { Route, Routes, useNavigate } from 'react-router';
import { Outlet } from 'react-router';
import { DashboardContent } from '../Dashboard/DashboardContent';
import i18n from 'i18next';
import { useTranslation, initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import UserInfo from '../UI/UserInfo';
i18n
  .use(Backend) // passes i18n down to react-i18next
  .use(initReactI18next)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    lng: 'bn', // if you're using a language detector, do not define the lng option
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    backend: {
      loadPath: '../../locales/{{lng}}/bn.json',
    },
  });
const menus = [
  {
    person: 'Chairman',
    activity: [
      { menuText: 'Manage evaluators', route: 'manage-evaluators' },
      { menuText: 'Exam committee info', route: 'form-exam-committee' },
      { menuText: 'Manage activity bill', route: 'fill-activity-bill' },
    ],
  },
  {
    person: 'Chairman of exam committee',
    activity: [
      {
        menuText: 'Manage course activity',
        route: 'evaluates-course-activity',
      },
      {
        menuText: 'Manage semester activity',
        route: 'manage-semester-activity',
      },
      { menuText: 'Manage edit requests', route: 'manage-edit-requests' },
      { menuText: 'Generate activity PDF', route: 'generate-activity-pdf' },
    ],
  },
  {
    person: 'Evaluator',
    activity: [
      { menuText: 'View Bill forms', route: 'view-bill-form' },
      {
        menuText: 'Generate bill pdf',
        route: 'generate-bill-pdf',
      },
    ],
  },
];

const Dashboard = (prop) => {
  const { t } = useTranslation();
  const { userInfo, showStatus } = prop;
  const [active, setActive] = useState('');
  const onLogOut = () => {
    sessionStorage.clear(); //Delete Login Data from session. So that, user need to verify after logout.
    navigate('/login');
  };

  //Button added for Sidebar when you clicked the sidebar button. And Check the user.
  const clickme = (activity, e) => {
    console.log(activity, window.location.pathname);
    // CEC
    setActive(`${activity.route}`);
    if (window.location.pathname.includes('cec')) {
      navigate(`/dashboard/cec/${activity.route}`);
    } else if (window.location.pathname.includes('chairman')) {
      navigate(`/dashboard/chairman/${activity.route}`);
    } else if (window.location.pathname.includes('evaluator')) {
      navigate(`/dashboard/evaluator/${activity.route}`);
    } else if (window.location.pathname.includes('evaluator')) {
      navigate(`/dashboard/evaluator/${activity.route}`);
    }
  };

  const navigate = useNavigate();

  const Cactivity = menus.filter(
    (menu) => menu.person.toLowerCase() === sessionStorage.role.toLowerCase()
  );

  //checking purpose
  console.log(sessionStorage.getItem('role'));
  console.log(sessionStorage.getItem('evaluator_id'));
  console.log(sessionStorage.getItem('password'));
  return (
    <div className="flex w-full h-full justify-start">
      <div className="flex-none">
        <div className="bg-slate-200 w-72 h-full grid grid-cols-1 content-between  px-4 pb-4 pt-20 border-r-2 z-30 border-slate-300">
          <div className="flex-col">
            {Cactivity.map((person, pIndex) => {
              let activity = person.activity;

              return activity.map((option, cindex) => {
                return (
                  <div className="mb-3" key={pIndex + cindex}>
                    <Buttoncmp
                      label={t(option.menuText)}
                      variant="stsi"
                      size="full"
                      value={t(option.menuText)}
                      onClick={() => clickme(option)}
                      isActive={active === option.route}
                    >
                      <HashtagIcon></HashtagIcon>
                    </Buttoncmp>
                  </div>
                );
              });
            })}
          </div>
          <div className="flex-col h-min space-y-4">
            <div className="">
              <UserInfo></UserInfo>
            </div>
            <div className="">
              <Buttoncmp
                label="Log out"
                onClick={onLogOut}
                variant="dasi"
                size="full"
              >
                <ArrowLeftOnRectangleIcon></ArrowLeftOnRectangleIcon>
              </Buttoncmp>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 px-16 h-full overflow-auto pt-10">
        <div className="w-full h-full">
          {' '}
          <DashboardContent>
            <Outlet></Outlet>
            <div className="p-52"></div>
          </DashboardContent>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
