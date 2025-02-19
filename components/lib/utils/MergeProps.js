export function mergeProps(...props) {
    if (props) {
        const isFn = (o) => !!(o && o.constructor && o.call && o.apply);

        return props.reduce((merged, ps) => {
            for (const key in ps) {
                const value = ps[key];

                if (key === 'style') {
                    merged['style'] = { ...merged['style'], ...ps['style'] };
                } else if (key === 'className') {
                    merged['className'] = [merged['className'], ps['className']].join(' ').trim();
                } else if (isFn(value)) {
                    const fn = merged[key];

                    merged[key] = fn
                        ? (...args) => {
                              fn(...args);
                              value(...args);
                          }
                        : value;
                } else {
                    merged[key] = value;
                }
            }

            return merged;
        }, {});
    }

    return undefined;
}
