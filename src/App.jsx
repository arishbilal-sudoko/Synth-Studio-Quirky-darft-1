import { lazy, Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import useScrollVars from './hooks/useScrollVars.js';
import Cursor from './components/Cursor.jsx';
import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import HomePage from './pages/HomePage.jsx';

const StudioPage = lazy(() => import('./pages/StudioPage.jsx'));

function ScrollToLocation() {
  const location = useLocation();
  const { pathname, hash, key } = location;

  useEffect(() => {
    document.title = pathname === '/studio'
      ? 'Studio — Synthweb'
      : 'Synthweb Studio — Web Design, SEO & Digital Marketing';

    const id = window.setTimeout(() => {
      if (hash) {
        document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'auto' });
        document.querySelector('main')?.focus({ preventScroll: true });
      }
    }, 30);
    return () => window.clearTimeout(id);
  }, [pathname, hash, key]);

  return null;
}

export default function App() {
  useScrollVars();
  const location = useLocation();

  return (
    <>
      <ScrollToLocation />
      <Cursor />
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/studio" element={<Suspense fallback={<div className="route-loading" role="status" aria-live="polite"><span>Loading Studio…</span></div>}><StudioPage /></Suspense>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer showContactCards={location.pathname !== '/studio'} />
    </>
  );
}
