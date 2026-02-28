import news1 from "@/assets/news-1.jpg";
import news2 from "@/assets/news-2.jpg";
import news3 from "@/assets/news-3.jpg";
import news4 from "@/assets/news-4.jpg";
import news5 from "@/assets/news-5.jpg";

export interface NewsArticle {
  id: number;
  name: string;
  article_link: string;
  image_link: string;
  truthfulness: boolean;
  explanation: string;
}

export const dummyNews: NewsArticle[] = [
  {
    id: 1,
    name: "ИИ заменит 40% рабочих мест к 2030 году",
    article_link: "https://example.com/ai-jobs",
    image_link: news1,
    truthfulness: false,
    explanation: "Исследования показывают, что ИИ изменит, но не заменит большинство профессий. Реальная цифра — около 14%.",
  },
  {
    id: 2,
    name: "Биткоин достиг рекордной отметки в $150,000",
    article_link: "https://example.com/bitcoin-record",
    image_link: news2,
    truthfulness: false,
    explanation: "На момент публикации биткоин не достигал такой отметки. Максимум был значительно ниже.",
  },
  {
    id: 3,
    name: "Ледники Арктики тают в 3 раза быстрее, чем 20 лет назад",
    article_link: "https://example.com/arctic-ice",
    image_link: news3,
    truthfulness: true,
    explanation: "Подтверждено данными NASA и ESA. Скорость таяния действительно увеличилась втрое.",
  },
  {
    id: 4,
    name: "SpaceX успешно запустил миссию на Марс",
    article_link: "https://example.com/spacex-mars",
    image_link: news4,
    truthfulness: false,
    explanation: "SpaceX пока не осуществлял пилотируемых миссий на Марс. Это запланировано на будущее.",
  },
  {
    id: 5,
    name: "Электромобили составили 20% мировых продаж в 2025 году",
    article_link: "https://example.com/ev-sales",
    image_link: news5,
    truthfulness: true,
    explanation: "По данным IEA, доля электромобилей действительно приближается к 20% мирового рынка.",
  },
];
