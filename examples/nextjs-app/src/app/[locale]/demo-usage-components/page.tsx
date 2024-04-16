import { ClientComponentExample } from '@component/components/ClientComponentExample';
import { LocaleSwitcher } from '@component/components/LangSwitcherDropDown';
import { NestedServerComponentExample } from '@component/components/NestedServerComponentExample';
import { ServerComponentExample } from '@component/components/ServerComponentExample';
import {
  type NextPageIntlayer,
  LocaleClientContextProvider,
} from 'next-intlayer';
import { LocaleServerContextProvider } from 'next-intlayer/server';

const PageDemoUsageComponents: NextPageIntlayer = ({ params: { locale } }) => {
  return (
    <>
      {/**
       *   LocaleServerContextProvider is used to provide the locale to the server children
       *   LocaleServerContextProvider don't work if set in the layout
       */}
      <LocaleServerContextProvider locale={locale}>
        {/**
         *   LocaleClientContextProvider is used to provide the locale to the client children
         *   LocaleClientContextProvider can be set in any parent component, including the layout
         */}
        <LocaleClientContextProvider locale={locale}>
          <main className="size-screen	 m-auto flex max-w-xl flex-col items-center justify-center gap-8 p-20">
            <ClientComponentExample />
            <ServerComponentExample />
            <NestedServerComponentExample />
          </main>
          <div className="absolute bottom-5 right-5 z-50">
            <LocaleSwitcher />
          </div>
        </LocaleClientContextProvider>
      </LocaleServerContextProvider>
    </>
  );
};
export default PageDemoUsageComponents;