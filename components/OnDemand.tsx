import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { View, Text, StyleSheet } from 'react-native';
import AuthenticatedLayout from '@/hoc/AuthenticatedLayout';
import Card from './Card';
import DraggableFlatList, { RenderItemParams } from 'react-native-draggable-flatlist';
import { useAppDispatch } from '@/store/hooks';
import { loadStoredUser } from '@/store/reducers/homeReducer';

const OnDemand = () => {
  const favourites = useSelector((state: RootState) => state.homeReducer.favourites);
  const [data, setData] = useState(favourites);
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   dispatch(loadStoredUser());
  // }, [dispatch]);

  const renderItem = ({ item, drag, isActive }: RenderItemParams<any>) => (
    <Card
      key={item?.id}
      title={item?.originalTitle}
      image={{ uri: item?.primaryImage }}
      subtitle={item?.runtimeMinutes}
      style={styles.cardGrid}
      number={30}
      onLongPress={drag}
      isActive={isActive}
    />
  );

  return (
    <AuthenticatedLayout>
      <View style={styles.container}>
        {data?.length ? (
          <DraggableFlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, idx) => item?.id?.toString() || idx.toString()}
            numColumns={2}
            contentContainerStyle={styles.grid}
            onDragEnd={({ data }) => setData(data)}
          />
        ) : (
          <View>
            <Text style={styles.empty}>No favourite movies yet.</Text>
          </View>
        )}
      </View>
    </AuthenticatedLayout>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: 'black', flex: 1 },
  header: { color: 'white', fontSize: 22, margin: 16, marginTop: 0 },
  grid: { paddingHorizontal: 8, },
  cardGrid: {
    flex: 1,
    margin: 8,
    minWidth: 0, // fixes flexbox bug
    maxWidth: '48%', // two columns
    height: 240,
    marginBottom: 50
  },
  empty: { color: 'white', textAlign: 'center', marginTop: 40, fontSize: 18 },
});

export default OnDemand; 