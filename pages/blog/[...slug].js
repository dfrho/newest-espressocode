import { GetAllPosts } from 'config/queries'
import client from 'config/client'
import PostLayout from '@/layouts/PostLayout'

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GetAllPosts,
  })
  const APosts = data.posts
  return {
    paths: APosts.map((p) => ({
      params: {
        slug: p.slug?.split('/'),
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const slug = params.slug[0]
  const { data } = await client.query({
    query: GetAllPosts,
  })
  const APosts = data.posts

  const postIndex = APosts.findIndex((post) => post.slug === params.slug.join('/'))
  const prev = APosts[postIndex + 1] || null
  const next = APosts[postIndex - 1] || null
  // filter post by slug
  const singlePost = APosts.find((item) => item.slug === slug)
  return { props: { prev, next, singlePost } }
}

export default function Blog({ prev, next, singlePost }) {
  return <PostLayout frontMatter={singlePost} prev={prev} next={next} />
}
