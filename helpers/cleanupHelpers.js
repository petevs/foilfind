
// get html from a document using query selector and get innerHTML all cleaned up and trimmed

const getHtml = (doc, selector) => {
  const html = doc.querySelector(selector).innerHTML
  return html.trim().replace(/(\r\n|\n|\r)/gm, '')
}
