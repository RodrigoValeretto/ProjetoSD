import styled from "styled-components";

export const StartContainer = styled.View`
  flex: 1;
  justify-content: flex-start;
  background-color: white;
  align-items: center;
`;

export const CenterContainer = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

export const LoginInput = styled.TextInput`
  width: 90%;
  border-radius: 10px;
  border-color: black;
  border-width: 2px;
  padding: 10px;
  margin-top: 5px;
`;

export const TitleHome = styled.Text`
  color: blue;
  font-size: 32px;
  margin-top: 10px;
  font-weight: bold;
  margin-bottom: 5%;
`;

export const OptionsText = styled.Text`
  font-size: 20px;
  text-align: center;
`;

export const ButtonContainer = styled.View`
  width: 30%;
  justify-content: space-evenly;
  flex-direction: row;
  margin-top: 15px;
`;
