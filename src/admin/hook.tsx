'use client';

import React from 'react';

import { JWTPayload } from 'jose';
import Cookies from 'universal-cookie';

import { verifyJwtToken } from './auth';

export function useAuth() {
  const [auth, setAuth] = React.useState<JWTPayload | null>(null);

  const getVerifiedtoken = async () => {
    const cookies = new Cookies();
    const token = cookies.get('token') ?? null;
    const verifiedToken = await verifyJwtToken(token);
    setAuth(verifiedToken);
  };
  React.useEffect(() => {
    getVerifiedtoken();
  }, []);
  return auth;
}
