import { ReactNode } from 'react'

import { subDays, addDays, startOfMonth, addMonths, endOfMonth } from 'date-fns'

interface Range {
    label: ReactNode;
    value: [Date, Date];
    closeOverlay?: boolean;
    placement?: 'left';
}

const selectedLang = localStorage.getItem('selectedLanguage');

export const initRanges: Range[] = [
    {
        label: (selectedLang && selectedLang != 'id') ? 'Today' : 'Hari Ini',
        value: [new Date(), new Date()],
        placement: 'left'
    },
    {
        label: (selectedLang && selectedLang != 'id') ? 'Yesterday' : 'Kemarin',
        value: [addDays(new Date(), -1), addDays(new Date(), -1)],
        placement: 'left'
    },
    {
        label: (selectedLang && selectedLang != 'id') ? 'Last 7 Days' : '7 Hari Terakhir',
        value: [subDays(new Date(), 6), new Date()],
        placement: 'left'
    },
    {
        label: (selectedLang && selectedLang != 'id') ? 'Last 30 Days' : '30 Hari Terakhir',
        value: [subDays(new Date(), 29), new Date()],
        placement: 'left'
    },
    {
        label: (selectedLang && selectedLang != 'id') ? 'This Month' : 'Bulan Ini',
        value: [startOfMonth(new Date()), new Date()],
        placement: 'left'
    },
    {
        label: (selectedLang && selectedLang != 'id') ? 'Last Month' : 'Bulan Lalu',
        value: [startOfMonth(addMonths(new Date(), -1)), endOfMonth(addMonths(new Date(), -1))],
        placement: 'left'
    },
    {
        label: (selectedLang && selectedLang != 'id') ? 'This Year' : 'Tahun Ini',
        value: [new Date(new Date().getFullYear(), 0, 1), new Date()],
        placement: 'left'
    },
    {
        label: (selectedLang && selectedLang != 'id') ? 'Last Year' : 'Tahun Lalu',
        value: [new Date(new Date().getFullYear() - 1, 0, 1), new Date(new Date().getFullYear(), 0, 0)],
        placement: 'left'
    },
];

//Format Date DD-MM-YYYY
export const formatDateCustom = (tanggal: string): Date => {
    const selectedDate = tanggal.split('-').reverse().join('-');
    return new Date(selectedDate);
}

export const formatDateString = (tanggal: string): string => {
    const parts = tanggal.split('-');
    const year = parts[0];
    const month = parts[1];
    const day = parts[2];

    return `${day}-${month}-${year}`;
}