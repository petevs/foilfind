import Document from 'next/document';
import { ServerStyles, createStylesServer } from '@mantine/next';
import { cache } from '../emotion-cache';

const stylesServer = createStylesServer(cache);

export default class _Document extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      ...initialProps.styles,
      <ServerStyles html={initialProps.html} server={stylesServer} key="styles" />,
    ]
  }
  }
}