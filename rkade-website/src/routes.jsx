import RootLayout from '@/components/RootLayout';
import SiteLayout from '@/components/layout/SiteLayout';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Kit from '@/pages/Kit';
import Work from '@/pages/Work';
import WorkDetail from '@/pages/WorkDetail';

const routes = [
  {
    element: <RootLayout />,
    children: [
      {
        element: <SiteLayout />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/work', element: <Work /> },
          { path: '/work/:slug', element: <WorkDetail /> },
          { path: '/services', element: <Services /> },
          { path: '/about', element: <About /> },
          { path: '/contact', element: <Contact /> },
          { path: '/privacy', element: <Privacy /> },
          { path: '/terms', element: <Terms /> },
          // Dev only. Never built, so it cannot ship as a page or reach
          // the sitemap. See docs/plan/phase-02.md.
          ...(import.meta.env.DEV ? [{ path: '/kit', element: <Kit /> }] : []),
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;
