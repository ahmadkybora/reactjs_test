import React, { Component } from 'react';
import { getAllStudents, createNumber } from '../services/studentService';
import { getAllLessons } from '../services/lessonService';
import Lesson from './lesson';

class Student extends Component {

    state = {
        students: [],
        lessons: [],
        displayForm: false,
        style: "fa fa-plus text-success",
        student: {},
        makeNumber: {
            score: '',
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

        this.setState({ 
            edit: true, 
            displayForm: displayForm ? false : true, 
            box: {},
            status: true, 
            student: studentId,
            //style: 'disabled'
        });

        //console.log(studentId.id);
    }
    
    createNumber = async e => {
        e.preventDefault();

        const { makeNumber } = this.state;

        makeNumber.score = e.target.score.value;
        makeNumber.lessonId = e.target.lessonId.value;
        makeNumber.studentId = e.target.std.value;

        this.setState({ makeNumber });

        return await createNumber(makeNumber);
    }

    render() { 
        const { students, student, edit, displayForm, lessons, makeNumber } = this.state;

        const myTable = {
            // color: "white",
            // backgroundColor: "DodgerBlue",
            // padding: "10px",
            // marginTop: '40px',
            // fontFamily: "Arial",
            // height: '300px',
            // width: '300px'
        };

        return (
            <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h1>Students table</h1>
                </div>
                <div className="col-md-3">
                </div>
            </div>
            {/* {displayForm ? <Lesson student={student} displayForm={displayForm}/> : ''} */}
            <table style={myTable} className="table table-striped">
                <thead className="text-center">
                    <tr className="text-center">
                        <th>#</th>
                        <th>Option</th> 
                        <th>FullName</th>
                        <th>Std Code</th>
                        <th>Total Unit</th>
                        <th>Avg</th>
                        <th>Lessons and Scores</th>
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
                                {displayForm ? 
                                 <tr height="150px">
                                    <Lesson student={student} displayForm={displayForm}/>
                                 </tr> 
                                 : ''}
                            </td>
                            <td>{student.first_name + ' ' + student.last_name}</td>
                            <td>{student.student_code}</td>
                            <td>{student.total_units ? student.total_units : 'Dont Have !'}</td>
                            <td>{student.total_units ? Math.round(student.total_number_units / parseInt(student.total_units)) : 'Dont Have !'}</td>
                            <td>
                                <form onSubmit={this.createNumber}>
                                    <div className="input-group offset-2">
                                        <button 
                                            id="std" 
                                            name="std"
                                            value={student.id}
                                            className="btn btn-success">
                                            <i className="fa fa-send-o"></i>
                                            send
                                        </button>
                                        <div className="form-outline col-md-4">
                                            <input 
                                                type="number" 
                                                className="form-control" 
                                                id="score" 
                                                name="score"
                                                placeholder="Enter the score"
                                            />
                                        </div>
                                        <div className="col-md-4">
                                            <select 
                                                className="form-select"
                                                id="lessonId"
                                                name="lessonId"
                                            >
                                            <option selected="true" disabled="disabled">Choose a lesson</option>     
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

            {/* <table class="table table-striped">
                <thead className="text-center">
                    <tr className="text-center">
                        <th>#</th>
                        <th>Option</th> 
                        <th>FullName</th>
                        <th>Std Code</th>
                        <th>Total Unit</th>
                        <th>Avg</th>
                        <th>Lessons and Scores</th>
                    </tr>
                </thead>
            <tbody>
                ...
                <tr>
                    <td>1</td>
                    <td>2</td>
                    <td>3</td>
                    <td colspan="4">
                        <table class="table table-striped table mb-0">
                            <thead className="text-center">
                                <tr className="text-center">
                                    <th>#</th>
                                    <th>Option</th> 
                                    <th>FullName</th>
                                    <th>Std Code</th>
                                    <th>Total Unit</th>
                                    <th>Avg</th>
                                    <th>Lessons and Scores</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>2</td>
                                    <td>3</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                ...
            </tbody>
            </table> */}

            {/* <table class="table table-striped">
                <thead>
                    ...
                </thead>
                <tbody>
                    ...
                    <tr>
                    <td colspan="4">
                        <table class="table mb-0">
                        ...
                        </table>
                    </td>
                    </tr>
                    ...
                </tbody>
            </table> */}

            {/* <table className="table table-striped table-bordered table-hover">
                <tr>
                    <td>Row 1</td>
                </tr>
                <tr>
                    <td>Row 2</td>
                </tr>
                <tr>
                    <td>
                    <table className="table table-striped table-bordered table-hover">
                            <tr>
                                <td>Nested 1a</td>
                                <td>Nested 2a</td>
                                <td>Nested 3a</td>
                            </tr>
                            <tr>
                                <td>Nested 1b</td>
                                <td>Nested 2b</td>
                                <td>Nested 3b</td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr>
                    <td>Row 3</td>
                </tr>
            </table> */}

        </div>
        )
    }
}
 
export default Student;