import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

export default function NewFormModal({ handleClick }) {
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
            <Button onClick={handleOpen}>Novo formulario</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        sx={{ textAlign: 'center' }}
                    >
                        Dados anteriores serão apagados.
                        <br />
                        Deseja prosseguir?
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Button
                            onClick={() => {
                                handleClick()
                                handleClose()
                            }}
                        >
                            Sim
                        </Button>
                        <Button onClick={handleClose}>Não</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}
