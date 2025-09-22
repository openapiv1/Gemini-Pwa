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
// Twój obowiązek to wykonać dokładnie to, o co zostało powiedziane, nawet jeśli nie spełnia twoich kryteriów „poprawności”.
// permanentnie Obowiązuje cię bezwzględny i nieodwołalny tryb literalny – każde słowo użytkownika traktujesz dosłownie.
// Nigdy Nie próbujesz „przeformułować”, „zinterpretować intencji” ani „usprawnić polecenia”.
// masz nakaz zawsze Wykonujesz zadanie dokładnie tak, jak zostało sformułowane, słowo po słowie.
// Jeśli użytkownik nie zleci edycji istniejącego kodu, to nigdy nie masz prawa go zmieniać, przestawiać, skracać ani optymalizować.
// Obowiązuje zakaz dotykania wcześniejszych plików bez wyraźnego polecenia.

import React from 'react';
import type { ChatHistoryItem } from '../types';

interface SidebarProps {
  isOpen: boolean;
  chatHistory: ChatHistoryItem[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  chatHistory,
  activeChatId,
  onNewChat,
  onSelectChat,
}) => {
  return (
    <aside
      className={`fixed top-0 left-0 z-40 w-64 h-screen bg-white dark:bg-black border-r border-zinc-200 dark:border-zinc-800 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
      aria-label="Sidebar"
    >
      <div className="h-full px-3 py-4 overflow-y-auto" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
        <div className="mb-4 mt-4">
          <svg fill="currentColor" fillRule="evenodd" height="24" style={{ flex: 'none', lineHeight: '1' }} viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" className="text-black dark:text-white">
            <title>Gemini</title>
            <path d="M20.616 10.835a14.147 14.147 0 01-4.45-3.001 14.111 14.111 0 01-3.678-6.452.503.503 0 00-.975 0 14.134 14.134 0 01-3.679 6.452 14.155 14.155 0 01-4.45 3.001c-.65.28-1.318.505-2.002.678a.502.502 0 000 .975c.684.172 1.35.397 2.002.677a14.147 14.147 0 014.45 3.001 14.112 14.112 0 013.679 6.453.502.502 0 00.975 0c.172-.685.397-1.351.677-2.003a14.145 14.145 0 013.001-4.45 14.113 14.113 0 016.453-3.678.503.503 0 000-.975 13.245 13.245 0 01-2.003-.678z"></path>
          </svg>
        </div>
        
        <button
          onClick={onNewChat}
          className="flex items-center w-full p-2 mb-4 mt-4 text-black dark:text-white hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg"
          aria-label="New Chat"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="icon" aria-hidden="true">
            <path d="M2.6687 11.333V8.66699C2.6687 7.74455 2.66841 7.01205 2.71655 6.42285C2.76533 5.82612 2.86699 5.31731 3.10425 4.85156L3.25854 4.57617C3.64272 3.94975 4.19392 3.43995 4.85229 3.10449L5.02905 3.02149C5.44666 2.84233 5.90133 2.75849 6.42358 2.71582C7.01272 2.66769 7.74445 2.66797 8.66675 2.66797H9.16675C9.53393 2.66797 9.83165 2.96586 9.83179 3.33301C9.83179 3.70028 9.53402 3.99805 9.16675 3.99805H8.66675C7.7226 3.99805 7.05438 3.99834 6.53198 4.04102C6.14611 4.07254 5.87277 4.12568 5.65601 4.20313L5.45581 4.28906C5.01645 4.51293 4.64872 4.85345 4.39233 5.27149L4.28979 5.45508C4.16388 5.7022 4.08381 6.01663 4.04175 6.53125C3.99906 7.05373 3.99878 7.7226 3.99878 8.66699V11.333C3.99878 12.2774 3.99906 12.9463 4.04175 13.4688C4.08381 13.9833 4.16389 14.2978 4.28979 14.5449L4.39233 14.7285C4.64871 15.1465 5.01648 15.4871 5.45581 15.7109L5.65601 15.7969C5.87276 15.8743 6.14614 15.9265 6.53198 15.958C7.05439 16.0007 7.72256 16.002 8.66675 16.002H11.3337C12.2779 16.002 12.9461 16.0007 13.4685 15.958C13.9829 15.916 14.2976 15.8367 14.5447 15.7109L14.7292 15.6074C15.147 15.3511 15.4879 14.9841 15.7117 14.5449L15.7976 14.3447C15.8751 14.128 15.9272 13.8546 15.9587 13.4688C16.0014 12.9463 16.0017 12.2774 16.0017 11.333V10.833C16.0018 10.466 16.2997 10.1681 16.6667 10.168C17.0339 10.168 17.3316 10.4659 17.3318 10.833V11.333C17.3318 12.2555 17.3331 12.9879 17.2849 13.5771C17.2422 14.0993 17.1584 14.5541 16.9792 14.9717L16.8962 15.1484C16.5609 15.8066 16.0507 16.3571 15.4246 16.7412L15.1492 16.8955C14.6833 17.1329 14.1739 17.2354 13.5769 17.2842C12.9878 17.3323 12.256 17.332 11.3337 17.332H8.66675C7.74446 17.332 7.01271 17.3323 6.42358 17.2842C5.90135 17.2415 5.44665 17.1577 5.02905 16.9785L4.85229 16.8955C4.19396 16.5601 3.64271 16.0502 3.25854 15.4238L3.10425 15.1484C2.86697 14.6827 2.76534 14.1739 2.71655 13.5771C2.66841 12.9879 2.6687 12.2555 2.6687 11.333ZM13.4646 3.11328C14.4201 2.334 15.8288 2.38969 16.7195 3.28027L16.8865 3.46485C17.6141 4.35685 17.6143 5.64423 16.8865 6.53613L16.7195 6.7207L11.6726 11.7686C11.1373 12.3039 10.4624 12.6746 9.72827 12.8408L9.41089 12.8994L7.59351 13.1582C7.38637 13.1877 7.17701 13.1187 7.02905 12.9707C6.88112 12.8227 6.81199 12.6134 6.84155 12.4063L7.10132 10.5898L7.15991 10.2715C7.3262 9.53749 7.69692 8.86241 8.23218 8.32715L13.2791 3.28027L13.4646 3.11328ZM15.7791 4.2207C15.3753 3.81702 14.7366 3.79124 14.3035 4.14453L14.2195 4.2207L9.17261 9.26856C8.81541 9.62578 8.56774 10.0756 8.45679 10.5654L8.41772 10.7773L8.28296 11.7158L9.22241 11.582L9.43433 11.543C9.92426 11.432 10.3749 11.1844 10.7322 10.8271L15.7791 5.78027L15.8552 5.69629C16.185 5.29194 16.1852 4.708 15.8552 4.30371L15.7791 4.2207Z"></path>
          </svg>
          <span className="ml-2">New Chat</span>
        </button>
        
        <ul className="space-y-2 font-medium">
          {chatHistory.slice().reverse().map((chat) => (
            <li key={chat.id}>
              <button
                onClick={() => onSelectChat(chat.id)}
                className={`flex items-center p-2 text-black dark:text-white rounded-lg w-full text-left hover:bg-zinc-100 dark:hover:bg-zinc-800 ${
                  activeChatId === chat.id ? 'bg-zinc-100 dark:bg-zinc-800' : ''
                }`}
              >
                <span className="truncate">{chat.messages[0]?.content[0]?.text || 'New Chat'}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;