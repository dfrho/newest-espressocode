import { gql } from '@apollo/client'

export const Posts = gql`
  query AllPosts {
    posts {
      title
      slug
      excerpt
      date
      tag {
        name
        slug
      }
    }
  }
`
export const SinglePost = gql`
  query SinglePost {
    post(where: { slug: "cross-functional-collaboration-as-a-solutions-sales-engineer" }) {
      title
      id
      slug
      excerpt
      date
      tag {
        name
        slug
      }
      author {
        name
        picture {
          url
        }
      }
      content {
        html
      }
      coverImage {
        url
      }
      seo {
        title
        keywords
        image {
          url
        }
        description
      }
    }
  }
`

export const SinglePost2 = gql`
  query SinglePost {
    post(where: { slug: "cross-functional-collaboration-as-a-solutions-sales-engineer" }) {
      title
    }
  }
`
