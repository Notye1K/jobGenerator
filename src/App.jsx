import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AlertProvider } from './components/AlertContext'
import Form from './components/Form'
import Header from './components/Header'
import Summary from './components/Summary'

function App() {
    const emptyForm = {
        title: '',
        salary: '',
        bonus: [],
        activity: '',
        phases: [],
        skills: [],
        experience: '',
    }
    const test = {
        title: 'Atendente de balcão',
        salary: '6000',
        bonus: ['Seguro de vida', 'Folga no aniversário'],
        activity: 'Atender clientes no balcão',
        phases: ['Entrevista', 'Proposta'],
        skills: ['Atender bem os clientes', 'Cuidar do caixa'],
        experience: '1 ano',
    }
    const [form, setForm] = useState(test)

    return (
        <BrowserRouter>
            <AlertProvider>
                <Header setForm={setForm} emptyForm={emptyForm} />
                <Routes>
                    <Route
                        path="/"
                        element={<Form form={form} setForm={setForm} />}
                    />
                    <Route
                        path="/resumo"
                        element={<Summary form={form} setForm={setForm} />}
                    />
                </Routes>
            </AlertProvider>
        </BrowserRouter>
    )
}

export default App
