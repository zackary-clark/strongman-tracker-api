import { UserInputError } from "apollo-server-express";
import { isMatch } from "date-fns";
import { GraphQLScalarType, Kind } from "graphql";
import format from "date-fns/format";
import parse from "date-fns/parse";

const FORMAT = "yyyy-MM-dd";

function parseStringToDate(value: string): Date {
    if (!isMatch(value, FORMAT)) throw new UserInputError("Date does not match format -> yyyy-mm-dd");
    return parse(value, FORMAT, new Date());
}

export const dateScalar = new GraphQLScalarType({
    name: "Date",
    description: "Date in yyyy-mm-dd format.",
    serialize(value) {
        if (value instanceof Date) {
            return format(value, FORMAT);
        }
        return "1970-01-01";
    },
    parseValue(value) {
        if (typeof value === "string") {
            return parseStringToDate(value);
        }
        return new Date(0);
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return parseStringToDate(ast.value);
        }
        throw new UserInputError("Date does not match format -> yyyy-mm-dd");
    },
});
