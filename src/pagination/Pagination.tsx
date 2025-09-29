import React from 'react';

import Link from 'next/link';

import { convertUrlToLinkHref } from '../utils/Pagination';

export type IPaginationProps = {
  previous?: string;
  next?: string;
};

const Pagination = (props: IPaginationProps) => (
  <div className="my-20 max-w-screen-lg mx-auto text-sm flex justify-between">
    {props.previous && (
      <div className="text-left ml-auto bg-blue-600">
        <Link
          href={convertUrlToLinkHref(props.previous)}
          as={props.previous}
          className="text-white bg-blue-600 px-4 py-3 rounded"
        >
          ← Newer Posts
        </Link>
      </div>
    )}

    {props.next && (
      <div className="text-right ml-auto">
        <Link
          href={convertUrlToLinkHref(props.next)}
          as={props.next}
          className="text-white bg-blue-600 px-4 py-3 rounded"
        >
          Older Posts →
        </Link>
      </div>
    )}
  </div>
);

export { Pagination };
