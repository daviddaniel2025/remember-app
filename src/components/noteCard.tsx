import React from "react";
import { format } from 'date-fns';
import { Note } from "../api/noteApi";

const NoteCard: React.FC<{note: Note, onEdit: (note: Note) => void, onDelete: (id: string) => void}> = ({ note, onEdit, onDelete }) => {

    const fomatDate = (() => {
        const [year, month, day] = note.event_date.split('-'); // Divide a string da data "YYYY-MM-DD"
        return `${day}/${month}/${year}`; // Retorna no formato "dd/MM/yyyy"
    })();

    const handleEdit = () => {
        onEdit(note);
    }

    const handleDelete = () => {
        if (window.confirm('Tem certeza que deseja excluir esta nota?')) {
            onDelete(note.id!);
        }
    }

    return (
        <div className="card shadow-sm border-0 h-100">
            <div className="card-body">
                <h5 className="card-title text-primary">{note.title}</h5>
                <p className="card-text text-muted">{note.description}</p>
                <p className="card-text">
                    <small className="text-secondary">
                        <strong>Data:</strong> {fomatDate}
                    </small>
                </p>
            </div>
            <div className="card-footer bg-white border-0 d-flex justify-content-between">
                <button className="btn btn-outline-primary btn-sm" onClick={handleEdit}>Editar</button>
                <button className="btn btn-outline-danger btn-sm" onClick={handleDelete}>Excluir</button>
            </div>
        </div>
    );
}

export default NoteCard;