'use client';
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import styles from '../styles/styles.module.css';

const Search = () => {
    const searchParams = useSearchParams();
    const path = usePathname();
    const { replace } = useRouter();
    const search = (phrase: string) => {
        console.log(`Searching...${phrase}`);
        const params = new URLSearchParams(searchParams);
        if(phrase){
            params.set('query', phrase);
        } else {
            params.delete(phrase);
        }
        replace(`${path}?${params.toString()}`)
    }
    return(
        <div className="">
            <input 
                className={styles.input} 
                type="text"
                placeholder='Search...'
                onChange={(e)=>{search(e.target.value)}}
                defaultValue={searchParams.get(`${'query'?.toString()}`)!}
            />
        </div>
    )
}

export default Search;