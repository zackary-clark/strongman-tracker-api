import { SQLDataSource } from "datasource-sql";
import {
    AddProgrammedWorkoutInput,
    ProgrammedWorkout,
    ProgrammedWorkoutFilter,
    ProgrammedWorkoutSort,
    Sort
} from "../../generated/schema";
import { KnexOrderByNullsOption, KnexOrderByOption } from "../config/knexConfig";
import { isDefined } from "../utils/isDefined";
import { logError } from "../utils/logs";
import ProgrammedWorkoutMapper, {
    ProgrammedWorkoutEntity,
    ProgrammedWorkoutPreResolver
} from "./programmedWorkoutMapper";

const TABLE = "programmed_workout";

export class ProgrammedWorkoutRepo extends SQLDataSource {
    public async filteredAndSorted(
        userId: string,
        filter: ProgrammedWorkoutFilter,
        sort?: ProgrammedWorkoutSort
    ): Promise<ProgrammedWorkoutPreResolver[]> {
        const order = buildOrderByArray(sort);
        const programmedWorkoutEntities = await this.knex
            .select("*").from(TABLE)
            .where("user_id", userId)
            .modify(queryBuilder => {
                const program = filter.program;
                const focusGroup = filter.focusGroup;
                const day = filter.day;
                if (isDefined(program)) {
                    queryBuilder.where("program", program);
                }
                if (isDefined(focusGroup)) {
                    queryBuilder.whereRaw("? = ANY(focus_groups)", focusGroup);
                }
                if (isDefined(day)) {
                    queryBuilder.where("day", day);
                }
            })
            .orderBy(order);
        return programmedWorkoutEntities.map(ProgrammedWorkoutMapper.toQL);
    }

    public async findOne(userId: string, id: string): Promise<ProgrammedWorkoutPreResolver> {
        return ProgrammedWorkoutMapper.toQL(await this.knex
            .select("*").from(TABLE)
            .where("id", id)
            .andWhere("user_id", userId)
            .first()
        );
    }

    public async findAllWithProgramId(userId: string, programId: string): Promise<ProgrammedWorkoutPreResolver[]> {
        return this.filteredAndSorted(userId, { program: programId });
    }

    public async create(userId: string, input: AddProgrammedWorkoutInput): Promise<ProgrammedWorkoutPreResolver> {
        try {
            const insertedEntities = await this.knex.into(TABLE).insert(ProgrammedWorkoutMapper.toEntity({...input}, userId), "*");
            return ProgrammedWorkoutMapper.toQL(insertedEntities[0]);
        } catch (error) {
            logError(error, "Create Programmed Workout Failed");
            throw error;
        }
    }

    public async edit(userId: string, id: string, updatedFields: Partial<ProgrammedWorkout>): Promise<ProgrammedWorkoutPreResolver> {
        try {
            const updatedEntities = await this.knex.from(TABLE)
                .update(ProgrammedWorkoutMapper.partialToEntity(updatedFields), "*")
                .where("id", id)
                .andWhere("user_id", userId);
            return ProgrammedWorkoutMapper.toQL(updatedEntities[0]);
        } catch (error) {
            logError(error, "Edit Programmed Workout Failed");
            throw error;
        }
    }
}

export type ProgrammedWorkoutEditableFields = Partial<Omit<ProgrammedWorkoutPreResolver, "program">>;
export type ProgrammedWorkoutsEntityEditableFields = Partial<Omit<ProgrammedWorkoutEntity, "user_id" | "program">>;

function buildOrderByArray(sort?: ProgrammedWorkoutSort): KnexOrderByOption[] {
    const defaultArray = [
        { column: "order", order: sort?.order ?? Sort.Asc, nulls: KnexOrderByNullsOption.last },
        { column: "day", order: sort?.day ?? Sort.Asc, nulls: KnexOrderByNullsOption.last },
        { column: "name", order: sort?.name ?? Sort.Asc },
    ];
    return sort
        // @ts-ignore
        ? defaultArray.filter(option => isDefined(sort[option.column])).concat(defaultArray.filter(option => !isDefined(sort[option.column])))
        : defaultArray;
}
