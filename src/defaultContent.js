const W = 'https://wa.me/5516997520110'
const P = (name, cat, image, link) => ({ name, cat, image, link })
export const defaultContent = {
  brand: {
    logo: './img/logo-gpreto.png', whatsapp: W, phone: '+55 16 99752-0110',
    instagram: 'https://instagram.com/gpreto.site', linkedin: 'https://www.linkedin.com/in/gutosantos/',
    github: 'https://github.com/gustavo-devfull', city: 'Araraquara — SP', footer: '© 2026 GPRETO | Soluções Digitais',
  },
  nav: ['Serviços', 'Projetos', 'Sobre', 'FAQ'],
  hero: {
    badge: 'Agenda aberta — novos projetos', title: 'Design e soluções digitais', titleItalic: 'que fazem sua marca crescer',
    lead: 'Criação de sites e plataformas digitais para empresas e profissionais liberais. Mais de 20 anos de experiência, com qualidade e rapidez.',
    cta1: 'Solicitar orçamento', cta2: 'Ver projetos', animation3d: true,
  },
  hello: {
    text: 'Transformamos suas ideias em realidade digital — com design bonito, funcional e feito para atrair e reter clientes.',
    tags: ['Landing pages', 'Sites institucionais', 'E-commerce', 'Design responsivo', 'SEO', 'Suporte técnico'],
  },
  services: {
    eyebrow: 'Serviços', title: 'Nossos serviços',
    lead: 'Soluções digitais personalizadas para impulsionar seu negócio: de landing pages impactantes a e-commerces robustos.',
    items: [
      { title: 'Landing Pages', desc: 'Uma landing page profissional pode melhorar a imagem da sua marca, aumentar conversões, atrair tráfego qualificado e fidelizar clientes.', bullets: ['Design responsivo para todos os dispositivos.', 'Otimização para conversão e SEO.', 'Foco na experiência do usuário.'] },
      { title: 'Site Institucional', desc: 'Um site institucional profissional fortalece sua presença online, aumenta a credibilidade da marca e apresenta seus serviços de forma clara.', bullets: ['Imagem sólida e confiável para sua empresa.', 'Aumento da credibilidade da marca.', 'Informações claras e acessíveis sobre seus serviços.'] },
      { title: 'E-commerce', desc: 'Um e-commerce robusto amplia suas vendas, reforça sua marca, garante uma experiência de compra segura e fideliza clientes.', bullets: ['Navegação fácil e intuitiva.', 'Integração com pagamentos seguros.', 'Design responsivo e otimizado para vendas.'] },
    ],
  },
  projects: {
    eyebrow: 'Portfólio', title: 'Trabalhos recentes',
    lead: 'Confira alguns dos projetos que desenvolvemos para nossos clientes. Soluções digitais que geram resultados e encantam.',
    cta: 'Gostou? Vamos criar o seu projeto!',
    items: [
      P('Dra. Andreza Gilio', 'Site Onepage', './img/andreza.webp', 'andrezagilio.com.br'),
      P('Asksuite', 'Portal Institucional', './img/asksuite.webp', 'asksuite.com'),
      P('Mori', 'Site Institucional', './img/mori1.webp', 'moribr.com'),
      P('takeoff by hands', 'Landing Page', './img/hands.webp', 'hands.ag/takeoff'),
      P('Escola de Enfermagem USP', 'Portal Institucional', './img/eusp.webp', 'ee.usp.br'),
      P('Video Imagem', 'Site Onepage', './img/video.webp', 'videoimagem.com'),
      P('Rocket Science', 'Site Institucional', './img/rocket.webp', 'rocketscience.tech'),
      P('Odonto Lógica', 'Site Institucional', './img/odonto.webp', 'odontologicaavare.com.br'),
      P('ThinkRider', 'Site Institucional e e-commerce', './img/mori.webp', 'thinkrider.com.br'),
      P('PX Controlling Services', 'Site Institucional', './img/pxcs.webp', 'pxcs.com.br/en'),
      P('ShareHub', 'Site Onepage', './img/share.webp', 'sharehub.com.br'),
      P('NeuroTEAid', 'Landing Page', './img/neuro.webp', 'neuroteaid.com'),
    ],
  },
  about: {
    eyebrow: 'Sobre a GPRETO', name: 'Gustavo Santos', role: 'Desenvolvedor Web, Designer e Fotógrafo · Araraquara, SP', photo: './img/guto.jpg',
    p1: 'A GPRETO Soluções Digitais é especializada em desenvolvimento web de alta qualidade e rapidez. Combinando pontualidade e criatividade, criamos soluções personalizadas para sua empresa, seja uma landing page, site institucional ou e-commerce.',
    p2: 'Oferecemos um site moderno e profissional que reflete sua marca, além de otimização para SEO, suporte técnico e outros serviços.',
    stats: [{ title: '20+ anos', text: 'No mercado digital, entregando resultados.' }, { title: 'Qualidade e rapidez', text: 'Soluções eficientes com foco no cliente.' }],
    skills: ['WordPress', 'Elementor', 'Crocoblock', 'JavaScript', 'React', 'Bootstrap', 'Tailwind CSS', 'HTML & CSS', 'jQuery', 'Figma', 'Adobe XD', 'Photoshop'],
  },
  faq: {
    eyebrow: 'FAQ', title: 'Perguntas frequentes', ctaTitle: 'Ainda tem dúvidas? Fale conosco agora.', ctaButton: 'Chamar no WhatsApp',
    items: [
      { q: 'Quais serviços vocês oferecem?', a: 'Criação de landing pages, sites institucionais e e-commerces, com design responsivo, otimização para SEO e suporte técnico.' },
      { q: 'Quanto custa um projeto?', a: 'Cada projeto tem um orçamento sob medida, de acordo com o escopo. Chame no WhatsApp e envio uma proposta sem compromisso.' },
      { q: 'Qual o prazo de entrega?', a: 'Depende do tamanho do projeto. Antes de começar, combinamos um cronograma claro com todas as etapas.' },
      { q: 'Atende clientes de outras cidades?', a: 'Sim. Todo o processo pode ser feito online, para qualquer cidade do Brasil.' },
      { q: 'O site fica pronto para celular?', a: 'Sim. Todos os sites são responsivos e funcionam bem em celular, tablet e computador.' },
    ],
  },
  contact: { eyebrow: 'Agenda aberta', title: 'Vamos', titleItalic: 'conversar', text: 'Tem um projeto em mente? Conte sua ideia e receba um orçamento sem compromisso.', button: 'Chamar no WhatsApp' },
}
