import { ReactElement, ReactNode } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { I18nextProvider } from 'react-i18next'
import { makeStore, AppStore } from '../store/store'
import i18n from '../i18n/i18n'

// Deterministic language for assertions regardless of the host's detected locale.
i18n.changeLanguage('en')

interface ExtendedRenderOptions extends Omit<RenderOptions, 'wrapper'> {
    store?: AppStore
}

export const renderWithStore = (
    ui: ReactElement,
    { store = makeStore(), ...options }: ExtendedRenderOptions = {},
) => {
    const Wrapper = ({ children }: { children: ReactNode }) => (
        <Provider store={store}>
            <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
        </Provider>
    )
    return { store, ...render(ui, { wrapper: Wrapper, ...options }) }
}
