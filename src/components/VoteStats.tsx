import { motion, AnimatePresence } from "framer-motion";

interface VoteStatsProps {
  truePercent: number;
  falsePercent: number;
  visible: boolean;
}

const VoteStats = ({ truePercent, falsePercent, visible }: VoteStatsProps) => {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="w-full max-w-md px-6 pb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="rounded-2xl bg-card border border-border/50 p-4">
            <p className="text-xs text-muted-foreground font-medium mb-3 text-center">
              Как ответили другие
            </p>
            <div className="flex items-center gap-3">
              {/* TRUE side */}
              <span className="text-sm font-semibold text-truth w-12 text-right">
                {truePercent}%
              </span>
              <div className="flex-1 h-3 rounded-full bg-secondary overflow-hidden flex">
                <motion.div
                  className="h-full rounded-l-full"
                  style={{ backgroundColor: "hsl(var(--truth))" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${truePercent}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
                <motion.div
                  className="h-full rounded-r-full"
                  style={{ backgroundColor: "hsl(var(--false))" }}
                  initial={{ width: 0 }}
                  animate={{ width: `${falsePercent}%` }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                />
              </div>
              <span className="text-sm font-semibold text-false-color w-12">
                {falsePercent}%
              </span>
            </div>
            <div className="flex justify-between mt-2 px-12">
              <span className="text-xs text-muted-foreground">Правда</span>
              <span className="text-xs text-muted-foreground">Ложь</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VoteStats;
