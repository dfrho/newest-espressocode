import { getAllFilesFrontMatter } from '@/lib/mdx'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSEO } from '@/components/SEO'
import client from 'config/client'
import { Posts } from 'config/queries'

export const POSTS_PER_PAGE = 5

export async function getStaticProps() {
  const { data } = await client.query({
    query: Posts,
  })
  const AllPosts = data.posts
  const posts = await getAllFilesFrontMatter('blog')
  const initialDisplayPosts = AllPosts.slice(0, POSTS_PER_PAGE)
  const pagination = {
    currentPage: 1,
    totalPages: Math.ceil(AllPosts.length / POSTS_PER_PAGE),
  }

  return { props: { initialDisplayPosts, posts, pagination, AllPosts } }
}

export default function Blog({ posts, initialDisplayPosts, pagination, AllPosts }) {
  return (
    <>
      <PageSEO title={`Blog - ${siteMetadata.author}`} description={siteMetadata.description} />
      <ListLayout
        posts={AllPosts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}
