import { useEffect } from "react";
import { theme, ConfigProvider, App as AppProvider } from "antd";
import { RootState, useSelector } from "@/redux";
import { I18nextProvider } from "react-i18next";
import { useDispatch } from "react-redux";
import { setGlobalState } from "@/redux/modules/global";
import { LanguageType } from "@/redux/interface";
import { getBrowserLang } from "@/utils";
import RouterProvider from "@/routers";
import i18n from "@/languages/index";
import enUS from "antd/locale/en_US";
import zhCN from "antd/locale/zh_CN";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { isDark, primary, componentSize, compactAlgorithm, borderRadius, language } = useSelector(
    (state: RootState) => state.global
  );

  // init theme algorithm
  const algorithm = () => {
    const algorithmArr = isDark ? [theme.darkAlgorithm] : [theme.defaultAlgorithm];
    if (compactAlgorithm) algorithmArr.push(theme.compactAlgorithm);
    return algorithmArr;
  };

  // init language
  const initLanguage = () => {
    const result = language ?? getBrowserLang();
    dispatch(setGlobalState({ key: "language", value: result as LanguageType }));
    i18n.changeLanguage(language as string);
    dayjs.locale(language === "zh" ? "zh-cn" : "en");
  };

  useEffect(() => {
    initLanguage();
  }, [language]);

  return (
    <ConfigProvider
      locale={language === "zh" ? zhCN : enUS}
      componentSize={componentSize}
      theme={{
        token: { colorPrimary: primary, borderRadius },
        algorithm: algorithm()
      }}
    >
      <AppProvider>
        <I18nextProvider i18n={i18n}>
          <RouterProvider />
        </I18nextProvider>
      </AppProvider>
    </ConfigProvider>
  );
};

export default App;
