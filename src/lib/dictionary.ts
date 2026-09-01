import { defaultLocale, isLocale, type Locale } from "@/lib/i18n";
import type { CaseStudySlug, ProcessKey } from "@/lib/content";

export type CaseStudyCopy = {
	sector: string;
	disciplines: string[];
	problem: string;
	solution: string;
	outcomes: string[];
	impact: string;
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
		skip: string;
	};
	hero: {
		headline: string;
		body: string;
		audience: string;
		cta: string;
		ctaSecondary: string;
		ctaHint: string;
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
		invite: string;
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
		challenge: string;
		intervention: string;
		outcomes: string;
		impact: string;
		cta: string;
		ctaLink: string;
		visit: string;
		back: string;
		open: string;
		loading: string;
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
			"Estúdio de conteúdo, design e tecnologia. Se o site serve pra qualquer um, o cliente também vai.",
		ogDescription:
			"YOPHI. Se parece de qualquer um, não é o seu. A gente faz o outro.",
	},
	nav: {
		home: "Início",
		work: "Projetos",
		studio: "Estúdio",
		contact: "Contato",
		openMenu: "Abrir menu",
		language: "Idioma",
		skip: "Ir para o conteúdo",
	},
	hero: {
		headline: "Se parece de qualquer um, não é o seu.",
		body: "Posicionamento, conteúdo, site e sistema. Pra o cliente achar você — e não o do lado.",
		audience:
			"Pra quem já vende. E ainda perde gente no primeiro clique porque o site parece de todo mundo.",
		cta: "Começar o seu projeto",
		ctaSecondary: "Ver o trabalho",
		ctaHint:
			"Manda três frases. A gente responde se entra — e o que faria no ar.",
		formLabel: "Forma",
		formAside: "Do que você é ao que o cliente encontra.",
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
		closing: "Peça sozinha não segura cliente. O conjunto segura.",
	},
	worlds: {
		eyebrow: "Dois lados · um estúdio",
		creative: "Criativo",
		creativeTags: "Conteúdo · Social · Vídeo · Direção de arte",
		creativeCopy:
			"Voz e imagem que a marca reconhece. Que o cliente também — sem parecer campanha.",
		digital: "Digital",
		digitalTags: "Sites · Produtos · Sistemas · Tecnologia",
		digitalCopy:
			"Site, produto, sistema. O que a pessoa usa pra comprar, marcar, voltar.",
		meet: "Criativo × Tecnologia",
		meetCopy: "Os dois no mesmo teto. É o que a maioria separa — e perde.",
	},
	selectedWork: {
		eyebrow: "Arquivo",
		headline: "Isso a gente assina.",
		invite:
			"Dois no ar. O resto mostra o tipo. Entra — e vê se é isso que o seu precisa.",
		all: "Ver o trabalho",
	},
	services: {
		eyebrow: "O que fazemos",
		headline: "Da cara",
		headlineBreak: "ao que entra no ar.",
		aside:
			"Não tem pacote. Tem o que falta pra o seu parar de parecer de qualquer um.",
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
			BUILD: "Colocamos no ar. O cliente encontra.",
			EVOLVE: "Acompanhamos depois.",
		},
	},
	origin: {
		note: "Do hebraico — beleza",
		copy: "Não é enfeite.",
		copyLine2: "É o nome que a gente escolheu.",
	},
	finalCta: {
		eyebrow: "Agora",
		headline: "O seu ainda parece de qualquer um?",
		body: "Manda o que as pessoas encontram hoje. A gente responde com o próximo passo — ou com o que não faria.",
		cta: "Começar o seu projeto",
	},
	footer: {
		blurb:
			"Se o site parece de qualquer um, o cliente também vai. A gente faz o outro.",
		navigate: "Navegar",
		presence: "Estúdio",
		presenceLine: "Conteúdo, design",
		presenceLine2: "e tecnologia.",
		copyright: "YOPHI Studio",
		tag: "Criativo × Tecnologia",
	},
	work: {
		metaTitle: "Arquivo",
		metaDescription:
			"Trabalhos da YOPHI. O que ficou no ar — e o tipo que a gente faz.",
		eyebrow: "Arquivo",
		headline: "O que ficou no ar.",
		intro:
			"Não é vitrine de estúdio. É o que já está no ar. Entra e vê se o seu precisa disso.",
		disciplines: "O que entrou",
		challenge: "O problema",
		intervention: "O que entrou no ar",
		outcomes: "O que ficou",
		impact: "O que mudou",
		cta: "Quero um assim",
		ctaLink: "Começar o seu projeto",
		visit: "Abrir o site",
		back: "Arquivo",
		open: "Abrir",
		loading: "Arquivo",
		studies: {
			maxdecoyer: {
				sector: "Fotografia",
				disciplines: ["Direção de arte", "Digital"],
				problem:
					"O trabalho já existia. Online, sumia no meio de todo mundo com o mesmo site de fotógrafo.",
				solution:
					"A gente fez o contrário. maxdecoyer.com — preto e branco, dois idiomas, arquivo na frente. A foto manda. O resto cala.",
				outcomes: ["Site", "PT / EN", "Arquivo"],
				impact: "[+X% de pedidos pelo site]",
			},
			"dra-ana-cardenas": {
				sector: "Odontologia",
				disciplines: ["Posicionamento", "Digital"],
				problem:
					"O consultório tinha cara. O site podia ser de qualquer dentista de Brasília.",
				solution:
					"draanacardenas.com — ela na frente, o ritmo do consultório. Sem foto de banco, sem clínica de vitrine.",
				outcomes: ["Site", "Posicionamento", "Brasília"],
				impact: "[+X consultas marcadas pelo site]",
			},
			"atelier-luz": {
				sector: "Moda",
				disciplines: ["Conteúdo", "Direção de arte", "Digital"],
				problem:
					"Na rua a marca tinha peso. No site, era mais uma marca de roupa.",
				solution:
					"Uma linguagem que a coleção reconhece — e um lookbook que não parece loja com pose.",
				outcomes: ["Identidade", "Editorial", "Lookbook"],
				impact: "[+X% de venda direta pelo lookbook]",
			},
			"orbit-systems": {
				sector: "Tecnologia",
				disciplines: ["Posicionamento", "Digital", "Tecnologia"],
				problem:
					"Produto bom atrás de um site que servia para qualquer empresa. A diferença parava na primeira tela.",
				solution:
					"Reescrevemos até a tela vender sozinha. O comercial parou de explicar e passou a apontar.",
				outcomes: ["Site", "Interface", "Automação"],
				impact: "[redução de X horas no comercial]",
			},
			"casa-vera": {
				sector: "Arquitetura",
				disciplines: ["Direção de arte", "Digital"],
				problem:
					"A obra falava. O site era um PDF de projetos com outra fonte.",
				solution:
					"casavera.com — a casa na frente. A planta entra depois, se a pessoa quiser.",
				outcomes: ["Site", "Arquivo", "Brasília"],
				impact: "[+X pedidos de briefing pelo site]",
			},
			"norte-vinhos": {
				sector: "Vinho",
				disciplines: ["Identidade", "Digital"],
				problem:
					"A adega tinha nome. A loja online podia ser de qualquer importadora.",
				solution: "O rótulo manda. A loja cala o bastante pra deixar escolher.",
				outcomes: ["Loja", "Catálogo", "Identidade"],
				impact: "[+X% de venda pela loja]",
			},
			"lima-advocacia": {
				sector: "Direito",
				disciplines: ["Posicionamento", "Digital"],
				problem: "Escritório sério atrás de um site de advogado de template.",
				solution: "Nome, casos, o resto fora. Sem coluna grega na capa.",
				outcomes: ["Site", "Texto", "Posicionamento"],
				impact: "[+X pedidos de reunião pelo site]",
			},
			"horizonte-cafe": {
				sector: "Café",
				disciplines: ["Conteúdo", "Digital"],
				problem:
					"O balcão tinha fila. O Instagram fazia as vezes de site — e sumia no outro dia.",
				solution:
					"Um lugar fixo. Cardápio, origem, horário. Sem post no lugar da vitrine.",
				outcomes: ["Site", "Conteúdo", "Brasília"],
				impact: "[redução de X horas respondendo o mesmo no DM]",
			},
			"estudio-rio": {
				sector: "Música",
				disciplines: ["Identidade", "Digital"],
				problem: "O som existia. Online, era bio do Instagram e um Linktree.",
				solution:
					"Discografia na frente. Press kit depois. O player não pede licença pra aparecer.",
				outcomes: ["Site", "Arquivo", "Identidade"],
				impact: "[+X pedidos de booking pelo site]",
			},
			"marina-costa": {
				sector: "Cerâmica",
				disciplines: ["Conteúdo", "Direção de arte", "Digital"],
				problem:
					"A peça na mesa tinha peso. No feed, era artesanato de marketplace.",
				solution: "Cada peça com nome. Sem fundo infinito de crochê.",
				outcomes: ["Site", "Editorial", "Lookbook"],
				impact: "[+X% de encomenda direta]",
			},
		},
	},
	studio: {
		metaTitle: "Estúdio",
		metaDescription: "O que é a YOPHI — e de onde vem o nome.",
		eyebrow: "Estúdio",
		headline: "Direção criativa e digital. No mesmo teto.",
		intro:
			"Não vendemos post. Não vendemos site. Fazemos o que a pessoa encontra — pra o negócio parar de parecer de qualquer um.",
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
		workWithUs: "Começar o seu projeto",
	},
	contact: {
		metaTitle: "Contato",
		metaDescription: "Manda o projeto pra YOPHI. Três frases bastam.",
		eyebrow: "Contato",
		headline: "Manda o que as pessoas encontram hoje.",
		intro:
			"Quem é, o que está errado no ar, o que você quer no lugar. A gente responde em poucos dias.",
		email: "hello@yophi.studio",
		tag: "Criativo × Tecnologia",
		name: "Nome",
		emailLabel: "E-mail",
		company: "Empresa",
		message: "O que as pessoas encontram hoje?",
		submit: "Enviar o projeto",
		successTitle: "Chegou.",
		successBody:
			"A gente lê e responde com o que faria — ou com o que não faria.",
	},
};

const en: Dictionary = {
	meta: {
		title: "YOPHI — If it looks like anyone's, it isn't yours",
		description:
			"A studio for content, design and technology. If the site could belong to anyone, the client goes there too.",
		ogDescription:
			"YOPHI. If it looks like anyone's, it isn't yours. We make the other one.",
	},
	nav: {
		home: "Home",
		work: "Work",
		studio: "Studio",
		contact: "Contact",
		openMenu: "Open menu",
		language: "Language",
		skip: "Skip to content",
	},
	hero: {
		headline: "If it looks like anyone's, it isn't yours.",
		body: "Positioning, content, site and system. So the client finds you — not the one next door.",
		audience:
			"For the business that already sells. And still loses people on the first click because the site looks like everyone else's.",
		cta: "Start your project",
		ctaSecondary: "See the work",
		ctaHint:
			"Send three lines. We reply whether we take it — and what we'd put live.",
		formLabel: "Form",
		formAside: "From what you are to what the client finds.",
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
		closing: "A single piece doesn't hold a client. The whole does.",
	},
	worlds: {
		eyebrow: "Two sides · one studio",
		creative: "Creative",
		creativeTags: "Content · Social · Video · Art direction",
		creativeCopy:
			"Voice and image the brand recognizes. The client too — without reading as a campaign.",
		digital: "Digital",
		digitalTags: "Sites · Products · Systems · Technology",
		digitalCopy:
			"Site, product, system. What people use to buy, book, come back.",
		meet: "Creative × Technology",
		meetCopy: "Both under one roof. What most people split — and lose.",
	},
	selectedWork: {
		eyebrow: "Archive",
		headline: "Work we put our name on.",
		invite:
			"Two live. The rest shows the kind. Come in — and see if that's what yours needs.",
		all: "See the work",
	},
	services: {
		eyebrow: "What we do",
		headline: "From the look",
		headlineBreak: "to what goes live.",
		aside: "No packages. What yours needs to stop looking like anyone's.",
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
		headline:
			"We start from what the business already is. Not what's in fashion.",
		steps: {
			SEE: "We understand the business.",
			DEFINE: "We name the difference.",
			SHAPE: "We give it a form.",
			BUILD: "We put it live. The client finds it.",
			EVOLVE: "We stay with it after.",
		},
	},
	origin: {
		note: "Hebrew — beauty",
		copy: "It isn't decoration.",
		copyLine2: "It's the name we chose.",
	},
	finalCta: {
		eyebrow: "Now",
		headline: "Does yours still look like anyone's?",
		body: "Send what people find today. We reply with the next step — or with what we wouldn't do.",
		cta: "Start your project",
	},
	footer: {
		blurb:
			"If the site looks like anyone's, the client goes there too. We make the other one.",
		navigate: "Navigate",
		presence: "Studio",
		presenceLine: "Content, design",
		presenceLine2: "and technology.",
		copyright: "YOPHI Studio",
		tag: "Creative × Technology",
	},
	work: {
		metaTitle: "Archive",
		metaDescription:
			"Work from YOPHI. What stayed live — and the kind we make.",
		eyebrow: "Archive",
		headline: "What stayed live.",
		intro:
			"Not a studio shop window. What's already live. Come in and see if that's what yours needs.",
		disciplines: "What went in",
		challenge: "The problem",
		intervention: "What went live",
		outcomes: "What stayed",
		impact: "What changed",
		cta: "I want one like this",
		ctaLink: "Start your project",
		visit: "Open the site",
		back: "Archive",
		open: "Open",
		loading: "Archive",
		studies: {
			maxdecoyer: {
				sector: "Photography",
				disciplines: ["Art direction", "Digital"],
				problem:
					"The work was already there. Online, it drowned in every other photographer's site.",
				solution:
					"We did the opposite. maxdecoyer.com — black and white, two languages, archive first. The picture leads. Everything else shuts up.",
				outcomes: ["Site", "PT / EN", "Archive"],
				impact: "[+X% of inquiries from the site]",
			},
			"dra-ana-cardenas": {
				sector: "Dentistry",
				disciplines: ["Positioning", "Digital"],
				problem:
					"The practice had a face. The site could have belonged to any dentist in Brasília.",
				solution:
					"draanacardenas.com — her first, the practice at its own pace. No stock photos, no shop-window clinic.",
				outcomes: ["Site", "Positioning", "Brasília"],
				impact: "[+X appointments booked from the site]",
			},
			"atelier-luz": {
				sector: "Fashion",
				disciplines: ["Content", "Art direction", "Digital"],
				problem:
					"On the street the brand had weight. On the site, it was another clothing label.",
				solution:
					"A language the collection recognizes — and a lookbook that doesn't look like a store with better posture.",
				outcomes: ["Identity", "Editorial", "Lookbook"],
				impact: "[+X% of direct sales from the lookbook]",
			},
			"orbit-systems": {
				sector: "Technology",
				disciplines: ["Positioning", "Digital", "Technology"],
				problem:
					"A good product behind a site that could have been anyone's. The difference stopped on the first screen.",
				solution:
					"We rewrote until the screen sold itself. Sales stopped explaining and started pointing.",
				outcomes: ["Site", "Interface", "Automation"],
				impact: "[X hours saved in sales]",
			},
			"casa-vera": {
				sector: "Architecture",
				disciplines: ["Art direction", "Digital"],
				problem:
					"The building spoke. The site was a PDF of projects in someone else's typeface.",
				solution:
					"casavera.com — the house first. Plans later, if you want them.",
				outcomes: ["Site", "Archive", "Brasília"],
				impact: "[+X briefing requests from the site]",
			},
			"norte-vinhos": {
				sector: "Wine",
				disciplines: ["Identity", "Digital"],
				problem:
					"The cellar had a name. The shop could have belonged to any importer.",
				solution:
					"The label leads. The shop stays quiet enough to let you choose.",
				outcomes: ["Shop", "Catalogue", "Identity"],
				impact: "[+X% of sales from the shop]",
			},
			"lima-advocacia": {
				sector: "Law",
				disciplines: ["Positioning", "Digital"],
				problem: "A serious firm behind a lawyer-template site.",
				solution:
					"The name, the cases, everything else out. No Greek column on the cover.",
				outcomes: ["Site", "Copy", "Positioning"],
				impact: "[+X meeting requests from the site]",
			},
			"horizonte-cafe": {
				sector: "Coffee",
				disciplines: ["Content", "Digital"],
				problem:
					"The counter had a line. Instagram did the job of a site — and vanished the next day.",
				solution:
					"A fixed place. Menu, origin, hours. No post standing in for the window.",
				outcomes: ["Site", "Content", "Brasília"],
				impact: "[X hours saved answering the same thing in DMs]",
			},
			"estudio-rio": {
				sector: "Music",
				disciplines: ["Identity", "Digital"],
				problem:
					"The sound was there. Online, it was an Instagram bio and a Linktree.",
				solution:
					"Discography first. Press kit later. The player doesn't ask permission to show up.",
				outcomes: ["Site", "Archive", "Identity"],
				impact: "[+X booking requests from the site]",
			},
			"marina-costa": {
				sector: "Ceramics",
				disciplines: ["Content", "Art direction", "Digital"],
				problem:
					"The piece on the table had weight. In the feed, it was marketplace craft.",
				solution: "Each piece with a name. No endless crochet backdrop.",
				outcomes: ["Site", "Editorial", "Lookbook"],
				impact: "[+X% of direct orders]",
			},
		},
	},
	studio: {
		metaTitle: "Studio",
		metaDescription: "What YOPHI is — and where the name comes from.",
		eyebrow: "Studio",
		headline: "Creative direction and digital. Same roof.",
		intro:
			"We don't sell posts. We don't sell sites. We make what people find — so the business stops looking like anyone's.",
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
		workWithUs: "Start your project",
	},
	contact: {
		metaTitle: "Contact",
		metaDescription: "Send YOPHI the project. Three lines are enough.",
		eyebrow: "Contact",
		headline: "Send what people find today.",
		intro:
			"Who it is, what's wrong live, what you want instead. We reply in a few days.",
		email: "hello@yophi.studio",
		tag: "Creative × Technology",
		name: "Name",
		emailLabel: "Email",
		company: "Company",
		message: "What do people find today?",
		submit: "Send the project",
		successTitle: "Got it.",
		successBody:
			"We'll read it and reply with what we'd put live — or what we wouldn't.",
	},
};

const dictionaries: Record<Locale, Dictionary> = { pt, en };

export function getDictionary(locale: string): Dictionary {
	if (isLocale(locale)) return dictionaries[locale];
	return dictionaries[defaultLocale];
}
