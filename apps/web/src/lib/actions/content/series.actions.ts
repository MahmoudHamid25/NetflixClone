// "use server"
import { fetcher } from '@/lib/fetcher';
import { apiUrl } from '@/lib/api-url';
import { SeriesBody } from '@/lib/schemas';
import { ContentResponse } from '@/lib/actions/content/types';
import { uploadImage } from '@/lib/actions/content/upload.actions';


export async function fetchAllSeries(): Promise<ContentResponse> {
  try {
    const response = await fetcher(`${apiUrl}/contents/series`, {
      method: 'GET',
      'Content-Type': 'application/json',
    });

    return { success: true, data: response };
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    console.error('Series upload failed:', error);
    return { success: false, error: error.message };
  }
}


export async function uploadSeries(body: SeriesBody) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { image, type, ...seriesBody } = body;

    if (!image) {
      throw new Error('No image provided for upload');
    }

    const preview_image = await uploadImage(<File>image);
    if (!preview_image) {
      throw new Error('Image upload failed');
    }
    const seriesData = { ...seriesBody, preview_image };

    // Send the series data (excluding the video file) to the backend
    const response = await fetcher(`${apiUrl}/contents/series`, {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify(seriesData),
    });

    return { success: true, data: response };
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    console.error('Series upload failed:', error);
    return { success: false, error: error.message };
  }
}