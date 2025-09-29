/* eslint-disable no-console */
import { SignJWT } from 'jose';
import type { NextApiRequest, NextApiResponse } from 'next';

import { getJwtSecretKey } from '../../admin/auth';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  console.log('🔍 API /login called with method:', req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    console.log('📝 Request body type:', typeof req.body);
    console.log('📝 Request body content:', req.body);

    let body;
    if (typeof req.body === 'string') {
      body = JSON.parse(req.body);
    } else {
      body = req.body;
    }

    const { username, password } = body;

    // 🔍 FULL DEBUG
    console.log('================== LOGIN DEBUG ==================');
    console.log('✅ Environment variables check:');
    console.log('  - ADMIN_PASSWORD exists:', !!process.env.ADMIN_PASSWORD);
    console.log(
      '  - ADMIN_PASSWORD value:',
      JSON.stringify(process.env.ADMIN_PASSWORD)
    );
    console.log('  - JWT_SECRET exists:', !!process.env.JWT_SECRET);
    console.log('📝 Received data:');
    console.log('  - Username:', JSON.stringify(username));
    console.log('  - Password:', JSON.stringify(password));
    console.log('🔍 Comparison:');
    console.log('  - Username match:', username === 'admin');
    console.log('  - Password match:', password === process.env.ADMIN_PASSWORD);
    console.log(
      '  - Both match:',
      username === 'admin' && password === process.env.ADMIN_PASSWORD
    );
    console.log('=================================================');

    // Validation
    if (!username || !password) {
      console.log('❌ Validation failed: Missing username or password');
      return res
        .status(400)
        .json({ error: 'Username and password are required' });
    }

    if (!process.env.ADMIN_PASSWORD) {
      console.error('❌ ADMIN_PASSWORD environment variable is not set');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    // Check JWT secret - ✅ Sửa lỗi unused variable
    try {
      getJwtSecretKey(); // Chỉ call function để verify
      console.log('✅ JWT Secret key loaded successfully');
    } catch (jwtError) {
      console.error('❌ JWT Secret key error:', jwtError);
      return res.status(500).json({ error: 'JWT configuration error' });
    }

    if (username === 'admin' && password === process.env.ADMIN_PASSWORD) {
      console.log('🎉 Credentials match! Creating JWT...');

      try {
        const token = await new SignJWT({
          username,
          iat: Math.floor(Date.now() / 1000),
        })
          .setProtectedHeader({ alg: 'HS256' })
          .setIssuedAt()
          .setExpirationTime('4h')
          .sign(getJwtSecretKey());

        console.log('✅ JWT token created successfully');

        res.setHeader('Set-Cookie', [
          `token=${token}; HttpOnly; Path=/; Max-Age=14400; SameSite=Strict${
            process.env.NODE_ENV === 'production' ? '; Secure' : ''
          }`,
        ]);

        console.log('✅ Login successful for user:', username);
        return res.status(200).json({ success: true });
      } catch (jwtError) {
        console.error('❌ JWT creation failed:', jwtError);
        return res.status(500).json({ error: 'Token creation failed' });
      }
    } else {
      console.log('❌ Login failed: credentials mismatch');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    // ✅ Sửa lỗi TypeScript 'unknown' type
    const error = err as Error;
    console.error('❌ Login API error:', error);
    console.error('❌ Error stack:', error.stack);
    return res
      .status(500)
      .json({ error: 'Internal server error', details: error.message });
  }
}
