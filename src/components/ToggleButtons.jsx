import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft'
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'

export default function ToggleButtons({ alignment, setAlignment }) {
    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment)
    }

    return (
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
        >
            <ToggleButton value="left" aria-label="left aligned">
                <FormatAlignLeftIcon />
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
                <FormatAlignCenterIcon />
            </ToggleButton>
        </ToggleButtonGroup>
    )
}
