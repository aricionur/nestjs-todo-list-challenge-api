
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class TodoInput {
    id?: Nullable<number>;
    isCompleted?: Nullable<boolean>;
    title?: Nullable<string>;
}

export class RegisterInput {
    username?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export class LoginInput {
    email?: Nullable<string>;
    password?: Nullable<string>;
}

export abstract class IQuery {
    abstract listTodos(): Nullable<Nullable<Todo>[]> | Promise<Nullable<Nullable<Todo>[]>>;
}

export abstract class IMutation {
    abstract createTodo(input?: Nullable<TodoInput>): Nullable<Todo> | Promise<Nullable<Todo>>;

    abstract markTodoCompleted(id: number): Nullable<Todo> | Promise<Nullable<Todo>>;

    abstract markTodoUncompleted(id: number): Nullable<Todo> | Promise<Nullable<Todo>>;

    abstract deleteTodo(id: number): Nullable<Success> | Promise<Nullable<Success>>;

    abstract registerUser(input?: Nullable<RegisterInput>): Nullable<User> | Promise<Nullable<User>>;

    abstract loginUser(input?: Nullable<LoginInput>): Nullable<User> | Promise<Nullable<User>>;
}

export class Todo {
    id?: Nullable<number>;
    isCompleted?: Nullable<boolean>;
    title?: Nullable<string>;
    updatedAt?: Nullable<Date>;
    createdAt?: Nullable<Date>;
}

export class Success {
    isSuccess?: Nullable<boolean>;
}

export class User {
    username?: Nullable<string>;
    email?: Nullable<string>;
    password?: Nullable<string>;
    token?: Nullable<string>;
}

type Nullable<T> = T | null;
