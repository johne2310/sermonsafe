import { SermonSeries } from '../models/sermon.interface';

const sermonList: SermonSeries[] = [

    {
        key$: '1',
        series: 'The Beatitudes',
        category: 'Gospels',
        sermon: [
            {
                key$: '1a',
                series: 'The Beatitudes',
                title: 'Blessed are the Meek',
                date: new Date(),
                description: 'Sermon on the Mount - Part 1',
                location: [
                    {
                        key$: '1b',
                        date: new Date(),
                        location: 'Salvos 614'
                    },
                    {
                        key$: '1c',
                        date: new Date(),
                        location: 'Willow Creek'
                    }
                ],
                reference: [
                    {
                        key$: '1d',
                        book: 'Romans',
                        chapterFrom: 1,
                        verseFrom: 1,
                        chapterTo: 1,
                        verseTo: 5
                    }
                ]
            },
            {
                series: 'The Beatitudes',
                title: 'Blessed are those that Mourn',
                date: new Date(),
                description: 'Sermon on the Mount - Part 2',
                location: [
                    {
                        date: new Date(),
                        location: 'Salvos 614'
                    },
                    {
                        date: new Date(),
                        location: 'Willow Creek'
                    }
                ],
                reference: [
                    {
                        book: 'John',
                        chapterFrom: 3,
                        verseFrom: 16,
                    }
                ]
            }]

    },
    {
        series: 'The Letters',
        category: 'Gospels',
        sermon: [
            {
                series: 'The Beatitudes',
                title: 'Blessed are the Peaceamakers',
                date: new Date(),
                description: 'Sermon on the Mount - Part 3',
                location: [
                    {
                        date: new Date(),
                        location: 'MCG'
                    }
                ],
                reference: [
                    {
                        book: 'Romans',
                        chapterFrom: 1,
                        verseFrom: 1,
                        chapterTo: 1,
                        verseTo: 5
                    }
                ]
            },

            {
                series: 'The Beatitudes',
                title: 'Blessed are the Cheesemakers',
                date: new Date(),
                description: 'Sermon on the Mount - Part 4',
                location: [
                    {
                        date: new Date(),
                        location: 'Saddleback'
                    },
                    {
                        date: new Date(),
                        location: 'Willow Creek'
                    }
                ],
                reference: [
                    {
                        book: 'Romans',
                        chapterFrom: 1,
                        verseFrom: 1,
                        chapterTo: 1,
                        verseTo: 5
                    }
                ]
            }]

    }
]

export const SERMON_LIST = sermonList;