import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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
        const notes = this.props.notes;
        return notes.map((note, i) => {
            return (
              <li className="note" key={i} onClick={() => this.props.onClick(i)}>
                <p className="note-header">{note.title}</p>
                <span className="note-date">{note.date.toLocaleDateString()}</span>{note.value}
              </li>
            );
          });
    }

    renderNote()
    {
        var note = this.props.notes[this.props.value];
        if (note == null)
            return(<div></div>);
        return(
        <div>
            <p>{note.title}</p>
            {note.value}
        </div>
        );
    }

    render()
    {
        if (this.props.value === -1)
        {
            return(<ul className="note-list">{this.renderList()}</ul>);
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
        this.setState({notes: notes, current: notes.length - 1});
    }

    showNote(i)
    {
        this.setState({current: i});
    }

    render() 
    {
        return(
            <div className="container">
                <div className="header">
                {<button className="left" onClick={() => this.showNote(-1)}>{this.state.current !== -1 ? "<" : ""}</button>}
                Notizen 
                {<button className="right" onClick={() => this.toggleEditMode()}>{this.state.editMode ? "Fertig" : "Bearbeiten"}</button>}
                </div>

                <NoteContent value={this.state.current} notes={this.state.notes} onClick={(i) => this.showNote(i)}></NoteContent>
        
                <div className="footer">
                {this.state.notes.length} Notizen
                <button className="right" onClick={() => this.addNote()}>+</button>
                </div>
            </div>
        );
    }
}

ReactDOM.render(
    <Notes/>,
    document.getElementById('root')
  );