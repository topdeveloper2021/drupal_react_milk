import React from "react";
import LinkList from "../../DataTypes/LinkList";
import { Pagination } from "react-bootstrap";

interface PaginationProps {
  clickHandler: any;
  links: LinkList;
}

const Paginator = (props: PaginationProps) => {
  const links = [];
  if (props.links.first) {
    links.push(
      <Pagination.First
        key={1}
        href="#"
        aria-label="First"
        onClick={props.clickHandler}
        data-jsonapi-href={props.links.first.toString()}
      >
        <span aria-hidden="true">&laquo;&laquo;</span>
        <span className="sr-only">First</span>
      </Pagination.First>
    );
  }
  if (props.links.previous) {
    links.push(
      <Pagination.Item
        key={2}
        href="#"
        aria-label="Previous"
        onClick={props.clickHandler}
        data-jsonapi-href={props.links.previous.toString()}
      >
        <span aria-hidden="true">&laquo;</span>
        <span className="sr-only">Previous</span>
      </Pagination.Item>
    );
  }
  if (props.links.next) {
    links.push(
      <Pagination.Item
        key={3}
        href="#"
        aria-label="Next"
        onClick={props.clickHandler}
        data-jsonapi-href={props.links.next.toString()}
      >
        <span aria-hidden="true">&raquo;</span>
        <span className="sr-only">Next</span>
      </Pagination.Item>
    );
  }
  if (props.links.last) {
    links.push(
      <Pagination.Last
        key={4}
        href="#"
        aria-label="last"
        onClick={props.clickHandler}
        data-jsonapi-href={props.links.last.toString()}
      >
        <span aria-hidden="true">&raquo;&raquo;</span>
        <span className="sr-only">Last</span>
      </Pagination.Last>
    );
  }
  return <Pagination style={{ margin: "0px auto" }}>{links}</Pagination>;
};

export default Paginator;
