const eventosNacionais = {
  // Feriados Nacionais Oficiais
  "2025-01-01": ["Confraternização Universal (Ano Novo)"],
  "2025-03-04": ["Carnaval"],                          // terça-feira
  "2025-03-05": ["Quarta-feira de Cinzas"],             // ponto facultativo até meio-dia
  "2025-04-18": ["Sexta-feira Santa (Paixão de Cristo)"],
  "2025-04-21": ["Tiradentes"],
  "2025-05-01": ["Dia do Trabalho"],
  "2025-06-19": ["Corpus Christi"],
  "2025-09-07": ["Independência do Brasil"],
  "2025-10-12": ["Nossa Senhora Aparecida", "Dia das Crianças"], 
  "2025-11-02": ["Finados"],
  "2025-11-15": ["Proclamação da República"],
  "2025-12-25": ["Natal"],

 
  "2025-02-14": ["Dia de São Valentim (Dia dos Namorados)"],
  "2025-05-11": ["Dia das Mães"],                    
  "2025-08-10": ["Dia dos Pais"],                     
  "2025-11-20": ["Dia da Consciência Negra"],          
  "2025-10-15": ["Dia do Professor"],
  "2025-07-20": ["Dia do Amigo"],
  "2025-09-21": ["Dia da Árvore"],
  "2025-10-04": ["Dia de São Francisco de Assis"],     
  "2025-06-12": ["Dia dos Namorados"],                 
};


const eventosRegionais = {
    AL: {
    "2025-11-15": ["Festival Carambola"],
    "2025-07-06": ["Circuito Alagoano de Inverno"],
    "2025-08-02": ["Festival Em Cantos de Alagoas"],
    "2025-09-11": ["Festival de Cinema de Arapiraca"],
    "2025-11-01": ["Festival Alagoanes"],
    "2025-01-26": ["Romaria do Bom Jesus dos Navegantes"],
    "2025-06-01": ["Festival Brasil Sabor - AL"],
    "2025-01-07": ["Festival Massayó Verão"],
    "2025-02-02": ["Festival de Verão Rio Largo"],
    "2025-04-01": ["Festivais Gastronômicos de Arapiraca"]
  },
  AC: {
    "2025-02-21": ["Festival da Castanha"],
    "2025-02-28": ["Carnaval da Família"],
    "2025-05-20": ["Festival Ecoacre"],
    "2025-06-24": ["Arraial Cultural"],
    "2025-07-12": ["Festival Yawa"],
    "2025-07-26": ["Expoacre"],
    "2025-07-29": ["Festival das Águas"],
    "2025-08-14": ["Festival do Açaí"],
    "2025-10-25": ["Festival Varadouro"],
    "2025-12-10": ["Festival Pachamama"]
  },
   AP: {
    "2025-08-01": ["Festival do Inajá"],
    "2025-08-03": ["Festival do Pirarucu"],
    "2025-11-28": ["Festival Indígena do Amapá e Norte do Pará"],
    "2025-12-02": ["Festival Imagem-Movimento (FIM)"],
    "2025-11-15": ["Festival Gastronômico Amapá Sabor"],
    "2025-12-01": ["Festival de Samba e Enredo"],
    "2025-03-08": ["Festival da Pororoca"],
    "2025-08-04": ["Festival Curta Teatro"],
    "2025-03-07": ["Festival RUEIRO"],
    "2025-08-05": ["Festival Cultural Amapaense (AEIOU)"]
  },
 AM: {
    "2025-06-27": ["Festival Folclórico de Parintins"],
    "2025-08-30": ["Festival de Ciranda de Manacapuru"],
    "2025-03-04": ["Carnaval de Manaus"],
    "2025-03-06": ["Festival Amazonas de Ópera"],
    "2025-07-05": ["Encontro de Folguedos"],
    "2025-06-02": ["Festival de Teatro de Rua"],
    "2025-09-01": ["Amazonas Sabor"],
    "2025-11-17": ["Festival Reggae Manaus"],
    "2025-10-01": ["Festival Folclórico de Autazes"],
    "2025-12-21": ["Festival Internacional de Jazz do Rio Negro"]
  },
   BA: {
    "2025-02-28": ["Carnaval de Salvador"],
    "2025-01-31": ["Festival de Verão Salvador"],
    "2025-01-02": ["Festival de Música e Arte Olodum (Femadum)"],
    "2025-09-22": ["Festival Frequências Preciosas"],
    "2025-12-12": ["Festival do Morro de São Paulo"],
    "2025-10-02": ["Festival Suíça Bahiana"],
    "2025-12-02": ["Sabores de Itacaré"],
    "2025-11-30": ["Tempero no Forte"],
    "2025-12-30": ["Universo Paralello"],
    "2025-11-06": ["Afropunk Salvador"]
  },
    CE: {
    "2025-07-01": ["Festival Junino Ceará Junino"],
    "2025-06-03": ["Juaforró"],
    "2025-12-11": ["Cine Ceará – Festival Ibero-americano de Cinema"],
    "2025-07-15": ["Festival Halleluya"],
    "2025-01-03": ["Festival Alberto Nepomuceno"],
    "2025-03-05": ["Festival de Teatro de Rua (RUEIRO)"],
    "2025-02-01": ["Festival Gastronômico de Fortaleza"],
    "2025-12-15": ["Fortaleza Carnatal"],
    "2025-08-06": ["Ceará Music Festival"],
    "2025-07-05": ["Festival de Quadrilhas de Baturité"]
  },
   ES: {
    "2025-04-05": ["Vibra Rock Brasil"],
    "2025-04-18": ["Penha Roots"],
    "2025-06-07": ["Boom Rap Festival"],
    "2025-06-13": ["Santa Jazz"],
    "2025-07-03": ["Festival de Inverno de Guaçuí"],
    "2025-07-25": ["Tenda Lab"],
    "2025-08-15": ["Festival Movimento Cidade"],
    "2025-08-07": ["Festival Pocar"],
    "2025-05-30": ["Festival da Cultura Italiana (Venda Nova)"],
    "2025-09-06": ["Festival Gastronômico & Cultural de São Mateus"]
  },
  GO: {
  "2025-06-03": ["FICA"],
  "2025-09-09": ["Canto da Primavera"],
  "2025-06-06": ["Arraiá do Bem"],
  "2025-06-27": ["Festa do Divino Pai Eterno"],
  "2025-09-14": ["Festival Cozinha Raiz de Pirenópolis"],
  "2025-02-03": ["Festival Gourmet Goiânia"],
  "2025-05-13": ["Festival Gastronômico do Cerrado"],
  "2025-04-02": ["Café Fest"],
  "2025-05-11": ["Festival Brasil Sabor"],
  "2025-03-22": ["Um Festival"]
},
MA: {
  "2025-06-04": [
    "Bumba-meu-boi do Maranhão",
    "São João do Maranhão",
    "Festival Guarnicê de Cinema",
    "Bumba-meu-boi (arraiais diversos)"
  ],
  "2025-10-03": [
    "Festival BR-135",
    "Festival Maranhão Open Air",
    "Maranhão Open Air",
    "Maranhão Open Air"
  ],
  "2025-09-14": ["Festa de São José de Ribamar"],
  "2025-05-10": ["Festa do Divino Espírito Santo"]
},
MT: {
  "2025-04-03": [
    "Festival Calango",
    "Circuito do Lambadão",
    "Festival de Lambadão"
  ],
  "2025-05-31": ["Encontro Nacional de Violeiros de Poxoréu"],
  "2025-09-13": ["Festival Velha Joana"],
  "2025-10-04": ["Feira Agropecuária (Aprorural)"],
  "2025-07-17": ["Festival de Inverno de Chapada dos Guimarães"],
  "2025-08-08": [
    "Expô Cuiabá",
    "Festival de Música Regional do Pantanal"
  ]
},
MS: {
  "2025-05-09": ["Festival América do Sul (FAS)"],
  "2025-08-09": ["Festival de Inverno de Bonito (FIB)", "Festa da Linguiça de Maracaju"],
  "2025-03-04": ["Festival Boca de Cena", "Festival do Sobá"],
  "2025-07-16": ["Festa da Melancia de Eldorado"],
  "2025-06-05": ["Festa do Tomate de Antônio João", "Festa da Cana de Sonora"],
  "2025-09-12": ["Festa do Ovo de Terenos"],
  "2025-10-05": ["Festa do Queijo de Rochedinho"]
},
MG: {
  "2025-02-04": ["Carnaval da Liberdade / Carnaval de BH"],
  "2025-05-08": ["Festival Sarará", "Festival Internacional de Quadrinhos (FIQ)"],
  "2025-06-06": ["Festival SENSACIONAL!"],
  "2025-08-10": ["Virada Cultural"],
  "2025-07-15": ["Festival de Inverno de Ouro Preto", "Festival de Inverno de Itabira", "Festival de Inverno de Poços de Caldas"],
  "2025-04-04": ["Festival Comida de Buteco"],
  "2025-10-06": ["Festival de Gastronomia de Tiradentes"]
},
PA: {
  "2025-10-12": ["Festa de Círio de Nazaré"],
  "2025-01-04": ["Festival de Verão de Salinas"],
  "2025-07-14": ["Marujada de São Benedito", "Festival de Ópera do Theatro da Paz", "Festa de Nossa Senhora do Carmo"],
  "2025-08-11": ["Festa do Açaí"],
  "2025-06-07": ["Festival Folclórico de Parintins", "Festa de São João de Icoaraci"],
  "2025-03-03": ["Festival Gastronômico do Tacacá"],
  "2025-10-07": ["Festival de Jazz e Blues de Belém"]
},
PB: {
  "2025-01-05": ["Fest Verão Paraíba"],
  "2025-05-07": ["Arraiá do Interior"],
  "2025-06-08": ["Festival de Cultura Popular de Areia"],
  "2025-06-20": ["São João de João Pessoa"],
  "2025-07-13": ["Festa da Tainha", "Festival de Inverno de Campina Grande"],
  "2025-07-05": ["Festa de São Pedro de Belém"],
  "2025-08-12": ["Festival de Artes de Patos"],
  "2025-09-10": ["Festival de Teatro de Campina Grande"],
  "2025-10-08": ["Festival de Música de João Pessoa"]
},
PR: {
  "2025-04-05": ["Festival de Teatro de Curitiba"],
  "2025-05-03": ["Warung Day Festival"],
  "2025-07-12": ["Festival de Folclore de Londrina"],
  "2025-07-05": ["Festival Internacional de Danças Urbanas (FIH2)"],
  "2025-07-13": ["Festival de Música de Londrina"],
  "2025-07-19": ["Cianorte Festival"],
  "2025-07-26": ["Festival de Inverno de Curitiba"],
  "2025-08-13": ["Festa da Uva de Marialva"],
  "2025-10-09": ["Festival de Gastronomia de Curitiba"],
  "2025-11-04": ["Festival de Cinema de Curitiba"]
},
PE: {
  "2025-02-05": ["Carnaval de Recife e Olinda"],
  "2025-05-06": ["Festa do Divino Espírito Santo"],
  "2025-06-09": ["Festa de São João de Caruaru", "Festival de Quadrilhas Juninas"],
  "2025-07-11": ["Festival de Inverno de Garanhuns", "Maracatu Rural de Nazaré da Mata", "Festa de Nossa Senhora do Carmo"],
  "2025-08-11": ["Festival Recife do Rock"],
  "2025-10-10": ["Festival de Teatro de Pernambuco"],
  "2025-11-03": ["Festival de Jazz de Recife"]
},
PI: {
  "2025-01-06": ["Festival das Águas de Piripiri"],
  "2025-02-06": ["Carnaval de Teresina"],
  "2025-06-10": ["Festejos de São João de Parnaíba", "Festival de Folclore de Oeiras", "Festa do Bumba Meu Boi"],
  "2025-07-10": ["Festival de Cinema de Parnaíba"],
  "2025-08-01": ["Festival de Inverno de Pedro II"],
  "2025-09-11": ["Festival Gastronômico de Teresina"],
  "2025-10-11": ["Festival de Teatro de Teresina"],
  "2025-11-08": ["Festival de Jazz de Teresina"]
},
RJ: {
  "2025-01-01": ["Festival de Cinema de Tiradentes (RJ)"],
  "2025-02-07": ["Carnaval do Rio de Janeiro"],
  "2025-02-02": ["Festa de Iemanjá"],
  "2025-04-23": ["Festa de São Jorge"],
  "2025-06-11": ["Festival de Teatro de Petrópolis"],
  "2025-08-20": ["Festival de Jazz & Blues"],
  "2025-09-09": ["Rock in Rio"],
  "2025-10-21": ["Festival do Rio"],
  "2025-11-03": ["Festa do Cajú", "Festival da Jabuticaba"]
},
RN: {
  "2025-02-08": ["Carnaval de Natal"],
  "2025-06-12": ["Festival de Quadrilhas Juninas"],
  "2025-07-09": ["Festa de Sant’Ana de Caicó", "Festa do Boi de Parazinho"],
  "2025-08-25": ["Festival de Gastronomia de Pipa"],
  "2025-09-08": ["Festival de Música de Natal"],
  "2025-10-22": ["Festival de Teatro de Natal"],
  "2025-11-13": ["Festival de Dança de Natal"],
  "2025-12-02": ["Carnatal"],
  "2025-12-13": ["Festa de Santa Luzia"]
},
RS: {
  "2025-01-02": ["Porto Verão Alegre"],
  "2025-02-09": ["Festa da Uva"],
  "2025-05-05": [
    "Fenadoce",
    "Festa do Pinhão de São Francisco de Paula",
    "Festa Nacional do Chimarrão (Fenachim)"
  ],
  "2025-07-08": ["Festival Internacional de Folclore de Nova Petrópolis"],
  "2025-08-28": [
    "Festival de Cinema de Gramado",
    "Expointer"
  ],
  "2025-09-07": ["Acampamento Farroupilha"],
  "2025-11-01": ["Enart"]
},
RR: {
  "2025-01-03": ["Festa de São Sebastião"],
  "2025-06-13": ["Boa Vista Junina", "Festa do Milho"],
  "2025-07-07": ["Festival de Praia do Cauamé"],
  "2025-08-25": ["Festival Folclórico de Boa Vista"],
  "2025-09-06": ["Festa do Sol"],
  "2025-10-23": [
    "Festival Indígena do Lago Caracaranã",
    "Festival Literário de Roraima"
  ],
  "2025-11-18": ["Semana do Lavrado"],
  "2025-12-03": ["Festival de Música Canta Roraima"]
},
RO: {
  "2025-04-06": ["Mostra Sesc Amazônia das Artes"],
  "2025-05-04": ["Rondônia Rural Show", "Festa do Divino Espírito Santo"],
  "2025-06-14": ["Arraial Flor do Maracujá"],
  "2025-07-06": ["Festival de Praia de Pimenteiras"],
  "2025-08-07": ["Festa do Café de Cacoal"],
  "2025-09-05": ["Expocol", "Festival Gastronômico de Porto Velho"],
  "2025-10-23": ["Festival de Dança Norte em Movimento"],
  "2025-11-08": ["Festival de Cinema Curta Amazônia"]
},
SC: {
  "2025-04-07": ["Festa Nacional da Maçã"],
  "2025-06-15": ["Festa do Pinhão de Lages"],
  "2025-07-05": ["Festival de Dança de Joinville", "Festa do Colono"],
  "2025-08-18": ["Festival de Música de Itajaí"],
  "2025-09-04": ["Encontro Catarinense de Teatro"],
  "2025-10-24": ["Oktoberfest de Blumenau", "Fenarreco", "Marejada"],
  "2025-11-09": ["Schützenfest"]
},
SP: {
  "2025-03-02": ["Festival Lollapalooza Brasil"],
  "2025-04-08": ["São Paulo Fashion Week"],
  "2025-05-03": ["Virada Cultural"],
  "2025-06-16": ["Festival de Cinema de Paulínia", "Parada do Orgulho LGBTQIA+ SP", "Festival da Mantiqueira", "Festival João Rock"],
  "2025-07-04": ["Festival de Inverno de Campos do Jordão"],
  "2025-10-25": ["São Paulo Fashion Week", "Mostra Internacional de Cinema de SP"],
  "2025-11-10": ["Festival Revelando SP"]
},
SE: {
  "2025-01-04": ["Encontro Cultural de Laranjeiras"],
  "2025-04-09": ["Serigy Jazz Festival"],
  "2025-05-02": ["Festival de Música de Itabaiana"],
  "2025-06-17": ["Forró Caju", "Arraiá do Povo"],
  "2025-07-03": ["Festival de Inverno de Boquim"],
  "2025-09-03": ["Festival de Cinema Curta-SE"],
  "2025-10-26": ["Festival Iberoamericano de Cinema de Sergipe (FIC)"],
  "2025-11-11": ["Festival de Artes de São Cristóvão (FASC)"],
  "2025-12-04": ["Caju Bossa Nova"]
},
TO: {
  "2025-02-10": ["Palmas Capital da Fé"],
  "2025-05-01": ["Festa do Divino de Natividade"],
  "2025-06-11": ["Festa de São João de Porto Nacional", "Festival de Cinema e Vídeo do Tocantins (FICTO)", "Cantoria de São João Batista"],
  "2025-07-02": ["Festival Cultural do Jalapão"],
  "2025-08-30": ["Festival da Canção de Gurupi (FEGUP)"],
  "2025-09-02": ["FesArtes de Taquaruçu", "Festival Gastronômico de Taquaruçu"],
  "2025-11-24": ["Feneciti Gurupi"]
},
DF: {
  "2025-03-01": ["Festival de Culturas Populares"],
  "2025-06-19": ["Festival Taguatinga de Cinema"],
  "2025-07-01": ["Festival Latinidades", "Festival Brasília Capital Moto Week"],
  "2025-08-01": ["Porão do Rock", "Festival CoMA", "Cena Contemporânea"],
  "2025-09-01": ["Festival Internacional de Literatura de Brasília (FIL)"],
  "2025-10-21": ["Festival Micarê Candanga"],
  "2025-11-11": ["Festival de Brasília do Cinema Brasileiro"]
}

};
// Elementos do DOM
const estadoSelect = document.getElementById('estado');
const calendarioEl = document.getElementById('calendario');
const mesAnoEl    = document.getElementById('mesAno');
const prevBtn     = document.getElementById('prevMonth');
const nextBtn     = document.getElementById('nextMonth');
const detalhesEl  = document.getElementById('detalhesEvento');
let dataAtual     = new Date();

// Eventos de navegação
estadoSelect.addEventListener('change', gerarCalendario);
prevBtn.addEventListener('click', () => mudarMes(-1));
nextBtn.addEventListener('click', () => mudarMes(1));

// Altera mês e regenera calendário
function mudarMes(delta) {
  dataAtual.setMonth(dataAtual.getMonth() + delta);
  gerarCalendario();
}

// Gera a tabela do calendário
function gerarCalendario() {
  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();
  const hojeStr = new Date().toISOString().split('T')[0];

  mesAnoEl.textContent = dataAtual.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });

  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();

  let html = '<table class="calendario"><thead><tr>';
  ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb'].forEach(d => html += `<th>${d}</th>`);
  html += '</tr></thead><tbody><tr>';

  for (let i = 0; i < primeiroDiaSemana; i++) html += '<td></td>';

  for (let dia = 1; dia <= diasNoMes; dia++) {
    const dateStr = `${ano}-${String(mes+1).padStart(2,'0')}-${String(dia).padStart(2,'0')}`;
    const isHoje = dateStr === hojeStr;
    html += `<td class="dia${isHoje ? ' hoje' : ''}" data-date="${dateStr}">`;
    html += `<div class="num">${dia}</div>`;

    // eventos nacionais
    (eventosNacionais[dateStr] || []).forEach(evt => {
      html += `<div class="evento nacional">${evt}</div>`;
    });

    // eventos regionais: agrega todos se nenhum estado selecionado
    let regionalList = [];
    const estado = estadoSelect.value;
    if (!estado) {
      Object.values(eventosRegionais).forEach(reg => {
        if (reg[dateStr]) regionalList = regionalList.concat(reg[dateStr]);
      });
    } else {
      regionalList = eventosRegionais[estado]?.[dateStr] || [];
    }
    regionalList.forEach(evt => {
      html += `<div class="evento regional">${evt}</div>`;
    });

    html += '</td>';
    if ((primeiroDiaSemana + dia) % 7 === 0 && dia !== diasNoMes) html += '</tr><tr>';
  }

  const fimEspacos = (7 - (primeiroDiaSemana + diasNoMes) % 7) % 7;
  for (let i = 0; i < fimEspacos; i++) html += '<td></td>';

  html += '</tr></tbody></table>';
  calendarioEl.innerHTML = html;

  // adiciona detalhes via delegação
  calendarioEl.querySelectorAll('td[data-date]').forEach(td => {
    td.addEventListener('click', () => mostrarDetalhes(td.dataset.date));
  });
}
function mostrarDetalhes(dateStr) {
  const nacional = eventosNacionais[dateStr] || [];
  let regionalList = [];
  const estado = estadoSelect.value;
  if (!estado) {
    Object.values(eventosRegionais).forEach(reg => {
      if (reg[dateStr]) regionalList = regionalList.concat(reg[dateStr]);
    });
  } else {
    regionalList = eventosRegionais[estado]?.[dateStr] || [];
  }
  const todos = [...nacional, ...regionalList];

  // --- aqui vem a mudança ---
  // pega ano, mês e dia do dateStr "YYYY-MM-DD"
  const [ano, mes, dia] = dateStr.split('-').map(Number);
  // cria a Date no fuso local
  const dataLocal = new Date(ano, mes - 1, dia);
  // --------------------------------

  let conteudo = `<h3>Eventos em ${dataLocal.toLocaleDateString('pt-BR')}</h3><ul>`;
  if (todos.length) {
    todos.forEach(evt => conteudo += `<li>${evt}</li>`);
  } else {
    conteudo += '<li>Sem eventos</li>';
  }
  conteudo += '</ul>';

  detalhesEl.innerHTML = conteudo;
}


// === Acessibilidade e menu mobile ===
// Controles de contraste e fonte
document.getElementById('btn-contrast').addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
});
document.getElementById('btn-font-increase').addEventListener('click', () => {
  const root = document.documentElement;
  const newPref = root.classList.contains('large-font') ? 'normal' : 'large';
  root.classList.toggle('large-font', newPref === 'large');
  localStorage.setItem('fontSize', newPref);
});
document.getElementById('btn-font-decrease').addEventListener('click', () => {
  const root = document.documentElement;
  const newPref = root.classList.contains('small-font') ? 'normal' : 'small';
  root.classList.toggle('small-font', newPref === 'small');
  localStorage.setItem('fontSize', newPref);
});
document.getElementById('btn-reset').addEventListener('click', () => {
  document.body.classList.remove('dark-mode');
  document.documentElement.classList.remove('large-font', 'small-font');
  localStorage.setItem('darkMode', 'disabled');
  localStorage.setItem('fontSize', 'normal');
});

// Carrega preferências ao iniciar
if (localStorage.getItem('darkMode') === 'enabled') {
  document.body.classList.add('dark-mode');
}
const fontPref = localStorage.getItem('fontSize') || 'normal';
if (fontPref === 'large') document.documentElement.classList.add('large-font');
if (fontPref === 'small') document.documentElement.classList.add('small-font');

// Menu mobile toggle
const navToggle = document.querySelector('.nav-toggle');
const menu      = document.querySelector('.menu');
navToggle.addEventListener('click', () => {
  menu.classList.toggle('menu--open');
  navToggle.classList.toggle('nav-toggle--open');
});

document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('menu--open');
    navToggle.classList.remove('nav-toggle--open');
  });
});

gerarCalendario();
