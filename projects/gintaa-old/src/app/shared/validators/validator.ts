export interface Validator<T extends object> {
    validate(model: T): string[];
}