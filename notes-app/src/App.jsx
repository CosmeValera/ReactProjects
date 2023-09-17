import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import {nanoid} from "nanoid"
import { onSnapshot, addDoc } from "firebase/firestore"
import { notesCollection } from "./firebase"

export default function App() {

    const [notes, setNotes] = React.useState([])

    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0]?.id) || ""
    )

    const currentNote = 
        notes.find(note => note.id === currentNoteId) 
        || notes[0]

    React.useEffect(() => {
        const unsubscribe = onSnapshot(notesCollection, function(snapshot) {
            // Sync up our local notes array with the snapshot data
            const notesArr = snapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id
            }))
            setNotes(notesArr)
        })
        return unsubscribe
    }, [])
    
    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here"
        }
        const newNoteRef = await addDoc(notesCollection, newNote)
        setCurrentNoteId(newNoteRef.id)
    }

    /* OTHER OPTION */
    // function updateNote(text) {
    //     // Put the most recently-modified note at the top
    //     setNotes(oldNotes => {
    //         const newArray = []
    //         for(let i = 0; i < oldNotes.length; i++) {
    //             const oldNote = oldNotes[i]
    //             if(oldNote.id === currentNoteId) {
    //                 newArray.unshift({ ...oldNote, body: text })
    //             } else {
    //                 newArray.push(oldNote)
    //             }
    //         }
    //         return newArray
    //     })
    // }
    
    function reorderNotes() {
        for (let i = notes.length - 1; i >= 1; i--) {
            let currentNote = notes[i];
            let previousNote = notes[i - 1];
            if (notes[i].id === currentNoteId) {
                notes[i - 1] = currentNote;
                notes[i] =  previousNote;
            }
        }
    }
    
    function updateNote(text) {
        setNotes(oldNotes => oldNotes.map(oldNote => {
            return oldNote.id === currentNoteId
                ? { ...oldNote, body: text }
                : oldNote
        }))
        
        reorderNotes();
    }

    function deleteNote(event, noteId) {
        event.stopPropagation()
        setNotes(prevNotes => prevNotes.filter((note) => note.id !== noteId))
    }
    
    return (
        <main>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={currentNote}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={currentNote} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
        </main>
    )
}
