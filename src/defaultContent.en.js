const P = (name, cat, image, link) => ({ name, cat, image, link })
export const defaultContentEn = {
  brand: {
    logo: './img/logo-gpreto.png', whatsapp: 'https://wa.me/5516997520110', phone: '+55 16 99752-0110',
    instagram: 'https://instagram.com/gpreto.site', linkedin: 'https://www.linkedin.com/in/gutosantos/',
    github: 'https://github.com/gustavo-devfull', city: 'Araraquara — SP, Brazil', footer: '© 2026 GPRETO | Digital Solutions', navCta: 'Contact', backToTop: 'Back to top ↑',
    rights: '© 2026 GPRETO Design and Digital Solutions. All rights reserved.', credit: 'Built with ♥ by GPRETO.',
  },
  hero: {
    tag: 'Design and digital solutions', where: 'serving all of Brazil', years: '20+ years in the digital market',
    line1: 'Sites that', line2: 'make', line3: 'brands', italic: 'grow.', image: '',
    intro: 'Websites and digital platforms for companies and independent professionals — with quality, speed and design that converts.',
    button: 'See projects ↓',
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
    yearsLabel: 'Years of experience', yearsText: 'In the digital market, delivering results with quality and speed.',
    pills: ['Punctuality', 'Creativity', 'Technical support'], founder: 'Meet the founder',
    education: [{ course: 'Systems Analysis and Development', place: 'Senac/SP, 2024' }, { course: 'Photography', place: 'Belas Artes/SP, 2016' }, { course: 'Data Processing', place: 'Escola de Engenharia Eletromecânica da Bahia, 1993' }],
  },
  contact: {
    tag: 'Talk to GPRETO', heading: "Let's build", headingItalic: 'together?', whatsappBtn: 'Chat on WhatsApp ↗',
    intro: 'Have a project in mind or need digital solutions? We are ready to listen and turn your ideas into reality.',
    email: 'contato@gpreto.site', formTitle: 'Send a message',
  },
}
