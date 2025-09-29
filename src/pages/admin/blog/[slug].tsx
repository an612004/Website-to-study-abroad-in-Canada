import React from 'react';

import { GetServerSideProps } from 'next';

import BlogEditor2 from '../../../admin/components/BlogEditor2';
import {
  getAllCategories,
  getPostBySlug,
  IPostEditorProps,
} from '../../../utils/Content';

type IPostUrl = {
  slug: string;
};

const blogEditing = (props: IPostEditorProps) => {
  return <BlogEditor2 {...props}></BlogEditor2>;
};

export const getServerSideProps: GetServerSideProps<
  IPostEditorProps,
  IPostUrl
> = async ({ params }) => {
  const post = getPostBySlug(
    { slug: params!.slug },
    [
      'title',
      'description',
      'date',
      'modified_date',
      'image',
      'content',
      'slug',
      'status',
    ],
    false
  );

  const listCategory = getAllCategories();

  if (!post) {
    return {
      notFound: true,
    };
  }

  let props: IPostEditorProps = {
    listCategory,
    title: post?.title ?? '',
    description: post?.description ?? '',
    date: post?.date ?? '',
    modified_date: post?.modified_date ?? '',
    image: post?.image ?? '',
    content: post?.content ?? '',
    slug: params?.slug ?? '',
    status: parseInt(post?.status ?? '0', 2),
  };

  if (post?.category) props = { ...props, category: post?.category };

  return {
    props,
  };
};

export default blogEditing;
