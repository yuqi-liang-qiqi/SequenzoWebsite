import { Mail, type LucideIcon } from "lucide-react";

import {
  Github,
  Facebook,
  Instagram,
  Linkedin,
  X as Twitter,
  Twitch,
  Youtube,
  Whatsapp,
  Snapchat,
  Pinterest,
  Discord,
  Gitlab,
  Reddit,
  Telegram,
  Mastodon,
  Vercel
} from "simple-icons-astro";

type IconComponent = LucideIcon | ((props: any) => JSX.Element);

export const ICONS: { [key: string]: IconComponent } = {
  Github,
  Facebook,
  Instagram,
  LinkedIn: Linkedin,
  Mail,
  Twitter,
  Twitch,
  YouTube: Youtube,
  WhatsApp: Whatsapp,
  Snapchat,
  Pinterest,
  Discord,
  GitLab: Gitlab,
  Reddit,
  Telegram,
  Mastodon,
  Website: Vercel
};

export const getIconByName = (name: string): IconComponent | null => {
  return ICONS[name] || null;
};
