/* ============================================================
   Contact composer: picks a purpose, writes a short WhatsApp message
   and a detailed email, lets the visitor edit both, then points the
   two buttons at wa.me and mailto with the text filled in.
   Nothing is sent or stored by this page. The links in the HTML already
   work without JavaScript; this only makes them smarter.
   ============================================================ */
(function () {
  'use strict'; // Same convention as main.js.

  const root = document.getElementById('compose');
  if (!root) return;

  const PHONE = '8801312312512'; // wa.me wants digits only: country code, no plus, no leading zero.
  const EMAIL = 'sa.sumel91@gmail.com';
  const MAILTO_SOFT_LIMIT = 1800; // Some mail clients truncate longer mailto links.

  /* Each message uses [brackets] for the parts only the sender knows. */
  const TEMPLATES = {
    hiring: {
      wa: 'Hello Samiul, I found your portfolio (sasumel.pages.dev) and would like to talk about a [role] at [company]. Could we have a short call?',
      subject: 'Role enquiry: [role title] at [company]',
      mail: [
        'Hello Samiul,',
        '',
        'I am [your name], [your role] at [company]. I came across your portfolio at sasumel.pages.dev and would like to talk about a role on our team.',
        '',
        'The role',
        '- Title: [role title]',
        '- Type: [full-time, contract or remote]',
        '- Location and time zone: [location or time zone]',
        '',
        'Why I am writing',
        '[One or two sentences on why your background fits this role.]',
        '',
        'What I would like next',
        'A short call in the next week or two. I am available on [days and times, with time zone].',
        '',
        'Thank you,',
        '[your name]',
        '[company] | [website or LinkedIn]'
      ]
    },
    business: {
      wa: 'Hello Samiul, I saw your portfolio (sasumel.pages.dev). We run [process] by hand and want to turn it into a system. Can I explain it briefly?',
      subject: 'Workflow enquiry: [process name]',
      mail: [
        'Hello Samiul,',
        '',
        'I am [your name] from [company]. I saw your work at sasumel.pages.dev and think you could help us with a process we run by hand.',
        '',
        'The process',
        '- What it is: [for example billing, stock tracking, reporting]',
        '- How it runs today: [spreadsheet, paper, email or a mix]',
        '- Who uses it: [number of people and their roles]',
        '- How often and how much: [daily, weekly or monthly, and rough volume]',
        '- Where it goes wrong: [errors, delays or rework]',
        '',
        'What we want',
        '[The outcome you are after, for example one place for the data and automatic calculations.]',
        '',
        'Timing and budget',
        '- Target start: [date or month]',
        '- Budget range (optional): [range]',
        '',
        'Could we arrange a short call so I can walk you through it?',
        '',
        'Thank you,',
        '[your name]',
        '[company] | [phone or website]'
      ]
    },
    logistics: {
      wa: 'Hello Samiul, I saw your portfolio (sasumel.pages.dev). We are building software for [transport or logistics]. Could we discuss working together?',
      subject: 'Product enquiry: [product or company name]',
      mail: [
        'Hello Samiul,',
        '',
        'I am [your name] from [company]. We are building software for transport and logistics, and your portfolio at sasumel.pages.dev caught my attention.',
        '',
        'The product',
        '- What it does: [one or two sentences]',
        '- Stage: [idea, prototype, in development or live]',
        '- Stack: [main technologies, if known]',
        '- Team today: [who is working on it]',
        '',
        'Where help is needed',
        '[For example full-stack building, billing or tariff rules, reporting, or operations know-how.]',
        '',
        'Working arrangement',
        '- Type: [contract, part-time or full-time]',
        '- Timeline: [start date and duration]',
        '',
        'Could we have a short call to see whether it is a fit?',
        '',
        'Thank you,',
        '[your name]',
        '[company] | [website]'
      ]
    },
    other: {
      wa: 'Hello Samiul, I saw your portfolio (sasumel.pages.dev) and have a question: [your question].',
      subject: 'Enquiry from [your name]',
      mail: [
        'Hello Samiul,',
        '',
        'I am [your name]. I saw your portfolio at sasumel.pages.dev and would like to ask about [topic].',
        '',
        'Details',
        '[Describe what you need, in a few sentences.]',
        '',
        'The best way to reach me is [email, phone or WhatsApp], usually [days and times, with time zone].',
        '',
        'Thank you,',
        '[your name]'
      ]
    }
  };

  const waLink = document.getElementById('cc-wa');
  const mailLink = document.getElementById('cc-mail');
  const edit = document.getElementById('cc-edit');
  const waText = document.getElementById('cc-wa-text');
  const mailSubject = document.getElementById('cc-mail-subject');
  const mailText = document.getElementById('cc-mail-text');
  const waCount = document.getElementById('cc-wa-count');
  const mailCount = document.getElementById('cc-mail-count');
  const note = document.getElementById('cc-note');
  const purposes = Array.from(root.querySelectorAll('input[name="cc-purpose"]'));
  if (!waLink || !mailLink || !edit || !waText || !mailSubject || !mailText || !purposes.length) return;

  const defaultNote = note ? note.textContent : '';

  const hasPlaceholders = text => /\[[^\]]+\]/.test(text);
  const withCrlf = text => text.replace(/\r?\n/g, '\r\n'); // Outlook and Apple Mail expect CRLF in mailto bodies.

  function refreshLinks() {
    waLink.href = `https://wa.me/${PHONE}?text=${encodeURIComponent(waText.value.trim())}`;
    const href = `mailto:${EMAIL}?subject=${encodeURIComponent(mailSubject.value.trim())}&body=${encodeURIComponent(withCrlf(mailText.value.trim()))}`;
    mailLink.href = href;
    waCount.textContent = `${waText.value.length} characters`;
    mailCount.textContent = `${mailText.value.length} characters`;
    if (!note) return;
    if (href.length > MAILTO_SOFT_LIMIT) {
      note.textContent = 'The email is long for a mail link. If your mail app cuts it off, use Copy and paste it instead.';
    } else if (hasPlaceholders(waText.value) || hasPlaceholders(mailText.value) || hasPlaceholders(mailSubject.value)) {
      note.textContent = 'Replace the [brackets] with your details before you send. Nothing is sent from this page.';
    } else {
      note.textContent = defaultNote;
    }
  }

  function applyPurpose(key) {
    const template = TEMPLATES[key] || TEMPLATES.other;
    waText.value = template.wa;
    mailSubject.value = template.subject;
    mailText.value = template.mail.join('\n');
    refreshLinks();
  }

  async function copy(text, button) {
    const original = button.textContent;
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = 'Copied';
    } catch (err) {
      // Clipboard API is blocked on some browsers; selecting the text lets the visitor copy it by hand.
      button.textContent = 'Press Ctrl+C';
    }
    window.setTimeout(() => { button.textContent = original; }, 1800);
  }

  purposes.forEach(radio => radio.addEventListener('change', () => { if (radio.checked) applyPurpose(radio.value); }));
  [waText, mailSubject, mailText].forEach(field => field.addEventListener('input', refreshLinks));

  root.querySelectorAll('[data-cc-copy]').forEach(button => {
    button.addEventListener('click', () => {
      if (button.dataset.ccCopy === 'wa') {
        copy(waText.value, button);
      } else {
        copy(`Subject: ${mailSubject.value}\n\n${mailText.value}`, button);
      }
    });
  });

  const selected = purposes.find(radio => radio.checked) || purposes[0];
  applyPurpose(selected.value);
  edit.hidden = false; // Without JavaScript the editor stays hidden and the two plain links still work.
})();
