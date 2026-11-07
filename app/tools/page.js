import ToolList from '../ToolList';
export const metadata = { title: 'All free tools', description: 'Free tools for Hyderabad: photo resizer, plot converter, namaz timings, zakat, biryani and bill calculators.' };
export default function Tools() { return <div className="wrap"><h1 style={{marginTop:40}}>All tools</h1><ToolList /></div>; }
