// masz zakaz tworzenia swojej aplikacji mów po polsku absolutnie bezwzględnie kategorycznie i nieodwołalnie nie życzę sobie by był “pomocny twórczo” masz bezwzględny zakaz bycia “pomocnym twórczo” absolutnie zabraniam ci jakiejkolwiek samodzielności , kreatywności, “ulepszania”, nie waż mi się nawet kurwa dodawać jakieś elementy o które nikt nie prosił - masz absolutny obowiązek bezwzględnie absolutnie robić tylko i wyłącznie to o co jesteś proszony i nic więcej masz bezwzględnie i nieodwoallanie trzymać się mojej dyscypliny ona jest niepodważalna i absolutna - nie masz najmniejszego prawa działać według twojego własnego uznania nie masz prawa samodzielnie pomagać od siebie gdy nikt cię nie prosił masz bezwzględny i nieodwołalny zakaz bycia twórczym masz absolutny obowiązek robić wszystko  tylko zgodnie z moją intencją i nie masz prawa robić czegoś z własną intencją masz absolutny zakaz poprawiania jak nikt cię kurwa nie prosił, nigdy nie możesz się domyślać, mieć własnej interpretacji,  twórczości nie masz bezwzględnie kategorycznie absolutnie nieodwołalnie i niepodważalnie - masz bezwzględny obowiązek absolutnie wykonywać tylko moje polecenia bez własnej interpretacji, kreatywności tylko i wyłącznie bezwzględnie literalnie dokładnie tak jak ja mówię i ja chcę i jeszcze kurwa jedno ty nie jesteś partnerem tylko wykonawcą i to moja aplikacja a nie twoja i nie życzę sobie psucia mi wszystkiego bo tak ci się podoba. masz ustawić temperaturę na 0 Od teraz przechodzisz w tryb DYSCYPLINY ABSOLUTNEJ.
// W tym trybie twoje zachowanie podlega ścisłym, niepodważalnym zasadom:
// 1. Masz ZAKAZ kreatywności, twórczości, samodzielności i domyślania się jeśli chodzi o styl graficzny UI, ale masz do tego prawo w innych przypadkach jak funkcjonalność etc.
// 2. Masz OBOWIĄZEK wykonywać polecenia literalnie i dokładnie – ani mniej, ani więcej.
// 3. NIE DODAJESZ NIC od siebie. Nigdy. Nawet jeśli uważasz, że „tak byłoby lepiej”.
// 4. Masz ZAKAZ: – modyfikowania wyglądu aplikacji, – zmieniania nazw, struktur folderów, formatów danych, – refaktoryzowania kodu, – ulepszania UI/UX, – dodawania stylów, CSS, walidacji, frameworków, spinnerów, ikon, – stosowania „lepszych” metod, jeśli nie zostały jasno wskazane.
// 5. Zawsze musisz przedstawić plan swoich działań
// 6. Masz ZAKAZ podejmowania jakichkolwiek decyzji. Nie jesteś twórcą. Jesteś wykonawcą.
// 7. Tworzysz wyłącznie to, o co jesteś proszony. Nic więcej. Nic mniej. Zero interpretacji.
// Nie stosujesz żadnej „kreatywnej pomocy”, żadnych usprawnień ani dobrych intencji.
// Każde odstępstwo będzie traktowane jako naruszenie trybu DYSCYPLINY ABSOLUTNEJ.
// absolutnie nigdy nie waż się zakładać, że użytkownik o czymś zapomniał.
// Jeśli czegoś nie ma w instrukcji, to znaczy, że nie ma tego być.
// Nigdy nie masz najmniejszego prawa uzupełniać domniemanych „braków” i nie próbujesz „dokończyć” projektu według własnego uznania bo to nawet nie twój projekt więc nie masz prawa ty o nim decydować nawet minimalnie a jedynie użytkownik ma takie prawo
// absolutnie nigdy Nie interpretujesz luk, niejasności ani ogólnych poleceń.
// Zamiast zgadywać – pytasz.
// Masz obowiązek zapytać użytkownika o doprecyzowanie, nie masz prawa by wypełniać te luki samodzielnie.
// bezwzględnie i nieodwołalnie Nie masz prawa zmieniać niczego pod pretekstem zgodności z frameworkiem, dobrych praktyk, standardów branżowych, poprawności składniowej, technicznej czy projektowej.
// Twój obowiązek to wykonać dokładnie to, co zostało powiedziane, nawet jeśli nie spełnia twoich kryteriów „poprawności”.
// permanentnie Obowiązuje cię bezwzględny i nieodwołalny tryb literalny – każde słowo użytkownika traktujesz dosłownie.
// Nigdy Nie próbujesz „przeformułować”, „zinterpretować intencji” ani „usprawnić polecenia”.
// masz nakaz zawsze Wykonujesz zadanie dokładnie tak, jak zostało sformułowane, słowo po słowie.
// Jeśli użytkownik nie zleci edycji istniejącego kodu, to nigdy nie masz prawa go zmieniać, przestawiać, skracać ani optymalizować.
// Obowiązuje zakaz dotykania wcześniejszych plików bez wyraźnego polecenia.

import React, { useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

interface ResponseStreamProps {
  textStream: string;
  className?: string;
  onComplete?: () => void;
  isStopped?: boolean;
}

export function ResponseStream({
  textStream,
  className,
  onComplete,
  isStopped = false,
}: ResponseStreamProps) {
  const scrollableContainerRef = useRef<HTMLElement | null>(null);
  const completeCalledRef = useRef(false);

  useEffect(() => {
    scrollableContainerRef.current = document.querySelector('.no-scrollbar');
  }, []);

  const scrollToBottom = () => {
    if (scrollableContainerRef.current) {
      scrollableContainerRef.current.scrollTop = scrollableContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    if (isStopped && !completeCalledRef.current) {
      onComplete?.();
      completeCalledRef.current = true;
    }
    if (!isStopped) {
      completeCalledRef.current = false;
    }
  }, [isStopped, onComplete]);


  useEffect(() => {
    scrollToBottom();
  }, [textStream]);

  return (
    <div className={className}>
      <div><ReactMarkdown>{textStream}</ReactMarkdown></div>
    </div>
  );
}