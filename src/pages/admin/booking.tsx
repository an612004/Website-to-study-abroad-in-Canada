import React from 'react';

import AdminPanel from '../../admin/components/AdminPanel';
import BookingPanel from '../../admin/components/BookingPanel';

const blog = () => {
  return (
    <AdminPanel>
      <BookingPanel></BookingPanel>
    </AdminPanel>
  );
};

export default blog;
