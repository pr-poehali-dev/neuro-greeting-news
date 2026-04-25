import { useState } from "react";
import Icon from "@/components/ui/icon";
import ReviewsCarousel from "@/components/ReviewsCarousel";

const HERO_IMG = "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/files/901f5ba0-0952-42d0-825b-fe2f833573a5.jpg";
const AI_IMG = "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/files/3d327c1e-35a8-4b89-a0a5-d4aaa625236e.jpg";
const GALLERY_IMG = "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/files/1897f48b-0f0b-49aa-98e0-f37f7f4137f4.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "gallery", label: "Галерея" },
  { id: "stars", label: "Звёзды" },
  { id: "how", label: "Как это работает" },
  { id: "reviews", label: "Отзывы" },
  { id: "contact", label: "Контакты" },
];

const STARS: { name: string; category: string; emoji: string; tag: string; videoUrl?: string; img?: string }[] = [
  { name: "Владимир Путин", category: "Политик", emoji: "🇷🇺", tag: "ТОП", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-238057825&id=456239040&hd=2&autoplay=0&js_api=1&no_allow_player_extensions=1", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/11f520a3-1f8f-4108-acc6-b377af38ecc4.png" },
  { name: "Дмитрий Нагиев", category: "Актёр, телеведущий", emoji: "🎭", tag: "ХИТ", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-238057825&id=456239034&hd=2&autoplay=0&js_api=1&no_allow_player_extensions=1", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/ab249207-2714-4aa0-88e5-608c0147ab7f.jpg" },
  { name: "Николай Басков", category: "Певец", emoji: "🎤", tag: "", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-238057825&id=456239024&hd=2&autoplay=0&js_api=1&no_allow_player_extensions=1", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/d29e5381-6863-4124-9378-d8bf5743e589.png" },
  { name: "Филипп Киркоров", category: "Певец", emoji: "👑", tag: "ТОП", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-238057825&id=456239022&hd=2&autoplay=0&js_api=1&no_allow_player_extensions=1", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/92e0afff-e88e-46a1-9175-1d7241840fad.png" },
  { name: "Стас Михайлов", category: "Певец", emoji: "🎵", tag: "", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-238057825&id=456239039&hd=2&autoplay=0&js_api=1&no_allow_player_extensions=1", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/051c2a7c-07e7-4567-a82a-d23184c0fdea.jpg" },
  { name: "Баста", category: "Рэпер", emoji: "🎧", tag: "", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-238057825&id=456239026&hd=2&autoplay=0&js_api=1&no_allow_player_extensions=1", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/ebc77a64-e9d0-49a2-bd25-cdcefea8ce90.png" },
  { name: "Сергей Бурунов", category: "Актёр", emoji: "🎬", tag: "NEW", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-238057825&id=456239027&hd=2&autoplay=0&js_api=1&no_allow_player_extensions=1", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/b8d92881-33e9-42cd-b3ad-14735f264474.jpg" },
  { name: "Сергей Жуков", category: "Певец, «Руки Вверх»", emoji: "🎸", tag: "", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-238057825&id=456239023&hd=2&autoplay=0&js_api=1&no_allow_player_extensions=1", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/5b6ba9c8-2425-4314-abd9-182422e2c7be.png" },
  { name: "Олег Газманов", category: "Певец", emoji: "🌟", tag: "", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-238057825&id=456239025&hd=2&autoplay=0&js_api=1&no_allow_player_extensions=1", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/62b4a2c8-def5-446a-bbcd-92b6156e74c4.png" },
  { name: "Сергей Лазарев", category: "Певец", emoji: "✨", tag: "", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-238057825&id=456239035&hd=2&autoplay=0&js_api=1&no_allow_player_extensions=1", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/a393b08a-98b3-4e9a-a626-72e49fe5e704.jpg" },
  { name: "Григорий Лепс", category: "Певец", emoji: "🥂", tag: "", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-238057825&id=456239029&hd=2&autoplay=0&js_api=1&no_allow_player_extensions=1", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/48c1a72c-4fb6-4c12-ac47-2fa05ccca9e9.jpg" },
  { name: "Прохор Шаляпин", category: "Певец", emoji: "🎶", tag: "", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-238057825&id=456239028&hd=2&autoplay=0&js_api=1&no_allow_player_extensions=1", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/ab94e194-5506-414b-9104-a20bf428c114.jpg" },
  { name: "Гарик Харламов", category: "Комик, актёр", emoji: "😄", tag: "ХИТ", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-238057825&id=456239033&hd=2&autoplay=0&js_api=1&no_allow_player_extensions=1", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/bc2dd402-419b-4bd9-8f42-7d7f4de8d7cd.jpg" },
  { name: "SHAMAN", category: "Певец", emoji: "🔥", tag: "NEW", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-238057825&id=456239036&hd=2&autoplay=0&js_api=1&no_allow_player_extensions=1", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/f26eb3fd-1310-4a46-b55a-ac7bbf7fa223.jpg" },
  { name: "Надежда Кадышева", category: "Певица, «Золотое кольцо»", emoji: "🌺", tag: "", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-238057825&id=456239032&hd=2&autoplay=0&js_api=1&no_allow_player_extensions=1", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/809d953b-4b0a-4808-9d76-c09b89fa6d66.jpg" },
  { name: "ANNA ASTI", category: "Певица", emoji: "💫", tag: "NEW", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-238057825&id=456239037&hd=2&autoplay=0&js_api=1&no_allow_player_extensions=1", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/70fdc3ca-f206-4016-8b7e-680e799648e3.jpg" },
  { name: "Ольга Бузова", category: "Певица, телеведущая", emoji: "🌸", tag: "", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-238057825&id=456239038&hd=2&autoplay=0&js_api=1&no_allow_player_extensions=1", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/b7e7012f-beb6-4689-a1b1-1ecd404afba5.jpg" },
];

const GALLERY_ITEMS: { title: string; star: string; views: string; emoji: string; img?: string; price: string; videoUrl?: string }[] = [
  { title: "Поздравление от Первого канала", star: "Первый канал", views: "12 тыс.", emoji: "🎂", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/df67c171-7f7f-4ae4-a385-6a9da9285217.jpg", price: "3 000 ₽", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-238057825&id=456239017&hd=2&autoplay=0&js_api=1&no_allow_player_extensions=1" },
  { title: "Поздравление от канала «Россия 1»", star: "Россия 1", views: "8 тыс.", emoji: "🎉", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/547b92a4-0d8b-4c83-851a-cc66d5d72037.jpg", price: "3 000 ₽", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-238057825&id=456239019&hd=2&autoplay=0&js_api=1&no_allow_player_extensions=1" },
  { title: "Ведущая + Путин", star: "Персональное поздравление", views: "21 тыс.", emoji: "💍", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/53d33841-87d9-4cd1-ae5b-be9cb99a1000.jpg", price: "2 000 ₽", videoUrl: "https://vkvideo.ru/video_ext.php?oid=-238057825&id=456239018&hd=2&autoplay=0&js_api=1&no_allow_player_extensions=1" },
  { title: "Юбилей 50 лет", star: "Нагиев", views: "6 тыс.", emoji: "🥂", price: "1 500 ₽" },
  { title: "Новый год!", star: "Тимати", views: "45 тыс.", emoji: "🎆", price: "1 500 ₽" },
  { title: "Выпускной", star: "Ксения Собчак", views: "9 тыс.", emoji: "🎓", price: "1 500 ₽" },
];

const WHY_ITEMS = [
  {
    icon: "Heart",
    title: "Незабываемый момент",
    text: "Близкий человек получит поздравление от своей любимой звезды — такого точно никто не ожидает",
  },
  {
    icon: "Clock",
    title: "Быстро и просто",
    text: "Напишите нам, укажите детали — готовое видео будет у вас в течение суток",
  },
  {
    icon: "Sparkles",
    title: "Персонально для вас",
    text: "Каждое поздравление создаётся индивидуально: имя, повод, особые пожелания",
  },
  {
    icon: "Gift",
    title: "Идеальный подарок",
    text: "Подойдёт на любой повод: день рождения, юбилей, свадьба, корпоратив и не только",
  },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedStar] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", contact: "", star: "", recipient: "", occasion: "", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [starIndex, setStarIndex] = useState(0);
  const STARS_PER_PAGE = 4;
  const starsTotal = STARS.length;
  const prevStar = () => setStarIndex(i => (i - 1 + starsTotal) % starsTotal);
  const nextStar = () => setStarIndex(i => (i + 1) % starsTotal);
  const getVisibleStars = () => Array.from({ length: STARS_PER_PAGE }, (_, k) => STARS[(starIndex + k) % starsTotal]);

  const submitForm = async () => {
    if (!formData.name.trim() || !formData.contact.trim()) return;
    setFormStatus("loading");
    try {
      const res = await fetch("https://functions.poehali.dev/70ea0556-3d49-4bee-bfa5-486cc16cbf40", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setFormStatus("ok");
        setFormData({ name: "", contact: "", star: "", recipient: "", occasion: "", message: "" });
      } else {
        setFormStatus("error");
      }
    } catch {
      setFormStatus("error");
    }
  };

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* VIDEO MODAL */}
      {activeVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.85)" }} onClick={() => setActiveVideo(null)}>
          <div className="relative w-full max-w-3xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setActiveVideo(null)} className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors">
              <Icon name="X" size={28} />
            </button>
            <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <iframe src={activeVideo} width="100%" height="100%" frameBorder="0" allow="autoplay; encrypted-media; fullscreen; picture-in-picture" allowFullScreen className="w-full h-full" />
            </div>
          </div>
        </div>
      )}
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollTo("home")}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--neon-pink), var(--neon-purple))" }}>
              <span className="text-sm">⭐</span>
            </div>
            <span className="font-oswald text-lg font-bold tracking-wide text-white">Анастасия Б <span className="neon-text-pink">| Поздравления</span></span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className={`px-4 py-2 rounded-lg font-golos text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? "text-white bg-white/10"
                    : "text-white/60 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => scrollTo("contact")} className="btn-neon px-5 py-2 rounded-lg text-sm">
              <span>Заказать</span>
            </button>
            <button className="md:hidden text-white/70" onClick={() => setMobileOpen(!mobileOpen)}>
              <Icon name={mobileOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="md:hidden glass border-t border-white/10 px-6 py-4 flex flex-col gap-2">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="text-left px-4 py-3 rounded-lg text-white/80 hover:text-white hover:bg-white/08 font-golos transition-all"
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center pt-16 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20 animate-float"
            style={{ background: "radial-gradient(circle, var(--neon-purple), transparent 70%)" }} />
          <div className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-15 animate-float" style={{ animationDelay: "2s", background: "radial-gradient(circle, var(--neon-pink), transparent 70%)" }} />
        </div>

        <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center w-full">
          <div className="space-y-8">
            <div className="section-enter delay-100">
              <span className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm font-golos mb-6" style={{ color: "var(--neon-cyan)" }}>
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--neon-cyan)" }} />
                Подарок, который точно запомнят
              </span>
              <h1 className="font-oswald font-bold leading-none">
                <span className="block text-4xl lg:text-6xl text-white mb-2">НЕЙРО ВИДЕО-ПОЗДРАВЛЕНИЯ</span>
                <span className="block text-4xl lg:text-6xl gradient-text">ОТ ЗНАМЕНИТОСТЕЙ</span>
                <span className="block text-4xl lg:text-6xl gradient-text">И В ФОРМАТЕ НОВОСТЕЙ</span>
                <span className="block text-3xl lg:text-4xl text-white/80 mt-2">на заказ</span>
              </h1>
            </div>

            <p className="section-enter delay-300 text-white/60 text-lg leading-relaxed max-w-md font-golos">
              Создадим эксклюзивное видео для любого праздника!
            </p>

            <div className="section-enter delay-400 flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollTo("gallery")} className="btn-outline-neon px-8 py-4 rounded-xl text-base flex items-center justify-center gap-2">
                <Icon name="Play" size={18} />
                <span>Смотреть примеры</span>
              </button>
            </div>

            <div className="section-enter delay-500 flex items-center gap-8 pt-4">
              {[["100+", "Звёзд"], ["1000+", "Поздравлений"], ["5.0", "Рейтинг"]].map(([val, label]) => (
                <div key={label}>
                  <div className="font-oswald text-2xl font-bold gradient-text">{val}</div>
                  <div className="text-white/50 text-sm font-golos">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="section-enter delay-200 relative">
            <div className="relative rounded-2xl overflow-hidden animate-float" style={{ animationDuration: "5s" }}>
              <div style={{ aspectRatio: "16/9" }}>
                <video src="https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/5debb0ee-f036-45d7-bf96-41a9808a926d.MP4" controls controlsList="nodownload" className="w-full h-full rounded-2xl" style={{ background: "#000" }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS FORMAT */}
      <section id="gallery" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-golos uppercase tracking-widest mb-4 block" style={{ color: "var(--neon-cyan)" }}>Формат новостей</span>
            <h2 className="font-oswald text-5xl lg:text-6xl font-bold text-white mb-4">
              ПОЗДРАВЛЕНИЯ В <span className="gradient-text">ФОРМАТЕ НОВОСТЕЙ</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto font-golos">
              Эксклюзивный формат — ваш именинник в главных новостях страны
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {GALLERY_ITEMS.slice(0, 3).map((item, i) => (
              <div key={i} className="glass star-card rounded-2xl overflow-hidden group cursor-pointer" style={{ width: "100%", maxWidth: "380px", margin: "0 auto" }}>
                <div className="relative overflow-hidden" style={{ height: "240px", background: `linear-gradient(135deg, hsl(${i * 40 + 200}, 70%, 10%), hsl(${i * 40 + 240}, 80%, 6%))` }}>
                  {item.img ? (
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-40">{item.emoji}</div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center" onClick={() => item.videoUrl && setActiveVideo(item.videoUrl)}>
                    <div className={`w-14 h-14 rounded-full glass-strong flex items-center justify-center transition-all duration-300 scale-75 group-hover:scale-100 ${item.videoUrl ? "opacity-80 group-hover:opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                      <Icon name="Play" size={20} />
                    </div>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-oswald font-semibold text-lg text-white">{item.title}</h3>
                    <span className="font-oswald font-bold text-lg ml-3 shrink-0" style={{ color: "var(--neon-cyan)" }}>{item.price}</span>
                  </div>
                  <button onClick={() => scrollTo("contact")} className="btn-neon w-full py-2 rounded-lg text-sm">
                    <span>Заказать</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STARS */}
      <section id="stars" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-golos uppercase tracking-widest mb-4 block" style={{ color: "var(--neon-pink)" }}>Знаменитости</span>
            <h2 className="font-oswald text-5xl lg:text-6xl font-bold text-white mb-4">
              ПОЗДРАВЛЕНИЯ <span className="gradient-text-warm">ОТ ЗВЁЗД</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto font-golos">
              Видео-примеры поздравлений от известных людей России
            </p>
          </div>

          {/* Карусель со стрелками */}
          <div className="relative">
            {/* Стрелка влево */}
            <button onClick={prevStar} className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110" style={{ background: "linear-gradient(135deg, var(--neon-pink), var(--neon-purple))", boxShadow: "0 0 20px rgba(255,0,128,0.4)" }}>
              <Icon name="ChevronLeft" size={22} color="white" />
            </button>

            {/* Карточки */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-2">
              {getVisibleStars().map((star, i) => {
                const realIdx = (starIndex + i) % starsTotal;
                return (
                  <div key={`${starIndex}-${i}`} className="glass star-card rounded-2xl overflow-hidden group cursor-pointer relative" style={{ animation: "fadeIn 0.3s ease" }}>
                    {star.tag && (
                      <span className="absolute top-3 right-3 z-10 text-xs font-oswald font-bold px-2 py-1 rounded-md"
                        style={{ background: star.tag === "NEW" ? "var(--neon-cyan)" : star.tag === "ТОП" ? "var(--neon-pink)" : "var(--neon-orange)", color: star.tag === "NEW" ? "#000" : "#fff" }}>
                        {star.tag}
                      </span>
                    )}
                    <div className="relative h-40 flex items-center justify-center overflow-hidden"
                      style={{ background: `linear-gradient(135deg, hsl(${realIdx * 25 + 280}, 70%, 15%), hsl(${realIdx * 25 + 320}, 80%, 8%))` }}>
                      {star.img ? <img src={star.img} alt={star.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /> : <span className="text-5xl">{star.emoji}</span>}
                      <div className="absolute inset-0 flex items-center justify-center" onClick={() => star.videoUrl && setActiveVideo(star.videoUrl)}>
                        <div className={`w-12 h-12 rounded-full glass-strong flex items-center justify-center transition-all duration-300 scale-75 group-hover:scale-100 ${star.videoUrl ? "opacity-80 group-hover:opacity-100" : "opacity-0 group-hover:opacity-100"}`}>
                          <Icon name="Play" size={16} />
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-oswald font-bold text-base text-white leading-tight">{star.name}</h3>
                      <p className="text-white/50 text-xs font-golos mt-1">{star.category}</p>
                      <div className="flex items-center justify-between mt-3">
                        <span className="font-oswald font-bold text-sm" style={{ color: "var(--neon-cyan)" }}>1 500 ₽</span>
                        <button onClick={() => scrollTo("contact")} className="btn-neon px-3 py-1.5 rounded-lg text-xs">
                          <span>Заказать</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Стрелка вправо */}
            <button onClick={nextStar} className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110" style={{ background: "linear-gradient(135deg, var(--neon-pink), var(--neon-purple))", boxShadow: "0 0 20px rgba(255,0,128,0.4)" }}>
              <Icon name="ChevronRight" size={22} color="white" />
            </button>
          </div>

          {/* Точки-индикаторы */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: starsTotal }).map((_, i) => (
              <button key={i} onClick={() => setStarIndex(i)} className="rounded-full transition-all duration-300" style={{ width: i === starIndex ? "24px" : "8px", height: "8px", background: i === starIndex ? "var(--neon-pink)" : "rgba(255,255,255,0.25)" }} />
            ))}
          </div>

          <div className="mt-8 rounded-2xl p-6 flex items-start gap-4 border" style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}>
            <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, var(--neon-pink), var(--neon-purple))" }}>
              <Icon name="Info" size={20} color="white" />
            </div>
            <p className="text-white/70 font-golos text-sm leading-relaxed">
              Если вы не нашли нужную знаменитость в списке, <span className="text-white font-semibold">напишите нам</span> — с большой вероятностью мы её создадим.
            </p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-golos uppercase tracking-widest mb-4 block" style={{ color: "var(--neon-purple)" }}>Просто и понятно</span>
            <h2 className="font-oswald text-5xl lg:text-6xl font-bold text-white mb-4">
              КАК ЭТО <span className="gradient-text">РАБОТАЕТ</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto font-golos">
              Три простых шага — и поздравление от звезды уже у вас
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 mb-20">
            {/* Шаг 1 */}
            <div className="glass rounded-2xl p-7 border border-white/08">
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-oswald font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, var(--neon-pink), var(--neon-purple))", color: "white" }}>
                  01
                </div>
                <div className="flex-1">
                  <h3 className="font-oswald font-semibold text-xl text-white mb-3">Вы отправляете информацию</h3>
                  <p className="text-white/70 font-golos font-medium mb-3">Для заказа пришлите нам:</p>
                  <div className="mb-3">
                    <p className="text-white/60 font-golos text-sm font-semibold mb-1">1. Данные об имениннике:</p>
                    <ul className="space-y-1 text-white/50 font-golos text-sm ml-3">
                      <li className="flex items-start gap-2"><span style={{ color: "var(--neon-cyan)" }}>—</span> Полное имя (Ф.И.О.)</li>
                      <li className="flex items-start gap-2"><span style={{ color: "var(--neon-cyan)" }}>—</span> Дата рождения</li>
                      <li className="flex items-start gap-2"><span style={{ color: "var(--neon-cyan)" }}>—</span> Фотографии (от 1 до 7 фото)</li>
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <p className="text-white/60 font-golos text-sm font-semibold">2. Интересные факты и детали</p>
                      <button
                        onClick={() => setDetailsOpen(!detailsOpen)}
                        className="flex items-center gap-1 text-xs font-golos px-3 py-1 rounded-full border transition-all"
                        style={{ color: "var(--neon-cyan)", borderColor: "var(--neon-cyan)44", background: "var(--neon-cyan)11" }}
                      >
                        {detailsOpen ? "Свернуть" : "Подробнее"}
                        <Icon name={detailsOpen ? "ChevronUp" : "ChevronDown"} size={12} />
                      </button>
                    </div>
                    {detailsOpen && (
                      <div className="mt-3 ml-3 space-y-1 text-white/50 font-golos text-sm">
                        <p className="text-white/60 mb-2">Расскажите об имениннике всё, что считаете важным:</p>
                        <li className="flex items-start gap-2 list-none"><span style={{ color: "var(--neon-cyan)" }}>—</span> Личные достижения (карьера, хобби, спорт и т.д.)</li>
                        <li className="flex items-start gap-2 list-none"><span style={{ color: "var(--neon-cyan)" }}>—</span> Увлечения и интересы</li>
                        <li className="flex items-start gap-2 list-none"><span style={{ color: "var(--neon-cyan)" }}>—</span> Как вас представить (знаменитость скажет, что поздравляет по вашей просьбе)</li>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Шаг 2 */}
            <div className="glass rounded-2xl p-7 border border-white/08">
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-oswald font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, var(--neon-purple), var(--neon-cyan))", color: "white" }}>
                  02
                </div>
                <div>
                  <h3 className="font-oswald font-semibold text-xl text-white mb-2">Мы создаём поздравление</h3>
                  <p className="text-white/55 font-golos">Мы пишем уникальный и персонализированный сценарий, основанный на ваших пожеланиях и фактах об имениннике. Создаём высококачественное видеопоздравление.</p>
                </div>
              </div>
            </div>

            {/* Шаг 3 */}
            <div className="glass rounded-2xl p-7 border border-white/08">
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-oswald font-bold text-sm"
                  style={{ background: "linear-gradient(135deg, var(--neon-cyan), var(--neon-pink))", color: "white" }}>
                  03
                </div>
                <div>
                  <h3 className="font-oswald font-semibold text-xl text-white mb-2">Вы получаете видео</h3>
                  <p className="text-white/55 font-golos">Готовое высококачественное поздравление доставляется вам в течение <span className="text-white/80 font-semibold">24 часов</span> (срочный заказ выполняем до <span className="text-white/80 font-semibold">2 часов</span>).</p>
                </div>
              </div>
            </div>

            {/* Гарантия */}
            <div className="rounded-2xl p-6 border flex items-center gap-4"
              style={{ background: "linear-gradient(135deg, rgba(255,45,120,0.08), rgba(155,48,255,0.08))", borderColor: "rgba(255,45,120,0.3)" }}>
              <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                style={{ background: "linear-gradient(135deg, var(--neon-pink), var(--neon-purple))" }}>
                🛡️
              </div>
              <div>
                <p className="font-oswald font-bold text-white text-lg">Гарантия</p>
                <p className="text-white/65 font-golos text-sm">Оплата только после просмотра! Мы уверены, что вы будете в восторге от результата!</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {WHY_ITEMS.map((item, i) => (
              <div key={i} className="glass rounded-2xl p-6 border border-white/08 hover:border-white/20 transition-all duration-300">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `linear-gradient(135deg, hsl(${i * 30 + 300}, 80%, 30%), hsl(${i * 30 + 330}, 90%, 20%))` }}>
                  <Icon name={item.icon} fallback="Star" size={22} />
                </div>
                <h3 className="font-oswald font-semibold text-lg text-white mb-2">{item.title}</h3>
                <p className="text-white/50 text-sm font-golos leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-golos uppercase tracking-widest mb-4 block" style={{ color: "var(--neon-orange)" }}>Контакты</span>
            <h2 className="font-oswald text-5xl lg:text-6xl font-bold text-white mb-4">
              НАПИШИТЕ <span className="gradient-text-warm">НАМ</span>
            </h2>
            <p className="text-white/50 font-golos">Ответим в течение 2 часов</p>
          </div>

          <div className="max-w-lg mx-auto grid grid-cols-2 gap-4">
            {/* Telegram */}
            <a href="https://t.me/anastasiavideo1" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl px-5 py-4 font-golos font-semibold text-white text-base transition-all hover:scale-105 hover:brightness-110 no-underline"
              style={{ background: "#229ED9" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L8.32 14.617l-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.194 1.006.131.828.942z"/></svg>
              Telegram
            </a>

            {/* ВКонтакте */}
            <a href="https://vk.ru/club238057825" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl px-5 py-4 font-golos font-semibold text-white text-base transition-all hover:scale-105 hover:brightness-110 no-underline"
              style={{ background: "#0077FF" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M12.785 16.241s.288-.032.436-.194c.136-.148.132-.427.132-.427s-.02-1.304.585-1.498c.596-.19 1.364 1.26 2.177 1.817.614.422 1.08.33 1.08.33l2.17-.03s1.135-.07.597-1.09c-.044-.083-.314-.661-1.618-1.87-1.366-1.265-1.183-1.06.462-3.246.999-1.332 1.398-2.147 1.272-2.494-.12-.332-.855-.244-.855-.244l-2.44.015s-.181-.025-.315.055c-.132.078-.216.26-.216.26s-.387 1.03-.904 1.905c-1.088 1.85-1.524 1.948-1.702 1.832-.414-.267-.31-1.077-.31-1.652 0-1.797.272-2.548-.53-2.74-.267-.064-.463-.106-1.144-.113-.874-.009-1.614.003-2.032.208-.278.136-.493.44-.362.457.162.021.528.099.722.363.25.341.241 1.107.241 1.107s.144 2.115-.335 2.378c-.329.18-.78-.187-1.748-1.86-.497-.858-.873-1.808-.873-1.808s-.072-.176-.202-.271c-.156-.114-.376-.15-.376-.15l-2.317.015s-.348.01-.475.161C4.02 8.422 4.108 8.74 4.108 8.74s1.81 4.237 3.861 6.37c1.88 1.956 4.017 1.83 4.017 1.83h.799z"/></svg>
              ВКонтакте
            </a>

            {/* Avito */}
            <a href="https://www.avito.ru/brands/3aff4584f599bf9abe69698bbf483b84" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl px-5 py-4 font-golos font-semibold text-base transition-all hover:scale-105 hover:brightness-110 no-underline"
              style={{ background: "#ffffff", color: "#1a1a1a" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="7" cy="7" r="3" fill="#965EEB"/><circle cx="17" cy="7" r="3" fill="#04E061"/><circle cx="7" cy="17" r="3" fill="#FF4053"/><circle cx="17" cy="17" r="3" fill="#00AEFF"/></svg>
              Avito
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/79001224690" target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-2xl px-5 py-4 font-golos font-semibold text-white text-base transition-all hover:scale-105 hover:brightness-110 no-underline"
              style={{ background: "#25D366" }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-golos uppercase tracking-widest mb-4 block" style={{ color: "var(--neon-cyan)" }}>Отзывы клиентов</span>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-3xl" style={{ color: "#f5a623" }}>★</span>
              ))}
            </div>
            <p className="text-white/50 max-w-xl mx-auto font-golos">
              Узнайте, что говорят те, кто уже получил поздравление
            </p>
          </div>

          <ReviewsCarousel />

          <div className="text-center mt-10">
            <a
              href="https://www.avito.ru/brands/3aff4584f599bf9abe69698bbf483b84"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-golos text-white/70 hover:text-white transition-colors duration-200 underline underline-offset-4 decoration-white/30 hover:decoration-white/70"
            >
              Все отзывы можно посмотреть на Avito
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="glass border-t border-white/08 py-10 px-6 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: "linear-gradient(135deg, var(--neon-pink), var(--neon-purple))" }}>⭐</div>
            <span className="font-oswald text-lg font-bold text-white">Анастасия Б <span className="neon-text-pink">| Поздравления</span></span>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-white/40 text-sm font-golos hover:text-white transition-colors">
                {item.label}
              </button>
            ))}
          </div>
          <div className="text-white/30 text-sm font-golos">© 2026 Анастасия Б | Поздравления</div>
        </div>
      </footer>
    </div>
  );
}