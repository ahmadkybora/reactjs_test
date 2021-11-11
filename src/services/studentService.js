import http from './httpService';
import { Error, Success } from '../utils/errorHandler';

export const getAllStudents = async () => {
    return await http.get('students')
        .then(res => res.data.data)
        .catch(err => Error(err));
}

export const createNumber = async student => {
    return await http.post(`students/${student.studentId}`, student)
        .then(res => Success(res))
        .catch(err => Error(err));
}