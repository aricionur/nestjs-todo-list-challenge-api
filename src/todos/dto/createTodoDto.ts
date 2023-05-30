import { TodoInput } from 'src/graphql.schema';

type Nullable<T> = T | null;

export interface TodoDto extends TodoInput {
  updatedAt?: Nullable<Date>;
  createdAt?: Nullable<Date>;
  userID?: Nullable<number>;
}
