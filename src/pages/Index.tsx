import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Icon from "@/components/ui/icon";

interface Region {
  id: string;
  name: string;
  tradition: string;
  description: string;
  emoji: string;
}

const regions: Region[] = [
  {
    id: "moscow",
    name: "Москва",
    tradition: "Кремлёвские куранты",
    description: "Главная новогодняя традиция — слушать бой Кремлёвских курантов в полночь и загадывать желание. Москвичи собираются на Красной площади, чтобы встретить Новый год под звон главных часов страны.",
    emoji: "🏛️"
  },
  {
    id: "tatarstan",
    name: "Татарстан",
    tradition: "Нардуган",
    description: "Древний татарский праздник зимнего солнцестояния. Молодёжь ходит по домам с песнями и получает угощения. Традиционно готовят губадию (многослойный пирог) и чак-чак.",
    emoji: "🌙"
  },
  {
    id: "buryatia",
    name: "Бурятия",
    tradition: "Сагаалган",
    description: "Буряты отмечают Белый месяц (Сагаалган) по лунному календарю. На праздничном столе обязательно должна быть белая пища: молоко, творог, масло — символы чистоты и благополучия.",
    emoji: "🥛"
  },
  {
    id: "dagestan",
    name: "Дагестан",
    tradition: "Новруз Байрам",
    description: "Праздник весеннего равноденствия, отмечаемый горскими народами. Зажигают костры, накрывают богатый стол с традиционными блюдами, дарят подарки. Особое блюдо — сумалак из пророщенной пшеницы.",
    emoji: "🔥"
  },
  {
    id: "yakutia",
    name: "Якутия",
    tradition: "Ысыах",
    description: "Якутский Новый год отмечается в июне в день летнего солнцестояния. Проводятся традиционные игры, конные состязания. Обязательный напиток — кумыс из кобыльего молока.",
    emoji: "☀️"
  },
  {
    id: "chukotka",
    name: "Чукотка",
    tradition: "Кильвэй",
    description: "Праздник охотников на морского зверя. Чукчи благодарят духов моря за удачную охоту, устраивают праздничные танцы и состязания. Готовят строганину из свежей рыбы.",
    emoji: "🐋"
  },
  {
    id: "kalmykia",
    name: "Калмыкия",
    tradition: "Зул",
    description: "Праздник тысячи лампад. Калмыки в новогоднюю ночь зажигают огни, символизирующие просветление. По традиции готовят борцоки (жареные лепёшки) и калмыцкий чай с молоком и солью.",
    emoji: "🕯️"
  },
  {
    id: "karelia",
    name: "Карелия",
    tradition: "Калевальские руны",
    description: "В карельских деревнях сохранилась традиция петь калевальские руны — эпические песни о героях. Водят хороводы вокруг ели, готовят калитки (пирожки с начинкой) и уху из местной рыбы.",
    emoji: "🎵"
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
          <DialogContent className="max-w-2xl animate-scale-in">
            <DialogHeader>
              <div className="flex items-center gap-4 mb-4">
                <div className="text-6xl">{selectedRegion?.emoji}</div>
                <div>
                  <DialogTitle className="text-3xl font-heading font-bold text-primary mb-2">
                    {selectedRegion?.name}
                  </DialogTitle>
                  <p className="text-lg font-semibold text-secondary">
                    {selectedRegion?.tradition}
                  </p>
                </div>
              </div>
            </DialogHeader>
            <div className="mt-4">
              <p className="text-lg leading-relaxed text-foreground">
                {selectedRegion?.description}
              </p>
            </div>
            <div className="mt-6 flex items-center gap-2 text-muted-foreground">
              <Icon name="Sparkles" size={20} className="text-primary" />
              <span className="text-sm italic">
                Нажмите в любом месте, чтобы закрыть
              </span>
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
