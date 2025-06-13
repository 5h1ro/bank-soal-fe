import { TestData } from '../types/test.types';

export const CFIT_TEST_DATA: TestData = {
    id: 'cfit-001',
    category: 'Inteligensi/ Kognitif',
    method: 'On Site',
    title: 'Culture Fair Intelligence Test (CFIT)',
    price: 300000,
    description: [
        'Culture Fair Intelligence Test (CFIT) adalah alat pengukuran kecerdasan yang dirancang untuk mengurangi pengaruh faktor budaya dan lingkungan dalam penilaian kemampuan kognitif seseorang. CFIT dirancang untuk meminimalkan ketidaksetaraan dalam pengukuran kecerdasan antarindividu yang disebabkan oleh perbedaan latar belakang budaya, sosial, dan pendidikan.',
        'CFIT mengukur berbagai aspek kecerdasan, termasuk kemampuan verbal, numerik, dan spasial, dengan menggunakan gambar-gambar, pola-pola, dan simbol-simbol yang memiliki sedikit atau bahkan tidak ada keterkaitan dengan budaya tertentu. Dengan demikian, CFIT memungkinkan evaluasi kemampuan kognitif seseorang tanpa terlalu bergantung pada pengetahuan dan pengalaman budaya spesifik.',
        'Instrumen ini biasanya digunakan dalam konteks penilaian psikologis, pendidikan, dan seleksi personal untuk memperoleh gambaran yang lebih objektif tentang kemampuan intelektual seseorang. Dengan pendekatan yang lebih netral terhadap budaya, CFIT dapat memberikan hasil yang lebih adil dan akurat, terutama dalam situasi di mana keberagaman budaya dan latar belakang individu menjadi faktor penting.'
    ]
};

// Function to get test data by ID (for future API integration)
export const getTestById = (id: string): TestData | null => {
    // This would typically fetch from an API
    // For now, return the hardcoded data if ID matches
    if (id === CFIT_TEST_DATA.id) {
        return CFIT_TEST_DATA;
    }
    return null;
};
