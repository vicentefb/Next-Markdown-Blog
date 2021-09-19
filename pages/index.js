import fs from 'fs'
import path from 'path'
import Head from 'next/head'
import matter from 'gray-matter'
import Post from '../components/Post'
import { sortByDate } from '../utils'

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Dev Blog</title>
      </Head>
      <div className="posts">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  )
}

// fetch data at build time
export async function getStaticProps() {
  // Get files from the posts dir
  const files = fs.readdirSync(path.join('posts'))

  // Get slug and frontmatter from psts
  const posts = files.map(filename => {
    // Create slug
    // Replace md extension with nothing
    const slug = filename.replace('.md', '')

    // Get frontmatter
    // With this you basically get the contents of the file
    const markdownWithMeta = fs.readFileSync(path.join('posts', filename), 'utf-8')

    // Used to structure the data from the md file
    const { data: frontmatter } = matter(markdownWithMeta)

    return {
      slug,
      frontmatter,
    }
  })

  return {
    props: {
      posts: posts.sort(sortByDate),
    }
  }
}