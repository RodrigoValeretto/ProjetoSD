import React, { Component, useState } from "react";
import { render } from "react-dom";
import { Button, Text } from "react-native";
import { ButtonContainer, CenterContainer, OptionsText, StartContainer, CustomButton, ButtonText, TitleHome } from "../StyledComponents";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";

async function uploadFile() {
  const file = await DocumentPicker.getDocumentAsync({});
  //console.log(file);

  let resultado = null;

  let formData = new FormData();
  formData.append("file", file);
  formData.append("data", JSON.stringify(file));
  console.log("form: ", formData);
  const config = {
    headers: { Accept: "application/json", "Content-Type": `multipart/form-data; boundary=${formData._boundary}` },
  };

  await axios
    .post("http://192.168.0.109:3000/uploadFile", file, config)
    .then((res) => {
      resultado = res.data;
    })
    .catch((err) => {
      console.log(err.message);
      resultado = null;
    });

  return resultado;
}

export default function HomeScreen({ navigation }) {
  return (
    <CenterContainer>
      <TitleHome>Storage Files</TitleHome>
      <OptionsText>Selecione abaixo se deseja fazer upload ou download de um arquivo</OptionsText>
      <ButtonContainer>
        <CustomButton onPress={() => uploadFile()}>
          <ButtonText>Upload</ButtonText>
        </CustomButton>
        <CustomButton style={{ marginTop: 10 }} onPress={() => navigation.navigate("DownloadScreen")}>
          <ButtonText>Download</ButtonText>
        </CustomButton>
      </ButtonContainer>
    </CenterContainer>
  );
}
