const grayMatter = require(`gray-matter`)
const crypto = require(`crypto`)
const _ = require(`lodash`)

module.exports = async function onCreateNode(
  { node, getNode, loadNodeContent, actions, createNodeId },
  pluginOptions
) {
  const { createNode, createParentChildLink } = actions

  //console.log("onCreateNode node=", node)

  // We only care about markdown content.
  if (
    node.internal.mediaType !== `text/markdown` &&
    node.internal.mediaType !== `text/x-markdown`
  ) {
    console.log('returning immediately')
    return
  }
  console.error("didn't return immediately")

  const content = await loadNodeContent(node)
  console.log('conent=', content)
  // let data = grayMatter(content, pluginOptions)

  // // Convert date objects to string. Otherwise there's type mismatches
  // // during inference as some dates are strings and others date objects.
  // if (data.data) {
  //   data.data = _.mapValues(data.data, v => {
  //     if (_.isDate(v)) {
  //       return v.toJSON()
  //     } else {
  //       return v
  //     }
  //   })
  // }

  const opengraphNode = {
    id: createNodeId(`${node.id} >>> OpenGraph`),
    children: [],
    parent: node.id,
    internal: {
      content: { test: 'test' },
      type: `OpenGraph`,
    },
  }

  opengraphNode.og = {
    ogUrl: `https://cdn.vox-cdn.com/thumbor/oQHsce6Ez49l4rdP4QbHa-PIetE=/0x0:2040x1360/1220x813/filters:focal(857x517:1183x843):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/61115509/acastro_180416_1777_chrome_0001.0.jpg`, // always include a title
    _PARENT: node.id,
  }

  opengraphNode.internal.contentDigest = crypto
    .createHash(`md5`)
    .update(JSON.stringify(opengraphNode))
    .digest(`hex`)

  createNode(opengraphNode)
  createParentChildLink({ parent: node, child: opengraphNode })
}
