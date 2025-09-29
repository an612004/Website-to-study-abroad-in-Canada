import React from 'react';

import { SMTPClient } from 'emailjs';
import { GetServerSideProps } from 'next';

interface IProps {
  result: string;
}

const temp = ({ result }: IProps) => {
  return <div>{result}</div>;
};

export const getServerSideProps: GetServerSideProps<IProps> = async () => {
  const client = new SMTPClient({
    user: process.env.EMAIL_ADDRESS,
    password: process.env.EMAIL_PASSWORD,
    host: 'smtp.gmail.com',
    ssl: false,
    tls: true,
    port: 587,
  });
  let result = 'sent';

  try {
    const sentResult = await client.sendAsync({
      text: `Just for testing purpose 2`,
      from: process.env.EMAIL_ADDRESS!,
      to: 'hobinhan321@gmail.com',
      subject: 'testing emailjs',
    });
    // console.log('sentResult', sentResult);
    result = sentResult.text ?? '??';
  } catch (e) {
    result = `fail: ${e}`;
  }

  return {
    props: { result },
  };
};

export default temp;
