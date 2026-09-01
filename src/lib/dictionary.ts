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
		title: "YOPHI — Se parece de qualquer um, não é o seu",
		description:
			"Estúdio de conteúdo, design e tecnologia. Se o site serve para qualquer um, não serve.",
		ogDescription: "YOPHI. Se parece de qualquer um, não é o seu.",
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
		headline: "Se parece de qualquer um, não é o seu.",
		body: "A gente faz o que a pessoa encontra — e reconhece.",
		cta: "Começar um projeto",
		ctaSecondary: "Ver o arquivo",
		formLabel: "Forma",
		formAside: "Da ideia ao que fica no ar.",
		stages: ["YOPHI", "POSIÇÃO", "CONTEÚDO", "DIGITAL", "USO"],
	},
	philosophy: {
		eyebrow: "Filosofia",
		headline: "Logo não basta.",
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
		digitalTags: "Sites · Produtos · Sistemas · Tecnologia",
		digitalCopy:
			"Site, produto, sistema. O que a pessoa usa, não o que o estúdio exibe.",
		meet: "Criativo × Tecnologia",
		meetCopy: "Um lado dá cara. O outro coloca no ar.",
	},
	selectedWork: {
		eyebrow: "Arquivo",
		headline: "Isso a gente assina.",
		all: "Ver o arquivo",
	},
	services: {
		eyebrow: "O que fazemos",
		headline: "Da cara",
		headlineBreak: "ao que entra no ar.",
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
				items: ["Sites", "Páginas", "Loja"],
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
			DEFINE: "Nomeamos a diferença.",
			SHAPE: "Damos forma a isso.",
			BUILD: "Colocamos no ar.",
			EVOLVE: "Acompanhamos depois.",
		},
	},
	origin: {
		note: "Do hebraico — beleza",
		copy: "Não é enfeite.",
		copyLine2: "É ser reconhecido.",
	},
	finalCta: {
		eyebrow: "Próximo",
		headline: "Chega de parecer o mesmo.",
		body: "Conta o que a empresa é — e o que as pessoas encontram hoje.",
		cta: "Começar um projeto",
	},
	footer: {
		blurb: "Se parece de qualquer um, não é o seu.",
		navigate: "Navegar",
		presence: "Presença",
		presenceLine: "A beleza de",
		presenceLine2: "ser visto.",
		copyright: "YOPHI Studio",
		tag: "Criativo × Tecnologia",
	},
	work: {
		metaTitle: "Arquivo",
		metaDescription: "Trabalhos da YOPHI. O que ficou no ar.",
		eyebrow: "Arquivo",
		headline: "O que ficou no ar.",
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
			"dra-ana-cardenas": {
				sector: "Odontologia",
				disciplines: ["Posicionamento", "Digital"],
				problem:
					"O consultório tinha cara. O site podia ser de qualquer dentista de Brasília.",
				solution:
					"draanacardenas.com — ela na frente, o ritmo do consultório. Sem foto de banco, sem clínica de vitrine.",
				outcomes: ["Site", "Posicionamento", "Brasília"],
			},
			"atelier-luz": {
				sector: "Moda",
				disciplines: ["Conteúdo", "Direção de arte", "Digital"],
				problem:
					"Na rua a marca tinha peso. No site, era mais uma marca de roupa.",
				solution:
					"Uma linguagem que a coleção reconhece — e um lookbook que não parece loja com pose.",
				outcomes: ["Identidade", "Editorial", "Lookbook"],
			},
			"orbit-systems": {
				sector: "Tecnologia",
				disciplines: ["Posicionamento", "Digital", "Tecnologia"],
				problem:
					"Produto bom atrás de um site que servia para qualquer empresa. A diferença parava na primeira tela.",
				solution:
					"Reescrevemos até a tela vender sozinha. O comercial parou de explicar e passou a apontar.",
				outcomes: ["Site", "Interface", "Automação"],
			},
		},
	},
	studio: {
		metaTitle: "Estúdio",
		metaDescription: "O que é a YOPHI — e de onde vem o nome.",
		eyebrow: "Estúdio",
		headline: "Direção criativa e digital. No mesmo teto.",
		intro:
			"Não vendemos post. Não vendemos site. Cuidamos de como a empresa aparece — e do que a pessoa encontra quando chega.",
		how: "Como pensamos",
		howHeadline: "O que a pessoa encontra é o trabalho.",
		p1: "Logo, post e site sozinhos são peça.",
		p2: "O conjunto é voz, imagem, sistema. É o que a pessoa encontra.",
		p3: "O criativo faz notar. O digital faz funcionar.",
		team: "Time",
		teamHeadline: "Dois lados. Um teto.",
		creative: "Criativo",
		creativeTags: "Conteúdo · Direção · Narrativa",
		creativeCopy: "Voz e imagem que a marca reconhece como suas.",
		digital: "Digital",
		digitalTags: "Produto · Sites · Sistemas",
		digitalCopy: "Site, produto, sistema. O que a pessoa usa.",
		workWithUs: "Começar um projeto",
	},
	contact: {
		metaTitle: "Contato",
		metaDescription: "Fala do projeto com a YOPHI.",
		eyebrow: "Contato",
		headline: "Fala do projeto.",
		intro: "Quem é, qual o problema, o que as pessoas encontram hoje.",
		email: "hello@yophi.studio",
		tag: "Criativo × Tecnologia",
		name: "Nome",
		emailLabel: "E-mail",
		company: "Empresa",
		message: "O que as pessoas encontram hoje?",
		submit: "Enviar",
		successTitle: "Recebemos.",
		successBody: "A gente responde em breve.",
	},
};

const en: Dictionary = {
	meta: {
		title: "YOPHI — If it looks like anyone's, it isn't yours",
		description:
			"A studio for content, design and technology. If the site could belong to anyone, it doesn't.",
		ogDescription: "YOPHI. If it looks like anyone's, it isn't yours.",
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
		headline: "If it looks like anyone's, it isn't yours.",
		body: "We make what people find — and recognize.",
		cta: "Start a project",
		ctaSecondary: "See the archive",
		formLabel: "Form",
		formAside: "From the idea to what stays live.",
		stages: ["YOPHI", "POSITION", "CONTENT", "DIGITAL", "USE"],
	},
	philosophy: {
		eyebrow: "Philosophy",
		headline: "A logo isn't enough.",
		lines: [
			"It is how the business shows up.",
			"How it sounds.",
			"What stays in the head.",
			"And what people can actually do.",
		],
		label: "The whole",
		closing: "A single piece is a shop window. We make the whole.",
	},
	worlds: {
		eyebrow: "Two sides · one studio",
		creative: "Creative",
		creativeTags: "Content · Social · Video · Art direction",
		creativeCopy:
			"Voice and image the brand recognizes — without reading as a campaign.",
		digital: "Digital",
		digitalTags: "Sites · Products · Systems · Technology",
		digitalCopy:
			"Site, product, system. What people use, not what the studio shows off.",
		meet: "Creative × Technology",
		meetCopy: "One side gives it a face. The other puts it live.",
	},
	selectedWork: {
		eyebrow: "Archive",
		headline: "Work we put our name on.",
		all: "See the archive",
	},
	services: {
		eyebrow: "What we do",
		headline: "From the look",
		headlineBreak: "to what goes live.",
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
				items: ["Sites", "Pages", "Store"],
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
			SEE: "We understand the business.",
			DEFINE: "We name the difference.",
			SHAPE: "We give it a form.",
			BUILD: "We put it live.",
			EVOLVE: "We stay with it after.",
		},
	},
	origin: {
		note: "Hebrew — beauty",
		copy: "It isn't decoration.",
		copyLine2: "It's being recognized.",
	},
	finalCta: {
		eyebrow: "Next",
		headline: "Stop looking like everyone else.",
		body: "Tell us what the company is — and what people find today.",
		cta: "Start a project",
	},
	footer: {
		blurb: "If it looks like anyone's, it isn't yours.",
		navigate: "Navigate",
		presence: "Presence",
		presenceLine: "The beauty of",
		presenceLine2: "being seen.",
		copyright: "YOPHI Studio",
		tag: "Creative × Technology",
	},
	work: {
		metaTitle: "Archive",
		metaDescription: "Work from YOPHI. What stayed live.",
		eyebrow: "Archive",
		headline: "What stayed live.",
		intro: "Not a studio shop window. What stayed live when the work was done.",
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
			"dra-ana-cardenas": {
				sector: "Dentistry",
				disciplines: ["Positioning", "Digital"],
				problem:
					"The practice had a face. The site could have belonged to any dentist in Brasília.",
				solution:
					"draanacardenas.com — her first, the practice at its own pace. No stock photos, no shop-window clinic.",
				outcomes: ["Site", "Positioning", "Brasília"],
			},
			"atelier-luz": {
				sector: "Fashion",
				disciplines: ["Content", "Art direction", "Digital"],
				problem:
					"On the street the brand had weight. On the site, it was another clothing label.",
				solution:
					"A language the collection recognizes — and a lookbook that doesn't look like a store with better posture.",
				outcomes: ["Identity", "Editorial", "Lookbook"],
			},
			"orbit-systems": {
				sector: "Technology",
				disciplines: ["Positioning", "Digital", "Technology"],
				problem:
					"A good product behind a site that could have been anyone's. The difference stopped on the first screen.",
				solution:
					"We rewrote until the screen sold itself. Sales stopped explaining and started pointing.",
				outcomes: ["Site", "Interface", "Automation"],
			},
		},
	},
	studio: {
		metaTitle: "Studio",
		metaDescription: "What YOPHI is — and where the name comes from.",
		eyebrow: "Studio",
		headline: "Creative direction and digital. Same roof.",
		intro:
			"We don't sell posts. We don't sell sites. We take care of how a company shows up — and what people find when they get there.",
		how: "How we think",
		howHeadline: "What people find is the work.",
		p1: "A logo, a post, a site — on their own, they're pieces.",
		p2: "The whole is voice, image, system. That's what people find.",
		p3: "Creative makes it noticed. Digital makes it work.",
		team: "Team",
		teamHeadline: "Two sides. One roof.",
		creative: "Creative",
		creativeTags: "Content · Direction · Narrative",
		creativeCopy: "Voice and image the brand recognizes as its own.",
		digital: "Digital",
		digitalTags: "Product · Sites · Systems",
		digitalCopy: "Site, product, system. What people use.",
		workWithUs: "Start a project",
	},
	contact: {
		metaTitle: "Contact",
		metaDescription: "Tell YOPHI about the project.",
		eyebrow: "Contact",
		headline: "Tell us about the project.",
		intro: "Who it is, what's wrong, what people find today.",
		email: "hello@yophi.studio",
		tag: "Creative × Technology",
		name: "Name",
		emailLabel: "Email",
		company: "Company",
		message: "What do people find today?",
		submit: "Send",
		successTitle: "We got it.",
		successBody: "We'll write back soon.",
	},
};

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(locale: string): Dictionary {
	if (isLocale(locale)) return dictionaries[locale];
	return dictionaries[defaultLocale];
}
