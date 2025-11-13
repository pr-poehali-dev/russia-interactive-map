import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

interface Region {
  id: string;
  name: string;
  tradition: string;
  when?: string;
  traditions: string[];
  food?: string;
  essence: string;
  emoji: string;
}

const regions: Region[] = [
  {
    id: "far-east",
    name: "Дальний Восток",
    tradition: "Новый год летнего солнцестояния",
    when: "Конец июня",
    traditions: [
      "Разжигание двух костров — «небесные врата»",
      "Прыжки через огонь для помощи планетам",
      "Развешивание цветных лент на деревьях",
      "Подношения духам воды у родников"
    ],
    food: "Пшённая каша, ягоды",
    essence: "Почитание природы и духов, помощь в преодолении препятствий",
    emoji: "🔥"
  },
  {
    id: "yakutia",
    name: "Якутия",
    tradition: "Ысыах (Изобилие)",
    when: "10–25 июня",
    traditions: [
      "Встреча восходящего солнца (Кюн Керсютэ)",
      "Установление ритуальных столбов-коновязей (сэргэ)",
      "Костры и хороводы (осуохай) несколько дней",
      "Прославление божеств верхнего мира (Айыы)"
    ],
    essence: "Пробуждение природы, солнца и Вселенной, призыв изобилия",
    emoji: "☀️"
  },
  {
    id: "buryatia",
    name: "Бурятия, Тыва, Калмыкия",
    tradition: "Сагаалган / Белый месяц",
    when: "Февраль (по лунному календарю)",
    traditions: [
      "Генеральная уборка, выбрасывание старого",
      "Зажигание костров для сжигания бед",
      "Хождение в гости с шелковыми шарфами (хадаками)",
      "В Бурятии: льдинка и веник у порога для чистоты помыслов"
    ],
    food: "Молочные продукты, борцоки, мясные супы (без алкоголя)",
    essence: "Очищение, обновление, встреча весны",
    emoji: "🥛"
  },
  {
    id: "chuvashia",
    name: "Чувашия",
    tradition: "Сурхури / Кашарни (Зимняя неделя)",
    when: "С Рождества до Крещения",
    traditions: [
      "Молодёжь варит пиво и готовит угощения",
      "Девушки угощают стариков и получают благословение",
      "Шумные гуляния, танцы, песни",
      "Гадание: ловля барашка в темноте предсказывает суженого"
    ],
    food: "Домашнее пиво, йовача (мучные шарики)",
    essence: "Проводы старого года, призыв удачи и веселье",
    emoji: "🎊"
  },
  {
    id: "bashkortostan",
    name: "Башкортостан",
    tradition: "Нардуган / Каргатуй",
    when: "Нардуган: 25 декабря – 7 января; Каргатуй: весной",
    traditions: [
      "Нардуган: ряженые, костры, гуляния",
      "Каргатуй: встреча грачей, украшение деревьев",
      "Празднование пробуждения земли"
    ],
    food: "Пшённая каша, элеш, бешбармак, вак-бэлиш",
    essence: "Рождение солнца или начало земледельческого цикла",
    emoji: "🌾"
  },
  {
    id: "tatarstan",
    name: "Татарстан",
    tradition: "Навруз (день весеннего равноденствия)",
    when: "31 декабря и весеннее равноденствие",
    traditions: [
      "Генеральная уборка перед Наврузом",
      "Проращивание чечевицы и пшеницы как символ изобилия",
      "Празднование с Кыш Бабаем (татарский Дед Мороз)"
    ],
    food: "Чак-чак, эчпочмак, губадия; на Навруз — сумаляк",
    essence: "Семейный праздник, встреча весны и нового жизненного цикла",
    emoji: "🌙"
  },
  {
    id: "kalmykia",
    name: "Калмыкия",
    tradition: "Зул (Лампада)",
    when: "Конец ноября – середина декабря",
    traditions: [
      "Зажигание лампад для продления жизни",
      "Общенародный день рождения (не праздновали индивидуальные ранее)"
    ],
    food: "Пшеничные пирожки, пельмени с бараниной, молочный чай",
    essence: "Духовное обновление, почитание предков",
    emoji: "🕯️"
  },
  {
    id: "mari-el",
    name: "Марий Эл",
    tradition: "Шорыкйол (Овечья нога)",
    when: "Начинается в пятницу зимой",
    traditions: [
      "Девушки гадают в хлеву: хватают овцу за ногу",
      "Прислушиваются к курам для предсказания урожая",
      "Обход домов дедом Василием и старухой Василисой"
    ],
    essence: "Гадания на будущее, обеспечение благополучия и урожая",
    emoji: "🐑"
  },
  {
    id: "udmurtia",
    name: "Удмуртия",
    tradition: "Ряжение для защиты от злых духов",
    traditions: [
      "Одежда наизнанку, лица покрыты сажей",
      "Отпугивание злых духов через мистический обряд",
      "Сейчас стало весёлым праздничным обычаем"
    ],
    essence: "Защита от злых сил и привлечение удачи в новый год",
    emoji: "🎭"
  },
  {
    id: "ossetia",
    name: "Осетия",
    tradition: "Ног бон (Старый Новый год)",
    when: "13–14 января",
    traditions: [
      "Выпечка осетинских пирогов (символы солнца)",
      "Разжигание костров",
      "Почитание священной Бусины желаний (Цыкурайы февдыг)"
    ],
    food: "Осетинские пироги, мясо на открытом огне",
    essence: "Возрождение природы, привлечение счастья и благополучия",
    emoji: "🥧"
  },
  {
    id: "karelia",
    name: "Карелия",
    tradition: "Сюндума (Магия первого дня)",
    when: "С Рождества до Святок",
    traditions: [
      "Обязательная баня 31 декабря",
      "В первый день ждут бородатого мужчину (к удаче)",
      "Гадание: плескание водой на венец дома"
    ],
    essence: "Очищение, привлечение удачи через первый день года",
    emoji: "🎵"
  },
  {
    id: "saami",
    name: "Кольский полуостров (Саамы)",
    tradition: "Праздник чистого снега",
    when: "7 января",
    traditions: [
      "Подведение итогов года",
      "Символ чистых помыслов и исполнения желаний",
      "Ранее считали Деда Мороза злым духом"
    ],
    essence: "Осмысление прожитого года и очищение",
    emoji: "❄️"
  },
  {
    id: "pomory",
    name: "Архангельская область (Поморы)",
    tradition: "Никола Зимний",
    when: "19 декабря и Новый год",
    traditions: [
      "Выпечка козуль (пряников из жжёного сахара)",
      "Спуск на воду горящих плавучих маяков",
      "Не закрывают двери в новогоднюю ночь для счастья"
    ],
    essence: "Почитание моря и надежда на счастливое возвращение домой",
    emoji: "⚓"
  }
];

export default function Index() {
  const [selectedRegion, setSelectedRegion] = useState<Region | null>(null);
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);

  const RegionCard = ({ region }: { region: Region }) => (
    <div
      className="group cursor-pointer p-6 rounded-2xl bg-white border-2 border-primary/20 hover:border-primary hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in"
      onClick={() => setSelectedRegion(region)}
      onMouseEnter={() => setHoveredRegion(region.id)}
      onMouseLeave={() => setHoveredRegion(null)}
    >
      <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
        {region.emoji}
      </div>
      <h3 className="text-xl font-heading font-bold text-primary mb-2">
        {region.name}
      </h3>
      <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
        {region.tradition}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/5 to-primary/5">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="text-6xl">❄️</div>
            <h1 className="text-5xl md:text-6xl font-heading font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              Новогодние традиции России
            </h1>
            <div className="text-6xl">🎄</div>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Откройте для себя уникальные новогодние обычаи народов России — от Калининграда до Владивостока
          </p>
        </div>

        <div className="mb-16">
          <div className="relative w-full max-w-5xl mx-auto aspect-[2/1] bg-white rounded-3xl shadow-2xl p-8 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
            <img 
              src="https://cdn.poehali.dev/files/4897a665-c464-455a-bd25-d0d594ebed6c.png" 
              alt="Карта России" 
              className="w-full h-full object-contain relative z-10"
            />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center animate-scale-in">
                <Icon name="MousePointerClick" size={48} className="text-primary mx-auto mb-4" />
                <p className="text-lg font-heading font-semibold text-primary">
                  Выберите регион из списка ниже
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {regions.map((region, index) => (
            <div 
              key={region.id}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <RegionCard region={region} />
            </div>
          ))}
        </div>

        <Dialog open={!!selectedRegion} onOpenChange={() => setSelectedRegion(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto animate-scale-in">
            <DialogHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-6xl">{selectedRegion?.emoji}</div>
                <div className="flex-1">
                  <DialogTitle className="text-3xl font-heading font-bold text-primary mb-2">
                    {selectedRegion?.name}
                  </DialogTitle>
                  <p className="text-xl font-semibold text-secondary">
                    {selectedRegion?.tradition}
                  </p>
                  {selectedRegion?.when && (
                    <p className="text-sm text-muted-foreground mt-1">
                      <Icon name="Calendar" size={14} className="inline mr-1" />
                      {selectedRegion.when}
                    </p>
                  )}
                </div>
              </div>
            </DialogHeader>
            
            <div className="space-y-6 mt-6">
              <div>
                <h3 className="text-lg font-heading font-semibold text-primary mb-3 flex items-center gap-2">
                  <Icon name="Sparkles" size={20} />
                  Традиции
                </h3>
                <ul className="space-y-2">
                  {selectedRegion?.traditions.map((tradition, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-foreground">
                      <span className="text-secondary mt-1">•</span>
                      <span className="leading-relaxed">{tradition}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedRegion?.food && (
                <div>
                  <h3 className="text-lg font-heading font-semibold text-primary mb-2 flex items-center gap-2">
                    <Icon name="UtensilsCrossed" size={20} />
                    Угощения
                  </h3>
                  <p className="text-foreground leading-relaxed">{selectedRegion.food}</p>
                </div>
              )}

              <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                <h3 className="text-base font-heading font-semibold text-primary mb-2 flex items-center gap-2">
                  <Icon name="Heart" size={18} />
                  Суть праздника
                </h3>
                <p className="text-foreground leading-relaxed italic">{selectedRegion?.essence}</p>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-muted-foreground text-sm pt-4 border-t">
              <Icon name="Info" size={16} className="text-primary" />
              <span className="italic">Нажмите в любом месте, чтобы закрыть</span>
            </div>
          </DialogContent>
        </Dialog>

        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-lg">
            <Icon name="Heart" size={20} className="text-red-500" />
            <p className="text-sm text-muted-foreground">
              Создано с любовью к традициям народов России
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}