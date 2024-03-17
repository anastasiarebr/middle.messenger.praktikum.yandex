export interface IChats {
    img: string,
    name: string,
    message: string,
    date: string,
    count_new_messages: number,
}

export const chatsList: Array<IChats> = [
    {
        img: 'https://faunistics.com/wp-content/uploads/2021/08/1-2.jpg',
        name: 'Иван',
        message: 'Рябчик — это легендарная птица, в свое время прославленная Маяковским. До 70-х годов прошлого века бывший Советский союз поставлял за рубеж сотни тысяч тушек этих пернатых ежегодно. Несмотря на то, что мясо имело горьковатый вкус и аромат смолы, оно считалось деликатесным продуктом среди гурманов.',
        date: '01:15',
        count_new_messages: 3,
    },
    {
        img: 'https://porodisobak.ru/wp-content/uploads/2021/07/velsh-korgi-pembrok-2.jpg',
        name: 'Алексей',
        message: 'Корги – миниатюрная овчарка, пастушья собака, которая помогала валлийским крестьянам пасти овец, коз, пони и даже домашнюю птицу.',
        date: '08:15',
        count_new_messages: 0,
	},
	{
        img: '',
        name: 'Киноклуб',
        message: 'Наш киноклуб ориентирован на систематическое и последовательное кинообразование.',
        date: '08:30',
        count_new_messages: 0,
	},
	{
        img: '',
        name: 'чатик',
        message: 'Изображение',
        date: '10:30',
        count_new_messages: 10,
	},
]