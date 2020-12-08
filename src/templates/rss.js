import { Post } from 'templates/components/postTypes/Post'
import { LinkPost } from 'templates/LinkPost'
import { Image } from 'templates/components/postTypes/Image'
import { Gallery } from 'templates/components/postTypes/Gallery'
import { OGLink } from 'templates/OGLink'
import { YouTube } from 'templates/components/postTypes/YouTube'

export const RSSNode = ({ node }) => {
  let content
  switch (node.remark.frontmatter.layout) {
    case 'Post':
      content = Post(node)
    case 'LinkPost':
      content = LinkPost(node)
    case 'Image':
      content = Image(node)
    case 'Gallery':
      content = Gallery(node)
    case 'OGLink':
      content = OGLink(node, false)
    case 'Youtube':
      content = YouTube(node)
    default:
      content = Post(node)
  }
  return <div className="px-0">{content}</div>
}

export default RSS
