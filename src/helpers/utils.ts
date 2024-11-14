import { Book } from "@/types";
import 'dotenv/config';

const ITEMS_PER_PAGE = 5;
export const getBookResults = async (query: string, currentPage: number): Promise<Book[]> => {
    const offset = (Number(currentPage) - 1) * ITEMS_PER_PAGE;
    const url = `${process.env.API_URL}/volumes?q=${query}&key=${process.env.API_KEY}`;
    console.log(url);
    await setTimeout(()=> {console.log(`Searching...${query}`)}, 1000);
    try {
        const books = await fetch(url)
            .then((response) => response.json())
        return books;
    } catch(err) {
        console.error(err);
        throw Error("Error while fetching data");
    }
}

export const getAllSearchResults = (arrayLength: number) => {
    const numberOfPages = arrayLength / ITEMS_PER_PAGE;
};