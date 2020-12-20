import React, { Component, useState } from "react";
import { render } from "react-dom";
import { Button, Text } from "react-native";
import { ButtonContainer, CenterContainer, OptionsText, StartContainer, CustomButton, ButtonText, TitleHome } from "../StyledComponents";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import * as mime from "react-native-mime-types";

async function uploadFile() {
  const file = await DocumentPicker.getDocumentAsync({});
  let resultado = null;

  const formData = new FormData();
  formData.append("file", {
    uri: file.uri,
    type: mime.lookup(file.uri),
    name: file.name,
  });
  const config = {
    headers: {
      Accept: "application/json",
      "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
    },
  };
  await axios
    .post("https://storagefiles.herokuapp.com/uploadFile", formData, config)
    .then((res) => {
      console.log("sucess:", res.data);
      resultado = res.data;
    })
    .catch((err) => {
      console.log("error:", err);
      resultado = null;
    });
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
