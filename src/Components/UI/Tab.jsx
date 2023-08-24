import React from "react";

const Tab = (prop) => {
  const { tabs, setSelected } = prop;
  console.log("Years are: ", tabs);
  return (
    <div>
      <select
        id="tab-select"
        class="sm:hidden py-3 px-4 pr-9 block w-full border-gray-200 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400"
        aria-label="Tabs"
        role="tablist"
      >
        {tabs &&
          tabs.map((tab, index) => (
            <option value="#hs-tab-to-select-1">{tab}</option>
          ))}
      </select>

      <div class="hidden sm:block border-b border-gray-200 dark:border-gray-700">
        <nav
          class="flex space-x-2"
          aria-label="Tabs"
          role="tablist"
          hs-data-tab-select="#tab-select"
        >
          {tabs.map((tab, index) => (
            <button
              type="button"
              class="hs-tab-active:bg-white hs-tab-active:border-b-transparent hs-tab-active:text-blue-600 dark:hs-tab-active:bg-gray-800 dark:hs-tab-active:border-b-gray-800 dark:hs-tab-active:text-white -mb-px py-3 px-4 inline-flex items-center gap-2 bg-gray-50 text-sm font-medium text-center border text-gray-500 rounded-t-lg hover:text-gray-700 dark:bg-gray-700 dark:border-gray-700 dark:text-gray-400 active"
              id="hs-tab-to-select-item-1"
              data-hs-tab="#hs-tab-to-select-1"
              aria-controls="hs-tab-to-select-1"
              role="tab"
              onClick={() => setSelected(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Tab;
