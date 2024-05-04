import { createI18n } from "vue-i18n";

import ar from "./lang/ar-SA.json";
import cn from "./lang/zh-CN.json";
import de from "./lang/de.json";
import en from "./lang/en-US.json";
import es from "./lang/es.json";
import fr from "./lang/fr.json";
import id from "./lang/id.json";
import it from "./lang/it.json";
import ja from "./lang/ja.json";
import ko from "./lang/ko.json";
import nl from "./lang/nl.json";
import pt from "./lang/pt.json";
import ru from "./lang/ru.json";
import tw from "./lang/zh-TW.json";
import vi from "./lang/vi.json";

const messages = {
  ar,
  cn,
  de,
  en,
  es,
  fr,
  id,
  it,
  ja,
  ko,
  nl,
  pt,
  ru,
  tw,
  vi
};

const lang = (navigator.language || "en").toLocaleLowerCase();

const language = localStorage.getItem("language") || lang.split("-")[0] || "en";

localStorage.setItem("language", language);

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: language,
  fallbackLocale: "en",
  messages,
  silentTranslationWarn: true,
  missingWarn: false,
  silentFallbackWarn: true,
  fallbackWarn: false
});

export { i18n };
