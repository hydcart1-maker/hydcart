import Resizer from './Resizer';
export const metadata = {
  title: 'Photo & Signature Resizer (20KB, 50KB) for Forms',
  description: 'Reduce a photo or signature to 20KB, 50KB or a custom size in your browser. Free, private, no upload.',
};
export default function Page() {
  return (
    <div className="wrap">
      <h1 style={{marginTop:40}}>Photo & signature resizer</h1>
      <p>Make a photo or signature small enough for government, exam and admission forms. It happens in your browser, so your image is never uploaded.</p>
      <Resizer />
      <h2>Common questions</h2>
      <details><summary>How do I get a photo under 20KB?</summary><p>Choose the 20KB option, add your photo and press Make smaller. If the size is still too big, the tool lowers the picture dimensions automatically.</p></details>
      <details><summary>Is my photo uploaded anywhere?</summary><p>No. The image is processed on your device and never leaves it.</p></details>
      <details><summary>What if the form needs exact pixels?</summary><p>Enter the width and height, then turn off “Allow smaller dimensions”. The tool keeps your exact pixels and only lowers quality.</p></details>
    </div>
  );
}
