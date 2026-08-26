import { Seo } from '../components/Seo'
import { Section } from '../components/Section'
import { Reveal } from '../components/Reveal'
import { MaskedHeading } from '../components/MaskedHeading'
import { EnquiryForm } from '../components/EnquiryForm'
import { useDarkHero } from '../components/LayoutContext'
import { contact } from '../config/contact'

const details = [
  { label: 'Email', value: contact.email, href: contact.emailHref, external: false },
  { label: 'WhatsApp', value: contact.whatsapp, href: contact.whatsappHref, external: true },
  { label: 'Instagram', value: contact.instagramLabel, href: contact.instagram, external: true },
]

export default function Contact() {
  useDarkHero(false)
  return (
    <>
      <Seo title="Contact" description="Tell us what you're building. We reply to everything within 24 hours." path="/contact" />

      <Section background="paper" flush className="pt-nav-h pb-section-y">
        <div className="pt-24">
          <MaskedHeading className="h-page mb-16" lines={[<>Tell us what</>, <>you&rsquo;re building.</>]} />
        </div>

        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-16 lg:gap-24">
          <Reveal>
            <EnquiryForm sourcePage="contact" />
          </Reveal>

          <Reveal delay={0.1}>
            <div className="hair-bottom">
              {details.map((d) => (
                <a
                  key={d.label}
                  href={d.href}
                  {...(d.external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  className="hair-top flex items-baseline justify-between gap-6 py-6"
                >
                  <span className="eyebrow">{d.label}</span>
                  <span className="body-text">{d.value}</span>
                </a>
              ))}
            </div>
            <p className="display-italic-lg mt-10">
              We reply to everything within 24 hours.
            </p>
          </Reveal>
        </div>
      </Section>
    </>
  )
}
