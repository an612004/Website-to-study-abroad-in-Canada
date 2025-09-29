import React from 'react';

import { GetServerSideProps } from 'next';

import { BlogGallery, IBlogGalleryProps } from '../blog/BlogGallery';
import { Meta } from '../layout/Meta';
import { IPaginationProps } from '../pagination/Pagination';
import { Main } from '../templates/Main';
import { getAllPosts, getDataConfig } from '../utils/Content';
import { convertTo2D } from '../utils/Pagination';

type IPageUrl = {
  page: string;
};
const paginationSize = 10;

const PaginatePosts = (props: IBlogGalleryProps) => (
  <Main
    config={props.config}
    meta={
      <Meta
        title={props.config.header.title}
        description={props.config.header.description}
        config={props.config}
      />
    }
  >
    <BlogGallery
      posts={props.posts}
      pagination={props.pagination}
      config={props.config}
      title={''}
      description={''}
    />
  </Main>
);

export const getServerSideProps: GetServerSideProps<
  IBlogGalleryProps,
  IPageUrl
> = async ({ params }) => {
  const posts = getAllPosts(['title', 'date', 'slug', 'image']);
  const config = getDataConfig();
  const pages = convertTo2D(posts, paginationSize);
  const currentPage = Number(params!.page.replace('page-', ''));
  if (
    Number.isNaN(currentPage) ||
    currentPage < 0 ||
    currentPage >= pages.length
  ) {
    return {
      notFound: true,
    };
  }
  const currentIndex = currentPage - 1;

  const pagination: IPaginationProps = {};

  if (currentPage < pages.length) {
    pagination.next = `page-${currentPage + 1}`;
  }

  if (currentPage - 1 >= 1) {
    pagination.previous = `page-${currentPage - 1}`;
  }

  return {
    props: {
      posts: pages[currentIndex].filter((p) => p !== null),
      pagination,
      config,
      title: '',
      description: '',
    },
  };
};

export default PaginatePosts;
