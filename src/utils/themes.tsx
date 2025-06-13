import { createTheme } from '@mui/material/styles';

export const themes = createTheme({
    typography: {
        button: {
            textTransform: 'capitalize',
        },
    },
    palette: {
        primary: {
            main: '#006FB8',
        },
        secondary: {
            main: "#DD6502"
        }
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    "& .MuiInput-underline:after": {
                        borderBottomColor: '#F1F5F9',
                        borderWidth: '2px',
                        borderRadius: '10px'
                    },
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: '#F1F5F9',
                            borderWidth: '2px',
                            borderRadius: '10px'
                        }
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: '#F1F5F9',
                        borderWidth: '2px',
                        borderRadius: '10px'
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: '#39B8E7',
                        borderWidth: '2px',
                        borderRadius: '10px'
                    }
                }
            }
        },
        MuiSelect: {
            styleOverrides: {
                root: {
                    "& .MuiInput-underline:after": {
                        borderBottomColor: '#006FB8',
                        borderWidth: '2px',
                        borderRadius: '10px'
                    },
                    "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                            borderColor: '#006FB8',
                            borderWidth: '2px',
                            borderRadius: '10px'
                        }
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: '#F1F5F9',
                        borderWidth: '2px',
                        borderRadius: '10px'
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: '#39B8E7',
                        borderWidth: '2px',
                        borderRadius: '10px'
                    }
                }
            }
        }
    }
});