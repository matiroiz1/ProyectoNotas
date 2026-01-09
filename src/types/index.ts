export interface Note {
    id: number;
    title: string;
    content: string;
    archived: boolean;
    date: Date;
    categories: Category[];
}
export interface Category {
    id: number;
    name: string;
    description: string;
}
export type CategoryDTO = { id: number; name: string };

export type NoteWithCategoriesDTO = {
  id: number;
  title: string;
  content: string;
  archived: boolean;
  categories: CategoryDTO[];
};