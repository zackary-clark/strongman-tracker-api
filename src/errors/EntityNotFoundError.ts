export class EntityNotFoundError extends Error {
    constructor(id: string) {
        super(`Entity with id: ${id} not found`);
        this.name = "EntityNotFoundError";
    }
}
