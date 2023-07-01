import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import client from 'config/client'
import { Posts } from 'config/queries'

export async function getStaticProps() {
  const { data } = await client.query({
    query: Posts,
  })
  const AllPosts = data.posts

  return { props: { AllPosts } }
}

export default function Tags({ AllPosts }) {
  const tagCounts = {}
  // Iterate over each data item
  AllPosts.forEach((item) => {
    // Iterate over each tag in the item
    item.tag.forEach((tag) => {
      // Check if the tag name already exists in tagCounts
      if (Object.prototype.hasOwnProperty.call(tagCounts, tag.name)) {
        // Increment the count if the tag name already exists
        tagCounts[tag.name].count++
      } else {
        // Initialize the count to 1 if the tag name doesn't exist
        tagCounts[tag.name] = {
          count: 1,
          slug: tag.slug,
        }
      }
    })
  })

  return (
    <>
      <PageSEO title={`Tags - ${siteMetadata.author}`} description="Things I blog about" />
      <div className="flex flex-col items-start justify-start divide-y divide-gray-200 dark:divide-gray-700 md:justify-center md:items-center md:divide-y-0 md:flex-row md:space-x-6 md:mt-24">
        <div className="pt-6 pb-8 space-x-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 md:border-r-2 md:px-6">
            Tags
          </h1>
        </div>
        <div className="flex flex-wrap max-w-lg">
          {Object.entries(tagCounts).map(([tagName, { count, slug }]) => (
            <div key={slug} className="mt-2 mb-2 mr-5">
              <Tag text={slug} />
              <Link
                href={`/tags/${slug}`}
                className="-ml-2 text-sm font-semibold text-gray-600 uppercase dark:text-gray-300"
              >
                {tagName} {` (${count})`}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
