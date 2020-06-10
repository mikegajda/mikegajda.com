const each = require('lodash/each')
const Promise = require('bluebird')
const path = require('path')
const fs = require('fs')
const Post = path.resolve('./src/templates/Post/index.js')
const LinkPost = path.resolve('./src/templates/LinkPost/index.js')
const Image = path.resolve('./src/templates/Image/index.js')
const Gallery = path.resolve('./src/templates/Gallery/index.js')
const OGLink = path.resolve('./src/templates/OGLink/index.js')
const Youtube = path.resolve('./src/templates/Youtube/index.js')
const createPaginatedPages = require('gatsby-paginate')

exports.createPages = ({graphql, actions}) => {
  const {createPage} = actions

  return new Promise((resolve, reject) => {
    resolve(
      graphql(
        `
          {
            allFile(
              filter: { internal: { mediaType: { in: ["text/markdown"] } } }
            ) {
              edges {
                node {
                  id: absolutePath
                  relativePath
                  relativeDirectory
                  absolutePath
                  sourceInstanceName
                  name
                  ext
                  birthTime(formatString: "YYYY-MM-DD hh:mm:ss")
                  changeTime(formatString: "YYYY-MM-DD hh:mm:ss")
                  remark: childMarkdownRemark {
                    id
                    html
                    frontmatter {
                      layout
                      title
                      link
                      date(formatString: "YYYY/MM/DD")
                      publishDate: date
                      category
                      tags
                      description
                      captions
                      remoteImage
                      excerpt
                      url
                      image {
                        childImageSharp {
                          fluid(maxWidth: 738) {
                            tracedSVG
                            aspectRatio
                            src
                            srcSet
                            sizes
                          }
                        }
                      }
                      images {
                        childImageSharp {
                          fixed(width: 708, height: 555, cropFocus: ATTENTION) {
                            tracedSVG
                            aspectRatio
                            src
                            srcSet
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            allS3Object(filter: { Key: { regex: "/^[^_]+\\\\.json$/" } }) {
              edges {
                node {
                  Key
                  localFile {
                    absolutePath
                  }
                }
              }
            }
            allS3Images: allS3Object(
              filter: { Key: { regex: "/^[^_]+\\\\.jpg$/" } }
            ) {
              edges {
                node {
                  Key
                  localFile {
                    childImageSharp {
                      fluid(maxWidth: 738) {
                        tracedSVG
                        aspectRatio
                        src
                        srcSet
                        sizes
                      }
                    }
                  }
                }
              }
            }
          }
        `
      )
      .then(({errors, data}) => {
        if (errors) {
          console.log(errors)
          reject(errors)
        }
        return data
      })
      .then((data) => {
        let posts = data.allFile.edges
        posts.sort(function (a, b) {
          a = new Date(a.node.remark.frontmatter.publishDate)
          b = new Date(b.node.remark.frontmatter.publishDate)
          return a > b ? -1 : a < b ? 1 : 0
        })
        data.allFile.edges = posts
        return data
      })
      .then((data) => {
        data.allS3Object.edges.forEach((edge) => {
          edge['node']['localFile']['content'] = JSON.parse(
            fs.readFileSync(edge.node.localFile.absolutePath, 'utf8')
          )
        })
        createPaginatedPages({
          edges: data.allFile.edges,
          createPage: createPage,
          pageTemplate: 'src/templates/index.js',
          pageLength: 5, // This is optional and defaults to 10 if not used
          pathPrefix: '', // This is optional and defaults to an empty string if not used
          context: {
            allS3Object: data.allS3Object.edges,
            allS3Images: data.allS3Images.edges,
          }, // This is optional and defaults to an empty object if not used
        })

        createPaginatedPages({
          edges: data.allFile.edges.filter(
            (post) =>
              post.node.remark.frontmatter.layout === 'OGLink' ||
              post.node.remark.frontmatter.layout === 'Post'
          ),
          createPage: createPage,
          pageTemplate: 'src/templates/index.js',
          pageLength: 5, // This is optional and defaults to 10 if not used
          pathPrefix: 'posts', // This is optional and defaults to an empty string if not used
          context: {
            allS3Object: data.allS3Object.edges,
            allS3Images: data.allS3Images.edges,
          }, // This is optional and defaults to an empty object if not used
        })

        createPaginatedPages({
          edges: data.allFile.edges.filter(
            (post) => post.node.remark.frontmatter.layout === 'Youtube'
          ),
          createPage: createPage,
          pageTemplate: 'src/templates/index.js',
          pageLength: 5, // This is optional and defaults to 10 if not used
          pathPrefix: 'videos', // This is optional and defaults to an empty string if not used
          context: {
            allS3Object: data.allS3Object.edges,
            allS3Images: data.allS3Images.edges,
          }, // This is optional and defaults to an empty object if not used
        })

        createPaginatedPages({
          edges: data.allFile.edges.filter(
            (post) =>
              post.node.remark.frontmatter.layout === 'Image' ||
              post.node.remark.frontmatter.layout === 'Gallery'
          ),
          createPage: createPage,
          pageTemplate: 'src/templates/index.js',
          pageLength: 5, // This is optional and defaults to 10 if not used
          pathPrefix: 'images', // This is optional and defaults to an empty string if not used
          context: {
            allS3Object: data.allS3Object.edges,
            allS3Images: data.allS3Images.edges,
          }, // This is optional and defaults to an empty object if not used
        })

        data.allFile.edges.forEach((edge) => {
          let node = edge.node

          if (!node.remark) {
            return
          }
          const absolutePath = node.absolutePath
          switch (node.remark.frontmatter.layout) {
            case 'Post':
              return createPage({
                path: `/posts/${node.name}`,
                component: Post,
                context: {
                  absolutePath,
                },
              })
            case 'LinkPost':
              return createPage({
                path: `/posts/${node.name}`,
                component: LinkPost,
                context: {
                  absolutePath,
                },
              })
            case 'Image':
              return createPage({
                path: `/images/${node.name}`,
                component: Image,
                context: {
                  absolutePath,
                },
              })
            case 'Gallery':
              return createPage({
                path: `/galleries/${node.relativeDirectory}/${node.name}`,
                component: Gallery,
                context: {
                  absolutePath,
                },
              })
            case 'OGLink':
              return createPage({
                path: `/posts/${node.name}`,
                component: OGLink,
                context: {
                  absolutePath,
                },
              })
            case 'Youtube':
              return createPage({
                path: `/posts/${node.name}`,
                component: Youtube,
                context: {
                  absolutePath,
                },
              })
            default:
              return createPage({
                path: `/posts/${node.name}`,
                component: Post,
                context: {
                  absolutePath,
                },
              })
          }
        })
        //return
      })
    )
  })
}

exports.onCreateWebpackConfig = ({actions}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        templates: path.resolve(__dirname, 'src/templates'),
        scss: path.resolve(__dirname, 'src/scss'),
        config: path.resolve(__dirname, 'gatsby-config.js'),
      },
    },
  })
}
