import { movieDetailAction, movieListAction, topBoxListAction, topRatedEnglishMovie, upComingMovieAction } from "@/store/actions/homeActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import React, { useEffect } from "react";
import { ScrollView, View } from "react-native";
import kalank from "../assets/images/kalank.jpg";
import movie1 from "../assets/images/movie1.jpg";
import movie2 from "../assets/images/movie2.jpg";
import movie3 from "../assets/images/movie3.jpeg";
import munjya from "../assets/images/munjya.jpg";
import veerZaara from "../assets/images/veer-zaara.jpeg";
import Card from "../components/Card";
import AuthenticatedLayout from "../hoc/AuthenticatedLayout";
import Section from "../hoc/Section";
import MovieDetailsSheet from "./movieDetails";
import SkeletonCard from "../components/SkeletonCard";

export default function HomeScreen() {
  const [selectedMovie, setSelectedMovie] = React.useState(null);
  const [sheetVisible, setSheetVisible] = React.useState(false);

  const dispatch = useAppDispatch()
  const { movieList, loading } = useAppSelector((state: RootState) => state.homeReducer);
  const cardStyle = { width: 200, height: 120, marginRight: 16, marginBottom: 40 };
  const bollywoodCardStyle = { width: 150, height: 240, marginRight: 16, marginBottom: 40 };

  useEffect(()  => {
    if (!movieList?.length) {
      dispatch(movieListAction())
      dispatch(topBoxListAction())
      dispatch(topRatedEnglishMovie())
      dispatch(upComingMovieAction())
    }
  },[dispatch, movieList])
  const detailsHandler = (id: any) => {
    setSheetVisible(true);
    dispatch(movieDetailAction(id))
  }

  const skeletonArray = Array(6).fill(null); // Show 6 skeletons

  return (
    <AuthenticatedLayout>
      <>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 80 }}
        >
          <Section title="What's On Now" streamType="Live TV">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", paddingRight: 16 }}>
                <Card title="Channel Guide" style={cardStyle} />
                {loading ? (
                  skeletonArray.map((_, idx) => (
                    <SkeletonCard key={idx} style={cardStyle} />
                  ))
                ) : movieList?.length ? (
                  movieList.map((item: any, id: number) => {
                    const movieId = item.id
                    return (
                      <Card
                        onPress={() => detailsHandler(movieId)}
                        key={item.id}
                        title={item?.originalTitle}
                        image={{uri: item?.primaryImage}}
                        subtitle={item?.runtimeMinutes}
                        style={cardStyle}
                        number={30}
                      />
                    )
                  })
                ) : (
                  <>
                  <Card
                    onPress={() => detailsHandler({ title: "Farscape", image: movie1 })}
                    title="Farscape"
                    image={movie1}
                    subtitle="29"
                    style={cardStyle}
                  />
                  <Card
                    onPress={() => detailsHandler({ title: "Z Nation", image: movie2 })}
                    title="Z Nation"
                    image={movie2}
                    subtitle="33"
                    style={cardStyle}
                  />
                  <Card
                    onPress={() => detailsHandler({ title: "Another Show", image: movie3 })}
                    title="Another Show"
                    image={movie3}
                    subtitle="40"
                    style={cardStyle}
                  />
                   <Card
                     onPress={() => detailsHandler({ title: "Farscape", image: movie1 })}
                    title="Farscape"
                    image={movie1}
                    subtitle="29"
                    style={cardStyle}
                  />
                  <Card
                    onPress={() => detailsHandler({ title: "Z Nation", image: movie2 })}
                    title="Z Nation"
                    image={movie2}
                    subtitle="33"
                    style={cardStyle}
                  />
                  <Card
                    onPress={() => detailsHandler({ title: "Another Show", image: movie3 })}
                    title="Another Show"
                    image={movie3}
                    subtitle="40"
                    style={cardStyle}
                  />
                  </>
                )}
              </View>
            </ScrollView>
          </Section>
          <Section title="Tune In Now: Popular Shows" streamType="Live TV">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", paddingRight: 16 }}>
                <Card
                  onPress={() => detailsHandler({ title: "Farscape", image: movie1 })}
                  title="Farscape"
                  image={movie1}
                  subtitle="29"
                  style={cardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Z Nation", image: movie2 })}
                  title="Z Nation"
                  image={movie2}
                  subtitle="33"
                  style={cardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Another Show", image: movie3 })}
                  title="Another Show"
                  image={movie3}
                  subtitle="40"
                  style={cardStyle}
                />
                 <Card
                   onPress={() => detailsHandler({ title: "Farscape", image: movie1 })}
                  title="Farscape"
                  image={movie1}
                  subtitle="29"
                  style={cardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Z Nation", image: movie2 })}
                  title="Z Nation"
                  image={movie2}
                  subtitle="33"
                  style={cardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Another Show", image: movie3 })}
                  title="Another Show"
                  image={movie3}
                  subtitle="40"
                  style={cardStyle}
                />
              </View>
            </ScrollView>
          </Section>

          <Section title="Bollywood Gems" streamType="On Demand">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", paddingRight: 16 }}>
                <Card
                  onPress={() => detailsHandler({ title: "Kalank", image: kalank })}
                  title="Kalank"
                  image={kalank}
                  year="2016"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Veer Zaara", image: veerZaara })}
                  title="Veer Zaara"
                  image={veerZaara}
                  year="2004"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Munjya", image: munjya })}
                  title="Munjya"
                  image={munjya}
                  year="2024"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Kalank", image: kalank })}
                  title="Kalank"
                  image={kalank}
                  year="2016"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Veer Zaara", image: veerZaara })}
                  title="Veer Zaara"
                  image={veerZaara}
                  year="2004"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Munjya", image: munjya })}
                  title="Munjya"
                  image={munjya}
                  year="2024"
                  style={bollywoodCardStyle}
                />
              </View>
            </ScrollView>
          </Section>

          <Section title="Binge-Worthy Shows" streamType="On Demand">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", paddingRight: 16 }}>
              {loading ? (
                skeletonArray.map((_, idx) => (
                  <SkeletonCard key={idx} style={cardStyle} />
                ))
              ) : movieList?.topBoxList?.length ? (
                movieList.topBoxList.map((item: any, id: number) => {
                  return (
                    <Card
                      onPress={() => detailsHandler(item.id)}
                      key={item.id}
                      title={item?.originalTitle}
                      image={{uri: item?.primaryImage}}
                      year={item?.startYear}
                      style={cardStyle}
                      number={30}
                    />
                  )
                })
              ) : (
                <>
                  <Card
                    onPress={() => detailsHandler({ title: "Farscape", image: movie1 })}
                  title="Farscape"
                  image={movie1}
                  subtitle="29"
                  style={cardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Z Nation", image: movie2 })}
                  title="Z Nation"
                  image={movie2}
                  subtitle="33"
                  style={cardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Another Show", image: movie3 })}
                  title="Another Show"
                  image={movie3}
                  subtitle="40"
                  style={cardStyle}
                />
                 <Card
                   onPress={() => detailsHandler({ title: "Farscape", image: movie1 })}
                  title="Farscape"
                  image={movie1}
                  subtitle="29"
                  style={cardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Z Nation", image: movie2 })}
                  title="Z Nation"
                  image={movie2}
                  subtitle="33"
                  style={cardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Another Show", image: movie3 })}
                  title="Another Show"
                  image={movie3}
                  subtitle="40"
                  style={cardStyle}
                />
                </>
              )}
              </View>
            </ScrollView>
          </Section>

          <Section title="Most Popular in India" streamType="On Demand">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", paddingRight: 16 }}>
                <Card
                  onPress={() => detailsHandler({ title: "Hunter", image: kalank })}
                  title="Hunter"
                  image={kalank}
                  year="2013"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Ghost Show", image: veerZaara })}
                  title="Ghost Show"
                  image={veerZaara}
                  year="2003"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Burb Petrol", image: munjya })}
                  title="Burb Petrol"
                  image={munjya}
                  year="2024"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Hunter", image: kalank })}
                  title="Hunter"
                  image={kalank}
                  year="2013"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Ghost Show", image: veerZaara })}
                  title="Ghost Show"
                  image={veerZaara}
                  year="2003"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Burb Petrol", image: munjya })}
                  title="Burb Petrol"
                  image={munjya}
                  year="2024"
                  style={bollywoodCardStyle}
                />
              </View>
            </ScrollView>
          </Section>

          <Section title="Best of the West" streamType="On Demand">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", paddingRight: 16 }}>
                <Card
                  onPress={() => detailsHandler({ title: "Hunter", image: kalank })}
                  title="Hunter"
                  image={kalank}
                  year="1999"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Ghost Show", image: veerZaara })}
                  title="Ghost Show"
                  image={veerZaara}
                  year="1879"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Burb Petrol", image: munjya })}
                  title="Burb Petrol"
                  image={munjya}
                  year="2001"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Hunter", image: kalank })}
                  title="Hunter"
                  image={kalank}
                  year="1999"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Ghost Show", image: veerZaara })}
                  title="Ghost Show"
                  image={veerZaara}
                  year="1879"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Burb Petrol", image: munjya })}
                  title="Burb Petrol"
                  image={munjya}
                  year="2001"
                  style={bollywoodCardStyle}
                />
              </View>
            </ScrollView>
          </Section>

          <Section title="Crime Time" streamType="On Demand">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", paddingRight: 16 }}>
                <Card
                  onPress={() => detailsHandler({ title: "Hunter", image: kalank })}
                  title="Hunter"
                  image={kalank}
                  subtitle="2 seasons"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Ghost Show", image: veerZaara })}
                  title="Ghost Show"
                  image={veerZaara}
                  subtitle="3 seasons"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Burb Petrol", image: munjya })}
                  title="Burb Petrol"
                  image={munjya}
                  subtitle="1 season"
                  style={bollywoodCardStyle}
                />
                 <Card
                   onPress={() => detailsHandler({ title: "Hunter", image: kalank })}
                  title="Hunter"
                  image={kalank}
                  subtitle="2 seasons"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Ghost Show", image: veerZaara })}
                  title="Ghost Show"
                  image={veerZaara}
                  subtitle="3 seasons"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Burb Petrol", image: munjya })}
                  title="Burb Petrol"
                  image={munjya}
                  subtitle="1 season"
                  style={bollywoodCardStyle}
                />
              </View>
            </ScrollView>
          </Section>

          <Section title="Most Watchlisted This Week" streamType="Discover">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", paddingRight: 16 }}>
              {loading ? (
                skeletonArray.map((_, idx) => (
                  <SkeletonCard key={idx} style={bollywoodCardStyle} />
                ))
              ) : movieList?.topRatedList?.length ? (
                movieList.topRatedList.map((item: any, id: number) => {
                  return (
                    <Card
                      onPress={() => detailsHandler(item.id)}
                      key={item.id}
                      title={item?.originalTitle}
                      image={{uri: item?.primaryImage}}
                      year={item?.startYear}
                      style={bollywoodCardStyle}
                      number={18}
                    />
                  )
                })
              ) : (
                <>
                  <Card
                    onPress={() => detailsHandler({ title: "Farscape", image: movie1 })}
                  title="Farscape"
                  image={movie1}
                  subtitle="29"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Z Nation", image: movie2 })}
                  title="Z Nation"
                  image={movie2}
                  subtitle="33"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Another Show", image: movie3 })}
                  title="Another Show"
                  image={movie3}
                  subtitle="40"
                  style={bollywoodCardStyle}
                />
                 <Card
                   onPress={() => detailsHandler({ title: "Farscape", image: movie1 })}
                  title="Farscape"
                  image={movie1}
                  subtitle="29"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Z Nation", image: movie2 })}
                  title="Z Nation"
                  image={movie2}
                  subtitle="33"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Another Show", image: movie3 })}
                  title="Another Show"
                  image={movie3}
                  subtitle="40"
                  style={bollywoodCardStyle}
                />
                </>
              )}
              </View>
            </ScrollView>
          </Section>

          <Section title="Trending Trailers" streamType="Discover">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", paddingRight: 16 }}>
                <Card
                  onPress={() => detailsHandler({ title: "Hunter", image: movie1 })}
                  title="Hunter"
                  image={movie1}
                  release="May 21"
                  style={cardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Ghost Show", image: movie3 })}
                  title="Ghost Show"
                  image={movie3}
                  release="Oct 24"
                  style={cardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Dune", image: movie2 })}
                  title="Dune"
                  image={movie2}
                  release="Nov 1"
                  style={cardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Ghost Show", image: movie3 })}
                  title="Ghost Show"
                  image={movie3}
                  release="Oct 24"
                  style={cardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Hunter", image: movie1 })}
                  title="Hunter"
                  image={movie1}
                  release="May 21"
                  style={cardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Ghost Show", image: movie3 })}
                  title="Ghost Show"
                  image={movie3}
                  release="Oct 24"
                  style={cardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Dune", image: movie2 })}
                  title="Dune"
                  image={movie2}
                  release="Nov 1"
                  style={cardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Ghost Show", image: movie3 })}
                  title="Ghost Show"
                  image={movie3}
                  release="Oct 24"
                  style={cardStyle}
                />

              </View>
            </ScrollView>
          </Section>

          <Section title="Coming Soon" streamType="Discover">
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={{ flexDirection: "row", paddingRight: 16 }}>
                {loading ? (
                  skeletonArray.map((_, idx) => (
                    <SkeletonCard key={idx} style={bollywoodCardStyle} />
                  ))
                ) : movieList?.upComing?.length ? (
                  movieList.upComing.map((item: any, id: number) => {
                    return(
                      <Card
                        key={id}
                        onPress={() => detailsHandler(item?.titles[0]?.id)}
                        title={item?.titles[0]?.title}
                        image={item?.titles[0]?.primaryImage}
                        release={item?.date}
                        style={bollywoodCardStyle}
                      />
                    )
                  })
                ) : (
                  <>
                 
                <Card
                  onPress={() => detailsHandler({ title: "Hunter", image: kalank })}
                  title="Hunter"
                  image={kalank}
                  release="Sun, May 19"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Ghost Show", image: veerZaara })}
                  title="Ghost Show"
                  image={veerZaara}
                  release="Wed, Jun 20"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Burb Petrol", image: munjya })}
                  title="Burb Petrol"
                  image={munjya}
                  release="Fri, Aug 15"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Hunter", image: kalank })}
                  title="Hunter"
                  image={kalank}
                  release="Sun, May 19"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Ghost Show", image: veerZaara })}
                  title="Ghost Show"
                  image={veerZaara}
                  release="Wed, Jun 20"
                  style={bollywoodCardStyle}
                />
                <Card
                  onPress={() => detailsHandler({ title: "Burb Petrol", image: munjya })}
                  title="Burb Petrol"
                  image={munjya}
                  release="Fri, Aug 15"
                  style={bollywoodCardStyle}
                />
                 </>
                 )}
              </View>
            </ScrollView>
          </Section>
          {/* Add more sections as needed */}

        </ScrollView>
        <MovieDetailsSheet
          visible={sheetVisible}
          onClose={() => setSheetVisible(false)}
          movie={selectedMovie}
        />
      </>
    </AuthenticatedLayout>
  );
}
