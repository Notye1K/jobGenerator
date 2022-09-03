import { Box, Button, Container, Typography } from '@mui/material'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import pdfGenerator from '../assets/pdfGenerator'
import AlertContext from './AlertContext'

function Summary({ form, setForm }) {
    const bonus = JSON.parse(localStorage.getItem('bonus')) || []
    const phases = JSON.parse(localStorage.getItem('phases')) || []
    const skills = JSON.parse(localStorage.getItem('skills')) || []
    const forms = JSON.parse(localStorage.getItem('forms')) || []

    const navigate = useNavigate()
    const { setOpen, setMessage } = useContext(AlertContext)

    useEffect(() => {
        if (!form.title || !form.salary || !form.activity) {
            setMessage('Preencha os Campos antes de prosseguir')
            setType('error')
            setOpen(true)
            navigate('/')
            return
        }
        setForm({
            ...form,
            salary: parseFloat(form.salary).toFixed(2).toString(),
        })
    }, [])

    function handleSave() {
        try {
            let hashTable = {}
            bonus.forEach((bonus) => {
                hashTable[bonus] = true
            })
            form.bonus.forEach((formBonus) => {
                if (!hashTable[formBonus]) {
                    bonus.push(formBonus)
                }
            })
            localStorage.setItem('bonus', JSON.stringify(bonus))

            hashTable = {}
            phases.forEach((phase) => {
                hashTable[phase] = true
            })
            form.phases.forEach((formPhase) => {
                if (!hashTable[formPhase]) {
                    phases.push(formPhase)
                }
            })
            localStorage.setItem('phases', JSON.stringify(phases))

            hashTable = {}
            skills.forEach((skill) => {
                hashTable[skill] = true
            })
            form.skills.forEach((formskill) => {
                if (!hashTable[formskill]) {
                    skills.push(formskill)
                }
            })
            localStorage.setItem('skills', JSON.stringify(skills))

            const newForms = forms.filter(
                (localForm) => localForm.title !== form.title
            )
            newForms.push(form)
            localStorage.setItem('forms', JSON.stringify(newForms))

            setMessage('Salvo com sucesso')
            setType('success')
            setOpen(true)
        } catch (error) {
            console.log(error)
            setMessage('Ops, algo deu errado tente novamente mais tarde!')
            setType('error')
            setOpen(true)
        }
    }

    return (
        <Container
            sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
        >
            <Container sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h3">{form.title.toUpperCase()}</Typography>
            </Container>
            <Box>
                <Typography variant="h6">Salário:</Typography>
                <Typography variant="subtitle1" sx={{ marginLeft: '20px' }}>
                    R$: {form.salary}
                </Typography>
            </Box>
            <Box>
                <Typography variant="h6">Atividades do dia a dia:</Typography>
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
            <Button onClick={handleSave}>Salvar</Button>
            <Button onClick={() => pdfGenerator(form)}>Exportar pdf</Button>
        </Container>
    )
}

export default Summary
