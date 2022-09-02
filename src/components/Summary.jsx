import { Box, Button, Container, Typography } from '@mui/material'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from './AlertContext'

function Summary({ form, setForm }) {
    const navigate = useNavigate()
    const { setOpen, setMessage } = useContext(AlertContext)

    useEffect(() => {
        if (!form.title || !form.salary || !form.activity) {
            setMessage('Preencha os Campos antes de prosseguir')
            setOpen(true)
            navigate('/')
            return
        }
        setForm({
            ...form,
            salary: parseFloat(form.salary).toFixed(2).toString(),
        })
    }, [])

    return (
        <Container
            sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
            <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h3">{form.title}</Typography>
            </Container>
            <Box>
                <Typography variant="h6">Salário:</Typography>
                <Typography variant="subtitle1" sx={{ marginLeft: '20px' }}>
                    R$: {form.salary}
                </Typography>
            </Box>
            <Box>
                <Typography variant="h6">
                    Atividades que você vai fazer no dia a dia:
                </Typography>
                <Typography variant="subtitle1" sx={{ marginLeft: '20px' }}>
                    {form.activity}
                </Typography>
            </Box>
            <Box>
                <Typography variant="h6">Beneficios:</Typography>
                <Typography variant="subtitle1" sx={{ marginLeft: '20px' }}>
                    {form.bonus.join(' - ')}
                </Typography>
            </Box>
            <Box>
                <Typography variant="h6">Fases do processo:</Typography>
                <Typography variant="subtitle1" sx={{ marginLeft: '20px' }}>
                    {form.phases.join(' => ')}
                </Typography>
            </Box>
            <Box>
                <Typography variant="h6">Habilidades necessárias:</Typography>
                <Typography variant="subtitle1" sx={{ marginLeft: '20px' }}>
                    {form.skills.join(', ')}
                </Typography>
            </Box>
            <Box>
                <Typography variant="h6">Experiência necessária:</Typography>
                <Typography variant="subtitle1" sx={{ marginLeft: '20px' }}>
                    {form.experience}
                </Typography>
            </Box>
            <Button onClick={() => navigate('/')}>Voltar</Button>
            <Button>Exportar</Button>
        </Container>
    )
}

export default Summary
