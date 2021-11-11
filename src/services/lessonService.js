import http from './httpService';
import { Success, Error } from '../utils/errorHandler';

export const getAllLessons = async () => {
    return await http.get('lessons')
        .then(res => res.data.data)
        .catch(err => Error(err));
}

export const lessonUpdate = async lesson => {
    //console.log(lesson.lesson_id);
    return await http.patch(`lessons/${lesson.lesson_id}`, lesson)
        .then(res => Success(res))
        .catch(err => Error(err));
}

export const lessonDelete = async lesson => {
    //console.log(lesson.id);
    return await http.post(`lessons/${lesson.id}`, lesson)
        .then(res => Success(res))
        .catch(err => Error(err));
}