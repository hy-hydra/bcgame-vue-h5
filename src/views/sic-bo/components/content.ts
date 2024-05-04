import animal1 from '~/sic-bo/animal1.png'
import animal2 from '~/sic-bo/animal2.png'
import animal3 from '~/sic-bo/animal3.png'
import animal4 from '~/sic-bo/animal4.png'
import animal5 from '~/sic-bo/animal5.png'
import animal6 from '~/sic-bo/animal6.png'

// interface RETTING_BOX_SINGLE_PRESSURE_TYPE {
//     lable: string, value: string, img: string, id: string
// }[]

const BETTING_BOX = [
    { label: 'Big', value: '1-0', id: '1.95' },
    { label: 'Small', value: '1-1', id: '1.95' },
    { label: 'Odd', value: '1-2', id: '1.95' },
    { label: 'Even', value: '1-3', id: '1.95' }
]

const IMG_LIST = {
    1: animal1,
    2: animal2,
    3: animal3,
    4: animal4,
    5: animal5,
    6: animal6,
}

const RETTING_BOX_SINGLE_PRESSURE = [
    { label: 'animal1', value: '2-1', img: animal1, id: '1.9' },
    { label: 'animal2', value: '2-2', img: animal2, id: '1.9' },
    { label: 'animal3', value: '2-3', img: animal3, id: '1.9' },
    { label: 'animal4', value: '2-4', img: animal4, id: '1.9' },
    { label: 'animal5', value: '2-5', img: animal5, id: '1.9' },
    { label: 'animal6', value: '2-6', img: animal6, id: '1.9' }
]

const RETTING_BOX_DUAL_PRESSURE = [
    { label: '1,2', value: '3-12', img: [animal1, animal2], id: '6.84' },
    { label: '1,3', value: '3-13', img: [animal1, animal3], id: '6.84' },
    { label: '1,4', value: '3-14', img: [animal1, animal4], id: '6.84' },
    { label: '1,5', value: '3-15', img: [animal1, animal5], id: '6.84' },
    { label: '1,6', value: '3-16', img: [animal1, animal6], id: '6.84' },
    { label: '2,3', value: '3-23', img: [animal2, animal3], id: '6.84' },
    { label: '2,4', value: '3-24', img: [animal2, animal4], id: '6.84' },
    { label: '2,5', value: '3-25', img: [animal2, animal5], id: '6.84' },
    { label: '2,6', value: '3-26', img: [animal2, animal6], id: '6.84' },
    { label: '3,4', value: '3-34', img: [animal3, animal4], id: '6.84' },
    { label: '3,5', value: '3-35', img: [animal3, animal5], id: '6.84' },
    { label: '3,6', value: '3-36', img: [animal3, animal6], id: '6.84' },
    { label: '4,5', value: '3-45', img: [animal4, animal5], id: '6.84' },
    { label: '4,6', value: '3-46', img: [animal4, animal6], id: '6.84' },
    { label: '5,6', value: '3-56', img: [animal5, animal6], id: '6.84' },
]

export { BETTING_BOX, IMG_LIST, RETTING_BOX_SINGLE_PRESSURE, RETTING_BOX_DUAL_PRESSURE };