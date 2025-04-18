export interface NavItem {
  href: string;
  text: string;
}

export const HEADER_HEIGHT_SIZE = 60;

export const HEADER_NAV_ITEMS: Record<string, NavItem[]> = {
  '/': [
    { href: '#home', text: 'Главная' },
    { href: '#projects', text: 'Проекты' },
  ],
};
