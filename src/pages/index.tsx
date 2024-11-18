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
import 'dotenv/config';
import Pagination from '@/components/Pagination';

export const getServerSideProps: GetServerSideProps = async(context) => {
    const { query } = context;
    const searchPhrase = query.query || '';
    const url = `${process.env.API_URL}/volumes?q=${query.query}&key=${process.env.API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    if (!data) {
        return {
            notFound: true,
        };
    }
    return { props: { 
        data,
        searchPhrase,
    }}
}

const Index = ({ data, searchPhrase }: { data: BooksResponse, searchPhrase: string}) => {
    const ITEMS_PER_PAGE = 10;
    const totalPages = Math.ceil(data.totalItems / ITEMS_PER_PAGE) ?? 1;
    return(
        <div>
            <div className={styles.imageContainer}>
            <Image
                src={process.env.BGIMAGE!}
                alt="Main theme"
                quality={100}
                placeholder="blur"
                blurDataURL={`${process.env.BGIMAGE}`}
                fill
                sizes="100vw"
                style={{
                    objectFit: 'cover',
                }}
            />
            </div>
            <h1 className={styles.h1}>Books Catalog</h1>
            <Search />
            <div>
                <Container fluid="md" className={styles.container}>
                {data && data.items.map((item, index) => {
                return (
                <Row key={item.id}>
                        <Col>
                        <Card key={index} className={styles.cardItem}>
                            <Card.Img variant="top" src={item.volumeInfo.imageLinks.smallThumbnail}/>
                            <Card.Body>
                                <Card.Title><strong>{item.volumeInfo.title}</strong></Card.Title>
                                <Card.Subtitle>{item.volumeInfo.subtitle}</Card.Subtitle>
                                <Card.Text>
                                {item.volumeInfo.authors}
                                </Card.Text>
                                <Link href={item.volumeInfo.previewLink} target="_blank">
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
            <Pagination totalPages={totalPages} query={searchPhrase}/>
    </div>
    )
} 

export default Index;