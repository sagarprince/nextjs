
import { useSyncExternalStore } from 'react';

export default function useNetworkSpeed() {
    const speed = useSyncExternalStore(subscribe, getSnapshot, () => 1);
    return speed;
}

function getSnapshot() {
    if ('connection' in navigator && 'downlink' in (navigator.connection as any)) {
        return (navigator.connection as any).downlink;
    }
}

function subscribe(callback: () => void): () => void {
    if ('connection' in navigator) {
        (navigator.connection as any).addEventListener('change', callback);
    }
    return () => {
        if ('connection' in navigator) {
            (navigator.connection as any).removeEventListener('change', callback);
        }
    };
}