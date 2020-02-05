import {Component, Vue} from 'vue-property-decorator';

@Component
export default class Poke extends Vue {
    protected mounted() {
        console.log('is mounted', this);
    }
}
