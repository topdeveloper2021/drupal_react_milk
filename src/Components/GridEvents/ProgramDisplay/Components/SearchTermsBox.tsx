import React from 'react';
import { FaTimes } from 'react-icons/fa';

interface SearchTermsBoxInterface {
    terms: string[];
    onRemoveTerm: (term: string) => void;
    onRemoveAllTerms: () => void;
}

const SearchTermsBox: React.FC<SearchTermsBoxInterface> = (props: SearchTermsBoxInterface) => {
    const { terms, onRemoveTerm, onRemoveAllTerms } = props;
    if (terms.length > 0) {
        return (
            <div className="search-terms-box">
                <div>
                    Refined by:{' '}
                    {terms.map((term, index) => (
                        <span key={index}>
                            {term}
                            <FaTimes onClick={() => onRemoveTerm(term)} className="ml-3" />
                        </span>
                    ))}
                </div>
                { terms.length > 1 ? <FaTimes onClick={onRemoveAllTerms} /> : '' }
            </div>
        );
    } else {
        return null;
    }
};

export default SearchTermsBox;
