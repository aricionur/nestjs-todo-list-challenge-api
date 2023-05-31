import { RegisterInput } from 'src/graphql.schema';

type Nullable<T> = T | null;

export interface UserDto extends RegisterInput {
  updatedAt?: Nullable<Date>;
  createdAt?: Nullable<Date>;
}
