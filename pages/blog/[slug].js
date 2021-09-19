import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import marked from 'marked'
import Link from 'next/link'


export default function PostPage({ frontmatter: { title, date, cover_image }, slug, content }) {
    return (
        <>
            <Link href='/'>
                <a className='btn btn-back'>
                    Go Back
                </a>
            </Link>
            <div className='card card-page'>
                <h1 className='post-tile'>{title}</h1>
                <div className='post-date'>Posted on {date} </div>
                <img src={cover_image} alt='' />
                <div className="post-body">
                    <div dangerouslySetInnerHTML={{ __html: marked(content) }}></div>
                </div>
            </div>

        </>
    )
}

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join('posts'))

    const paths = files.map(filename => ({
        params: {
            slug: filename.replace('.md', '')
        }
    }))

    // fallback:false if you try to access a path that doesn't exist it will give you a 404 error
    return {
        paths,
        fallback: false
    }
}

// to get the data based on the slug from getStaticPaths
export async function getStaticProps({ params: { slug } }) {
    const markdownWithMeta = fs.readFileSync(path.join('posts', slug + '.md'), 'utf-8')

    const { data: frontmatter, content } = matter(markdownWithMeta)

    return {
        props: {
            frontmatter,
            slug,
            content
        }
    }
}