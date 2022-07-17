// Menu
export interface Menu {
  path?: string;
  title?: string;
  type?: string;
  class?: string;
  megaMenu?: boolean;
  megaMenuType?: string; // small, medium, large
  image?: string;
  children?: Menu[];
}

export const MENUITEMS: Menu[] = [
	{
		path: '/home/one', title: 'inicio', type: 'link'
	},
	{
		path: '/home/productos/all', title: 'vestidos', type: 'link'
	},
	{
		path: '/home/productos/accesorios', title: 'accesorios', type: 'link'
	},
	// {
	// 	path: '/home/productos/ocaciones', title: 'ocaciones', type: 'link'
	// },
	// {
	// 	path: '/contacto', title: 'contacto', type: 'link', class: 'pr-0'
	// },
]