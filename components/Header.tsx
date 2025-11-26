import profileImg from "@/assets/images/munjya.jpg";
import { logoutAction } from "@/store/actions/userActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { usePathname, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "./Card";
import * as ImagePicker from 'expo-image-picker';
import { RootState } from "@/store/store";

export default function Header({activeTab}: any) {
  const pathname = usePathname();
  const dispatch = useAppDispatch()
  const userDetails = useAppSelector(
    (state: any) => state.authReducer.userDetails
  );
  const favourites = useAppSelector((state: RootState) => state.homeReducer.favourites)

  const isFavourite = favourites?.length;

  const [sidebarVisible, setSidebarVisible] = useState(false);
  const slideAnim = useRef(new Animated.Value(280)).current;
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');
  const bollywoodCardStyle = { width: 170, height: 240, marginRight: 16, marginBottom: 40 };
  const router = useRouter()
  const [profileUri, setProfileUri] = useState<string | null>(null);

  // Example data for popular searches
  const popularMovies = [
    {
      title: "Jurassic World: Rebirth",
      year: "2025",
      image: require("../assets/images/movie1.jpg"),
    },
    {
      title: "Lilo & Stitch",
      year: "2025",
      image: require("../assets/images/movie2.jpg"),
    },
    {
      title: "Ballerina",
      year: "2025",
      image: require("../assets/images/movie3.jpeg"),
    },
    // ...add more movies as needed
  ];

  // Logout function
  const handleLogout = async () => {
    try {
      dispatch(logoutAction())
      router.push("/")
      setSidebarVisible(false);
    } catch (e) {
      console.error('Failed to clear AsyncStorage on logout', e);
    }
  };

  // Open sidebar with animation reset
  const openSidebar = () => {
    slideAnim.setValue(280); // Reset position to off-screen
    setSidebarVisible(true);
  };

  // Close sidebar with smooth animation
  const closeSidebar = () => {
    Animated.timing(slideAnim, {
      toValue: 280, // Slide out to the right
      duration: 300,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setSidebarVisible(false); // Hide modal after animation
    });
  };

  // Animate sidebar in when visible
  useEffect(() => {
    if (sidebarVisible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
    // No need to animate out here; handled in closeSidebar
  }, [sidebarVisible, slideAnim]);

  // Function to pick image
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setProfileUri(result.assets[0].uri);
      // Here, you can also upload the image to your backend if needed
    }
  };

  return (
    <>
      <View style={styles.header}>
        {pathname === "/homescreen" ?
          <Image
            source={require("../assets/images/plex-logo.png")}
            style={styles.logo}
          />
        :
          <Text style={styles.headerTitle}>{activeTab}</Text>
        }
        <View style={styles.icons}>
          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
            <TouchableOpacity onPress={() => setSearchActive(true)}>
              <Ionicons name="search" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
          <MaterialIcons
            name="cast"
            size={24}
            color="#fff"
            style={styles.icon}
          />
          <TouchableOpacity disabled={pathname === "/ondemand"} onPress={() => router.push("/ondemand")}>
            <View style={{ position: 'relative' }}>
              <Ionicons
                name="bookmark-outline"
                size={24}
                color="#fff"
                style={styles.icon}
              />
              {isFavourite ? (
                <View
                  style={styles.favIndicate}
                />
              ) : null}
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={openSidebar}>
            <View style={styles.profileCircle}>
              <Text style={styles.profileText}>RK</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sidebar Modal */}
      <Modal
        visible={sidebarVisible}
        transparent
        animationType="none"
        onRequestClose={closeSidebar}
      >
        <Pressable
          style={styles.overlay}
          onPress={closeSidebar}
        />
        <Animated.View
          style={[
            styles.sidebar,
            {
              right: 0,
              transform: [{ translateX: slideAnim }],
              shadowColor: "#000",
              shadowOffset: { width: -4, height: 0 },
              shadowOpacity: 0.3,
              shadowRadius: 8,
              elevation: 10,
            }
          ]}
        >
          <View style={styles.profileSection}>
          <View
              style={{ position: 'relative', alignItems: 'center', justifyContent: 'center' }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                style={{ borderRadius: 100, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' }}
                onPress={pickImage}
              >
                <Image
                  source={profileUri ? { uri: profileUri } : profileImg}
                  style={styles.profileImage}
                />
                <View style={styles.cameraOverlay}>
                  <Ionicons name="camera" size={36} color="#fff" />
                </View>
              </TouchableOpacity>
            
            <Text style={styles.profileName}>Rakesh Kr.</Text>
            <Text style={styles.profileUsername}>rakeshkr</Text>
          </View>
          </View>
          <ScrollView style={styles.profilTabs}>
            <SidebarOption icon="person" label="Profile" />
            <SidebarOption icon="people" label="Friends" />
            <SidebarOption icon="apps" label="Services" />
            <SidebarOption icon="download" label="Downloads" />
            <SidebarOption icon="settings" label="Settings" />
            <SidebarOption icon="swap-horizontal" label="Switch Profile" />
            <SidebarOption icon="log-out" label="Sign Out" onPress={handleLogout} />
          </ScrollView>
        </Animated.View>
      </Modal>

      {/* Search Modal */}
      <Modal
        visible={searchActive}
        transparent
        animationType="fade"
        onRequestClose={() => setSearchActive(false)}
      >
        <View style={styles.searchOverlay}>
          <View style={styles.searchHeader}>
            <TouchableOpacity onPress={() => setSearchActive(false)}>
              <Ionicons name="close" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.searchTitle}>Search</Text>
            <View style={{ width: 28 }} />
          </View>
          <View style={styles.searchBarContainer}>
            <Ionicons name="search" size={22} color="#aaa" style={{ marginRight: 8 }} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for titles, people, and more..."
              placeholderTextColor="#aaa"
              value={searchText}
              onChangeText={setSearchText}
              autoFocus
            />
            <Ionicons name="options-outline" size={22} color="#aaa" style={{ marginLeft: 8 }} />
          </View>
          <ScrollView>
            <Text style={styles.popularSearchesTitle}>Popular Searches</Text>
            <View style={styles.moviesGrid}>
              {popularMovies.map((movie, idx) => (
                <Card
                  key={idx}
                  title="Z Nation"
                  image={movie.image}
                  subtitle="33"
                  style={bollywoodCardStyle}
                />
              ))}
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
}

// Sidebar option component
function SidebarOption({ icon, label, onPress }: { icon: string; label: string; onPress?: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <View style={styles.sidebarOption}>
        <Ionicons
          name={icon as any}
          size={22}
          color="#d4d6d5"
          style={{ marginRight: 16 }}
        />
        <Text style={{ color: "#d4d6d5", fontSize: 16 }}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: 600
  },
  logo: { width: 60, height: 28, resizeMode: "contain" },
  icons: { flexDirection: "row", alignItems: "center" },
  icon: { marginHorizontal: 8 },
  profileCircle: {
    backgroundColor: "#ffb300",
    borderRadius: 16,
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 8,
    cursor: "pointer"
  },
  favIndicate: {
    position: 'absolute',
    top: -2,
    right: 8,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#ffb300',
    borderWidth: 1,
    borderColor: '#222',
  },
  profileText: { color: "#222", fontWeight: "bold" },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  sidebar: {
    position: "absolute",
    // right: 0, // Set inline in Animated.View
    top: 0,
    bottom: 0,
    width: 280,
    backgroundColor: "#000",
    paddingTop: 40,
    zIndex: 2,
    // Remove shadow here if present
  },
  profileSection: {
    backgroundColor: "#000",
    alignItems: "center",
    marginBottom: 32,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 100,
    marginBottom: 12,
  },
  profileName: {
    color: "#ffb300",
    fontWeight: "bold",
    fontSize: 20,
  },
  profileUsername: {
    color: "#aaa",
    fontSize: 14,
    // marginBottom: 16,
  },
  profilTabs: {
    paddingHorizontal: 20,
    backgroundColor: "#181818"
  },
  sidebarOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    // borderBottomWidth: 0.5,
    borderBottomColor: "#333",
  },
  searchOverlay: {
    flex: 1,
    backgroundColor: "#111",
    paddingTop: 60,
    paddingHorizontal: 16,
  },
  searchHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  searchTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    textAlign: "center",
    alignItems: "center"
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 24,
  },
  searchInput: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  popularSearchesTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  moviesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  movieCard: {
    width: "30%",
    marginBottom: 20,
  },
  movieImage: {
    width: "100%",
    aspectRatio: 2/3,
    borderRadius: 8,
    marginBottom: 6,
  },
  movieTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  movieYear: {
    color: "#aaa",
    fontSize: 12,
  },
  cameraOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 140,
    height: 140,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    zIndex: 2,
  },
});
