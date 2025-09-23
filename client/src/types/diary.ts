import { Entry } from "./entry";

export interface Diary {
    id: number;
    title: string;
    isPublic: boolean;
    createdAt: string;
    updatedAt: string;
    entries: Entry[];
}

export interface CreateDiary {
    title: string;
    isPublic?: boolean;
}

export interface UpdateDiary {
    title?: string;
    isPublic?: boolean;
}