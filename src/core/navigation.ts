export interface NavItem {
  readonly label: string;
  readonly href: string;
}

export const mainNavigation: readonly NavItem[] = [
  { label: 'Serviços', href: '/servicos' },
  { label: 'Portfólio', href: '/portfolio' },
  { label: 'Sobre', href: '/sobre' },
  { label: 'Clientes', href: '/sobre#clientes' },
];

export function isCurrent(href: string, pathname: string): boolean {
  if (href.includes('#')) return false;
  const clean = pathname.replace(/\/$/, '') || '/';
  return clean === href || clean.startsWith(`${href}/`);
}
