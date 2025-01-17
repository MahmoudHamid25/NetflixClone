// "use server"
import { SeasonBody } from '@/lib/schemas';
import { fetcher } from '@/lib/fetcher';
import { apiUrl } from '@/lib/api-url';
import { ContentResponse } from '@/lib/actions/content/types';
import { uploadImage, uploadVideo } from '@/lib/actions/content/upload.actions';

export async function fetchSeasonsBySeries(seriesId: string): Promise<ContentResponse> {
  try {
    const response = await fetcher(`${apiUrl}/contents/seasons/series/${seriesId}`, {
      method: 'GET',
      'Content-Type': 'application/json',
    });

    return { success: true, data: response };
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    console.error('Season upload failed:', error);
    return { success: false, error: error.message };
  }
}

export async function uploadSeason(body: SeasonBody) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { image, type, ...seasonBody } = body;

    if (!image) {
      throw new Error('No image provided for upload');
    }

    const preview_image = await uploadImage(<File>image);
    console.log("preview_image:", preview_image)
    if (!preview_image) {
      throw new Error('Image upload failed');
    }

    const seasonData = { ...seasonBody, preview_image };
    console.log(seasonData);
    // Send the season data (excluding the image file) to the backend
    const response = await fetcher(`${apiUrl}/contents/seasons`, {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify(seasonData),
    });

    return { success: true, data: response };
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    console.error('Season upload failed:', error);
    return { success: false, error: error.message };
  }
}