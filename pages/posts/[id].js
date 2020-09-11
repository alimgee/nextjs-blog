import Layout from '../../components/layout'
import { getAllPostIds, getPostData } from '../../lib/posts'

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
            {postData.title}
            <br />
            {postData.id}
            <br />
            {postData.date}
        </Layout>
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
}

export async function getStaticProps({ params }) {
    /*
    function to return the data of the props in the following format:
    { id: 'pre-rendering', title: 'Two Forms of Pre-rendering', date: '2020-01-01'}
    */ 
   
    const postData = getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}