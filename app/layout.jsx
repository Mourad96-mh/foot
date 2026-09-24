import './globals.css';

// The real root layout (with <html lang dir>) is app/[locale]/layout.jsx.
// This pass-through exists so the root redirect page and the global 404
// can render their own <html>.
export default function RootLayout({ children }) {
  return children;
}
