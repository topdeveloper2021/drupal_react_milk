import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchInputProps {
    value: string;
    onChange(event: React.ChangeEvent<HTMLInputElement>): void;
    onKeyPress(event: React.KeyboardEvent<HTMLInputElement>): void;
}

const SearchInput: React.FC<SearchInputProps> = (props: SearchInputProps) => {
    const { value, onChange, onKeyPress, ...rest } = props;
    return (
        <div className="search-input-box mb-4">
            <FaSearch />
            <input
                name="keyword"
                type="text"
                // value={value}
                onChange={onChange}
                onKeyPress={onKeyPress}
                placeholder={'Search This Program'}
                {...rest}
            />
        </div>
    );
};

export default SearchInput;
