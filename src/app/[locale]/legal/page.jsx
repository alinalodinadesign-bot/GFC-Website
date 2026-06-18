'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

const SECTIONS = [
  { id: 'privacy',  label: 'Privacy Policy' },
  { id: 'cookies',  label: 'Cookie Policy' },
  { id: 'terms',    label: 'Terms & Conditions' },
  { id: 'imprint',  label: 'Legal Notice' },
];

function Section({ id, title, children }) {
  return (
    <section id={id} style={{ paddingTop: 80, marginTop: -80 }}>
      <h2 style={{
        fontFamily: 'var(--font-display)', fontWeight: 700,
        textTransform: 'uppercase', letterSpacing: '-0.03em',
        fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--ink)',
        marginBottom: 40, paddingBottom: 16,
        borderBottom: '1px solid var(--rule)',
      }}>{title}</h2>
      {children}
    </section>
  );
}

function H3({ children }) {
  return <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--ink)', marginTop: 36, marginBottom: 10 }}>{children}</h3>;
}

function P({ children }) {
  return <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--fg-2)', marginBottom: 12 }}>{children}</p>;
}

function Meta({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: 16, marginBottom: 6 }}>
      <span style={{ fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--fg-3)', minWidth: 180, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: 13, color: 'var(--fg-2)' }}>{value}</span>
    </div>
  );
}

export default function LegalPage() {
  const [active, setActive] = useState('privacy');
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: '-20% 0px -70% 0px' }
    );
    SECTIONS.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main style={{ background: 'var(--paper)', minHeight: '100vh', paddingTop: 80 }}>
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '0 clamp(16px,4vw,48px)' }}>

        {/* Page header */}
        <div style={{ paddingTop: 64, paddingBottom: 48, borderBottom: '1px solid var(--rule)' }}>
          <span style={{ fontSize: 11, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--fg-3)', display: 'block', marginBottom: 12 }}>( Legal )</span>
          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, textTransform: 'uppercase',
            letterSpacing: '-0.04em', lineHeight: 0.9,
            fontSize: 'clamp(40px, 6vw, 72px)', color: 'var(--ink)', margin: 0,
          }}>Legal &<br />Privacy</h1>
          <p style={{ marginTop: 20, fontSize: 14, color: 'var(--fg-3)', maxWidth: 480 }}>
            Global Fashion Code / MAG Model Agent Group · Austria, Kufstein 6330, Einfangstrasse 6 · info@globalfashioncode.com
          </p>
        </div>

        {/* Two-column layout */}
        <div className="legal-layout" style={{ display: 'flex', gap: 'clamp(32px, 6vw, 80px)', alignItems: 'flex-start', paddingBottom: 120 }}>

          {/* Sticky sidebar */}
          <aside className="legal-sidebar" style={{
            position: 'sticky', top: 100, flexShrink: 0, width: 200,
            paddingTop: 48,
          }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {SECTIONS.map(s => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    textAlign: 'left', padding: '8px 12px',
                    fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase',
                    fontFamily: 'var(--font-body)', fontWeight: active === s.id ? 700 : 400,
                    color: active === s.id ? 'var(--ink)' : 'var(--fg-3)',
                    borderLeft: `2px solid ${active === s.id ? 'var(--ink)' : 'transparent'}`,
                    transition: 'all 0.2s',
                  }}
                >
                  {s.label}
                </button>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <div ref={containerRef} style={{ flex: 1, minWidth: 0, paddingTop: 48 }}>

            {/* 1. Privacy Policy */}
            <Section id="privacy" title="1. Privacy Policy">
              <P><em style={{ color: 'var(--fg-3)', fontStyle: 'normal', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Last updated: 15.06.2026</em></P>
              <P>Global Fashion Code respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, share and protect personal data when you visit our website, submit an application, contact us or participate in Global Fashion Code projects, events, castings, education programs, showcases, awards, photoshoots, media activities or related professional opportunities.</P>
              <P>We process personal data in accordance with applicable data protection laws, including the General Data Protection Regulation (GDPR) and applicable Austrian data protection rules.</P>

              <H3>1.1 Data Controller</H3>
              <P>The data controller responsible for the processing of your personal data is MAG Model Agent Group, operating project Global Fashion Code.</P>
              <Meta label="Address" value="Austria, Kufstein 6330, Einfangstrasse 6" />
              <Meta label="Email" value="info@globalfashioncode.com" />
              <Meta label="Website" value="www.globalfashioncode.com" />

              <H3>1.2 Personal Data We May Collect</H3>
              <P>We may collect and process the following personal data: name, surname, date of birth, age, gender, nationality, country of residence, contact details, email address, phone number, social media profiles and communication details; professional information including portfolio, photos, videos, measurements, height, clothing size, shoe size, modelling experience, agency representation, creative work, brand information, professional background and links to previous work; application data submitted through website forms, email, social media, partner platforms or direct communication; parent or legal guardian details where the applicant or participant is under 18; event-related data including participation status, casting results, schedules, attendance, backstage content, photos, videos, interviews, media materials, award results and professional feedback; payment, invoice and transaction data where participation fees, services or purchases are involved; technical data including IP address, browser type, device information, website usage data, cookie preferences and analytics data where permitted.</P>

              <H3>1.3 Purposes of Processing</H3>
              <P>We process personal data to receive, review and manage applications for Global Fashion Code projects; to select participants for castings, showcases, education programs, runway shows, awards, photoshoots and agency meetings; to communicate with applicants, participants, parents, legal guardians, agencies, partners, media, sponsors and industry professionals; to organise and manage events, schedules, castings, rehearsals, fittings, photoshoots, education sessions, backstage activities, awards and professional meetings; to present selected talents, brands and professionals to international model agencies, scouts, bookers, casting directors, designers, photographers, media partners, sponsors and other professional partners; to create, publish and archive project-related photo, video, editorial, social media, press and promotional materials where permitted by law or separate consent; to process payments, invoices, contracts and administrative matters; to improve our website, communication, services, application process and event experience; to comply with legal, accounting, tax, security and regulatory obligations.</P>

              <H3>1.4 Legal Basis for Processing</H3>
              <P><strong>Consent:</strong> when you submit an application, agree to receive communications, agree to cookie categories or provide media permission where required.</P>
              <P><strong>Pre-contractual or contractual necessity:</strong> when processing is necessary to review your application, organise participation or provide agreed services.</P>
              <P><strong>Legitimate interests:</strong> when processing is necessary for project management, communication with partners, event organisation, business protection, website improvement, professional presentation and promotion of Global Fashion Code, provided that your rights and freedoms do not override these interests.</P>
              <P><strong>Legal obligations:</strong> when processing is required for accounting, tax, safety, legal or regulatory reasons.</P>

              <H3>1.5 Participants Under 18</H3>
              <P>Some Global Fashion Code projects may involve minors. If an applicant or participant is under 18, we may require the involvement, consent and contact details of a parent or legal guardian. We do not knowingly accept participation of minors without appropriate parental or legal guardian involvement where required.</P>

              <H3>1.6 Sharing Personal Data</H3>
              <P>We may share personal data where necessary with trusted third parties, including: international model agencies, scouts, bookers, casting directors and fashion industry professionals; designers, photographers, videographers, makeup artists, hairstylists, stylists, production teams, venues, sponsors and event partners; media partners, magazines, PR partners, social media teams and publishing partners; IT providers, website hosting providers, email systems, cloud storage providers, form tools, CRM tools, analytics tools and payment providers; accountants, legal advisors, insurance providers, administrative service providers and public authorities where required by law. We do not sell personal data.</P>

              <H3>1.7 International Data Transfers</H3>
              <P>Global Fashion Code works with international agencies, scouts, bookers, media and professional partners. This means that personal data and selected application or project materials may be transferred or made accessible outside your country of residence, including within the European Economic Area and, where relevant, to countries outside the EEA. Where required, we take appropriate steps to protect personal data in accordance with applicable law.</P>

              <H3>1.8 Photos, Videos and Media Materials</H3>
              <P>Global Fashion Code projects may be photographed, filmed and covered by media teams. Photos, videos, interviews and other project-related materials may be used for website content, social media, press, portfolio, event documentation, promotional materials, editorial publications, archive and partner communication. Where required, media usage will be covered by a separate Media Release / Participation Terms Agreement.</P>

              <H3>1.9 Cookies and Analytics</H3>
              <P>Our website may use cookies and similar technologies. Strictly necessary cookies are used to make the website function and cannot be switched off. Optional cookies, including analytics, marketing, tracking and social media cookies, are used only where permitted by law and, where required, only with your prior consent. You can accept all cookies, reject non-essential cookies or manage your preferences through the cookie banner.</P>

              <H3>1.10 Data Retention</H3>
              <P>We keep personal data only for as long as necessary for the purposes described in this Privacy Policy. Application data may be kept for a reasonable period to manage selections, future opportunities and communication with applicants, unless deletion is requested earlier. Photos, videos, press materials, published content and project archives may remain available where they have been lawfully created and used for event, editorial, archive, documentation, portfolio or promotional purposes.</P>

              <H3>1.11 Your Rights</H3>
              <P>Depending on applicable law, you may have the right to: request access to your personal data; request correction of inaccurate or incomplete data; request deletion of your personal data; request restriction of processing; object to certain types of processing; withdraw consent at any time where processing is based on consent; request data portability where applicable; lodge a complaint with a competent data protection authority. To exercise your rights, please contact: info@globalfashioncode.com.</P>

              <H3>1.12 Security</H3>
              <P>We take reasonable technical and organisational measures to protect personal data against unauthorised access, loss, misuse, alteration or disclosure.</P>

              <H3>1.13 Changes to This Privacy Policy</H3>
              <P>We may update this Privacy Policy from time to time. The updated version will be published on this page with a new "Last updated" date.</P>

              <H3>1.14 Contact</H3>
              <P>For questions about this Privacy Policy or personal data processing, please contact Global Fashion Code / MAG Model Agent Group at info@globalfashioncode.com.</P>
            </Section>

            <div style={{ margin: '64px 0', borderTop: '1px solid var(--rule)' }} />

            {/* 2. Cookie Policy */}
            <Section id="cookies" title="2. Cookie Policy">
              <P><em style={{ color: 'var(--fg-3)', fontStyle: 'normal', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Last updated: 15.06.2026</em></P>
              <P>This Cookie Policy explains how Global Fashion Code uses cookies and similar technologies on our website. Cookies are small text files stored on your device when you visit a website. They help websites function, remember preferences, understand website usage and support communication or marketing activities.</P>

              <H3>2.1 Types of Cookies We Use</H3>
              <P><strong>Strictly Necessary Cookies</strong> — Required for the website to function, remain secure and provide basic features. These cookies cannot be switched off because the website cannot work properly without them.</P>
              <P><strong>Analytics Cookies</strong> — These cookies help us understand how visitors use our website, which pages are visited and how we can improve our content, structure and user experience. Analytics cookies are used only with your consent where required.</P>
              <P><strong>Marketing and Social Media Cookies</strong> — These cookies may be used to measure campaigns, personalise content, connect with social media platforms, support advertising activities or understand the effectiveness of communication. These cookies are used only with your consent where required.</P>
              <P><strong>Preference Cookies</strong> — These cookies may remember your selected settings, such as language or cookie preferences, where applicable.</P>

              <H3>2.2 Consent</H3>
              <P>When you visit our website, you may accept all cookies, reject non-essential cookies or manage your preferences by category. Strictly necessary cookies are always active because they are required for the website to operate. Optional cookies, including analytics, marketing, tracking and social media cookies, are used only if you give consent where required by law. You may change or withdraw your consent at any time through the Cookie Settings link on the website.</P>

              <H3>2.3 Third-Party Cookies</H3>
              <P>Some cookies may be placed by third-party providers, such as analytics tools, social media platforms, embedded content providers, advertising tools or payment systems. These third parties may process data according to their own privacy and cookie policies.</P>
            </Section>

            <div style={{ margin: '64px 0', borderTop: '1px solid var(--rule)' }} />

            {/* 3. Terms & Conditions */}
            <Section id="terms" title="3. Terms & Conditions">
              <P><em style={{ color: 'var(--fg-3)', fontStyle: 'normal', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Last updated: 15.06.2026</em></P>
              <P>These Website Terms & Conditions govern the use of the Global Fashion Code website and online content. By using this website, you agree to these Terms & Conditions.</P>

              <H3>3.1 Website Operator</H3>
              <Meta label="Project" value="Global Fashion Code" />
              <Meta label="Address" value="Austria, Kufstein 6330, Einfangstrasse 6" />
              <Meta label="Email" value="info@globalfashioncode.com" />
              <Meta label="Website" value="www.globalfashioncode.com" />

              <H3>3.2 Purpose of the Website</H3>
              <P>The website provides information about Global Fashion Code projects, including fashion events, castings, education programs, showcases, awards, application opportunities, media activities and professional networking formats. The information on the website is provided for general informational and promotional purposes.</P>

              <H3>3.3 Applications and Selection</H3>
              <P>Submitting an application through the website does not guarantee acceptance, participation, casting approval, agency representation, contract, award, publication, paid work or any specific professional result. Global Fashion Code may review applications based on project criteria, professional suitability, availability, age, height, measurements, portfolio, experience, project needs and partner requirements.</P>

              <H3>3.4 No Guarantee of Contracts or Results</H3>
              <P>Global Fashion Code creates opportunities for visibility, education, casting access, professional presentation, agency meetings, networking and media exposure. However, final decisions regarding contracts, bookings, representation, publications, awards, cooperation or future opportunities are made by independent agencies, partners, clients, media, sponsors, judges or industry professionals. No statement on the website should be interpreted as a guarantee of contract, agency signing, paid work, visa, publication, award, booking or financial result.</P>

              <H3>3.5 Intellectual Property</H3>
              <P>All website content, including names, logos, project titles, texts, images, videos, graphics, layouts, design, concepts, program structures and materials, belongs to Global Fashion Code or its licensors unless otherwise stated. You may not copy, reproduce, distribute, modify, sell, publish or use website content for commercial purposes without prior written permission.</P>

              <H3>3.6 User Conduct</H3>
              <P>You agree not to misuse the website, submit false information, upload unlawful content, infringe third-party rights, attempt to access restricted systems, damage the website, use automated scraping tools or engage in conduct that may harm Global Fashion Code, its partners, participants or users.</P>

              <H3>3.7 Limitation of Liability</H3>
              <P>To the extent permitted by applicable law, Global Fashion Code is not liable for indirect losses, missed opportunities, rejected applications, technical problems, website interruptions, third-party actions, travel issues, agency decisions, casting results or reliance on website information.</P>

              <H3>3.8 Governing Law</H3>
              <P>These Terms & Conditions are governed by the laws of Austria, unless mandatory consumer protection or other applicable laws provide otherwise. Any disputes shall first be discussed in good faith. If no amicable solution is found, competent courts shall be determined in accordance with applicable law.</P>
            </Section>

            <div style={{ margin: '64px 0', borderTop: '1px solid var(--rule)' }} />

            {/* 4. Legal Notice */}
            <Section id="imprint" title="4. Legal Notice / Imprint">
              <P>Information according to applicable Austrian legal requirements, including the Austrian E-Commerce Act and Media Act, where applicable.</P>

              <H3>Website Operator / Media Owner</H3>
              <Meta label="Website" value="www.globalfashioncode.com" />
              <Meta label="Business Name" value="Global Fashion Code" />
              <Meta label="Operating Entity" value="MAG Model Agent Group" />
              <Meta label="Address" value="Einfangstrasse 6, Kufstein 6330, Austria" />
              <Meta label="Email" value="info@globalfashioncode.com" />

              <H3>Business Purpose</H3>
              <P>Fashion events, model castings, education programs, fashion showcases, media projects, professional networking and related services.</P>

              <H3>Disclaimer</H3>
              <P>We make reasonable efforts to keep the information on this website accurate and up to date. However, we do not guarantee that all information is complete, current or error-free.</P>

              <H3>External Links</H3>
              <P>This website may contain links to external websites. We are not responsible for the content, privacy practices or security of external websites.</P>

              <H3>Copyright</H3>
              <P>All content on this website, including texts, images, videos, logos and design elements, is protected by copyright and may not be used without prior written permission.</P>
            </Section>

          </div>
        </div>
      </div>
    </main>
  );
}
