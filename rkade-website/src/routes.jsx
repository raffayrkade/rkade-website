import RootLayout from '@/components/RootLayout';
import SiteLayout from '@/components/layout/SiteLayout';
import Home from '@/pages/Home';
import Services from '@/pages/Services';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import NotFound from '@/pages/NotFound';

const routes = [
  {
    element: <RootLayout />,
    children: [
      {
        element: <SiteLayout />,
        children: [
          { path: '/', element: <Home /> },
          { path: '/services', element: <Services /> },
          { path: '/about', element: <About /> },
          { path: '/contact', element: <Contact /> },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
];

export default routes;
