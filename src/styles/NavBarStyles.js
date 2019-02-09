import styled from 'styled-components';

const NavBar = styled.div`
  text-align: left;
  border-bottom: 1px solid black;
  font-style: italic;
  padding: 0 20px;

  .search {
    float: right;
    position: relative;
    height: 100px;
    width: 250px;
  }
  
  input[type=text] {
    position: absolute;
    padding: 6px;
    margin-top: 34px;
    font-size: 17px;
    border: 1px solid black;
    border-radius: 0 10px 10px 0;
  }

  button[type=submit] {
    position: absolute;
    cursor: pointer;
    margin-top: 34px;
    left: -38px;
    padding: 3.5px 6px 3.5px 10px;
    border-radius: 10px 0 0 10px;
    background-color: #ddd;
    font-size: 17px;
    border: none;
    top: 0;
    transition: .5s background-color ease-out;
  }

  input:focus, button:focus {
    outline: none;
  }

  button[type=submit]:hover {
    background-color: #666;
  }

  button[type=submit]:active {
    top: 1px;
  }
`;

export default NavBar;