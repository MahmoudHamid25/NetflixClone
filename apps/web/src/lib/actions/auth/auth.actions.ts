import { fetcher } from '@/lib/fetcher';
import { apiUrl } from '@/lib/api-url';
import { clearAuthTokens, getAuthTokens, setAuthTokens } from '@/lib/auth-tokens';
import { User } from '@/lib/types';
import { ApiResponse } from '@/lib/actions/shared/types';

interface LoginBody {
  email: string;
  password: string;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}


// login with credentials; not used in social login
export async function login(body: LoginBody): Promise<ApiResponse<Tokens>> {
  try {
    const data = await fetcher(`${apiUrl}/auth/login`, {
      'Content-Type': 'application/json',
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(body),
    });

    if (data.accessToken && data.refreshToken) {
      await setAuthTokens(data.accessToken, data.refreshToken);
    }


    return { success: true, data: data };
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    return { success: false, error: error };
  }
}


export async function getProfile(): Promise<ApiResponse<User>> {
  try {
    const data = await fetcher(`${apiUrl}/auth/profile`, {
      'Content-Type': 'application/json',
      method: 'GET',
      credentials: 'include',
      cache: 'no-store',
    });

    return { success: true, data: data };
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    return { success: false, error: error };
  }
}

export async function logout(): Promise<void> {
  // let redirectPath: string | null = null;

  try {
    const { accessToken } = await getAuthTokens();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: accessToken ? `Bearer ${accessToken.value}` : undefined,
    };
    await fetch(`${apiUrl}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
      ...headers,
    });
    console.log('clear auth tokens');
    await clearAuthTokens();
    console.log('revalidate path');
    // window.location.href = '/';
    // revalidatePath('/', 'layout');
  } catch (e) {
    console.log(e);
  } finally {
    // redirect("/");
  }
}