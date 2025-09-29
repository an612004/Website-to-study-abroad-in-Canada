import React from 'react';

import { GetServerSideProps } from 'next';

const admin = () => {
  return <div>admin</div>;
};

export default admin;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  // Redirect to another page
  res.writeHead(302, { Location: '/admin/dashboard' });
  res.end();

  return {
    props: {}, // You must return an empty object here
  };
};
