import React from 'react';
import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CardSection = ({ heading, cardGroupCollection }) => (
  <section>
    <h2>{heading}</h2>
    <Flex>
      {cardGroupCollection.items.map((card) => {
        return (
          <div>
            <h3>{card.heading}</h3>
            <p>{card.description}</p>
          </div>
        );
      })}
    </Flex>
  </section>
);
