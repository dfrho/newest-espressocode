import { TagSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import generateRss from '@/lib/generate-rss'
import { getAllFilesFrontMatter } from '@/lib/mdx'
// import { getAllTags } from '@/lib/tags'
import kebabCase from '@/lib/utils/kebabCase'
import client from 'config/client'
import { GetAllTags, Posts } from 'config/queries'
import fs from 'fs'
import { useRouter } from 'next/router'
import path from 'path'

const root = process.cwd()

export async function getStaticPaths() {
  const { data } = await client.query({
    query: GetAllTags,
  })
  const allTags = data.tag
  return {
    paths: allTags.map((tag) => ({
      params: {
        tag: tag.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const { data } = await client.query({
    query: Posts,
  })
  const allposts = data.posts

  const allPosts = await getAllFilesFrontMatter('blog')
  const filteredPosts = allPosts.filter(
    (post) => post.draft !== true && post.tags.map((t) => kebabCase(t)).includes(params.tag)
  )

  // rss
  const rss = generateRss(filteredPosts, `tags/${params.tag}/feed.xml`)
  const rssPath = path.join(root, 'public', 'tags', params.tag)
  fs.mkdirSync(rssPath, { recursive: true })
  fs.writeFileSync(path.join(rssPath, 'feed.xml'), rss)

  return { props: { posts: filteredPosts, tag: params.tag, allposts } }
}

export default function Tag({ posts, tag, allposts }) {
  const { query } = useRouter()
  // filter post by tags
  const PostsbyTag = allposts.filter((item) => item.tag.some((t) => t.slug === query.tag))
  // Capitalize first letter and convert space to dash
  const title = query.tag[0].toUpperCase() + query.tag.split(' ')?.join('-').slice(1)

  return (
    <>
      <TagSEO
        title={`${title} - ${siteMetadata.author}`}
        description={`${title} tags - ${siteMetadata.author}`}
      />
      <ListLayout posts={PostsbyTag} title={title} />
    </>
  )
}
