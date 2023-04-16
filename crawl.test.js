const {normalizeURL, getURLsFromHTML} = require('./crawl.js')
const { test, expect} = require('@jest/globals')

test('normalizeURL', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL with trailing /', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL with capitals', () => {
    const input = 'https://BLOG.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
})

test('normalizeURL from HTML from dom', () => {
    const inputHTMLBody = `
    <html>
    <body>
    <a href="https://blog.boot.dev/path">
    Boot dev Blog
    </a>
    </body>
    </html>`
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://blog.boot.dev/path']
    expect(actual).toEqual(expected)
})

test('normalize relative URLFromHTML  from dom', () => {
    const inputHTMLBody = `
    <html>
    <body>
    <a href="/path">
    Boot dev Blog
    </a>
    </body>
    </html>`
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://blog.boot.dev/path']
    expect(actual).toEqual(expected)
})

test('normalize relative URLs From HTML from dom', () => {
    const inputHTMLBody = `
    <html>
    <body>
    <a href="/path">
    Boot dev Blog
    </a>
    <a href="/path2">
    Boot dev Blog 2
    </a>
    </body>
    </html>`
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://blog.boot.dev/path', 'https://blog.boot.dev/path2']
    expect(actual).toEqual(expected)
})

test('normalize relative URLs From HTML from dom', () => {
    const inputHTMLBody = `
    <html>
    <body>
    <a href="/path">
    Boot dev Blog
    </a>
    <a href="/path2">
    Boot dev Blog 2
    </a>
    </body>
    </html>`
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://blog.boot.dev/path', 'https://blog.boot.dev/path2']
    expect(actual).toEqual(expected)
})

test('normalize relative URLs From HTML from dom', () => {
    const inputHTMLBody = `
    <html>
    <body>
    <a href="invalid">
    Boot dev Blog
    </a>
    <a href="/path2">
    Boot dev Blog 2
    </a>
    </body>
    </html>`
    const inputBaseURL = 'https://blog.boot.dev'
    const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
    const expected = ['https://blog.boot.dev/path', 'https://blog.boot.dev/path2']
    expect(actual).toEqual(expected)
})