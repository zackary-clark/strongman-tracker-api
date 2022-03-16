import { gql } from "apollo-server-core";

export const workoutSchema = gql`
    extend type Query {
        workouts: [Workout!]!
    }
    
    extend type Mutation {
        addWorkout(input: AddWorkoutInput!): AddWorkoutPayload
        addLift(input: AddLiftInput!): AddLiftPayload
        deleteWorkout(input: DeleteWorkoutInput!): DeleteWorkoutPayload
        deleteLift(input: DeleteLiftInput!): DeleteLiftPayload
    }
    
    type Workout {
        id: Int!
        date: Date!
        lifts: [Lift!]!
    }
    
    type Lift {
        id: Int!
        name: String!
        reps: Int!
        sets: Int!
        weight: Int!
    }
    
    input AddWorkoutInput {
        date: Date!
    }
    
    type AddWorkoutPayload implements MutationPayload {
        success: Boolean!
        workout: Workout
    }
    
    input AddLiftInput {
        workout: Int!
        name: String!
        reps: Int!
        sets: Int!
        weight: Int!
    }
    
    type AddLiftPayload implements MutationPayload {
        success: Boolean!
        lift: Lift
        workout: Int
    }
    
    input DeleteWorkoutInput {
        id: Int!
    }
    
    type DeleteWorkoutPayload implements MutationPayload {
        success: Boolean!
    }
    
    input DeleteLiftInput {
        id: Int!
    }
    
    type DeleteLiftPayload implements MutationPayload {
        success: Boolean!
    }
`;