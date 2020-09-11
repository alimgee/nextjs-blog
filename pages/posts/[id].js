import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head' //Head allows the creation of meta data etc in the page header
import Date from '../../components/date' // uses date-fns to format a string
import utilStyles from '../../styles/utils.module.css'

/*
If you want to statically generate a page called posts/<id> where
id can be dynamic then the page file must contain
1. A react component to render the page.
2. getStaticPaths which returns an array of possible values for id.
3. getStaicProps which fetches the neccesary data for the post with id.

*/
export default function Post({ postData }) {
    /* 
    function to return layout of page with fetched data 
    (from .md files in /posts) eg the below will return the 
    title, id and date from the relevant md files in /post
    */
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                {postData.title}
                <br />
                {postData.id}
                <br />
                <Date dateString={postData.date} />
                <br />
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout >
    )
}

export async function getStaticPaths() {
    /* 
    required function to return the static paths of the md files
     (.md extension removed) in format:
     [ { params: { id: 'pre-rendering' } }, { params: { id: 'ssg-ssr' } } ]
     this allows us to create a static path in the for of for example
     /posts/pre-rendering

    */
    const paths = getAllPostIds()

    return {
        paths,
        fallback: false
    }
    /*
    If fallback is false, then any paths not returned by getStaticPaths will result in a 404 page.

    If fallback is true, then the behavior of getStaticProps changes:

    The paths returned from getStaticPaths will be rendered to HTML at build time.
    The paths that have not been generated at build time will not result in a 404 
    page. Instead, Next.js will serve a “fallback” version of the page on the first 
    request to such a path.
    In the background, Next.js will statically generate the requested path. 
    Subsequent requests to the same path will serve the generated page, just 
    like other pages pre-rendered at build time.
    */
}

export async function getStaticProps({ params }) {
    /*
    function to return the data of the props in the following format:
    { id: 'pre-rendering', title: 'Two Forms of Pre-rendering', date: '2020-01-01'}
    */

    const postData = await getPostData(params.id)
    // as we are using await in getPostData we need to also use it here
    return {
        props: {
            postData
        }
    }
}