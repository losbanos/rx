import {Component, Vue} from 'vue-property-decorator';
import {NewsPaper} from '@components/news/NewsPaper';
import {NewsReader} from '@components/news/NewsReader';
import {NewsScrapper} from '@components/news/NewsScrapper';

@Component
export default class News extends Vue {

    protected mounted() {
        this.testNews();
    }

    private testNews() {
        const newsPaper: NewsPaper = new NewsPaper();
        const reader: NewsReader = new NewsReader();
        const scrapper: NewsScrapper = new NewsScrapper();
        newsPaper.add(reader);
        newsPaper.add(scrapper);

        newsPaper.news = '북한 미사일 발사';
        newsPaper.news = '코스피 최저점';
        newsPaper.news = '겨우 이거도 힘들다 ㅎㅎ';

        newsPaper.remove(reader);
        console.log('-----------------------');
        newsPaper.news = '이거는 리더를 지움';
        newsPaper.news = '재확인용임';
        newsPaper.news = 'scrapper 만 나와야해';
    }
}
