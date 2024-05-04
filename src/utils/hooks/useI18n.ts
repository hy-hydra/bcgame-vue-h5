import { useI18n } from "vue-i18n";

export default (root: string, key: string): string => {
  const { t } = useI18n();
  return t(`${root}.${key}`);
};
