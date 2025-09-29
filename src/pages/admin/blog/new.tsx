import { GetServerSideProps } from 'next';

import BlogEditor2 from '../../../admin/components/BlogEditor2';
import { getAllCategories } from '../../../utils/Content';

interface IProps {
  listCategory: { [key: string]: string }[];
}

const blogCreating = (props: IProps) => {
  return (
    <BlogEditor2
      title=""
      description=""
      content=""
      slug="new"
      listCategory={props.listCategory}
    ></BlogEditor2>
  );
};

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const listCategory = getAllCategories();
  return {
    props: {
      listCategory,
    },
  };
};

export default blogCreating;
