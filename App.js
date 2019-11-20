//import liraries
import React, { Component } from 'react';
import { View, Modal, YellowBox, AsyncStorage, StatusBar, TouchableHighlight, Text, StyleSheet, Image } from 'react-native';
import { Container, Header, Input, Label, Drawer, Item, Fab, Title, Button, Icon, Left, Right, Body, Content } from "native-base";
import ImagePicker from 'react-native-image-picker';
import SideBar from './src/sidebar';
const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};
class MyClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ContactList: [],
      SearchData: [],
      //SearchContact: null,
      modalVisible: false,
      avatarSource: require('./src/Image/a.png'),
      Name: '',
      Number: '',
      Search: false
    }

  }
  componentDidMount = async () => {
    const retrievedItem = await AsyncStorage.getItem('ListData');
    console.log("retreive=>", retrievedItem)
    const List = JSON.parse(retrievedItem);
    if (List) {
      this.setState({ ContactList: List, SearchData: List })
    }
  }
  updateName = (v) => {
    this.setState({ Name: v })
  }
  updateNumber = (v) => {
    this.setState({ Number: v })
  }
  Submit = async () => {
    if(this.state.Name==''|this.state.Number==''){
      alert('Please fill the required fields')
    }
    else{
    let temp = { Pic: this.state.avatarSource.uri, name: this.state.Name, Contact: this.state.Number }
    await this.setState({ ContactList: [...this.state.ContactList, temp], SearchData: [...this.state.SearchData, temp] });
    await this.setState({ Number: '', Name: '', avatarSource: require('./src/Image/a.png') })
    await AsyncStorage.setItem('ListData', JSON.stringify(this.state.ContactList));
    this.setModalVisible(false)
  }
}
  closeDrawer = () => {
    this.drawer._root.close()
  };
  openDrawer = () => {
    this.drawer._root.open();
  };
  Searchfilter = (v) => {
    let text = v;
    const newData = this.state.ContactList.filter(no => {
      const noname = no.name.toUpperCase();
      const textname = text.toUpperCase();
      return noname.indexOf(textname) > -1;
    })
    this.setState({ SearchData: newData })
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }
  SelectPicture = () => {
    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };

        this.setState({
          avatarSource: source,
        });
      }
    });
  }

  render() {
    console.disableYellowBox = true;
    return (
      <Drawer
        openDrawerOffset={0.1}
        ref={(ref) => { this.drawer = ref; }} content={<SideBar />} onClose={() => this.closeDrawer()} >

        <Container>
          <StatusBar barStyle="light-content" backgroundColor="#3778B8" />
          <Header androidStatusBarColor="#3778B8" iosBarStyle="light-content" style={{ backgroundColor: '#3778B8' }} noShadow>
            <Left>
              <Button transparent>
                <Icon onPress={() => this.openDrawer()} name="menu" type="Entypo" style={styles.icon} />
              </Button>
            </Left>
            <Body>
              <Title style={styles.icon}>Contacts</Title>
            </Body>
            <Right>
              <Button onPress={() => this.setState({ Search: !this.state.Search })} transparent>
                <Icon name="search1" type="AntDesign" style={styles.icon2} />
              </Button>
            </Right>
          </Header>

          <Content>
            {
              this.state.Search ?
                <Input placeholder="Search Contact" style={styles.search} onChangeText={(v) => this.Searchfilter(v)} /> : <View></View>
            }
            {
              this.state.SearchData.map((data, index) => (
                <View key={index} style={styles.list}>
                  <Image source={{ uri: data.Pic }} style={styles.img} />
                  <Text style={styles.text}>{data.name}</Text>
                </View>
              ))
            }
            <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVisible}
            >
              <View style={styles.v1}>
                <View style={styles.v2}>
                  <TouchableHighlight
                    onPress={() => {
                      this.SelectPicture();
                    }}>
                    <Image source={this.state.avatarSource} style={{ width: 150, borderRadius: 20, height: 150 }} />
                  </TouchableHighlight>
                  <Item style={styles.item} floatingLabel>
                    <Label>Username</Label>
                    <Input value={this.state.Name} onChangeText={(v) => this.updateName(v)} />
                  </Item>
                  <Item style={styles.item} floatingLabel>
                    <Label>Contact Number</Label>
                    <Input keyboardType="phone-pad" value={this.state.Number} onChangeText={(v) => this.updateNumber(v)} />
                  </Item>

                  <TouchableHighlight
                    onPress={() => {
                      this.Submit();
                    }}>
                    <View style={styles.btn}>
                      <Text style={{ fontSize: 14 }}>Submit</Text>
                    </View>
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <View style={styles.btn}>
                      <Text style={{ fontSize: 14 }}>Cancel</Text>
                    </View>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </Content>
          <Fab
            active={this.state.active}
            direction="up"
            containerStyle={{}}
            style={{ backgroundColor: '#3778B8' }}
            position="bottomRight"
            onPress={() => this.setModalVisible(true)}>
            <Icon name="plus" type="Entypo" style={styles.icon} />

          </Fab>
        </Container>

      </Drawer>
    );
  }
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
  icon2: { color: 'white', fontSize: 20 },
  item: { width: '90%', marginTop: 10 },
  search: { borderWidth: 1,borderRadius:10, borderColor: '#3778B8', width: '90%', alignSelf: 'center', marginTop: 5 },
  v1: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  v2: { width: '90%', height: 500, backgroundColor: '#cececd', justifyContent: 'center', alignItems: 'center' },
  btn: { backgroundColor: '#3778B8', width: 100, height: 30, borderRadius: 10, marginTop: 5, justifyContent: 'center', alignItems: 'center' },
  icon: { color: 'white' },
  img: { width: 50, height: 50, backgroundColor: '#3778B8', borderRadius: 50, marginLeft: 5 },
  text: { fontSize: 16, marginLeft: 20 },
  list: { marginTop: 5, marginLeft: '5%', width: '80%', height: 60, alignItems: 'center', flexDirection: 'row' }
});

//make this component available to the app
export default MyClass;
