import { gql,  } from "apollo-server-core";

export default gql`
    scalar Date
    
    type Max {
        id: String!
        date: Date!
        squat1RM: Float
        bench1RM: Float
        deadlift1RM: Float
        press1RM: Float
    }

    type Query {
        index: [Max!]!
    }
`;
