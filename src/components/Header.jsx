import { Button } from "@mui/material"
import { Container } from "@mui/system"
import { useNavigate } from "react-router-dom"

function Header({setForm, emptyForm}){
    const navigate = useNavigate()

    function handleClick(){
      setForm(emptyForm);
      navigate('/')
    }
    return(
    <Container>
        <Button onClick={handleClick} >Novo formulario</Button>
    </Container>
    )
}

export default Header