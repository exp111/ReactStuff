import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Header(props)
{
    return(
    <div class="header">
    Notizen 
    {<a href="#" onClick={() => props.onClick()}>{props.editMode ? "Fertig" : "Bearbeiten"}</a>}
    </div>
    );
}

class Note
{
    constructor()
    {
        this.title = "New";
        this.value = "Value of it";
        this.date = new Date();
    }
}

class NoteContent extends React.Component
{
    renderList()
    {
        var noteList = [];
        var notes = this.props.notes;
        for (var i = 0; i < notes.length; i++)
        {
            var note = notes[i];
            noteList.push(
                <div class="note">
                    <p class="note-header">{note.title}</p>
                    <span class="note-date">{note.date.toLocaleDateString()}</span>{note.value}
                </div>
            );
        }
        return noteList;
    }

    rednerNote()
    {
        return(<div>{this.props.value}</div>)
    }

    render()
    {
        if (this.props.value === -1)
        {
            return(<div class="note-list">{this.renderList()}</div>);
        }
        else
        {
            return(this.renderNote());
        }
    }
}

class Notes extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            notes: [],
            editMode: false,
            current: -1
        };
    }

    toggleEditMode()
    {
        this.setState({editMode: !this.state.editMode});
    }

    addNote()
    {
        var notes = this.state.notes.slice();
        notes.push(new Note());
        console.debug(notes);
        this.setState({notes: notes});
    }

    render() 
    {
        return(
            <div class="container">
            <Header editMode={this.state.editMode} onClick={() => this.toggleEditMode()}></Header>

            <NoteContent value={this.state.current} notes={this.state.notes}></NoteContent>
        
            <div class="footer">{this.state.notes.length} Notizen<a href="#" onClick={() => this.addNote()}>+</a></div>
            </div>
        );
    }
}

ReactDOM.render(
    <Notes/>,
    document.getElementById('root')
  );