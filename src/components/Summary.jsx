import {
    Box,
    Button,
    Container,
    Typography,
    useMediaQuery,
} from '@mui/material'
import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import pdfGenerator from '../assets/pdfGenerator'
import AlertContext from './AlertContext'

const typographyStyle = {
    textAlign: 'center',
}

function Summary({ form, setForm }) {
    const bonus = JSON.parse(localStorage.getItem('bonus')) || []
    const phases = JSON.parse(localStorage.getItem('phases')) || []
    const skills = JSON.parse(localStorage.getItem('skills')) || []
    const forms = JSON.parse(localStorage.getItem('forms')) || []

    const media = useMediaQuery('(min-width:450px)')

    const navigate = useNavigate()
    const { setOpen, setMessage, setType } = useContext(AlertContext)

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

    function localSave(array, name) {
        const hashTable = {}
        array.forEach((element) => {
            hashTable[element] = true
        })
        form[name].forEach((formElement) => {
            if (!hashTable[formElement]) {
                array.push(formElement)
            }
        })
        localStorage.setItem(name, JSON.stringify(array))
    }

    function handleSave() {
        try {
            localSave(bonus, 'bonus')

            localSave(phases, 'phases')

            localSave(skills, 'skills')

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
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                minHeight: '85%',
            }}
        >
            <Container
                sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
            >
                <Typography sx={{ ...typographyStyle, mb: 2 }} variant="h4">
                    {form.title.toUpperCase()}
                </Typography>

                <Box>
                    <Typography sx={typographyStyle} variant="h6">
                        Salário:
                    </Typography>
                    <Typography variant="subtitle1" sx={typographyStyle}>
                        R$: {form.salary}
                    </Typography>
                </Box>
                <Box>
                    <Typography sx={typographyStyle} variant="h6">
                        Atividades do dia a dia:
                    </Typography>
                    <Typography variant="subtitle1" sx={typographyStyle}>
                        {form.activity}
                    </Typography>
                </Box>
                <Box>
                    <Typography sx={typographyStyle} variant="h6">
                        Benefícios:
                    </Typography>
                    <Typography variant="subtitle1" sx={typographyStyle}>
                        {form.bonus.join(' + ')}
                    </Typography>
                </Box>
                <Box>
                    <Typography sx={typographyStyle} variant="h6">
                        Fases do processo:
                    </Typography>
                    <Typography variant="subtitle1" sx={typographyStyle}>
                        {form.phases.join(' => ')}
                    </Typography>
                </Box>
                <Box>
                    <Typography sx={typographyStyle} variant="h6">
                        Habilidades necessárias:
                    </Typography>
                    <Typography variant="subtitle1" sx={typographyStyle}>
                        {form.skills.join(' - ')}
                    </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                    <Typography sx={typographyStyle} variant="h6">
                        Experiência necessária:
                    </Typography>
                    <Typography variant="subtitle1" sx={typographyStyle}>
                        {form.experience}
                    </Typography>
                </Box>
            </Container>
            <Box
                sx={
                    media
                        ? {
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              my: 2,
                          }
                        : { display: 'flex', flexDirection: 'column', my: 2 }
                }
            >
                <Button onClick={() => navigate('/')}>Voltar</Button>
                <Button onClick={() => pdfGenerator(form)}>Exportar pdf</Button>
                <Button onClick={handleSave}>Salvar</Button>
            </Box>
        </Container>
    )
}

export default Summary
