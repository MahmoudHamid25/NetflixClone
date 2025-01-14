import { fetcher } from '@/lib/fetcher';
import { apiUrl } from '@/lib/api-url';
import { User } from '@/lib/types';
import { clearAuthTokens, getAuthTokens, setAuthTokens } from '@/lib/auth-tokens';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { FilmBody } from '@/lib/schemas';

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

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

// Function to upload video
async function uploadVideo(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const data = await fetcher(`${apiUrl}/upload/video`, {
      method: 'POST',
      body: formData,
    });

    return data?.videoUrl; // Adjust according to your API response
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    console.error('Video upload failed:', error);
    return null;
  }
}

// Function to upload the film with video
export async function uploadFilm(body: FilmBody) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { video, type, ...filmBody } = body;

    if (!video) {
      throw new Error('No video provided for upload');
    }

    const videoUrl = await uploadVideo(<File>video);

    if (!videoUrl) {
      throw new Error('Video upload failed');
    }

    const filmData = { ...filmBody, videoUrl };

    // Send the film data (excluding the video file) to the backend
    const response = await fetcher(`${apiUrl}/contents/films`, {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify(filmData),
    });

    return { success: true, data: response };
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    console.error('Film upload failed:', error);
    return { success: false, error: error.message };
  }
}
