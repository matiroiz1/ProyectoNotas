export interface Note {
    id: number;
    title: string;
    content: string;
    archived: boolean;
    date: Date;
    updatedDate?: Date;
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
    creationDate?: string;
    lastModifiedDate?: string;
    categories: CategoryDTO[];
};