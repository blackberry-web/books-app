export type SearchParams = {
    query: string, 
    page: string, 
    sort: string
}

export type BooksResponse = {
    "kind": string,
    "totalItems": number,
    "items": Book[]
}

export type Book = {
    "kind": "books#volume",
    "id": string,
    "etag": string,
    "selfLink": string,
    "volumeInfo": {
        "title": string,
        "subtitle": string,
        "authors": [
        string
        ],
        "publisher": string,
        "publishedDate": string,
        "description": string,
        "industryIdentifiers": [
        {
            "type": string,
            "identifier": string
        }
        ],
        "pageCount": number,
        "dimensions": {
        "height": string,
        "width": string,
        "thickness": string
        },
        "printType": string,
        "mainCategory": string,
        "categories": [
        string
        ],
        "averageRating": number,
        "ratingsCount": number,
        "contentVersion": string,
        "imageLinks": {
        "smallThumbnail": string,
        "thumbnail": string,
        "small": string,
        "medium": string,
        "large": string,
        "extraLarge": string
        },
        "language": string,
        "previewLink": string,
        "infoLink": string,
        "canonicalVolumeLink": string
    },
    "userInfo": {
        "review": string,
        "readingPosition": string,
        "isPurchased": boolean,
        "isPreordered": boolean,
        "updated": string
    },
    "saleInfo": {
        "country": string,
        "saleability": string,
        "onSaleDate": string,
        "isEbook": boolean,
        "listPrice": {
        "amount": number,
        "currencyCode": string
        },
        "retailPrice": {
        "amount": number,
        "currencyCode": string
        },
        "buyLink": string
    },
    "accessInfo": {
        "country": string,
        "viewability": string,
        "embeddable": boolean,
        "publicDomain": boolean,
        "textToSpeechPermission": string,
        "epub": {
        "isAvailable": boolean,
        "downloadLink": string,
        "acsTokenLink": string
        },
        "pdf": {
        "isAvailable": boolean,
        "downloadLink": string,
        "acsTokenLink": string
        },
        "webReaderLink": string,
        "accessViewStatus": string,
        "downloadAccess": {
        "kind": "books#downloadAccessRestriction",
        "volumeId": string,
        "restricted": boolean,
        "deviceAllowed": boolean,
        "justAcquired": boolean,
        "maxDownloadDevices": number,
        "downloadsAcquired": number,
        "nonce": string,
        "source": string,
        "reasonCode": string,
        "message": string,
        "signature": string
        }
    },
    "searchInfo": {
        "textSnippet": string
    }
}