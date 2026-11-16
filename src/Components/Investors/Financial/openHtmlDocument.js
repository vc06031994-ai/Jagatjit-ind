// Keep report markup/styles separate from the website and its print toolbar.
const PREVIEW_STYLES = `
  * { box-sizing: border-box; }
  html, body { margin: 0; height: 100%; }
  body { display: flex; flex-direction: column; background: #eee; font: 16px Arial, sans-serif; color: #fff; }
  .toolbar { flex: 0 0 auto; display: flex; flex-wrap: wrap; align-items: center; gap: 12px 24px; padding: 16px 24px; background: #181818; }
  .details { flex: 1 1 240px; min-width: 0; }
  h1 { margin: 0 0 6px; font-size: 18px; overflow-wrap: anywhere; }
  p { margin: 0; font-size: 14px; line-height: 1.5; color: #ddd; }
  button { border: 0; border-radius: 0; padding: 14px 20px; background: #eca533; color: #111; font: 600 16px Arial, sans-serif; cursor: pointer; }
  button:focus-visible { outline: 3px solid white; outline-offset: 3px; }
  button:disabled { opacity: .6; cursor: wait; }
  iframe { flex: 1 1 auto; width: 100%; min-height: 0; border: 0; background: white; }
  @media print { .toolbar { display: none; } }
`;

export function openHtmlDocument(report) {
  // Open synchronously in the click handler so browsers permit the new tab.
  const preview = window.open('', '_blank');
  if (!preview) {
    window.alert('Please allow pop-ups for this website to open the document.');
    return;
  }
  preview.opener = null;
  const doc = preview.document;
  doc.open();
  doc.write('<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head><body></body></html>');
  doc.close();
  doc.title = report.file_name || 'Financial document';
  const style = doc.createElement('style');
  style.textContent = PREVIEW_STYLES;
  doc.head.append(style);

  const toolbar = doc.createElement('header');
  toolbar.className = 'toolbar';
  const details = doc.createElement('div');
  details.className = 'details';
  const title = doc.createElement('h1');
  title.textContent = doc.title;
  const help = doc.createElement('p');
  help.textContent = 'To download, click Print / Save as PDF, then select Save as PDF in the print dialog.';
  details.append(title, help);
  const print = doc.createElement('button');
  print.type = 'button';
  print.textContent = 'Print / Save as PDF';
  print.disabled = true;
  toolbar.append(details, print);

  const frame = doc.createElement('iframe');
  frame.title = 'Financial document content';
  // Same-origin permits printing; modals permit the print dialog. Deliberately
  // omit allow-scripts, forms, popups and top-navigation for CMS HTML.
  frame.setAttribute('sandbox', 'allow-same-origin allow-modals');
  frame.addEventListener('load', () => { print.disabled = false; });
  print.addEventListener('click', async () => {
    print.disabled = true;
    try {
      await frame.contentDocument?.fonts?.ready;
      if (preview.closed) return;
      frame.contentWindow.focus();
      frame.contentWindow.print();
    } finally {
      print.disabled = false;
    }
  });

  const content = new DOMParser().parseFromString(report.html_content || '', 'text/html');
  content.title = doc.title;
  // Prevent redirecting the preview or fetching active/embed content. Sandbox
  // and CSP provide isolation without discarding the report's table styling.
  content.querySelectorAll('script, base, iframe, object, embed, meta[http-equiv]').forEach((node) => node.remove());
  const policy = content.createElement('meta');
  policy.httpEquiv = 'Content-Security-Policy';
  policy.content = "default-src 'none'; script-src 'none'; style-src 'unsafe-inline' https:; img-src data: https:; font-src data: https:; form-action 'none'; base-uri 'none'";
  content.head.prepend(policy);
  const printStyles = content.createElement('style');
  printStyles.textContent = `
    @media print {
      @page { size: A4 landscape; margin: 10mm; }
      html, body { margin: 0 !important; width: auto !important; }
      body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    }
  `;
  content.head.append(printStyles);
  frame.srcdoc = `<!doctype html>${content.documentElement.outerHTML}`;
  doc.body.append(toolbar, frame);
}
