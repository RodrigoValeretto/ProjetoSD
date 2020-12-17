import React, { Component } from "react";
import { render } from "react-dom";
import { Button } from "react-native";
import { ButtonContainer, CenterContainer, OptionsText, StartContainer } from "../styledComponents";

export default function HomeScreen({ navigation }) {
  return (
    <StartContainer>
      <CenterContainer>
        <OptionsText>Selecione abaixo se deseja fazer upload ou download de um arquivo</OptionsText>
        <ButtonContainer>
          <Button title="Upload" onPress={() => navigation.navigate("UploadScreen")} />
          <Button title="Download" onPress={() => navigation.navigate("DownloadScreen")} />
        </ButtonContainer>
      </CenterContainer>
    </StartContainer>
  );
}
