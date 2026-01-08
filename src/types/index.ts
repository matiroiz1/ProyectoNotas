export interface Note {
    id: string;
    title: string;
    content: string;
    archived: boolean;
    date: Date;
}
export interface Category {
    id: string;
    name: string;
    description: string;
}
