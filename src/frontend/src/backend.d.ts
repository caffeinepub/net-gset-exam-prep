import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Paper {
    id: bigint;
    title: string;
    description: string;
}
export interface PYQ {
    id: bigint;
    title: string;
    year: bigint;
    downloadUrl: string;
    paperId: bigint;
}
export interface Unit {
    id: bigint;
    title: string;
    content: string;
    order: bigint;
    paperId: bigint;
}
export interface backendInterface {
    getAllPYQs(): Promise<Array<PYQ>>;
    getPYQsByPaper(paperId: bigint): Promise<Array<PYQ>>;
    getPapers(): Promise<Array<Paper>>;
    getUnitsByPaper(paperId: bigint): Promise<Array<Unit>>;
}
