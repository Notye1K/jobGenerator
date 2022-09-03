import { Box } from '@mui/material'
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

    const [form, setForm] = useState(emptyForm)

    return (
        <BrowserRouter>
            <AlertProvider>
                <Box sx={{ height: '100vh' }}>
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
                </Box>
            </AlertProvider>
        </BrowserRouter>
    )
}

export default App
