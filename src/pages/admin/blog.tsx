import React from 'react';

import AdminPanel from '../../admin/components/AdminPanel';
import BlogPanel from '../../admin/components/BlogPanel';

// interface IProps {
//   url: string;
// }

const blog = () => {
  return (
    <AdminPanel>
      <BlogPanel></BlogPanel>
    </AdminPanel>
  );
};

// export const getServerSideProps: GetServerSideProps<IProps> = async () => {
//   const config = getDataConfig();
//   return {
//     props: {
//       url: config.seo.url,
//     },
//   };
// };

export default blog;
