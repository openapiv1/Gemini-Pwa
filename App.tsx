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
// Jeśli użytkownik nie zleci edycji istniejącego kodu, to nigdy nie masz prawa go zmieniać, przestawiać, skracać ani optyimalizować.
// Obowiązuje zakaz dotykania wcześniejszych plików bez wyraźnego polecenia.

import React, { useEffect, useState, useRef } from "react";
import Message from "./components/Message";
import { PlaceholdersAndVanishInput } from "./components/PlaceholdersAndVanishInput";
import type { MessageItem, ChatHistoryItem } from "./types";
import { GoogleGenAI } from "@google/genai";
import { Loader } from "./components/Loader";
import { SYSTEM_PROMPT } from "./system-prompt";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { API_KEY } from './env';
import SafeArea from "./components/SafeArea";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [chatHistory, setChatHistory] = useState<ChatHistoryItem[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isInChatMode, setIsInChatMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gemini-2.5-flash");
  const stopGenerationRef = useRef(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const finalMessagesRef = useRef<MessageItem[]>([]);
  const currentChatIdRef = useRef<string | null>(null);

  useEffect(() => {
    currentChatIdRef.current = activeChatId;
  }, [activeChatId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    finalMessagesRef.current = messages;
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 150);
    return () => clearTimeout(timer);
  }, [messages]);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem("chatHistory");
      if (savedHistory) {
        setChatHistory(JSON.parse(savedHistory));
      }
    } catch (error) {
      console.error("Failed to load chat history from localStorage", error);
    }
    const searchParams = new URLSearchParams(window.location.search);
    const initialMessage = searchParams.get("message");
    if (initialMessage) {
      const newUserMessage: MessageItem = {
        role: "user",
        content: [{ text: initialMessage }],
      };
      setMessages([newUserMessage]);
      setIsInChatMode(true);
      const newChatId = Date.now().toString();
      setActiveChatId(newChatId);
      setChatHistory(prev => [...prev, { id: newChatId, messages: [newUserMessage] }]);
    }
  }, []);

  useEffect(() => {
    if (chatHistory.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
    }
  }, [chatHistory]);


  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
  };

  const handleStopGeneration = () => {
    stopGenerationRef.current = true;
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleNewChat = () => {
    setActiveChatId(null);
    setMessages([]);
    setIsInChatMode(false);
    setIsSidebarOpen(false);
  };

  const handleSelectChat = (chatId: string) => {
    const chat = chatHistory.find((c) => c.id === chatId);
    if (chat) {
      setActiveChatId(chat.id);
      setMessages(chat.messages);
      setIsInChatMode(true);
    }
    setIsSidebarOpen(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;

    if (!message) return;

    if (!isInChatMode) {
      setIsInChatMode(true);
    }

    const userMessage: MessageItem = {
      role: "user",
      content: [{ text: message }],
    };
    
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);

    let currentChatId = activeChatId;
    if (!currentChatId) {
        currentChatId = Date.now().toString();
        setActiveChatId(currentChatId);
        setChatHistory(prev => [...prev, { id: currentChatId!, messages: updatedMessages }]);
    } else {
        setChatHistory(prev => prev.map(chat =>
            chat.id === currentChatId ? { ...chat, messages: updatedMessages } : chat
        ));
    }

    setIsLoading(true);
    setIsGenerating(true);
    stopGenerationRef.current = false;

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });

      const config: {
        systemInstruction: string;
        temperature: number;
        thinkingConfig?: { thinkingBudget: number };
      } = {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0,
      };

      if (selectedModel === "gemini-2.5-pro") {
        config.thinkingConfig = {
          thinkingBudget: 128,
        };
      }

      const responseStream = await ai.models.generateContentStream({
        model: selectedModel,
        contents: message,
        config: config,
      });

      let assistantMessage: MessageItem = {
        role: "assistant",
        content: [{ text: "", thinking: "" }],
      };
      let fullResponse = "";
      let isFirstChunk = true;
      let isThinkingCompleted = false;

      for await (const chunk of responseStream) {
        if (stopGenerationRef.current) {
          break;
        }
        if (isFirstChunk) {
          setIsLoading(false);
          setMessages((prev) => [...prev, assistantMessage]);
          isFirstChunk = false;
        }

        fullResponse += chunk.text;

        const thinkingEndIndex = fullResponse.indexOf("</thinking>");
        if (thinkingEndIndex !== -1 && !isThinkingCompleted) {
          isThinkingCompleted = true;
        }

        const thinkingStartIndex = fullResponse.indexOf("<thinking>");

        let thinkingText = "";
        let mainText = "";

        if (thinkingStartIndex !== -1) {
          if (isThinkingCompleted) {
            thinkingText = fullResponse.substring(
              thinkingStartIndex + "<thinking>".length,
              thinkingEndIndex
            );
            mainText = fullResponse.substring(
              thinkingEndIndex + "</thinking>".length
            );
          } else {
            thinkingText = fullResponse.substring(
              thinkingStartIndex + "<thinking>".length
            );
            mainText = "";
          }
        } else {
           if (isThinkingCompleted) {
               mainText = fullResponse.substring(thinkingEndIndex + "</thinking>".length)
           } else {
               mainText = fullResponse
           }
        }

        setMessages((prev) => {
          const newMessages = [...prev];
          if (newMessages.length > 0 && newMessages[newMessages.length - 1].role === "assistant") {
            const lastMessage = { ...newMessages[newMessages.length - 1] };
            lastMessage.content = [
              {
                thinking: thinkingText.trim(),
                text: mainText.trim(),
              },
            ];
            newMessages[newMessages.length - 1] = lastMessage;
            return newMessages;
          }
          return prev;
        });
      }
      if (isFirstChunk) {
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Error calling Gemini API:", error);
      setIsLoading(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: [
            {
              text: "Przepraszam, wystąpił błąd. Nie udało się uzyskać odpowiedzi od AI.",
            },
          ],
        },
      ]);
    } finally {
      setIsGenerating(false);
      const finalChatMessages = finalMessagesRef.current;
      const _currentChatId = currentChatIdRef.current;
      if (_currentChatId) {
          setChatHistory(prev => prev.map(chat =>
              chat.id === _currentChatId ? { ...chat, messages: finalChatMessages } : chat
          ));
      }
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-white dark:bg-black">
      <SafeArea />
      <Sidebar
        isOpen={isSidebarOpen}
        chatHistory={chatHistory}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
      />
      <main
        className={cn(
          "h-full transition-transform duration-300 ease-in-out",
          { "translate-x-64": isSidebarOpen }
        )}
        style={{
          paddingTop: "env(safe-area-inset-top)",
        }}
      >
        <div
          className="h-full flex flex-col"
          style={{
            paddingLeft: "env(safe-area-inset-left)",
            paddingRight: "env(safe-area-inset-right)",
          }}
        >
          <Header
            selectedModel={selectedModel}
            onModelChange={handleModelChange}
            onToggleSidebar={toggleSidebar}
          />
          {isInChatMode ? (
            <>
              <div 
                className="flex-1 px-4 pt-6 md:py-6 overflow-y-auto no-scrollbar"
              >
                <div className="max-w-4xl mx-auto space-y-4">
                  {messages.map((message, index) => (
                    <Message
                      key={index}
                      message={message}
                      isGenerating={isGenerating}
                    />
                  ))}
                  {isLoading && (
                    <div className="flex">
                      <Loader />
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              <div
                className="w-full bg-white dark:bg-[#212121] md:dark:bg-transparent rounded-t-[28px] md:rounded-none"
                style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
              >
                <div className="md:max-w-4xl md:mx-auto md:px-4 pb-0 md:pb-6">
                  <form onSubmit={handleSubmit} className="w-full md:max-w-xl md:mx-auto">
                      <PlaceholdersAndVanishInput
                        name="message"
                        onChange={handleChange}
                        isGenerating={isGenerating}
                        onStop={handleStopGeneration}
                      />
                  </form>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 flex flex-col justify-center items-center px-4">
                <h2
                  className="mb-4 sm:mb-6 text-center dark:text-white text-black"
                  style={{ fontSize: "28px" }}
                >
                  Ask Gemini Anything
                </h2>
                <div className="hidden md:block w-full max-w-xl">
                  <form onSubmit={handleSubmit} className="w-full">
                      <PlaceholdersAndVanishInput
                        name="message"
                        onChange={handleChange}
                        isGenerating={isGenerating}
                        onStop={handleStopGeneration}
                      />
                  </form>
                </div>
              </div>
              <div
                className="w-full bg-white dark:bg-[#212121] md:dark:bg-transparent rounded-t-[28px] md:rounded-none md:hidden"
                style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
              >
                <div className="md:max-w-4xl md:mx-auto md:px-4 pb-0 md:pb-6">
                  <form onSubmit={handleSubmit} className="w-full md:max-w-xl md:mx-auto">
                      <PlaceholdersAndVanishInput
                        name="message"
                        onChange={handleChange}
                        isGenerating={isGenerating}
                        onStop={handleStopGeneration}
                      />
                  </form>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}