import React from "react";
import { Button, Text, FlatList, StatusBar, View } from "react-native";
import { Container, StartContainer, ItemText, ItemList, IconButton } from "../StyledComponents";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";
import * as FileSystem from "expo-file-system";
import Permissions from "expo-permissions";
import * as Sharing from "expo-sharing";
import { Buffer } from "buffer";

class DownloadScreenClasse extends React.Component {
  state: {
    downloadsList: Array,
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      downloadsList: [],
    };
  }

  async componentDidMount() {
    let downloads = await this.getDownloads();
    this.setState({ downloadsList: downloads });
  }

  async getDownloads() {
    let resultado = null;

    await axios
      .get("https://storagefiles.herokuapp.com/listFiles")
      .then((res) => {
        resultado = res.data;
      })
      .catch((err) => {
        console.log(err);
        resultado = null;
      });

    return resultado;
  }

  async downloadFile(id, name) {
    let resultado = null;
    console.log("id: ", id);

    const headers = {
      "Content-Type": "text/html",
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate, br",
    };

    // await axios
    //   .get(`https://storagefiles.herokuapp.com/downloadFile/${id}`, { headers, responseType: "arraybuffer" })
    //   .then(async (res) => {
    //     resultado = Buffer.from(res.data, "base64");
    //     resultado = resultado.toString("base64");

    //     const fileUri = FileSystem.documentDirectory;
    //     console.log(fileUri);
    //     await FileSystem.writeAsStringAsync(fileUri, resultado, { encoding: FileSystem.EncodingType.Base64 });
    //     await Sharing.shareAsync(fileUri + `${encodeURI(name)}`);
    //     //resultado = res.data;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     resultado = null;
    //   });

    FileSystem.downloadAsync(`https://storagefiles.herokuapp.com/downloadFile/${id}`, FileSystem.documentDirectory)
      .then(async ({ uri }) => {
        console.log(uri);
        // console.log(uri + "/" + name);
        // const dir = uri.slice(0, uri.indexOf("%2540"));
        // console.log(dir + name);
        await Sharing.shareAsync(uri);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const { route, navigation } = this.props;

    return (
      <Container>
        <StatusBar barStyle={"light-content"} backgroundColor="#5c6bc0" />
        <FlatList
          data={this.state.downloadsList}
          keyExtractor={(obj) => obj._id}
          renderItem={(obj) => {
            const date = new Date(obj.item.createdAt);
            return (
              <ItemList>
                <View>
                  <Text style={{ color: "black", fontSize: 20, textAlign: "left", fontWeight: "bold" }}>Nome: {obj.item.name}</Text>
                  <Text style={{ color: "black", fontSize: 18, textAlign: "left" }}>Tamanho: {obj.item.size} (Bytes)</Text>
                  <Text style={{ color: "black", fontSize: 15, textAlign: "left" }}> Data de upload: {date.getDate() + "/" + date.getMonth() + "/" + date.getYear()}</Text>
                </View>
                <IconButton onPress={() => this.downloadFile(obj.item._id, obj.item.name)}>
                  {/* <ButtonText onPress={() => navigation.navigate("EnqueteScreen", { userId: userId, enqueteId: obj.item.id, tituloEnquete: obj.item.titulo })}>Download</ButtonText> */}
                  <Icon name="download" size={25} color="white" />
                </IconButton>
              </ItemList>
            );
          }}
        />
      </Container>
    );
  }
}

export default function DownloadScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  return <DownloadScreenClasse navigation={navigation} route={route} />;
}
