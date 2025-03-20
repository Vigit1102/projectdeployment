export interface User {
    id: number;
    firstname: string;
    lastname: string;
    address: string;
    birthdate: string;
    phoneno: string;
    gender: string;
    position: string;
    username: string;
    language: string[];
}

export  interface UpdateFormData {
    firstname: string;
    lastname: string;
    address: string;
    birthdate: string;
    phoneno: string;
    gender: string;
    position: string;
    username: string;
    language: string[];
}

export interface List {
    id: number,
    name: string,
    isAdd: boolean,
    isEdit: boolean,
    isDelete: boolean,
    isView: boolean,
}

export  interface formData {
    firstname: string,
    lastname: string,
    address: string,
    birthdate: string,
    phoneno: string,
    position: string,
    gender: string,
    username: string,
    password: string,
    confirm_password: string,
    language: string[]
}

export interface Errors {
    [key: string]: string;
}

export interface Column {
    id: string;
    label: string;
}

export interface UserListProps {
    user: boolean;
}

export interface UpdateUser{
    id: number; 
  update: Record<string, any>
}

export interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
  }