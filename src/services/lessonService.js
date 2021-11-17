import http from './httpService';
import { Success, Error } from '../utils/errorHandler';

export const getAllLessons = async () => {
    return await http.get('lessons')
        .then(res => res.data.data)
        .catch(err => Error(err));
}

export const lessonUpdate = async lesson => {
    return await http.patch(`lessons/${lesson.lesson_id}`, lesson)
        .then(res => Success(res))
        .then(() => {
            setTimeout(function(){ 
                window.location.reload();
            }, 2000);
        })
        .catch(err => Error(err));
}

export const lessonDelete = async lesson => {
    return await http.post(`lessons/${lesson.id}`, lesson)
        .then(res => Success(res))
        .then(() => {
            setTimeout(function(){ 
                window.location.reload();
            }, 2000);
        })
        .catch(err => Error(err));
}