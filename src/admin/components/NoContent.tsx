import React from 'react';

const NoContent = (props: { animated: boolean }) => {
  const { animated } = props;
  return (
    <div className="w-full">
      <div
        className={`mx-auto mt-32 py-10 border rounded shadow-md w-60 sm:w-80 dark:bg-gray-800${
          animated && ' animate-pulse'
        }`}
      >
        <div className="flex p-4 space-x-4 sm:px-8">
          <div className="flex-shrink-0 w-16 h-16 rounded-full dark:bg-gray-400"></div>
          <div className="flex-1 py-2 space-y-4">
            <div className="w-full h-3 rounded dark:bg-gray-400"></div>
            <div className="w-5/6 h-3 rounded dark:bg-gray-400"></div>
          </div>
        </div>
        <div className="p-4 space-y-4 sm:px-8">
          <div className="w-full h-4 rounded dark:bg-gray-400"></div>
          <div className="w-full h-4 rounded dark:bg-gray-400"></div>
          <div className="w-3/4 h-4 rounded dark:bg-gray-400"></div>
        </div>
        <p className="text-center text-gray-600">No content</p>
      </div>
    </div>
  );
};

export default NoContent;
