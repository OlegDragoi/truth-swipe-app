import { useState, useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import NewsCard from "@/components/NewsCard";
import ExplanationModal from "@/components/ExplanationModal";
import VoteStats from "@/components/VoteStats";
import { dummyNews } from "@/data/dummyNews";

// Shuffle array using Fisher-Yates
const shuffleArray = <T,>(arr: T[]): T[] => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate fake vote stats for dummy data
const generateFakeStats = () => {
  const truePercent = Math.floor(Math.random() * 60) + 20; // 20-80
  return { truePercent, falsePercent: 100 - truePercent };
};

const Index = () => {
  const [loginAnim, setLoginAnim] = useState(false);
  const [deck, setDeck] = useState(() => shuffleArray(dummyNews));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [exitDirection, setExitDirection] = useState<"left" | "right" | null>(null);
  const [modal, setModal] = useState<{
    open: boolean;
    correct: boolean;
    explanation: string;
    storedAnswer: boolean;
  }>({ open: false, correct: false, explanation: "", storedAnswer: false });

  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [lastStats, setLastStats] = useState<{ truePercent: number; falsePercent: number } | null>(null);
  const [showStats, setShowStats] = useState(false);

  const currentArticle = deck[currentIndex % deck.length];

  const advanceCard = useCallback((correct: boolean) => {
    // Show fake stats for previous card
    setLastStats(generateFakeStats());
    setShowStats(true);

    if (correct) {
      setStreak((s) => {
        const next = s + 1;
        setBestStreak((b) => Math.max(b, next));
        return next;
      });
    } else {
      setStreak(0);
    }

    setCurrentIndex((prev) => {
      const next = prev + 1;
      // If we're about to run out, reshuffle more cards into the deck
      if (next >= deck.length - 1) {
        setDeck((d) => [...d, ...shuffleArray(dummyNews)]);
      }
      return next;
    });

    // Hide stats after a delay
    setTimeout(() => setShowStats(false), 2000);
  }, [deck.length]);

  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      const article = deck[currentIndex % deck.length];
      if (!article) return;

      const userAnswer = direction === "right";
      const isCorrect = userAnswer === article.truthfulness;

      setExitDirection(direction);

      if (!isCorrect) {
        setModal({
          open: true,
          correct: false,
          explanation: article.explanation,
          storedAnswer: article.truthfulness,
        });
      } else {
        advanceCard(true);
        setTimeout(() => setExitDirection(null), 350);
      }
    },
    [currentIndex, deck, advanceCard]
  );

  const closeModal = () => {
    setModal((prev) => ({ ...prev, open: false }));
    // Swipe card toward the CORRECT direction
    const article = deck[currentIndex % deck.length];
    const correctDir = article?.truthfulness ? "right" : "left";
    setExitDirection(correctDir);
    setTimeout(() => {
      advanceCard(false);
      setExitDirection(null);
    }, 350);
  };

  // Get visible cards (current + next)
  const visibleCards = useMemo(() => {
    const idx = currentIndex % deck.length;
    return deck.slice(idx, idx + 2);
  }, [currentIndex, deck]);

  return (
    <div className="flex min-h-screen flex-col items-center bg-background">
      {/* Header */}
      <header className="w-full max-w-md px-6 pt-8 pb-4 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">
          <span className="text-false-color">Fake</span>
          <span className="text-truth">Matcher</span>
        </h1>

        {/* Streak & Best */}
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-lg font-display font-bold">
            <span className={streak === 0 ? "grayscale" : ""} style={{ fontSize: "1.25rem" }}>🔥</span>
            <span className="text-foreground">{streak}</span>
          </span>
          <span className="flex items-center gap-1 text-lg font-display font-bold">
            <span style={{ fontSize: "1.25rem" }}>👑</span>
            <span className="text-muted-foreground">{bestStreak}</span>
          </span>
        </div>

        <button
          className={`ml-2 flex items-center justify-center rounded-full p-2 transition-all outline-none ring-0 focus:outline-none focus:ring-0 active:outline-none active:ring-0${loginAnim ? ' shake-blink' : ''}`}
          type="button"
          onClick={() => {
            setLoginAnim(false);
            setTimeout(() => setLoginAnim(true), 10);
            setTimeout(() => setLoginAnim(false), 1010);
          }}
        >
          <img src="src/assets/login.png" alt="Login" className="w-10 h-10" />
        </button>
      </header>

      {/* Card area */}
      <div className="relative flex-1 w-full max-w-md px-6 flex items-center justify-center">
        <div className="relative w-full" style={{ height: "70vh", maxHeight: 600 }}>
          <AnimatePresence>
            {visibleCards.map((article, i) => (
              <NewsCard
                key={`${article.id}-${currentIndex + i}`}
                article={article}
                onSwipe={handleSwipe}
                isTop={i === 0}
                exitDirection={i === 0 ? exitDirection : null}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Vote stats at bottom */}
      <VoteStats
        truePercent={lastStats?.truePercent ?? 50}
        falsePercent={lastStats?.falsePercent ?? 50}
        visible={showStats}
      />

      <ExplanationModal
        open={modal.open}
        correct={modal.correct}
        explanation={modal.explanation}
        storedAnswer={modal.storedAnswer}
        onClose={closeModal}
      />
    </div>
  );
};

export default Index;
