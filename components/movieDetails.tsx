import { Ionicons } from '@expo/vector-icons';
import Feather from '@expo/vector-icons/Feather';
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Modal, Button } from 'react-native';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store/store';
import { ScrollView } from 'react-native-gesture-handler';
import { convertMinutesToHours } from '@/utils/constant';
import { useVideoPlayer, VideoView } from 'expo-video';
import { useEvent } from 'expo';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavouritesAction } from '@/store/actions/homeActions';
const { width } = Dimensions.get('window');

export default function MovieDetailsSheet({ visible, onClose, movie }: any) {
  const sheetRef = React.useRef<BottomSheet>(null);
 
  const snapPoints = React.useMemo(() => ["100%"], []);
  const movieDetail = useAppSelector((state: RootState) => state.homeReducer.movieDetail)
  const tabs: { key: string; icon: string }[] = [
    { key: "Bookmark", icon: "bookmark" },
    { key: "checkmark", icon: "checkmark" },
    { key: "Share", icon: "share" },
  ];
  const videoSource =
  'https://www.w3schools.com/html/mov_bbb.mp4'; // Example direct video file

  const player = useVideoPlayer(videoSource, player => {
    player.loop = true;
  });

  const { isPlaying } = useEvent(player, 'playingChange', { isPlaying: player?.playing });

  const [isPlayerVisible, setPlayerVisible] = React.useState(false);

  const dispatch = useAppDispatch();
  const favourites = useSelector((state: RootState) => state.homeReducer.favourites);

  const isFavourite = favourites?.some((fav: any) => fav.id === movieDetail.id);

  const handleFavourite = () => {
    if (!isFavourite) {
      dispatch(addToFavouritesAction(movieDetail))
    }
  };

  React.useEffect(() => {
    if (visible) {
      sheetRef.current?.expand();
    } else {
      sheetRef.current?.close();
    }
  }, [visible]);

  if (!movieDetail) {
    return (
      <BottomSheet
        ref={sheetRef}
        index={visible ? 0 : -1}
        snapPoints={snapPoints}
        onClose={onClose}
        enablePanDownToClose
        enableDynamicSizing
        style={styles.sheet}
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.handle}
      >
        <BottomSheetView>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.iconLeft}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconRight}>
              <Feather name="cast" size={28} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 40 }}>
            <ActivityIndicator size="large" color="#FFD700" />
            <Text style={{ color: '#fff', fontSize: 18, marginTop: 16 }}>Loading movie details...</Text>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }

  return (
      <BottomSheet
        ref={sheetRef}
        index={visible ? 0 : -1}
        snapPoints={snapPoints}
        onClose={onClose}
        enablePanDownToClose
        enableDynamicSizing
        style={styles.sheet}
        backgroundStyle={styles.background}
        handleIndicatorStyle={styles.handle}
      >
        {movieDetail &&
        <BottomSheetView>
          <View style={styles.header}>
            <TouchableOpacity onPress={onClose} style={styles.iconLeft}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconRight}>
            <Feather name="cast" size={28} color="#fff" />           
           </TouchableOpacity>
          </View>
          <ScrollView
            style={styles.container}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
          >
            {/* Movie Image */}
            <Image
              source={{uri: movieDetail?.primaryImage}} // Placeholder image, replace with actual movie image
              style={styles.movieImage}
              resizeMode="cover" 
            />

            {/* Movie Title */}
            <Text style={styles.movieTitle}>{movieDetail?.primaryTitle}</Text>

            {/* Director */}
            <Text style={styles.director}>Directed by 
              {movieDetail?.directors?.map((item: any, id: number) => {
                  return " " +item?.fullName
                })}
              </Text>

            {/* Movie Metadata */}
            <View style={styles.metaContainer}>
              <Text style={styles.metaText}>{movieDetail?.startYear}</Text>
              <Text style={styles.metaText}>{convertMinutesToHours(movieDetail?.runtimeMinutes)}</Text>
              <Text style={styles.metaText}>
                {movieDetail?.genres?.map((item: any, id: number) => {
                  return item+ ", "
                })}
              </Text>
              <View style={styles.imdbContainer}>
                <Image
                  source={{ uri: 'https://e7.pngegg.com/pngimages/556/500/png-clipart-imdb-television-film-actor-actor-celebrities-television.png' }} // IMDb logo
                  style={styles.imdbLogo}
                />
              <Text style={styles.imdbRating}>{movieDetail?.averageRating}</Text>
              </View>
            </View>

            {/* Watch Free Button */}
            <View style={styles.watchButton}>
              <TouchableOpacity onPress={() => setPlayerVisible(true)}>
                <Text style={styles.watchButtonText}>▶ Watch Free</Text>
              </TouchableOpacity>
            </View>

            {/* Action Icons */}
            <View style={styles.actionIconsContainer}>
            {tabs.map((tab: any) => ( 
              <TouchableOpacity
                key={tab.key}
                onPress={tab.key === "checkmark" ? handleFavourite : undefined}
              >
                <Ionicons
                  size={24}
                  name={tab.icon}
                  color={tab.key === "checkmark" && isFavourite ? "#FFD700" : "#fff"}
                />
              </TouchableOpacity>
            ))}
            </View>

            {/* Synopsis */}
            <Text style={styles.synopsis}>
              {movieDetail?.description}
              <Text style={styles.moreText}> More ▼</Text>
            </Text>

            {/* Cast Section */}
            <Text style={styles.castTitle}>Cast of {movieDetail?.primaryTitle}</Text>
            <View style={{paddingHorizontal: 0}}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.castContainer}>
                {/* Cast Member 1 */}
                {movieDetail?.cast?.map((item: any, id: number) => {
                  return (
                  <View key={id} style={styles.castMember}>
                    <Image
                      source={{uri: item.primaryImage}} // Placeholder image
                      style={styles.castImage}
                    />
                    <Text style={styles.castName}>{item?.fullName}</Text>
                  </View>
                  )
                })}
                {/* Add more cast members as needed */}
              </ScrollView>
            </View>
          </ScrollView>
        </BottomSheetView>
        }
        <Modal
          visible={isPlayerVisible}
          animationType="slide"
          onRequestClose={() => setPlayerVisible(false)}
          transparent={true}
        >
          <View style={{ flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity
              style={{ position: 'absolute', top: 40, right: 20, zIndex: 10 }}
              onPress={() => setPlayerVisible(false)}
            >
              <Ionicons name="close" size={32} color="#fff" />
            </TouchableOpacity>
            <VideoView style={styles.video} player={player} allowsFullscreen allowsPictureInPicture />
              <View style={styles.controlsContainer}>
                <Button
                  title={isPlaying ? 'Pause' : 'Play'}
                  onPress={() => {
                    if (isPlaying) {
                      player.pause();
                    } else {
                      player.play();
                    }
                  }}
                />
              </View>
          </View>
        </Modal>
      </BottomSheet>
  );
};

const styles = StyleSheet.create({
  video: {
    width: 350,
    height: 275,
  },
  controlsContainer: {
    padding: 10,
  },
  sheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: "hidden" },
  background: { borderTopLeftRadius: 24, borderTopRightRadius: 24, backgroundColor: "grey" },
  handle: { backgroundColor: "#fff" },
  container: {
    backgroundColor: 'black',
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    // marginBottom: 20
  },
  iconLeft: { position: "absolute", left: 16, top: 0, zIndex: 20 },
  iconRight: { position: "absolute", right: 16, top: 0, zIndex: 20 },
  movieImage: {
    width: '100%',         // Make image take full width of its container
    height: width * 0.6,     // Keep the height as before, or adjust as needed
    alignSelf: 'center',
    // marginTop: 2,
    // borderRadius: 8,
    paddingHorizontal: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  movieTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 15,
  },
  director: {
    fontSize: 16,
    color: '#D3D3D3',
    textAlign: 'center',
    marginTop: 5,
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  metaText: {
    fontSize: 14,
    color: '#D3D3D3',
    marginHorizontal: 8,
  },
  imdbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700', // Gold color for IMDb
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  imdbLogo: {
    width: 20,
    height: 10,
    marginRight: 4,
  },
  imdbRating: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  watchButton: {
    width:"70%",
    maxHeight: 100,
    backgroundColor: 'white',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 0,
    marginHorizontal: 40,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: "center"
  },
  watchButtonText: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  actionIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginHorizontal: 40,
  },
  actionIcon: {
    color: 'white',
    fontSize: 14, // Placeholder for icon text
  },
  synopsis: {
    color: '#D3D3D3',
    fontSize: 15,
    // marginHorizontal: 20,
    marginTop: 20,
    lineHeight: 22,
  },
  moreText: {
    color: '#FFD700', // Gold color for "More"
    fontWeight: 'bold',
  },
  castTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    // marginHorizontal: 20,
    marginTop: 30,
    marginBottom: 15,
    
  },
  castContainer: {
    paddingHorizontal: 0,
    marginBottom: 30,
  },
  castMember: {
    alignItems: 'center',
    marginRight: 15,
  },
  castImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FFD700', // Gold border for cast images
  },
  castName: {
    color: 'white',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1E1E1E', // Darker background for bottom nav
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  bottomNavItem: {
    color: 'white',
    fontSize: 12,
  },
}); 