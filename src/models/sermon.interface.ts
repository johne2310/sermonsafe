
export interface SermonSeries {

    key$?: string;
    series?: string;
    category?: string;

    sermon: Sermons[];
}

export interface Sermons {

    key$?: string;
    series?: string;
    title?: string;
    description?: string;
    date?: Date;
    category?: string;
    location?: Locations[];
    reference?: BibleVerses[];
}

export interface Locations {
    key$?: string;
    date?: Date;
    location?: string;
}

export interface BibleVerses {
    key$?: string;
    book?: string;
    chapterFrom?: number;
    verseFrom?: number;
    chapterTo?: number;
    verseTo?: number;
}
