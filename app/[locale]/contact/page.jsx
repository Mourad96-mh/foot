import { getDict } from '@/i18n';
import { pageMetadata } from '@/lib/seo';
import { site, whatsappLink } from '@/lib/site';
import PageHero from '@/components/PageHero';
import ContactForm from '@/components/ContactForm';
import Icon, { WhatsAppIcon } from '@/components/Icon';
import styles from './contact.module.css';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return pageMetadata(locale, 'contact');
}

export default async function Contact({ params }) {
  const { locale } = await params;
  const dict = getDict(locale);
  const { hero, channels, form } = dict.contact;

  const cards = [
    { key: 'whatsapp', icon: <WhatsAppIcon size={26} />, title: channels.whatsapp, value: <bdi dir="ltr">{site.phone}</bdi>, text: channels.whatsappText, href: whatsappLink(), external: true, accent: true },
    { key: 'phone', icon: <Icon name="phone" size={24} />, title: channels.phone, value: <bdi dir="ltr">{site.phone}</bdi>, href: `tel:${site.phoneHref}` },
    { key: 'email', icon: <Icon name="mail" size={24} />, title: channels.email, value: site.email, href: `mailto:${site.email}` },
    { key: 'address', icon: <Icon name="pin" size={24} />, title: channels.address, value: site.address },
  ];

  return (
    <>
      <PageHero {...hero} />
      <section className="section section--tint">
        <div className={`container ${styles.layout}`}>
          <ul className={styles.channels}>
            {cards.map((c) => {
              const inner = (
                <>
                  <span className={`icon-badge ${c.accent ? styles.wa : ''}`}>{c.icon}</span>
                  <span className={styles.body}>
                    <strong>{c.title}</strong>
                    <span className={styles.value}>{c.value}</span>
                    {c.text ? <small>{c.text}</small> : null}
                  </span>
                </>
              );
              return (
                <li key={c.key}>
                  {c.href ? (
                    <a className={styles.channel} href={c.href} {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{inner}</a>
                  ) : (
                    <div className={styles.channel}>{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
          <ContactForm t={form} required={dict.registration.errors.required} />
        </div>
      </section>
    </>
  );
}
