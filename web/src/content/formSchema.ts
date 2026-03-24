export type FormFieldBase = { name: string; label: string; required?: boolean }

export type SelectField = FormFieldBase & {
  type: 'select'
  options: { value: string; label: string }[]
}

export type RadioField = FormFieldBase & {
  type: 'radio'
  options: { value: string; label: string }[]
}

export type CheckboxField = FormFieldBase & {
  type: 'checkbox'
  options: { value: string; label: string }[]
}

export type TextareaField = FormFieldBase & {
  type: 'textarea'
  maxWords: number
  placeholder?: string
}

export type FileField = FormFieldBase & {
  type: 'file'
  accept: string
}

export type TextField = FormFieldBase & {
  type: 'text' | 'email' | 'tel'
  placeholder?: string
}

export type FormField =
  | TextField
  | SelectField
  | RadioField
  | CheckboxField
  | TextareaField
  | FileField

/** Web rehberi §3 ile uyumlu alanlar */
export const applicationFormFields: FormField[] = [
  { name: 'fullName', label: 'Ad Soyad', type: 'text', required: true },
  { name: 'email', label: 'E-posta', type: 'email', required: true },
  { name: 'phone', label: 'Telefon', type: 'tel', required: true },
  {
    name: 'expertise',
    label: 'Uzmanlık alanı',
    type: 'select',
    required: true,
    options: [
      { value: '', label: 'Seçiniz…' },
      { value: 'mimarlik', label: 'Mimarlık' },
      { value: 'sehir-planlama', label: 'Şehir Planlama' },
      { value: 'yazilim', label: 'Yazılım' },
      { value: 'sosyoloji', label: 'Sosyoloji' },
      { value: 'diger', label: 'Diğer' },
    ],
  },
  {
    name: 'experience',
    label: 'Deneyim seviyesi',
    type: 'radio',
    required: true,
    options: [
      { value: 'ogrenci', label: 'Öğrenci' },
      { value: 'yeni-mezun', label: 'Yeni mezun' },
      { value: '1-5', label: '1–5 yıl' },
      { value: '5-plus', label: '5+ yıl' },
    ],
  },
  {
    name: 'skills',
    label: 'Teknik yetkinlikler',
    type: 'checkbox',
    options: [
      { value: 'qgis', label: 'QGIS' },
      { value: 'sketchup', label: 'SketchUp' },
      { value: 'autocad', label: 'AutoCAD' },
      { value: 'arcgis', label: 'ArcGIS' },
      { value: 'canva', label: 'Canva' },
      { value: 'figma', label: 'Figma' },
    ],
  },
  {
    name: 'motivation',
    label: 'Neden bu Hackathon sürecinde yer almak istiyorsunuz?',
    type: 'textarea',
    maxWords: 200,
    required: true,
    placeholder: 'En fazla 200 kelime…',
  },
  {
    name: 'problem',
    label: 'İzmit veya Darıca özelinde gözlemlediğiniz en kritik yaya erişim sorunu nedir?',
    type: 'textarea',
    maxWords: 250,
    required: true,
    placeholder: 'En fazla 250 kelime…',
  },
  {
    name: 'portfolio',
    label: 'Öğrenci belgesi / portfolyo (PDF)',
    type: 'file',
    accept: '.pdf,application/pdf',
    required: false,
  },
]
