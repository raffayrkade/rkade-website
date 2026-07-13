import { Outlet } from 'react-router-dom';
import ScrollToTop from '@/components/ScrollToTop';
import SmoothScroll from '@/components/common/SmoothScroll';
import LoadIn from '@/components/common/LoadIn';

export default function RootLayout() {
  return (
    <SmoothScroll>
      <LoadIn />
      <ScrollToTop />
      <Outlet />
    </SmoothScroll>
  );
}
