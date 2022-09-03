import { Container } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import NewFormModal from './NewFormModal'
import donaMaria from '../assets/dona-maria.png'
import FormsModal from './FormsModal'

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
                mb: 3,
            }}
        >
            <NewFormModal handleClick={handleClick} />
            <FormsModal setForm={setForm} />
            <img src={donaMaria} style={{ width: '100px' }} alt="dona maria" />
        </Container>
    )
}

export default Header
