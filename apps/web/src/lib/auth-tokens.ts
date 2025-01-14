'use server'

import {cookies} from "next/headers";
import {apiUrl} from "@/lib/api-url";

export async function getAuthTokens() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');
  return {accessToken, refreshToken};
}

export async function handleTokenRefresh() {
  try {
    const {refreshToken} = await getAuthTokens();
    if (!refreshToken) throw new Error('No refresh token available');
    console.log("handle token refresh", refreshToken)
    console.log(`${apiUrl}/auth/refresh`, {refreshToken: refreshToken?.value});
    const res = await fetch(`${apiUrl}/auth/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        refreshToken: refreshToken?.value,
      }),
      credentials: 'include', // Include cookies in the request
    });
    // console.log("res after refresh token", res);

    if (!res.ok) {
      console.log("failed to refresh token");
      throw new Error(`failed to refresh token: ${refreshToken.value}`);
    }
    const {accessToken, refreshToken: newRefreshToken} = await res.json();
    console.log("new refreshToken", newRefreshToken);

    await setAuthTokens(accessToken, newRefreshToken);

    return new Response('Token refreshed', {
      status: 200,
    });
  } catch (error) {
    console.error('Error refreshing token');
    await clearAuthTokens();
    throw new Error(`Token refresh failed: ${(error as Error).message || error}`);
  }
}


export async function setAuthTokens(accessToken: string, refreshToken: string) {
  const cookieStore = await cookies();
  console.log("set new auth cookies:", {accessToken, refreshToken});
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true, // Prevent JavaScript access
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'strict', // Strict SameSite for security
    path: '/', // Available across the whole app
  });

  cookieStore.set('refreshToken', refreshToken, {
    httpOnly: true, // Prevent JavaScript access
    secure: process.env.NODE_ENV === 'production', // HTTPS only in production
    sameSite: 'strict', // Strict SameSite for security
    path: '/', // Available across the whole app
  });
}

export async function clearAuthTokens() {
  const cookieStore = await cookies();

  cookieStore.delete('accessToken');
  cookieStore.delete('refreshToken');
}