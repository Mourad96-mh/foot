import styles from './PageHero.module.css';

// Inner-page hero: navy band with argentine stripes and the crest watermark.
export default function PageHero({ eyebrow, title, lead, children }) {
  return (
    <section className={styles.hero}>
      <div className={`container ${styles.inner}`}>
        <span className="eyebrow">{eyebrow}</span>
        <h1 className={styles.title}>{title}</h1>
        {lead ? <p className={styles.lead}>{lead}</p> : null}
        {children}
      </div>
    </section>
  );
}
