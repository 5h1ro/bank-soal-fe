interface CurrencyProps {
    value: number;
}

export default function Currency(props: CurrencyProps) {
    const { value } = props;
    return new Intl.NumberFormat('id', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value)
}