import React, { Component } from 'react';
import { StatusBar, View, Image,StyleSheet } from 'react-native';
import { Container, Header, Button, Body, Switch, Content, List, ListItem, Text, Left, Right, Icon } from 'native-base';
export default class ListItemNoIndentExample extends Component {
    render() {
        console.disableYellowBox = true;
        return (
            <Container>
                <StatusBar barStyle="light-content" backgroundColor="#3778B8" />
                <Header androidStatusBarColor="#3778B8" iosBarStyle="light-content" style={styles.header} />
                <Content>
                    <View style={styles.v}>
                        <Image source={require('./Image/a.png')} style={styles.img} />
                        <Text style={{ color: 'white' }}>Ali Hassan</Text>
                        <Text style={styles.text}>Available</Text>
                    </View>
                    <List >
                        <ListItem icon>
                            <Left>
                                <Button transparent>
                                    <Icon active name="setting" type="AntDesign" />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Call Setting</Text>
                            </Body>

                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button transparent>
                                    <Icon active name="sunset" type="Feather" />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Preferences</Text>
                            </Body>

                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button transparent>
                                    <Icon active name="setting" type="AntDesign" />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Queues</Text>
                            </Body>

                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button transparent>
                                    <Icon active name="setting" type="AntDesign" />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Test Call</Text>
                            </Body>

                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button transparent>
                                    <Icon active name="infocirlceo" type="AntDesign" />
                                </Button>
                            </Left>
                            <Body>
                                <Text>About</Text>
                            </Body>

                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button transparent>
                                    <Icon active name="question" type="AntDesign" />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Help</Text>
                            </Body>

                        </ListItem>
                        <ListItem icon>
                            <Left>
                                <Button transparent>
                                    <Icon active name="setting" type="AntDesign" />
                                </Button>
                            </Left>
                            <Body>
                                <Text>Sign Out</Text>
                            </Body>

                        </ListItem>

                    </List>
                </Content>
            </Container>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    header:{ backgroundColor: '#3778B8', borderBottomColor: '#3778B8' },
    v:{ width: '100%', justifyContent: 'center', alignItems: 'center', height: 150, backgroundColor: '#3778B8' },
    img:{ width: 80, borderRadius: 40, height: 80 },
    text:{ color: 'white', fontSize: 12 }
 });