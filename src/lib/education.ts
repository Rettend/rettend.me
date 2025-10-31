export interface Education {
  school: string
  program: string
  period: string
  note?: string
}

export const education: Education[] = [
  {
    school: 'Eötvös Loránd University (ELTE)',
    program: 'BSc',
    note: 'Computer Science',
    period: '2023 - 2026',
  },
  {
    school: 'GYSZC Jedlik Ányos Technikum',
    program: 'Post-secondary Non-Tertiary Education',
    note: 'Software Engineering',
    period: '2022 - 2023',
  },
  {
    school: 'GYSZC Jedlik Ányos Technikum',
    program: 'High School',
    note: 'Computer Science',
    period: '2018 - 2022',
  },
]
