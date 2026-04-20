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
  { name: "Иван Ургант", category: "Телеведущий", emoji: "🎤", price: "от 2 990 ₽", tag: "ТОП" },
  { name: "Ольга Бузова", category: "Певица", emoji: "🌟", price: "от 3 490 ₽", tag: "ХИТ" },
  { name: "Дмитрий Нагиев", category: "Актёр", emoji: "🎭", price: "от 2 490 ₽", tag: "" },
  { name: "Тимати", category: "Рэпер", emoji: "🎧", price: "от 3 990 ₽", tag: "NEW" },
  { name: "Ксения Собчак", category: "Телеведущая", emoji: "💎", price: "от 2 990 ₽", tag: "" },
  { name: "Басков", category: "Певец", emoji: "🎼", price: "от 2 790 ₽", tag: "" },
];

const GALLERY_ITEMS = [
  { title: "День рождения маме", star: "Ольга Бузова", views: "12 тыс.", emoji: "🎂" },
  { title: "Корпоратив 2024", star: "Иван Ургант", views: "8 тыс.", emoji: "🎉" },
  { title: "Свадебное поздравление", star: "Басков", views: "21 тыс.", emoji: "💍" },
  { title: "Юбилей 50 лет", star: "Нагиев", views: "6 тыс.", emoji: "🥂" },
  { title: "Новый год!", star: "Тимати", views: "45 тыс.", emoji: "🎆" },
  { title: "Выпускной", star: "Ксения Собчак", views: "9 тыс.", emoji: "🎓" },
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
    text: "Оставьте заявку, укажите детали — готовое видео придёт вам в течение суток",
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
  const [selectedStar, setSelectedStar] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

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
            <span className="font-oswald text-xl font-bold tracking-wide text-white">Star<span className="neon-text-pink">Greet</span></span>
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
            <button onClick={() => scrollTo("stars")} className="btn-neon px-5 py-2 rounded-lg text-sm">
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
                <span className="block text-5xl lg:text-7xl text-white mb-2">ПОЗДРАВЛЕНИЕ</span>
                <span className="block text-5xl lg:text-7xl gradient-text">ОТ ЗВЕЗДЫ</span>
                <span className="block text-4xl lg:text-6xl text-white/80 mt-2">за 5 минут</span>
              </h1>
            </div>

            <p className="section-enter delay-300 text-white/60 text-lg leading-relaxed max-w-md font-golos">
              Выбери звезду из каталога, оставь заявку — и мы пришлём готовое персональное видео в течение суток
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

      {/* GALLERY */}
      <section id="gallery" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-golos uppercase tracking-widest mb-4 block" style={{ color: "var(--neon-cyan)" }}>Галерея</span>
            <h2 className="font-oswald text-5xl lg:text-6xl font-bold text-white mb-4">
              ПРИМЕРЫ <span className="gradient-text">ПОЗДРАВЛЕНИЙ</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto font-golos">
              Реальные поздравления, созданные с помощью нашего сервиса
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {GALLERY_ITEMS.map((item, i) => (
              <div key={i} className="glass star-card rounded-2xl overflow-hidden group cursor-pointer">
                <div className="relative h-48 overflow-hidden" style={{ background: `linear-gradient(135deg, hsl(${i * 40 + 280}, 70%, 15%), hsl(${i * 40 + 320}, 80%, 8%))` }}>
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-40 group-hover:scale-110 transition-transform duration-500">
                    {item.emoji}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full glass-strong flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100">
                      <Icon name="Play" size={20} />
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 glass px-2 py-1 rounded-full text-xs font-golos text-white/70">
                    👁 {item.views}
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-oswald font-semibold text-lg text-white mb-1">{item.title}</h3>
                  <p className="text-white/50 text-sm font-golos">⭐ {item.star}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative rounded-3xl overflow-hidden">
            <img src={GALLERY_IMG} alt="Галерея звёзд" className="w-full h-64 object-cover" />
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(10,8,20,0.7)" }}>
              <div className="text-center">
                <p className="font-oswald text-3xl text-white font-bold mb-4">БОЛЕЕ 50 000 ПОЗДРАВЛЕНИЙ</p>
                <button className="btn-neon px-8 py-3 rounded-xl">
                  <span>Смотреть все</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STARS CATALOG */}
      <section id="stars" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-sm font-golos uppercase tracking-widest mb-4 block" style={{ color: "var(--neon-pink)" }}>Каталог</span>
            <h2 className="font-oswald text-5xl lg:text-6xl font-bold text-white mb-4">
              ВЫБЕРИ <span className="gradient-text-warm">ЗВЕЗДУ</span>
            </h2>
            <p className="text-white/50 max-w-xl mx-auto font-golos">
              Более 500 знаменитостей готовы поздравить твоих близких
            </p>
          </div>

          <div className="flex flex-wrap gap-3 justify-center mb-10">
            {["Все", "Певцы", "Актёры", "Телеведущие", "Спортсмены", "Блогеры"].map((cat) => (
              <button key={cat} className="glass px-5 py-2 rounded-full text-sm font-golos text-white/70 hover:text-white border border-white/10 hover:border-white/30 transition-all">
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {STARS.map((star, i) => (
              <div
                key={i}
                onClick={() => setSelectedStar(selectedStar === star.name ? null : star.name)}
                className={`glass star-card rounded-2xl p-6 cursor-pointer relative overflow-hidden transition-all ${selectedStar === star.name ? "border border-pink-500/50" : "border border-white/08"}`}
              >
                {star.tag && (
                  <span className="absolute top-4 right-4 text-xs font-oswald font-bold px-2 py-1 rounded-md"
                    style={{ background: star.tag === "NEW" ? "var(--neon-cyan)" : star.tag === "ТОП" ? "var(--neon-pink)" : "var(--neon-orange)", color: star.tag === "NEW" ? "#000" : "#fff" }}>
                    {star.tag}
                  </span>
                )}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
                    style={{ background: `linear-gradient(135deg, hsl(${i * 40 + 280}, 70%, 20%), hsl(${i * 40 + 320}, 80%, 12%))` }}>
                    {star.emoji}
                  </div>
                  <div>
                    <h3 className="font-oswald font-bold text-lg text-white">{star.name}</h3>
                    <p className="text-white/50 text-sm font-golos">{star.category}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-oswald font-semibold" style={{ color: "var(--neon-cyan)" }}>{star.price}</span>
                  <button className="btn-neon px-4 py-2 rounded-lg text-sm" onClick={(e) => { e.stopPropagation(); setSelectedStar(star.name); }}>
                    <span>Заказать</span>
                  </button>
                </div>
                {selectedStar === star.name && (
                  <div className="mt-4 pt-4 border-t border-white/10" onClick={(e) => e.stopPropagation()}>
                    <p className="text-white/60 text-sm font-golos mb-3">Введите данные для поздравления</p>
                    <input className="w-full glass border border-white/20 rounded-lg px-4 py-2 text-sm text-white font-golos bg-transparent placeholder-white/30 mb-2 outline-none focus:border-pink-500"
                      placeholder="Имя именинника" />
                    <textarea className="w-full glass border border-white/20 rounded-lg px-4 py-2 text-sm text-white font-golos bg-transparent placeholder-white/30 mb-3 outline-none focus:border-pink-500 resize-none h-20"
                      placeholder="Текст поздравления (опционально)" />
                    <button className="btn-neon w-full py-3 rounded-lg text-sm">
                      <span>Создать поздравление →</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button className="btn-outline-neon px-8 py-3 rounded-xl text-base">
              Показать ещё 494 звезды
            </button>
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

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <img src={AI_IMG} alt="Поздравление от звезды" className="w-full rounded-3xl object-cover h-80" />
            </div>
            <div className="space-y-6">
              {[
                { step: "01", title: "Выбираешь звезду", text: "В каталоге — певцы, актёры, телеведущие и другие знаменитости на любой вкус" },
                { step: "02", title: "Оставляешь заявку", text: "Укажи имя получателя, повод и любые детали — чем больше, тем трогательнее получится" },
                { step: "03", title: "Получаешь готовое видео", text: "Мы всё сделаем сами и пришлём вам готовое поздравление в течение суток" },
              ].map((item) => (
                <div key={item.step} className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center font-oswald font-bold text-sm"
                    style={{ background: "linear-gradient(135deg, var(--neon-pink), var(--neon-purple))", color: "white" }}>
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-oswald font-semibold text-xl text-white mb-1">{item.title}</h3>
                    <p className="text-white/55 font-golos">{item.text}</p>
                  </div>
                </div>
              ))}
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

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              {[
                { icon: "Mail", label: "Email", value: "hello@stargreet.ru" },
                { icon: "Phone", label: "Телефон", value: "+7 (800) 123-45-67" },
                { icon: "MessageCircle", label: "Telegram", value: "@stargreet" },
                { icon: "MapPin", label: "Адрес", value: "Москва, ул. Арбат, 1" },
              ].map((item) => (
                <div key={item.label} className="glass rounded-xl p-5 flex items-center gap-4 border border-white/08 hover:border-white/20 transition-all cursor-pointer group">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: "linear-gradient(135deg, var(--neon-orange), var(--neon-pink))" }}>
                    <Icon name={item.icon} fallback="Star" size={20} />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs font-golos uppercase tracking-wider">{item.label}</div>
                    <div className="text-white font-golos font-medium group-hover:text-pink-400 transition-colors">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-strong rounded-2xl p-8 border border-white/10">
              <h3 className="font-oswald text-2xl font-bold text-white mb-6">Форма обратной связи</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-white/60 text-sm font-golos block mb-2">Ваше имя</label>
                  <input
                    className="w-full glass border border-white/15 rounded-xl px-4 py-3 text-white font-golos bg-transparent placeholder-white/25 outline-none focus:border-pink-500 transition-colors"
                    placeholder="Иван Иванов"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm font-golos block mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full glass border border-white/15 rounded-xl px-4 py-3 text-white font-golos bg-transparent placeholder-white/25 outline-none focus:border-pink-500 transition-colors"
                    placeholder="ivan@mail.ru"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label className="text-white/60 text-sm font-golos block mb-2">Сообщение</label>
                  <textarea
                    className="w-full glass border border-white/15 rounded-xl px-4 py-3 text-white font-golos bg-transparent placeholder-white/25 outline-none focus:border-pink-500 transition-colors resize-none h-32"
                    placeholder="Ваш вопрос или предложение..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>
                <button className="btn-neon w-full py-4 rounded-xl text-base flex items-center justify-center gap-2">
                  <span>Отправить сообщение</span>
                  <Icon name="Send" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="glass border-t border-white/08 py-10 px-6 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style={{ background: "linear-gradient(135deg, var(--neon-pink), var(--neon-purple))" }}>⭐</div>
            <span className="font-oswald text-lg font-bold text-white">Star<span className="neon-text-pink">Greet</span></span>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="text-white/40 text-sm font-golos hover:text-white transition-colors">
                {item.label}
              </button>
            ))}
          </div>
          <div className="text-white/30 text-sm font-golos">© 2026 StarGreet</div>
        </div>
      </footer>
    </div>
  );
}