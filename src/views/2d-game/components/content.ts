import { useI18n } from 'vue-i18n';

interface TYPE {
    label: string, value: string | number, key?: number
}

// 使用函数封装，确保在使用时能正确访问i18n
function useTopSwitchBar() {
    const { t } = useI18n();

    const TOP_SWITCH_BAR: TYPE[] = [
        { label: t("2d-game.First"), value: 0 },
        { label: t("2d-game.Second"), value: 1 },
    ];

    return TOP_SWITCH_BAR;
}


function useOpenList() {
    const { t } = useI18n();

    const OPERATE_LIST: TYPE[] = [
        { label: t("2d-game.All"), value: 'All'},
        { label: t("2d-game.Big"), value: 'Big'},
        { label: t("2d-game.Small"), value: 'Small'},
        { label: t("2d-game.Odd"), value: 'Odd'},
        { label: t("2d-game.Even"), value: 'Even'},
        { label: t("2d-game.Clean"), value: 'Clean'},
    ];

    return OPERATE_LIST;
}

function useOpenHeader() {
    const { t } = useI18n();

    const OPERATE_HEADER = [t("2d-game.First"), t("2d-game.Second")];

    return OPERATE_HEADER;
}

export { useTopSwitchBar, useOpenList, useOpenHeader};