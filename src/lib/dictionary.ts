import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import type { CaseStudySlug, ProcessKey } from "@/lib/content";

export type CaseStudyCopy = {
	sector: string;
	disciplines: string[];
	problem: string;
	solution: string;
	outcomes: string[];
};

export type Dictionary = {
	meta: {
		title: string;
		description: string;
		ogDescription: string;
	};
	nav: {
		home: string;
		work: string;
		studio: string;
		contact: string;
		openMenu: string;
		language: string;
	};
	hero: {
		headline: string;
		body: string;
		cta: string;
		ctaSecondary: string;
		formLabel: string;
		formAside: string;
		stages: string[];
	};
	philosophy: {
		eyebrow: string;
		headline: string;
		lines: string[];
		label: string;
		closing: string;
	};
	worlds: {
		eyebrow: string;
		creative: string;
		creativeTags: string;
		creativeCopy: string;
		digital: string;
		digitalTags: string;
		digitalCopy: string;
		meet: string;
		meetCopy: string;
	};
	selectedWork: {
		eyebrow: string;
		headline: string;
		all: string;
	};
	services: {
		eyebrow: string;
		headline: string;
		headlineBreak: string;
		aside: string;
		items: { number: string; title: string; items: string[] }[];
	};
	process: {
		eyebrow: string;
		headline: string;
		steps: Record<ProcessKey, string>;
	};
	origin: {
		note: string;
		copy: string;
		copyLine2: string;
	};
	finalCta: {
		eyebrow: string;
		headline: string;
		body: string;
		cta: string;
	};
	footer: {
		blurb: string;
		navigate: string;
		presence: string;
		presenceLine: string;
		presenceLine2: string;
		copyright: string;
		tag: string;
	};
	work: {
		metaTitle: string;
		metaDescription: string;
		eyebrow: string;
		headline: string;
		intro: string;
		disciplines: string;
		outcomes: string;
		cta: string;
		ctaLink: string;
		visit: string;
		studies: Record<CaseStudySlug, CaseStudyCopy>;
	};
	studio: {
		metaTitle: string;
		metaDescription: string;
		eyebrow: string;
		headline: string;
		intro: string;
		how: string;
		howHeadline: string;
		p1: string;
		p2: string;
		p3: string;
		team: string;
		teamHeadline: string;
		creative: string;
		creativeTags: string;
		creativeCopy: string;
		digital: string;
		digitalTags: string;
		digitalCopy: string;
		workWithUs: string;
	};
	contact: {
		metaTitle: string;
		metaDescription: string;
		eyebrow: string;
		headline: string;
		intro: string;
		email: string;
		tag: string;
		name: string;
		emailLabel: string;
		company: string;
		message: string;
		submit: string;
		successTitle: string;
		successBody: string;
	};
};

const pt: Dictionary = {
	meta: {
		title: "YOPHI — Presença digital com opinião",
		description:
			"Estratégia, conteúdo, design e tecnologia. Um estúdio que faz o negócio ser visto — do jeito dele.",
		ogDescription:
			"Estúdio de conteúdo, design e tecnologia. Presença digital com opinião.",
	},
	nav: {
		home: "Início",
		work: "Projetos",
		studio: "Estúdio",
		contact: "Contato",
		openMenu: "Abrir menu",
		language: "Idioma",
	},
	hero: {
		headline: "Presença digital com opinião.",
		body: "Estratégia, conteúdo, design e tecnologia. Do posicionamento ao que a pessoa usa — sem fórmula.",
		cta: "Começar um projeto",
		ctaSecondary: "Ver o arquivo",
		formLabel: "Forma",
		formAside: "Da ideia ao que fica no ar.",
		stages: ["YOPHI", "POSIÇÃO", "CONTEÚDO", "DIGITAL", "EXPERIÊNCIA"],
	},
	philosophy: {
		eyebrow: "Filosofia",
		headline: "Presença não é um logo.",
		lines: [
			"É como o negócio aparece.",
			"Como ele soa.",
			"O que fica na cabeça.",
			"E o que a pessoa consegue fazer.",
		],
		label: "O conjunto",
		closing: "A peça sozinha é vitrine. A gente faz o conjunto.",
	},
	worlds: {
		eyebrow: "Dois lados · um estúdio",
		creative: "Criativo",
		creativeTags: "Conteúdo · Social · Vídeo · Direção de arte",
		creativeCopy:
			"Voz e imagem que a marca reconhece — e que não parece campanha.",
		digital: "Digital",
		digitalTags: "Web · Produtos · Sistemas · Tecnologia",
		digitalCopy: "Site, produto, sistema. O que a pessoa usa, não o que o estúdio exibe.",
		meet: "Criativo × Tecnologia",
		meetCopy: "Um lado dá cara. O outro faz isso viver.",
	},
	selectedWork: {
		eyebrow: "Arquivo",
		headline: "Isso a gente assina.",
		all: "Ver o arquivo",
	},
	services: {
		eyebrow: "O que fazemos",
		headline: "Do primeiro olhar",
		headlineBreak: "ao que a pessoa usa.",
		aside: "Não tem pacote. Entra o que o trabalho pede.",
		items: [
			{
				number: "01",
				title: "Posicionamento",
				items: ["Estratégia", "Identidade", "Direção"],
			},
			{
				number: "02",
				title: "Conteúdo",
				items: ["Social", "Fotografia", "Vídeo", "Editorial"],
			},
			{
				number: "03",
				title: "Digital",
				items: ["Sites", "Landing pages", "E-commerce"],
			},
			{
				number: "04",
				title: "Tecnologia",
				items: ["Sistemas", "Automação", "Integrações"],
			},
		],
	},
	process: {
		eyebrow: "Como trabalhamos",
		headline: "Partimos do que o negócio já é. Não do que está na moda.",
		steps: {
			SEE: "Entendemos o negócio.",
			DEFINE: "Achamos o que o diferencia.",
			SHAPE: "Damos forma a isso.",
			BUILD: "Colocamos no ar.",
			EVOLVE: "Acompanhamos depois.",
		},
	},
	origin: {
		note: "Do hebraico — beleza",
		copy: "Presença digital não é enfeite.",
		copyLine2: "É o negócio, visível.",
	},
	finalCta: {
		eyebrow: "Próximo",
		headline: "Vamos fazer o seu negócio ser visto.",
		body: "Manda o que a empresa é — e o que as pessoas encontram hoje.",
		cta: "Começar um projeto",
	},
	footer: {
		blurb:
			"Estratégia, conteúdo, design e tecnologia. Presença com opinião.",
		navigate: "Navegar",
		presence: "Presença",
		presenceLine: "A beleza de",
		presenceLine2: "ser visto.",
		copyright: "YOPHI Studio",
		tag: "Criativo × Tecnologia",
	},
	work: {
		metaTitle: "Arquivo",
		metaDescription: "Trabalhos da YOPHI. Presença com opinião — conteúdo, design, digital.",
		eyebrow: "Arquivo",
		headline: "Trabalhos com opinião.",
		intro:
			"Não é vitrine de estúdio. É o que ficou no ar quando o trabalho acabou.",
		disciplines: "O que entrou",
		outcomes: "O que ficou",
		cta: "O próximo pode ser o seu.",
		ctaLink: "Fala com o estúdio",
		visit: "Abrir o site",
		studies: {
			maxdecoyer: {
				sector: "Fotografia",
				disciplines: ["Direção de arte", "Digital"],
				problem:
					"O trabalho já existia. Online, sumia no meio de todo mundo com o mesmo site de fotógrafo.",
				solution:
					"A gente fez o contrário. maxdecoyer.com — preto e branco, dois idiomas, arquivo na frente. A foto manda. O resto cala.",
				outcomes: ["Site", "PT / EN", "Arquivo"],
			},
			"atelier-luz": {
				sector: "Moda",
				disciplines: ["Conteúdo", "Direção de arte", "Digital"],
				problem:
					"Na rua a marca tinha peso. Online, era mais uma marca de roupa.",
				solution:
					"Uma linguagem que a coleção reconhece — e um lookbook que não parece e-commerce com pose.",
				outcomes: ["Identidade", "Editorial", "Lookbook"],
			},
			"orbit-systems": {
				sector: "Tecnologia B2B",
				disciplines: ["Posicionamento", "Digital", "Tecnologia"],
				problem:
					"Produto bom atrás de um site que podia ser de qualquer um. A diferença morria no hero.",
				solution:
					"Reescrevemos até a tela vender sozinha. O comercial parou de explicar e passou a apontar.",
				outcomes: ["Site", "Interface", "Automação"],
			},
		},
	},
	studio: {
		metaTitle: "Estúdio",
		metaDescription: "O que é a YOPHI e de onde vem o nome.",
		eyebrow: "Estúdio",
		headline: "Direção criativa e digital. No mesmo teto.",
		intro:
			"Não vendemos post. Não vendemos site. Cuidamos de como a empresa aparece — e do que a pessoa acha quando chega.",
		how: "Como pensamos",
		howHeadline: "O que a pessoa encontra é o trabalho.",
		p1: "Logo, post e site sozinhos são peça.",
		p2: "O que vale é o conjunto: voz, imagem, sistema. É isso que a pessoa encontra.",
		p3: "O criativo faz notar. O digital faz funcionar.",
		team: "Time",
		teamHeadline: "Dois lados. Um teto.",
		creative: "Criativo",
		creativeTags: "Conteúdo · Direção · Narrativa",
		creativeCopy:
			"Voz, imagem e um jeito de publicar que a marca reconhece como seu.",
		digital: "Digital",
		digitalTags: "Produto · Web · Sistemas",
		digitalCopy: "Sites, produtos e sistemas que a pessoa usa de verdade.",
		workWithUs: "Vamos conversar",
	},
	contact: {
		metaTitle: "Contato",
		metaDescription: "Fale com a YOPHI sobre o projeto.",
		eyebrow: "Contato",
		headline: "Fala do projeto.",
		intro:
			"Quem é, qual o problema, o que as pessoas encontram hoje. Sem pitch.",
		email: "hello@yophi.studio",
		tag: "Criativo × Tecnologia",
		name: "Nome",
		emailLabel: "E-mail",
		company: "Empresa",
		message: "Sobre o projeto",
		submit: "Enviar",
		successTitle: "Chegou.",
		successBody: "Respondemos em breve.",
	},
};

const en: Dictionary = {
	meta: {
		title: "YOPHI — Digital presence with a point of view",
		description:
			"Strategy, content, design and technology. A studio that makes a business seen — as itself.",
		ogDescription:
			"A studio for content, design and technology. Digital presence with a point of view.",
	},
	nav: {
		home: "Home",
		work: "Work",
		studio: "Studio",
		contact: "Contact",
		openMenu: "Open menu",
		language: "Language",
	},
	hero: {
		headline: "Digital presence with a point of view.",
		body: "Strategy, content, design, technology. From position to what people actually use — no formula.",
		cta: "Start a project",
		ctaSecondary: "The archive",
		formLabel: "Form",
		formAside: "From the idea to what stays live.",
		stages: ["YOPHI", "POSITION", "CONTENT", "DIGITAL", "EXPERIENCE"],
	},
	philosophy: {
		eyebrow: "Philosophy",
		headline: "A presence is more than a logo.",
		lines: [
			"It is what people see.",
			"What they feel.",
			"What they remember.",
			"What they use.",
		],
		label: "The whole",
		closing: "A single piece is window dressing. We build the whole.",
	},
	worlds: {
		eyebrow: "Two crafts · one studio",
		creative: "Creative",
		creativeTags: "Content · Social · Video · Art direction",
		creativeCopy:
			"Voice and image the brand recognizes — without reading as a campaign.",
		digital: "Digital",
		digitalTags: "Web · Products · Systems · Technology",
		digitalCopy:
			"Site, product, system. What people use, not what the studio shows off.",
		meet: "Creative × Technology",
		meetCopy: "One side gives it a face. The other makes it live.",
	},
	selectedWork: {
		eyebrow: "Archive",
		headline: "Work we put our name on.",
		all: "The archive",
	},
	services: {
		eyebrow: "What we do",
		headline: "From the first impression",
		headlineBreak: "to the last click.",
		aside: "No packages. We bring in what the work asks for.",
		items: [
			{
				number: "01",
				title: "Positioning",
				items: ["Strategy", "Identity", "Direction"],
			},
			{
				number: "02",
				title: "Content",
				items: ["Social", "Photography", "Video", "Editorial"],
			},
			{
				number: "03",
				title: "Digital",
				items: ["Websites", "Landing pages", "E-commerce"],
			},
			{
				number: "04",
				title: "Technology",
				items: ["Systems", "Automation", "Integrations"],
			},
		],
	},
	process: {
		eyebrow: "How we work",
		headline: "We start from what the business already is. Not what's in fashion.",
		steps: {
			SEE: "We look at the business as it is.",
			DEFINE: "We find what makes it different.",
			SHAPE: "We give that difference a form.",
			BUILD: "We make it real.",
			EVOLVE: "We keep it sharp.",
		},
	},
	origin: {
		note: "Hebrew — beauty",
		copy: "Digital presence is not decoration.",
		copyLine2: "It is the beauty of a business, made visible.",
	},
	finalCta: {
		eyebrow: "Next",
		headline: "Let's make your business seen.",
		body: "Tell us what the company is — and what people find today.",
		cta: "Start a project",
	},
	footer: {
		blurb:
			"Strategy, content, design and technology. Presence with a point of view.",
		navigate: "Navigate",
		presence: "Presence",
		presenceLine: "The beauty of",
		presenceLine2: "being seen.",
		copyright: "YOPHI Studio",
		tag: "Creative × Technology",
	},
	work: {
		metaTitle: "Archive",
		metaDescription: "Work from YOPHI. Presence with a point of view — content, design, digital.",
		eyebrow: "Archive",
		headline: "Work that takes a side.",
		intro:
			"Not a studio reel. What stayed up when we were done.",
		disciplines: "What went in",
		outcomes: "What stayed",
		cta: "Yours could be next.",
		ctaLink: "Talk to the studio",
		visit: "Open the site",
		studies: {
			maxdecoyer: {
				sector: "Photography",
				disciplines: ["Art direction", "Digital"],
				problem:
					"The work was already there. Online, it drowned in every other photographer's site.",
				solution:
					"We did the opposite. maxdecoyer.com — black and white, two languages, archive first. The picture leads. Everything else shuts up.",
				outcomes: ["Site", "PT / EN", "Archive"],
			},
			"atelier-luz": {
				sector: "Fashion",
				disciplines: ["Content", "Art direction", "Digital"],
				problem:
					"In the room the brand had weight. Online, it was another clothing label.",
				solution:
					"A language the collection recognizes — and a lookbook that doesn't look like e-commerce with better posture.",
				outcomes: ["Identity", "Editorial", "Lookbook"],
			},
			"orbit-systems": {
				sector: "B2B Technology",
				disciplines: ["Positioning", "Digital", "Technology"],
				problem:
					"A good product behind a site that could have been anyone's. The difference died in the hero.",
				solution:
					"We rewrote until the screen sold itself. Sales stopped explaining and started pointing.",
				outcomes: ["Site", "Interface", "Automation"],
			},
		},
	},
	studio: {
		metaTitle: "Studio",
		metaDescription: "How YOPHI thinks — and what the name means.",
		eyebrow: "Studio",
		headline: "Creative direction and digital. Same roof.",
		intro:
			"We don't sell posts. We don't sell sites. We take care of how a company shows up — and what people find when they get there.",
		how: "How we think",
		howHeadline: "What people find is the work.",
		p1: "A logo, a post, a site — on their own, they're pieces.",
		p2: "What holds is the whole: voice, image, system. That's what people actually meet.",
		p3: "Creative makes it noticed. Digital makes it work.",
		team: "Team",
		teamHeadline: "Two crafts. One roof.",
		creative: "Creative",
		creativeTags: "Content · Direction · Narrative",
		creativeCopy:
			"Voice, image and a way of publishing a brand recognizes as its own.",
		digital: "Digital",
		digitalTags: "Product · Web · Systems",
		digitalCopy:
			"Sites, products and systems people can actually use.",
		workWithUs: "Talk to us",
	},
	contact: {
		metaTitle: "Contact",
		metaDescription: "Tell YOPHI about the project.",
		eyebrow: "Contact",
		headline: "Tell us about the project.",
		intro:
			"Who it is, what's broken, what people find today. No pitch.",
		email: "hello@yophi.studio",
		tag: "Creative × Technology",
		name: "Name",
		emailLabel: "Email",
		company: "Company",
		message: "What should people see?",
		submit: "Send",
		successTitle: "We got it.",
		successBody: "Someone from the studio will write back soon.",
	},
};

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(locale: string): Dictionary {
	if (isLocale(locale)) return dictionaries[locale];
	return dictionaries[defaultLocale];
}
