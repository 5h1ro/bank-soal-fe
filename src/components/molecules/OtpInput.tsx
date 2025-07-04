import { Input as BaseInput } from '@mui/base/Input';
import { Box, styled } from '@mui/system';
import * as React from 'react';

function OTP({
    separator,
    length,
    value,
    onChange,
}: {
    separator: React.ReactNode;
    length: number;
    value: string;
    onChange: React.Dispatch<React.SetStateAction<string>>;
}) {
    const inputRefs = React.useRef<HTMLInputElement[]>(new Array(length).fill(null));

    const focusInput = (targetIndex: number) => {
        const targetInput = inputRefs.current[targetIndex];
        targetInput.focus();
    };

    const selectInput = (targetIndex: number) => {
        const targetInput = inputRefs.current[targetIndex];
        targetInput.select();
    };

    const handleKeyDown = (
        event: React.KeyboardEvent<HTMLInputElement>,
        currentIndex: number,
    ) => {
        switch (event.key) {
            case 'ArrowUp':
            case 'ArrowDown':
            case ' ':
                event.preventDefault();
                break;
            case 'ArrowLeft':
                event.preventDefault();
                if (currentIndex > 0) {
                    focusInput(currentIndex - 1);
                    selectInput(currentIndex - 1);
                }
                break;
            case 'ArrowRight':
                event.preventDefault();
                if (currentIndex < length - 1) {
                    focusInput(currentIndex + 1);
                    selectInput(currentIndex + 1);
                }
                break;
            case 'Delete':
                event.preventDefault();
                onChange((prevOtp) => {
                    const otp =
                        prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
                    return otp;
                });

                break;
            case 'Backspace':
                event.preventDefault();
                if (currentIndex > 0) {
                    focusInput(currentIndex - 1);
                    selectInput(currentIndex - 1);
                }

                onChange((prevOtp) => {
                    const otp =
                        prevOtp.slice(0, currentIndex) + prevOtp.slice(currentIndex + 1);
                    return otp;
                });
                break;

            default:
                break;
        }
    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>,
        currentIndex: number,
    ) => {
        const currentValue = event.target.value;
        let indexToEnter = 0;

        while (indexToEnter <= currentIndex) {
            if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
                indexToEnter += 1;
            } else {
                break;
            }
        }
        onChange((prev) => {
            const otpArray = prev.split('');
            const lastValue = currentValue[currentValue.length - 1];
            otpArray[indexToEnter] = lastValue;
            return otpArray.join('');
        });
        if (currentValue !== '') {
            if (currentIndex < length - 1) {
                focusInput(currentIndex + 1);
            }
        }
    };

    const handleClick = (
        event: React.MouseEvent<HTMLInputElement, MouseEvent>,
        currentIndex: number,
    ) => {
        selectInput(currentIndex);
    };

    const handlePaste = (
        event: React.ClipboardEvent<HTMLInputElement>,
        currentIndex: number,
    ) => {
        event.preventDefault();
        const clipboardData = event.clipboardData;

        // Check if there is text data in the clipboard
        if (clipboardData.types.includes('text/plain')) {
            let pastedText = clipboardData.getData('text/plain');
            pastedText = pastedText.substring(0, length).trim();
            let indexToEnter = 0;

            while (indexToEnter <= currentIndex) {
                if (inputRefs.current[indexToEnter].value && indexToEnter < currentIndex) {
                    indexToEnter += 1;
                } else {
                    break;
                }
            }

            const otpArray = value.split('');

            for (let i = indexToEnter; i < length; i += 1) {
                const lastValue = pastedText[i - indexToEnter] ?? ' ';
                otpArray[i] = lastValue;
            }

            onChange(otpArray.join(''));
        }
    };

    return (
        <Box sx={{
            display: 'flex', alignItems: 'center', gap: {
                xs: 0.5,
                md: 1,
            },
        }}>
            {new Array(length).fill(null).map((_, index) => (
                <React.Fragment key={index}>
                    <BaseInput
                        slots={{
                            input: InputElement,
                        }}
                        aria-label={`Digit ${index + 1} of OTP`}
                        slotProps={{
                            input: {
                                ref: (ele) => {
                                    inputRefs.current[index] = ele!;
                                },
                                onKeyDown: (event) => handleKeyDown(event, index),
                                onChange: (event) => handleChange(event, index),
                                onClick: (event) => handleClick(event, index),
                                onPaste: (event) => handlePaste(event, index),
                                value: value[index] ?? '',
                            },
                        }}
                    />
                    {index === length - 1 ? null : separator}
                </React.Fragment>
            ))}
        </Box>
    );
}

interface OTPInputProps {
    otp: string,
    setOtp: React.Dispatch<React.SetStateAction<string>>
}

export default function OTPInput(props: OTPInputProps) {
    const { otp, setOtp } = props
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <OTP separator={<span></span>} value={otp} onChange={setOtp} length={6} />
        </Box>
    );
}

const primary = {
    50: "#EBFFFD",
    100: "#CDFFFC",
    200: "#A1FFFD",
    300: "#61FFFE",
    400: "#1AF4F6",
    500: "#1AF4F6",
    600: "#01B3C1",
    700: "#098895",
    800: "#116D79",
    900: "#135966",
};

const grey = {
    50: '#F3F6F9',
    100: '#E5EAF2',
    200: '#DAE2ED',
    300: '#C7D0DD',
    400: '#B0B8C4',
    500: '#9DA8B7',
    600: '#6B7A90',
    700: '#434D5B',
    800: '#303740',
    900: '#1C2025',
};

const InputElement = styled('input')(
    ({ theme }) => `
  width: 50px;
  height: 34px;
  font-weight: 400;
  padding: 8px 0px;
  border-radius: 8px;
  text-align: center;
  color: ${theme.palette.mode === 'dark' ? grey[300] : grey[900]};
  background: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};
  border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
  box-shadow: 0px 2px 4px ${theme.palette.mode === 'dark' ? 'rgba(0,0,0, 0.5)' : 'rgba(0,0,0, 0.05)'
        };

  &:hover {
    border-color: ${primary[600]};
  }

  &:focus {
    border-color: ${primary[600]};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }

  @media (min-width: 0px) {
    width: 35px;
    height: 20px;
  }

  @media (min-width: 480px) {
    width: 50px;
    height: 34px;
  }

  @media (min-width: 1024px) {
    width: 50px;
    height: 34px;
  }
`,
);
