import {
    Autocomplete,
    Box,
    Button,
    Chip,
    Container,
    InputAdornment,
    TextField,
} from '@mui/material'
import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import AlertContext from './AlertContext'

function formValidation(finalForm) {
    if (!finalForm.experience) {
        finalForm.experience = 'Nenhuma experiência é necessária'
    }
    if (finalForm.skills.length === 0) {
        finalForm.skills = ['Nenhuma habilidade especial é necessária']
    }
    if (finalForm.bonus.length === 0) {
        finalForm.bonus = ['Esse cargo não oferece nenhum benefício']
    }
}

const renderTag = (value, getTagProps) =>
    value.map((option, index) => (
        <Chip variant="outlined" label={option} {...getTagProps({ index })} />
    ))

function Form({ form, setForm }) {
    const bonus = JSON.parse(localStorage.getItem('bonus')) || [
        'Esse cargo não oferece nenhum benefício',
    ]
    const phases = JSON.parse(localStorage.getItem('phases')) || [
        'Entrevista com RH',
    ]
    const skills = JSON.parse(localStorage.getItem('skills')) || [
        'Nenhuma habilidade especial é necessária',
    ]

    const navigate = useNavigate()
    const { setOpen, setMessage, setType } = useContext(AlertContext)

    function handleChange(name) {
        return (event, newValue) => {
            if (name === 'bonus' || name === 'phases' || name === 'skills') {
                setForm({ ...form, [name]: newValue })
            } else {
                setForm({ ...form, [name]: event.target.value })
            }
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        if (form.phases.length === 0) {
            setMessage('Preencha pelo menos uma etapa')
            setType('error')
            setOpen(true)
            return
        }
        const finalForm = form
        formValidation(finalForm)
        setForm({ ...finalForm })
        navigate('/resumo')
    }

    return (
        <Container
            component="form"
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                minHeight: '85%',
            }}
            onSubmit={handleSubmit}
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    id="title"
                    label="Título do cargo"
                    variant="outlined"
                    onChange={handleChange('title')}
                    value={form.title}
                    required
                />
                <TextField
                    value={form.salary}
                    onChange={handleChange('salary')}
                    label="Salário"
                    id="salary"
                    type="number"
                    required
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">R$</InputAdornment>
                        ),
                    }}
                />
                <TextField
                    id="activity"
                    label="Atividade que o cargo exerce"
                    variant="outlined"
                    multiline
                    value={form.activity}
                    onChange={handleChange('activity')}
                    required
                />
                <Autocomplete
                    multiple
                    id="bonus"
                    options={bonus.map((bonus) => bonus)}
                    value={form.bonus}
                    onChange={handleChange('bonus')}
                    defaultValue={['Entrevista com RH']}
                    freeSolo
                    renderTags={renderTag}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Benefícios do cargo"
                        />
                    )}
                />
                <Autocomplete
                    multiple
                    required
                    id="phases"
                    options={phases.map((phase) => phase)}
                    value={form.phases}
                    onChange={handleChange('phases')}
                    defaultValue={[]}
                    freeSolo
                    renderTags={renderTag}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Etapas do processo"
                        />
                    )}
                />
                <Autocomplete
                    multiple
                    required
                    id="skills"
                    options={skills.map((skill) => skill)}
                    value={form.skills}
                    onChange={handleChange('skills')}
                    defaultValue={[]}
                    freeSolo
                    renderTags={renderTag}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            variant="outlined"
                            label="Habilidades necessárias"
                        />
                    )}
                />
                <TextField
                    id="experience"
                    label="Experiência necessária"
                    value={form.experience}
                    onChange={handleChange('experience')}
                    variant="outlined"
                />
            </Box>
            <Button sx={{ my: 2 }} type="submit">
                Avançar
            </Button>
        </Container>
    )
}

export default Form
