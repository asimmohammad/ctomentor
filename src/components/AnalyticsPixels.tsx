"use client";

import Script from "next/script";

/**
 * Optional ad pixels. IDs come from NEXT_PUBLIC_* env vars.
 * Components never call these SDKs directly — only lib/analytics.ts does.
 */
export function AnalyticsPixels() {
  const linkedIn = process.env.NEXT_PUBLIC_LINKEDIN_PARTNER_ID;
  const meta = process.env.NEXT_PUBLIC_META_PIXEL_ID;
  const reddit = process.env.NEXT_PUBLIC_REDDIT_PIXEL_ID;

  return (
    <>
      {meta ? (
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','${meta}');
          fbq('track','PageView');
        `}</Script>
      ) : null}

      {linkedIn ? (
        <Script id="linkedin-insight" strategy="afterInteractive">{`
          _linkedin_partner_id = "${linkedIn}";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          (function(l){if(!l){window.lintrk=function(a,b){window.lintrk.q.push([a,b])};
          window.lintrk.q=[]}var s=document.getElementsByTagName("script")[0];
          var b=document.createElement("script");b.type="text/javascript";b.async=true;
          b.src="https://snap.licdn.com/li.lms-analytics/insight.min.js";
          s.parentNode.insertBefore(b,s);})(window.lintrk);
        `}</Script>
      ) : null}

      {reddit ? (
        <Script id="reddit-pixel" strategy="afterInteractive">{`
          !function(w,d){if(!w.rdt){var p=w.rdt=function(){p.sendEvent?p.sendEvent.apply(p,arguments):p.callQueue.push(arguments)};
          p.callQueue=[];var t=d.createElement("script");t.src="https://www.redditstatic.com/ads/pixel.js";t.async=!0;
          var s=d.getElementsByTagName("script")[0];s.parentNode.insertBefore(t,s);rdt("init","${reddit}");rdt("track","PageVisit");
          }}(window,document);
        `}</Script>
      ) : null}
    </>
  );
}
