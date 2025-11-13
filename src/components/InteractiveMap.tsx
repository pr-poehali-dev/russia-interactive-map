interface InteractiveMapProps {
  onRegionClick: (regionId: string) => void;
  hoveredRegion: string | null;
  onRegionHover: (regionId: string | null) => void;
}

interface RegionData {
  x: number;
  y: number;
  label: string;
  path: string;
}

const regionData: Record<string, RegionData> = {
  "saami": {
    x: 180, y: 80,
    label: "Кольский п-ов",
    path: "M140,50 L220,50 L230,90 L180,110 L130,90 Z"
  },
  "karelia": {
    x: 190, y: 150,
    label: "Карелия",
    path: "M130,120 L180,120 L190,180 L150,190 L120,160 Z"
  },
  "pomory": {
    x: 280, y: 120,
    label: "Архангельск",
    path: "M230,80 L350,80 L360,140 L300,160 L240,140 Z"
  },
  "mari-el": {
    x: 320, y: 280,
    label: "Марий Эл",
    path: "M300,260 L340,260 L345,300 L305,305 Z"
  },
  "chuvashia": {
    x: 310, y: 310,
    label: "Чувашия",
    path: "M285,295 L335,295 L340,325 L290,330 Z"
  },
  "tatarstan": {
    x: 330, y: 290,
    label: "Татарстан",
    path: "M310,270 L370,270 L375,310 L315,315 Z"
  },
  "udmurtia": {
    x: 360, y: 260,
    label: "Удмуртия",
    path: "M340,240 L380,240 L385,280 L345,285 Z"
  },
  "bashkortostan": {
    x: 370, y: 310,
    label: "Башкортостан",
    path: "M345,290 L395,290 L405,335 L355,340 Z"
  },
  "kalmykia": {
    x: 300, y: 400,
    label: "Калмыкия",
    path: "M265,380 L335,380 L340,420 L270,425 Z"
  },
  "ossetia": {
    x: 280, y: 420,
    label: "Осетия",
    path: "M250,405 L310,405 L315,435 L255,440 Z"
  },
  "buryatia": {
    x: 660, y: 330,
    label: "Бурятия/Тыва",
    path: "M600,300 L720,300 L730,360 L610,370 Z"
  },
  "yakutia": {
    x: 730, y: 220,
    label: "Якутия",
    path: "M640,140 L850,140 L870,280 L880,300 L650,320 Z"
  },
  "far-east": {
    x: 860, y: 330,
    label: "Дальний Восток",
    path: "M820,250 L920,260 L950,320 L940,400 L900,420 L830,380 Z"
  },
};

export default function InteractiveMap({ onRegionClick, hoveredRegion, onRegionHover }: InteractiveMapProps) {
  return (
    <div className="relative w-full max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"></div>
      
      <svg 
        viewBox="0 0 1000 500" 
        className="w-full h-auto"
        style={{ minHeight: '400px' }}
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {Object.entries(regionData).map(([regionId, data]) => {
          const isHovered = hoveredRegion === regionId;
          
          return (
            <g key={regionId}>
              <path
                d={data.path}
                fill={isHovered ? "hsl(197, 100%, 50%)" : "hsl(262, 83%, 58%)"}
                fillOpacity={isHovered ? "0.3" : "0.15"}
                stroke={isHovered ? "hsl(197, 100%, 50%)" : "hsl(262, 83%, 58%)"}
                strokeWidth={isHovered ? "3" : "2"}
                strokeOpacity={isHovered ? "0.8" : "0.4"}
                className="transition-all duration-300 cursor-pointer"
                onClick={() => onRegionClick(regionId)}
                onMouseEnter={() => onRegionHover(regionId)}
                onMouseLeave={() => onRegionHover(null)}
                filter={isHovered ? "url(#glow)" : ""}
              />
              
              <g
                onClick={() => onRegionClick(regionId)}
                onMouseEnter={() => onRegionHover(regionId)}
                onMouseLeave={() => onRegionHover(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={data.x}
                  cy={data.y}
                  r={isHovered ? "16" : "12"}
                  fill={isHovered ? "hsl(197, 100%, 50%)" : "hsl(262, 83%, 58%)"}
                  fillOpacity="0.9"
                  className="transition-all duration-300"
                  filter={isHovered ? "url(#glow)" : ""}
                />
                
                <circle
                  cx={data.x}
                  cy={data.y}
                  r="6"
                  fill="white"
                  className={isHovered ? "animate-pulse" : ""}
                />
                
                {isHovered && (
                  <>
                    <circle
                      cx={data.x}
                      cy={data.y}
                      r="24"
                      fill="hsl(197, 100%, 50%)"
                      fillOpacity="0.2"
                      className="animate-ping"
                    />
                    
                    <rect
                      x={data.x - 60}
                      y={data.y - 50}
                      width="120"
                      height="32"
                      rx="8"
                      fill="hsl(197, 100%, 50%)"
                      filter="url(#glow)"
                    />
                    <text
                      x={data.x}
                      y={data.y - 28}
                      textAnchor="middle"
                      fill="white"
                      fontSize="14"
                      fontWeight="600"
                      fontFamily="Montserrat, sans-serif"
                    >
                      {data.label}
                    </text>
                  </>
                )}
              </g>
            </g>
          );
        })}
        
        <text
          x="500"
          y="480"
          textAnchor="middle"
          fill="hsl(262, 83%, 58%)"
          fontSize="16"
          fontWeight="600"
          fontFamily="Montserrat, sans-serif"
        >
          👆 Нажмите на регион
        </text>
      </svg>
    </div>
  );
}
