import DI from "../utilities/DI";
import { MoviePickRepo } from "./MoviePickRepo";

/**
 *
 */
export class MoviePicker {
    private repository: MoviePickRepo;

    constructor() {
        this.repository = DI.get('MoviePickRepo');
    }

    public async pick(title: string): Promise<string[]> {
        if (title === '')
            throw new EmptyMovieTitleError();

        const firstLetter = [...title][0];
        if ((await this.repository.getByFirstLetter(firstLetter))) throw new MoviePickAlreadyExistError();

        await this.repository.put(title);

        return this.getPicks();
    }

    public async getPicks(): Promise<string[]> {
        return this.repository.getAll();
    }
}

export class MoviePickAlreadyExistError extends Error {
    constructor() {
        super("Un film a déjà été selectionné pour cette lettre")
    }
}

export class EmptyMovieTitleError extends Error {
    constructor() {
        super("Le titre du film ne peut pas être vide")
    }
}
