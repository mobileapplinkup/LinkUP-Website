import { useCallback, useEffect, useState } from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
import Navbar from './components/Navbar.jsx';
import HeroSection from './components/HeroSection.jsx';
import AppPreviewSection from './components/AppPreviewSection.jsx';
import SocialLinksSection from './components/SocialLinksSection.jsx';
import TokenStoreSection from './components/TokenStoreSection.jsx';
import PricingSection from './components/PricingSection.jsx';
import FaqSection from './components/FaqSection.jsx';
import SafetySection from './components/SafetySection.jsx';
import Footer from './components/Footer.jsx';
import Modal from './components/Modal.jsx';
import LegalDoc from './components/LegalDoc.jsx';
import AuthModalContent from './components/AuthModal.jsx';
import { DownloadContent } from './components/Download.jsx';
import { LEGAL_DOCS } from './data/legalContent.js';

// Legal pages are reachable by direct link for App Store / Google Play listings:
//   /#legal/privacy  /#legal/terms  /#legal/safety  /#legal/support
const LEGAL_PREFIX = '#legal/';
const docFromHash = () => {
  const { hash } = window.location;
  if (!hash.startsWith(LEGAL_PREFIX)) return null;
  const id = hash.slice(LEGAL_PREFIX.length);
  return LEGAL_DOCS.some((d) => d.id === id) ? id : null;
};

export default function App() {
  const [downloadOpen, setDownloadOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [doc, setDoc] = useState(docFromHash);

  useEffect(() => {
    const onHash = () => {
      const id = docFromHash();
      if (id) setDoc(id);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const openDoc = useCallback((id) => {
    setDoc(id);
    window.history.replaceState(null, '', `${LEGAL_PREFIX}${id}`);
  }, []);

  const closeDoc = useCallback(() => {
    setDoc(null);
    window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }, []);

  const openDownload = useCallback(() => setDownloadOpen(true), []);
  const closeDownload = useCallback(() => setDownloadOpen(false), []);
  const openAuth = useCallback(() => setAuthOpen(true), []);
  const closeAuth = useCallback(() => setAuthOpen(false), []);

  return (
    <AuthProvider>
      <Navbar onDownload={openDownload} onOpenAuth={openAuth} />
      <main>
        <HeroSection onDownload={openDownload} />
        <AppPreviewSection />
        <SocialLinksSection />
        <TokenStoreSection onOpenAuth={openAuth} />
        <PricingSection onDownload={openDownload} />
        <FaqSection />
        <SafetySection onOpenDoc={openDoc} />
      </main>
      <Footer onOpenDoc={openDoc} />

      <Modal open={downloadOpen} onClose={closeDownload} title="Get LinkUp">
        <DownloadContent />
      </Modal>
      <Modal open={authOpen} onClose={closeAuth} title="Sign in to LinkUp">
        <AuthModalContent onSuccess={closeAuth} />
      </Modal>
      <Modal open={Boolean(doc)} onClose={closeDoc} wide>
        {doc && <LegalDoc id={doc} onSwitch={openDoc} />}
      </Modal>
    </AuthProvider>
  );
}
