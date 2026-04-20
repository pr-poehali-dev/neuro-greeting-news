import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/files/901f5ba0-0952-42d0-825b-fe2f833573a5.jpg";
const AI_IMG = "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/files/3d327c1e-35a8-4b89-a0a5-d4aaa625236e.jpg";
const GALLERY_IMG = "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/files/1897f48b-0f0b-49aa-98e0-f37f7f4137f4.jpg";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "gallery", label: "Галерея" },
  { id: "stars", label: "Звёзды" },
  { id: "how", label: "Как это работает" },
  { id: "contact", label: "Контакты" },
];

const STARS = [
  { name: "Владимир Путин", category: "Политик", emoji: "🇷🇺", tag: "ТОП" },
  { name: "Дмитрий Нагиев", category: "Актёр, телеведущий", emoji: "🎭", tag: "ХИТ" },
  { name: "Николай Басков", category: "Певец", emoji: "🎤", tag: "" },
  { name: "Филипп Киркоров", category: "Певец", emoji: "👑", tag: "ТОП" },
  { name: "Стас Михайлов", category: "Певец", emoji: "🎵", tag: "" },
  { name: "Баста", category: "Рэпер", emoji: "🎧", tag: "" },
  { name: "Сергей Бурунов", category: "Актёр", emoji: "🎬", tag: "NEW" },
  { name: "Сергей Жуков", category: "Певец, «Руки Вверх»", emoji: "🎸", tag: "" },
  { name: "Олег Газманов", category: "Певец", emoji: "🌟", tag: "" },
  { name: "Сергей Лазарев", category: "Певец", emoji: "✨", tag: "" },
  { name: "Григорий Лепс", category: "Певец", emoji: "🥂", tag: "" },
  { name: "Прохор Шаляпин", category: "Певец", emoji: "🎶", tag: "" },
  { name: "Гарик Харламов", category: "Комик, актёр", emoji: "😄", tag: "ХИТ" },
];

const GALLERY_ITEMS: { title: string; star: string; views: string; emoji: string; img?: string; price: string }[] = [
  { title: "Поздравление от Первого канала", star: "Первый канал", views: "12 тыс.", emoji: "🎂", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/66f51039-aad8-4b03-b1c3-70656714a621.jpeg", price: "3 000 ₽" },
  { title: "Поздравление от канала «Россия 1»", star: "Россия 1", views: "8 тыс.", emoji: "🎉", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/e3bb268d-9413-44fe-b461-10a225d60349.jpeg", price: "3 000 ₽" },
  { title: "Ведущая + Путин", star: "Персональное поздравление", views: "21 тыс.", emoji: "💍", img: "https://cdn.poehali.dev/projects/90f85c73-4e8a-422c-8e61-c47e03f2914a/bucket/f365e94a-27ad-42ac-9fb3-edc956a80639.jpeg", price: "2 000 ₽" },
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
                <span className="block text-3xl lg:text-4xl text-white/80 mt-2">и в формате новостей — на заказ</span>
              </h1>
            </div>

            <p className="section-enter delay-300 text-white/60 text-lg leading-relaxed max-w-md font-golos">
              Создадим эксклюзивное видео для любого праздника!
            </p>

            <div className="section-enter delay-400 flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollTo("stars")} className="btn-neon px-8 py-4 rounded-xl text-base flex items-center justify-center gap-2">
                <span>Выбрать звезду</span>
                <Icon name="ArrowRight" size={18} />
              </button>
              <button onClick={() => scrollTo("gallery")} className="btn-outline-neon px-8 py-4 rounded-xl text-base flex items-center justify-center gap-2">
                <Icon name="Play" size={18} />
                <span>Смотреть примеры</span>
              </button>
            </div>

            <div className="section-enter delay-500 flex items-center gap-8 pt-4">
              {[["500+", "Звёзд"], ["50K+", "Поздравлений"], ["4.9", "Рейтинг"]].map(([val, label]) => (
                <div key={label}>
                  <div className="font-oswald text-2xl font-bold gradient-text">{val}</div>
                  <div className="text-white/50 text-sm font-golos">{label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="section-enter delay-200 relative">
            <div className="relative rounded-2xl overflow-hidden animate-float" style={{ animationDuration: "5s" }}>
              <img src={HERO_IMG} alt="Звезда поздравляет" className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(10,8,20,0.8) 0%, transparent 50%)" }} />
              <div className="absolute bottom-6 left-6 right-6 glass-strong rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: "linear-gradient(135deg, var(--neon-pink), var(--neon-purple))" }}>⭐</div>
                  <div>
                    <div className="text-white font-oswald font-semibold">Иван, с Днём Рождения!</div>
                    <div className="text-white/50 text-sm font-golos">от Ивана Урганта • только что</div>
                  </div>
                  <div className="ml-auto w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "var(--neon-pink)" }}>
                    <Icon name="Play" size={12} />
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -top-4 -right-4 glass rounded-xl px-4 py-2 text-sm font-golos" style={{ border: "1px solid rgba(255,45,120,0.3)", color: "var(--neon-pink)" }}>
              🔥 Хит недели
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
              <div key={i} className="glass star-card rounded-2xl overflow-hidden group cursor-pointer">
                <div className="relative h-56 overflow-hidden" style={{ background: `linear-gradient(135deg, hsl(${i * 40 + 200}, 70%, 10%), hsl(${i * 40 + 240}, 80%, 6%))` }}>
                  {item.img ? (
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-40">{item.emoji}</div>
                  )}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full glass-strong flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
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

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {STARS.map((star, i) => (
              <div key={i} className="glass star-card rounded-2xl overflow-hidden group cursor-pointer relative">
                {star.tag && (
                  <span className="absolute top-3 right-3 z-10 text-xs font-oswald font-bold px-2 py-1 rounded-md"
                    style={{ background: star.tag === "NEW" ? "var(--neon-cyan)" : star.tag === "ТОП" ? "var(--neon-pink)" : "var(--neon-orange)", color: star.tag === "NEW" ? "#000" : "#fff" }}>
                    {star.tag}
                  </span>
                )}
                <div className="relative h-36 flex items-center justify-center"
                  style={{ background: `linear-gradient(135deg, hsl(${i * 25 + 280}, 70%, 15%), hsl(${i * 25 + 320}, 80%, 8%))` }}>
                  <span className="text-5xl">{star.emoji}</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full glass-strong flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
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
            ))}
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

          <div className="max-w-lg mx-auto space-y-4">
            {[
              { icon: "Send", label: "Telegram", value: "@anastasia64647", href: "https://t.me/anastasia64647", color: "#229ED9" },
              { icon: "MessageCircle", label: "WhatsApp", value: "+7 (900) 122-46-90", href: "https://wa.me/79001224690", color: "#25D366" },
              { icon: "ShoppingBag", label: "Авито", value: "Профиль на Авито", href: "https://www.avito.ru/brands/3aff4584f599bf9abe69698bbf483b84", color: "#00AAFF" },
            ].map((item) => (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer"
                className="glass rounded-xl p-5 flex items-center gap-4 border border-white/08 hover:border-white/20 transition-all cursor-pointer group no-underline block">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: item.color + "22", border: `1px solid ${item.color}44` }}>
                  <Icon name={item.icon} fallback="Link" size={22} style={{ color: item.color }} />
                </div>
                <div>
                  <div className="text-white/40 text-xs font-golos uppercase tracking-wider">{item.label}</div>
                  <div className="text-white font-golos font-medium group-hover:text-pink-400 transition-colors">{item.value}</div>
                </div>
                <Icon name="ExternalLink" size={16} className="ml-auto text-white/20 group-hover:text-white/50 transition-colors" />
              </a>
            ))}
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