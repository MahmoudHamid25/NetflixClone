'use server';

import {getAuthTokens, handleTokenRefresh} from "@/lib/auth-tokens";


/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
export async function fetcher(url: string, options: any = {}) {
  const {accessToken, refreshToken} = await getAuthTokens();
  const headers = {
    'Content-Type': 'application/json',
    Authorization: accessToken ? `Bearer ${accessToken.value}` : undefined,
    ...options,
  };

  console.log(url, headers);

  try {
    const res = await fetch(url, {...options, headers});
    if (res.status === 401 && refreshToken?.value) {
      // Attempt token refresh if unauthorized
      console.log("Attempt token refresh with refresh token ", refreshToken.value)
      await handleTokenRefresh();
      console.log("recursive fetcher call after token refresh")
      return fetcher(url, options);
    }

    if (!res.ok) return res.text().then(text => {
      throw new Error(text)
    })
    return res.json();
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    console.error('Error in fetcher:', err.message);
  }
}
