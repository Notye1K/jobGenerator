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
    maxHeight: '100vh',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
}

export default function FormsModal({ setForm }) {
    const forms = JSON.parse(localStorage.getItem('forms')) || []
    const [open, setOpen] = React.useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    function handleClick(index) {
        setForm(forms[index])
        handleClose()
    }

    return (
        <div>
            <Button onClick={handleOpen}>Outros modelos</Button>
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
                        Modelos
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box
                            sx={{
                                overflow: 'auto',
                                maxHeight: '30vh',
                                m: 2,
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            {forms.length > 0 ? (
                                forms.map((form, index) => (
                                    <Button
                                        key={index}
                                        onClick={() => handleClick(index)}
                                    >
                                        {form.title}
                                    </Button>
                                ))
                            ) : (
                                <Typography>
                                    Nenhum modelo salvo ainda.
                                </Typography>
                            )}
                        </Box>
                        <Button onClick={handleClose}>Fechar</Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}
