// ── EmailJS Configuration ─────────────────────────────────────
// STEP 1: Go to https://www.emailjs.com → Sign Up free
// STEP 2: Add Gmail as a service → copy Service ID below
// STEP 3: Create a template with {{from_name}}, {{from_email}}, {{message}} → copy Template ID
// STEP 4: Account → API Keys → copy your Public Key
const EMAILJS_PUBLIC_KEY  = 'S9NgspJU5A9Rl4pIT';
const EMAILJS_SERVICE_ID  = 'service_h93tjbp';
const EMAILJS_TEMPLATE_ID = 'template_lakzvwa';

// ── WhatsApp Number ────────────────────────────────────────────
const WHATSAPP_NUMBER = '9779846941682'; // Nepal country code 977 + number

// Init EmailJS
(function() {
  if (typeof emailjs !== 'undefined') emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
})();

// ── Load & Render ──────────────────────────────────────────────
async function loadData() {
  try {
    const res = await fetch('data.json');
    const d = await res.json();
    render(d);
  } catch(e) {
    console.warn('Could not load data.json — using inline fallback', e);
    render(FALLBACK);
  }
}

const FALLBACK = {
  personal: {
    name: "Swabhiman Thapa",
    title: "Mechanical Engineer",
    subtitle: "HVAC Specialist · AutoCAD · SolidWorks",
    dob: "2058-05-29", address: "Dhuwankot, Palungtar, Gandaki, Nepal",
    email: "st9846941682@gmail.com", phone: "+977 9846941682 / 9765628481",
    languages: "Nepali, Basic English, Hindi", religion: "Hindu",
    marital_status: "Single", profile_image: "profile.jpg",
    about: "I am a Mechanical Engineer at Tribhuvan University, with major HVAC systems ,Refrigeration and Building Services. I combine strong technical knowledge with internship experience to deliver real-world engineering solutions."
  },
  education: [{ university:"Tribhuvan University (TU)", institute:"Institute of Engineering (IOE)", college:"Western Regional Campus (WRC)", level:"Bachelor's Degree", faculty:"Mechanical Engineering", year:"2022 – 2026" }],
  skills: [
    {name:"AutoCAD",level:75,tag:"2D/3D Design"},{name:"SolidWorks",level:70,tag:"3D Modelling"},
    {name:"Plate & Sheet",level:90,tag:"Sheet Metal"},{name:"MS Office",level:65,tag:"Productivity"}
  ],
  experience: [{ company:"3MW (Internship)", location:"Pokhara, Nepal", duration:"1 Month", responsibilities:["I-Beam and Column Design","2D and 3D drafting in AutoCAD & SolidWorks","Surface Development using Plate and Sheet","BOQ (Bill of Quantities) preparation","Maintenance techniques for hydraulic turbines including Francis and Pelton wheel types","Introduction to hydropower components: intake gates, bellmouth transitions, concrete formwork structures, and penstock pipe systems"] }],
  projects: [
    {title:"Design and fabrication of pesticide spraying drone(Final year project)",description:"",tags:["Theoretical","Technical","Structural","Fabrication","Testing"]},
    {title:"Optimization of Oxygen Concentrator (Hami Teen Bhai)",description:"Conceptual design and performance optimization of an oxygen concentrator, focusing on efficiency improvements in flow regulation and molecular sieve performance.",tags:["Conceptual Category Winner","Optimization","Fluid Systems","Medical Engineering"]}
  ],
  social: { github:"https://github.com/thapapunwar", linkedin:"https://linkedin.com/in/swabhimanthapa", facebook:"https://www.facebook.com/share/17g8QowASk/", instagram:"https://instagram.com/punwarthapa", twitter:"https://twitter.com/thapapunwar", youtube:"" }
};

function render(d) {
  const p = d.personal;

  // Nav logo & hero
  document.querySelector('.nav-logo').textContent = p.name;
  document.getElementById('footer-name').textContent = p.name;
  document.getElementById('hero-name').textContent = p.name;
  document.getElementById('hero-title').innerHTML = '';
  document.getElementById('hero-desc').textContent = '';
  if (p.profile_image) {
    document.getElementById('hero-img').src = p.profile_image;
    document.getElementById('floating-avatar-img').src = p.profile_image;
  }

  // About
  document.getElementById('about-text').innerHTML = '';
  const infoMap = [
    ['Date of Birth', p.dob], ['Address', p.address], ['Email', p.email],
    ['Phone', p.phone], ['Languages', p.languages], ['Religion', p.religion],
    ['Marital Status', p.marital_status]
  ];
  document.getElementById('info-table').innerHTML = infoMap.map(([k,v])=>`
    <div class="info-row fade-up">
      <span class="info-key">${k}</span>
      <span class="info-val">${v}</span>
    </div>`).join('');

  // Skills
  document.getElementById('skills-grid').innerHTML = d.skills.map(s=>`
    <div class="skill-card fade-up">
      <div class="skill-top">
        <span class="skill-name">${s.name}</span>
        <span class="skill-tag">${s.tag}</span>
      </div>
      <div class="skill-bar-bg"><div class="skill-bar" data-level="${s.level}"></div></div>
    </div>`).join('');

  // Education
  document.getElementById('edu-list').innerHTML = d.education.map(e=>`
    <div class="edu-card fade-up">
      <div class="edu-level">${e.level} — ${e.faculty}</div>
      <div class="edu-uni">${e.university} · ${e.institute}</div>
      <div class="edu-details">${e.college}<br>${e.year}</div>
    </div>`).join('');

  // Experience
  document.getElementById('exp-list').innerHTML = d.experience.map(e=>`
    <div class="exp-card fade-up">
      <div class="exp-company">${e.company}</div>
      <div class="exp-meta">${e.location} · ${e.duration}</div>
      <ul class="exp-resp">${e.responsibilities.map(r=>`<li>${r}</li>`).join('')}</ul>
    </div>`).join('');

  // Projects
  document.getElementById('projects-grid').innerHTML = d.projects.map(pr=>`
    <div class="proj-card fade-up">
      <div class="proj-title">${pr.title}</div>
      <p class="proj-desc">${pr.description}</p>
      <div class="proj-tags">${pr.tags.map(t=>`<span class="proj-tag">${t}</span>`).join('')}</div>
    </div>`).join('');

  // Contact
  document.getElementById('contact-email').textContent = p.email;
  document.getElementById('contact-phone').textContent = p.phone;
  document.getElementById('contact-addr').textContent = p.address;

  // Social
  const icons = {
    github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.2 11.39.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.6-4.04-1.6-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49 1 .1-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013.01-.4c1.02.005 2.05.14 3.01.4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.65.24 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z"/></svg>`,
    linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 110-4.14 2.07 2.07 0 010 4.14zM3.56 20.45h3.56V9H3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46C23.21 24 24 23.23 24 22.28V1.72C24 .77 23.21 0 22.23 0z"/></svg>`,
    facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.41 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.04V9.41c0-3.02 1.8-4.7 4.54-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.27h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07z"/></svg>`,
    instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85 0 3.2-.01 3.58-.07 4.85-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07-3.2 0-3.58-.01-4.85-.07-3.26-.15-4.77-1.7-4.92-4.92C2.17 15.58 2.16 15.2 2.16 12c0-3.2.01-3.58.07-4.85C2.38 3.86 3.9 2.31 7.15 2.23 8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.7.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24c3.26 0 3.67-.01 4.95-.07 4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95 0-3.26-.01-3.67-.07-4.95C23.73 2.71 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32A6.16 6.16 0 0012 5.84zM12 16a4 4 0 110-8 4 4 0 010 8zm6.4-11.85a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/></svg>`,
    twitter: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
    youtube: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.46 3.6 12 3.6 12 3.6s-7.46 0-9.38.45A3.02 3.02 0 00.5 6.19C.06 8.12 0 12 0 12s.06 3.88.5 5.81a3.02 3.02 0 002.12 2.14c1.92.45 9.38.45 9.38.45s7.46 0 9.38-.45a3.02 3.02 0 002.12-2.14C23.94 15.88 24 12 24 12s-.06-3.88-.5-5.81zM9.6 15.6V8.4l6.24 3.6-6.24 3.6z"/></svg>`
  };

  const s = d.social;
  document.getElementById('social-row').innerHTML = Object.entries(icons).map(([k, icon]) => {
    const url = s[k];
    if (!url) return '';
    return `<a href="${url}" target="_blank" rel="noopener" class="social-btn">${icon} ${k.charAt(0).toUpperCase()+k.slice(1)}</a>`;
  }).join('');

  document.getElementById('year').textContent = new Date().getFullYear();
  initAnimations();
}

// ── Skill bars ──────────────────────────────────────────────────
function animateSkillBars() {
  document.querySelectorAll('.skill-bar').forEach(bar => {
    const rect = bar.closest('.skill-card').getBoundingClientRect();
    if (rect.top < window.innerHeight) bar.style.width = bar.dataset.level + '%';
  });
}

// ── Intersection Observer ──────────────────────────────────────
function initAnimations() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); animateSkillBars(); }
    });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => obs.observe(el));
  animateSkillBars();
}

// ── Floating Avatar on Scroll ──────────────────────────────────
const floatingAvatar = document.getElementById('floating-avatar');
const heroSection = document.getElementById('hero');

window.addEventListener('scroll', () => {
  const heroBottom = heroSection.getBoundingClientRect().bottom;
  if (heroBottom < 80) {
    floatingAvatar.classList.add('visible');
  } else {
    floatingAvatar.classList.remove('visible');
  }
}, { passive: true });

// ── Nav Burger Toggle ──────────────────────────────────────────
function toggleNav() {
  const nav = document.getElementById('navLinks');
  const burger = document.getElementById('burger');
  nav.classList.toggle('open');
  burger.classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => {
    document.getElementById('navLinks').classList.remove('open');
    document.getElementById('burger').classList.remove('active');
  });
});

// ── Contact Form via EmailJS ───────────────────────────────────
async function handleForm(e) {
  e.preventDefault();
  const form    = e.target;
  const btn     = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const spinner = document.getElementById('btnSpinner');
  const status  = document.getElementById('form-status');

  btn.disabled  = true;
  btnText.style.display  = 'none';
  spinner.style.display  = 'inline';
  status.style.display   = 'none';

  try {
    if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
      throw new Error('EmailJS not configured yet. Please add your keys.');
    }
    await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form);
    status.className     = 'form-status success';
    status.textContent   = '✓ Message sent! I will get back to you soon.';
    status.style.display = 'block';
    form.reset();
  } catch (err) {
    status.className     = 'form-status error';
    status.textContent   = '✗ ' + (err.text || err.message || 'Failed to send. Try WhatsApp below.');
    status.style.display = 'block';
  } finally {
    btn.disabled         = false;
    btnText.style.display = 'inline';
    spinner.style.display = 'none';
  }
}

// ── WhatsApp Send ──────────────────────────────────────────────
function sendWhatsApp(e) {
  e.preventDefault();
  const name  = document.getElementById('cf-name').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const msg   = document.getElementById('cf-msg').value.trim();

  if (!name || !email || !msg) {
    alert('Please fill in all fields first, then click Send via WhatsApp.');
    return;
  }

  const text = `Hello Swabhiman! 👋\n\n*Name:* ${name}\n*Email:* ${email}\n\n*Message:*\n${msg}`;
  const url  = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

// ── Loader ─────────────────────────────────────────────────────
window.addEventListener('load', () => {
  loadData();
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    // Remove from DOM after fade-out transition (0.5s) to fully stop animation
    setTimeout(() => loader.remove(), 500);
  }, 800);
});
