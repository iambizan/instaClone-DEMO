import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';

import ActivityCount from '../components/ActivityCount';

import {getProfile} from '../actions';

import NavigationAction from '../navigation/NavigationAction';

const ProfileScreen = ({profile, getProfile, route}) => {
  useEffect(() => {
    getProfile(route.params.userId);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.details}>
        <Image
          source={require('../config/images/defaultPic.jpg')}
          style={styles.image}
        />
        <View style={styles.activity}>
          <Text style={{fontSize: 20}}>{profile.displayName}</Text>
          <View style={styles.counts}>
            <ActivityCount count={profile.postsCount} title="posts" />
            <ActivityCount
              count={profile.followers}
              title="followers"
              onPress={() =>
                NavigationAction.push('Followers', {
                  profileId: route.params.userId,
                })
              }
            />
            <ActivityCount
              count={profile.following}
              title="following"
              onPress={() =>
                NavigationAction.push('Following', {
                  profileId: route.params.userId,
                })
              }
            />
          </View>
        </View>
      </View>

      <ScrollView style={styles.sv}>
        <View style={styles.content}>
          {profile.posts &&
            profile.posts.map(item => (
              <Image
                source={{uri: item.imageUrl}}
                style={{height: 110, width: 110, margin: 9}}
                key={item.caption}
              />
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  activity: {
    flex: 1,
    marginLeft: 15,
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  sv: {
    marginTop: 15,
    width: '100%',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  counts: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  details: {
    height: '20%',
    width: '100%',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  image: {
    height: 90,
    width: 90,
    borderRadius: 90,
  },
  userInfo: {},
});

const mapStateToProps = ({profile}) => {
  return {profile: profile};
};

export default connect(mapStateToProps, {getProfile})(ProfileScreen);
