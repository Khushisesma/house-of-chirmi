import { useState } from 'react'
import { Button } from './Button'
import { SuccessBox, ErrorNote } from './FormFeedback'
import { postJSON, EMAIL_RE } from '../lib/api'
import { needOptions, budgetOptions } from '../config/forms'

export const EnquiryForm = ({ sourcePage }) => {
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [need, setNeed] = useState('')
  const [budget, setBudget] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [form, setForm] = useState({
    name: '',
    brand: '',
    link: '',
    email: '',
    message: '',
    company: '',
  })

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setEmailErr('')
    if (!EMAIL_RE.test(form.email)) {
      setEmailErr('Please enter a valid email so we can reply.')
      return
    }
    setStatus('submitting')
    try {
      await postJSON('/enquiry', {
        ...form,
        need,
        budget,
        source_page: sourcePage,
      })
      setStatus('success')
    } catch (err) {
      setStatus('error')
    }
  }

  if (status === 'success') return <SuccessBox />

  return (
    <form onSubmit={onSubmit} data-testid="enquiry-form" className="space-y-8" noValidate>
      <input
        type="text"
        name="company"
        value={form.company}
        onChange={set('company')}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px' }}
      />

      <div>
        <label className="eyebrow block mb-2" htmlFor="enq-name">Name</label>
        <input id="enq-name" className="field-underline" value={form.name} onChange={set('name')} required data-testid="enquiry-name" />
      </div>
      <div>
        <label className="eyebrow block mb-2" htmlFor="enq-brand">Brand name</label>
        <input id="enq-brand" className="field-underline" value={form.brand} onChange={set('brand')} data-testid="enquiry-brand" />
      </div>
      <div>
        <label className="eyebrow block mb-2" htmlFor="enq-link">Instagram or website</label>
        <input id="enq-link" className="field-underline" value={form.link} onChange={set('link')} data-testid="enquiry-link" />
      </div>
      <div>
        <label className="eyebrow block mb-2" htmlFor="enq-email">Email</label>
        <input id="enq-email" type="email" className="field-underline" value={form.email} onChange={set('email')} required data-testid="enquiry-email" />
        {emailErr && <p className="body-text mt-2" style={{ color: 'var(--scarlet)' }}>{emailErr}</p>}
      </div>

      <fieldset>
        <legend className="eyebrow mb-4">What do you need?</legend>
        <div className="flex flex-wrap gap-3">
          {needOptions.map((opt) => {
            const active = need === opt
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setNeed(active ? '' : opt)}
                className="btn btn-label"
                data-testid={`need-chip-${opt}`}
                style={{
                  background: active ? 'var(--ink)' : 'transparent',
                  color: active ? 'var(--paper)' : 'var(--ink)',
                  borderColor: active ? 'var(--ink)' : 'var(--hair-on-paper)',
                  padding: '0.6rem 1.3rem',
                }}
              >
                {opt}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div>
        <label className="eyebrow block mb-2" htmlFor="enq-budget">Budget range</label>
        <select
          id="enq-budget"
          className="field-underline"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          data-testid="enquiry-budget"
        >
          <option value="">Select a range</option>
          {budgetOptions.map((b) => (
            <option key={b} value={b}>{b}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="eyebrow block mb-2" htmlFor="enq-message">Message</label>
        <textarea id="enq-message" rows={4} className="field-underline" value={form.message} onChange={set('message')} data-testid="enquiry-message" />
      </div>

      <div>
        <Button type="submit" variant="scarlet" disabled={status === 'submitting'} data-testid="enquiry-submit">
          {status === 'submitting' ? 'Sending…' : 'Start a project'}
        </Button>
        {status === 'error' && <ErrorNote />}
      </div>
    </form>
  )
}
