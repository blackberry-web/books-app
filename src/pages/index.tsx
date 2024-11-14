import React, { useEffect, useState } from "react";
import { Suspense } from 'react';
import Image from 'next/image';
import Search from "@/components/Search";
import styles from '../styles/styles.module.css';
import BooksList from "@/components/BooksList";
import { SearchParams } from "@/types";

const Index = (props: { searchParams?: Promise<SearchParams>}) => {
    const [data, setData] = useState({query:  '', page: '1', sort: 'asc'});
    useEffect(() => {
        try {
        const setSearchParams = (async (): Promise<void> => {
            if(props.searchParams){
            const params = await props.searchParams;
            setData(params as SearchParams);
            }
            setSearchParams();
        })
        } catch(err: unknown) {
            console.error(err);
        }
    }, [data])
    const query = data.query;
    const currentPage = Number(data.page);

    const allSearchResults = () => {}
    return(
        <div>
            <h1 className={styles.h1}>Books Catalog</h1>
            <div>
            <Image
                src="https://images.unsplash.com/photo-1536965764833-5971e0abed7c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Main theme"
                quality={100}
                fill
                sizes="100vw"
                style={{
                objectFit: 'cover',
                }}
                className={styles.background_image}
            />
            </div>
            <Suspense>
              <Search />
            </Suspense>
            <Suspense>
              <BooksList query={query} currentPage={currentPage}/>
            </Suspense>
        </div>
    )
} 

export default Index;