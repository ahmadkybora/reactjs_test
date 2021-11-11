import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { getAllStudents, createNumber } from '../services/studentService';
import { getAllLessons } from '../services/lessonService';
import Lesson from './lesson';

class Student extends Component {

    state = {
        students: [],
        lessons: [],
        displayForm: false,
        style: "fa fa-arrow-right text-success",
        student: {},
        makeNumber: {
            number: '',
            lessonId: '',
            studentId: ''
        }
    }

    async componentDidMount() {
        const lessons = await getAllLessons();
        const students = await getAllStudents();
        this.setState({ students, lessons });
    }

    showLesson = student => {
        const { displayForm, style, students } = this.state;
        const studentId = students.find(s => ( s.id === student.id));
        //console.log(studentId);
        let close = "fa fa-close text-danger";
        let plus = "fa fa-arrow-right text-success";

        this.setState({ 
            edit: true, 
            displayForm: displayForm ? false : true, 
            status: true, 
            style: ( style === plus ) ? close : plus,
            student: studentId
        });
    }
    
    createNumber = async e => {
        //e.preventDefault();
        e.preventDefault();
        const { makeNumber } = this.state;
        //const { lessonNumber, password } = e.target.elements
        //this.handleChange(e)
        //payload.first_name = e.target.number.value;
        // console.log(e.target.lessonNumber.value);
        // console.log(e.target.lessonName.value);
        // console.log(this.state.student);

        makeNumber.number = e.target.number.value;
        makeNumber.lessonId = e.target.lessonId.value;
        makeNumber.studentId = 1;

        this.setState({ makeNumber });

        return await createNumber(makeNumber);
        //console.log(e.target.elements.lessonNumber);
        // const { number } = this.state;

        // number.number = e.target.value.number;
        // number.student = e.target.value.student;
        // console.log(number);
        //number.lesson = e.target.value.
    }

    // handleChange = e => {
    //     const name = e.target.value;
    //     console.log(name)
    // }

    render() { 
        const { students, student, edit, displayForm, lessons, makeNumber } = this.state;

        return (
            <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h1>Students table</h1>
                </div>
                <div className="col-md-3">
                </div>
            </div>
            {displayForm ? <Lesson student={student} /> : ''}
            <table className="table table-striped">
                <thead className="text-center">
                    <tr className="text-center">
                        <th>#</th>
                        <th>Option</th> 
                        <th>FullName</th>
                        <th>Std Code</th>
                        <th>Total Unit</th>
                        <th>Avg</th>
                        <th>Lessons and Number</th>
                    </tr>
                </thead>
                <tbody className="text-center">
                    {students.map((student, index) => (
                        <tr 
                            key={student.id} 
                            data-id={student.id}
                            className="text-center">
                            <td>{index+1}</td>
                            <td>
                                <button 
                                    className="btn btn-default float-end"
                                    onClick={() => {this.showLesson(student)}}>
                                    <i className={this.state.style} />
                                </button>
                            </td>
                            <td>{student.first_name + ' ' + student.last_name}</td>
                            <td>{student.student_code}</td>
                            <td>{student.total_unit ? student.total_unit : 'Dont Have !'}</td>
                            <td>{student.total_unit ? student.total_unit : 'Dont Have !'}</td>
                            <td>
                                <form onSubmit={this.createNumber}>
                                    <div className="input-group offset-2">
                                        <button 
                                            className="btn btn-success">
                                            <i className="fa fa-send-o"></i>
                                            send
                                        </button>
                                        <div className="form-outline col-md-3">
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                id="number" 
                                                name="number"
                                                // value={makeNumber.lessonNumber}
                                                // onChange={this.handleChange}
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <select 
                                                className="form-select"
                                                id="lessonId"
                                                name="lessonId"
                                                // value={makeNumber.lessonName}
                                                // onChange={this.handleChange}
                                            >
                                            {lessons.map(lesson => ( 
                                                <option value={lesson.id}>{lesson.lesson_name}</option>
                                            ))}
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        )
    }
}
 
export default Student;