import * as React from 'react';
import { PrimeReactContext } from '../api/Api';
import { useHandleStyle } from '../componentbase/ComponentBase';
import { classNames, mergeProps } from '../utils/Utils';
import { BadgeBase } from './BadgeBase';

export const Badge = React.memo(
    React.forwardRef((inProps, ref) => {
        const context = React.useContext(PrimeReactContext);
        const props = BadgeBase.getProps(inProps, context);

        const { ptm, cx, isUnstyled } = BadgeBase.setMetaData({
            props
        });

        useHandleStyle(BadgeBase.css.styles, isUnstyled, { name: 'badge' });

        const elementRef = React.useRef(null);

        React.useImperativeHandle(ref, () => ({
            props,
            getElement: () => elementRef.current
        }));

        const rootProps = mergeProps(
            {
                ref: elementRef,
                style: props.style,
                className: classNames(props.className, cx('root'))
            },
            BadgeBase.getOtherProps(props),
            ptm('root')
        );

        return <span {...rootProps}>{props.value}</span>;
    })
);

Badge.displayName = 'Badge';
