import { useSearchParams, usePathname } from "next/navigation";
import { useRouter } from "next/router";
import styles from '../styles/styles.module.css';
import Link from "next/link";

const Pagination = ({totalPages, query} : {totalPages: number, query: string}) => {
    const path = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter()
    const currentPage = Number(searchParams.get('page')) || 1;
    const pagesArray = Array.from({length: totalPages}, (_, i) => i + 1);

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
                <Link href={createURL(currentPage-1)} className={styles.paginationButton}>Previous</Link>
                {pagesArray.map((page, index) => {
                return (
                    <li key={index} className={page === currentPage ? styles.pageItemActive : styles.pageItem}>
                    <a onClick={() => router.push(createURL(page))} className={styles.pageLink}>{page}</a>
                </li>
                )})}
                <Link href={createURL(currentPage+1)} className={styles.paginationButton}>Next</Link>
            </ul>
        </div>
    )
}

export default Pagination;