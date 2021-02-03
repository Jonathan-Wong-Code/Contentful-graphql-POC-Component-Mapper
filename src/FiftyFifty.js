import React from 'react';
import styled from 'styled-components';

const Flex = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const FiftyFifty = ({ heading, subText, image }) => (
  <Flex>
    <div
      style={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        background: 'grey',
      }}
    >
      <div>
        <h2>{heading}</h2>
        <p>{subText}</p>
      </div>
    </div>
    <img style={{ width: '100%' }} src={image.url} alt='' />
  </Flex>
);
