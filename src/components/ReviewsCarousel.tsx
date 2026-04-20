import { useState } from "react";
import Icon from "@/components/ui/icon";

const REVIEWS = [
  { img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/8b0ea606-f048-49bc-a174-a498e06f482a.jpeg" },
  { img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/a702e424-072d-4781-99bd-71ede7767758.jpeg" },
  { img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/744a6a4a-a7c8-48f9-a2da-625912adb0fd.jpeg" },
  { img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/d347ae7d-2193-4a97-85f1-24060953e366.jpeg" },
  { img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/289017b7-5d3a-4e0c-8809-516c44732024.jpeg" },
];

export default function ReviewsCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? REVIEWS.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === REVIEWS.length - 1 ? 0 : c + 1));

  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {REVIEWS.map((r, i) => (
            <div key={i} className="min-w-full">
              <img
                src={r.img}
                alt={`Отзыв ${i + 1}`}
                className="w-full rounded-2xl object-contain"
                style={{ background: "#0a0814" }}
              />
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-strong flex items-center justify-center border border-white/15 hover:border-white/40 transition-all"
      >
        <Icon name="ChevronLeft" size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full glass-strong flex items-center justify-center border border-white/15 hover:border-white/40 transition-all"
      >
        <Icon name="ChevronRight" size={20} />
      </button>

      <div className="flex justify-center gap-2 mt-6">
        {REVIEWS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="w-2 h-2 rounded-full transition-all duration-300"
            style={{ background: i === current ? "var(--neon-pink)" : "rgba(255,255,255,0.2)" }}
          />
        ))}
      </div>
    </div>
  );
}
