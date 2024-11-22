import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/router";
import styles from '../styles/styles.module.css';
import Link from "next/link";

const Pagination = ({query, totalPages} : {query: string, totalPages: number}) => {
    const path = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    const clickedPage = Number(searchParams.get('page')) || 1;
    const totalPagesArray = Array.from({length: totalPages}, (_, i) => i + 1);
    const pagesArray = totalPagesArray.slice(clickedPage - 1, clickedPage + 2);
    const createURL = (page: string | number) => {
        const params = new URLSearchParams();
        if(query){
            params.set('query', query);
        } else {
            params.delete(query);
        }
        params.set('page', page.toString());
        return `${path}?${params.toString()}`;
    }

    return(
        <div>
            <ul className={styles.pagination}>
                <Link href={createURL(1)} className={styles.paginationButton}>«</Link>
                {clickedPage > 1 && 
                <Link href={createURL(clickedPage - 1)} 
                    className={styles.paginationButton}>Previous
                </Link>}
                {pagesArray.map((page, index) => {
                return (
                    <li key={index} className={page === clickedPage ? styles.pageItemActive : styles.pageItem}>
                    <a onClick={() => router.push(createURL(page))} className={styles.pageLink}>{page}</a>
                </li>
                )})}
                {clickedPage < totalPages && 
                <Link href={createURL(clickedPage + 1)} className={styles.paginationButton}>Next
                </Link>}
                <Link href={createURL(totalPagesArray.at(-1) ?? 1)} className={styles.paginationButton}>»</Link>
            </ul>
        </div>
    )
}

export default Pagination;