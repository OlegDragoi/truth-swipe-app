import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { NewsArticle } from "@/data/dummyNews";

interface NewsCardProps {
  article: NewsArticle;
  onSwipe: (direction: "left" | "right") => void;
  isTop: boolean;
  exitDirection?: "left" | "right" | null;
}

const SWIPE_THRESHOLD = 120;

const NewsCard = ({ article, onSwipe, isTop, exitDirection }: NewsCardProps) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-300, 0, 300], [-18, 0, 18]);
  const trueOpacity = useTransform(x, [0, 100], [0, 1]);
  const falseOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x > SWIPE_THRESHOLD) {
      onSwipe("right");
    } else if (info.offset.x < -SWIPE_THRESHOLD) {
      onSwipe("left");
    }
  };

  const exitX = exitDirection === "right" ? 400 : exitDirection === "left" ? -400 : (x.get() > 0 ? 400 : -400);

  return (
    <motion.div
      className="absolute w-full cursor-grab active:cursor-grabbing"
      style={{ x, rotate, zIndex: isTop ? 10 : 1 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={handleDragEnd}
      animate={isTop ? {} : { scale: 0.95, y: 16 }}
      exit={{ 
        x: exitX, 
        opacity: 0, 
        transition: { duration: 0.3 } 
      }}
      whileDrag={{ scale: 1.02 }}
    >
      <div className="relative overflow-hidden rounded-2xl bg-card shadow-2xl shadow-black/40 border border-border/50">
        {/* Article link at top */}
        <a
          href={article.article_link}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-4 left-4 right-4 z-20 flex items-center gap-2 rounded-xl bg-background/70 backdrop-blur-md px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          <span className="truncate">{article.article_link}</span>
        </a>

        {/* Image */}
        <div className="aspect-[4/5] w-full">
          <img
            src={article.image_link}
            alt={article.name}
            className="h-full w-full object-cover"
            draggable={false}
          />
        </div>

        {/* Gradient overlay for text */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

        {/* Name at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
          <h2 className="font-display text-2xl font-bold leading-tight text-foreground drop-shadow-lg">
            {article.name}
          </h2>
        </div>

        {/* Swipe overlays */}
        {isTop && (
          <>
            <motion.div
              className="absolute inset-0 rounded-2xl border-4 border-truth flex items-center justify-center pointer-events-none"
              style={{ opacity: trueOpacity }}
            >
              <div className="swipe-overlay-true absolute inset-0 rounded-2xl" />
              <span className="text-truth text-5xl font-display font-bold -rotate-12 border-4 border-truth rounded-xl px-6 py-2 shadow-lg">
                ПРАВДА
              </span>
            </motion.div>
            <motion.div
              className="absolute inset-0 rounded-2xl border-4 border-false-color flex items-center justify-center pointer-events-none"
              style={{ opacity: falseOpacity }}
            >
              <div className="swipe-overlay-false absolute inset-0 rounded-2xl" />
              <span className="text-false-color text-5xl font-display font-bold rotate-12 border-4 border-false-color rounded-xl px-6 py-2 shadow-lg">
                ЛОЖЬ
              </span>
            </motion.div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default NewsCard;
