import React from 'react';

import AdminPanel from '../../admin/components/AdminPanel';
import SiteSettings from '../../admin/components/SiteSettings';

const setting = () => {
  return (
    <AdminPanel>
      <SiteSettings></SiteSettings>
    </AdminPanel>
  );
};

export default setting;
