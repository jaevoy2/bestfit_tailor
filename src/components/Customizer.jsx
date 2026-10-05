import { useState } from 'react'
import { accents } from '../config'

export default function Customizer({ accent, setAccent, mode, setMode, name, setName, reset }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="customizer">
      {open && (
        <div className="panel" role="dialog" aria-label="Customize site">
          <h4>Customize</h4>
          <label>Brand name
            <input value={name} maxLength={18} onChange={(e) => setName(e.target.value)} />
          </label>
          <div>
            <span className="label">Accent colour</span>
            <div className="swatches">
              {accents.map((c) => (
                <button key={c} className={`swatch ${c === accent ? 'on' : ''}`} style={{ background: c }}
                  aria-label={`Accent ${c}`} onClick={() => setAccent(c)} />
              ))}
              <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} aria-label="Custom accent" />
            </div>
          </div>
          <div className="seg">
            {['light', 'dark'].map((m) => (
              <button key={m} className={m === mode ? 'on' : ''} onClick={() => setMode(m)}>{m}</button>
            ))}
          </div>
          <button className="link" onClick={reset}>Reset</button>
        </div>
      )}
      <button className="fab" onClick={() => setOpen((o) => !o)} aria-label="Customize" aria-expanded={open}>⚙</button>
    </div>
  )
}
