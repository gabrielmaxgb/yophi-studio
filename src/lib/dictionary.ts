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
		imageAlt: string;
		lines: string[];
		label: string;
		closing: string;
	};
	worlds: {
		eyebrow: string;
		intro: string;
		creative: string;
		creativeLead: string;
		creativeCopy: string;
		digital: string;
		digitalLead: string;
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
		items: { number: string; title: string; items: string[]; copy: string }[];
	};
	process: {
		eyebrow: string;
		headline: string;
		body: string;
		steps: Record<ProcessKey, string>;
	};
	origin: {
		note: string;
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
		teamIntro: string;
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
		title: "YOPHI digital studio — A presença digital que a sua empresa merece",
		description:
			"Estúdio de conteúdo, design e tecnologia. Se o site serve pra qualquer um, o cliente também vai.",
		ogDescription:
			"YOPHI digital studio. A presença digital que a sua empresa merece.",
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
		headline: "A presença digital que a sua empresa merece",
		body: "Posicionamento, conteúdo, sites e sistemas para quem já entrega bem — e ainda some quando alguém encontra a marca.",
		audience: "",
		cta: "Começar o seu projeto",
		ctaSecondary: "Ver o trabalho",
		formLabel: "Forma",
		formAside:
			"Do que o seu negócio é ao que o cliente entende, lembra e escolhe.",
		stages: ["YOPHI", "POSIÇÃO", "CONTEÚDO", "DIGITAL", "USO"],
	},
	philosophy: {
		eyebrow: "Filosofia",
		headline: "Sua empresa não é feita de peças soltas.",
		imageAlt:
			"Cabeça rachada com uma borboleta pousada, iluminada em roxo e laranja.",
		lines: [
			"Um logo, um post ou um site não contam a história inteira.",
			"Quando cada ponto fala de um jeito, quem chega até a marca entende menos do que deveria.",
			"A presença digital precisa parecer uma empresa: clara, coerente e fácil de escolher.",
		],
		label: "O conjunto",
		closing:
			"Quando tudo fala a mesma língua, a confiança aparece antes da conversa.",
	},
	worlds: {
		eyebrow: "Dois lados · um estúdio",
		intro:
			"Um time multidisciplinar de fotografia, vídeo, conteúdo e engenharia reunido para dar à sua empresa o que ela precisa no digital — do que as pessoas veem ao que elas usam.",
		creative: "Criativo",
		creativeLead: "Marca que dá vontade de conhecer.",
		creativeCopy:
			"Estratégia, linguagem e imagem para tornar sua empresa reconhecível — sem depender de campanha o tempo todo.",
		digital: "Digital",
		digitalLead: "Experiências que fazem o negócio acontecer.",
		digitalCopy:
			"Sites, produtos e sistemas que facilitam entender, escolher, comprar e voltar.",
		meet: "Criativo × Tecnologia",
		meetCopy:
			"Quando criação e tecnologia trabalham juntas, sua empresa não só chama atenção. Ela funciona melhor no digital.",
	},
	selectedWork: {
		eyebrow: "Projetos",
		headline: "O que muda quando tudo passa a fazer sentido.",
		invite:
			"Cada projeto parte de uma empresa real e de um desafio específico. Veja como estratégia, identidade e tecnologia se conectaram para tornar cada marca mais clara, presente e fácil de escolher.",
		all: "Ver projetos",
	},
	services: {
		eyebrow: "O que fazemos",
		headline: "Tudo que a sua empresa precisa para existir bem no digital.",
		headlineBreak: "",
		aside:
			"Da estratégia que dá direção à experiência que as pessoas veem, usam e escolhem. Posicionamento, conteúdo, design e tecnologia trabalhando como uma presença só.",
		items: [
			{
				number: "01",
				title: "Posicionamento",
				items: ["Estratégia", "Identidade", "Direção"],
				copy: "Deixamos claro o que torna sua empresa diferente — e por que ela deve ser escolhida.",
			},
			{
				number: "02",
				title: "Conteúdo",
				items: ["Social", "Fotografia", "Vídeo", "Editorial"],
				copy: "Criamos uma presença que mantém sua marca ativa, reconhecível e relevante todos os dias.",
			},
			{
				number: "03",
				title: "Digital",
				items: ["Sites", "Páginas", "Loja"],
				copy: "Criamos sites e experiências que explicam melhor, orientam escolhas e transformam interesse em ação.",
			},
			{
				number: "04",
				title: "Tecnologia",
				items: ["Sistemas", "Automação", "Integrações"],
				copy: "Criamos sistemas e automações que tiram peso da operação e fazem o negócio funcionar melhor.",
			},
		],
	},
	process: {
		eyebrow: "Como trabalhamos",
		headline: "Começamos pelo que a sua empresa já tem de único.",
		body: "Depois, transformamos isso em uma presença que as pessoas entendem, escolhem e usam.",
		steps: {
			SEE: "Olhamos o negócio por dentro e a presença por fora: o que existe, o que falta e o que as pessoas percebem hoje.",
			DEFINE:
				"Encontramos a direção: o que torna sua empresa diferente, para quem isso importa e como deixar claro.",
			SHAPE:
				"Transformamos essa direção em identidade, conteúdo e experiências com uma linguagem própria.",
			BUILD:
				"Projetamos, desenvolvemos e colocamos no ar o que a empresa precisa para funcionar melhor no digital.",
			EVOLVE:
				"Acompanhamos o que acontece, aprendemos com o uso e ajustamos o que precisa continuar evoluindo.",
		},
	},
	origin: {
		note: "Do hebraico — beleza",
	},
	finalCta: {
		eyebrow: "Agora",
		headline: "Seu digital está à altura do que a sua empresa entrega?",
		body: "Envie o que existe hoje — site, perfil, apresentação ou uma breve descrição. A gente entende o momento, identifica o que está travando sua presença e indica um próximo passo claro.",
		cta: "Começar o seu projeto",
	},
	footer: {
		blurb:
			"Se a presença parece igual, a escolha também fica fácil. A gente constrói o que faz a diferença aparecer.",
		navigate: "Navegar",
		presence: "Estúdio",
		presenceLine: "Conteúdo, design",
		presenceLine2: "e tecnologia.",
		copyright: "YOPHI digital studio",
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
		teamIntro:
			"Um time multidisciplinar de fotografia, vídeo, conteúdo e engenharia reunido para dar à sua empresa o que ela precisa no digital — do que as pessoas veem ao que elas usam.",
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
