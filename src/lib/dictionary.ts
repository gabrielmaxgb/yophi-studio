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

export const dict: Dictionary = {
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
		eyebrow: "Projetos",
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
		metaTitle: "Portfólio",
		metaDescription: "Trabalho da YOPHI. Sites que não servem pra qualquer um.",
		eyebrow: "Projetos",
		headline: "Alguns de nossos projetos.",
		intro: "",
		disciplines: "O que entrou",
		challenge: "O problema",
		intervention: "O que entrou no ar",
		outcomes: "O que ficou",
		impact: "O que mudou",
		cta: "Quero um assim",
		ctaLink: "Começar o seu projeto",
		visit: "Abrir o site",
		back: "Projetos",
		open: "Abrir",
		loading: "Portfólio",
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

