import React from 'react';
import {connect} from 'react-redux';
import CreateNote from '../components/CreateNote';
import { addNewNote } from '../store/actions';

class CreateNoteView extends React.Component {
    constructor(props){
        super(props);
        this.state={
            note:{
                title: "",
                content: "",
            }
            // isUpdate: false
        }
    }

    handleInput = event =>{
        this.setState({ ...this.state,
                        note:{...this.state.note, [event.target.name]: event.target.value}});
    }

    handleAddNewNote = event => {
        event.preventDefault();
        this.props.addNewNote(this.state.note);
        this.props.history.push("/");
    }

    render(){
        return (
            <div className="create-view-container">
                <CreateNote {...this.props}
                            note={this.state.note}
                            isUpdate={this.state.isUpdate}
                            handleInput={this.handleInput}
                            handleAddNewNote={this.handleAddNewNote}

                            />  
                {/* {this.props.history.push('/')} */}
            </div>
    )}      
}

const mapStateToProps = state => ({
    
});

export default connect( mapStateToProps,
                        {addNewNote})(CreateNoteView);