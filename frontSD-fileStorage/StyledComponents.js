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
  border-color: grey;
  border-width: 2px;
  padding: 10px;
  margin-top: 5px;
`;

export const TitleHome = styled.Text`
  color: #5c6bc0;
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
  width: 35%;
  justify-content: space-evenly;
  flex-direction: column;
  margin-top: 15px;
`;

export const CustomButton = styled.TouchableOpacity`
  background-color: #5c6bc0
  border-radius: 5px
  padding: 5px
  align-items:center
  justify-content: center
`;

export const IconButton = styled.TouchableOpacity`
  background-color: #5c6bc0
  border-radius: 50px
  padding: 10px
  align-items:center
  justify-content: center
`;

export const ButtonText = styled.Text`
  width: 80px
  color: white
  font-size: 18px
  font-weight: bold
  text-align: center
`;

export const ItemList = styled.View`
  flex-direction: row
  width: 550px;
  border: 1px solid #5c6bc0;
  margin-top: 20px;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

export const Container = styled.View`
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
`;
