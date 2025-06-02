# AI Singapore Technical Assessement
Created _1st June 2025_

|||
|---|---|
|Name|Tan Shao Yun|
|Email|tan_shaoyun@hotmail.com<br/>shao.cloud@gmail.com (Github)|

## Details
This git repository details my solutions the technical assessments, for application to AI Singapore's AI Products role.

## Assessments

### 🔠 Assessment 1: Project Gutenberg

Conducts a word count of `assets\pg16317.txt`.

Prints top 10-20 word frequencies to console and total frequencies to `wordcount.txt`.

To run:
```bash
cd wordcounter
python main.py
```

### :books: Assessment 2: Book Discovery

Requirements:
1. Search function
    - Keywords to filter books
    - Search bar
2. Search results
3. Dynamic route for individual books with info
    - title
    - author
    - desc
    - cover
4. Mobile responsive interface
5. Needs to use [Google Books API](https://developers.google.com/books/docs/overview)
   - REST API: Good to use NextJS API routes
   - Doesn't need authentication!
   - Bookshelf API + Users API are unnecessary

#### Running:

1. Move to the `book_search` directory
2. Install packages using `pnpm i`
3. Run the dev server with `pnpm dev`

```bash
cd book_search
pnpm i
pnpm dev
```


To be detailed!

#### :book: Google Books API Fundamentals

Searches can be done using

`https://www.googleapis.com/books/v1/volumes?q=search+terms`

##### Query Params

The following values are accepted following `q=`:

- `intitle`
- `inauthor`
- `inpublisher`
- `subject` - note: called categories in the API
- `isbn`/`lccn`/`oclc`

E.G.

```GET https://www.googleapis.com/books/v1/volumes?q=flowers+inauthor:keyes```

We can include these in separate search fields, and programmatically merge them as a query.

##### Filtering

Filters types of returned books, could be good as tags

- `partial`
- `full`
- `free-ebooks`
- `paid-ebooks`
- `ebooks`

E.G.

```GET https://www.googleapis.com/books/v1/volumes?q=flowers&filter=free-ebooks&key=yourAPIKey```

##### Pagination
- `startIndex`
- `maxResults`

##### Fields

E.G.

```GET https://www.googleapis.com/books/v1/volumes?q=improv&fields=items(selfLink,volumeInfo(title,subtitle,authors,publisher,publishedDate,description,categories,language,previewLink))```
