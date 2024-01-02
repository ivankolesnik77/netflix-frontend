import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from './store';
// import { makeStore, AppStore } from "./store";
const store = makeStore();
export default function StoreProvider({ children }: { children: React.ReactNode }) {
    // const storeRef = useRef<AppStore | null>(null);
    // if (!storeRef.current) {
    //     storeRef.current = makeStore();
    // }

    return <Provider store={store}>{children}</Provider>;
}
