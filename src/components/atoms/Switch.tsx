import { useSwitch, UseSwitchParameters } from '@mui/base/useSwitch';
import { styled } from '@mui/system';
import clsx from 'clsx';
import * as React from 'react';

interface SwitchProps {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  isActive: boolean;
}
export default function UseSwitchesCustom(props: SwitchProps) {
  const { isActive, setIsActive } = props;
  return <MUISwitch checked={isActive} onChange={() => setIsActive(!isActive)} />;
}

function MUISwitch(props: UseSwitchParameters) {
  const { getInputProps, checked, disabled, focusVisible } = useSwitch(props);

  const stateClasses = {
    checked,
    disabled,
    focusVisible,
  };

  return (
    <SwitchRoot>
      <SwitchTrack className={clsx(stateClasses)}>
        <SwitchThumb className={clsx(stateClasses)} />
      </SwitchTrack>
      <SwitchInput {...getInputProps()} />
    </SwitchRoot>
  );
}

const SwitchRoot = styled('span')`
  display: inline-block;
  position: relative;
  width: 60px;
  height: 32px;
`;

const SwitchInput = styled('input')`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  opacity: 0;
  z-index: 1;
  margin: 0;
  cursor: pointer;
`;

const SwitchThumb = styled('span')`
  position: absolute;
  display: block;
  background-color: #fff;
  width: 24px;
  height: 24px;
  border-radius: 60px;
  top: 4px;
  left: 6px;
  transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    display: block;
    content: '';
    width: 100%;
    height: 100%;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="-3 0 20 15"><path fill="${encodeURIComponent(
  '#94A3B8',
)}" d="M6.99999 5.58599L11.95 0.635986L13.364 2.04999L8.41399 6.99999L13.364 11.95L11.95 13.364L6.99999 8.41399L2.04999 13.364L0.635986 11.95L5.58599 6.99999L0.635986 2.04999L2.04999 0.635986L6.99999 5.58599Z"/></svg>')
      center center no-repeat;
  }

  &.focusVisible {
    background-color: #79b;
  }

  &.checked {
    transform: translateX(24px);

    &::before {
      background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="-1 0 15 10"><path fill="${encodeURIComponent(
  '#008FD7',
)}"  d="M4.66674 7.115L10.7947 0.986328L11.7381 1.92899L4.66674 9.00033L0.424072 4.75766L1.36674 3.81499L4.66674 7.115Z"/></svg>');
    }
  }
`;

const SwitchTrack = styled('span')(
  ({ theme }) => `
  border-radius: 60px;
  width: 100%;
  height: 100%;
  display: block;
  background-color: #CBD5E1;

  &.checked {
    background-color: #008FD7;
  }
`,
);