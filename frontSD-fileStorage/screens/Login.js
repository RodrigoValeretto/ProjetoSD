import React, { Component } from "react";
import { render } from "react-dom";
import { Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styled from "styled-components";
import { CenterContainer, LoginInput, ButtonContainer, TitleHome, CustomButton, ButtonText } from "../StyledComponents";

export default function Login({ navigation }) {
  return (
    <CenterContainer>
      <TitleHome>Files Storage</TitleHome>
      <LoginInput placeholder="Usuário" />
      <LoginInput placeholder="Senha" />
      <ButtonContainer>
        <CustomButton onPress={() => navigation.navigate("Home")}>
          <ButtonText>Login</ButtonText>
        </CustomButton>
        <CustomButton>
          <ButtonText>Cadastrar</ButtonText>
        </CustomButton>
      </ButtonContainer>
    </CenterContainer>
  );
}
