import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkToRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeFormat from "rehype-format";
import rehypeStringify from "rehype-stringify";

export async function markdown2html(content: string) {
  const result = await unified()
    .use(remarkParse)
    .use(remarkToRehype)
    .use(rehypeHighlight)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(content);
  
  return result.toString();
}
