import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import SearchInput from "./SearchInput";
import SearchTermsBox from "./SearchTermsBox";

interface SearchBarProps {
  count: number;
  term: string;
  terms: string[];
  onInputChange(event: React.ChangeEvent<HTMLInputElement>): void;
  onInputPress(event: React.KeyboardEvent<HTMLInputElement>): void;
  onRemoveTerm: (term: string) => void;
  onRemoveAllTerms: () => void;
  filterActive: boolean;
}

const SearchBar: React.FC<SearchBarProps> = (props: SearchBarProps) => {
  const {
    count,
    term,
    terms,
    onInputChange,
    onInputPress,
    onRemoveTerm,
    onRemoveAllTerms,
    filterActive,
  } = props;

  const renderFilter = () => {
    if (!filterActive) return <Col sm={12} className="mt-5 clearfix" />;
    return (
      <>
        <Col xs={12} md={4} lg={3}>
          <h5>{count} Sessions</h5>
          <SearchInput
            value={term}
            onChange={onInputChange}
            onKeyPress={onInputPress}
            style={{ overflow: "hidden" }}
          />
        </Col>
        <Col xs={12} md={8} lg={9}>
          {terms && terms.length > 0 ? (
            <SearchTermsBox
              terms={terms}
              onRemoveTerm={onRemoveTerm}
              onRemoveAllTerms={onRemoveAllTerms}
            />
          ) : null}
        </Col>
      </>
    );
  };

  return (
    <div className="search-bar">
      <Row>{renderFilter()}</Row>
    </div>
  );
};

export default SearchBar;
