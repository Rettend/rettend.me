export interface Education {
  school: string
  program: string
  start: number
  end?: number
  note?: string
}

export const education: Education[] = [
  {
    school: 'Eötvös Loránd University (ELTE)',
    program: 'BSc',
    note: 'Computer Science',
    start: 2023,
    end: 2026,
  },
  {
    school: 'GYSZC Jedlik Ányos Technikum',
    program: 'Post-secondary Non-Tertiary Education',
    note: 'Software Engineering',
    start: 2022,
    end: 2023,
  },
  {
    school: 'GYSZC Jedlik Ányos Technikum',
    program: 'High School',
    note: 'Computer Science',
    start: 2018,
    end: 2022,
  },
]
