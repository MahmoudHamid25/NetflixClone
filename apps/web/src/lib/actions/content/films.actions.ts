import { FilmBody } from '@/lib/schemas';
import { fetcher } from '@/lib/fetcher';
import { apiUrl } from '@/lib/api-url';
import { ContentResponse } from '@/lib/actions/content/types';
import { uploadVideo } from '@/lib/actions/content/upload.actions';

export async function fetchAllFilms(): Promise<ContentResponse> {
  try {
    const response = await fetcher(`${apiUrl}/contents/films`, {
      method: 'GET',
      'Content-Type': 'application/json',
    });

    return { success: true, data: response };
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    console.error('Film upload failed:', error);
    return { success: false, error: error.message };
  }
}

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
    console.log(filmData);
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