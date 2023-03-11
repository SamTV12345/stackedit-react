/**
 * Creates a throttled function that only invokes the provided function (`func`) at most once per within a given number of milliseconds
 * (`limit`)
 */
export function throttle<T extends (...args: any) => any>(func: T, limit: number): ThrottledFunction<T> {
    let inThrottle: boolean;
    let lastResult: ReturnType<T>;

    return function(this: any): ReturnType<T> {
        const args = arguments;
        const context = this;

        if (!inThrottle) {
            inThrottle = true;

            setTimeout(() => (inThrottle = false), limit);

            // @ts-ignore
            lastResult = func.apply(context, args);
        }

        return lastResult;
    };
}

export type ThrottledFunction<T extends (...args: any) => any> = (...args: Parameters<T>) => ReturnType<T>;
