import React, { useState, useEffect } from "react";
import { Note, fetchNotes, createNote, updateNote, deleteNote  } from '../api/noteApi';
import NoteCard from "../components/noteCard";

const Notes: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [form, setForm] = useState({title: '', description: '', event_date: ''});
    const [editId, setEditId] = useState<string | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false); // Controla a exibição do formulário

    const loadNotes = async () => {
        try{
            const data = await fetchNotes();
            setNotes(data);
        }catch(error) {
            console.error('Erro ao carregar notas:', error);
        }
    };

    useEffect(() => {
        loadNotes();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (editId) {
                await updateNote(editId, form); 
            } else {
                await createNote(form); 
            }
            loadNotes(); 
            setForm({ title: '', description: '', event_date: '' }); 
            setShowForm(false); 
            setEditId(null); 
        } catch (error) {
            console.error('Erro ao salvar nota:', error);
        }
    };

    const handleEdit = (note: Note) => {
        setForm({ title: note.title, description: note.description, event_date: note.event_date });
        setEditId(note.id ?? null); 
        setShowForm(true); 
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteNote(id); 
            loadNotes(); 
        } catch (error) {
            console.error('Erro ao excluir nota:', error);
        }
    };



    return (
        <div>
            <div className="container py-5">
                <h1 className="text-center mb-4">Gerenciamento de Notas</h1>

                {/* Botão para abrir o formulário */}
                <button className="btn btn-primary mb-4" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancelar' : 'Criar Nova Nota'}
                </button>

                {/* Formulário para criação de nova nota */}
                {showForm && (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Título</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="form-control"
                                value={form.title}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Descrição</label>
                            <textarea
                                id="description"
                                name="description"
                                className="form-control"
                                value={form.description}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="event_date" className="form-label">Data</label>
                            <input
                                type="date"
                                id="event_date"
                                name="event_date"
                                className="form-control"
                                value={form.event_date}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success">
                            {editId ? 'Salvar Alterações' : 'Salvar Nota'}
                        </button>
                    </form>
                )}

                {/* Lista de notas */}
                <div className="row mt-4">
                    {notes.map((note) => (
                        <div key={note.id} className="col-md-4 mb-4">
                            <NoteCard note={note} onEdit={handleEdit} onDelete={handleDelete} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Notes