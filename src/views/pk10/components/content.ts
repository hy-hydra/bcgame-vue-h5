import { useI18n } from 'vue-i18n';

export interface TYPE {
    label: string, value: string | number, key?: number
}

function useTopSwitchBar() {
    const { t } = useI18n();
    const TOP_SWITCH_BAR: TYPE[] = [
        { label: t('pk10.Guanya-Direct Menu'), value: 0},
        { label: t('pk10.Pick a location3'), value: 1},
        { label: t('pk10.Two-sided plate'), value: 2},
    ]
    return TOP_SWITCH_BAR;
}

function useOpenList() {
    const { t } = useI18n();
    const OPERATE_LIST: TYPE[] = [
        { label:  t('pk10.All'), value: 'All'},
        { label:  t('pk10.Big'), value: 'Big'},
        { label:  t('pk10.Small'), value: 'Small'},
        { label:  t('pk10.Odd'), value: 'Odd'},
        { label:  t('pk10.Even'), value: 'Even'},
        { label:  t('pk10.Clean'), value: 'Clean'},
    ]
    return OPERATE_LIST;
}

function useCastingCode() {
    const { t } = useI18n();
    const CASTING_CODE: TYPE[] = [
        { label: t('pk10.Big'), value: '00', key: 1.9},
        { label: t('pk10.Odd'), value: '01', key: 1.9},
        { label: t('pk10.Even'), value: '02', key: 1.9},
        { label: t('pk10.Clean'), value: '03', key: 1.9},
    ]
    return CASTING_CODE;
}

const OPERATE_HEADER_ONE:TYPE[] = [
    { label: 'Champion', value: '01'}, 
    { label: 'Runner-up', value: '02'}
];
const OPERATE_HEADER_TWO:TYPE[] = [
    { label: 'Champion', value: '01'},
     { label: 'Runner-up', value: '02'},
     { label: '3th', value: '03'},
     { label: '4th', value: '04'},
     { label: '5th', value: '05'},
     { label: '6th', value: '06'},
     { label: '7th', value: '07'},
     { label: '8th', value: '08'},
     { label: '9th', value: '09'},
     { label: '10th', value: '10'},
    ];

export { useTopSwitchBar, useOpenList, useCastingCode, OPERATE_HEADER_ONE, OPERATE_HEADER_TWO };