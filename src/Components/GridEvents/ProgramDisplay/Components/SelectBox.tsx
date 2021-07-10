import React from 'react';
import { FaCheck } from 'react-icons/fa';
import classnames from 'classnames';

interface SelectBoxProps {
    selected: boolean;
    onClick(event: React.MouseEvent<HTMLElement>): void;
}

const SelectBox: React.FC<SelectBoxProps> = (props: SelectBoxProps) => {
    const { selected, onClick, ...rest } = props;
    return (
        <div
            className={classnames('tick-select', { selected: selected })}
            onClick={onClick}
            {...rest}>
            <FaCheck />
        </div>
    );
};

export default SelectBox;
