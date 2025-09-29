import React from 'react';

import type { GetServerSideProps } from 'next';

import { IBlogGalleryProps, BlogGallery } from '../../../blog/BlogGallery';
import { Meta } from '../../../layout/Meta';
import { IPaginationProps } from '../../../pagination/Pagination';
import { Main } from '../../../templates/Main';
import {
  getCategory,
  getDataConfig,
  getPostsByCategory,
} from '../../../utils/Content';

const paginationSize = 20;

type IPostUrl = {
  slug: string;
};

const BlogsByCategory = (props: IBlogGalleryProps) => {
  return (
    <Main
      config={props.config}
      meta={
        <Meta
          title="Giải pháp định cư Canada hoặc Hoa Kỳ qua du học hoặc đầu tư"
          description={props.config.header.description ?? ''}
          config={props.config}
        />
      }
    >
      <BlogGallery
        title={props.title}
        description={props.description ?? ''}
        posts={props.posts}
        pagination={props.pagination}
        config={props.config}
      />
    </Main>
  );
};

export const getServerSideProps: GetServerSideProps<
  IBlogGalleryProps,
  IPostUrl
> = async ({ params }) => {
  const cat = getCategory(params!.slug);

  if (!cat) {
    return {
      notFound: true,
    };
  }

  const posts = getPostsByCategory(params!.slug, [
    'title',
    'date',
    'slug',
    'image',
    'description',
  ]);

  const pagination: IPaginationProps = {};
  const config = getDataConfig();

  if (posts.length > paginationSize) {
    pagination.next = '/?page=2';
  }

  return {
    props: {
      title: cat.name ?? '',
      description: cat.description ?? '',
      posts: posts.slice(0, paginationSize),
      pagination,
      config,
    },
  };
};

export default BlogsByCategory;
