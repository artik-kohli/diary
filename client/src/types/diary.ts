import { Entry } from "./entry";

export interface Diary {
    id: number;
    userId: string;
    userName?: string;
    displayName?: string;
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

export interface DiaryUpdate {
    title?: string;
    isPublic?: boolean;
}