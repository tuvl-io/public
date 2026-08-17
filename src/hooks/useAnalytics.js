import { useEffect } from 'react';
import { initOutboundTracking, initSectionTracking } from '../lib/analytics.js';

/* Mounts the page-wide GA4 listeners: delegated outbound-click tracking and
   the once-per-section scroll-depth funnel. */
export function useAnalytics() {
  useEffect(() => {
    const offClicks = initOutboundTracking();
    const offSections = initSectionTracking();
    return () => {
      offClicks?.();
      offSections?.();
    };
  }, []);
}
