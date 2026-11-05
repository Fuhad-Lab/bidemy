'use client';

/**
 * Icon mapping helper. The original pages used emojis in the canvas sidebar
 * (🏠 📝 ✅ ⏲️ 📅 🔗 🌓 🎥) and Font Awesome glyphs elsewhere; per the
 * migration rules those are replaced with the closest Material Icons.
 */

import * as React from 'react';
import AccountBalance from '@mui/icons-material/AccountBalance';
import AddPhotoAlternate from '@mui/icons-material/AddPhotoAlternate';
import AutoStories from '@mui/icons-material/AutoStories';
import Biotech from '@mui/icons-material/Biotech';
import Calculate from '@mui/icons-material/Calculate';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import Checklist from '@mui/icons-material/Checklist';
import DarkMode from '@mui/icons-material/DarkMode';
import LightMode from '@mui/icons-material/LightMode';
import Functions from '@mui/icons-material/Functions';
import Home from '@mui/icons-material/Home';
import Launch from '@mui/icons-material/Launch';
import Link from '@mui/icons-material/Link';
import MenuBook from '@mui/icons-material/MenuBook';
import RocketLaunch from '@mui/icons-material/RocketLaunch';
import School from '@mui/icons-material/School';
import Science from '@mui/icons-material/Science';
import Storefront from '@mui/icons-material/Storefront';
import StickyNote2 from '@mui/icons-material/StickyNote2';
import Timer from '@mui/icons-material/Timer';
import TrendingUp from '@mui/icons-material/TrendingUp';
import Videocam from '@mui/icons-material/Videocam';
import Edit from '@mui/icons-material/Edit';
import PhotoLibrary from '@mui/icons-material/PhotoLibrary';
import Notes from '@mui/icons-material/Notes';
import type { SvgIconComponent } from '@mui/icons-material';

const ICONS: Record<string, SvgIconComponent> = {
  AccountBalance,
  AddPhotoAlternate,
  AutoStories,
  Biotech,
  Calculate,
  CalendarMonth,
  Checklist,
  DarkMode,
  Edit,
  Functions,
  Home,
  Launch,
  LightMode,
  Link,
  MenuBook,
  Notes,
  PhotoLibrary,
  RocketLaunch,
  School,
  Science,
  Storefront,
  StickyNote2,
  Timer,
  TrendingUp,
  Videocam,
};

export function DynamicIcon({ name, ...rest }: { name: string } & Record<string, unknown>) {
  const Icon = ICONS[name] ?? Notes;
  return React.createElement(Icon, rest as React.ComponentProps<typeof Icon>);
}

export default DynamicIcon;
