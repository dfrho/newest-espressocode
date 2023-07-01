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
export const GetAllPosts = gql`
  query AllPosts {
    posts {
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

export const GetAllTags = gql`
  query tags {
    tag {
      name
      slug
    }
  }
`
