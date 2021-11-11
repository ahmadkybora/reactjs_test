import http from './httpService';
import { Success, Error } from '../utils/errorHandler';

export const getAllLessons = async () => {
    return await http.get('lessons')
        .then(res => res.data.data)
        .catch(err => Error(err));
}

export const lessonUpdate = async lesson => {
    return await http.patch(`lessons/${lesson.id}`, lesson)
        .then(res => Success(res))
        .catch(err => Error(err));
}

export const lessonDelete = async lesson => {
    //console.log(lesson.id);
    return await http.delete(`lessons/${lesson.id}`)
        .then(res => Success(res))
        .catch(err => Error(err));
}