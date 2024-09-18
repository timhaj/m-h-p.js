# md2HTML
A lightweight markdown to HTML parser (5 kB standrad, 3 kB .min version).

## Usage
- Download `main.js` or `main.min.js` if you're having to much overhead (weird, but ok).
- Make sure you're using the correct markdown syntax, as shown [here](https://www.markdownguide.org/cheat-sheet/).
- You can use it in two ways:
  - Static: by just calling `md2HTML()`, the parser will select all div's with `md2HTML` class, and apply the parsing inside its text content.
  - Dynamic: by calling `div.innerHTML = md2HTMLParseElementText(div.textContent)`, the parser will parse the text inside the div text contents you passed as a argument. 
- See `demo.html` for a example how the parser works.

## Supports the following markdown elements:
- Headings
- Bold
- Italic
- Code emphasis
- Blockquote
- Ordered list
- Unordered list
- Horizontal rule
- Link
- Image
- Code blocks
- Tables

## Markdown elements and their conversions in HTML:
| Markdown element | HTML conversion |
| :----: | :----: |
| # Heading | `<h1> Heading </h1>` |
| ## Heading | `<h2> Heading </h1>` |
| ### Heading | `<h3> Heading </h1>` |
| #### Heading | `<h4> Heading </h1>` |
| ##### Heading | `<h5> Heading </h1>` |
| ###### Heading | `<h6> Heading </h1>` |
| `**Bold**` | `<strong>Bold</strong>` |
| `*Italic*` | `<em>Italic</em>` |
| `Code emphasis` (has ` ) | `<code>Code emphasis</code>` |
| `> Quote` | `<blockquote>Quote</blockquote>` |
| `***` | `<hr>` |
| `---` | `<hr>` |
| `___` | `<hr>` |
| `[Title](https://link.to.somewhere)` | `<a href="https://link.to.somewhere">Title</a>` |
| `![Alt text](img.png)` | `<img src="img.png" alt="Alt text"/>` |

## Contributions, issues,...
- Found any issues or want to add other complex/extended markdown syntax? Simply open a issue/PR!
