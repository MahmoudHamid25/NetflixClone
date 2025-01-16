
import { fetcher } from '@/lib/fetcher';
import { apiUrl } from '@/lib/api-url';
import { ContentResponse } from '@/lib/actions/content/types';
import { uploadVideo } from '@/lib/actions/content/upload.actions';
import { EpisodeBody } from '@/lib/schemas';

export async function fetchAllEpisodes(seasonId: string): Promise<ContentResponse> {
  try {
    const response = await fetcher(`${apiUrl}/contents/episodes/season/${seasonId}`, {
      method: 'GET',
      'Content-Type': 'application/json',
    });

    return { success: true, data: response };
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    console.error('Episode upload failed:', error);
    return { success: false, error: error.message };
  }
}

export async function uploadEpisode(body: EpisodeBody) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { video, type, ...episodeBody } = body;

    if (!video) {
      throw new Error('No video provided for upload');
    }

    const videoUrl = await uploadVideo(<File>video);

    if (!videoUrl) {
      throw new Error('Video upload failed');
    }

    const episodeData = { ...episodeBody, videoUrl };
    console.log(episodeData);
    // Send the episode data (excluding the video file) to the backend
    const response = await fetcher(`${apiUrl}/contents/episodes`, {
      method: 'POST',
      'Content-Type': 'application/json',
      body: JSON.stringify(episodeData),
    });

    return { success: true, data: response };
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    console.error('Episode upload failed:', error);
    return { success: false, error: error.message };
  }
}