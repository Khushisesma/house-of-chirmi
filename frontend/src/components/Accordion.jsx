import { useId, useState } from 'react'
import { Seed } from './Seed'

const Item = ({ item, isOpen, onToggle, dark }) => {
  const panelId = useId()
  const btnId = useId()
  return (
    <div className={dark ? 'hair-top-dark' : 'hair-top'}>
      <h3>
        <button
          id={btnId}
          type="button"
          className="w-full flex items-center justify-between gap-6 py-7 text-left h3"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span>{item.q}</span>
          <span
            aria-hidden="true"
            className="seed-toggle"
            style={{ transform: isOpen ? 'scale(1.4)' : 'scale(1)' }}
          >
            <Seed />
          </span>
        </button>
      </h3>
      <div id={panelId} role="region" aria-labelledby={btnId} className={`acc-panel ${isOpen ? 'open' : ''}`}>
        <div className="acc-inner">
          <p className={`body-text pb-8 ${item.emphasis ? 'accent-italic' : ''}`}>{item.a}</p>
        </div>
      </div>
    </div>
  )
}

export const Accordion = ({ items, dark = false }) => {
  const [open, setOpen] = useState(null)
  return (
    <div className={dark ? 'hair-bottom-dark' : 'hair-bottom'}>
      {items.map((item, i) => (
        <Item
          key={i}
          item={item}
          dark={dark}
          isOpen={open === i}
          onToggle={() => setOpen(open === i ? null : i)}
        />
      ))}
    </div>
  )
}
