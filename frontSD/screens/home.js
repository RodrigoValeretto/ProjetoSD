import React, { Component } from 'react';
import { render } from 'react-dom';
import { Button, StyleSheet, Text, View } from 'react-native';
import styles from './styles'

function teste() {
  console.log("ALO")
}

function teste2() {
  console.log("ALO2")
}

export default class HomeScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Files Storage</Text>
        <View style={styles.optionsContainer}>
          <Text style={styles.optionTxt}>Selecione abaixo se deseja fazer upload ou download de um arquivo</Text>
          <View style={styles.buttonContainer}>
            <Button title="Upload" onPress={teste2()} />
            <Button title="Download" onPress={teste()} />
          </View>
        </View>
      </View>
    );
  }
}