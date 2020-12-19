import React from "react";
import { Button, Text, FlatList, StatusBar, View } from "react-native";
import { Container, StartContainer, ItemText, ItemList, IconButton } from "../StyledComponents";
import { useNavigation, useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome5";
import axios from "axios";

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
    let downloads = await this.getEnquetes();
    this.setState({ downloadsList: downloads });
  }

  async getEnquetes() {
    let resultado = null;

    await axios
      .get("http://192.168.0.109:3000/listFiles")
      .then((res) => {
        resultado = res.data;
      })
      .catch((err) => {
        console.log(err);
        resultado = null;
      });

    return resultado;
  }

  async downloadFile(id) {
    let resultado = null;

    await axios
      .get("http://192.168.0.109:3000/downloadFile/" + id)
      .then((res) => {
        resultado = res.data;
      })
      .catch((err) => {
        console.log(err);
        resultado = null;
      });

    return resultado;
  }

  render() {
    const { route, navigation } = this.props;

    console.log("enq: ", this.state.downloadsList);
    return (
      <Container>
        <StatusBar barStyle={"light-content"} backgroundColor="#5c6bc0" />
        <FlatList
          data={this.state.downloadsList}
          keyExtractor={(obj) => obj.id}
          renderItem={(obj) => {
            const date = new Date(obj.item.createdAt);
            return (
              <ItemList>
                <View>
                  <Text style={{ color: "black", fontSize: 20, textAlign: "left", fontWeight: "bold" }}>Nome: {obj.item.name}</Text>
                  <Text style={{ color: "black", fontSize: 18, textAlign: "left" }}>Tamanho: {obj.item.size} (Bytes)</Text>
                  <Text style={{ color: "black", fontSize: 15, textAlign: "left" }}> Data de upload: {date.getDate() + "/" + date.getMonth() + "/" + date.getYear()}</Text>
                </View>
                <IconButton onPress={() => this.downloadFile(obj.item.id)}>
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
