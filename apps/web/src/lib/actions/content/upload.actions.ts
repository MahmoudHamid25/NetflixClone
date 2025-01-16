import { fetcher } from '@/lib/fetcher';
import { apiUrl } from '@/lib/api-url';

export async function uploadVideo(file: File) {
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

export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const data = await fetcher(`${apiUrl}/upload/image`, {
      method: 'POST',
      body: formData,
    });

    return data?.imageUrl; // Adjust according to your API response
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (error: any) {
    console.error('Video upload failed:', error);
    return null;
  }
}