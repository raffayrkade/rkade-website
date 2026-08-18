import { Outlet } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import ScrollToTop from '@/components/ScrollToTop';
import SmoothScroll from '@/components/common/SmoothScroll';
import LoadIn from '@/components/common/LoadIn';

export default function RootLayout() {
  return (
    <SmoothScroll>
      {/* The outermost <Head> on the page, so react-helmet-async registers it
          before every other one (SiteLayout's, then the page's own <Seo>).
          It has to stay a real <meta charSet> rather than the plain static
          tag index.html used to carry: vite-react-ssg's SSG injector always
          inserts every route's collected <Head> tags right after `<head>`,
          ahead of whatever was already in index.html, so a static charset
          tag there ends up pushed past byte 1024 by the title, description
          and Organization JSON-LD that now come first. Managing it through
          Head keeps it the very first tag written, on every route including
          404. See docs/GOTCHAS.md. */}
      <Head>
        <meta charSet="UTF-8" />
      </Head>
      <LoadIn />
      <ScrollToTop />
      <Outlet />
    </SmoothScroll>
  );
}
