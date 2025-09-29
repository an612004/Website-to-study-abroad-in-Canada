import fs from 'fs';

import { NextApiRequest, NextApiResponse } from 'next';

import { verifyJwtToken } from '../../../admin/auth';
import {
  IAppConfig,
  IAppConfigBlog,
  IAppConfigContact,
  IAppConfigFooter,
  IAppConfigHeader,
  IAppConfigNavbar,
  IAppConfigSEO,
} from '../../../utils/Content';

const SETTING_FILE = '_data/config.json';

function saveSetting(data: any) {
  const seo: IAppConfigSEO = {
    site_name: data['seo-site_name'],
    site_title: data['seo-site_title'],
    site_description: data['seo-site_description'],
    url: data['seo-url'],
    author: data['seo-author'],
  };
  const header: IAppConfigHeader = {
    title: data['header-title'],
    description: data['header-description'],
  };

  const contact: IAppConfigContact = {
    phone: data['contact-phone'],
    email: data['contact-email'],
    address1: data['contact-address1'],
    address2: data['contact-address2'],
  };

  const footer: IAppConfigFooter = {
    links: (data['footer-links'] as string)
      .split('\n')
      .map((l) => l.toString().split('||'))
      .map((l) => {
        return { name: l[1], url: l[0] };
      }),
  };

  const navbar: IAppConfigNavbar = {
    links: data['navbar-links'] as string,
    // .split('\n')
    // .map((l) => l.toString().split('||'))
    // .map((l) => {
    //   return { name: l[1], url: l[0] };
    // }),
  };

  const blogs: IAppConfigBlog = {
    slugs: (data['blogs-slugs'] as string).split('\n'),
  };
  const setting: IAppConfig = {
    seo,
    header,
    contact,
    footer,
    navbar,
    blogs,
  };
  fs.writeFileSync(SETTING_FILE, JSON.stringify(setting));
  return true;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
  const { cookies } = req;
  const token = cookies.token ?? null;
  const hasVerifiedToken = token && (await verifyJwtToken(token));
  if (!hasVerifiedToken) return res.status(403).send({ error: 'Unauthorized' });

  const data = JSON.parse(req.body);

  try {
    const status = saveSetting(data);
    if (status) return res.status(200).json({ message: 'OK' });
    return res.status(400).json({ error: 'Failed' });
  } catch (e) {
    return res.status(400).json({ error: e });
  }
};

export default handler;
