const P = (name, cat, image, link) => ({ name, cat, image, link })
export const defaultContentEn = {
  brand: {
    logo: './img/logo-gpreto.png', whatsapp: 'https://wa.me/5516997520110', phone: '+55 16 99752-0110',
    instagram: 'https://instagram.com/gpreto.site', linkedin: 'https://www.linkedin.com/in/gutosantos/',
    github: 'https://github.com/gustavo-devfull', city: 'Araraquara — SP, Brazil', footer: '© 2026 GPRETO | Digital Solutions', navCta: 'Contact', backToTop: 'Back to top ↑',
  },
  nav: ['Services', 'Projects', 'About', 'FAQ'],
  hero: {
    badge: 'Open for new projects', title: 'Design and digital solutions', titleItalic: 'that make your brand grow',
    lead: 'Websites and digital platforms for companies and professionals. Over 20 years of experience, delivered with quality and speed.',
    cta1: 'Request a quote', cta2: 'See projects', animation3d: true,
  },
  hello: {
    greeting: 'Hello!',
    text: 'We turn your ideas into digital reality — with beautiful, functional design built to attract and retain customers.',
    tags: ['Landing pages', 'Corporate websites', 'E-commerce', 'Responsive design', 'SEO', 'Technical support'],
  },
  services: {
    eyebrow: 'Services', title: 'Our services',
    lead: 'Custom digital solutions to boost your business: from high-impact landing pages to robust e-commerce stores.',
    items: [
      { title: 'Landing Pages', desc: 'A professional landing page can improve your brand image, increase conversions, attract qualified traffic and build customer loyalty.', bullets: ['Responsive design for every device.', 'Conversion and SEO optimization.', 'Focus on user experience.'] },
      { title: 'Corporate Website', desc: 'A professional corporate website strengthens your online presence, boosts brand credibility and presents your services clearly.', bullets: ['A solid, trustworthy image for your company.', 'Greater brand credibility.', 'Clear, accessible information about your services.'] },
      { title: 'E-commerce', desc: 'A robust e-commerce store grows your sales, strengthens your brand, ensures a secure shopping experience and builds customer loyalty.', bullets: ['Easy, intuitive navigation.', 'Secure payment integration.', 'Responsive design optimized for sales.'] },
    ],
  },
  projects: {
    eyebrow: 'Portfolio', title: 'Recent work',
    lead: 'Check out some of the projects we have built for our clients. Digital solutions that deliver results and delight.',
    cta: 'Like what you see? Let’s build your project!',
    items: [
      P('Dra. Andreza Gilio', 'One-page site', './img/andreza.webp', 'andrezagilio.com.br'),
      P('Asksuite', 'Corporate portal', './img/asksuite.webp', 'asksuite.com'),
      P('Mori', 'Corporate website', './img/mori1.webp', 'moribr.com'),
      P('takeoff by hands', 'Landing page', './img/hands.webp', 'hands.ag/takeoff'),
      P('Escola de Enfermagem USP', 'Corporate portal', './img/eusp.webp', 'ee.usp.br'),
      P('Video Imagem', 'One-page site', './img/video.webp', 'videoimagem.com'),
      P('Rocket Science', 'Corporate website', './img/rocket.webp', 'rocketscience.tech'),
      P('Odonto Lógica', 'Corporate website', './img/odonto.webp', 'odontologicaavare.com.br'),
      P('ThinkRider', 'Corporate website and e-commerce', './img/mori.webp', 'thinkrider.com.br'),
      P('PX Controlling Services', 'Corporate website', './img/pxcs.webp', 'pxcs.com.br/en'),
      P('ShareHub', 'One-page site', './img/share.webp', 'sharehub.com.br'),
      P('NeuroTEAid', 'Landing page', './img/neuro.webp', 'neuroteaid.com'),
    ],
  },
  about: {
    eyebrow: 'About GPRETO', name: 'Gustavo Santos', role: 'Web Developer, Designer and Photographer · Araraquara, SP, Brazil', photo: './img/guto.jpg',
    p1: 'GPRETO Digital Solutions specializes in high-quality, fast web development. Combining punctuality and creativity, we build custom solutions for your business, whether a landing page, a corporate website or an e-commerce store.',
    p2: 'We deliver a modern, professional website that reflects your brand, plus SEO optimization, technical support and other services.',
    stats: [{ title: '20+ years', text: 'In the digital market, delivering results.' }, { title: 'Quality and speed', text: 'Efficient solutions focused on the client.' }],
    skills: ['WordPress', 'Elementor', 'Crocoblock', 'JavaScript', 'React', 'Bootstrap', 'Tailwind CSS', 'HTML & CSS', 'jQuery', 'Figma', 'Adobe XD', 'Photoshop'],
  },
  faq: {
    eyebrow: 'FAQ', title: 'Frequently asked questions', ctaTitle: 'Still have questions? Talk to us now.', ctaButton: 'Chat on WhatsApp',
    items: [
      { q: 'What services do you offer?', a: 'Landing pages, corporate websites and e-commerce stores, with responsive design, SEO optimization and technical support.' },
      { q: 'How much does a project cost?', a: 'Every project is quoted according to its scope. Message us on WhatsApp and we will send a no-obligation proposal.' },
      { q: 'What is the delivery time?', a: 'It depends on the size of the project. Before we start, we agree on a clear schedule with every stage.' },
      { q: 'Do you work with clients in other cities?', a: 'Yes. The whole process can be done online, for any city in Brazil and abroad.' },
      { q: 'Will the site work on mobile?', a: 'Yes. All sites are responsive and work well on phones, tablets and computers.' },
    ],
  },
  contact: { eyebrow: 'Open for new projects', title: 'Let’s', titleItalic: 'talk', text: 'Have a project in mind? Tell us your idea and get a no-obligation quote.', button: 'Chat on WhatsApp' },
}
