import parse, { type DOMNode, domToReact } from 'html-react-parser';
import type { CSSProperties } from 'react';
import Box from '@mui/material/Box';
import type { PageData } from '@/lib/content';
import TopicQuiz from './TopicQuiz';
import TopicProgress from './TopicProgress';
import ContentScriptShim from './ContentScriptShim';

/**
 * Renders an extracted content page (body HTML + page CSS) inside the
 * Next.js app, swapping in MUI interactive islands where the original
 * JS modules ran (quiz, progress). Server component.
 */

export default function ContentPageView({ page }: { page: PageData }) {
  const options = {
    replace: (node: DOMNode) => {
      if (node.type !== 'tag') return undefined;
      const el = node as unknown as { attribs?: Record<string, string>; name: string };
      const marker = el.attribs?.['data-bidemy'];
      if (marker === 'quiz' && page.quiz) {
        return <TopicQuiz quiz={page.quiz} />;
      }
      if (marker === 'progress') {
        return <TopicProgress tracker={page.tracker} quiz={page.quiz} />;
      }
      if (marker === 'progress-text') {
        return <span data-bidemy-hidden style={{ display: 'none' }} />;
      }
      return undefined;
    },
  };

  return (
    <Box>
      {page.css.length > 0 && (
        <style
          dangerouslySetInnerHTML={{ __html: page.css.join('\n\n') }}
        />
      )}
      <div
        className={'bidemy-content' + (page.bodyClass ? ' ' + page.bodyClass : '')}
        style={page.bodyStyle ? (Object.fromEntries(
          page.bodyStyle.split(';')
            .map((d) => d.split(':'))
            .filter((p) => p.length === 2)
            .map(([k, v]) => [
              k.trim().replace(/-([a-z])/g, (_, c: string) => c.toUpperCase()),
              v.trim(),
            ]),
        ) as CSSProperties) : undefined}
        data-page-kind={page.kind}
        data-page-source={page.source}
      >
        {parse(page.body, options as Parameters<typeof parse>[1])}
      </div>
      <ContentScriptShim />
    </Box>
  );
}

export { domToReact };
