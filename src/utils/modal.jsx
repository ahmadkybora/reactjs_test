import React, { Component } from 'react';
import { lessonUpdate } from '../services/lessonService';

class Modal extends Component {

    state = {
        number: {},
        //onChangeNumber: this.onChangeNumber.bind(this),
    }

    componentDidMount() {
        const { number } = this.props;
        this.setState({ number });
    }

    updateNumber = async e => {
        e.preventDefault();

        const { number } = this.state
        const numberValue = e.target.number.value;
        number.number = numberValue;
        this.setState({ number });
        console.log(number);
        
        // const { number } = this.state;
        //console.log(this.props.number);
        // number = e.target.number.value
        // this.setState({ number });

        return await lessonUpdate(number)
    }

    // onChangeNumber = e => {
    //     const number = e.target.number.value;
    //     console.log(number);
    // }

    render() { 
        const { number } = this.state
        //console.log(number)
        return (
            <div>
                <button type="button" className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                </button>

                <div className="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">Edit Number Lesson</h5>
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
                                        id="number" 
                                        name="number"
                                        defaultValue={number.number}
                                        // onChange={this.onChangeNumber}
                                    />
                                </div>
                            </div>
                        </form>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default Modal;