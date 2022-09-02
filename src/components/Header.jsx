import { Button } from '@mui/material'
import { Container } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import NewFormModal from './NewFormModal'

function Header({ setForm, emptyForm }) {
    const navigate = useNavigate()

    function handleClick() {
        setForm(emptyForm)
        navigate('/')
    }
    return (
        <Container>
            <NewFormModal handleClick={handleClick}>
                Novo formulario
            </NewFormModal>
        </Container>
    )
}

export default Header
