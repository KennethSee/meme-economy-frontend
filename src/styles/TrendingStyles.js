import styled from 'styled-components';

const Trending = styled.div`
  width: 40%;
  border-right: 1px solid black;
  height: 100%;
  overflow: scroll;
  font-size: 30px;
  float: left;

  .tile {
    width: 300px;
    height: auto;
    overflow: hidden;
    text-align: center;
    cursor: pointer;
    margin: 20px auto;
    border: 3px solid black;
    transition: .25s transform ease-out;
    background-color: white;
  }

  .tile:hover {
    transform: scale(1.1);
    z-index: 5;
  }

  img {
    max-height: 300px;
    max-width: 300px;
    vertical-align: middle;
    background-color: white;
    -webkit-animation: fadein 2s; /* Safari, Chrome and Opera > 12.1 */
       -moz-animation: fadein 2s; /* Firefox < 16 */
        -ms-animation: fadein 2s; /* Internet Explorer */
         -o-animation: fadein 2s; /* Opera < 12.1 */
            animation: fadein 2s;
  }

  .selected {
    border: 3px solid green;
    transform: scale(1.1);
  }
`;

export default Trending;