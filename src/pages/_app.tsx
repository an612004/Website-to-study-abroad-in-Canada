import React from 'react';

import type { AppProps } from 'next/app';
import { appWithTranslation } from 'next-i18next';

import '../styles/main.css';
import '../styles/prism-a11y-dark.css';
import 'react-quill/dist/quill.snow.css';
import 'suneditor/dist/css/suneditor.min.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />;
};

export default appWithTranslation(MyApp);
