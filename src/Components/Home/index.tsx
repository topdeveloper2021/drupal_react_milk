import React from "react";

export interface HomeProps {
  value1?: string;
  value2?: string;
}

export const Home = (props: HomeProps) => {
  return (
    <div>
      <h1>Home page content</h1>
    </div>
  );
};

export default Home;
