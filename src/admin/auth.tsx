import { jwtVerify } from 'jose';

export function getJwtSecretKey(): Uint8Array {
  const secret =
    process.env.JWT_SECRET ||
    process.env.NEXT_PUBLIC_JWT_SECRET_KEY ||
    'default-development-secret-key-32-characters-long-12345';

  if (!secret || secret.length < 32) {
    throw new Error(`JWT Secret key is too short: ${secret.length} characters`);
  }

  return new TextEncoder().encode(secret);
}

// ✅ THÊM FUNCTION NÀY
export async function verifyJwtToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, getJwtSecretKey());
    return payload;
  } catch (error) {
    console.error('JWT verification failed:', error);
    return null;
  }
}
