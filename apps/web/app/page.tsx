const capabilities = [
  {
    number: '01',
    title: 'File analysis',
    description: 'Review a file you select before deciding what to do with it.',
    state: 'Engine evaluation required',
  },
  {
    number: '02',
    title: 'Quarantine',
    description: 'Keep a selected file isolated only where the platform can prove the operation.',
    state: 'Platform capability validation required',
  },
  {
    number: '03',
    title: 'Website checks',
    description: 'Check a single HTTP or HTTPS address through an approved reputation provider.',
    state: 'Pro and owner activation required',
  },
];

export default function HomePage() {
  return (
    <main className="shell">
      <header className="topbar">
        <a className="wordmark" href="/" aria-label="ZeroDeck home">
          <span className="wordmark-mark">Z</span>
          <span>zerodeck</span>
        </a>
        <span className="environment">CORE BUILD</span>
      </header>
      <section className="hero" aria-labelledby="hero-title">
        <p className="eyebrow">PERSONAL SECURITY WORKSPACE</p>
        <h1 id="hero-title">
          See clearly.
          <br />
          Stay in control.
        </h1>
        <p className="hero-copy">
          Security checks should explain what they know, what they do not know, and what happens
          next.
        </p>
      </section>
      <section className="capability-section" aria-labelledby="capability-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR TOOLS</p>
            <h2 id="capability-title">Core capabilities</h2>
          </div>
          <span className="section-count">03 MODULES</span>
        </div>
        <div className="capability-grid">
          {capabilities.map((capability) => (
            <article className="capability-card" key={capability.number}>
              <span className="card-number">{capability.number}</span>
              <h3>{capability.title}</h3>
              <p>{capability.description}</p>
              <div className="card-state">
                <span className="state-dot" aria-hidden="true" />
                <span>{capability.state}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
      <footer className="footer">
        <span>ZERO DECK · CORE DEVELOPMENT</span>
        <span>Checks are not guarantees of safety.</span>
      </footer>
    </main>
  );
}
