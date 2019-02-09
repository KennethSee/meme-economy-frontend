import styled from 'styled-components';

const Trending = styled.div`
  width: 40%;
  border-right: 1px solid black;
  height: 100%;
  overflow: scroll;
  font-size: 30px;
  float: left;

  .tile {
    width: 200px;
    height: 200px;
    cursor: pointer;
    margin: 0 auto;
  }

  img {
    max-width: 100%;
    max-height: 100%;
  }

  .selected {
    border: 3px solid green;
  }
`;

export default Trending;