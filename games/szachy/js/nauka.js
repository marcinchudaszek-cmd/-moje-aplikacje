/* Nauka gry: lekcje z ćwiczeniami na planszy i porady.
   Rodzaje ćwiczeń:
   stars   — zbierz gwiazdki swoją bierką (przeciwnik się nie rusza)
   capture — zbij wszystkie bierki przeciwnika (one stoją w miejscu)
   move    — wykonaj konkretny ruch (accept); inny ruch → komunikat fail
   escape  — wyjdź spod szacha dowolnym legalnym ruchem
   mate    — daj mata w 1 ruchu (każdy ruch matujący jest dobry)
   win     — znajdź ruch wygrywający materiał (accept), potem wyjaśnienie
   play    — dokończ partię przeciw komputerowi i daj mata
   Poprawność wszystkich ćwiczeń sprawdza test/nauka.test.mjs. */
window.NAUKA = {
chapters: [
{ title: 'Jak chodzą bierki', lessons: [
  { id: 'wieza', title: 'Wieża', icon: 'R',
    intro: 'Wieża porusza się po liniach prostych — w pionie i w poziomie — o dowolną liczbę pól. Nie przeskakuje innych bierek.',
    steps: [
      { type: 'stars', fen: '8/8/8/8/8/8/8/R7 w - - 0 1', stars: ['a5', 'e5', 'e8'], goal: 'Zbierz wieżą wszystkie gwiazdki.' },
      { type: 'capture', fen: '8/8/1p6/8/8/1p3p2/8/1R6 w - - 0 1', goal: 'Zbij wieżą wszystkie czarne piony.' }
    ] },
  { id: 'goniec', title: 'Goniec', icon: 'B',
    intro: 'Goniec chodzi po przekątnych o dowolną liczbę pól. Przez całą partię zostaje na polach jednego koloru.',
    steps: [
      { type: 'stars', fen: '8/8/8/8/8/8/8/2B5 w - - 0 1', stars: ['e3', 'g5', 'd8'], goal: 'Zbierz gońcem wszystkie gwiazdki.' },
      { type: 'capture', fen: '1p6/8/8/4p3/8/2p5/8/B7 w - - 0 1', goal: 'Zbij gońcem wszystkie piony.' }
    ] },
  { id: 'hetman', title: 'Hetman', icon: 'Q',
    intro: 'Hetman łączy ruchy wieży i gońca: chodzi w pionie, w poziomie i po przekątnych. To najsilniejsza figura — warta tyle co dziewięć pionów.',
    steps: [
      { type: 'stars', fen: '8/8/8/8/8/8/8/3Q4 w - - 0 1', stars: ['d5', 'h5', 'e8'], goal: 'Zbierz hetmanem wszystkie gwiazdki.' },
      { type: 'capture', fen: '8/1p6/8/8/8/5p2/1p6/Q7 w - - 0 1', goal: 'Zbij hetmanem wszystkie piony.' }
    ] },
  { id: 'krol', title: 'Król', icon: 'K',
    intro: 'Król chodzi o jedno pole w dowolną stronę. To najważniejsza bierka: jego utrata (mat) kończy partię, dlatego nigdy nie może stanąć na atakowanym polu.',
    steps: [
      { type: 'stars', fen: '8/8/8/8/8/8/8/4K3 w - - 0 1', stars: ['f2', 'g3', 'g4'], goal: 'Doprowadź króla do wszystkich gwiazdek.' },
      { type: 'capture', fen: '8/8/4p3/3p4/4K3/8/8/8 w - - 0 1', goal: 'Zbij królem oba piony.' }
    ] },
  { id: 'skoczek', title: 'Skoczek', icon: 'N',
    intro: 'Skoczek skacze w kształt litery L: dwa pola w jedną stronę i jedno w bok. Jako jedyny przeskakuje inne bierki i za każdym razem zmienia kolor pola.',
    steps: [
      { type: 'stars', fen: '8/8/8/8/8/8/8/1N6 w - - 0 1', stars: ['c3', 'd5', 'f6'], goal: 'Zbierz skoczkiem wszystkie gwiazdki.' },
      { type: 'capture', fen: '8/8/2p5/8/3p4/5p2/8/6N1 w - - 0 1', goal: 'Zbij skoczkiem wszystkie piony.' }
    ] },
  { id: 'pion', title: 'Pion', icon: 'P',
    intro: 'Pion idzie tylko do przodu o jedno pole — z pola startowego może od razu o dwa. Bije inaczej, niż chodzi: o jedno pole na skos do przodu.',
    steps: [
      { type: 'stars', fen: '8/8/8/8/8/8/4P3/8 w - - 0 1', stars: ['e4', 'e6'], goal: 'Doprowadź piona do gwiazdek.' },
      { type: 'capture', fen: '8/8/8/8/5p2/4p3/3P4/8 w - - 0 1', goal: 'Zbij pionem oba czarne piony.' }
    ] }
] },
{ title: 'Zasady specjalne', lessons: [
  { id: 'szach', title: 'Szach i obrona', icon: 'K',
    intro: 'Szach to atak na króla. Trzeba go od razu odeprzeć na jeden z trzech sposobów: uciec królem, zasłonić go inną bierką albo zbić atakującą bierkę.',
    steps: [
      { type: 'escape', fen: 'k3r3/8/8/8/8/8/8/4K3 w - - 0 1', goal: 'Wieża szachuje Twojego króla. Uciekaj!' },
      { type: 'move', fen: 'k3r3/8/8/8/8/8/3B4/4K3 w - - 0 1', accept: ['d2e3'], goal: 'Tym razem zasłoń króla gońcem.',
        success: 'Goniec zasłonił króla przed wieżą.', fail: 'Ten ruch też ratuje przed szachem, ale tu zasłoń króla gońcem.' },
      { type: 'move', fen: 'k7/8/8/8/1b5R/8/8/4K3 w - - 0 1', accept: ['h4b4'], goal: 'Goniec szachuje króla. Zbij go!',
        success: 'Zbicie atakującej bierki to często najlepsza obrona.', fail: 'Uciekłeś, ale można było zbić gońca wieżą.' }
    ] },
  { id: 'roszada', title: 'Roszada', icon: 'K',
    intro: 'Roszada to jedyny ruch dwiema bierkami naraz: król idzie o dwa pola w stronę wieży, a wieża przeskakuje go. Warunki: król i ta wieża jeszcze się nie ruszały, między nimi jest pusto, a król nie jest szachowany i nie przechodzi przez atakowane pole.',
    steps: [
      { type: 'move', fen: 'r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1', accept: ['e1g1'], goal: 'Zrób krótką roszadę: przesuń króla o dwa pola w prawo.',
        success: 'Krótka roszada (O-O) — król bezpieczny w rogu.', fail: 'Krótka roszada to ruch króla z e1 na g1.' },
      { type: 'move', fen: 'r3k2r/pppppppp/8/8/8/8/PPPPPPPP/R3K2R w KQkq - 0 1', accept: ['e1c1'], goal: 'Teraz długa roszada: król o dwa pola w lewo.',
        success: 'Długa roszada (O-O-O).', fail: 'Długa roszada to ruch króla z e1 na c1.' },
      { type: 'move', fen: 'r3k3/8/8/8/8/8/5r2/R3K2R w KQq - 0 1', accept: ['e1c1'], goal: 'Jedna roszada jest teraz zabroniona. Wykonaj tę dozwoloną.',
        success: 'Właśnie tak — król nie może przejść przez pole f1, bo atakuje je wieża.', fail: 'Szukaj roszady: tylko jedna jest dozwolona.' }
    ] },
  { id: 'przelot', title: 'Bicie w przelocie', icon: 'P',
    intro: 'Gdy pion przeciwnika ruszy się o dwa pola i stanie tuż obok Twojego piona, możesz go zbić tak, jakby przeszedł tylko o jedno pole. Wolno to zrobić wyłącznie od razu, w następnym ruchu.',
    steps: [
      { type: 'move', fen: 'k7/8/8/3pP3/8/8/8/4K3 w - d6 0 1', accept: ['e5d6'], goal: 'Czarny pion właśnie poszedł z d7 na d5. Zbij go w przelocie.',
        success: 'Pion stanął na d6, a czarny pion z d5 zniknął.', fail: 'Bij pionem z e5 na d6.' }
    ] },
  { id: 'promocja', title: 'Promocja piona', icon: 'P',
    intro: 'Pion, który dojdzie do ostatniego rzędu, zamienia się w wybraną figurę: hetmana, wieżę, gońca albo skoczka. Najczęściej wybiera się hetmana.',
    steps: [
      { type: 'move', fen: 'k7/4P3/8/8/8/8/8/4K3 w - - 0 1', accept: ['e7e8q'], goal: 'Wprowadź piona na e8 i zamień go w hetmana.',
        success: 'Nowy hetman na planszy!', fail: 'Tym razem wybierz hetmana.' },
      { type: 'mate', fen: '6k1/1P3ppp/8/8/8/8/8/6K1 w - - 0 1', goal: 'Promocja może od razu dać mata. Znajdź taki ruch.' }
    ] }
] },
{ title: 'Mat i pat', lessons: [
  { id: 'mat1', title: 'Mat w jednym ruchu', icon: 'Q',
    intro: 'Mat to szach, przed którym nie ma obrony: król nie może uciec, nikt go nie zasłoni ani nie zbije atakującej bierki. Mat kończy partię.',
    steps: [
      { type: 'mate', fen: '6k1/5ppp/8/8/8/8/8/R5K1 w - - 0 1', goal: 'Mat na ostatniej linii — król zamknięty własnymi pionami.' },
      { type: 'mate', fen: 'k7/8/1K6/8/8/8/8/6Q1 w - - 0 1', goal: 'Hetman i król razem. Daj mata.' },
      { type: 'mate', fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p2Q/2B1P3/8/PPPP1PPP/RNB1K1NR w KQkq - 4 4', goal: 'Słynny „mat szewski”: pole f7 broni tylko król.' },
      { type: 'mate', fen: '6rk/6pp/8/6N1/8/8/8/6K1 w - - 0 1', goal: 'Mat zadławiony: król otoczony własnymi bierkami.' }
    ] },
  { id: 'pat', title: 'Pat — uważaj na remis', icon: 'K',
    intro: 'Pat to sytuacja, gdy strona na ruchu nie ma żadnego legalnego ruchu, a jej król nie jest szachowany. Pat to remis! Z dużą przewagą zawsze zostawiaj królowi przeciwnika jakiś ruch, dopóki nie dasz mata.',
    steps: [
      { type: 'mate', fen: 'k7/8/1K6/8/8/8/8/2Q5 w - - 0 1', goal: 'Daj mata — ale uważaj, jeden z ruchów hetmanem daje pata.' },
      { type: 'mate', fen: '7k/8/6KQ/8/8/8/8/8 w - - 0 1', goal: 'Jeszcze raz: mat, nie pat.' }
    ] }
] },
{ title: 'Matowanie', lessons: [
  { id: 'kqk', title: 'Hetman i król na króla', icon: 'Q',
    intro: 'Spychaj króla przeciwnika hetmanem do krawędzi: stawiaj hetmana o ruch skoczka od jego króla, wtedy ma najmniej pól. Gdy król utknie przy krawędzi, podprowadź swojego króla i daj mata. Uważaj na pata!',
    steps: [
      { type: 'play', fen: '8/8/8/4k3/8/8/8/3QK3 w - - 0 1', goal: 'Daj mata komputerowi. Masz hetmana i króla.' }
    ] },
  { id: 'rrk', title: 'Dwie wieże', icon: 'R',
    intro: 'Dwie wieże matują bez pomocy króla „drabinką”: jedna szachuje, druga pilnuje sąsiedniej linii, i na zmianę spychają króla do krawędzi. Trzymaj wieże daleko od króla przeciwnika, żeby ich nie zaatakował.',
    steps: [
      { type: 'play', fen: '8/8/8/3k4/8/8/8/R3K2R w - - 0 1', goal: 'Daj mata dwiema wieżami.' }
    ] },
  { id: 'krk', title: 'Wieża i król na króla', icon: 'R',
    intro: 'Wieżą odetnij króla przeciwnika od reszty planszy, a swoim królem idź naprzeciw niego. Gdy królowie staną naprzeciw siebie (opozycja), szach wieżą z boku spycha go o kolejną linię. Ta końcówka wymaga cierpliwości.',
    steps: [
      { type: 'play', fen: '8/8/8/4k3/8/8/8/R3K3 w - - 0 1', goal: 'Daj mata wieżą i królem.' }
    ] }
] },
{ title: 'Taktyka', lessons: [
  { id: 'widelki', title: 'Widełki', icon: 'N',
    intro: 'Widełki to atak jedną bierką na dwie bierki przeciwnika naraz. Przeciwnik uratuje tylko jedną. Mistrzem widełek jest skoczek, ale potrafi je zrobić każda bierka — nawet pion.',
    steps: [
      { type: 'win', fen: 'r3k3/8/8/1N6/8/8/6PP/4K3 w - - 0 1', accept: ['b5c7'], goal: 'Znajdź widełki skoczkiem.',
        success: 'Skoczek szachuje króla i atakuje wieżę — po ucieczce króla zbijesz wieżę.', fail: 'Szukaj pola, z którego skoczek zaatakuje króla i wieżę naraz.' },
      { type: 'win', fen: '7k/6pp/8/2n1n3/8/3P4/5PPP/3R2K1 w - - 0 1', accept: ['d3d4'], goal: 'Pion też potrafi zrobić widełki.',
        success: 'Pion atakuje oba skoczki — jeden z nich przepadnie.', fail: 'Którym ruchem pion zaatakuje dwie figury?' }
    ] },
  { id: 'zwiazanie', title: 'Związanie', icon: 'B',
    intro: 'Związanie to atak na bierkę, za którą stoi cenniejsza bierka — najczęściej król. Związana bierka nie może (albo nie powinna) się ruszyć, bo odsłoniłaby to, co za nią.',
    steps: [
      { type: 'win', fen: 'k7/8/8/3n4/8/7B/PP6/K7 w - - 0 1', accept: ['h3g2'], goal: 'Zwiąż skoczka z królem.',
        success: 'Skoczek nie może się ruszyć, bo odsłoniłby króla. W następnym ruchu go zbijesz.', fail: 'Postaw gońca na przekątnej, na której stoją skoczek i król.' },
      { type: 'win', fen: '4k3/8/4q3/8/8/8/3K2PP/7R w - - 0 1', accept: ['h1e1'], goal: 'Zwiąż hetmana z królem.',
        success: 'Hetman jest związany na linii e. Jeśli zbije wieżę, Twój król zbije hetmana.', fail: 'Postaw wieżę na linii, na której stoją hetman i król.' }
    ] },
  { id: 'odsloniecie', title: 'Odsłonięcie i rentgen', icon: 'R',
    intro: 'Odsłonięty atak: jedna bierka odchodzi i odsłania atak drugiej — najgroźniej, gdy odsłonięty jest szach. Rentgen (szpila): atakujesz króla, a gdy ucieknie, bijesz bierkę stojącą za nim.',
    steps: [
      { type: 'win', fen: '3k4/8/8/1q6/3N4/8/8/K2R4 w - - 0 1', accept: ['d4b5'], goal: 'Skoczek zasłania wieżę. Odejdź nim tak, by coś zyskać.',
        success: 'Skoczek zbił hetmana i odsłonił szach wieżą — czarne nie odbiją.', fail: 'Szukaj ruchu skoczkiem, który zbije coś cennego i odsłoni szach.' },
      { type: 'win', fen: '8/8/8/3k3q/8/8/8/R5K1 w - - 0 1', accept: ['a1a5'], goal: 'Król i hetman stoją w jednej linii. Wykorzystaj to.',
        success: 'Szach wieżą — król musi zejść z linii, a wtedy zbijesz hetmana.', fail: 'Zaszachuj króla tak, by za nim stał hetman.' }
    ] }
] },
{ title: 'Debiut', lessons: [
  { id: 'debiut', title: 'Zasady dobrego otwarcia', icon: 'P',
    intro: 'Na początku partii: zajmij centrum pionami, szybko wyprowadź skoczki i gońce, schowaj króla roszadą i nie ruszaj tej samej figury kilka razy bez potrzeby. Hetmana wyprowadzaj później — łatwo go zaatakować.',
    steps: [
      { type: 'move', fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1', accept: ['e2e4', 'd2d4'], goal: 'Zajmij centrum pionem.',
        success: 'Pion w centrum kontroluje ważne pola i otwiera drogę figurom.', fail: 'Lepiej zacząć od piona z linii e albo d — prosto w centrum.' },
      { type: 'move', fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR w KQkq - 0 2', accept: ['g1f3', 'b1c3'], goal: 'Wyprowadź skoczka w stronę centrum.',
        success: 'Skoczek na f3 albo c3 pilnuje centrum.', fail: 'Wyprowadź skoczka na f3 albo c3.' },
      { type: 'move', fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/4P3/5N2/PPPP1PPP/RNBQKB1R w KQkq - 2 3', accept: ['f1c4', 'f1b5'], goal: 'Wyprowadź gońca na aktywne pole.',
        success: 'Goniec gotowy do gry, a droga do roszady wolna.', fail: 'Wyprowadź gońca z f1 — na c4 albo b5.' },
      { type: 'move', fen: 'r1bqk1nr/pppp1ppp/2n5/2b1p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq - 4 4', accept: ['e1g1'], goal: 'Schowaj króla.',
        success: 'Roszada! Król bezpieczny, wieża wchodzi do gry.', fail: 'Najlepiej teraz zrobić roszadę.' }
    ] }
] }
],

tips: [
  { cat: 'Debiut', text: 'Zacznij od piona e albo d — piony w centrum dają miejsce gońcom i hetmanowi.' },
  { cat: 'Debiut', text: 'Najpierw wyprowadzaj skoczki, potem gońce. Skoczek na brzegu planszy (na linii a lub h) kontroluje mniej pól.' },
  { cat: 'Debiut', text: 'Zrób roszadę w pierwszych dziesięciu ruchach — król w centrum łatwo pada ofiarą ataku.' },
  { cat: 'Debiut', text: 'Nie wyprowadzaj hetmana za wcześnie: przeciwnik zaatakuje go figurami i zyska tempo.' },
  { cat: 'Debiut', text: 'W debiucie nie ruszaj tej samej figury dwa razy, jeśli nie musisz — każdy ruch powinien rozwijać nową figurę.' },
  { cat: 'Debiut', text: 'Nie ruszaj bez potrzeby pionów sprzed króla (f, g, h) — osłabisz jego schronienie.' },
  { cat: 'Debiut', text: 'Połącz wieże: gdy skoczki, gońce i hetman zejdą z pierwszego rzędu, wieże bronią się nawzajem.' },
  { cat: 'Gra środkowa', text: 'Przed każdym ruchem zapytaj: co zagroził przeciwnik swoim ostatnim ruchem?' },
  { cat: 'Gra środkowa', text: 'Zanim ruszysz bierką, sprawdź, czy nie zostawiasz innej bez obrony.' },
  { cat: 'Gra środkowa', text: 'Szachy, bicia, groźby — przeglądaj je w tej kolejności, szukając swojego ruchu. To najczęstsze źródło taktyki.' },
  { cat: 'Gra środkowa', text: 'Przybliżone wartości: pion 1, skoczek i goniec 3, wieża 5, hetman 9. Wymieniaj tylko na równe albo korzystne.' },
  { cat: 'Gra środkowa', text: 'Para gońców jest zwykle silniejsza niż goniec i skoczek, zwłaszcza w otwartych pozycjach.' },
  { cat: 'Gra środkowa', text: 'Wieże lubią otwarte linie — postaw wieżę na linii bez pionów.' },
  { cat: 'Gra środkowa', text: 'Skoczek najlepiej czuje się w centrum, na polu, którego nie mogą zaatakować piony przeciwnika.' },
  { cat: 'Gra środkowa', text: 'Gdy masz przewagę materialną, wymieniaj figury — im mniej bierek, tym łatwiej wygrać.' },
  { cat: 'Gra środkowa', text: 'Gdy przegrywasz materialnie, unikaj wymian i szukaj komplikacji.' },
  { cat: 'Gra środkowa', text: 'Zły ruch to często ruch bez planu. Wybierz cel — słabego piona, otwartą linię, króla — i graj w jego stronę.' },
  { cat: 'Taktyka', text: 'Szukaj widełek skoczkiem: dwie bierki przeciwnika w odległości ruchu skoczka od jednego pola to sygnał.' },
  { cat: 'Taktyka', text: 'Bierki na tej samej linii lub przekątnej co król albo hetman to okazja do związania lub rentgenu.' },
  { cat: 'Taktyka', text: 'Niebroniona bierka to łatwy cel. Licz, ile razy bierka jest atakowana i ile razy broniona.' },
  { cat: 'Taktyka', text: 'Słaba ostatnia linia: król schowany za trzema pionami może dostać mata od wieży. Daj mu „okienko”, przesuwając piona h lub g.' },
  { cat: 'Taktyka', text: 'Pole f7 (dla czarnych f2) broni na początku tylko król — to częsty cel ataków.' },
  { cat: 'Taktyka', text: 'Poświęcenie ma sens, gdy po nim wygrywasz więcej albo dajesz mata. Policz warianty do końca, zanim oddasz figurę.' },
  { cat: 'Taktyka', text: 'Szach nie zawsze jest dobry. Daj szacha, gdy coś dzięki niemu zyskujesz.' },
  { cat: 'Końcówka', text: 'W końcówce król staje się aktywną figurą — wyprowadź go do centrum.' },
  { cat: 'Końcówka', text: 'Wolny pion (bez pionów przeciwnika przed nim i obok) to wielka siła. Pchaj go do przodu, wspierając figurami.' },
  { cat: 'Końcówka', text: 'Wieże stawiaj za wolnymi pionami — swoimi i przeciwnika.' },
  { cat: 'Końcówka', text: 'Opozycja: gdy królowie stoją naprzeciw siebie z jednym polem przerwy, ten, kto nie musi się ruszyć, ma przewagę.' },
  { cat: 'Końcówka', text: 'Z przewagą hetmana lub wieży uważaj na pata — zawsze sprawdź, czy król przeciwnika ma choć jeden ruch.' },
  { cat: 'Końcówka', text: 'Sam goniec albo sam skoczek z królem nie dadzą mata — taka końcówka to remis.' },
  { cat: 'Nawyki', text: 'Graj wolniej: krótka chwila na sprawdzenie ruchu oszczędza wiele przegranych partii.' },
  { cat: 'Nawyki', text: 'Po partii przejrzyj ją strzałkami ◀ ▶ i znajdź moment, w którym wszystko się zmieniło.' },
  { cat: 'Nawyki', text: 'Rozwiązuj zadania codziennie — rozpoznawanie typowych motywów przychodzi z powtarzania.' },
  { cat: 'Nawyki', text: 'Graj z komputerem na poziomie, na którym wygrywasz mniej więcej co drugą partię — wtedy uczysz się najszybciej.' },
  { cat: 'Nawyki', text: 'Włącz trenera w ustawieniach: po każdym ruchu podpowie, czy był dobry, i pokaże lepszy, jeśli był błędem.' }
]
};
