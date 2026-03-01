import { useState, useCallback } from "react";
import { AnimatePresence } from "framer-motion";
import { ThumbsDown, ThumbsUp } from "lucide-react";
import NewsCard from "@/components/NewsCard";
import ExplanationModal from "@/components/ExplanationModal";
import { dummyNews } from "@/data/dummyNews";

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modal, setModal] = useState<{
    open: boolean;
    correct: boolean;
    explanation: string;
    storedAnswer: boolean;
  }>({ open: false, correct: false, explanation: "", storedAnswer: false });

  const [stats, setStats] = useState({ correct: 0, total: 0 });

  const handleSwipe = useCallback(
    (direction: "left" | "right") => {
      const article = dummyNews[currentIndex];
      if (!article) return;

      const userAnswer = direction === "right"; // right = true, left = false
      const isCorrect = userAnswer === article.truthfulness;

      setStats((prev) => ({
        correct: prev.correct + (isCorrect ? 1 : 0),
        total: prev.total + 1,
      }));

      if (!isCorrect) {
        setModal({
          open: true,
          correct: false,
          explanation: article.explanation,
          storedAnswer: article.truthfulness,
        });
      } else {
        setCurrentIndex((prev) => prev + 1);
      }
    },
    [currentIndex]
  );

  const closeModal = () => {
    setModal((prev) => ({ ...prev, open: false }));
    setCurrentIndex((prev) => prev + 1);
  };

  const isFinished = currentIndex >= dummyNews.length;

  return (
    <div className="flex min-h-screen flex-col items-center bg-background">
      {/* Header */}
      <header className="w-full max-w-md px-6 pt-8 pb-4 flex items-center justify-between">
        <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">
          НовостиЧек
        </h1>
        {/*<div className="flex items-center gap-2 text-sm text-muted-foreground font-medium">
          <span className="text-truth">{stats.correct}</span>
          <span>/</span>
          <span>{stats.total}</span>
        </div>
        */}
      </header>

      {/* Card area */}
      <div className="relative flex-1 w-full max-w-md px-6 flex items-center justify-center">
        {isFinished ? (<div>{/*
          <div className="text-center space-y-4">
            <h2 className="font-display text-3xl font-bold text-foreground">
              Готово! 🎉
            </h2>
            <p className="text-muted-foreground">
              Вы ответили правильно на {stats.correct} из {stats.total} вопросов
            </p>
            <button
              onClick={() => {
                setCurrentIndex(0);
                setStats({ correct: 0, total: 0 });
              }}
              className="rounded-xl bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
            >
              Начать заново
            </button>
          </div>
          */}</div>
        ) : (
          <div className="relative w-full" style={{ height: "70vh", maxHeight: 600 }}>
            <AnimatePresence>
              {dummyNews.slice(currentIndex, currentIndex + 2).map((article, i) => (
                <NewsCard
                  key={article.id}
                  article={article}
                  onSwipe={handleSwipe}
                  isTop={i === 0}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Buttons */}
      {/*
      {!isFinished && (
        <div className="w-full max-w-md px-6 pb-8 pt-4 flex items-center justify-center gap-8">
          <button
            onClick={() => handleSwipe("left")}
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-false-color text-false-color hover:bg-false-color/10 transition-colors"
          >
            <ThumbsDown className="h-7 w-7" />
          </button>
          <span className="text-xs text-muted-foreground font-medium">
            {currentIndex + 1} / {dummyNews.length}
          </span>
          <button
            onClick={() => handleSwipe("right")}
            className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-truth text-truth hover:bg-truth/10 transition-colors"
          >
            <ThumbsUp className="h-7 w-7" />
          </button>
        </div>
      )}
      */}

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
