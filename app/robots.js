import { site } from '@/lib/site';

export const dynamic = 'force-static';

// AI answer engines are allowed explicitly so the academy can be cited.
const aiBots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-Web', 'anthropic-ai', 'Google-Extended', 'PerplexityBot', 'Perplexity-User', 'Applebot-Extended', 'CCBot'];

export default function robots() {
  return {
    rules: [{ userAgent: '*', allow: '/' }, ...aiBots.map((userAgent) => ({ userAgent, allow: '/' }))],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
