import React from 'react';

import AdminPanel from '../../admin/components/AdminPanel';
import NoContent from '../../admin/components/NoContent';

const panel = () => {
  return (
    <AdminPanel>
      <NoContent animated={false}></NoContent>
    </AdminPanel>
  );
};

export default panel;
