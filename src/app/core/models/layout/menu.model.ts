export interface MenuModel {
  name: string;
  path?: string;
  icon?: string;
  role?: string;
  children?: MenuModel[];
}

export interface FlatMenuItem {
  expandable: boolean;
  item: MenuModel;
  level: number;
}
