import React from 'react';

import { format } from 'date-fns';

const BlogCard = (props: {
  title: string;
  date: string;
  shortContent: string;
}) => {
  const { title, date, shortContent } = props;
  return (
    <a className="rounded max-w-sm mx-auto group hover:no-underline focus:no-underline shadow-md duration-300 ease-in-out hover:shadow-xl">
      <img
        role="presentation"
        className="object-cover w-full rounded h-44 dark:bg-gray-500"
        src="https://source.unsplash.com/random/480x360?1"
        alt="blog"
      />
      <div className="p-6 space-y-2">
        <h3 className="text-xl font-semibold group-hover:underline group-focus:underline">
          {title}
        </h3>
        <span className="text-xs dark:text-gray-400">
          {format(new Date(date), 'LLL d, yyyy')}
        </span>
        <p className="text-base text-gray-700">{shortContent}</p>
      </div>
    </a>
  );
};

// BlogCard.propTypes = {}

export default BlogCard;
