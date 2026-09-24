// Single source of truth for contact details and the domain.
// TODO (client): replace every placeholder below before launch.
export const site = {
  name: 'GEPU International Football Academy',
  shortName: 'GEPU Academy',
  url: 'https://gepu-academy.com', // TODO: final domain
  whatsapp: '966500000000', // TODO: international format, digits only
  phone: '+966 50 000 0000', // TODO
  phoneHref: '+966500000000', // TODO
  email: 'contact@gepu-academy.com', // TODO
  registrationEmail: 'inscription@gepu-academy.com', // TODO
  address: 'San Luis, Argentina',
  social: {
    instagram: '', // TODO: e.g. https://instagram.com/gepu.academy
    youtube: '',
    tiktok: '',
    x: '',
  },
};

export const whatsappLink = (text = '') =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ''}`;

export const mailtoLink = (to, subject, body) =>
  `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
