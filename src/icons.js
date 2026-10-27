// Ícones de linha (Lucide) + os desenhos próprios do PetConnect.
import Svg, { Circle, Path } from 'react-native-svg';

export {
  Bell,
  Calendar,
  CalendarCheck,
  Camera,
  Check as Tick,
  ChevronLeft,
  ChevronRight,
  Circle as CircleIcon,
  CircleCheck,
  Clock,
  EllipsisVertical,
  Eye,
  Globe,
  Heart,
  House,
  Info,
  Lock,
  MapPin,
  MessageSquare,
  Moon,
  Pencil,
  Plus,
  Search,
  Send,
  Share,
  SquareCheck,
  Trash,
  User,
  Users,
  X,
} from 'lucide-react-native';

// Pata: quatro dedos + almofada em forma de gota
export function Paw({ size = 24, color = '#000', strokeWidth = 1.93 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx="9.05" cy="5.9" r="1.41" fill={color} />
      <Circle cx="14.95" cy="5.9" r="1.41" fill={color} />
      <Circle cx="6.26" cy="9.76" r="1.41" fill={color} />
      <Circle cx="17.74" cy="9.76" r="1.41" fill={color} />
      <Path
        d="M12 12.1C14.3 12.1 17.3 15 17.3 17.4C17.3 19.4 15.1 20.4 12 20.4C8.9 20.4 6.7 19.4 6.7 17.4C6.7 15 9.7 12.1 12 12.1Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

// Só a almofada da pata (ícone de parque)
export function Pad({ size = 24, color = '#000', strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 7.8C14.3 7.8 17.3 10.7 17.3 13.1C17.3 15.1 15.1 16.1 12 16.1C8.9 16.1 6.7 15.1 6.7 13.1C6.7 10.7 9.7 7.8 12 7.8Z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

// Marcador de tarefa: círculo vazio ou com check
export function Check({ done, size = 24, color = '#000' }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="9" stroke={color} strokeWidth={2} />
      {done ? (
        <Path d="M8.2 12.2l2.6 2.6 5-5.2" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      ) : null}
    </Svg>
  );
}

// Ajustes: duas linhas com marcadores (filtros e configurações)
export function Tune({ size = 24, color = '#000', strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round">
      <Path d="M3.6 7h16.8" />
      <Path d="M16 3.6v6.8" />
      <Path d="M3.6 16.6h16.8" />
      <Path d="M8 13.2v6.8" />
    </Svg>
  );
}

// Xícara sem vapor (ícone de café)
export function Cup({ size = 24, color = '#000', strokeWidth = 2 }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 9h10v5a4 4 0 0 1-4 4h-2a4 4 0 0 1-4-4z"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <Path
        d="M16 10.5h1.5a2.25 2.25 0 0 1 0 4.5H16"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </Svg>
  );
}
