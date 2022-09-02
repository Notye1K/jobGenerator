import { Snackbar } from '@mui/material'
import { createContext, forwardRef } from 'react'
import { useState } from 'react'
import MuiAlert from '@mui/material/Alert'

const AlertContext = createContext()

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

export function AlertProvider({ children }) {
    const [message, setMessage] = useState('')
    const [open, setOpen] = useState(false)

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    return (
        <AlertContext.Provider
            value={{
                message,
                setMessage,
                open,
                setOpen,
            }}
        >
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert
                    onClose={handleClose}
                    severity="error"
                    sx={{ width: '100%' }}
                >
                    {message}
                </Alert>
            </Snackbar>
            {children}
        </AlertContext.Provider>
    )
}

export default AlertContext
