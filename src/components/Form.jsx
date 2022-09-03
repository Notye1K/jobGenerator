import {
    Autocomplete,
    Button,
    Chip,
    Container,
    InputAdornment,
    TextField,
} from '@mui/material'
import { useNavigate } from 'react-router-dom'

function Form({ form, setForm }) {
    const bonus = JSON.parse(localStorage.getItem('bonus')) || []
    const phases = JSON.parse(localStorage.getItem('phases')) || []
    const skills = JSON.parse(localStorage.getItem('skills')) || []

    const navigate = useNavigate()

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
        navigate('/resumo')
    }
    return (
        <Container
            component="form"
            sx={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
            onSubmit={handleSubmit}
        >
            <TextField
                id="outlined-basic"
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
                id="outlined-start-adornment"
                type="number"
                required
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">R$</InputAdornment>
                    ),
                }}
            />
            <TextField
                id="outlined-basic"
                label="Atividade que o cargo exerce"
                variant="outlined"
                multiline
                value={form.activity}
                onChange={handleChange('activity')}
                required
            />
            <Autocomplete
                multiple
                id="tags-filled"
                options={bonus.map((bonus) => bonus)}
                value={form.bonus}
                onChange={handleChange('bonus')}
                defaultValue={[]}
                freeSolo
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                        />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Beneficios do cargo"
                    />
                )}
            />
            <Autocomplete
                multiple
                required
                id="tags-filled"
                options={phases.map((phase) => phase)}
                value={form.phases}
                onChange={handleChange('phases')}
                defaultValue={[]}
                freeSolo
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                        />
                    ))
                }
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
                id="tags-filled"
                options={skills.map((skill) => skill)}
                value={form.skills}
                onChange={handleChange('skills')}
                defaultValue={[]}
                freeSolo
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                        <Chip
                            variant="outlined"
                            label={option}
                            {...getTagProps({ index })}
                        />
                    ))
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Habilidades necessárias"
                    />
                )}
            />
            <TextField
                id="outlined-basic"
                label="Experiência necessaria"
                value={form.experience}
                onChange={handleChange('experience')}
                variant="outlined"
            />
            <Button type="submit">Avançar</Button>
        </Container>
    )
}

export default Form
