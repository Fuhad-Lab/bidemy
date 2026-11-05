#!/usr/bin/env node
/**
 * Bidemy content extraction pipeline.
 *
 * Reads the original fuhademy HTML site (cloned at /home/z/fuhademy) and produces:
 *   content/manifest.json                     — every route with metadata
 *   content/pages/<area>/<slug>.json          — per-page extracted data (body, css, quiz, tracker)
 *   content/hubs.json                         — synthetic hub definitions (folders without index.html)
 *   src/styles/content-utilities.css          — hand-generated utility CSS (no Tailwind!) for content classes
 *   public/site/**                            — referenced static assets (images, pdfs, PhET sims, ISPRING, CBT banks)
 *
 * Rules enforced:
 *   - scripts stripped (no Supabase/Firebase/backend) — quiz JSON extracted for React islands
 *   - Font Awesome <i> tags converted to Material Icons ligature spans
 *   - links rewritten to Next.js trailing-slash routes
 *   - interactive HTML apps (PhET sims, ISPRING, CBT engine) become iframe wrapper routes
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import * as cheerio from 'cheerio';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT = path.resolve(__dirname, '..');
const SRC = '/home/z/fuhademy';
const OUT_CONTENT = path.join(PROJECT, 'content');
const OUT_PAGES = path.join(OUT_CONTENT, 'pages');
const OUT_PUBLIC = path.join(PROJECT, 'public');
const SITE_ROOT = 'site'; // public/site/**
const CSS_OUT = path.join(PROJECT, 'src/styles/content-utilities.css');

const IMAGE_EXT = new Set(['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg', '.ico', '.avif']);
const MEDIA_EXT = new Set(['.mp4', '.webm', '.mp3', '.ogg', '.wav']);
const DOC_EXT = new Set(['.pdf', '.csv', '.txt', '.odt', '.doc', '.docx', '.pptx', '.xlsx', '.zip', '.glb', '.visuals']);
const ASSET_EXT = new Set([...IMAGE_EXT, ...MEDIA_EXT, ...DOC_EXT, '.woff', '.woff2', '.ttf', '.otf', '.json']);

/* ------------------------------------------------------------------ */
/* Font Awesome → Material Icons ligature mapping                      */
/* ------------------------------------------------------------------ */
const FA_MAP = {
  'fa-arrow-left': 'arrow_back', 'fa-arrow-right': 'arrow_forward', 'fa-arrow-up': 'arrow_upward',
  'fa-arrow-down': 'arrow_downward', 'fa-angle-left': 'chevron_left', 'fa-angle-right': 'chevron_right',
  'fa-angle-up': 'expand_less', 'fa-angle-down': 'expand_more', 'fa-chevron-left': 'chevron_left',
  'fa-chevron-right': 'chevron_right', 'fa-chevron-up': 'expand_less', 'fa-chevron-down': 'expand_more',
  'fa-caret-down': 'arrow_drop_down', 'fa-caret-up': 'arrow_drop_up', 'fa-caret-left': 'arrow_drop_left', 'fa-caret-right': 'arrow_drop_right',
  'fa-times': 'close', 'fa-xmark': 'close', 'fa-close': 'close', 'fa-check': 'check', 'fa-check-circle': 'check_circle',
  'fa-check-square': 'check_box', 'fa-info-circle': 'info', 'fa-info': 'info', 'fa-exclamation-circle': 'error_outline',
  'fa-exclamation-triangle': 'warning_amber', 'fa-question-circle': 'help', 'fa-question': 'help_outline',
  'fa-book': 'menu_book', 'fa-book-open': 'auto_stories', 'fa-book-reader': 'local_library',
  'fa-flask': 'science', 'fa-atom': 'atom', 'fa-vial': 'science', 'fa-vials': 'science',
  'fa-calculator': 'calculate', 'fa-lightbulb': 'lightbulb', 'fa-bulb': 'lightbulb', 'fa-lightbulb-o': 'lightbulb_outline',
  'fa-bullseye': 'adjust', 'fa-crosshairs': 'gps_fixed', 'fa-star': 'star', 'fa-star-o': 'star_outline',
  'fa-trophy': 'emoji_events', 'fa-medal': 'military_tech', 'fa-award': 'workspace_premium', 'fa-certificate': 'card_membership',
  'fa-play': 'play_arrow', 'fa-play-circle': 'play_circle', 'fa-pause': 'pause', 'fa-stop': 'stop',
  'fa-forward': 'fast_forward', 'fa-backward': 'fast_rewind', 'fa-step-forward': 'skip_next',
  'fa-download': 'download', 'fa-upload': 'upload', 'fa-search': 'search', 'fa-search-plus': 'zoom_in', 'fa-search-minus': 'zoom_out',
  'fa-user': 'person', 'fa-users': 'group', 'fa-user-graduate': 'school', 'fa-graduation-cap': 'school',
  'fa-student': 'school', 'fa-chalkboard-teacher': 'co_present', 'fa-user-tie': 'badge', 'fa-user-circle': 'account_circle',
  'fa-user-plus': 'person_add', 'fa-user-minus': 'person_remove', 'fa-user-check': 'how_to_reg',
  'fa-pen': 'edit', 'fa-pencil': 'edit', 'fa-pencil-alt': 'edit', 'fa-edit': 'edit', 'fa-pen-nib': 'draw',
  'fa-highlighter': 'highlight', 'fa-eraser': 'ink_eraser', 'fa-marker': 'edit',
  'fa-save': 'save', 'fa-home': 'home', 'fa-house': 'home', 'fa-dashboard': 'dashboard',
  'fa-calendar': 'calendar_month', 'fa-calendar-alt': 'calendar_month', 'fa-calendar-check': 'event_available',
  'fa-clock': 'schedule', 'fa-clock-o': 'schedule', 'fa-hourglass-half': 'hourglass_top',
  'fa-list': 'list', 'fa-list-ul': 'list', 'fa-list-ol': 'format_list_numbered', 'fa-tasks': 'checklist',
  'fa-clipboard': 'assignment', 'fa-clipboard-list': 'fact_check', 'fa-clipboard-check': 'task_alt',
  'fa-table': 'table_chart', 'fa-chart-bar': 'bar_chart', 'fa-chart-line': 'show_chart', 'fa-chart-pie': 'pie_chart',
  'fa-chart-area': 'area_chart', 'fa-graph': 'insights', 'fa-analytics': 'insights',
  'fa-cog': 'settings', 'fa-cogs': 'settings', 'fa-gear': 'settings', 'fa-tools': 'handyman', 'fa-wrench': 'build',
  'fa-link': 'link', 'fa-external-link': 'open_in_new', 'fa-external-link-alt': 'open_in_new',
  'fa-envelope': 'mail', 'fa-envelope-open': 'mail_outline', 'fa-phone': 'call', 'fa-phone-alt': 'call',
  'fa-map-marker': 'location_on', 'fa-map-marker-alt': 'location_on', 'fa-map': 'map', 'fa-compass': 'explore',
  'fa-fire': 'local_fire_department', 'fa-bolt': 'bolt', 'fa-bolt-lightning': 'bolt', 'fa-tint': 'water_drop',
  'fa-leaf': 'eco', 'fa-globe': 'public', 'fa-globe-africa': 'public', 'fa-earth-africa': 'public',
  'fa-rocket': 'rocket_launch', 'fa-microscope': 'biotech', 'fa-dna': 'biotech', 'fa-heart': 'favorite',
  'fa-heartbeat': 'monitor_heart', 'fa-brain': 'psychology', 'fa-eye': 'visibility', 'fa-eye-slash': 'visibility_off',
  'fa-lock': 'lock', 'fa-unlock': 'lock_open', 'fa-key': 'vpn_key', 'fa-sign-out': 'logout', 'fa-sign-out-alt': 'logout',
  'fa-sign-in': 'login', 'fa-sign-in-alt': 'login', 'fa-plus': 'add', 'fa-plus-circle': 'add_circle', 'fa-minus': 'remove',
  'fa-trash': 'delete', 'fa-trash-alt': 'delete_outline', 'fa-history': 'history', 'fa-undo': 'undo', 'fa-redo': 'redo',
  'fa-refresh': 'refresh', 'fa-sync': 'sync', 'fa-sync-alt': 'sync', 'fa-random': 'shuffle', 'fa-expand': 'unfold_more',
  'fa-compress': 'unfold_less', 'fa-expand-alt': 'open_in_full', 'fa-filter': 'filter_list', 'fa-sort': 'sort',
  'fa-sort-down': 'arrow_drop_down', 'fa-sort-up': 'arrow_drop_up', 'fa-tag': 'sell', 'fa-tags': 'style',
  'fa-folder': 'folder', 'fa-folder-open': 'folder_open', 'fa-file': 'description', 'fa-file-alt': 'article',
  'fa-file-pdf': 'picture_as_pdf', 'fa-file-word': 'article', 'fa-file-excel': 'table_view', 'fa-file-powerpoint': 'slideshow',
  'fa-file-download': 'download', 'fa-file-upload': 'upload', 'fa-image': 'image', 'fa-images': 'photo_library',
  'fa-picture-o': 'image', 'fa-video': 'videocam', 'fa-video-camera': 'videocam', 'fa-film': 'movie',
  'fa-music': 'music_note', 'fa-headphones': 'headphones', 'fa-microphone': 'mic', 'fa-camera': 'photo_camera',
  'fa-print': 'print', 'fa-copy': 'content_copy', 'fa-paste': 'content_paste', 'fa-cut': 'content_cut',
  'fa-comments': 'forum', 'fa-comment': 'chat_bubble_outline', 'fa-comment-alt': 'chat', 'fa-bell': 'notifications',
  'fa-bell-o': 'notifications_none', 'fa-bookmark': 'bookmark', 'fa-bookmark-o': 'bookmark_border',
  'fa-share': 'share', 'fa-share-alt': 'share', 'fa-thumbs-up': 'thumb_up', 'fa-thumbs-down': 'thumb_down',
  'fa-sun': 'wb_sunny', 'fa-moon': 'dark_mode', 'fa-cloud': 'cloud', 'fa-snowflake': 'ac_unit',
  'fa-thermometer': 'thermostat', 'fa-thermometer-half': 'device_thermostat', 'fa-water': 'water',
  'fa-wind': 'air', 'fa-fire-alt': 'local_fire_department', 'fa-flag': 'flag', 'fa-flag-checkered': 'sports_score',
  'fa-route': 'route', 'fa-road': 'edit_road', 'fa-shield': 'shield', 'fa-shield-alt': 'shield',
  'fa-balance-scale': 'balance', 'fa-scale': 'balance', 'fa-ruler': 'straighten', 'fa-ruler-combined': 'straighten',
  'fa-cube': 'view_in_ar', 'fa-cubes': 'widgets', 'fa-shapes': 'category', 'fa-shape': 'category',
  'fa-puzzle-piece': 'extension', 'fa-gamepad': 'sports_esports', 'fa-robot': 'smart_toy',
  'fa-terminal': 'terminal', 'fa-code': 'code', 'fa-bug': 'bug_report', 'fa-bug-fix': 'bug_report',
  'fa-paint-brush': 'brush', 'fa-palette': 'palette', 'fa-brush': 'brush', 'fa-swatchbook': 'palette',
  'fa-university': 'account_balance', 'fa-building': 'business', 'fa-bank': 'account_balance',
  'fa-money-bill': 'payments', 'fa-money-bill-wave': 'payments', 'fa-coins': 'paid', 'fa-dollar-sign': 'attach_money',
  'fa-naira-sign': 'currency_exchange', 'fa-percent': 'percent', 'fa-percentage': 'percent',
  'fa-shopping-cart': 'shopping_cart', 'fa-cart-plus': 'add_shopping_cart', 'fa-store': 'store',
  'fa-credit-card': 'credit_card', 'fa-wallet': 'account_balance_wallet', 'fa-receipt': 'receipt_long',
  'fa-invoice': 'receipt', 'fa-box': 'inventory_2', 'fa-boxes': 'inventory', 'fa-archive': 'inventory_2',
  'fa-truck': 'local_shipping', 'fa-database': 'storage', 'fa-server': 'dns', 'fa-wifi': 'wifi',
  'fa-signal': 'signal_cellular_alt', 'fa-battery-full': 'battery_full', 'fa-battery-three-quarters': 'battery_std',
  'fa-plug': 'power', 'fa-charging-station': 'electric_bolt', 'fa-lightbulb-on': 'lightbulb',
  'fa-magnet': 'attractions', 'fa-fingerprint': 'fingerprint', 'fa-id-card': 'badge', 'fa-language': 'language',
  'fa-translate': 'translate', 'fa-bullhorn': 'campaign', 'fa-paper-plane': 'send', 'fa-inbox': 'inbox',
  'fa-handshake': 'handshake', 'fa-hands-helping': 'volunteer_activism', 'fa-gift': 'card_giftcard',
  'fa-birthday-cake': 'cake', 'fa-smile': 'sentiment_satisfied', 'fa-frown': 'sentiment_dissatisfied',
  'fa-quote-left': 'format_quote', 'fa-quote-right': 'format_quote', 'fa-arrow-circle-right': 'arrow_circle_right',
  'fa-arrow-circle-left': 'arrow_circle_left', 'fa-arrow-circle-up': 'arrow_circle_up', 'fa-arrow-circle-down': 'arrow_circle_down',
  'fa-times-circle': 'cancel', 'fa-plus-square': 'add_box', 'fa-minus-square': 'indeterminate_check_box',
  'fa-caret-square-down': 'unfold_more', 'fa-bars': 'menu', 'fa-navicon': 'menu', 'fa-ellipsis-h': 'more_horiz',
  'fa-ellipsis-v': 'more_vert', 'fa-grip-horizontal': 'drag_indicator', 'fa-grip-vertical': 'drag_indicator',
  'fa-redo-alt': 'redo', 'fa-fast-backward': 'fast_rewind', 'fa-fast-forward': 'fast_forward',
  'fa-eject': 'eject', 'fa-volume-up': 'volume_up', 'fa-volume-mute': 'volume_off', 'fa-microphone-slash': 'mic_off',
  'fa-desktop': 'desktop_windows', 'fa-laptop': 'laptop', 'fa-mobile': 'smartphone', 'fa-mobile-alt': 'smartphone',
  'fa-tablet': 'tablet', 'fa-tv': 'tv', 'fa-projector': 'connected_tv', 'fa-keyboard': 'keyboard',
  'fa-mouse': 'mouse', 'fa-wifi-slash': 'wifi_off', 'fa-exchange-alt': 'swap_horiz',
  'fa-level-up': 'north', 'fa-level-down': 'south', 'fa-long-arrow-alt-right': 'east', 'fa-long-arrow-alt-left': 'west',
  'fa-circle': 'circle', 'fa-circle-o': 'radio_button_unchecked', 'fa-dot-circle': 'radio_button_checked',
  'fa-square': 'square', 'fa-square-o': 'crop_square', 'fa-bell-slash': 'notifications_off',
  'fa-chalkboard': 'chalkboard', 'fa-graduation-cap-alt': 'school', 'fa-sitemap': 'account_tree',
  'fa-network-wired': 'lan', 'fa-project-diagram': 'schema', 'fa-flow-chart': 'schema',
  'fa-broadcast-tower': 'cell_tower', 'fa-podcast': 'podcasts', 'fa-rss': 'rss_feed',
  'fa-cloud-download': 'cloud_download', 'fa-cloud-upload': 'cloud_upload', 'fa-spinner': 'autorenew',
  'fa-circle-notch': 'pending', 'fa-certificate-check': 'verified', 'fa-badge-check': 'verified',
  'fa-gem': 'diamond', 'fa-crown': 'workspace_premium', 'fa-feather': 'flight', 'fa-paperclip': 'attach_file',
  'fa-sticky-note': 'sticky_note_2', 'fa-sticky-note-o': 'sticky_note_2', 'fa-clock-four': 'schedule',
  'fa-stopwatch': 'timer', 'fa-timer': 'timer', 'fa-alarm-clock': 'alarm', 'fa-bell-ring': 'notifications_active',
  'fa-flask-vial': 'science', 'fa-test-tube': 'science', 'fa-test-tubes': 'science',
  'fa-fire-flame': 'local_fire_department', 'fa-temperature-high': 'device_thermostat', 'fa-temperature-low': 'device_thermostat',
  'fa-wind-turbine': 'wind_power', 'fa-solar-panel': 'solar_power', 'fa-battery-empty': 'battery_alert',
  'fa-tachometer': 'speed', 'fa-tachometer-alt': 'speed', 'fa-gauge': 'speed', 'fa-gauge-high': 'speed',
  'fa-balance-scale-left': 'balance', 'fa-balance-scale-right': 'balance',
  'fa-weight': 'fitness_center', 'fa-dumbbell': 'fitness_center', 'fa-running': 'directions_run',
  'fa-walking': 'directions_walk', 'fa-bicycle': 'pedal_bike', 'fa-car': 'directions_car', 'fa-plane': 'flight',
  'fa-train': 'train', 'fa-ship': 'directions_boat', 'fa-anchor': 'anchor', 'fa-life-ring': 'support',
  /* brands → neutral material equivalents */
  'fa-github': 'code', 'fa-github-alt': 'code', 'fa-gitlab': 'code', 'fa-google': 'language',
  'fa-facebook': 'thumb_up', 'fa-facebook-f': 'thumb_up', 'fa-twitter': 'alternate_email', 'fa-x-twitter': 'alternate_email',
  'fa-youtube': 'smart_display', 'fa-linkedin': 'work', 'fa-linkedin-in': 'work', 'fa-instagram': 'photo_camera',
  'fa-whatsapp': 'chat', 'fa-telegram': 'send', 'fa-discord': 'forum', 'fa-chrome': 'language',
  'fa-html5': 'code', 'fa-css3': 'code', 'fa-js': 'javascript', 'fa-react': 'code', 'fa-node-js': 'memory',
  'fa-python': 'functions', 'fa-npm': 'code', 'fa-android': 'android', 'fa-apple': 'phone_iphone',
  'fa-linux': 'terminal', 'fa-aws': 'cloud', 'fa-paypal': 'payment', 'fa-cc-visa': 'credit_card',
  'fa-internet-explorer': 'language', 'fa-edge': 'language', 'fa-safari': 'language', 'fa-firefox': 'language',
  'fa-wordpress': 'language', 'fa-shopify': 'store', 'fa-figma': 'draw', 'fa-slack': 'forum',
};

const FALLBACK_ICON = 'help_outline';

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */
const slugifyRoute = (rel) => rel.replace(/\\/g, '/').replace(/\.html?$/, '');
const sanitizeName = (n) => n.replace(/\s+/g, '-').replace(/[()]/g, '').replace(/,/g, '');
const ensureDir = (p) => fs.mkdirSync(p, { recursive: true });
const existsRepo = (rel) => fs.existsSync(path.join(SRC, rel));

const warn = (msg) => { (globalThis.__warnings ||= []).push(msg); };

/* ---------------- route map build ---------------- */
const pages = new Map();   // repo-rel .html path -> info
const wrappers = new Map(); // repo-rel path (html) -> wrapper info

// Directories whose html files are interactive third-party/static apps → wrapper routes
const WRAPPER_DIRS = [
  'students/subjects/waves',
  'students/subjects/physics/electricity/electricity',
  'students/subjects/physics/fields/fields-sims',
];
const WRAPPER_FILES = new Set([
  'students/cbt/cbt.html',
]);
const WRAPPER_BUNDLE_ROOTS = [
  'students/subjects/ISPRING',
  'students/subjects/physics/electricity/Steps',
  'students/subjects/physics/electricity/Steps (Published)',
];
// Explicit routes owned by hand-built React pages (pipeline skips them)
const SKIP_EXACT = new Set([
  'index.html', // root landing → hand-built MUI (agent A)
  'students/student-dashboard.html',
  'students/student-dashboard1.html',
  'students/student-dashboard2.html',
  'students/student-dashboard-modern.html',
  'students/student-dashboard-secure.html',
  'students/student-dashboard-supabase.html',
  'students/student-dashboard.html.backup',
  'students/simple-machines-module/index.html',
  'students/chemistry-modules/electrolysis/index.html',
  'students/practical/simple-machines/index.html',
  'students/practical/physics/simple-pendulum.html',
]);
const SKIP_DIRS = [
  'teachers/',
  'students/practical/',        // agents B & C own every practical route
  'students/InteractiveChemLab/', // unreferenced Vite source app
  'students/cbt/temp_pages/',
  'students/cbt/pdf_pages/',
  'students/cbt/pdfs/',
];

const isWrapperPath = (rel) =>
  WRAPPER_DIRS.some((d) => rel.startsWith(d + '/')) ||
  WRAPPER_FILES.has(rel) ||
  WRAPPER_BUNDLE_ROOTS.some((d) => rel.startsWith(d + '/')) ||
  WRAPPER_BUNDLE_ROOTS.some((d) => rel === d);

const isSkipPath = (rel) =>
  SKIP_EXACT.has(rel) ||
  SKIP_DIRS.some((d) => rel.startsWith(d)) ||
  rel.endsWith('.backup') ||
  /(^|\/)(node_modules|\.netlify)\//.test(rel);

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) walk(full, out);
    else out.push(full);
  }
  return out;
}

/* ------------------------------------------------------------------ */
/* Utility CSS generator (plain CSS replicating used utility classes)  */
/* ------------------------------------------------------------------ */
const COLORS = {
  slate: ['#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569', '#334155', '#1e293b', '#0f172a', '#020617'],
  gray: ['#f9fafb', '#f3f4f6', '#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563', '#374151', '#1f2937', '#111827', '#030712'],
  zinc: ['#fafafa', '#f4f4f5', '#e4e4e7', '#d4d4d8', '#a1a1aa', '#71717a', '#52525b', '#3f3f46', '#27272a', '#18181b', '#09090b'],
  neutral: ['#fafafa', '#f5f5f5', '#e5e5e5', '#d4d4d4', '#a3a3a3', '#737373', '#525252', '#404040', '#262626', '#171717', '#0a0a0a'],
  stone: ['#fafaf9', '#f5f5f4', '#e7e5e4', '#d6d3d1', '#a8a29e', '#78716c', '#57534e', '#44403c', '#292524', '#1c1917', '#0c0a09'],
  red: ['#fef2f2', '#fee2e2', '#fecaca', '#fca5a5', '#f87171', '#ef4444', '#dc2626', '#b91c1c', '#991b1b', '#7f1d1d', '#450a0a'],
  orange: ['#fff7ed', '#ffedd5', '#fed7aa', '#fdba74', '#fb923c', '#f97316', '#ea580c', '#c2410c', '#9a3412', '#7c2d12', '#431407'],
  amber: ['#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#fbbf24', '#f59e0b', '#d97706', '#b45309', '#92400e', '#78350f', '#451a03'],
  yellow: ['#fefce8', '#fef9c3', '#fef08a', '#fde047', '#facc15', '#eab308', '#ca8a04', '#a16207', '#854d0e', '#713f12', '#422006'],
  lime: ['#f7fee7', '#ecfccb', '#d9f99d', '#bef264', '#a3e635', '#84cc16', '#65a30d', '#4d7c0f', '#3f6212', '#365314', '#1a2e05'],
  green: ['#f0fdf4', '#dcfce7', '#bbf7d0', '#86efac', '#4ade80', '#22c55e', '#16a34a', '#15803d', '#166534', '#14532d', '#052e16'],
  emerald: ['#ecfdf5', '#d1fae5', '#a7f3d0', '#6ee7b7', '#34d399', '#10b981', '#059669', '#047857', '#065f46', '#064e3b', '#022c22'],
  teal: ['#f0fdfa', '#ccfbf1', '#99f6e4', '#5eead4', '#2dd4bf', '#14b8a6', '#0d9488', '#0f766e', '#115e59', '#134e4a', '#042f2e'],
  cyan: ['#ecfeff', '#cffafe', '#a5f3fc', '#67e8f9', '#22d3ee', '#06b6d4', '#0891b2', '#0e7490', '#155e75', '#164e63', '#083344'],
  sky: ['#f0f9ff', '#e0f2fe', '#bae6fd', '#7dd3fc', '#38bdf8', '#0ea5e9', '#0284c7', '#0369a1', '#075985', '#0c4a6e', '#082f49'],
  blue: ['#eff6ff', '#dbeafe', '#bfdbfe', '#93c5fd', '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8', '#1e40af', '#1e3a8a', '#172554'],
  indigo: ['#eef2ff', '#e0e7ff', '#c7d2fe', '#a5b4fc', '#818cf8', '#6366f1', '#4f46e5', '#4338ca', '#3730a3', '#312e81', '#1e1b4b'],
  violet: ['#f5f3ff', '#ede9fe', '#ddd6fe', '#c4b5fd', '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6', '#4c1d95', '#2e1065'],
  purple: ['#faf5ff', '#f3e8ff', '#e9d5ff', '#d8b4fe', '#c084fc', '#a855f7', '#9333ea', '#7e22ce', '#6b21a8', '#581c87', '#3b0764'],
  fuchsia: ['#fdf4ff', '#fae8ff', '#f5d0fe', '#f0abfc', '#e879f9', '#d946ef', '#c026d3', '#a21caf', '#86198f', '#701a75', '#4a044e'],
  pink: ['#fdf2f8', '#fce7f3', '#fbcfe8', '#f9a8d4', '#f472b6', '#ec4899', '#db2777', '#be185d', '#9d174d', '#831843', '#500724'],
  rose: ['#fff1f2', '#ffe4e6', '#fecdd3', '#fda4af', '#fb7185', '#f43f5e', '#e11d48', '#be123c', '#9f1239', '#881337', '#4c0519'],
};
const SHADE_IX = { 50: 0, 100: 1, 200: 2, 300: 3, 400: 4, 500: 5, 600: 6, 700: 7, 800: 8, 900: 9, 950: 10 };
const TEXT_SIZES = {
  xs: ['0.75rem', '1rem'], sm: ['0.875rem', '1.25rem'], base: ['1rem', '1.5rem'],
  lg: ['1.125rem', '1.75rem'], xl: ['1.25rem', '1.75rem'], '2xl': ['1.5rem', '2rem'],
  '3xl': ['1.875rem', '2.25rem'], '4xl': ['2.25rem', '2.5rem'], '5xl': ['3rem', '1.1'],
  '6xl': ['3.75rem', '1'], '7xl': ['4.5rem', '1'], '8xl': ['6rem', '1'], '9xl': ['8rem', '1'],
};
const FONT_WEIGHTS = { thin: 100, extralight: 200, light: 300, normal: 400, medium: 500, semibold: 600, bold: 700, extrabold: 800, black: 900 };
const RADII = { none: '0', sm: '0.125rem', DEFAULT: '0.25rem', md: '0.375rem', lg: '0.5rem', xl: '0.75rem', '2xl': '1rem', '3xl': '1.5rem', full: '9999px' };
const SHADOWS = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  none: 'none',
};
const BREAKPOINTS = { sm: 640, md: 768, lg: 1024, xl: 1280, '2xl': 1536 };
const SPACING_STEP = '0.25rem'; // 1 unit = 0.25rem
const spacingVal = (n) => (n === 0.5 ? '0.125rem' : n === 1.5 ? '0.375rem' : n === 2.5 ? '0.625rem' : n === 3.5 ? '0.875rem' : `calc(${SPACING_STEP} * ${n})`);

function colorToken(hue, shade) {
  const list = COLORS[hue];
  if (!list) return null;
  const ix = SHADE_IX[shade];
  if (ix === undefined) return null;
  return list[ix];
}

const emitted = new Set();
function emit(selector, body, { media, mediaFirst } = {}) {
  const key = selector + '::' + body + '::' + (media || '');
  if (emitted.has(key)) return;
  emitted.add(key);
  (globalThis.__cssRules ||= []).push({ selector, body, media, mediaFirst });
}

function parseToken(raw) {
  // returns {variant: 'hover'|'md'|..., prop, args} or null
  let s = raw;
  let variant = null;
  if (s.startsWith('hover:')) { variant = 'hover'; s = s.slice(6); }
  else if (s.startsWith('focus:')) { variant = 'focus'; s = s.slice(6); }
  else if (s.startsWith('group-hover:')) { variant = 'group-hover'; s = s.slice(12); }
  else if (s.startsWith('dark:')) { variant = null; return { skip: true }; }
  const bpMatch = s.match(/^(sm|md|lg|xl|2xl):/);
  if (bpMatch) { variant = variant ? variant + '-' + bpMatch[1] : bpMatch[1]; s = s.slice(bpMatch[0].length); }
  return { variant, token: s };
}

function handleToken(raw) {
  const p = parseToken(raw);
  if (!p || p.skip) return;
  const { variant, token: t } = p;
  const esc = raw.replace(/([:.:/\\])/g, '\\$1').replace(/--/g, '--');

  const E = (body) => {
    let selector = '.' + esc;
    if (variant === 'hover') selector = '.' + esc.replace(/^hover\\:/, '') + ':hover';
    else if (variant === 'focus') selector = '.' + esc.replace(/^focus\\:/, '') + ':focus';
    else if (variant === 'group-hover') selector = '.group:hover .' + esc.replace(/^group-hover\\:/, '');
    if (variant && /\-(sm|md|lg|xl|2xl)$/.test(variant)) {
      const bp = variant.split('-')[1];
      emit(selector, body, { media: `(min-width: ${BREAKPOINTS[bp]}px)` });
    } else emit(selector, body);
  };

  // colors: text-<hue>-<shade>, bg-, border-
  let m;
  if ((m = t.match(/^text-([a-z]+)-(\d{2,3})$/)) && colorToken(m[1], m[2])) { E(`color: ${colorToken(m[1], m[2])};`); return; }
  if ((m = t.match(/^text-(white|black)$/))) { E(`color: ${m[1] === 'white' ? '#fff' : '#000'};`); return; }
  if ((m = t.match(/^bg-([a-z]+)-(\d{2,3})$/)) && colorToken(m[1], m[2])) { E(`background-color: ${colorToken(m[1], m[2])};`); return; }
  if ((m = t.match(/^bg-(white|black)$/))) { E(`background-color: ${m[1] === 'white' ? '#fff' : '#000'};`); return; }
  if ((m = t.match(/^border-([a-z]+)-(\d{2,3})$/)) && colorToken(m[1], m[2])) { E(`border-color: ${colorToken(m[1], m[2])};`); return; }
  if ((m = t.match(/^border-(white|black)$/))) { E(`border-color: ${m[1] === 'white' ? '#fff' : '#000'};`); return; }
  if ((m = t.match(/^from-([a-z]+)-(\d{2,3})$/)) && colorToken(m[1], m[2])) { E(`--bid-from: ${colorToken(m[1], m[2])};`); return; }
  if ((m = t.match(/^via-([a-z]+)-(\d{2,3})$/)) && colorToken(m[1], m[2])) { E(`--bid-via: ${colorToken(m[1], m[2])};`); return; }
  if ((m = t.match(/^to-([a-z]+)-(\d{2,3})$/)) && colorToken(m[1], m[2])) { E(`--bid-to: ${colorToken(m[1], m[2])};`); return; }
  if ((m = t.match(/^from-(white|black)$/))) { E(`--bid-from: ${m[1] === 'white' ? '#fff' : '#000'};`); return; }
  if ((m = t.match(/^to-(white|black)$/))) { E(`--bid-to: ${m[1] === 'white' ? '#fff' : '#000'};`); return; }
  if ((m = t.match(/^ring-([a-z]+)-(\d{2,3})$/)) && colorToken(m[1], m[2])) { E(`--bid-ring-color: ${colorToken(m[1], m[2])};`); return; }

  // gradients
  if ((m = t.match(/^bg-gradient-to-(t|b|r|l|tr|tl|br|bl)$/))) {
    const dirs = { t: 'to top', b: 'to bottom', r: 'to right', l: 'to left', tr: 'to top right', tl: 'to top left', br: 'to bottom right', bl: 'to bottom left' };
    E(`background-image: linear-gradient(${dirs[m[1]]}, var(--bid-from, #e5e7eb), var(--bid-to, #e5e7eb));`); return;
  }
  if (t === 'bg-gradient-to-r' || t === 'bg-gradient-to-br') { /* handled above */ }

  // text sizes
  if (TEXT_SIZES[t.replace(/^text-/, '')] && t.startsWith('text-')) {
    const [fs2, lh] = TEXT_SIZES[t.replace(/^text-/, '')];
    E(`font-size: ${fs2}; line-height: ${lh};`); return;
  }
  // font weights
  if ((m = t.match(/^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/))) { E(`font-weight: ${FONT_WEIGHTS[m[1]]};`); return; }
  if (t === 'italic') { E('font-style: italic;'); return; }
  if (t === 'not-italic') { E('font-style: normal;'); return; }
  if ((m = t.match(/^tracking-(tight|tighter|normal|wide|wider|widest)$/))) {
    const v = { tight: '-0.025em', tighter: '-0.05em', normal: '0em', wide: '0.025em', wider: '0.05em', widest: '0.1em' }[m[1]];
    E(`letter-spacing: ${v};`); return;
  }
  if ((m = t.match(/^leading-(none|tight|snug|normal|relaxed|loose)$/))) {
    const v = { none: 1, tight: 1.25, snug: 1.375, normal: 1.5, relaxed: 1.625, loose: 2 }[m[1]];
    E(`line-height: ${v};`); return;
  }
  if ((m = t.match(/^leading-(\d+)$/))) { E(`line-height: ${spacingVal(+m[1])};`); return; }
  if (t === 'uppercase') { E('text-transform: uppercase;'); return; }
  if (t === 'lowercase') { E('text-transform: lowercase;'); return; }
  if (t === 'capitalize') { E('text-transform: capitalize;'); return; }
  if (t === 'underline') { E('text-decoration-line: underline;'); return; }
  if (t === 'no-underline') { E('text-decoration-line: none;'); return; }
  if (t === 'line-through') { E('text-decoration-line: line-through;'); return; }
  if (t === 'truncate') { E('overflow: hidden; text-overflow: ellipsis; white-space: nowrap;'); return; }
  if (t === 'whitespace-nowrap') { E('white-space: nowrap;'); return; }
  if (t === 'whitespace-pre-wrap') { E('white-space: pre-wrap;'); return; }
  if (t === 'break-words') { E('overflow-wrap: break-word;'); return; }

  // display
  const displays = { block: 'block', 'inline-block': 'inline-block', inline: 'inline', flex: 'flex', 'inline-flex': 'inline-flex', grid: 'grid', hidden: 'none', table: 'table', contents: 'contents', 'flow-root': 'flow-root' };
  if (displays[t]) { E(`display: ${displays[t]};`); return; }

  // flex / grid
  if (t === 'flex-row') { E('flex-direction: row;'); return; }
  if (t === 'flex-col') { E('flex-direction: column;'); return; }
  if (t === 'flex-row-reverse') { E('flex-direction: row-reverse;'); return; }
  if (t === 'flex-col-reverse') { E('flex-direction: column-reverse;'); return; }
  if (t === 'flex-wrap') { E('flex-wrap: wrap;'); return; }
  if (t === 'flex-nowrap') { E('flex-wrap: nowrap;'); return; }
  if (t === 'flex-1') { E('flex: 1 1 0%;'); return; }
  if (t === 'flex-auto') { E('flex: 1 1 auto;'); return; }
  if (t === 'flex-none') { E('flex: none;'); return; }
  if (t === 'shrink-0') { E('flex-shrink: 0;'); return; }
  if (t === 'shrink') { E('flex-shrink: 1;'); return; }
  if (t === 'grow') { E('flex-grow: 1;'); return; }
  if (t === 'grow-0') { E('flex-grow: 0;'); return; }
  if ((m = t.match(/^items-(start|end|center|baseline|stretch)$/))) { E(`align-items: ${m[1] === 'start' ? 'flex-start' : m[1] === 'end' ? 'flex-end' : m[1]};`); return; }
  if ((m = t.match(/^justify-(start|end|center|between|around|evenly)$/))) {
    const v = { start: 'flex-start', end: 'flex-end', center: 'center', between: 'space-between', around: 'space-around', evenly: 'space-evenly' }[m[1]];
    E(`justify-content: ${v};`); return;
  }
  if ((m = t.match(/^self-(start|end|center|baseline|stretch|auto)$/))) { E(`align-self: ${m[1] === 'start' ? 'flex-start' : m[1] === 'end' ? 'flex-end' : m[1]};`); return; }
  if (t === 'content-center') { E('align-content: center;'); return; }
  if ((m = t.match(/^gap-(\d+(?:\.\d+)?)$/))) { E(`gap: ${spacingVal(+m[1])};`); return; }
  if ((m = t.match(/^gap-x-(\d+(?:\.\d+)?)$/))) { E(`column-gap: ${spacingVal(+m[1])};`); return; }
  if ((m = t.match(/^gap-y-(\d+(?:\.\d+)?)$/))) { E(`row-gap: ${spacingVal(+m[1])};`); return; }
  if ((m = t.match(/^grid-cols-(\d{1,2})$/))) { E(`grid-template-columns: repeat(${m[1]}, minmax(0, 1fr));`); return; }
  if ((m = t.match(/^col-span-(\d{1,2})$/))) { E(`grid-column: span ${m[1]} / span ${m[1]};`); return; }
  if (t === 'col-span-full') { E('grid-column: 1 / -1;'); return; }
  if ((m = t.match(/^row-span-(\d{1,2})$/))) { E(`grid-row: span ${m[1]} / span ${m[1]};`); return; }
  if ((m = t.match(/^basis-(\d+(?:\/\d+))?$/)) && m[1]?.includes('/')) {
    const [a, b] = m[1].split('/').map(Number);
    E(`flex-basis: ${(a / b) * 100}%;`); return;
  }
  if ((m = t.match(/^space-x-(\d+(?:\.\d+)?)$/))) { const H = String.fromCharCode(91) + 'hidden' + String.fromCharCode(93); emit('.' + esc, '> :not(' + H + ') ~ :not(' + H + ') { margin-left: ' + spacingVal(+m[1]) + '; }'); return; }
  if ((m = t.match(/^space-y-(\d+(?:\.\d+)?)$/))) { const H = String.fromCharCode(91) + 'hidden' + String.fromCharCode(93); emit('.' + esc, '> :not(' + H + ') ~ :not(' + H + ') { margin-top: ' + spacingVal(+m[1]) + '; }'); return; }

  // spacing p/m
  const sideMap = { p: ['padding'], px: ['padding-left', 'padding-right'], py: ['padding-top', 'padding-bottom'], pt: ['padding-top'], pb: ['padding-bottom'], pl: ['padding-left'], pr: ['padding-right'], m: ['margin'], mx: ['margin-left', 'margin-right'], my: ['margin-top', 'margin-bottom'], mt: ['margin-top'], mb: ['margin-bottom'], ml: ['margin-left'], mr: ['margin-right'] };
  if ((m = t.match(/^(p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr)-(\d+(?:\.\d+)?|auto)$/))) {
    const sides = sideMap[m[1]];
    if (m[2] === 'auto') { E(sides.map((s) => `${s}: auto;`).join(' ')); return; }
    const v = spacingVal(+m[2]);
    E(sides.map((s) => `${s}: ${v};`).join(' ')); return;
  }
  if ((m = t.match(/^-?(p|m|px|py|pt|pb|pl|pr|mx|my|mt|mb|ml|mr)-(\d+(?:\.\d+)?)$/))) { /* negative handled below */ }

  // width/height
  if (t === 'w-full') { E('width: 100%;'); return; }
  if (t === 'w-screen') { E('width: 100vw;'); return; }
  if (t === 'w-auto') { E('width: auto;'); return; }
  if (t === 'w-fit') { E('width: fit-content;'); return; }
  if ((m = t.match(/^w-(\d+(?:\.\d+)?)$/))) { E(`width: ${spacingVal(+m[1])};`); return; }
  if ((m = t.match(/^w-(\d+)\/(\d+)$/))) { E(`width: ${(m[1] / m[2]) * 100}%;`); return; }
  if (t === 'h-full') { E('height: 100%;'); return; }
  if (t === 'h-screen') { E('height: 100vh;'); return; }
  if (t === 'h-auto') { E('height: auto;'); return; }
  if ((m = t.match(/^h-(\d+(?:\.\d+)?)$/))) { E(`height: ${spacingVal(+m[1])};`); return; }
  if ((m = t.match(/^h-(\d+)\/(\d+)$/))) { E(`height: ${(m[1] / m[2]) * 100}%;`); return; }
  if (t === 'min-h-screen') { E('min-height: 100vh;'); return; }
  if (t === 'min-h-0') { E('min-height: 0;'); return; }
  if (t === 'min-w-0') { E('min-width: 0;'); return; }
  if ((m = t.match(/^min-h-(\d+(?:\.\d+)?)$/))) { E(`min-height: ${spacingVal(+m[1])};`); return; }
  if ((m = t.match(/^max-w-(xs|sm|md|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|full|none|prose|screen-xl|screen-lg)$/))) {
    const v = { xs: '20rem', sm: '24rem', md: '28rem', lg: '32rem', xl: '36rem', '2xl': '42rem', '3xl': '48rem', '4xl': '56rem', '5xl': '64rem', '6xl': '72rem', '7xl': '80rem', full: '100%', none: 'none', prose: '65ch', 'screen-xl': '1280px', 'screen-lg': '1024px' }[m[1]];
    if (v) { E(`max-width: ${v};`); return; }
  }
  if (t === 'max-w-7xl' || t === 'max-w-screen-xl') { E('max-width: 80rem;'); return; }
  if ((m = t.match(/^max-h-(\d+(?:\.\d+)?)$/))) { E(`max-height: ${spacingVal(+m[1])};`); return; }
  if (t === 'max-h-full') { E('max-height: 100%;'); return; }
  if (t === 'mx-auto') { E('margin-left: auto; margin-right: auto;'); return; }
  if (t === 'ml-auto') { E('margin-left: auto;'); return; }
  if (t === 'mr-auto') { E('margin-right: auto;'); return; }
  if (t === 'mt-auto') { E('margin-top: auto;'); return; }

  // position
  if (['relative', 'absolute', 'fixed', 'sticky', 'static'].includes(t)) { E(`position: ${t};`); return; }
  if ((m = t.match(/^(top|bottom|left|right|inset)-(0|1|2|4|6|8|10|1\.5|2\.5|3\.5|auto|full)$/))) {
    const v = m[2] === 'auto' ? 'auto' : m[2] === 'full' ? '100%' : spacingVal(+m[2]);
    if (m[1] === 'inset') E(`top: ${v}; right: ${v}; bottom: ${v}; left: ${v};`);
    else E(`${m[1]}: ${v};`);
    return;
  }
  if (t === 'top-0') { E('top: 0;'); return; }
  if (t === 'left-0') { E('left: 0;'); return; }
  if (t === 'right-0') { E('right: 0;'); return; }
  if (t === 'bottom-0') { E('bottom: 0;'); return; }
  if (t === 'inset-0') { E('top: 0; right: 0; bottom: 0; left: 0;'); return; }
  if (t === 'inset-x-0') { E('left: 0; right: 0;'); return; }
  if ((m = t.match(/^z-(\d+)$/))) { E(`z-index: ${m[1]};`); return; }
  if (t === 'overflow-hidden') { E('overflow: hidden;'); return; }
  if (t === 'overflow-x-auto') { E('overflow-x: auto;'); return; }
  if (t === 'overflow-y-auto') { E('overflow-y: auto;'); return; }
  if (t === 'overflow-auto') { E('overflow: auto;'); return; }
  if (t === 'overflow-visible') { E('overflow: visible;'); return; }
  if (t === 'overflow-x-hidden') { E('overflow-x: hidden;'); return; }
  if (t === 'object-cover') { E('object-fit: cover;'); return; }
  if (t === 'object-contain') { E('object-fit: contain;'); return; }

  // borders & radius
  if (t === 'border') { E('border-width: 1px; border-style: solid;'); return; }
  if ((m = t.match(/^border-(\d+)$/))) { E(`border-width: ${m[1]}px; border-style: solid;`); return; }
  if (t === 'border-0') { E('border-width: 0;'); return; }
  if (t === 'border-t') { E('border-top-width: 1px; border-top-style: solid;'); return; }
  if (t === 'border-b') { E('border-bottom-width: 1px; border-bottom-style: solid;'); return; }
  if (t === 'border-l') { E('border-left-width: 1px; border-left-style: solid;'); return; }
  if (t === 'border-r') { E('border-right-width: 1px; border-right-style: solid;'); return; }
  if ((m = t.match(/^border-(t|b|l|r)-(\d+)$/))) {
    const side = { t: 'top', b: 'bottom', l: 'left', r: 'right' }[m[1]];
    E(`border-${side}-width: ${m[2]}px; border-${side}-style: solid;`); return;
  }
  if (t === 'border-solid') { E('border-style: solid;'); return; }
  if (t === 'border-dashed') { E('border-style: dashed;'); return; }
  if ((m = t.match(/^border-(t|b|l|r)-([a-z]+)-(\d{2,3})$/)) && colorToken(m[2], m[3])) { E(`border-${{ t: 'top', b: 'bottom', l: 'left', r: 'right' }[m[1]]}-color: ${colorToken(m[2], m[3])};`); return; }
  if ((m = t.match(/^rounded(-(?:(none|sm|md|lg|xl|2xl|3xl|full|t|b|l|r|tl|tr|bl|br|t-lg|b-lg|t-xl|b-xl|t-2xl|b-2xl|t-3xl|b-3xl|t-full|b-full)))?$/))) {
    const suffix = m[1] ? m[1].slice(1) : null;
    if (!suffix) { E(`border-radius: ${RADII.DEFAULT};`); return; }
    const map = {
      none: '0', sm: RADII.sm, md: RADII.md, lg: RADII.lg, xl: RADII.xl, '2xl': RADII['2xl'], '3xl': RADII['3xl'], full: RADII.full,
      t: `${RADII.DEFAULT} ${RADII.DEFAULT} 0 0`, b: `0 0 ${RADII.DEFAULT} ${RADII.DEFAULT}`, l: `${RADII.DEFAULT} 0 0 ${RADII.DEFAULT}`, r: `0 ${RADII.DEFAULT} ${RADII.DEFAULT} 0`,
      tl: `${RADII.DEFAULT} 0 0 0`, tr: `0 ${RADII.DEFAULT} 0 0`, bl: `0 0 0 ${RADII.DEFAULT}`, br: `0 0 ${RADII.DEFAULT} 0`,
      't-lg': `${RADII.lg} ${RADII.lg} 0 0`, 'b-lg': `0 0 ${RADII.lg} ${RADII.lg}`,
      't-xl': `${RADII.xl} ${RADII.xl} 0 0`, 'b-xl': `0 0 ${RADII.xl} ${RADII.xl}`,
      't-2xl': `${RADII['2xl']} ${RADII['2xl']} 0 0`, 'b-2xl': `0 0 ${RADII['2xl']} ${RADII['2xl']}`,
      't-3xl': `${RADII['3xl']} ${RADII['3xl']} 0 0`, 'b-3xl': `0 0 ${RADII['3xl']} ${RADII['3xl']}`,
      't-full': `${RADII.full} ${RADII.full} 0 0`, 'b-full': `0 0 ${RADII.full} ${RADII.full}`,
    };
    E(`border-radius: ${map[suffix]};`); return;
  }

  // shadows
  if ((m = t.match(/^shadow(-(?:(sm|md|lg|xl|2xl|inner|none)))?$/))) { E('box-shadow: ' + SHADOWS[(m[1] ? m[1].slice(1) : 'DEFAULT')] + ';'); return; }

  // opacity / effects
  if ((m = t.match(/^opacity-(\d+)$/))) { E(`opacity: ${m[1] / 100};`); return; }
  if ((m = t.match(/^backdrop-blur(-(?:(sm|md|lg|xl|2xl)))?$/))) {
    const v = { sm: '4px', md: '8px', lg: '16px', xl: '24px', '2xl': '40px' }[(m[1] ? m[1].slice(1) : '')] || '8px';
    E(`backdrop-filter: blur(${v}); -webkit-backdrop-filter: blur(${v});`); return;
  }
  if ((m = t.match(/^blur(-(?:(sm|md|lg|xl|2xl)))?$/))) { const v = { sm: '4px', md: '8px', lg: '16px', xl: '24px', '2xl': '40px' }[(m[1] ? m[1].slice(1) : '')] || '8px'; E(`filter: blur(${v});`); return; }
  if ((m = t.match(/^scale-(\d+)$/))) { E(`transform: scale(${m[1] / 100});`); return; }
  if ((m = t.match(/^(translate|rotate|skew)/))) { /* rare in content; ignore */ }
  if (t === 'transform') { E('transform: translate(var(--bid-tx, 0), var(--bid-ty, 0)) scale(var(--bid-s, 1));'); return; }

  // transitions
  if (t === 'transition') { E('transition-property: color, background-color, border-color, fill, stroke, opacity, box-shadow, transform; transition-duration: 150ms; transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);'); return; }
  if (t === 'transition-all') { E('transition-property: all; transition-duration: 150ms;'); return; }
  if (t === 'transition-colors') { E('transition-property: color, background-color, border-color, fill, stroke; transition-duration: 150ms;'); return; }
  if (t === 'transition-transform') { E('transition-property: transform; transition-duration: 150ms;'); return; }
  if ((m = t.match(/^duration-(\d+)$/))) { E(`transition-duration: ${m[1]}ms;`); return; }
  if ((m = t.match(/^delay-(\d+)$/))) { E(`transition-delay: ${m[1]}ms;`); return; }
  if (t === 'ease-in') { E('transition-timing-function: cubic-bezier(0.4, 0, 1, 1);'); return; }
  if (t === 'ease-out') { E('transition-timing-function: cubic-bezier(0, 0, 0.2, 1);'); return; }
  if (t === 'ease-in-out') { E('transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);'); return; }

  // cursor / misc
  if (t === 'cursor-pointer') { E('cursor: pointer;'); return; }
  if (t === 'cursor-not-allowed') { E('cursor: not-allowed;'); return; }
  if (t === 'select-none') { E('user-select: none;'); return; }
  if (t === 'pointer-events-none') { E('pointer-events: none;'); return; }
  if (t === 'group') { E('/* group marker */'); return; }
  if (t === 'sr-only') { E('position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border-width: 0;'); return; }
  if (t === 'antialiased') { E('-webkit-font-smoothing: antialiased;'); return; }
  if (t === 'scroll-smooth') { E('scroll-behavior: smooth;'); return; }
  if (t === 'resize-none') { E('resize: none;'); return; }
  if (t === 'appearance-none') { E('appearance: none;'); return; }
  if (t === 'outline-none') { E('outline: none;'); return; }
  if (t === 'list-none') { E('list-style-type: none;'); return; }
  if (t === 'list-decimal') { E('list-style-type: decimal;'); return; }
  if (t === 'list-disc') { E('list-style-type: disc;'); return; }
  if (t === 'divide-y') { const H = String.fromCharCode(91) + 'hidden' + String.fromCharCode(93); emit('.' + esc, '> :not(' + H + ') ~ :not(' + H + ') { border-top-width: 1px; border-top-style: solid; }'); return; }
  if ((m = t.match(/^divide-([a-z]+)-(\d{2,3})$/)) && colorToken(m[1], m[2])) { E('border-color: ' + colorToken(m[1], m[2]) + ';'); return; }
  if (t === 'table-auto') { E('table-layout: auto;'); return; }
  if (t === 'border-collapse') { E('border-collapse: collapse;'); return; }
  if (t === 'align-middle') { E('vertical-align: middle;'); return; }
  if (t === 'text-left') { E('text-align: left;'); return; }
  if (t === 'text-center') { E('text-align: center;'); return; }
  if (t === 'text-right') { E('text-align: right;'); return; }
  if (t === 'text-justify') { E('text-align: justify;'); return; }
  if (t === 'rounded-none') { E('border-radius: 0;'); return; }
  if (t === 'shadow-none') { E('box-shadow: none;'); return; }
  if (t === 'placeholder-gray-400' || t === 'placeholder-gray-500') { E('::placeholder { color: ' + (t.endsWith('500') ? '#6b7280' : '#9ca3af') + '; }'.replace('::placeholder', '&::placeholder')); return; }
}

function generateUtilityCSS(allClasses) {
  for (const raw of allClasses) {
    if (!raw || raw.length > 80) continue;
    for (const tok of raw.split(/\s+/)) {
      if (!tok || tok.startsWith('fa') || /^(is|has)-/.test(tok)) continue;
      try { handleToken(tok); } catch { /* ignore */ }
    }
  }
  const rules = globalThis.__cssRules || [];
  const plain = rules.filter((r) => !r.media);
  const byMedia = {};
  for (const r of rules) if (r.media) (byMedia[r.media] ||= []).push(r);

  let css = `/*\n * Bidemy content utilities — generated from the classes actually used by the\n * migrated educational content. Plain hand-written CSS (NO Tailwind).\n */\n\n`;
  // base content element defaults
  css += `/* ---- content element defaults ---- */
.bidemy-content { line-height: 1.6; color: #1f2937; }
.bidemy-content p { margin: 0 0 1rem; }
.bidemy-content h1, .bidemy-content h2, .bidemy-content h3, .bidemy-content h4 { color: #111827; margin: 1.6em 0 0.6em; line-height: 1.3; }
.bidemy-content h1 { font-size: 1.9rem; } .bidemy-content h2 { font-size: 1.5rem; } .bidemy-content h3 { font-size: 1.25rem; } .bidemy-content h4 { font-size: 1.1rem; }
.bidemy-content ul, .bidemy-content ol { margin: 0 0 1rem; padding-left: 1.6em; }
.bidemy-content img { max-width: 100%; height: auto; }
.bidemy-content table { border-collapse: collapse; width: 100%; margin: 0 0 1rem; }
.bidemy-content table td, .bidemy-content table th { border: 1px solid #d1d5db; padding: 0.6rem 0.75rem; text-align: left; vertical-align: top; }
.bidemy-content table thead th { background: #eef2ff; color: #312e81; }
.bidemy-content table tbody tr:nth-child(even) { background: #f8fafc; }
.bidemy-content a { color: #2563eb; }
.bidemy-content a:hover { text-decoration: underline; }
.bidemy-content blockquote { margin: 0 0 1rem; padding: 0.75rem 1rem; border-left: 4px solid #818cf8; background: #eef2ff; color: #3730a3; border-radius: 0.375rem; }
.bidemy-content pre { background: #0f172a; color: #e2e8f0; padding: 1rem; border-radius: 0.5rem; overflow-x: auto; margin: 0 0 1rem; font-size: 0.875rem; }
.bidemy-content code { background: #eef2ff; color: #3730a3; padding: 0.15em 0.4em; border-radius: 0.25rem; font-size: 0.875em; }
.bidemy-content pre code { background: transparent; color: inherit; padding: 0; }
.bidemy-content hr { border: none; border-top: 1px solid #e5e7eb; margin: 1.5rem 0; }
.bidemy-content details { margin: 0 0 0.75rem; }
.bidemy-content details summary { cursor: pointer; font-weight: 600; color: #3730a3; padding: 0.6rem 0.75rem; background: #eef2ff; border-radius: 0.375rem; }
.bidemy-content details[open] summary { border-radius: 0.375rem 0.375rem 0 0; }
.bidemy-content details > div, .bidemy-content details > p { padding: 0.75rem; border: 1px solid #e0e7ff; border-top: 0; border-radius: 0 0 0.375rem 0.375rem; }
.bidemy-content details > *:not(summary) { margin-left: 0; margin-right: 0; }
.bidemy-content .mi { font-family: 'Material Icons'; font-weight: normal; font-style: normal; display: inline-block; line-height: 1; letter-spacing: normal; text-transform: none; white-space: nowrap; word-wrap: normal; direction: ltr; font-feature-settings: 'liga'; -webkit-font-smoothing: antialiased; vertical-align: middle; user-select: none; }
.bidemy-content .mi::before { content: attr(data-mi); }
.bidemy-content .accordion-btn { cursor: pointer; }
.bidemy-content .accordion-content { max-height: 0; overflow: hidden; transition: max-height 0.3s ease-out; }
.bidemy-content .accordion-content.open { max-height: 2400px; }
.bidemy-content .rotate-180 { transform: rotate(180deg); transition: transform 0.2s; }
.bidemy-content .phet-modal { display: none; position: fixed; inset: 0; background: rgba(15,23,42,.55); z-index: 80; align-items: center; justify-content: center; padding: 1rem; }
.bidemy-content .phet-modal.show { display: flex; }
.bidemy-content .phet-modal .panel { background: #fff; border-radius: 12px; max-width: 480px; padding: 1.25rem 1.5rem; box-shadow: 0 20px 25px -5px rgb(0 0 0 / .2); }
.bidemy-content details > p:first-of-type { padding: 0.75rem; border: 1px solid #e0e7ff; border-top: 0; border-radius: 0 0 0.375rem 0.375rem; }

`;
  css += `/* ---- utility rules ---- */\n`;
  for (const r of plain) css += `${r.selector} { ${r.body} }\n`;
  for (const [media, rs] of Object.entries(byMedia)) {
    css += `\n@media ${media} {\n`;
    for (const r of rs) css += `  ${r.selector} { ${r.body} }\n`;
    css += `}\n`;
  }
  return css;
}

/* ------------------------------------------------------------------ */
/* Main pipeline                                                       */
/* ------------------------------------------------------------------ */
function main() {
  console.log('Scanning repo…');
  const allFiles = walk(SRC).map((f) => path.relative(SRC, f).replace(/\\/g, '/')).filter((f) => !f.startsWith('.git/'));

  const htmlFiles = allFiles.filter((f) => /\.html?$/i.test(f));

  /* ---- classify ---- */
  const processed = [];   // full extraction
  const wrappedRoutes = new Map(); // rel html path -> route
  for (const rel of htmlFiles) {
    if (isSkipPath(rel)) continue;
    if (isWrapperPath(rel)) {
      const route = relToRoute(rel);
      wrappedRoutes.set(rel, route);
      continue;
    }
    processed.push(rel);
  }

  /* ---- route map for link rewriting ---- */
  const routeMap = new Map(); // repo-rel html path -> route
  for (const rel of processed) routeMap.set(rel, relToRoute(rel));
  for (const [rel, route] of wrappedRoutes) routeMap.set(rel, route);

  /* ---- asset basename index (for depth-mismatched asset links) ---- */
  const assetIndex = new Map();
  for (const rel of allFiles) {
    if (/\.html?$/i.test(rel)) continue;
    const base = path.posix.basename(rel).toLowerCase();
    if (!assetIndex.has(base)) assetIndex.set(base, rel);
  }

  /* ---- synthetic hubs needed (linked dirs without index.html) ---- */
  const linkedDirs = new Set();
  const hubSubjects = new Set();

  /* ---- process each page ---- */
  ensureDir(OUT_PAGES);
  const manifest = [];
  const allClasses = new Set();
  const copiedAssets = new Map(); // repo rel -> public path
  const missingTargets = new Set();

  // Ensure ISPRING/bundle + sim files + cbt banks get copied even if not referenced by a scanned page
  const forcedAssetCopies = [];
  for (const rel of allFiles) {
    if (WRAPPER_BUNDLE_ROOTS.some((d) => rel.startsWith(d + '/') || rel === d)) { forcedAssetCopies.push(rel); continue; }
    if (WRAPPER_DIRS.some((d) => rel.startsWith(d + '/')) && /\.html?$/i.test(rel)) { forcedAssetCopies.push(rel); continue; }
    if (rel.startsWith('students/cbt/js/')) { forcedAssetCopies.push(rel); continue; }
    if (/^students\/cbt\/[^/]+questions[^/]*\.js$/.test(rel) || ['students/cbt/questions.js', 'students/cbt/questions-full.js', 'students/cbt/cbt-results-saver.js', 'students/cbt/physics-image-mapping.json', 'students/cbt/physics-page-mapping.json', 'students/cbt/physics-question-data.json'].includes(rel)) forcedAssetCopies.push(rel);
  }

  for (const rel of processed) {
    const abs = path.join(SRC, rel);
    let html;
    try { html = fs.readFileSync(abs, 'utf8'); } catch { warn(`unreadable: ${rel}`); continue; }
    const $ = cheerio.load(html);

    const title = ($('title').first().text() || '').trim() || path.basename(rel, '.html');
    const description = ($('meta[name="description"]').attr('content') || '').trim();
    const route = relToRoute(rel);
    const area = rel.startsWith('students/') ? 'students' : rel.startsWith('teachers/') ? 'teachers' : 'relationship';

    /* ---- collect classes from body ---- */
    $('[class]').each((_, el) => {
      const c = $(el).attr('class');
      if (c) allClasses.add(c);
    });

    /* ---- gather page CSS (inline <style> + referenced local stylesheets) ---- */
    const cssBlocks = [];
    $('style').each((_, el) => {
      const t = $(el).html();
      if (t && t.trim()) cssBlocks.push(t.trim());
    });

    /* ---- referenced local stylesheets ---- */
    $('link[rel="stylesheet"]').each((_, el) => {
      const href = $(el).attr('href') || '';
      if (!href || /^https?:/.test(href)) return;
      const target = resolveRel(path.posix.dirname(rel), href, rel);
      if (!target || !existsRepo(target)) return;
      if (/\.css$/i.test(target)) {
        let cssText = fs.readFileSync(path.join(SRC, target), 'utf8');
        cssText = rewriteCssUrls(cssText, path.posix.dirname(target), copiedAssets);
        cssBlocks.push(`/* from ${target} */\n${cssText}`);
      } else if (ASSET_EXT.has(path.extname(target).toLowerCase())) {
        copyAsset(target, copiedAssets);
      }
    });

    /* ---- strip scripts (keep for quiz extraction first) ---- */
    const scriptTexts = [];
    $('script').each((_, el) => {
      const t = $(el).html();
      const src = $(el).attr('src') || '';
      if (t && t.trim()) scriptTexts.push(t.trim());
      else if (src && !/^https?:/.test(src)) {
        const target = resolveRel(path.posix.dirname(rel), src, rel);
        if (target && existsRepo(target) && /\.js$/i.test(target) && target.startsWith('students/cbt/')) copyAsset(target, copiedAssets);
      }
    });
    $('script, noscript').remove();

    /* ---- quiz + tracker extraction ---- */
    const quiz = extractQuiz(scriptTexts);
    const tracker = extractTracker(scriptTexts);

    /* ---- convert font awesome icons ---- */
    let faConverted = 0;
    $('i').each((_, el) => {
      const cls = $(el).attr('class') || '';
      const m = cls.match(/\b(fas|far|fab|fa|fa-solid|fa-regular|fa-brands)\s+(fa-[\w-]+)/);
      if (!m) return;
      const lig = FA_MAP[m[2]] || FA_MAP[m[2].replace(/^fa-/, '')] || FALLBACK_ICON;
      const rest = cls.replace(/\b(fas|far|fab|fa|fa-solid|fa-regular|fa-brands|fa[\w-]*)\b/g, '').trim();
      const span = `<span class="mi ${rest}" data-mi="${lig}">${lig}</span>`;
      $(el).replaceWith(span);
      faConverted++;
    });
    // <span class="fas fa-x"> too
    $('span.fas, span.far, span.fab').each((_, el) => {
      const cls = $(el).attr('class') || '';
      const m = cls.match(/\bfa-[\w-]+\b/);
      if (!m) return;
      const lig = FA_MAP[m[0]] || FALLBACK_ICON;
      const rest = cls.replace(/\b(fas|far|fab|fa|fa-solid|fa-regular|fa-brands)\b/g, '').replace(/\bfa-[\w-]+\b/, '').trim();
      el.tagName = 'span';
      $(el).attr('class', `mi ${rest}`.trim());
      $(el).attr('data-mi', lig);
      $(el).text(lig);
      faConverted++;
    });

    /* ---- rewrite links ---- */
    const links = new Set();
    const rewriteHref = (value, el, attr) => {
      if (!value) return;
      const v = value.trim();
      if (!v || v.startsWith('#') || /^(https?:|mailto:|tel:|javascript:|data:)/i.test(v)) {
        if (v.startsWith('#') && v.length > 1) links.add(v);
        return;
      }
      // directory link
      if (v.endsWith('/')) {
        const targetDir = resolveRel(path.posix.dirname(rel), v, rel);
        if (targetDir) {
          const idx = targetDir + '/index.html';
          if (routeMap.has(idx)) { $(el).attr(attr, routeMap.get(idx)); return; }
          // known special dirs
          if (targetDir === 'students/subjects') { $(el).attr(attr, '/students/subjects/'); hubSubjects.add('__root__'); return; }
          linkedDirs.add(targetDir);
          const synthetic = dirToRoute(targetDir);
          $(el).attr(attr, synthetic);
          return;
        }
      }
      const ext = path.posix.extname(v.split('#')[0].split('?')[0]).toLowerCase();
      if (ext === '.html' || ext === '.htm') {
        const [filePart, hash] = v.split('#');
        const baseName = path.posix.basename(filePart);
        let target = resolveRel(path.posix.dirname(rel), filePart, rel);
        let routeHit = target && routeMap.has(target);
        if (!routeHit) {
          /* the original site contains many depth-mismatched relative links
             (e.g. '../student-dashboard.html' from 2 levels deep). Fall back
             to matching by basename across the site (case-insensitive), and
             also try common variant suffixes. */
          const lower = baseName.toLowerCase();
          const variants = [baseName, lower,
            lower.replace('-supabase.html', '.html'), lower.replace('-modern.html', '.html'),
            lower.replace('-new.html', '.html'), lower.replace('-updated.html', '.html'),
            lower.replace('-fixed.html', '.html'), lower.replace('-backup.html', '.html'),
            lower.replace('-old.html', '.html'), lower.replace('-v2.html', '.html'),
            lower.replace('-v3.html', '.html')];
          outer: for (const cand of variants) {
            const hit = [...routeMap.keys()].find((k) => path.posix.basename(k).toLowerCase() === cand);
            if (hit) { target = hit; routeHit = true; break outer; }
          }
        }
        if (routeHit) {
          let r = routeMap.get(target);
          if (hash) r += '#' + hash;
          $(el).attr(attr, r);
        } else if (baseName === 'student-dashboard.html') $(el).attr(attr, '/students/student-dashboard/');
        else if (target === 'general/login.html') $(el).attr(attr, '/general/login/');
        else if (target === 'general/signup.html') $(el).attr(attr, '/general/signup/');
        else if (baseName === 'teacher-confirmation.html') $(el).attr(attr, '/teachers/teacher-confirmation/');
        else if (target && target.startsWith('students/practical/')) $(el).attr(attr, dirToRoute(path.posix.dirname(target)) + sanitizeName(path.posix.basename(target, '.html')) + '/');
        else {
          /* last resort: sibling dir with same stem as the file, or subject home */
          const stem = baseName.replace(/\.html?$/i, '');
          const parent = target ? path.posix.dirname(target) : null;
          const sibIdx = parent ? parent + '/' + stem + '/index.html' : null;
          if (sibIdx && routeMap.has(sibIdx)) $(el).attr(attr, routeMap.get(sibIdx));
          else if (parent && parent + '/index.html' && routeMap.has(parent + '/index.html')) $(el).attr(attr, routeMap.get(parent + '/index.html'));
          else if (parent && routeMap.has(parent)) $(el).attr(attr, routeMap.get(parent));
          else if (detectSubject(rel)) $(el).attr(attr, '/students/subjects/' + detectSubject(rel) + '/');
          else $(el).attr(attr, '/students/subjects/');
          missingTargets.add(`${rel} → ${v}`);
        }
        return;
      }
      if (ASSET_EXT.has(ext)) {
        let target = resolveRel(path.posix.dirname(rel), v, rel);
        if (!target || !existsRepo(target)) {
          /* depth-mismatched asset links: fall back to a basename index of
             all repo assets */
          const base = path.posix.basename(v.split('#')[0].split('?')[0]).toLowerCase();
          const hit = assetIndex.get(base);
          if (hit) target = hit;
        }
        if (target && existsRepo(target)) {
          $(el).attr(attr, copyAsset(target, copiedAssets));
        } else missingTargets.add(`${rel} → asset ${v}`);
        return;
      }
      // extensionless / other relative links: leave but flag
      const target = resolveRel(path.posix.dirname(rel), v, rel);
      if (target && routeMap.has(target + '.html')) { $(el).attr(attr, routeMap.get(target + '.html')); return; }
      if (target && existsRepo(target + '/index.html')) { $(el).attr(attr, dirToRoute(target)); return; }
    };

    $('a[href]').each((_, el) => rewriteHref($(el).attr('href'), el, 'href'));
    $('img[src]').each((_, el) => {
      const s = $(el).attr('src');
      if (s && !/^(https?:|data:)/.test(s)) {
        const target = resolveRel(path.posix.dirname(rel), s, rel);
        if (target && existsRepo(target)) $(el).attr('src', copyAsset(target, copiedAssets));
        else missingTargets.add(`${rel} → img ${s}`);
      }
    });
    $('img[srcset]').each((_, el) => $(el).attr('srcset', ''));
    $('source[src]').each((_, el) => {
      const s = $(el).attr('src');
      if (s && !/^(https?:|data:)/.test(s)) {
        const target = resolveRel(path.posix.dirname(rel), s, rel);
        if (target && existsRepo(target)) $(el).attr('src', copyAsset(target, copiedAssets));
      }
    });
    $('iframe[src]').each((_, el) => {
      const s = $(el).attr('src');
      if (/^https?:/.test(s)) return; // external embeds kept
      const target = resolveRel(path.posix.dirname(rel), s, rel);
      if (target && existsRepo(target)) {
        if (/\.html?$/i.test(target)) {
          if (!routeMap.has(target) && existsRepo(target)) routeMap.set(target, relToRoute(target)); // ensure covered
          $(el).attr('src', routeMap.get(target) || '/site/' + sanitizeAssetRel(target));
          if (!routeMap.has(target)) routeMap.set(target, '/site/' + sanitizeAssetRel(target));
        } else $(el).attr('src', copyAsset(target, copiedAssets));
      }
    });
    $('link[rel="icon"], link[rel="apple-touch-icon"], link[rel="manifest"], link[rel="shortcut icon"]').remove();
    $('link').each((_, el) => { const h = $(el).attr('href') || ''; if (h && !/^https?:/.test(h) && !h.startsWith('/')) { const t = resolveRel(path.posix.dirname(rel), h, rel); if (t && existsRepo(t) && ASSET_EXT.has(path.extname(t).toLowerCase())) $(el).attr('href', copyAsset(t, copiedAssets)); } });

    /* ---- onclick → data hooks for shims ---- */
    $('[onclick]').each((_, el) => {
      const oc = $(el).attr('onclick') || '';
      const m = oc.match(/getElementById\(['"]([\w-]+)['"]\)/);
      if (m) { $(el).attr('data-bidemy-toggle-modal', m[1]); }
      $(el).removeAttr('onclick');
    });

    /* ---- mark quiz/progress placeholders ---- */
    let quizMounted = false;
    $('#quiz-container, .topic-quiz-container, #topic-quiz').each((_, el) => { $(el).attr('data-bidemy', 'quiz'); quizMounted = true; });
    if (quiz && !quizMounted) {
      const mount = $('#topic-quiz-mount, #quiz-mount');
      if (mount.length) mount.attr('data-bidemy', 'quiz');
      else $('article, body').first().append('<div data-bidemy="quiz"></div>');
    }
    $('#topic-progress-bar, #topic-progress-text').each((_, el) => {
      const parent = $(el).parent();
      if (parent.attr('id') === 'topic-progress-wrap') parent.attr('data-bidemy', 'progress');
      else if ($(el).attr('id') === 'topic-progress-bar') { parent.attr('data-bidemy', 'progress'); }
      else $(el).attr('data-bidemy', 'progress-text');
    });

    /* ---- classify kind ---- */
    const kind = classifyPage(rel, quiz, $);

    /* ---- cleaned body ---- */
    const bodyClass = $('body').attr('class') || '';
    const bodyStyle = $('body').attr('style') || '';
    const bodyRoot = $('body').clone();
    // strip original <nav> only when it is the small topic-page back-nav AND page has tracker (we rebuild in MUI)
    let bodyHtml = '';
    bodyRoot.contents().each((_, el) => { bodyHtml += $.html(el); });

    const pageJson = {
      slug: route,
      source: rel,
      area,
      kind,
      title,
      description,
      subject: detectSubject(rel),
      body: bodyHtml.trim(),
      bodyClass,
      bodyStyle,
      css: cssBlocks,
      quiz,
      tracker,
      links: [...links],
    };
    const routeRel0 = rel.replace(/\.html?$/i, '');
    const jsonRel0 = sanitizeAssetRel(routeRel0.endsWith('/index') ? routeRel0.slice(0, -'/index'.length) : routeRel0);
    const outPath = path.join(OUT_PAGES, jsonRel0 + '.json');
    ensureDir(path.dirname(outPath));
    fs.writeFileSync(outPath, JSON.stringify(pageJson));
    manifest.push({
      slug: route, source: rel, area, kind, title,
      subject: pageJson.subject,
      file: path.relative(OUT_CONTENT, outPath),
    });
  }

  /* ---- wrapper routes (PhET / ISPRING / CBT) ---- */
  const wrapperManifest = [];
  const seenWrapperDirs = new Set();
  for (const [rel, route] of wrappedRoutes) {
    if (!existsRepo(rel)) continue;
    copyAsset(rel, copiedAssets);
    const title = path.basename(rel, '.html').replace(/_/g, ' ');
    const json = {
      slug: route, source: rel, area: 'students', kind: 'sim',
      title, description: '', subject: detectSubject(rel),
      iframeSrc: '/site/' + sanitizeAssetRel(rel),
      css: [], quiz: null, tracker: null, links: [], body: '',
    };
    const routeRel0 = rel.replace(/\.html?$/i, '');
    const jsonRel0 = sanitizeAssetRel(routeRel0.endsWith('/index') ? routeRel0.slice(0, -'/index'.length) : routeRel0);
    const outPath = path.join(OUT_PAGES, jsonRel0 + '.json');
    ensureDir(path.dirname(outPath));
    fs.writeFileSync(outPath, JSON.stringify(json));
    manifest.push({ slug: route, source: rel, area: 'students', kind: 'sim', title, subject: json.subject, file: path.relative(OUT_CONTENT, outPath) });
    wrapperManifest.push({ route, title, src: rel });
    seenWrapperDirs.add(path.posix.dirname(rel));
  }

  /* ---- synthetic hub pages for EVERY subject dir without an index.html,
          plus the subjects root (mirrors the original directory-style links) ---- */
  const hubs = [];
  const subjectRoot = 'students/subjects';
  const hubDirs = new Set([...linkedDirs]);
  hubDirs.add(subjectRoot);
  for (const rel of [...processed, ...wrappedRoutes.keys()]) {
    const m = rel.match(/^(students\/subjects\/[^/]+)\//);
    if (m && !existsRepo(m[1] + '/index.html')) hubDirs.add(m[1]);
  }
  for (const dirRaw of [...hubDirs].sort()) {
    const dir = dirRaw.replace(/\/+$/, '');
    const idx = dir + '/index.html';
    if (routeMap.has(idx) || processed.some((p) => p === idx)) continue;
    // children: processed pages + wrappers directly inside dir
    const JUNK_RE = /(^|\/)(navbar|topic-template|student-template|debug-[\w-]+|zdfxfbfvd|fgvb)(\.html)?$/i;
    const children = [];
    for (const m of manifest) {
      const relDir = path.posix.dirname(m.source);
      if (relDir === dir && !JUNK_RE.test(m.source)) children.push({ route: m.slug, title: m.title, kind: m.kind });
    }
    // child dirs with their own index
    const childDirs = new Set();
    for (const rel of [...processed, ...wrappedRoutes.keys()]) {
      const d = path.posix.dirname(rel);
      if (d.startsWith(dir + '/')) childDirs.add(d.split('/').slice(0, dir.split('/').length + 1).join('/'));
    }
    for (const cd of childDirs) {
      const cidx = cd + '/index.html';
      if (routeMap.has(cidx)) {
        const t = routeMap.get(cidx);
        if (!children.some((c) => c.route === t)) children.push({ route: t, title: path.posix.basename(cd).replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), kind: 'dir' });
      } else if (hubDirs.has(cd)) {
        const t = dirToRoute(cd);
        if (!children.some((c) => c.route === t)) children.push({ route: t, title: path.posix.basename(cd).replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()), kind: 'dir' });
      }
    }
    if (children.length === 0) continue;
    hubs.push({
      route: dirToRoute(dir),
      dir,
      title: path.posix.basename(dir).replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      children,
    });
  }

  /* ---- forced asset copies (bundles, sim files, cbt banks) ---- */
  for (const rel of forcedAssetCopies) {
    if (!existsRepo(rel)) continue;
    if (/\.html?$/i.test(rel)) copyAsset(rel, copiedAssets); // sim html files themselves
    else copyAsset(rel, copiedAssets);
  }

  /* ---- referenced CBT images (from question banks) ---- */
  for (const rel of allFiles) {
    if (!rel.startsWith('students/cbt/')) continue;
    if (!/\.(js|json)$/.test(rel)) continue;
    if (rel.includes('questions') || rel.includes('mapping') || rel.includes('data')) {
      const text = fs.readFileSync(path.join(SRC, rel), 'utf8');
      const refs = text.match(/(?:images|pdf_pages)\/[\w\-./]+\.(?:jpe?g|png|gif|webp)/g) || [];
      for (const r of refs) {
        const target = 'students/cbt/' + r;
        if (existsRepo(target)) copyAsset(target, copiedAssets);
      }
    }
  }

  /* ---- root-level shared assets ---- */
  for (const rel of ['favicon.png', 'logo.svg', 'juanova.svg', 'robots.txt']) {
    if (existsRepo(rel)) copyAsset(rel, copiedAssets);
  }
  // students root images commonly referenced by extracted pages
  for (const rel of allFiles) {
    if (/^students\/[^/]+\.(png|svg|webp|jpe?g|ico|csv|pdf)$/.test(rel)) copyAsset(rel, copiedAssets);
  }

  /* ---- write manifest + hubs ---- */
  manifest.sort((a, b) => a.slug.localeCompare(b.slug));
  fs.writeFileSync(path.join(OUT_CONTENT, 'manifest.json'), JSON.stringify({ generatedAt: new Date().toISOString(), pages: manifest }, null, 2));
  fs.writeFileSync(path.join(OUT_CONTENT, 'hubs.json'), JSON.stringify(hubs, null, 2));

  /* ---- utility css ---- */
  const css = generateUtilityCSS([...allClasses]);
  ensureDir(path.dirname(CSS_OUT));
  fs.writeFileSync(CSS_OUT, css);

  /* ---- report ---- */
  const report = {
    processed: manifest.length,
    wrappers: wrapperManifest.length,
    hubs,
    assets: copiedAssets.size,
    missingTargets: [...missingTargets].slice(0, 200),
    warnings: (globalThis.__warnings || []).slice(0, 100),
  };
  fs.writeFileSync(path.join(OUT_CONTENT, 'report.json'), JSON.stringify(report, null, 2));
  console.log(`✔ pages: ${manifest.length}`);
  console.log(`✔ assets copied: ${copiedAssets.size}`);
  console.log(`✔ hubs: ${hubs.length}`);
  console.log(`⚠ missing targets: ${missingTargets.size}`);
  for (const w of report.warnings.slice(0, 10)) console.log('  !', w);
}

/* ---------------- helpers used above ---------------- */
function relToRoute(relHtml) {
  let p = relHtml.replace(/\\/g, '/').replace(/\.html?$/i, '');
  if (p.endsWith('/index')) p = p.slice(0, -'/index'.length);
  return '/' + sanitizeAssetRel(p) + '/';
}

function dirToRoute(dir) {
  return '/' + sanitizeAssetRel(dir.replace(/\\/g, '/')) + '/';
}

function sanitizeAssetRel(rel) {
  return rel.split('/').map((seg) => sanitizeName(seg)).join('/');
}

const copiedAssets = new Map();
function copyAsset(repoRel, store) {
  if (store.has(repoRel)) return store.get(repoRel);
  const publicPath = '/site/' + sanitizeAssetRel(repoRel);
  const abs = path.join(SRC, repoRel);
  if (!fs.existsSync(abs)) { warn(`asset missing: ${repoRel}`); return publicPath; }
  const dest = path.join(OUT_PUBLIC, publicPath);
  ensureDir(path.dirname(dest));
  fs.copyFileSync(abs, dest);
  store.set(repoRel, publicPath);
  return publicPath;
}

function resolveRel(fromDir, href, context) {
  if (!href) return null;
  let base = fromDir === '.' ? '' : fromDir.replace(/\/+$/, '');
  let p = href.split('#')[0].split('?')[0];
  if (!p) return null;
  if (p.startsWith('/')) return p.slice(1).replace(/\\/g, '/').replace(/\/+$/, '');
  const stack = base ? base.split('/') : [];
  for (const seg of p.replace(/\\/g, '/').split('/')) {
    if (seg === '' || seg === '.') continue;
    if (seg === '..') stack.pop();
    else stack.push(seg);
  }
  const out = stack.join('/');
  if (!out) return null;
  return out;
}

function rewriteCssUrls(css, cssDir, store) {
  return css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (m0, q, u) => {
    if (/^(https?:|data:|#)/.test(u)) return m0;
    const target = resolveRel(cssDir, u, cssDir);
    if (!target || !existsRepo(target)) return m0;
    return `url(${q}${copyAsset(target, store)}${q})`;
  });
}

function extractQuiz(scriptTexts) {
  for (const t of scriptTexts) {
    const m = t.match(/(?:const|let|var)\s+(?:quizQuestions|questions|quizData|quiz)\s*=\s*(\[\s*{[\s\S]*?\]\s*)\s*;?\s*(?:\n|$)/);
    if (!m) continue;
    try {
      const arr = vm.runInNewContext(`(${m[1]})`, { Math, console: { log: () => {} } });
      if (Array.isArray(arr) && arr.length && arr[0] && arr[0].question) {
        const pass = t.match(/passingScore:\s*(\d+)/);
        const id = t.match(/topicId:\s*['"]([\w-]+)['"]/);
        const subj = t.match(/subject:\s*['"]([\w-]+)['"]/);
        return {
          topicId: id ? id[1] : null,
          subject: subj ? subj[1] : null,
          passingScore: pass ? +pass[1] : 60,
          questions: arr.map((q) => ({
            question: String(q.question ?? ''),
            options: (q.options || []).map((o) => String(o)),
            correct: typeof q.correct === 'number' ? q.correct : typeof q.answer === 'number' ? q.answer : 0,
            explanation: String(q.explanation ?? ''),
          })),
        };
      }
    } catch { /* not JSON-safe */ }
  }
  return null;
}

function extractTracker(scriptTexts) {
  for (const t of scriptTexts) {
    const m = t.match(/new\s+TopicTracker\(\s*({[\s\S]*?})\s*\)/);
    if (!m) continue;
    try {
      const cfg = vm.runInNewContext(`(${m[1]})`, {});
      return {
        topicId: cfg.topicId || null,
        topicTitle: cfg.topicTitle || null,
        subject: cfg.subject || null,
        sections: Array.isArray(cfg.sections) ? cfg.sections : [],
        quizRequired: !!cfg.quizRequired,
      };
    } catch { /* ignore */ }
  }
  return null;
}

function classifyPage(rel, quiz, $) {
  const p = rel.replace(/\\/g, '/');
  if (quiz) return 'topic';
  if (/\/subjects\/[\w-]+\/[\w-]+\/index\.html$/.test(p)) return 'division';
  if (/\/subjects\/[\w-]+\/index\.html$/.test(p)) return 'subject-home';
  if (/\/subjects\/[\w-]+\/[\w-]+\.html$/.test(p)) {
    // division page as flat html or topic content
    if ($('article, .content-card, .topic-content').length) return 'topic';
    return 'division';
  }
  return 'content';
}

function detectSubject(rel) {
  const p = rel.replace(/\\/g, '/');
  const m = p.match(/\/subjects\/([\w-]+)\//);
  if (m) return m[1];
  const m2 = p.match(/\/(chemistry|physics|biology|mathematics|english|literature|government|economics|commerce|accounting)-live-session\.html$/);
  if (m2) return m2[1];
  return null;
}

/* keep a copy of copiedAssets accessible (module-level Map used in main) */
main();
