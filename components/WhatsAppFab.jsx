import { whatsappLink } from '@/lib/site';
import { WhatsAppIcon } from './Icon';
import styles from './WhatsAppFab.module.css';

export default function WhatsAppFab({ label }) {
  return (
    <a className={`${styles.fab} no-print`} href={whatsappLink()} target="_blank" rel="noopener noreferrer" aria-label={label}>
      <WhatsAppIcon size={30} />
    </a>
  );
}
