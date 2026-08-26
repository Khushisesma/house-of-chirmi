import { Seed } from './Seed'
import { contact } from '../config/contact'

export const SuccessBox = ({ inverted = false }) => (
  <div
    className="p-8 md:p-12 text-center"
    style={{ border: `1px solid ${inverted ? 'var(--hair-on-ink)' : 'var(--hair-on-paper)'}` }}
    role="status"
    data-testid="form-success"
  >
    <div className="flex justify-center mb-6" style={{ fontSize: '1.6rem' }}>
      <Seed inverted={inverted} />
    </div>
    <p className="statement">Got it. We read every enquiry ourselves and reply within 24 hours.</p>
  </div>
)

export const ErrorNote = ({ inverted = false }) => (
  <p
    className="body-text mt-4"
    data-testid="form-error"
    style={{ color: inverted ? 'var(--paper)' : 'var(--ink)' }}
  >
    That didn&rsquo;t send. Email {contact.email} and we&rsquo;ll pick it up from there.
  </p>
)
