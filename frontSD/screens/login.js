import React, { Component } from "react";
import { render } from "react-dom";
import { Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import styles from "../styledComponents";
import styled from "styled-components";
import { CenterContainer, LoginInput, ButtonContainer, TitleHome } from "../styledComponents";

export default function Login({ navigation }) {
  return (
    <CenterContainer>
      <TitleHome>Files Storage</TitleHome>
      <LoginInput placeholder="Usuário" />
      <LoginInput placeholder="Senha" />
      <ButtonContainer>
        <Button title="Login" onPress={() => navigation.navigate("Home")} />
        <Button title="Cadastrar" />
      </ButtonContainer>
    </CenterContainer>
  );
}
