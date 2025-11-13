import { useState } from "react";

interface InteractiveMapProps {
  onRegionClick: (regionId: string) => void;
  hoveredRegion: string | null;
  onRegionHover: (regionId: string | null) => void;
}

const regionCoordinates: Record<string, { x: string; y: string; label: string }> = {
  "saami": { x: "18%", y: "12%", label: "Кольский п-ов" },
  "karelia": { x: "19%", y: "22%", label: "Карелия" },
  "pomory": { x: "28%", y: "18%", label: "Архангельск" },
  "mari-el": { x: "32%", y: "42%", label: "Марий Эл" },
  "chuvashia": { x: "31%", y: "45%", label: "Чувашия" },
  "tatarstan": { x: "33%", y: "43%", label: "Татарстан" },
  "udmurtia": { x: "36%", y: "40%", label: "Удмуртия" },
  "bashkortostan": { x: "37%", y: "45%", label: "Башкортостан" },
  "kalmykia": { x: "30%", y: "58%", label: "Калмыкия" },
  "ossetia": { x: "28%", y: "60%", label: "Осетия" },
  "buryatia": { x: "66%", y: "48%", label: "Бурятия/Тыва" },
  "yakutia": { x: "73%", y: "32%", label: "Якутия" },
  "far-east": { x: "86%", y: "48%", label: "Дальний Восток" },
};

export default function InteractiveMap({ onRegionClick, hoveredRegion, onRegionHover }: InteractiveMapProps) {
  return (
    <div className="relative w-full max-w-5xl mx-auto aspect-[2/1] bg-white rounded-3xl shadow-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      
      <div className="relative w-full h-full p-8">
        <img 
          src="https://cdn.poehali.dev/files/4897a665-c464-455a-bd25-d0d594ebed6c.png" 
          alt="Карта России" 
          className="w-full h-full object-contain"
        />
        
        {Object.entries(regionCoordinates).map(([regionId, coords]) => {
          const isHovered = hoveredRegion === regionId;
          
          return (
            <button
              key={regionId}
              onClick={() => onRegionClick(regionId)}
              onMouseEnter={() => onRegionHover(regionId)}
              onMouseLeave={() => onRegionHover(null)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
              style={{ left: coords.x, top: coords.y }}
            >
              <div className={`
                relative transition-all duration-300
                ${isHovered ? 'scale-125' : 'scale-100'}
              `}>
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  transition-all duration-300 shadow-lg
                  ${isHovered 
                    ? 'bg-secondary ring-4 ring-secondary/30' 
                    : 'bg-primary/80 hover:bg-primary ring-2 ring-primary/20'
                  }
                `}>
                  <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                </div>
                
                <div className={`
                  absolute top-full left-1/2 transform -translate-x-1/2 mt-2
                  px-3 py-1.5 rounded-lg whitespace-nowrap
                  font-heading font-semibold text-sm
                  transition-all duration-300 pointer-events-none
                  ${isHovered 
                    ? 'bg-secondary text-white opacity-100 translate-y-0 shadow-xl' 
                    : 'bg-primary text-white opacity-0 translate-y-2'
                  }
                `}>
                  {coords.label}
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 
                    w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent 
                    border-b-secondary"></div>
                </div>
              </div>
              
              {isHovered && (
                <div className="absolute inset-0 animate-ping">
                  <div className="w-8 h-8 rounded-full bg-secondary/30"></div>
                </div>
              )}
            </button>
          );
        })}
      </div>
      
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center pointer-events-none z-20">
        <p className="text-sm font-heading font-semibold text-primary bg-white/90 px-4 py-2 rounded-full shadow-lg">
          👆 Нажмите на точку на карте
        </p>
      </div>
    </div>
  );
}