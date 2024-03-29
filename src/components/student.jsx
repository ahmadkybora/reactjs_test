import React, { Component } from 'react';
import { getAllStudents, createNumber } from '../services/studentService';
import { getAllLessons } from '../services/lessonService';
import Lesson from './lesson';

class Student extends Component {

    state = {
        students: [],
        lessons: [],
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
        const displayForm = false;
        const style = "fa fa-plus text-success";
        const disabled = false;
        students.map(s => {
            s.displayForm = displayForm; 
            s.style = style;
            s.disabled = disabled;
        })
        this.setState({ students, lessons });
    }

    showLesson = student => {
        const { students } = this.state;

        let plus = "fa fa-plus text-success";
        let close = "fa fa-close text-danger";
        const studentId = students.find(s => ( s.id === student.id));

        students.map(st => {
            if(st.id === student.id) {
                st.displayForm = st.displayForm ? false : true;
                st.style = ( st.style === plus ) ? close : plus;
            } else {
                st.disabled = st.disabled ? false : true;
            }
        });     

        this.setState({ 
            students,
            student: studentId,
        });
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
        const { students, student, lessons } = this.state;

        const myTableThead = {
            textAlign: student.displayForm ? "center" : '',
            float: student.displayForm ? 'left' : '',
        }

        const myTableThSmall = {
            width: student.displayForm ? '130px' : '',
            textAlign: student.displayForm ? "center" : "",
        }

        const myTableThMid = {
            width: student.displayForm ? '170px' : '',
            textAlign: student.displayForm ? "center" : "",
        }

        const myTableThBig = {
            width: student.displayForm ? '400px' : '',
            textAlign: student.displayForm ? "center" : "",
        }

        const myTableTbody = {
            float: student.displayForm ? 'left' : '',
            textAlign: student.displayForm ? "center" : "",
        }

        const myTableTr = {
            float: student.displayForm ? 'left' : '',
            textAlign: student.displayForm ? "center" : "",
        }

        const myTableTdSmall = {
            width: student.displayForm ? '130px' : '',
            textAlign: student.displayForm ? "center" : "",
        }

        const myTableTdMid = {
            width: student.displayForm ? '170px' : '',
            textAlign: student.displayForm ? "center" : "",
        }

        const myTableTdBig = {
            width: student.displayForm ? '400px' : '',
            textAlign: student.displayForm ? "center" : "",
        }

        return (
            <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <h1>Students table</h1>
                </div>
                <div className="col-md-3">
                </div>
            </div>
            
            <table className="table table-bordered">
                <thead style={myTableThead} className="text-center">
                    <tr>
                        <th>#</th>
                        <th style={myTableThSmall}>Option</th> 
                        <th style={myTableThMid}>FullName</th>
                        <th style={myTableThSmall}>Std Code</th>
                        <th style={myTableThSmall}>Total Unit</th>
                        <th style={myTableThSmall}>Avg</th>
                        <th style={myTableThBig}>Lessons and Scores</th>
                    </tr>
                </thead>
                <tbody style={myTableTbody} className="text-center">
                    {students.map((student, index) => (
                        <React.Fragment>
                        <tr
                            style={myTableTr}
                            key={student.id} 
                            data-id={student.id}
                        >
                            <td>{index+1}</td>
                            <td style={myTableTdSmall}>
                                <button 
                                    className="btn btn-sm btn-default"
                                    disabled={student.disabled}
                                    onClick={() => {this.showLesson(student)}}>
                                    <i className={student.style} />
                                </button>
                            </td>
                            <td style={myTableTdMid}>{student.first_name + ' ' + student.last_name}</td>
                            <td style={myTableTdSmall}>{student.student_code}</td>
                            <td style={myTableTdSmall}>{student.total_units ? student.total_units : 'Dont Have !'}</td>
                            <td style={myTableTdSmall}>{student.total_units ? Math.round(student.total_number_units / parseInt(student.total_units)) : 'Dont Have !'}</td>
                            <td style={myTableTdBig}>
                                <form onSubmit={this.createNumber}>
                                    <div className="input-group offset-1">
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
                                                <option 
                                                    key={lesson.id} 
                                                    value={lesson.id}
                                                >
                                                    {lesson.lesson_name}
                                                </option>
                                            ))}
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </td>
                        </tr>
                        {student.displayForm ? 
                            <tr>
                                <td style={{ width: "1200px" }}>
                                    <Lesson student={student} />
                                </td>
                            </tr>
                        : ''}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
        )
    }
}
 
export default Student;