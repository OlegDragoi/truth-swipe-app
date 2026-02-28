import { motion, AnimatePresence } from "framer-motion";
import { XCircle, X } from "lucide-react";

interface ExplanationModalProps {
  open: boolean;
  correct: boolean;
  explanation: string;
  storedAnswer: boolean;
  onClose: () => void;
}

const ExplanationModal = ({ open, correct, explanation, storedAnswer, onClose }: ExplanationModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
          <motion.div
            className="relative z-10 w-full max-w-sm rounded-2xl bg-card border border-border p-6 shadow-2xl"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center gap-4">
              <XCircle className="h-16 w-16 text-false-color" />

              <h3 className="font-display text-xl font-bold text-foreground">
                Неверно!
              </h3>

              <p className="text-sm text-muted-foreground">
                Правильный ответ:{" "}
                <span className={storedAnswer ? "text-truth font-semibold" : "text-false-color font-semibold"}>
                  {storedAnswer ? "ПРАВДА" : "ЛОЖЬ"}
                </span>
              </p>

              <p className="text-sm text-secondary-foreground leading-relaxed">
                {explanation}
              </p>

              <button
                onClick={onClose}
                className="mt-2 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                Далее
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ExplanationModal;
