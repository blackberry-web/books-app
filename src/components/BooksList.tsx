import { getBookResults } from "@/helpers/utils";
import { Book } from "@/types";
import { ReactNode } from "react";

const BooksList = async ({query, currentPage}: {query: string, currentPage: number}) => {
    const books = await getBookResults(query, currentPage);
    console.log(books);
    const result = books.map(book => <li key={book.id}>{book as unknown as ReactNode}</li>);
    return(
        <div>
            <ul>{result}</ul>
        </div>
    )
}

export default BooksList;