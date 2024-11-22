import styles from '../styles/styles.module.css';
import Image from 'next/image';
import { BooksResponse } from "@/types";
import { GetServerSideProps } from 'next';
import Search from '@/components/Search';
import Link from 'next/link';
import Button from 'react-bootstrap/Button';
import Card from "react-bootstrap/Card";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Container } from 'react-bootstrap';
import Pagination from '@/components/Pagination';
import { getAllSearchResults } from '@/helpers/utils';
import 'dotenv/config';
import { useRouter } from 'next/router';

export const getServerSideProps: GetServerSideProps = async(context) => {
    let totalPages: number = 1;
    const ITEMS_PER_PAGE: number = 10;
    const { query } = context;
    const currentPage = query.page || 1;
    const searchPhrase = query.query || '';
    const startIndex = (Number(currentPage) - 1) * 10;
    if (query.query) {
        const allSearchResults = await getAllSearchResults(query.query);
        totalPages = Math.ceil(allSearchResults / ITEMS_PER_PAGE);
    }
    const paginationUrl = `${process.env.API_URL}/volumes?q=${searchPhrase}&startIndex=${startIndex}&key=${process.env.API_KEY}&orderBy=newest`;
    const response = await fetch(paginationUrl);
    const data = await response.json() ?? [];

    if (!data) {
        return {
          notFound: true,
        }
    }

    return { 
    props: { 
        data,
        searchPhrase,
        totalPages
    }}
}

const Index = ({ data, searchPhrase, totalPages }: { data: BooksResponse, searchPhrase: string, totalPages: number }) => {
    const router = useRouter();
    return(
        <div>
            <div className={styles.imageContainer}>
            <Image
                src="https://images.unsplash.com/photo-1536965764833-5971e0abed7c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Main theme"
                quality={100}
                placeholder="blur"
                blurDataURL="https://images.unsplash.com/photo-1536965764833-5971e0abed7c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                fill
                sizes="100vw"
                style={{
                    objectFit: 'cover',
                }}
            />
            </div>
            <h1 className={styles.h1} onClick={() => router.push('/')}>Books Catalog</h1>
            <Search />
            <div>
                <Container fluid="md" className={styles.container}>
                {data && data.items?.map((item, index) => {
                return (
                <Row key={item.id}>
                        <Col>
                        <Card key={index} className={styles.cardItem}>
                            <Card.Img variant="top" src={item.volumeInfo?.imageLinks?.smallThumbnail}/>
                            <Card.Body>
                                <Card.Title><strong>{item.volumeInfo?.title}</strong></Card.Title>
                                <Card.Subtitle>{item.volumeInfo?.subtitle}</Card.Subtitle>
                                <Card.Text>
                                {item.volumeInfo?.authors}
                                </Card.Text>
                                <Link href={item.volumeInfo?.previewLink} target="_blank">
                                    <Button className={styles.button}>
                                        Details
                                    </Button>
                                </Link>
                            </Card.Body>
                        </Card>
                        </Col>
                    </Row>
                    );
                })}
                </Container>
            </div>
            {data.items && <Pagination query={searchPhrase} totalPages={totalPages}/>}
    </div>
    )
} 

export default Index;