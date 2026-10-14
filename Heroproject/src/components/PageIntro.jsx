export default function PageIntro({ label, title, description, children }) {
  return (
    <header className="pg-intro">
      <span className="section-label">{label}</span>
      <h1 className="section-title">{title}</h1>
      <p className="section-copy">{description}</p>
      {children}
    </header>
  );
}
