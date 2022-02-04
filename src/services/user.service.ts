import { getRepository, getCustomRepository } from "typeorm";
import { User } from "../entities";
import ErrorClass from '../error/ErrorClass';
import UsersRepositories from '../repositories/userRepository';

interface UserBody {
    name: string,
    email: string,
    password: string,
    isAdmin: boolean
}


export const createUser = async (body: UserBody) => {
    const { name, email, password, isAdmin  } = body;
    try {

        const userRepository = getRepository(User);
        
        const emailAlreadyExists = await userRepository.findOne({ email });

        if (emailAlreadyExists) {
            throw new ErrorClass("E-mail already registered", 400);
        }

        const user = userRepository.create({
            email,
            password,
            name,
            isAdmin
        });
        
        await userRepository.save(user);
        
        return user;
    } catch (e) {
        throw new ErrorClass((e as any).message, 400)
    }
}

export const listAll = async () => {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    return users;
}

export const getOne = async (id: string | undefined) => {
    const userRepository = getRepository(User);

    const users = await userRepository.findOne(id);

    return users;
}

export const updateUser = async (id: string, data:{}) => {

    const userRepository = getRepository(User);

    userRepository.update(id, data);

    const users = await userRepository.findOne(id);

    return users;
}

export const deleteUser = async (id: string) => {

    const userRepository = getRepository(User);

    await userRepository.delete(id);

    return "User deleted";

}