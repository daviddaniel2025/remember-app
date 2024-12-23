import api from './axios';


export interface Note {
    id?: string;
    title: string;
    description: string;
    event_date: string;
}

export const fetchNotes = async () => {
    const response = await api.get('/notes');
    console.log(response.data)
    return response.data;
};

export const createNote = async (note: Note) => {
    const response = await api.post('/notes', note);
    console.log(response.data)
    return response.data;
};

export const updateNote = async (id: string, note: Note) => {
    const response = await api.put(`/notes/${id}`, note)
    console.log(response.data)
    return response.data;
};

export const deleteNote = async (id: string) => {
    const response = await api.delete(`/notes/${id}`)
    console.log(response.data)
    return response.data;
};