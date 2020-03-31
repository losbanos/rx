import {IStarWarsPeople} from '@components/starwars/model/IStarWarsPeople';

export class StarWarsMapper {
    public static peopleMapper(results: Array<IStarWarsPeople>) {
        let people: Array<IStarWarsPeople> = [];
        for (const user of results) {
            people.push({
                name: user.name,
                height: Number(user.height),
                mass: Number(user.mass),
                hair_color: user.hair_color,
                eye_color: user.eye_color,
                skin_color: user.skin_color,
                birth_year: user.birth_year,
                gender: user.gender,
                homeworld: user.homeworld,
                films: user.films,
                species: user.species,
                vehicles: user.vehicles,
                starships: user.starships,
                created: user.created,
                edited: user.edited,
                url: user.url
            });
        }
        return people;
    }
}
