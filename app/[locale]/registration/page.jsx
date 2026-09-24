import { getDict } from '@/i18n';
import { pageMetadata } from '@/lib/seo';
import { whatsappLink } from '@/lib/site';
import PageHero from '@/components/PageHero';
import RegistrationForm from '@/components/RegistrationForm/RegistrationForm';
import Icon, { WhatsAppIcon } from '@/components/Icon';
import styles from './registration.module.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return pageMetadata(locale, 'registration');
}

export default async function Registration({ params }) {
  const { locale } = await params;
  const dict = getDict(locale);
  const t = dict.registration;

  return (
    <>
      <div className="no-print">
        <PageHero {...t.hero} />
      </div>

      <section className={`section ${styles.section}`}>
        <div className={`container ${styles.layout}`}>
          <RegistrationForm t={t} locale={locale} />

          <aside className={`${styles.aside} no-print`}>
            <div className={styles.card}>
              <img src="/img/registration-form.webp" alt="" width="600" height="848" loading="lazy" className={styles.paper} />
              <h2>{t.paper.title}</h2>
              <p>{t.paper.text}</p>
              <a href="/gepu-registration-form.png" download className="btn btn--outline">
                <Icon name="download" size={20} /> {dict.cta.downloadForm}
              </a>
            </div>
            <div className={`${styles.card} ${styles.help}`}>
              <p>{dict.contact.channels.whatsappText}</p>
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="btn btn--whatsapp">
                <WhatsAppIcon size={20} /> {dict.cta.whatsapp}
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
