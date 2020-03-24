import {IObserver} from '@components/news/IObserver';

export class NewsScrapper implements IObserver {
    public update(news: any) {
        console.log(`뉴스를 스크랩 하자 - ${news}`);
    }
}
