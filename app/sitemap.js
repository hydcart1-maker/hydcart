import { tools, SITE } from '../lib/tools';
export default function sitemap() {
  return [SITE, `${SITE}/tools`, ...tools.filter(t => t.live).map(t => `${SITE}/tools/${t.slug}`)].map(url => ({ url }));
}
