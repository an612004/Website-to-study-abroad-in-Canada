import React, { useState } from 'react';

import BotCatPanel from './BlogCatPanel';
import BlogPostPanel from './BlogPostPanel';

enum Tabs {
  Cat,
  Post,
}

const BlogPanel = () => {
  const [currentTab, setCurrentTab] = useState(Tabs.Cat);
  return (
    <div className="w-full px-20 py-10 overflow-y-scroll max-h-screen">
      <div className="bg-white">
        <nav className="flex flex-col sm:flex-row">
          {[
            { type: Tabs.Cat, title: 'Categories' },
            { type: Tabs.Post, title: 'Posts' },
          ].map((t) => (
            <button
              key={t.title}
              onClick={() => setCurrentTab(t.type)}
              className={`text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none ${
                currentTab === t.type
                  ? ' text-blue-500 border-b-2 font-medium border-blue-500'
                  : ''
              }`}
            >
              {t.title}
            </button>
          ))}
        </nav>
      </div>
      {currentTab === Tabs.Cat && <BotCatPanel></BotCatPanel>}
      {currentTab === Tabs.Post && <BlogPostPanel></BlogPostPanel>}
    </div>
  );
};

export default BlogPanel;
