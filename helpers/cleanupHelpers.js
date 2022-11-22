
// get html from a document using query selector and get innerHTML all cleaned up and trimmed

const getHtml = (doc, selector) => {
  const html = doc.querySelector(selector).innerHTML
  return html.trim().replace(/(\r\n|\n|\r)/gm, '')
}

// get text from a document using query selector and get innerText all cleaned up and trimmed

const getText = (doc, selector) => {
  const text = doc.querySelector(selector).innerText
  return text.trim().replace(/(\r\n|\n|\r)/gm, '')
}