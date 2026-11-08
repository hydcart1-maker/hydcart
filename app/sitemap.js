import { tools, SITE } from '../lib/tools';
export default function sitemap() {
  return [SITE, `${SITE}/tools`, ...tools.filter(t => t.live).map(t => `${SITE}${t.href || `/tools/${t.slug}`}`)].map(url => ({ url }));
}
