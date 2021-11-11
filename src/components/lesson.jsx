import Modal from '../utils/modal';
import React, { Component } from 'react';
import { lessonDelete } from '../services/lessonService';

class Lesson extends Component {

    state = {
        displayForm: false,
        lessons : this.props.student.lessons,
        number: {}
    }

    option = ( lesson, label, type ) => {
        return (
            <i 
            className={label} 
            onClick={() => {
                switch(type) {
                    case 'edit':
                        this.editLesson(lesson)
                    break;
                    case 'delete':
                        this.deleteLesson(lesson)
                    break;
                }}}>
            </i>
        )
    }

    editLesson = lesson => {
        //console.log(lesson);
        const { displayForm, lessons, number } = this.state;
        const lessonId = lessons.find(l => ( l.id === lesson.id));
        //console.log(lessonId);
        this.setState({ 
            number: lessonId, 
            displayForm: displayForm ? false : true,
        });

        //console.log(number)
    }

    deleteLesson = async lesson => {
        //console.log(this.state.lessons);
        //console.log(lesson)
        this.setState({ lessons: this.state.lessons.filter((lId) => { 
                return lId !== lesson 
            })
        });

    // return await deleteUser(user);
    //     const { lessons } = this.state;
    //     this.setState({ lessons: lessons.filter(s => s.id !== lesson.id)})

        return await lessonDelete(lesson);
    }

    render() { 
        const { lessons, displayForm, number } = this.state;
        //console.log(lessons);
        return (
            <div>
                {displayForm ? <Modal number={number} /> : ''}
                <table className="table table-striped">
                    <thead className="text-center">
                        <tr className="text-center">
                            <th>#</th>
                            <th>Lesson Name</th>
                            <th>Lesson Code</th>
                            <th>Number Of Unit</th>
                            <th>Number</th>
                            <th>Option</th> 
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {lessons.map((lesson, index) => (
                            <tr key={lesson.id} className="text-center">
                                <td>{index+1}</td>
                                <td>{lesson.lesson_name}</td>
                                <td>{lesson.lesson_code}</td>
                                <td>{lesson.number_unit}</td>
                                <td>{lesson.pivot.number}</td>
                                <td>
                                    {this.option(lesson, "fa fa-edit text-primary m-1", "edit")}
                                    {this.option(lesson, "fa fa-trash text-danger m-1", "delete")}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
 
export default Lesson;