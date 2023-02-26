export type Space = {
    name: string;
};

export type Results<T> = {
    data: T[];
};

export type SearchFn<T> = (searchText: string) => Promise<Results<T>>;