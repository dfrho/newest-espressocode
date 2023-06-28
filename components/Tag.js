import Link from 'next/link'
import kebabCase from '@/lib/utils/kebabCase'

const Tag = ({ text }) => {
  return (
    <Link href={`/tags/${text.slug}`}>
      <a className="my-3 mr-3 text-sm font-medium uppercase text-primary-800 dark:text-primary-500 hover:text-primary-600 dark:hover:text-primary-400">
        {text.name}
      </a>
    </Link>
  )
}

export default Tag
