const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLEnumType,
  GraphQLJSON,
  GraphQLBoolean,
} = require(`gatsby/graphql`)
// const Remark = require(`remark`)
// const select = require(`unist-util-select`)
// const sanitizeHTML = require(`sanitize-html`)
// const _ = require(`lodash`)
// const visit = require(`unist-util-visit`)
// const toHAST = require(`mdast-util-to-hast`)
// const hastToHTML = require(`hast-util-to-html`)
// const mdastToToc = require(`mdast-util-toc`)
// const Promise = require(`bluebird`)
// const prune = require(`underscore.string/prune`)
// const unified = require(`unified`)
// const parse = require(`remark-parse`)
// const stringify = require(`remark-stringify`)
// const english = require(`retext-english`)
// const remark2retext = require(`remark-retext`)
// const stripPosition = require(`unist-util-remove-position`)
// const hastReparseRaw = require(`hast-util-raw`)

// let fileNodes
// let pluginsCacheStr = ``
// let pathPrefixCacheStr = ``
// const astCacheKey = node =>
//   `transformer-remark-markdown-ast-${
//     node.internal.contentDigest
//   }-${pluginsCacheStr}-${pathPrefixCacheStr}`
// const htmlCacheKey = node =>
//   `transformer-remark-markdown-html-${
//     node.internal.contentDigest
//   }-${pluginsCacheStr}-${pathPrefixCacheStr}`
// const htmlAstCacheKey = node =>
//   `transformer-remark-markdown-html-ast-${
//     node.internal.contentDigest
//   }-${pluginsCacheStr}-${pathPrefixCacheStr}`
// const headingsCacheKey = node =>
//   `transformer-remark-markdown-headings-${
//     node.internal.contentDigest
//   }-${pluginsCacheStr}-${pathPrefixCacheStr}`
// const tableOfContentsCacheKey = node =>
//   `transformer-remark-markdown-toc-${
//     node.internal.contentDigest
//   }-${pluginsCacheStr}-${pathPrefixCacheStr}`

// // ensure only one `/` in new url
// const withPathPrefix = (url, pathPrefix) =>
//   (pathPrefix + url).replace(/\/\//, `/`)

/**
 * Map that keeps track of generation of AST to not generate it multiple
 * times in parallel.
 *
 * @type {Map<string,Promise>}
 */

module.exports = (
  { type, store, pathPrefix, getNode, getNodes, cache, reporter },
  pluginOptions
) => {
  if (type.name !== `OpenGraph`) {
    return {}
  }

  return new Promise((resolve, reject) => {
    async function getOgUrl(opengraphNode) {
      return 'https://cdn.vox-cdn.com/thumbor/oQHsce6Ez49l4rdP4QbHa-PIetE=/0x0:2040x1360/1220x813/filters:focal(857x517:1183x843):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/61115509/acastro_180416_1777_chrome_0001.0.jpg'
    }

    return resolve({
      ogUrl: {
        type: GraphQLString,
        resolve(opengraphNode) {
          return getOgUrl(opengraphNode)
        },
      },
    })
  })
}
