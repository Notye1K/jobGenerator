import { Container } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import NewFormModal from './NewFormModal'
import donaMaria from '../assets/dona-maria.png'

function Header({ setForm, emptyForm }) {
    const navigate = useNavigate()

    function handleClick() {
        setForm(emptyForm)
        navigate('/')
    }
    return (
        <Container
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 5,
            }}
        >
            <NewFormModal handleClick={handleClick}>
                Novo formulario
            </NewFormModal>
            <img src={donaMaria} style={{ width: '100px' }} alt="dona maria" />
        </Container>
    )
}

export default Header
