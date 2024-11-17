'use client';
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useDebouncedCallback } from 'use-debounce';
import styles from '../styles/styles.module.css';

const Search = () => {
    const searchParams = useSearchParams();
    const path = usePathname();
    const { replace } = useRouter();
    const handleSearch = useDebouncedCallback(async (phrase: string) => {
        console.log(`Searching...${phrase}`);
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if(phrase){
            params.set('query', phrase);
        } else {
            params.delete(phrase);
        }
        replace(`${path}?${params.toString()}`)
    }, 1000);

    return(
        <div>
            <input
                className={styles.input}
                type="text"
                placeholder='Search...'
                onChange={(e) => handleSearch(e.target.value)}
                defaultValue={searchParams.get('query'?.toString())!} />
        </div>
    )
}

export default Search;