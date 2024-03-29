import React, { Component } from 'react';
import { lessonDelete, lessonUpdate } from '../services/lessonService';

class Lesson extends Component {

    state = {
        displayForm: false,
        lessons : [],
        score: {}
    }

    componentDidMount() {
        const { lessons } = this.props.student;
        const displayForm = this.props.displayForm;
        this.setState({ lessons, displayForm });
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
        const { lessons } = this.state;

        const lessonId = lessons.find(l => ( l.id === lesson.id));
        this.setState({ 
            score: lessonId, 
        });
    }

    updateNumber = async e => {
        e.preventDefault();

        const { score } = this.state
        const numberValue = e.target.score.value;
        score.score = numberValue;
        this.setState({ score });

        return await lessonUpdate(score)
    }

    deleteLesson = async lesson => {
        this.setState({ lessons: this.state.lessons.filter((lId) => { 
                return lId !== lesson 
            })
        });

        return await lessonDelete(lesson);
    }

    render() { 
        const { lessons, score } = this.state;

        return (
            <div>
                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Score Lesson</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                        <form onSubmit={this.updateNumber.bind(this)}>
                            <div className="input-group offset-3">
                                <button 
                                    className="btn btn-success">
                                    <i className="fa fa-send-o"></i>
                                    send
                                </button>
                                <div className="form-outline">
                                    <input 
                                        type="number" 
                                        className="form-control" 
                                        id="score" 
                                        name="score"
                                        defaultValue={score.score}
                                    />
                                </div>
                            </div>
                        </form>
                        </div>
                        </div>
                    </div>
                </div>

                <table className="table table-striped">
                    <thead className="text-center">
                        <tr className="text-center">
                            <th>#</th>
                            <th>Lesson Name</th>
                            <th>Lesson Code</th>
                            <th>Unit</th>
                            <th>Score</th>
                            <th>Option</th> 
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {lessons.map((lesson, index) => (
                            <tr key={lesson.id}>
                                <td>{index+1}</td>
                                <td>{lesson.lesson_name}</td>
                                <td>{lesson.lesson_code}</td>
                                <td>{lesson.units}</td>
                                <td>{lesson.score}</td>
                                <td>
                                    <i 
                                        onClick={() => this.editLesson(lesson)} 
                                        className="fa fa-edit text-primary m-1" 
                                        data-bs-toggle="modal" 
                                        data-bs-target="#staticBackdrop" 
                                    />
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