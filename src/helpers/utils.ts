import 'dotenv/config';

export const getAllSearchResults = async (query: string | string[]): Promise<number> => {
    const url = `${process.env.API_URL}/volumes?q=${query}&key=${process.env.API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    return data?.totalItems || 0;
}