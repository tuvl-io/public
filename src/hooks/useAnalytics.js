import { useEffect } from 'react';
import {
  initOutboundTracking, initSectionTracking, initNavTracking, initFaqTracking,
  initScrollDepth, initEngagedTime, initCopyTracking, initHealthTracking,
} from '../lib/analytics.js';

/* Mounts the page-wide GA4 listeners: outbound clicks, section and scroll-depth funnel,
   in-page navigation, FAQ opens, engaged time, code copies, load timing and script errors. */
export function useAnalytics() {
  useEffect(() => {
    const offs = [
      initOutboundTracking(), initSectionTracking(), initNavTracking(), initFaqTracking(),
      initScrollDepth(), initEngagedTime(), initCopyTracking(), initHealthTracking(),
    ];
    return () => offs.forEach((off) => off?.());
  }, []);
}
