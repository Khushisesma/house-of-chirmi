import { useState } from 'react'
import { Button } from './Button'
import { SuccessBox, ErrorNote } from './FormFeedback'
import { postJSON } from '../lib/api'
import { creatorCategories } from '../config/forms'

export const CreatorForm = () => {
  const [status, setStatus] = useState('idle')
  const [cats, setCats] = useState([])
  const [form, setForm] = useState({
    name: '',
    handle: '',
    city: '',
    sample_1: '',
    sample_2: '',
    company: '',
  })
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const toggleCat = (c) =>
    setCats((prev) => (prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]))

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      await postJSON('/creator', { ...form, categories: cats })
      setStatus('success')
    } catch (err) {
      setStatus('error')
    }
  }

  if (status === 'success') return <SuccessBox inverted />

  return (
    <form onSubmit={onSubmit} data-testid="creator-form" className="space-y-8" noValidate>
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

      <div className="grid sm:grid-cols-2 gap-8">
        <div>
          <label className="eyebrow block mb-2" htmlFor="cr-name">Name</label>
          <input id="cr-name" className="field-underline field-underline--paper" value={form.name} onChange={set('name')} required data-testid="creator-name" />
        </div>
        <div>
          <label className="eyebrow block mb-2" htmlFor="cr-handle">Instagram handle</label>
          <input id="cr-handle" className="field-underline field-underline--paper" value={form.handle} onChange={set('handle')} required data-testid="creator-handle" />
        </div>
      </div>
      <div>
        <label className="eyebrow block mb-2" htmlFor="cr-city">City</label>
        <input id="cr-city" className="field-underline field-underline--paper" value={form.city} onChange={set('city')} data-testid="creator-city" />
      </div>

      <fieldset>
        <legend className="eyebrow mb-4">Categories</legend>
        <div className="flex flex-wrap gap-3">
          {creatorCategories.map((c) => {
            const active = cats.includes(c)
            return (
              <button
                key={c}
                type="button"
                onClick={() => toggleCat(c)}
                aria-pressed={active}
                className="btn btn-label"
                data-testid={`creator-cat-${c}`}
                style={{
                  background: active ? 'var(--paper)' : 'transparent',
                  color: active ? 'var(--ink)' : 'var(--paper)',
                  borderColor: 'var(--paper)',
                  padding: '0.6rem 1.3rem',
                }}
              >
                {c}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="grid sm:grid-cols-2 gap-8">
        <div>
          <label className="eyebrow block mb-2" htmlFor="cr-s1">Sample link one</label>
          <input id="cr-s1" className="field-underline field-underline--paper" value={form.sample_1} onChange={set('sample_1')} data-testid="creator-sample1" />
        </div>
        <div>
          <label className="eyebrow block mb-2" htmlFor="cr-s2">Sample link two</label>
          <input id="cr-s2" className="field-underline field-underline--paper" value={form.sample_2} onChange={set('sample_2')} data-testid="creator-sample2" />
        </div>
      </div>

      <div>
        <Button type="submit" variant="outline" disabled={status === 'submitting'} data-testid="creator-submit">
          {status === 'submitting' ? 'Sending…' : 'Apply to the Collective'}
        </Button>
        {status === 'error' && <ErrorNote inverted />}
      </div>
    </form>
  )
}
