import { notFound } from 'next/navigation';
import { Land, Zakat, Biryani, Electricity, Metro, Namaz, ImagePdf } from './Tools';
const T = {
  'land-unit-converter': { C: Land, h: 'Land & plot converter', title: 'Land & Plot Converter: Sq Yards, Sq Ft, Gunta, Acre', desc: 'Convert square yards (gaj), square feet, gunta, acre, cent and square metres instantly.',
    intro: 'Plots in Hyderabad are sold in square yards and farmland in gunta and acres. Convert between all of them in one place.',
    faq: [['How many square yards are in a gunta?', 'One gunta is 121 square yards (1,089 square feet).'], ['How many gunta make an acre?', '40 gunta make one acre, which is 4,840 square yards.']] },
  'namaz-timings-hyderabad': { C: Namaz, h: 'Namaz, Sehri & Iftar timings: Hyderabad', title: 'Namaz Timings Hyderabad, Sehri & Iftar Time', desc: 'Daily prayer times for Hyderabad with Sehri (Fajr) and Iftar (Maghrib), plus a 30 day timetable.',
    intro: 'Calculated prayer times for Hyderabad. Choose your method and Asr school, and see the next 30 days.',
    faq: [['Which time is Sehri and Iftar?', 'Sehri ends at Fajr and Iftar is at Maghrib. Many people stop eating a few minutes before Fajr to be safe.'], ['Why does my masjid show a different time?', 'Masjids may use another method or add a margin. These times are calculated, so follow your local masjid timetable.']] },
  'zakat-calculator': { C: Zakat, h: 'Zakat calculator (₹)', title: 'Zakat Calculator in Rupees (₹)', desc: 'Work out your zakat on cash, gold, silver, investments and business stock, in Indian rupees.',
    intro: 'Add your savings and assets, subtract your debts, and see whether zakat is due.',
    faq: [['What is the zakat rate?', 'Zakat is 2.5% of your net zakatable wealth once it reaches the nisab and a lunar year has passed.'], ['What is the nisab?', 'It is the value of 612.36 g of silver or 87.48 g of gold. Enter today’s price per gram to check it. For your own situation, ask a scholar.']] },
  'biryani-calculator': { C: Biryani, h: 'Biryani & dawat calculator', title: 'Biryani Calculator: Rice, Meat & Masala for Guests', desc: 'How much rice, meat and masala for a biryani dawat? Enter the number of guests and get quantities.',
    intro: 'Planning a dawat? Enter the number of guests and get approximate quantities.',
    faq: [['How much rice per person for biryani?', 'About 150 g of raw rice per guest, a little more if biryani is the only dish.'], ['Are these exact?', 'No. They are rule-of-thumb amounts. Adjust for your recipe and your guests’ appetite.']] },
  'telangana-electricity-bill-calculator': { C: Electricity, h: 'Telangana electricity bill calculator', title: 'Telangana Electricity Bill Calculator (Domestic)', desc: 'Estimate your Telangana domestic electricity bill from units used, using the FY 2026-27 TGERC tariff.',
    intro: 'Enter your monthly units to estimate the energy and fixed charges for a domestic (LT-I) connection under the 2026-27 tariff.',
    faq: [['Which tariff does this use?', 'The LT-I Domestic retail tariff schedule for 1 April 2026 to 31 March 2027, published by TGSPDCL and TGNPDCL.'], ['Why is my real bill different?', 'Your bill can also include electricity duty, customer charges, fuel surcharge adjustments, arrears and any subsidy.']] },
  'hyderabad-metro-fare-calculator': { C: Metro, h: 'Hyderabad metro fare calculator', title: 'Hyderabad Metro Fare Calculator by Distance', desc: 'Find the Hyderabad Metro fare for your journey distance, using the official fare zones.',
    intro: 'Metro fares in Hyderabad depend on the distance travelled. Enter the distance in km to see the fare.',
    faq: [['What is the minimum and maximum fare?', 'Under the chart effective 24 May 2025, it is ₹11 for up to 2 km and ₹69 for more than 24 km.'], ['Where do I find the distance?', 'Use the distance between your two stations from the metro route map or app.']] },
  'image-to-pdf': { C: ImagePdf, h: 'Image to PDF', title: 'Image to PDF Converter: Combine Photos into One PDF', desc: 'Combine JPG, PNG or WebP images into a single PDF in your browser. Free, private, no upload.',
    intro: 'Add your images, put them in order and download one PDF. Everything happens on your device.',
    faq: [['Are my images uploaded?', 'No. The PDF is made in your browser and never leaves your device.'], ['Can I change the order?', 'Yes. Use the up and down buttons next to each image before you create the PDF.']] },
};
export const dynamicParams = false;
export const generateStaticParams = () => Object.keys(T).map(slug => ({ slug }));
export const generateMetadata = ({ params }) => ({ title: T[params.slug]?.title, description: T[params.slug]?.desc });
export default function Page({ params }) {
  const t = T[params.slug];
  if (!t) notFound();
  const C = t.C;
  return (
    <div className="wrap">
      <h1 style={{ marginTop: 40 }}>{t.h}</h1>
      <p>{t.intro}</p>
      <C />
      <h2>Common questions</h2>
      {t.faq.map(([q, a]) => <details key={q}><summary>{q}</summary><p>{a}</p></details>)}
    </div>
  );
}
